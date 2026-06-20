"""Unit tests for email rendering (client + owner).

Spec (iteration 7):
 - Client email content order must be Name → Duration → Selected Date/Time
   → Description → Price, fully translated to the visitor's language.
 - Below that block: a "Call us" CTA (localised) and an Instagram link to
   https://www.instagram.com/bualuang_thai_spa/
 - Owner email must always be ENTIRELY in Serbian regardless of visitor
   language, must include the full Serbian massage details (name +
   description + duration + price + chosen date/time), AND must include a
   metadata row "Izabrani jezik na sajtu" with the visitor language shown
   as 'Srpski' / 'Engleski' / 'Ruski' / 'Kineski' / 'Tajlandski'.
"""
import sys
import os

# Make the backend package importable.
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

import pytest
from email_templates import (
    render_client_email,
    render_owner_email,
    CLIENT_TREATMENT_COPY,
    INSTAGRAM_URL,
    LANGUAGE_DISPLAY_SR,
)


TREATMENT_LOCAL = {
    "sr": "Aroma Masaža",
    "en": "Aroma Massage",
    "ru": "Арома Массаж",
    "zh": "香薰按摩",
    "th": "นวดอโรมา",
}
TREATMENT_DESC_LOCAL = {
    "sr": "Aroma masaža sa esencijalnim uljima.",
    "en": "Aroma massage with essential oils.",
    "ru": "Арома-массаж с эфирными маслами.",
    "zh": "使用精油的香薰按摩。",
    "th": "นวดอโรมาด้วยน้ำมันหอมระเหย",
}


# ---------- CLIENT EMAIL ----------
class TestClientEmail:
    @pytest.mark.parametrize("lang", ["sr", "en", "ru", "zh", "th"])
    def test_client_email_contains_localised_block_in_correct_order(self, lang):
        treatment = {
            "name": TREATMENT_LOCAL[lang],
            "duration": 90,
            "price": 5300,
            "description": TREATMENT_DESC_LOCAL[lang],
        }
        subject, html, plain = render_client_email(
            language=lang,
            name="Marko",
            phone="+38161000111",
            message="Test message",
            treatment=treatment,
            appointment_date="2026-07-01",
            appointment_time="18:30",
        )
        c = CLIENT_TREATMENT_COPY[lang]

        # All localised labels must appear
        for key in [
            "name_label", "duration_label", "datetime_label",
            "description_label", "price_label", "call_us_heading",
            "instagram_cta",
        ]:
            assert c[key] in html, (
                f"[{lang}] missing label '{c[key]}' for key {key}"
            )

        # Name must appear
        assert TREATMENT_LOCAL[lang] in html
        # Description must appear
        assert TREATMENT_DESC_LOCAL[lang] in html
        # Price formatted with Serbian thousands separator (.)
        assert "5.300" in html
        # Datetime
        assert "2026-07-01" in html
        assert "18:30" in html
        # Instagram link
        assert INSTAGRAM_URL in html

        # Strict ORDER: Name → Duration → Date/Time → Description → Price.
        # Search only within the treatment block (anchored by block_heading)
        # because some localised labels (e.g. Thai "รายละเอียด") may also
        # appear in surrounding marketing copy.
        block_start = html.find(c["block_heading"])
        assert block_start != -1, f"[{lang}] block_heading not found in html"
        sub = html[block_start:]
        idx_name = sub.find(c["name_label"])
        idx_duration = sub.find(c["duration_label"])
        idx_datetime = sub.find(c["datetime_label"])
        idx_desc = sub.find(c["description_label"])
        idx_price = sub.find(c["price_label"])
        assert -1 not in (idx_name, idx_duration, idx_datetime, idx_desc, idx_price)
        assert idx_name < idx_duration < idx_datetime < idx_desc < idx_price, (
            f"[{lang}] block order is wrong: name={idx_name} duration={idx_duration} "
            f"datetime={idx_datetime} desc={idx_desc} price={idx_price}"
        )

        # Call CTA must precede the Instagram link
        idx_call = html.find(c["call_us_heading"])
        idx_insta = html.find(INSTAGRAM_URL)
        assert idx_call != -1 and idx_insta != -1
        assert idx_call < idx_insta

    def test_client_email_plain_text_contains_treatment(self):
        subject, html, plain = render_client_email(
            language="en",
            name="Marko",
            phone="+38161000111",
            message="Hello",
            treatment={
                "name": "Aroma Massage", "duration": 90,
                "price": 5300, "description": "Aroma desc.",
            },
            appointment_date="2026-07-01",
            appointment_time="18:30",
        )
        assert "Aroma Massage" in plain
        assert "5.300" in plain
        assert INSTAGRAM_URL in plain


# ---------- OWNER EMAIL ----------
class TestOwnerEmail:
    @pytest.mark.parametrize("lang", ["sr", "en", "ru", "zh", "th"])
    def test_owner_email_always_serbian(self, lang):
        treatment_serbian = {
            "name": "Aroma Masaža",
            "duration": 90,
            "price": 5300,
            "description": "Aroma masaža sa esencijalnim uljima.",
        }
        subject, html, plain = render_owner_email(
            name="Marko",
            email="marko@example.com",
            phone="+38161000111",
            message="Test",
            language=lang,
            submitted_at_iso="2026-06-20T12:00:00",
            appointment_date="2026-07-01",
            appointment_time="18:30",
            treatment=treatment_serbian,
        )
        # Subject is hardcoded Serbian
        assert "NOVA PORUKA" in subject

        # Serbian static labels are present
        for label in [
            "Ime i prezime", "Email adresa", "Broj telefona",
            "Datum i vreme termina", "Izabrani jezik na sajtu",
            "Poruka", "Trajanje", "Cena", "Naziv masaže", "Opis",
        ]:
            assert label in html, f"[{lang}] owner email missing label '{label}'"

        # Visitor language displayed in Serbian
        assert LANGUAGE_DISPLAY_SR[lang] in html

        # Serbian treatment details (always SR)
        assert "Aroma Masaža" in html
        assert "Aroma masaža sa esencijalnim uljima." in html

        # Price uses Serbian thousands separator (".", not ",")
        assert "5.300" in html
        assert "5,300" not in html

        # Appointment date/time
        assert "2026-07-01" in html
        assert "18:30" in html

        # Plain text also Serbian
        assert "Ime i prezime: Marko" in plain
        assert f"Izabrani jezik: {LANGUAGE_DISPLAY_SR[lang]}" in plain
        assert "Aroma Masaža" in plain
        assert "5.300" in plain

    def test_owner_email_without_treatment(self):
        """Owner email must still render correctly without a selected treatment."""
        subject, html, plain = render_owner_email(
            name="Ana",
            email="ana@example.com",
            phone="",
            message="Pitanje o radnom vremenu",
            language="sr",
            submitted_at_iso="2026-06-20T12:00:00",
        )
        assert "Ime i prezime" in html
        assert "Ana" in html
        assert "Srpski" in html


# ---------- LANGUAGE LABEL MAP ----------
def test_language_display_map_covers_all_supported_langs():
    assert set(LANGUAGE_DISPLAY_SR.keys()) >= {"sr", "en", "ru", "zh", "th"}
    assert LANGUAGE_DISPLAY_SR["en"] == "Engleski"
    assert LANGUAGE_DISPLAY_SR["ru"] == "Ruski"
    assert LANGUAGE_DISPLAY_SR["zh"] == "Kineski"
    assert LANGUAGE_DISPLAY_SR["th"] == "Tajlandski"
    assert LANGUAGE_DISPLAY_SR["sr"] == "Srpski"
