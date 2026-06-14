"""Backend tests for Bua Luang Thai Spa contact API (iteration 5).

Schema changed:
  - removed: email_sent
  - added:   client_email_sent (bool), owner_email_sent (bool), email_error (str|null)
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Root ----
class TestRoot:
    def test_root_ok(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        assert "Bua Luang Thai Spa" in r.json().get("message", "")


# ---- POST /api/contact ----
class TestContactCreate:
    def test_create_contact_sr(self, api_client):
        payload = {
            "name": "TEST_Sr User",
            "email": "test_sr@example.com",
            "phone": "+38161234567",
            "message": "TEST_SR poruka",
            "language": "sr",
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "_id" not in data
        assert data["name"] == "TEST_Sr User"
        assert data["email"] == "test_sr@example.com"
        assert data["language"] == "sr"
        # New schema fields
        assert "client_email_sent" in data
        assert "owner_email_sent" in data
        assert "email_error" in data
        assert isinstance(data["client_email_sent"], bool)
        assert isinstance(data["owner_email_sent"], bool)
        # email_sent (old field) must no longer be returned
        assert "email_sent" not in data
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0
        assert data.get("created_at")

    @pytest.mark.parametrize("lang", ["en", "ru", "zh"])
    def test_create_contact_other_languages(self, api_client, lang):
        payload = {
            "name": f"TEST_{lang.upper()}",
            "email": f"test_{lang}@example.com",
            "message": f"TEST message in {lang}",
            "language": lang,
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["language"] == lang
        assert data["name"] == f"TEST_{lang.upper()}"
        assert "client_email_sent" in data
        assert "owner_email_sent" in data

    def test_background_task_persists_email_outcome(self, api_client):
        """Even when SMTP fails (Gmail 535 in sandbox), background task must
        update the DB record with client_email_sent=False, owner_email_sent=False,
        email_error non-null. We verify via GET after a short wait."""
        payload = {
            "name": "TEST_BGOutcome",
            "email": "test_bgoutcome@example.com",
            "message": "TEST background outcome",
            "language": "sr",
        }
        created = api_client.post(f"{API}/contact", json=payload).json()
        created_id = created["id"]
        # Wait for background task to attempt SMTP and persist outcome
        time.sleep(8)
        items = api_client.get(f"{API}/contact").json()
        match = next((it for it in items if it["id"] == created_id), None)
        assert match is not None, "Created record not found in GET list"
        assert "client_email_sent" in match
        assert "owner_email_sent" in match
        assert "email_error" in match
        # Outcome assertion: either both succeeded OR both failed with error string.
        if not match["client_email_sent"] or not match["owner_email_sent"]:
            assert match["email_error"], "email_error must be set when SMTP fails"

    def test_missing_required_fields_returns_422(self, api_client):
        r = api_client.post(f"{API}/contact", json={"email": "x@y.com"})
        assert r.status_code == 422

    def test_invalid_email_returns_422(self, api_client):
        r = api_client.post(f"{API}/contact", json={
            "name": "TEST", "email": "notanemail", "message": "hi"
        })
        assert r.status_code == 422

    def test_empty_message_returns_422(self, api_client):
        r = api_client.post(f"{API}/contact", json={
            "name": "TEST", "email": "a@b.com", "message": ""
        })
        assert r.status_code == 422


# ---- GET /api/contact ----
class TestContactList:
    def test_list_returns_persisted_records(self, api_client):
        payload = {
            "name": "TEST_ListCheck",
            "email": "test_listcheck@example.com",
            "message": "TEST_list persistence",
            "language": "en",
        }
        created = api_client.post(f"{API}/contact", json=payload).json()
        created_id = created["id"]

        r = api_client.get(f"{API}/contact")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) > 0

        for it in items:
            assert "_id" not in it
            assert "id" in it
            assert "name" in it
            assert "email" in it
            assert "language" in it
            assert "client_email_sent" in it
            assert "owner_email_sent" in it
            # old field must not leak
            assert "email_sent" not in it

        ids = [it["id"] for it in items]
        assert created_id in ids
        # Most recent first
        assert ids.index(created_id) < 5
