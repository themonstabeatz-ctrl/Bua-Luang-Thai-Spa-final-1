"""HTML email templates for Bua Luang Thai Spa."""

LOGO_URL = (
    "https://customer-assets.emergentagent.com/job_bua-luang-spa/artifacts/"
    "5esihdex_Bua%20luang%20logo%20crna%20senka.png"
)
BRAND_PHONE = "+381 62 625 500"
BRAND_EMAIL = "bualuangthailandspa@gmail.com"


# ------------------------- Client confirmation (per language) -------------------------

CLIENT_SUBJECTS = {
    "sr": "Hvala što ste nas kontaktirali — Bua Luang Thai Spa",
    "en": "Thank you for contacting us — Bua Luang Thai Spa",
    "ru": "Спасибо, что связались с нами — Bua Luang Thai Spa",
    "zh": "感谢您与我们联系 — Bua Luang Thai Spa",
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


def render_client_email(language: str, name: str, phone: str, message: str) -> tuple[str, str, str]:
    """Return (subject, html, plain_text) for the client confirmation email."""
    lang = language if language in CLIENT_COPY else "sr"
    c = CLIENT_COPY[lang]
    subject = CLIENT_SUBJECTS[lang]

    safe_name = _html_escape(name)
    safe_phone = _html_escape(phone) if phone else c["phone_empty"]
    safe_message = _html_escape(message).replace("\n", "<br/>")

    inner = f"""
      <h1 style="margin:0 0 18px 0;font-size:24px;line-height:1.2;color:#a17a35;font-weight:400;letter-spacing:0.02em;">
        {c['greeting'].format(name=safe_name)}
      </h1>
      <p style="margin:0 0 14px 0;font-size:15px;line-height:1.7;color:#3a312a;">
        {c['intro']}
      </p>
      <p style="margin:0 0 22px 0;font-size:15px;line-height:1.7;color:#3a312a;">
        {c['review']}
      </p>
      <div style="margin:24px 0;padding:18px 22px;background:#fbf6ec;border:1px solid rgba(161,122,53,0.25);border-radius:12px;">
        <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a17a35;margin-bottom:10px;">
          {c['data_heading']}
        </div>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;color:#3a312a;">
          <tr>
            <td style="padding:4px 0;width:130px;color:#7a6e5e;font-family:Arial,sans-serif;">{c['phone_label']}:</td>
            <td style="padding:4px 0;">{safe_phone}</td>
          </tr>
          <tr>
            <td valign="top" style="padding:4px 0;color:#7a6e5e;font-family:Arial,sans-serif;">{c['message_label']}:</td>
            <td style="padding:4px 0;line-height:1.6;">{safe_message}</td>
          </tr>
        </table>
      </div>
      <p style="margin:18px 0 26px 0;font-size:15px;line-height:1.7;color:#3a312a;font-style:italic;">
        {c['closing']}
      </p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#3a312a;">
        {c['signoff']}<br/>
        <span style="color:#a17a35;font-weight:600;letter-spacing:0.02em;">{c['team']}</span>
      </p>
    """

    plain = (
        f"{c['greeting'].format(name=name)}\n\n"
        f"{c['intro']}\n\n"
        f"{c['review']}\n\n"
        f"{c['data_heading']}:\n"
        f"  {c['phone_label']}: {phone or c['phone_empty']}\n"
        f"  {c['message_label']}: {message}\n\n"
        f"{c['closing']}\n\n"
        f"{c['signoff']}\n{c['team']}\n"
        f"{BRAND_EMAIL} · {BRAND_PHONE}\n"
    )

    return subject, _shell(inner), plain


# ------------------------- Owner notification (always Serbian) -------------------------

OWNER_SUBJECT = "🚨 NOVA PORUKA SA SAJTA – Bua Luang Thai Spa"


def render_owner_email(
    name: str,
    email: str,
    phone: str,
    message: str,
    language: str,
    submitted_at_iso: str,
) -> tuple[str, str, str]:
    """Return (subject, html, plain_text) for the internal owner notification email."""
    safe_name = _html_escape(name)
    safe_email = _html_escape(email)
    safe_phone = _html_escape(phone) if phone else "—"
    safe_message = _html_escape(message).replace("\n", "<br/>")
    safe_lang = _html_escape((language or "sr").upper())
    safe_time = _html_escape(submitted_at_iso.replace("T", " ").split(".")[0] + " UTC")

    rows = [
        ("Ime i prezime", safe_name),
        ("Email adresa", f'<a href="mailto:{safe_email}" style="color:#a17a35;text-decoration:none;">{safe_email}</a>'),
        ("Broj telefona", safe_phone if not phone else f'<a href="tel:{_html_escape(phone)}" style="color:#a17a35;text-decoration:none;">{safe_phone}</a>'),
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
      <p style="margin:24px 0 0 0;font-size:13px;color:#7a6e5e;font-style:italic;">
        Ova poruka je automatski generisana kada je posetilac sajta poslao kontakt formu.
      </p>
    """

    plain = (
        "NOVA PORUKA SA SAJTA – Bua Luang Thai Spa\n\n"
        f"Ime i prezime: {name}\n"
        f"Email adresa: {email}\n"
        f"Broj telefona: {phone or '—'}\n"
        f"Poruka: {message}\n"
        f"Izabrani jezik: {(language or 'sr').upper()}\n"
        f"Datum/vreme: {submitted_at_iso}\n"
    )

    return OWNER_SUBJECT, _shell(inner), plain
