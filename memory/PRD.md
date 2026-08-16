# Bua Luang Thai Spa — PRD

## Original Problem Statement
Premium single-page website for "Bua Luang Thai Spa" (Belgrade). Light luxury theme, ivory/cream backgrounds, gold accents. Multilingual (SR, EN, RU, ZH, TH). Interactive pricing. Custom booking form with iOS-style time wheel picker (10:00–21:00). Automated multilingual email via Resend (client localized + `.ics` calendar; owner in Serbian). Local SEO (JSON-LD, hreflang, canonicals). Subtle "Last booked slot" social proof.

**User language**: Serbian (sr-RS). Agent must reply in Serbian.

## Architecture
```
/app/backend/         (FastAPI + Motor + Resend)
  server.py, email_templates.py, ics_calendar.py
/app/frontend/        (React SPA)
  src/components/  Hero, ContactSection, TimeWheelPicker, Footer, LastBookedSlot, SEOHead
  src/i18n/translations.js
  src/App.js       (JS parallax)
  src/pages/ServicePage.jsx
  src/seo/services.js
```

## Completed
- 2026-02: Localized SPA (5 langs) + luxury theme + parallax + Resend emails + `.ics`
- 2026-02: iOS drum wheel time picker (10:00–21:00 clamp)
- 2026-02: Mobile UI fixes (hero framing, calendar default date, calendar overflow, larger picker font, icon toggle)
- 2026-02: **Cancel button on time picker clears the time field** (leaves it blank)
- 2026-02: **Footer credit line** added across all 5 languages: "Website napravili Savatije Grujović i Miloš Stanojević" (translated per language)
- 2026-08-16: **Removed `.ics` attachment** from client email (it caused Gmail's "Add to Calendar / Directions" card above the email). `ics_calendar.py` deleted.
- 2026-08-16: **New email cover banner** replaces the black logo header in both client + owner emails (`email_templates.LOGO_URL`, full-bleed 620px).
- 2026-08-16: **New Instagram** `https://www.instagram.com/bua.luang.thai.spa/` everywhere: `backend/.env` (SALON_INSTAGRAM_URL), email templates, Footer, SEOHead fallback, booking contact options. Old handle removed.
- 2026-08-16: **Booking system**: `backend/slots.py` + `GET /api/availability?date=&duration=`; slots every 30 min 10:00–21:00, appointment must FINISH by 22:00, mandatory 30-min buffer after each booking, past slots auto-disabled in Europe/Belgrade time, future dates open automatically. `POST /api/contact` returns **409** for taken slots; validator now accepts only :00/:30 up to 21:00.
- 2026-08-16: **Frontend slot grid** (`components/SlotGrid.jsx`) replaces the wheel picker (`TimeWheelPicker.jsx` deleted). Busy/late slots rendered disabled + struck through. Flatpickr `minDate` fixed to `"today"` (previously an ISO string was mis-parsed by the d.m.Y format, allowing past dates).
- 2026-08-16: **Booking contact options** row (Telefon / Viber / Instagram / Email) + "no online payment" note in the form, translated in all 5 languages.
- 2026-08-16: **Local SEO boost**: `seo/localSeo.js` (keyword sets + FAQ per language), visible FAQ section (`components/FaqSection.jsx`) backed by FAQPage JSON-LD, plus LocalBusiness enrichment (alternateName, areaServed Belgrade districts, knowsAbout, availableLanguage, paymentAccepted) and `keywords`/geo meta tags.

## SEO note (honest limitation)
On-page SEO now targets the comparison queries ("najbolji tajlandski salon za masažu u Beogradu" etc.). Outranking named competitors additionally requires: a verified Google Business Profile with the exact address, real Google reviews, local backlinks/directories, and the live domain (`bualuangthaispa.rs`) indexed. Cannot be guaranteed by code alone.

## Backlog (P1 / P2)
- Photo gallery
- Google Reviews integration
- Floating WhatsApp booking button
- Analytics + conversion tracking

## Testing Rules
User prefers self-testing (curl + screenshots) over testing agent to save credits, unless the change is large.

## Integrations
- Resend (email) — RESEND_API_KEY in `/app/backend/.env`
