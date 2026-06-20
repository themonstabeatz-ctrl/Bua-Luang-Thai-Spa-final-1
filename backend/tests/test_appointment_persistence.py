"""Verify that appointment date and time are persisted via POST /api/contact.

Iteration 4 introduced custom Flatpickr-based date/time pickers in the
frontend. The frontend now sends explicit `appointment_date` /
`appointment_time` keys (see ContactSection.jsx onSubmit) which match the
backend `ContactCreate` Pydantic model. This test guards that contract.
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
