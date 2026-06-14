from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import resend

from email_templates import render_client_email, render_owner_email


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
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    message: str = Field(min_length=1, max_length=4000)
    language: str = Field(default="sr")
    message_serbian: Optional[str] = Field(default=None, max_length=4000)


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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---- Resend helper ----
async def _resend_send(to_email: str, subject: str, html_body: str, text_body: str) -> tuple[bool, Optional[str]]:
    params = {
        "from": f"{SENDER_NAME} <{SENDER_EMAIL}>",
        "to": [to_email],
        "subject": subject,
        "html": html_body,
        "text": text_body,
        "reply_to": REPLY_TO_EMAIL,
    }
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
    c_subject, c_html, c_text = render_client_email(language, name, phone, message)
    client_sent, client_err = await _resend_send(to_client, c_subject, c_html, c_text)

    # 2) Owner notification — ALWAYS Serbian, ALWAYS Serbian massage details
    o_subject, o_html, o_text = render_owner_email(
        name=name, email=to_client, phone=phone, message=message_serbian,
        language=language, submitted_at_iso=submitted_at,
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
    )

    doc = record.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
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
