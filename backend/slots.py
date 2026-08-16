"""Booking slot availability rules for Bua Luang Thai Spa.

Business rules (confirmed by the owner):
  • Slots every 30 minutes, from 10:00 up to and including 21:00.
  • The salon closes at 22:00, so an appointment must FINISH by 22:00
    (the 21:00 slot therefore only accepts a 60-minute treatment).
  • A single therapist works alone, so a mandatory 30-minute break follows
    every booked appointment before the next one may start.
"""
from __future__ import annotations

from datetime import datetime
from zoneinfo import ZoneInfo

TZ = ZoneInfo("Europe/Belgrade")

OPEN_MIN = 10 * 60        # 10:00 — first slot
LAST_SLOT_MIN = 21 * 60   # 21:00 — last bookable start
CLOSE_MIN = 22 * 60       # 22:00 — salon closes
STEP_MIN = 30
BUFFER_MIN = 30
DEFAULT_DURATION = 60


def to_hhmm(minutes: int) -> str:
    return f"{minutes // 60:02d}:{minutes % 60:02d}"


def to_minutes(hhmm: str) -> int:
    h, m = str(hhmm).strip().split(":")
    return int(h) * 60 + int(m)


def all_slot_minutes() -> list[int]:
    return list(range(OPEN_MIN, LAST_SLOT_MIN + 1, STEP_MIN))


def compute_slots(date_iso: str, duration: int, bookings, now: datetime | None = None):
    """Return [{time, available, reason}] for every slot of `date_iso`.

    `bookings` is an iterable of (start_hhmm, duration_minutes) already
    booked for that same date.
    """
    duration = int(duration or DEFAULT_DURATION)
    now = now or datetime.now(TZ)
    today_iso = now.strftime("%Y-%m-%d")
    now_min = now.hour * 60 + now.minute

    blocked = []
    for start, dur in bookings:
        try:
            s = to_minutes(start)
        except Exception:
            continue
        blocked.append((s, s + int(dur or DEFAULT_DURATION) + BUFFER_MIN))

    out = []
    for s in all_slot_minutes():
        end = s + duration
        reason = None
        if end > CLOSE_MIN:
            reason = "closing"
        elif date_iso < today_iso or (date_iso == today_iso and s <= now_min):
            reason = "past"
        else:
            for b_start, b_end_with_buffer in blocked:
                # The candidate also needs its own trailing buffer, so it must
                # not start before the previous booking's buffer has elapsed
                # and must not run into the next booking.
                if s < b_end_with_buffer and (end + BUFFER_MIN) > b_start:
                    reason = "booked"
                    break
        out.append({"time": to_hhmm(s), "available": reason is None, "reason": reason})
    return out


def is_slot_available(date_iso: str, time_hhmm: str, duration: int, bookings) -> tuple[bool, str | None]:
    for slot in compute_slots(date_iso, duration, bookings):
        if slot["time"] == time_hhmm:
            return slot["available"], slot["reason"]
    return False, "invalid"
