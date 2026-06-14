# Bua Luang Thai Spa — PRD

## Original Problem Statement
Premium, luxury single-page website for "Bua Luang Thai Spa" in Belgrade.
- Brand assets: golden lotus logo (Bua luang logo crna senka), seamless Thai pattern background (Pozadina cista), ornate mandala accents (Pozadina 1), hero scene (pozadinska slika tamnija — warm candlelit Thai therapy room).
- Palette: deep charcoal black (#0a0705 → #140d09) + metallic gold (#a17a35 → #e8c98a → #f4e4bf) + white for high-contrast text.
- Sticky blurred navigation with logo + nav links (Početna, O nama, Masaže, Cenovnik, Kontakt) and a click-dropdown language switcher (🇷🇸 SR · 🇬🇧 EN · 🇷🇺 RU · 🇨🇳 ZH).
- Hero with **fixed parallax** background ("pozadinska slika tamnija") + warm radial vignette.
- Sections: O nama (with rich SR copy provided), Masaže (6 luxury cards), Cenovnik (8-row gold list in RSD), Kontakt (form + map + contact info), Footer.
- Contact form persists to MongoDB AND triggers an automated confirmation email back to the submitter via Gmail SMTP (smtp.gmail.com:587, app password).
- Fully translated UI for SR/EN/RU/ZH.
- Decorative mandala watermarks on About & Pricing.

## Architecture
- **Backend**: FastAPI + Motor (MongoDB) + smtplib (Gmail SMTP via app password). BackgroundTasks for non-blocking email.
- **Frontend**: React 19 + Tailwind + shadcn (DropdownMenu, sonner toasts) + lucide-react icons + axios. Custom i18n via React Context (`/app/frontend/src/i18n/`).
- **Routing**: single `/` route, in-page anchor navigation.
- **Assets**: hosted via customer-assets URLs (logo, pattern, mandala, hero scene).

## Backend Endpoints
- `GET  /api/` → health
- `POST /api/contact` → `{name,email,phone?,message,language}` → 200 `ContactMessage` (record persisted immediately; SMTP send runs in BackgroundTasks and updates `email_sent`/`email_error` after)
- `GET  /api/contact` → list of contact messages (admin/preview), most recent first

## Implementation Status (✅ delivered)
- ✅ Luxury dark + gold visual system, custom fonts (Cormorant Garamond + Manrope)
- ✅ Sticky blurred nav with mobile menu and click-dropdown language switcher
- ✅ Fixed-parallax hero with vignette + dual CTAs
- ✅ About section with provided SR copy (auto-translated to EN/RU/ZH), stats, mandala watermark
- ✅ Massages section (6 cards, gold glow on hover)
- ✅ Pricing section (8 rows, RSD, gold accents, mandala watermark)
- ✅ Contact section: form + 4 info cards + dark-styled OpenStreetMap iframe
- ✅ Footer with logo, quick links and socials
- ✅ Full i18n SR/EN/RU/ZH (default SR, persisted to localStorage)
- ✅ Backend contact endpoint with MongoDB persistence and async SMTP confirmation email
- ✅ Sonner toast notifications on form submit (success/error)
- ✅ data-testid coverage across all interactive and content elements

## Test Coverage (iteration_1.json)
- Backend: 100% (9/9 pytest cases). API correctly persists records, returns 422 on invalid input, never crashes on SMTP failure.
- Frontend: 100% (UI, multilingual switching, form submit, HTML5 validation, pricing rows, map render).
- Known: SMTP rejected by Gmail (535 BadCredentials) from sandbox network. Confirmed code path is correct; user should verify the Gmail App Password is still valid and the account has 2FA + IMAP enabled.

## Backlog / Next Action Items (P1 → P2)
- P1: Validate Gmail App Password works from production network; consider failover (Resend / SendGrid) if Gmail keeps rejecting.
- P1: Also notify the spa inbox (bualuangthailandspa@gmail.com) when a new submission arrives — currently only the submitter is emailed.
- P2: Replace temporary cenovnik with the final price sheet provided by owner.
- P2: Add a small admin route `/admin/messages` (token-protected) to view incoming contacts.
- P2: WhatsApp / Viber click-to-chat floating button.
- P2: Google reCAPTCHA on the contact form to prevent spam.
- P2: Swap OSM iframe for Google Maps once the new Belgrade address is confirmed.
