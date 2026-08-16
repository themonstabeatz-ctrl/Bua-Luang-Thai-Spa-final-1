"""Verify that appointment date and time are persisted via POST /api/contact."""
import os
import time
from datetime import date, timedelta
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"

# Far enough in the future to always be a fresh, fully free working day.
FUTURE_DATE = (date.today() + timedelta(days=45)).isoformat()


def _post(payload):
    return requests.post(f"{API}/contact", json=payload, timeout=15)


def _find(created_id):
    items = requests.get(f"{API}/contact", timeout=15).json()
    return next((it for it in items if it["id"] == created_id), None)


def test_backend_persists_appointment_date_time_with_correct_keys():
    """Backend contract: keys are appointment_date / appointment_time."""
    payload = {
        "name": "TEST_AppointmentBackendKeys",
        "email": "test_appt_backend@example.com",
        "phone": "+381600000001",
        "message": "TEST appointment backend keys",
        "language": "sr",
        "appointment_date": FUTURE_DATE,
        "appointment_time": "15:00",
    }
    r = _post(payload)
    assert r.status_code == 200, r.text
    created_id = r.json()["id"]
    time.sleep(1)
    doc = _find(created_id)
    assert doc is not None, "record not retrieved via GET"
    assert doc.get("appointment_date") == FUTURE_DATE, (
        f"appointment_date not persisted, got: {doc.get('appointment_date')}"
    )
    assert doc.get("appointment_time") == "15:00", (
        f"appointment_time not persisted, got: {doc.get('appointment_time')}"
    )


def test_slot_and_buffer_are_blocked_after_booking():
    """The booked slot plus its 30-minute buffer must disappear from availability."""
    slots = requests.get(
        f"{API}/availability", params={"date": FUTURE_DATE, "duration": 60}, timeout=15
    ).json()["slots"]
    busy = {s["time"] for s in slots if not s["available"]}
    # 15:00–16:00 booking + 30 min break blocks 14:00…16:00 for a 60-min treatment.
    for t in ("14:00", "14:30", "15:00", "15:30", "16:00"):
        assert t in busy, f"{t} should be blocked, got busy={sorted(busy)}"
    assert "16:30" not in busy

    # Re-booking the exact same slot must be rejected.
    r = _post({
        "name": "TEST_DuplicateSlot",
        "email": "test_dup@example.com",
        "message": "TEST duplicate",
        "language": "sr",
        "appointment_date": FUTURE_DATE,
        "appointment_time": "15:00",
    })
    assert r.status_code == 409, r.text


def test_invalid_times_are_rejected():
    for bad in ("09:30", "21:30", "22:00", "10:15"):
        r = _post({
            "name": "TEST_BadTime",
            "email": "test_bad@example.com",
            "message": "TEST bad time",
            "language": "sr",
            "appointment_date": FUTURE_DATE,
            "appointment_time": bad,
        })
        assert r.status_code == 422, f"{bad} should be rejected, got {r.status_code}"
