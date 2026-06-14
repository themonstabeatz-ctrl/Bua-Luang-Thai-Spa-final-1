"""Backend tests for Bua Luang Thai Spa contact API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://bua-luang-spa.preview.emergentagent.com").rstrip("/")
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
        assert isinstance(data["email_sent"], bool)
        # Email is sent via BackgroundTasks, so on the immediate response email_sent
        # will typically be False and email_error None. SMTP outcome is written
        # to the DB record by the background task. Accept either state here.
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
        # API should not crash on SMTP failures
        assert "email_sent" in data

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
        # Create one record first
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

        # No mongo _id leakage
        for it in items:
            assert "_id" not in it
            assert "id" in it
            assert "name" in it
            assert "email" in it
            assert "language" in it

        # Most recent first - verify our just-created record is in the list
        ids = [it["id"] for it in items]
        assert created_id in ids
        # Recent first ordering: our created record should be near the top
        assert ids.index(created_id) < 5
