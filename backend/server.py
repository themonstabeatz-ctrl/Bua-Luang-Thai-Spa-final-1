from fastapi import FastAPI, APIRouter, BackgroundTasks, HTTPException
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


# ---- Translation messages for confirmation emails ----
CONFIRMATION_SUBJECTS = {
    "sr": "Hvala što ste nas kontaktirali — Bua Luang Thai Spa",
    "en": "Thank you for contacting us — Bua Luang Thai Spa",
    "ru": "Спасибо, что связались с нами — Bua Luang Thai Spa",
    "zh": "感谢您与我们联系 — Bua Luang Thai Spa",
}

CONFIRMATION_BODIES = {
    "sr": (
        "Poštovani/a {name},\n\n"
        "Hvala što ste nam se obratili. Vaša poruka je primljena i naš tim će Vam odgovoriti u najkraćem mogućem roku.\n\n"
        "Vaša poruka:\n\"{message}\"\n\n"
        "Sa poštovanjem,\nBua Luang Thai Spa\nTel: +381 62 625 500"
    ),
    "en": (
        "Dear {name},\n\n"
        "Thank you for reaching out. We have received your message and our team will respond as soon as possible.\n\n"
        "Your message:\n\"{message}\"\n\n"
        "Warm regards,\nBua Luang Thai Spa\nPhone: +381 62 625 500"
    ),
    "ru": (
        "Уважаемый(ая) {name},\n\n"
        "Спасибо, что обратились к нам. Мы получили ваше сообщение, и наша команда ответит вам в кратчайшие сроки.\n\n"
        "Ваше сообщение:\n\"{message}\"\n\n"
        "С уважением,\nBua Luang Thai Spa\nТел: +381 62 625 500"
    ),
    "zh": (
        "尊敬的 {name}，\n\n"
        "感谢您与我们联系。我们已收到您的留言，团队将尽快回复您。\n\n"
        "您的留言：\n\"{message}\"\n\n"
        "诚挚问候，\nBua Luang Thai Spa\n电话：+381 62 625 500"
    ),
}


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
    email_sent: bool = False
    email_error: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---- Email helper ----
def _send_email_sync(to_email: str, subject: str, body: str) -> None:
    host = os.environ['SMTP_HOST']
    port = int(os.environ.get('SMTP_PORT', '587'))
    user = os.environ['SMTP_USER']
    password = os.environ['SMTP_PASSWORD']
    from_name = os.environ.get('SMTP_FROM_NAME', 'Bua Luang Thai Spa')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f"{from_name} <{user}>"
    msg['To'] = to_email
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    with smtplib.SMTP(host, port, timeout=20) as server:
        server.starttls()
        server.login(user, password)
        server.sendmail(user, [to_email], msg.as_string())


async def send_confirmation_email(to_email: str, name: str, message: str, language: str) -> tuple[bool, Optional[str]]:
    lang = language if language in CONFIRMATION_SUBJECTS else "sr"
    subject = CONFIRMATION_SUBJECTS[lang]
    body = CONFIRMATION_BODIES[lang].format(name=name, message=message)
    try:
        await asyncio.get_event_loop().run_in_executor(
            None, _send_email_sync, to_email, subject, body
        )
        return True, None
    except Exception as exc:  # noqa: BLE001
        logger.exception("SMTP send failed")
        return False, str(exc)


async def _send_and_update(record_id: str, to_email: str, name: str, message: str, language: str) -> None:
    sent, err = await send_confirmation_email(to_email, name, message, language)
    await db.contact_messages.update_one(
        {"id": record_id},
        {"$set": {"email_sent": sent, "email_error": err}},
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

    # Send confirmation email in the background so the request returns fast,
    # then update the DB record with the SMTP outcome.
    background_tasks.add_task(
        _send_and_update, record.id, record.email, record.name, record.message, record.language
    )

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
