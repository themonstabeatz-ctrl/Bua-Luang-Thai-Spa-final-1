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

## Backlog (P1 / P2)
- Photo gallery
- Google Reviews integration
- Floating WhatsApp booking button
- Analytics + conversion tracking

## Testing Rules
User prefers self-testing (curl + screenshots) over testing agent to save credits, unless the change is large.

## Integrations
- Resend (email) — RESEND_API_KEY in `/app/backend/.env`
