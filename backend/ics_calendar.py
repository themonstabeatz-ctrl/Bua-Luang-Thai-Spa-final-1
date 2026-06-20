"""Generate a minimal RFC 5545 iCalendar (.ics) file for a spa booking.

The ICS is attached to the client confirmation email so the visitor can add
the appointment to Apple Calendar / Google Calendar / Outlook with one click.

We embed the VTIMEZONE block for Europe/Belgrade so that the event time is
unambiguous across DST regardless of where the recipient lives. The salon
is at a fixed Belgrade address, so all bookings use the salon's local time.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Optional
import uuid


# A minimal but DST-correct VTIMEZONE for Europe/Belgrade (CET/CEST).
# These RRULEs match the EU DST schedule (last Sun of Oct / last Sun of Mar).
BELGRADE_VTIMEZONE = (
    "BEGIN:VTIMEZONE\r\n"
    "TZID:Europe/Belgrade\r\n"
    "BEGIN:STANDARD\r\n"
    "DTSTART:19701025T030000\r\n"
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10\r\n"
    "TZNAME:CET\r\n"
    "TZOFFSETFROM:+0200\r\n"
    "TZOFFSETTO:+0100\r\n"
    "END:STANDARD\r\n"
    "BEGIN:DAYLIGHT\r\n"
    "DTSTART:19700329T020000\r\n"
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3\r\n"
    "TZNAME:CEST\r\n"
    "TZOFFSETFROM:+0100\r\n"
    "TZOFFSETTO:+0200\r\n"
    "END:DAYLIGHT\r\n"
    "END:VTIMEZONE\r\n"
)

SALON_NAME = "Bua Luang Thai Spa"
SALON_LOCATION = "Beograd, Srbija"


def _fmt_local(dt: datetime) -> str:
    """Format a naive datetime as YYYYMMDDTHHMMSS (local, no Z suffix)."""
    return dt.strftime("%Y%m%dT%H%M%S")


def _fmt_utc(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


def _escape(text: str) -> str:
    """Escape ICS TEXT values per RFC 5545 §3.3.11."""
    if text is None:
        return ""
    return (
        str(text)
        .replace("\\", "\\\\")
        .replace(";", "\\;")
        .replace(",", "\\,")
        .replace("\r\n", "\\n")
        .replace("\n", "\\n")
    )


def _fold(line: str) -> str:
    """RFC 5545 line folding at 75 octets (we approximate by characters)."""
    if len(line) <= 75:
        return line
    parts = [line[:75]]
    rest = line[75:]
    while rest:
        parts.append(" " + rest[:74])
        rest = rest[74:]
    return "\r\n".join(parts)


def build_appointment_ics(
    *,
    summary: str,
    description: str,
    date_iso: str,        # 'YYYY-MM-DD'
    time_hhmm: str,       # 'HH:MM' (24h, salon-local)
    duration_minutes: int,
    location: str = SALON_LOCATION,
    organizer_email: Optional[str] = None,
) -> str:
    """Return a full VCALENDAR string for a single appointment."""
    y, m, d = map(int, date_iso.split("-"))
    h, mi = map(int, time_hhmm.split(":"))
    start = datetime(y, m, d, h, mi)
    end = start + timedelta(minutes=max(1, int(duration_minutes or 60)))

    now_utc = datetime.now(timezone.utc)
    uid = f"{uuid.uuid4()}@bualuang-thai-spa"

    org_line = ""
    if organizer_email:
        org_line = f"ORGANIZER;CN={_escape(SALON_NAME)}:mailto:{organizer_email}\r\n"

    lines = (
        "BEGIN:VCALENDAR\r\n"
        "VERSION:2.0\r\n"
        "PRODID:-//Bua Luang Thai Spa//Booking//EN\r\n"
        "CALSCALE:GREGORIAN\r\n"
        "METHOD:PUBLISH\r\n"
        f"{BELGRADE_VTIMEZONE}"
        "BEGIN:VEVENT\r\n"
        f"UID:{uid}\r\n"
        f"DTSTAMP:{_fmt_utc(now_utc)}\r\n"
        f"DTSTART;TZID=Europe/Belgrade:{_fmt_local(start)}\r\n"
        f"DTEND;TZID=Europe/Belgrade:{_fmt_local(end)}\r\n"
        f"{_fold('SUMMARY:' + _escape(summary))}\r\n"
        f"{_fold('DESCRIPTION:' + _escape(description))}\r\n"
        f"{_fold('LOCATION:' + _escape(location))}\r\n"
        f"{org_line}"
        "STATUS:CONFIRMED\r\n"
        "TRANSP:OPAQUE\r\n"
        "BEGIN:VALARM\r\n"
        "TRIGGER:-PT2H\r\n"
        "ACTION:DISPLAY\r\n"
        f"{_fold('DESCRIPTION:' + _escape(summary))}\r\n"
        "END:VALARM\r\n"
        "END:VEVENT\r\n"
        "END:VCALENDAR\r\n"
    )
    return lines
