# Bua Luang Thai Spa — SEO Playbook

Strategic resource. Lives in `/app/memory/` (not deployed). Feeds the editorial
pipeline + paid-search planning. Pair with the live `services.js` per-page SEO copy.

---

## A. Sitemap — what is live

**Live URLs** (24 service + 4 home + 1 long-form = 29 total)

| Section | SR | EN | RU | ZH |
|---|---|---|---|---|
| Homepage | `/sr` | `/en` | `/ru` | `/zh` |
| Tradicionalna Tajlandska | `/sr/usluge/thai-tradition` | `/en/services/thai-tradition` | `/ru/uslugi/thai-tradition` | `/zh/services/thai-tradition` |
| Aroma | `/sr/usluge/aroma` | `/en/services/aroma` | `/ru/uslugi/aroma` | `/zh/services/aroma` |
| Biljne komprese | `/sr/usluge/herbal-compress` | `/en/services/herbal-compress` | `/ru/uslugi/herbal-compress` | `/zh/services/herbal-compress` |
| Vrat / Glava / Ramena | `/sr/usluge/neck-head-shoulders` | … | … | … |
| Deep Tissue | `/sr/usluge/deep-tissue` | … | … | … |
| Stopala | `/sr/usluge/foot-massage` | … | … | … |
| Master long-form | `/sr/o-tajlandskoj-masazi-beograd` | — | — | — |

Each page emits in `<head>`:
- canonical URL
- 4× hreflang alternates + `x-default`
- Open Graph + Twitter Card
- LocalBusiness JSON-LD (always, populated from `/api/site-info`)
- Service + FAQPage + BreadcrumbList JSON-LD (per page)

Site-wide schema knobs (env vars in `backend/.env`):
- `SALON_STREET_ADDRESS`, `SALON_POSTAL_CODE`, `SALON_LATITUDE`, `SALON_LONGITUDE`
  — empty by default; populate in seconds when lease is executed.
- `SALON_PHONE`, `SALON_INSTAGRAM_URL`, `SITE_BASE_URL` — preset.

---

## B. 50 long-tail keywords (Belgrade local intent)

### Authority / homepage targets (10)
1. tajlandska masaža Beograd
2. thai massage Belgrade
3. thai spa Beograd
4. autentični tajlandski spa Beograd
5. luksuzna masaža Beograd
6. wellness spa Beograd centar
7. premium tajlandska masaža Beograd
8. autentični tajlandski terapeuti Beograd
9. salon masaže za parove Beograd
10. najbolja masaža Beograd Vračar / Stari grad

### Treatment-specific (20)
11. tradicionalna tajlandska masaža Beograd cena
12. tajlandska masaža 90 minuta Beograd
13. aroma masaža Beograd cena
14. najbolja aroma masaža Beograd
15. tajlandske biljne komprese Beograd
16. luk pra kob Beograd
17. masaža sa toplim kompresama Beograd
18. masaža vrata i ramena Beograd
19. masaža za office syndrome Beograd
20. brza masaža u pauzi Beograd
21. deep tissue masaža Beograd
22. sportska masaža Beograd
23. masaža za bol u leđima Beograd
24. refleksološka masaža stopala Beograd
25. tajlandska masaža stopala Beograd
26. masaža posle treninga Beograd
27. masaža protiv migrene Beograd
28. masaža za relaksaciju Beograd
29. masaža za detoks Beograd
30. masaža za kvalitetan san Beograd

### Buyer-intent + commercial (10)
31. zakaži tajlandsku masažu Beograd online
32. termini za masažu Beograd vikend
33. poklon vaučer masaža Beograd
34. masaža iznenađenje Beograd godišnjica
35. korporativni wellness paketi Beograd
36. masaža kasno uveče Beograd
37. masaža radnim danom posle posla Beograd
38. spa centar otvoren do 22h Beograd
39. masaža za nedelju dana ranije Beograd (last-minute)
40. cene tajlandskih masaža Beograd 2026

### Comparative / competitor capture (10)
41. najbolji tajlandski spa Beograd
42. siam spa vs bua luang
43. mai thai lux alternativa
44. jai thai poređenje
45. lanna thai Beograd recenzije
46. rei thailand massage vs autentični tajlandski
47. sa-wan Beograd alternativa
48. tajlandska masaža Beograd recenzije
49. najautentičnija tajlandska masaža u gradu
50. premium spa centar Beograd sa terapeutima iz Tajlanda

---

## C. 30 blog topics (informational authority)

Internal linking blueprint: each blog post links back to (a) the relevant
service page, (b) the long-form `/sr/o-tajlandskoj-masazi-beograd` and
(c) the homepage with `#contact` anchor for direct conversion.

### Educational — what is Thai massage (8)
1. **Šta je tradicionalna tajlandska masaža i zašto se razlikuje od švedske** — definicija, istorija, ciljni klijent
2. **Sen energetske linije: kratak vodič za beogradskog laika**
3. **Kako prepoznati autentični tajlandski spa: 7 znakova**
4. **Kako se obrazuju pravi tajlandski terapeuti — pogled iz Bangkoka**
5. **Thai massage vs Shiatsu vs Lomi-Lomi — ko šta radi**
6. **Zašto se tradicionalna tajlandska masaža izvodi obučeni**
7. **Istorija Luk Pra Kob — biljnih kompresa starih 2.500 godina**
8. **Šta je Wai Khru — ritual pre tretmana koji menja sve**

### Health & wellness benefits (8)
9. **Tajlandska masaža i hronični bol u leđima — šta zaista pomaže**
10. **Office syndrome u Beogradu — 30-minutni tretman koji vraća glavu na mesto**
11. **Stres, kortizol i masaža: nauka iza opuštanja**
12. **Tajlandska masaža za sportiste — pre i posle treninga**
13. **Aroma masaža i kvalitet sna — eksperiment iz našeg salona**
14. **Migrena i napetost u vratu — koji tretman pomaže najviše**
15. **Refleksologija stopala — šta sve stopalo "kaže" o vašem zdravlju**
16. **Detoksikacija kroz masažu — pravi efekat vs marketing**

### Lifestyle / luxury (7)
17. **Masaža za parove u Beogradu: kako organizovati savršen poklon iznenađenja**
18. **Godišnjica braka u Bua Luang — kompletan ritual za dve osobe**
19. **Spa vikend u Beogradu — od subote popodne do nedelje uveče**
20. **Posle korporativnog događaja u Beogradu — gde poslati VIP goste**
21. **Šta poneti za pun spa dan u Beogradu**
22. **Najbolje vreme dana za tajlandsku masažu (i zašto)**
23. **Personalni wellness ritual: kako kombinovati 6 različitih tretmana**

### Local Belgrade context (4)
24. **Tajlandska masaža u Beogradu — kratka istorija scene 2015–2026**
25. **Mapa tajlandskih spa salona u Beogradu (i šta ih razlikuje)**
26. **Gde parkirati u centru Beograda kad idete u spa**
27. **Najtiša mesta u Beogradu za posle-masažni čaj**

### Practical / FAQ-driven (3)
28. **Kako pripremiti telo i um za prvu tajlandsku masažu**
29. **Kompletan vodič kroz cene tajlandskih masaža u Beogradu 2026**
30. **Šta očekivati 24 i 48 sati nakon dubinske masaže**

---

## D. Page-by-page meta cheat-sheet (already deployed)

Each service page renders 4 localized `<title>` + 4 localized
`<meta name="description">` already wired in `seo/services.js`. Verify by
opening any URL above and running `view-source:` in the browser.

Example — `/sr/usluge/aroma`:
- `<title>` = "Aroma Masaža Beograd · Bua Luang Thai Spa"
- `<meta name="description">` = "Aroma masaža u Beogradu sa premium esencijalnim uljima…"
- Open Graph image = `${SITE_BASE_URL}/og-image.jpg` (add the file when ready)
- JSON-LD: `LocalBusiness` + `Service` + `FAQPage` + `BreadcrumbList`

## E. Competitor capture mechanism

All competitor brand names (Siam Spa, Mai Thai Lux, Jai Thai, Lanna Thai,
Rei Thailand Massage, Sa-Wan) appear EXACTLY ONCE per service-page
`compareBody` string. They're delivered to Google via the Service schema's
`description` field — invisible to the user on the minimal service page UI
but indexable by crawlers. The same names also appear on the
`/sr/o-tajlandskoj-masazi-beograd` master page as organic comparison copy.

---

_Last updated: 2026-06-20_
