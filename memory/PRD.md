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
- 2026 — Custom iOS-style scroll-wheel time picker. Strict single-step snapping (no skipping on fast scroll).
- 2026 — Owner email gets full Serbian treatment block (name_serbian + description_serbian + price + date/time).
- 2026 — Email dates rendered as DD/MM/YYYY (European slash format), helper `_format_date_eu`.
- 2026 — Strict business hours hotfix: last bookable slot is 21:00. Wheel hours = 10..21; when hour === 21 only minute 0 is available. Backend Pydantic `field_validator` rejects any time > 21:00 (422).
- 2026 — `.ics` calendar attachment in the client confirmation email. RFC 5545 VCALENDAR with embedded Europe/Belgrade VTIMEZONE, 2h VALARM reminder, ORGANIZER set to salon email. One-tap "Add to Calendar" on iOS/Android.

## Backlog (P1)
- (none — WhatsApp template clarified: keep the current dynamic seasonal greeting + name + date + time template.)

## Backlog (P2)
- A11y on wheel picker (keyboard ArrowUp / ArrowDown step).
- Unify date popup and time wheel into a single visual layer (currently Flatpickr + custom wheel; both on-brand but different renderers).
- E2E Playwright smoke in CI.

## 2026-06 (fork): Buddha parallax fix
- Buddha sekcija: parallax klemovan na 0 (Math.min), sloj ankeriran top:0 / -bottom-50%, backgroundPosition "center top" -> glava Bude uvek cela vidljiva, parallax se zavrsava na gornjoj ivici slike.

## 2026-06 (fork): Mobilne ispravke (sve verifikovano, iteration_9.json 100%)
- Hero portrait: klasa .hero-parallax-bg + @media (orientation: portrait) background-position 18% center -> terapeut i klijent vidljivi umesto zavese
- Flatpickr: value prosledjen kao Date objekat (fix za pogresan prikaz 20.06.2026), clickOpens:false + rucni toggle (calWasOpen mousedown snapshot) na input i novo dugme contact-date-toggle
- Kalendar na mobilnom: @media max-width 640px width clamp min(320px, 100vw-108px), staje u ekran
- TimeWheelPicker: ITEM_HEIGHT 58, selektovane cifre 36px, dvotacka 42px; time input sada toggle-uje (uklonjen onFocus)
