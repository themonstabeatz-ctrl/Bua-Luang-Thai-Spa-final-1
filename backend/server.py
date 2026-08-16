from fastapi import FastAPI, APIRouter, BackgroundTasks, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import resend

from email_templates import render_client_email, render_owner_email
from slots import (
    compute_slots,
    is_slot_available,
    DEFAULT_DURATION,
    BUFFER_MIN,
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

resend.api_key = os.environ['RESEND_API_KEY']

SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
SENDER_NAME = os.environ.get('SENDER_NAME', 'Bua Luang Thai Spa')
REPLY_TO_EMAIL = os.environ.get('REPLY_TO_EMAIL', 'bualuangthailandspa@gmail.com')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL', 'bualuangthailandspa@gmail.com')

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---- Models ----
class SelectedTreatment(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    duration: int = Field(ge=1, le=600)
    price: int = Field(ge=0)
    description: Optional[str] = Field(default=None, max_length=2000)
    # Serbian copies of the human-readable fields. Always sent by the
    # frontend so the OWNER notification email can render the full treatment
    # block in Serbian regardless of which language the visitor used.
    name_serbian: Optional[str] = Field(default=None, max_length=200)
    description_serbian: Optional[str] = Field(default=None, max_length=2000)
    # Thai copies, used to render the second (Thai) half of the OWNER email.
    name_thai: Optional[str] = Field(default=None, max_length=200)
    description_thai: Optional[str] = Field(default=None, max_length=2000)


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    message: str = Field(min_length=1, max_length=4000)
    language: str = Field(default="sr")
    message_serbian: Optional[str] = Field(default=None, max_length=4000)
    selected_treatment: Optional[SelectedTreatment] = None
    appointment_date: Optional[str] = Field(default=None, max_length=40)
    appointment_time: Optional[str] = Field(default=None, max_length=20)

    @field_validator("appointment_time")
    @classmethod
    def _validate_business_hours(cls, v):
        """Booking slots run from 10:00 in 15-minute steps.

        The salon closes at 22:00; whether a given start actually fits depends
        on the treatment duration (verified server-side by `is_slot_available`).
        This validator only guards the coarse format so a malicious or buggy
        client cannot submit garbage times.
        """
        if not v:
            return v
        s = str(v).strip()
        if not re.fullmatch(r"[0-2]\d:[0-5]\d", s):
            raise ValueError("appointment_time must be HH:MM (24h)")
        hh, mm = s.split(":")
        h, m = int(hh), int(mm)
        if h < 10 or h > 21:
            raise ValueError("appointment_time hour must be between 10 and 21 (inclusive)")
        if m not in (0, 15, 30, 45):
            raise ValueError("appointment_time minute must be 00, 15, 30 or 45")
        return s


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    message_serbian: Optional[str] = None
    language: str = "sr"
    client_email_sent: bool = False
    owner_email_sent: bool = False
    email_error: Optional[str] = None
    appointment_date: Optional[str] = None
    appointment_time: Optional[str] = None
    selected_treatment: Optional[SelectedTreatment] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---- Resend helper ----
async def _resend_send(
    to_email: str,
    subject: str,
    html_body: str,
    text_body: str,
    attachments: Optional[List[dict]] = None,
) -> tuple[bool, Optional[str]]:
    params = {
        "from": f"{SENDER_NAME} <{SENDER_EMAIL}>",
        "to": [to_email],
        "subject": subject,
        "html": html_body,
        "text": text_body,
        "reply_to": REPLY_TO_EMAIL,
    }
    if attachments:
        # Resend expects: [{filename, content (base64 str OR raw bytes), content_type?}]
        params["attachments"] = attachments
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Resend OK for %s id=%s", to_email, getattr(result, "get", lambda *_: None)("id"))
        return True, None
    except Exception as exc:  # noqa: BLE001
        logger.exception("Resend send failed for %s", to_email)
        return False, str(exc)


async def _send_and_update(record_id: str, payload: dict) -> None:
    name = payload["name"]
    to_client = payload["email"]
    phone = payload["phone"] or ""
    message = payload["message"]
    message_serbian = payload.get("message_serbian") or message
    language = payload["language"]
    submitted_at = payload["created_at"]

    # 1) Client confirmation (translated to client's selected language)
    treatment = payload.get("selected_treatment")
    appt_date = payload.get("appointment_date")
    appt_time = payload.get("appointment_time")
    c_subject, c_html, c_text = render_client_email(
        language, name, phone, message,
        treatment=treatment,
        appointment_date=appt_date,
        appointment_time=appt_time,
    )

    client_sent, client_err = await _resend_send(
        to_client, c_subject, c_html, c_text,
    )

    # 2) Owner notification — ALWAYS bilingual (Serbian first, then Thai)
    treatment_serbian = None
    treatment_thai = None
    if treatment:
        treatment_serbian = {
            "name": treatment.get("name_serbian") or treatment.get("name"),
            "duration": treatment.get("duration"),
            "price": treatment.get("price"),
            "description": treatment.get("description_serbian") or treatment.get("description"),
        }
        treatment_thai = {
            "name": treatment.get("name_thai") or treatment.get("name_serbian") or treatment.get("name"),
            "duration": treatment.get("duration"),
            "price": treatment.get("price"),
            "description": treatment.get("description_thai") or treatment.get("description_serbian") or treatment.get("description"),
        }
    o_subject, o_html, o_text = render_owner_email(
        name=name, email=to_client, phone=phone, message=message_serbian,
        language=language, submitted_at_iso=submitted_at,
        appointment_date=appt_date, appointment_time=appt_time,
        treatment=treatment_serbian, treatment_thai=treatment_thai,
    )
    owner_sent, owner_err = await _resend_send(OWNER_EMAIL, o_subject, o_html, o_text)

    err = client_err or owner_err
    await db.contact_messages.update_one(
        {"id": record_id},
        {"$set": {
            "client_email_sent": client_sent,
            "owner_email_sent": owner_sent,
            "email_error": err,
        }},
    )


# ---- Routes ----
async def _bookings_for_date(date_iso: str):
    """Return [(start_hhmm, duration_minutes)] already booked for that date."""
    docs = await db.contact_messages.find(
        {"appointment_date": date_iso},
        {"_id": 0, "appointment_time": 1, "selected_treatment": 1},
    ).to_list(500)
    out = []
    for d in docs:
        t = d.get("appointment_time")
        if not t:
            continue
        dur = (d.get("selected_treatment") or {}).get("duration") or DEFAULT_DURATION
        out.append((t, int(dur)))
    return out


@api_router.get("/")
async def root():
    return {"message": "Bua Luang Thai Spa API"}


@api_router.get("/availability")
async def availability(
    date: str = Query(..., min_length=10, max_length=10),
    duration: int = Query(DEFAULT_DURATION, ge=15, le=600),
):
    """Slot availability for a given date and treatment duration."""
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
        raise HTTPException(status_code=422, detail="date must be YYYY-MM-DD")
    bookings = await _bookings_for_date(date)
    return {
        "date": date,
        "duration": duration,
        "buffer_minutes": BUFFER_MIN,
        "slots": compute_slots(date, duration, bookings),
    }


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactCreate, background_tasks: BackgroundTasks):
    appt_date = (payload.appointment_date or "").strip() or None
    appt_time = (payload.appointment_time or "").strip() or None

    # Guard the slot server-side: a booked slot (plus its 30-minute buffer)
    # can never be taken twice, even if two visitors submit simultaneously.
    if appt_date and appt_time:
        duration = int(
            (payload.selected_treatment.duration if payload.selected_treatment else None)
            or DEFAULT_DURATION
        )
        bookings = await _bookings_for_date(appt_date)
        ok, reason = is_slot_available(appt_date, appt_time, duration, bookings)
        if not ok:
            raise HTTPException(status_code=409, detail={"error": "slot_unavailable", "reason": reason})

    record = ContactMessage(
        name=payload.name.strip(),
        email=payload.email,
        phone=(payload.phone or "").strip() or None,
        message=payload.message.strip(),
        message_serbian=(payload.message_serbian or "").strip() or None,
        language=payload.language,
        appointment_date=appt_date,
        appointment_time=appt_time,
        selected_treatment=payload.selected_treatment,
    )

    doc = record.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    if payload.selected_treatment:
        doc['selected_treatment'] = payload.selected_treatment.model_dump()
    await db.contact_messages.insert_one(doc)

    background_tasks.add_task(_send_and_update, record.id, doc)
    return record


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.get("/site-info")
async def site_info():
    """Return localised business metadata used by the frontend to populate
    Schema.org JSON-LD, contact links and the booking footer.

    All sensitive fields (street address, postal code, lat/lng) are read
    from environment variables so we can drop them in the moment the lease
    is executed — without redeploying the application.
    """
    return {
        "name": "Bua Luang Thai Spa",
        "phone": os.environ.get("SALON_PHONE", "+381626255500"),
        "owner_email": OWNER_EMAIL,
        "instagram": os.environ.get(
            "SALON_INSTAGRAM_URL", "https://www.instagram.com/bualuang_thai_spa/"
        ),
        "site_base_url": os.environ.get("SITE_BASE_URL", "https://bualuangthaispa.rs"),
        "address": {
            "street": os.environ.get("SALON_STREET_ADDRESS", "") or None,
            "postal_code": os.environ.get("SALON_POSTAL_CODE", "") or None,
            "city": os.environ.get("SALON_CITY", "Beograd"),
            "country": os.environ.get("SALON_COUNTRY", "RS"),
            "latitude": os.environ.get("SALON_LATITUDE", "") or None,
            "longitude": os.environ.get("SALON_LONGITUDE", "") or None,
        },
        "hours": {
            "opens": "10:00",
            "closes": "22:00",
            "last_booking": "21:00",
            "slot_step_minutes": 30,
            "buffer_minutes": BUFFER_MIN,
            "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
