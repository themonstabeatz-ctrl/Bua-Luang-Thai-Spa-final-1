"""HTML email templates for Bua Luang Thai Spa."""

from typing import Optional

LOGO_URL = (
    "https://customer-assets.emergentagent.com/job_bua-luang-spa/artifacts/"
    "5esihdex_Bua%20luang%20logo%20crna%20senka.png"
)
BRAND_PHONE = "+381 62 625 500"
BRAND_PHONE_TEL = "+38162625500"
BRAND_EMAIL = "bualuangthailandspa@gmail.com"
INSTAGRAM_URL = "https://www.instagram.com/bualuang_thai_spa/"


# Localised labels for the rich "selected treatment" block + CTAs in client email.
CLIENT_TREATMENT_COPY = {
    "sr": {
        "block_heading": "Vaš odabrani tretman", "name_label": "Naziv masaže",
        "duration_label": "Trajanje", "duration_unit": "MIN",
        "datetime_label": "Odabrani datum i vreme",
        "description_label": "Opis", "price_label": "Cena", "currency": "RSD",
        "call_us_heading": "Pozovite nas", "call_us_cta": "Pozovi sada",
        "instagram_cta": "Pratite nas na Instagramu",
    },
    "en": {
        "block_heading": "Your selected treatment", "name_label": "Massage name",
        "duration_label": "Duration", "duration_unit": "MIN",
        "datetime_label": "Selected date and time",
        "description_label": "Description", "price_label": "Price", "currency": "RSD",
        "call_us_heading": "Call us", "call_us_cta": "Call now",
        "instagram_cta": "Follow us on Instagram",
    },
    "ru": {
        "block_heading": "Выбранная процедура", "name_label": "Название массажа",
        "duration_label": "Длительность", "duration_unit": "мин",
        "datetime_label": "Выбранная дата и время",
        "description_label": "Описание", "price_label": "Цена", "currency": "RSD",
        "call_us_heading": "Позвоните нам", "call_us_cta": "Позвонить",
        "instagram_cta": "Подпишитесь на нас в Instagram",
    },
    "zh": {
        "block_heading": "您选择的疗程", "name_label": "按摩名称",
        "duration_label": "时长", "duration_unit": "分钟",
        "datetime_label": "选择的日期和时间",
        "description_label": "说明", "price_label": "价格", "currency": "RSD",
        "call_us_heading": "致电我们", "call_us_cta": "立即致电",
        "instagram_cta": "在 Instagram 关注我们",
    },
    "th": {
        "block_heading": "ทรีตเมนต์ที่คุณเลือก", "name_label": "ชื่อนวด",
        "duration_label": "ระยะเวลา", "duration_unit": "นาที",
        "datetime_label": "วันและเวลาที่เลือก",
        "description_label": "รายละเอียด", "price_label": "ราคา", "currency": "RSD",
        "call_us_heading": "โทรหาเรา", "call_us_cta": "โทรเลย",
        "instagram_cta": "ติดตามเราที่ Instagram",
    },
}


def _format_price(n):
    return f"{int(n):,}".replace(",", ".")


def _treatment_block_html(language, treatment, appt_date=None, appt_time=None):
    c = CLIENT_TREATMENT_COPY.get(language, CLIENT_TREATMENT_COPY["sr"])
    name = _html_escape(str(treatment.get("name", "")))
    duration = treatment.get("duration", "")
    price = treatment.get("price", 0)
    description = _html_escape(str(treatment.get("description") or ""))
    dt_value = ""
    if appt_date and appt_time:
        dt_value = f"{appt_date} · {appt_time}"
    elif appt_date:
        dt_value = appt_date
    elif appt_time:
        dt_value = appt_time
    dt_block = (
        f"""<tr><td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a17a35;vertical-align:top;border-top:1px solid rgba(161,122,53,0.18);">{c['datetime_label']}</td>
            <td style="padding:10px 16px;font-family:Georgia,serif;font-size:16px;color:#7a5a22;font-weight:600;border-top:1px solid rgba(161,122,53,0.18);">{_html_escape(dt_value)}</td></tr>"""
        if dt_value else ""
    )
    desc_block = (
        f"""<tr><td colspan="2" style="padding:10px 16px 0 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a17a35;">{c['description_label']}</td></tr>
            <tr><td colspan="2" style="padding:6px 16px 14px 16px;font-size:14px;line-height:1.7;color:#3a312a;font-style:italic;">{description}</td></tr>"""
        if description else ""
    )
    return f"""<div style="margin:28px 0 6px 0;padding:22px 4px 4px 4px;border:1px solid rgba(161,122,53,0.30);border-radius:14px;background:#fbf6ec;">
      <div style="text-align:center;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#a17a35;padding:0 16px 18px 16px;">{c['block_heading']}</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;">
        <tr><td style="padding:10px 16px;width:42%;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a17a35;vertical-align:top;border-top:1px solid rgba(161,122,53,0.18);">{c['name_label']}</td>
            <td style="padding:10px 16px;font-family:Georgia,'Cormorant Garamond',serif;font-size:18px;color:#3a312a;border-top:1px solid rgba(161,122,53,0.18);">{name}</td></tr>
        <tr><td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a17a35;vertical-align:top;border-top:1px solid rgba(161,122,53,0.18);">{c['duration_label']}</td>
            <td style="padding:10px 16px;font-size:15px;color:#3a312a;border-top:1px solid rgba(161,122,53,0.18);">{duration} {c['duration_unit']}</td></tr>
        {dt_block}
        {desc_block}
        <tr><td style="padding:14px 16px 18px 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a17a35;vertical-align:top;border-top:1px solid rgba(161,122,53,0.30);">{c['price_label']}</td>
            <td style="padding:14px 16px 18px 16px;font-family:Georgia,serif;font-size:22px;font-weight:600;color:#7a5a22;border-top:1px solid rgba(161,122,53,0.30);">{_format_price(price)} <span style="font-size:13px;color:#a17a35;letter-spacing:0.14em;">{c['currency']}</span></td></tr>
      </table>
    </div>"""


def _call_us_block_html(language):
    c = CLIENT_TREATMENT_COPY.get(language, CLIENT_TREATMENT_COPY["sr"])
    return f"""<div style="margin:28px 0 8px 0;padding:24px 18px;border-radius:14px;background:linear-gradient(135deg,#fff7e3 0%,#f7e7bb 100%);border:1px solid rgba(161,122,53,0.30);text-align:center;">
      <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#a17a35;margin-bottom:8px;">{c['call_us_heading']}</div>
      <a href="tel:{BRAND_PHONE_TEL}" style="display:inline-block;font-family:Georgia,serif;font-size:28px;font-weight:600;color:#7a5a22;text-decoration:none;letter-spacing:0.04em;line-height:1.1;">{BRAND_PHONE}</a>
      <div style="margin-top:14px;"><a href="tel:{BRAND_PHONE_TEL}" style="display:inline-block;padding:13px 28px;border-radius:999px;background:linear-gradient(90deg,#a17a35,#d4ad5e,#a17a35);color:#ffffff;font-family:Arial,sans-serif;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;font-weight:600;">{c['call_us_cta']}</a></div>
    </div>"""


def _instagram_block_html(language):
    c = CLIENT_TREATMENT_COPY.get(language, CLIENT_TREATMENT_COPY["sr"])
    return f"""<div style="margin:16px 0 4px 0;text-align:center;">
      <a href="{INSTAGRAM_URL}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 22px;border-radius:999px;border:1px solid rgba(161,122,53,0.40);background:#ffffff;color:#7a5a22;font-family:Arial,sans-serif;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;font-weight:600;">{c['instagram_cta']} →</a>
    </div>"""


# ------------------------- Client confirmation (per language) -------------------------

CLIENT_SUBJECTS = {
    "sr": "Hvala što ste nas kontaktirali — Bua Luang Thai Spa",
    "en": "Thank you for contacting us — Bua Luang Thai Spa",
    "ru": "Спасибо, что связались с нами — Bua Luang Thai Spa",
    "zh": "感谢您与我们联系 — Bua Luang Thai Spa",
    "th": "ขอบคุณที่ติดต่อเรา — Bua Luang Thai Spa",
}


CLIENT_COPY = {
    "sr": {
        "greeting": "Poštovani/a {name},",
        "intro": (
            "Hvala Vam što ste kontaktirali Bua Luang Thai Spa. Vaša poruka je "
            "uspešno primljena."
        ),
        "review": (
            "Naš tim će pregledati Vaš upit i kontaktirati Vas u najkraćem mogućem "
            "roku kako bismo potvrdili detalje ili termin Vašeg rituala."
        ),
        "data_heading": "Podaci koje ste poslali",
        "phone_label": "Telefon",
        "phone_empty": "(nije ostavljen)",
        "message_label": "Poruka / Usluga",
        "closing": "Radujemo se što ćemo Vam pomoći da pronađete svoj unutrašnji mir i balans.",
        "signoff": "Srdačan pozdrav,",
        "team": "Vaš Bua Luang Thai Spa tim",
        "hours_label": "Radno vreme",
        "hours_value": "Pon — Ned: 10:00 — 22:00",
    },
    "en": {
        "greeting": "Dear {name},",
        "intro": (
            "Thank you for contacting Bua Luang Thai Spa. Your message has been "
            "successfully received."
        ),
        "review": (
            "Our team will review your inquiry and reach out as soon as possible to "
            "confirm the details or an appointment for your ritual."
        ),
        "data_heading": "Your submission",
        "phone_label": "Phone",
        "phone_empty": "(not provided)",
        "message_label": "Message / Service",
        "closing": "We look forward to helping you find your inner peace and balance.",
        "signoff": "Warm regards,",
        "team": "Your Bua Luang Thai Spa team",
        "hours_label": "Working hours",
        "hours_value": "Mon — Sun: 10:00 — 22:00",
    },
    "ru": {
        "greeting": "Уважаемый(ая) {name},",
        "intro": (
            "Спасибо, что обратились в Bua Luang Thai Spa. Ваше сообщение успешно получено."
        ),
        "review": (
            "Наша команда рассмотрит ваш запрос и свяжется с вами в кратчайшие сроки, "
            "чтобы подтвердить детали или время вашего ритуала."
        ),
        "data_heading": "Отправленные данные",
        "phone_label": "Телефон",
        "phone_empty": "(не указан)",
        "message_label": "Сообщение / Услуга",
        "closing": "Мы будем рады помочь вам обрести внутренний покой и баланс.",
        "signoff": "С уважением,",
        "team": "Команда Bua Luang Thai Spa",
        "hours_label": "Часы работы",
        "hours_value": "Пн — Вс: 10:00 — 22:00",
    },
    "zh": {
        "greeting": "尊敬的 {name}，",
        "intro": "感谢您联系 Bua Luang Thai Spa。我们已成功收到您的留言。",
        "review": "我们的团队将审阅您的咨询，并尽快与您联系以确认细节或您所选疗程的预约时间。",
        "data_heading": "您提交的信息",
        "phone_label": "电话",
        "phone_empty": "（未提供）",
        "message_label": "留言 / 服务",
        "closing": "期待协助您寻得内心的安宁与平衡。",
        "signoff": "诚挚问候，",
        "team": "您的 Bua Luang Thai Spa 团队",
        "hours_label": "营业时间",
        "hours_value": "周一至周日：10:00 — 22:00",
    },
    "th": {
        "greeting": "เรียนคุณ {name},",
        "intro": "ขอบคุณที่ติดต่อ Bua Luang Thai Spa เราได้รับข้อความของคุณเรียบร้อยแล้ว",
        "review": "ทีมงานของเราจะตรวจสอบคำถามของคุณและจะติดต่อกลับโดยเร็วที่สุดเพื่อยืนยันรายละเอียดหรือเวลานัดหมายสำหรับทรีตเมนต์ของคุณ",
        "data_heading": "ข้อมูลที่คุณส่ง",
        "phone_label": "โทรศัพท์",
        "phone_empty": "(ไม่ได้ระบุ)",
        "message_label": "ข้อความ / บริการ",
        "closing": "เราหวังเป็นอย่างยิ่งที่จะช่วยให้คุณค้นพบความสงบและความสมดุลภายใน",
        "signoff": "ด้วยความเคารพ,",
        "team": "ทีมงาน Bua Luang Thai Spa ของคุณ",
        "hours_label": "เวลาทำการ",
        "hours_value": "จันทร์ — อาทิตย์: 10:00 — 22:00",
    },
}


def _html_escape(s: str) -> str:
    if s is None:
        return ""
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _shell(inner_html: str) -> str:
    """Wrap the inner HTML in a luxury light-cream layout with a dark logo header."""
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Bua Luang Thai Spa</title>
</head>
<body style="margin:0;padding:24px 12px;background:#fbf6ec;font-family:Georgia,'Cormorant Garamond',serif;color:#3a312a;-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid rgba(161,122,53,0.25);border-radius:18px;overflow:hidden;box-shadow:0 18px 60px rgba(60,40,18,0.10);">
    <tr>
      <td style="background:#0a0705;padding:32px 24px;text-align:center;">
        <img src="{LOGO_URL}" alt="Bua Luang Thai Spa" style="max-height:120px;max-width:80%;display:inline-block;" />
      </td>
    </tr>
    <tr>
      <td style="padding:36px 36px 28px 36px;">
        {inner_html}
      </td>
    </tr>
    <tr>
      <td style="background:#fbf3dc;padding:18px 24px;text-align:center;font-family:Arial,sans-serif;font-size:12px;color:#7a6e5e;letter-spacing:0.04em;border-top:1px solid rgba(161,122,53,0.2);">
        <a href="mailto:{BRAND_EMAIL}" style="color:#a17a35;text-decoration:none;">{BRAND_EMAIL}</a>
        &nbsp;&middot;&nbsp;
        <a href="tel:+38162625500" style="color:#a17a35;text-decoration:none;">{BRAND_PHONE}</a>
        &nbsp;&middot;&nbsp;
        Pon — Ned: 10:00 — 22:00
      </td>
    </tr>
  </table>
</body>
</html>"""


def render_client_email(language: str, name: str, phone: str, message: str, treatment=None, appointment_date=None, appointment_time=None) -> tuple[str, str, str]:
    """Return (subject, html, plain_text) for the client confirmation email."""
    lang = language if language in CLIENT_COPY else "sr"
    c = CLIENT_COPY[lang]
    subject = CLIENT_SUBJECTS[lang]

    safe_name = _html_escape(name)
    safe_phone = _html_escape(phone) if phone else c["phone_empty"]
    safe_message = _html_escape(message).replace("\n", "<br/>")

    treatment_block = (
        _treatment_block_html(lang, treatment, appointment_date, appointment_time)
        if treatment else ""
    )
    call_us_block = _call_us_block_html(lang)
    instagram_block = _instagram_block_html(lang)

    # When a treatment is selected we already render its details beautifully —
    # avoid duplicating the same line inside the generic "data" box.
    submission_block = "" if treatment else f"""
      <div style="margin:24px 0;padding:18px 22px;background:#fbf6ec;border:1px solid rgba(161,122,53,0.25);border-radius:12px;">
        <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a17a35;margin-bottom:10px;">{c['data_heading']}</div>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;color:#3a312a;">
          <tr><td style="padding:4px 0;width:130px;color:#7a6e5e;font-family:Arial,sans-serif;">{c['phone_label']}:</td><td style="padding:4px 0;">{safe_phone}</td></tr>
          <tr><td valign="top" style="padding:4px 0;color:#7a6e5e;font-family:Arial,sans-serif;">{c['message_label']}:</td><td style="padding:4px 0;line-height:1.6;">{safe_message}</td></tr>
        </table>
      </div>
    """

    # If a treatment is selected we still want phone visible somewhere clean.
    phone_inline = "" if not treatment else f"""
      <p style="margin:12px 0 0 0;font-size:13px;color:#7a6e5e;text-align:center;">
        <span style="font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.18em;font-size:10px;color:#a17a35;">{c['phone_label']}:</span>
        &nbsp;{safe_phone}
      </p>
    """

    inner = f"""
      <h1 style="margin:0 0 18px 0;font-size:24px;line-height:1.2;color:#a17a35;font-weight:400;letter-spacing:0.02em;">{c['greeting'].format(name=safe_name)}</h1>
      <p style="margin:0 0 14px 0;font-size:15px;line-height:1.7;color:#3a312a;">{c['intro']}</p>
      <p style="margin:0 0 6px 0;font-size:15px;line-height:1.7;color:#3a312a;">{c['review']}</p>
      {treatment_block}
      {phone_inline}
      {submission_block}
      {call_us_block}
      <p style="margin:22px 0 26px 0;font-size:15px;line-height:1.7;color:#3a312a;font-style:italic;text-align:center;">{c['closing']}</p>
      <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#3a312a;text-align:center;">
        {c['signoff']}<br/>
        <span style="color:#a17a35;font-weight:600;letter-spacing:0.02em;">{c['team']}</span>
      </p>
      {instagram_block}
    """

    plain_treatment = ""
    if treatment:
        plain_treatment = (
            f"\n{CLIENT_TREATMENT_COPY[lang]['block_heading']}:\n"
            f"  {CLIENT_TREATMENT_COPY[lang]['name_label']}: {treatment.get('name','')}\n"
            f"  {CLIENT_TREATMENT_COPY[lang]['duration_label']}: {treatment.get('duration','')} "
            f"{CLIENT_TREATMENT_COPY[lang]['duration_unit']}\n"
        )
        if treatment.get("description"):
            plain_treatment += f"  {CLIENT_TREATMENT_COPY[lang]['description_label']}: {treatment['description']}\n"
        plain_treatment += (
            f"  {CLIENT_TREATMENT_COPY[lang]['price_label']}: "
            f"{_format_price(treatment.get('price',0))} {CLIENT_TREATMENT_COPY[lang]['currency']}\n"
        )

    plain = (
        f"{c['greeting'].format(name=name)}\n\n"
        f"{c['intro']}\n\n"
        f"{c['review']}\n"
        f"{plain_treatment}\n"
        f"{c['closing']}\n\n"
        f"{c['signoff']}\n{c['team']}\n\n"
        f"{CLIENT_TREATMENT_COPY[lang]['call_us_heading']}: {BRAND_PHONE}\n"
        f"{CLIENT_TREATMENT_COPY[lang]['instagram_cta']}: {INSTAGRAM_URL}\n"
    )

    return subject, _shell(inner), plain


# ------------------------- Owner notification (always Serbian) -------------------------

OWNER_SUBJECT = "🚨 NOVA PORUKA SA SAJTA – Bua Luang Thai Spa"

# Native Serbian display labels for the language the visitor used on the site.
LANGUAGE_DISPLAY_SR = {
    "sr": "Srpski",
    "en": "Engleski",
    "ru": "Ruski",
    "zh": "Kineski",
    "th": "Tajlandski",
}


def render_owner_email(
    name: str,
    email: str,
    phone: str,
    message: str,
    language: str,
    submitted_at_iso: str,
    appointment_date: Optional[str] = None,
    appointment_time: Optional[str] = None,
    treatment: Optional[dict] = None,
) -> tuple[str, str, str]:
    """Return (subject, html, plain_text) for the internal owner notification email.

    The owner always sees the booking entirely in Serbian. When the visitor
    selected a treatment in the Pricing section, the `treatment` dict must
    already carry Serbian copies (name + description); the backend takes care
    of swapping `name_serbian`/`description_serbian` in before calling this.
    """
    safe_name = _html_escape(name)
    safe_email = _html_escape(email)
    safe_phone = _html_escape(phone) if phone else "—"
    safe_message = _html_escape(message).replace("\n", "<br/>")
    lang_display = LANGUAGE_DISPLAY_SR.get((language or "sr").lower(), (language or "sr").upper())
    safe_lang = _html_escape(lang_display)
    safe_time = _html_escape(submitted_at_iso.replace("T", " ").split(".")[0] + " UTC")

    rows = [
        ("Ime i prezime", safe_name),
        ("Email adresa", f'<a href="mailto:{safe_email}" style="color:#a17a35;text-decoration:none;">{safe_email}</a>'),
        ("Broj telefona", safe_phone if not phone else f'<a href="tel:{_html_escape(phone)}" style="color:#a17a35;text-decoration:none;">{safe_phone}</a>'),
        ("Datum i vreme termina", _html_escape(
            f"{appointment_date} u {appointment_time}" if (appointment_date and appointment_time)
            else (appointment_date or appointment_time or "—")
        )),
        ("Poruka / Zahtev za termin", safe_message),
        ("Izabrani jezik na sajtu", safe_lang),
        ("Datum i vreme slanja", safe_time),
    ]

    rows_html = "".join(
        f"""
        <tr>
          <td style="padding:10px 14px;width:38%;background:#fbf6ec;border:1px solid rgba(161,122,53,0.25);font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#a17a35;vertical-align:top;">
            {label}
          </td>
          <td style="padding:10px 14px;border:1px solid rgba(161,122,53,0.25);font-size:14px;line-height:1.6;color:#3a312a;vertical-align:top;">
            {value}
          </td>
        </tr>
        """
        for label, value in rows
    )

    # Beautiful Serbian treatment block (Name → Duration → Date/Time →
    # Description → Price) so the owner sees the booking in full detail.
    treatment_block = (
        _treatment_block_html("sr", treatment, appointment_date, appointment_time)
        if treatment else ""
    )

    inner = f"""
      <h1 style="margin:0 0 6px 0;font-size:22px;line-height:1.2;color:#a17a35;font-weight:400;letter-spacing:0.04em;">
        Nova poruka sa sajta
      </h1>
      <p style="margin:0 0 22px 0;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#7a6e5e;">
        Bua Luang Thai Spa &nbsp;·&nbsp; admin notifikacija
      </p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        {rows_html}
      </table>
      {treatment_block}
      <p style="margin:24px 0 0 0;font-size:13px;color:#7a6e5e;font-style:italic;">
        Ova poruka je automatski generisana kada je posetilac sajta poslao kontakt formu.
      </p>
    """

    plain_treatment = ""
    if treatment:
        plain_treatment = (
            "\nIzabrani tretman:\n"
            f"  Naziv masaže: {treatment.get('name','')}\n"
            f"  Trajanje: {treatment.get('duration','')} MIN\n"
        )
        if appointment_date or appointment_time:
            plain_treatment += (
                f"  Datum i vreme: "
                f"{(appointment_date or '')}{(' u ' + appointment_time) if appointment_time else ''}\n"
            )
        if treatment.get("description"):
            plain_treatment += f"  Opis: {treatment['description']}\n"
        plain_treatment += f"  Cena: {_format_price(treatment.get('price',0))} RSD\n"

    plain = (
        "NOVA PORUKA SA SAJTA – Bua Luang Thai Spa\n\n"
        f"Ime i prezime: {name}\n"
        f"Email adresa: {email}\n"
        f"Broj telefona: {phone or '—'}\n"
        f"Datum i vreme termina: "
        f"{(appointment_date or '—')}{(' u ' + appointment_time) if appointment_time else ''}\n"
        f"Poruka: {message}\n"
        f"Izabrani jezik: {lang_display}\n"
        f"Datum/vreme slanja: {submitted_at_iso}\n"
        f"{plain_treatment}"
    )

    return OWNER_SUBJECT, _shell(inner), plain
