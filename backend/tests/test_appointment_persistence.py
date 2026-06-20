"""Verify that appointment date and time are persisted via POST /api/contact.

Iteration 4 introduced custom Flatpickr-based date/time pickers in the
frontend. The frontend keeps the local state keys as `date` and `time`
(see ContactSection.jsx) and spreads them as-is into the POST body, but
the backend Pydantic model `ContactCreate` declares them as
`appointment_date` / `appointment_time`. Pydantic silently ignores extras,
so any payload using the frontend keys will SILENTLY DROP the booking
date/time.

These tests document and verify the contract.
"""
import os
import time
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


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
        "appointment_date": "2026-07-20",
        "appointment_time": "15:00",
    }
    r = _post(payload)
    assert r.status_code == 200, r.text
    created_id = r.json()["id"]
    time.sleep(1)
    doc = _find(created_id)
    assert doc is not None, "record not retrieved via GET"
    assert doc.get("appointment_date") == "2026-07-20", (
        f"appointment_date not persisted, got: {doc.get('appointment_date')}"
    )
    assert doc.get("appointment_time") == "15:00", (
        f"appointment_time not persisted, got: {doc.get('appointment_time')}"
    )


def test_frontend_compatible_payload_date_time_keys():
    """Reproduces what the frontend actually sends (date/time top-level keys).

    If the backend silently drops these, the entire booking feature is broken
    end-to-end despite the 200 OK.
    """
    payload = {
        "name": "TEST_AppointmentFrontendKeys",
        "email": "test_appt_frontend@example.com",
        "phone": "+381600000002",
        # These are the EXACT keys the frontend sends today:
        "date": "2026-07-20",
        "time": "15:00",
        "message": "TEST appointment frontend keys",
        "language": "sr",
    }
    r = _post(payload)
    assert r.status_code == 200, r.text
    created_id = r.json()["id"]
    time.sleep(1)
    doc = _find(created_id)
    assert doc is not None
    # This is the integration assertion that will FAIL until the bug is fixed.
    assert doc.get("appointment_date") == "2026-07-20", (
        "FRONTEND/BACKEND CONTRACT BROKEN: frontend sends `date` but backend "
        "expects `appointment_date`; booking date is silently lost. "
        f"Persisted doc: {doc}"
    )
    assert doc.get("appointment_time") == "15:00", (
        "FRONTEND/BACKEND CONTRACT BROKEN: frontend sends `time` but backend "
        "expects `appointment_time`; booking time is silently lost."
    )
