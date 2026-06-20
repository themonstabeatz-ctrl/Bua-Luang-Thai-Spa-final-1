from fastapi import FastAPI, APIRouter, BackgroundTasks
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
from ics_calendar import build_appointment_ics


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
        """Booking slots are strictly 10:00 — 21:00 in 15-minute steps.

        The salon closes at 22:00 but the last accepted appointment START is
        21:00. Anything past 21:00 (21:15/30/45, 22:00) MUST be rejected so a
        malicious or buggy client cannot bypass the wheel picker UI.
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
            raise ValueError("appointment_time minute must be one of 00, 15, 30, 45")
        if h == 21 and m != 0:
            raise ValueError("last bookable slot is 21:00 — 21:15/30/45 are not allowed")
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

    # Build a one-tap .ics calendar attachment when we have a real booking
    # slot. Visitor's iPhone/Android calendar will offer "Add to Calendar"
    # automatically on a text/calendar attachment.
    client_attachments = None
    if appt_date and appt_time and treatment:
        try:
            import base64
            ics_str = build_appointment_ics(
                summary=f"Bua Luang Thai Spa — {treatment.get('name', '')}",
                description=(treatment.get("description") or "").strip(),
                date_iso=appt_date,
                time_hhmm=appt_time,
                duration_minutes=int(treatment.get("duration") or 60),
                organizer_email=OWNER_EMAIL,
            )
            ics_b64 = base64.b64encode(ics_str.encode("utf-8")).decode("ascii")
            client_attachments = [{
                "filename": "appointment.ics",
                "content": ics_b64,
                "content_type": "text/calendar; charset=utf-8; method=PUBLISH",
            }]
        except Exception:
            logger.exception("Failed to build .ics attachment — sending email without it")
            client_attachments = None

    client_sent, client_err = await _resend_send(
        to_client, c_subject, c_html, c_text, attachments=client_attachments,
    )

    # 2) Owner notification — ALWAYS Serbian, ALWAYS Serbian massage details
    treatment_serbian = None
    if treatment:
        treatment_serbian = {
            "name": treatment.get("name_serbian") or treatment.get("name"),
            "duration": treatment.get("duration"),
            "price": treatment.get("price"),
            "description": treatment.get("description_serbian") or treatment.get("description"),
        }
    o_subject, o_html, o_text = render_owner_email(
        name=name, email=to_client, phone=phone, message=message_serbian,
        language=language, submitted_at_iso=submitted_at,
        appointment_date=appt_date, appointment_time=appt_time,
        treatment=treatment_serbian,
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
@api_router.get("/")
async def root():
    return {"message": "Bua Luang Thai Spa API"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactCreate, background_tasks: BackgroundTasks):
    record = ContactMessage(
        name=payload.name.strip(),
        email=payload.email,
        phone=(payload.phone or "").strip() or None,
        message=payload.message.strip(),
        message_serbian=(payload.message_serbian or "").strip() or None,
        language=payload.language,
        appointment_date=(payload.appointment_date or "").strip() or None,
        appointment_time=(payload.appointment_time or "").strip() or None,
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
