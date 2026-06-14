from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---- Models ----
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    message: str = Field(min_length=1, max_length=4000)
    language: str = Field(default="sr")


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    language: str = "sr"
    client_email_sent: bool = False
    owner_email_sent: bool = False
    email_error: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---- Email helper ----
def _send_email_sync(to_email: str, subject: str, html_body: str, text_body: str) -> None:
    host = os.environ['SMTP_HOST']
    port = int(os.environ.get('SMTP_PORT', '587'))
    user = os.environ['SMTP_USER']
    password = os.environ['SMTP_PASSWORD']
    from_name = os.environ.get('SMTP_FROM_NAME', 'Bua Luang Thai Spa')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f"{from_name} <{user}>"
    msg['To'] = to_email
    msg.attach(MIMEText(text_body, 'plain', 'utf-8'))
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP(host, port, timeout=20) as server:
        server.starttls()
        server.login(user, password)
        server.sendmail(user, [to_email], msg.as_string())


async def _send_async(to_email: str, subject: str, html_body: str, text_body: str) -> tuple[bool, Optional[str]]:
    try:
        await asyncio.get_event_loop().run_in_executor(
            None, _send_email_sync, to_email, subject, html_body, text_body
        )
        return True, None
    except Exception as exc:  # noqa: BLE001
        logger.exception("SMTP send failed for %s", to_email)
        return False, str(exc)


async def _send_and_update(record_id: str, payload: dict) -> None:
    """Send both client confirmation + owner notification, update DB record."""
    name = payload["name"]
    to_client = payload["email"]
    phone = payload["phone"] or ""
    message = payload["message"]
    language = payload["language"]
    submitted_at = payload["created_at"]

    # 1. Client confirmation (in submitter's selected language)
    c_subject, c_html, c_text = render_client_email(language, name, phone, message)
    client_sent, client_err = await _send_async(to_client, c_subject, c_html, c_text)

    # 2. Owner notification — always in Serbian, always to the spa inbox
    owner_inbox = os.environ.get("SMTP_USER", "")
    o_subject, o_html, o_text = render_owner_email(
        name=name,
        email=to_client,
        phone=phone,
        message=message,
        language=language,
        submitted_at_iso=submitted_at,
    )
    owner_sent, owner_err = await _send_async(owner_inbox, o_subject, o_html, o_text)

    err = client_err or owner_err
    await db.contact_messages.update_one(
        {"id": record_id},
        {
            "$set": {
                "client_email_sent": client_sent,
                "owner_email_sent": owner_sent,
                "email_error": err,
            }
        },
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
