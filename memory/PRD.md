# Bua Luang Thai Spa — PRD

## Original problem statement
Single-page luxury website for Bua Luang Thai Spa in Belgrade. Bright ivory/cream light luxury theme with gold accents. Must convert visitors into appointment bookings.

## Core requirements
- React SPA + FastAPI backend + MongoDB.
- 5 languages with country flag selector: Serbian (default), English, Russian, Chinese, Thai.
- Fixed parallax hero, fading logo overlays, sliding section animations.
- Interactive pricing section: checkboxes auto-populate the booking form's Message field — in the visitor's current language.
- Contact form with Date and Time pickers restricted to business hours 10:00–22:00.
- Automated Resend dual emails: client (localized) + owner (always Serbian, with metadata showing visitor's language as Srpski / Engleski / Ruski / Kineski / Tajlandski).
- Floating WhatsApp + Viber chat widget with seasonal greeting (Dobro jutro / Dobar dan / Dobro veče) keyed to Belgrade time + season.
- Local SEO: JSON-LD schema, robots.txt, sitemap.xml.

## User language
Serbian (sr-RS). All agent responses must be in Serbian.

## Implemented (chronological)
- 2026 — Initial dark theme MVP, then full re-skin to light luxury.
- 2026 — Multilingual (sr/en/ru/zh/th) with flags + native font stacks.
- 2026 — Resend integration (replaces nodemailer). Domain verified.
- 2026 — Interactive pricing → form binding with Serbian copy for owner.
- 2026 — Local SEO (JSON-LD, robots, sitemap, optimized H1s).
- 2026 — WhatsApp + Viber widget, viber://chat?number= without text= param.
- 2026 — Seasonal greeting (winter 17:00→05:00 evening / summer 20:00→05:00 evening).
- 2026 — Custom Flatpickr date picker (DD.MM.YYYY, gold/cream theme).
- 2026 — `appointment_date` / `appointment_time` wire contract fix.
- 2026 — Custom iOS-style scroll-wheel time picker (hours 10–22, minutes 00/15/30/45). Strict single-step snapping (no skipping on fast scroll).
- 2026 — Owner email gets full Serbian treatment block (name_serbian + description_serbian + price + date/time).
- 2026 — Backend pytest suite: 24/24 PASS (contact API + appointment persistence + email rendering across 5 langs).

## Backlog (P1)
- Exact WhatsApp message template text — still pending user clarification (their long messages truncate at the template line).

## Backlog (P2)
- Consider migrating from Flatpickr to a fully custom calendar to match the wheel picker visual language (currently both look on-brand but use different rendering layers).
- A11y audit on the wheel picker (keyboard arrow up/down step support — currently only Escape/Enter via the picker root).
- E2E Playwright smoke test in CI on every commit.
