import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

/**
 * Centralised `<head>` manager. Renders, in one place per route:
 *   • <title>
 *   • <meta name="description">
 *   • Open Graph + Twitter Card
 *   • hreflang alternates
 *   • canonical
 *   • Schema.org JSON-LD blocks
 *
 * Pages pass localised content. Site-wide metadata (address, phone, lat/lng,
 * Instagram, base URL) is fetched once from `/api/site-info` so the schema is
 * always in sync with what's in `backend/.env`.
 */

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Cache the response across mounts so we hit the API once per page load.
let _siteInfoCache = null;
let _siteInfoPromise = null;

const fetchSiteInfo = () => {
  if (_siteInfoCache) return Promise.resolve(_siteInfoCache);
  if (_siteInfoPromise) return _siteInfoPromise;
  _siteInfoPromise = fetch(`${API}/site-info`)
    .then((r) => r.json())
    .then((d) => {
      _siteInfoCache = d;
      return d;
    })
    .catch(() => ({
      name: "Bua Luang Thai Spa",
      phone: "+381626255500",
      instagram: "https://www.instagram.com/bua.luang.thai.spa/",
      site_base_url: "https://bualuangthaispa.rs",
      address: { city: "Beograd", country: "RS" },
      hours: { opens: "10:00", closes: "22:00", days: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
    }));
  return _siteInfoPromise;
};

const buildLocalBusinessSchema = (info, lang, currentUrl) => {
  if (!info) return null;
  const addr = info.address || {};
  // Build PostalAddress only with non-empty fields so unverified placeholders
  // don't pollute the structured data emitted to Google.
  const postalAddress = {
    "@type": "PostalAddress",
    addressLocality: addr.city || "Beograd",
    addressCountry: addr.country || "RS",
  };
  if (addr.street) postalAddress.streetAddress = addr.street;
  if (addr.postal_code) postalAddress.postalCode = addr.postal_code;

  const geo = (addr.latitude && addr.longitude)
    ? { "@type": "GeoCoordinates", latitude: addr.latitude, longitude: addr.longitude }
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "DaySpa"],
    "@id": `${info.site_base_url}/#business`,
    name: info.name || "Bua Luang Thai Spa",
    url: currentUrl || info.site_base_url,
    image: `${info.site_base_url}/og-image.jpg`,
    logo: `${info.site_base_url}/logo.png`,
    telephone: info.phone,
    email: info.owner_email,
    priceRange: "€€",
    inLanguage: lang || "sr",
    address: postalAddress,
    geo,
    sameAs: info.instagram ? [info.instagram] : [],
    alternateName: ["Bua Luang Thai Spa Beograd", "Bua Luang Tajlandska Masaža"],
    currenciesAccepted: "RSD",
    paymentAccepted: "Cash, Credit Card",
    areaServed: [
      { "@type": "City", name: "Beograd" },
      { "@type": "AdministrativeArea", name: "Stari Grad" },
      { "@type": "AdministrativeArea", name: "Vračar" },
      { "@type": "AdministrativeArea", name: "Novi Beograd" },
      { "@type": "AdministrativeArea", name: "Savski Venac" },
      { "@type": "AdministrativeArea", name: "Dedinje" },
      { "@type": "AdministrativeArea", name: "Zvezdara" },
    ],
    knowsAbout: [
      "Tradicionalna tajlandska masaža",
      "Relax masaža uljem",
      "Masaža toplim kamenjem",
      "Tajlandska masaža stopala",
      "Masaža za parove",
      "Thai massage Belgrade",
    ],
    availableLanguage: ["sr", "en", "ru", "zh", "th"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: info.hours?.opens || "10:00",
        closes: info.hours?.closes || "22:00",
      },
    ],
  };

  // Drop the empty geo key entirely if we don't have coords yet.
  if (!geo) delete data.geo;
  return data;
};

export const SEOHead = ({
  title,
  description,
  ogDescription,
  canonical,         // path-only, e.g. "/sr/usluge/aroma"
  keywords = [],     // local-SEO keyword set (string[])
  lang = "sr",
  alternates = [],   // [{lang, href: path-only}]
  jsonLd = [],       // additional schema blocks (Service, FAQPage…)
  ogImage,
  ogType = "website",
}) => {
  const [siteInfo, setSiteInfo] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetchSiteInfo().then((info) => {
      if (!cancelled) setSiteInfo(info);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const baseUrl =
    siteInfo?.site_base_url ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const absUrl = (path) => (path?.startsWith("http") ? path : `${baseUrl}${path || ""}`);
  const canonicalUrl = absUrl(canonical || (typeof window !== "undefined" ? window.location.pathname : "/"));
  const ogImageUrl = ogImage
    ? absUrl(ogImage)
    : `${baseUrl}/og-image.jpg`;

  const localBusiness = buildLocalBusinessSchema(siteInfo, lang, canonicalUrl);

  // Normalise the htmlLang attribute (e.g. zh → zh-Hans, sr → sr-RS).
  const htmlLangMap = { sr: "sr-RS", en: "en-US", ru: "ru-RU", zh: "zh-Hans", th: "th-TH" };

  return (
    <Helmet>
      <html lang={htmlLangMap[lang] || lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="geo.region" content="RS-00" />
      <meta name="geo.placename" content="Beograd" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Bua Luang Thai Spa" />
      <meta property="og:locale" content={htmlLangMap[lang] || lang} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* hreflang alternates */}
      {alternates.map((a) => (
        <link
          key={a.lang}
          rel="alternate"
          hrefLang={htmlLangMap[a.lang] || a.lang}
          href={absUrl(a.href)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={absUrl(alternates?.[0]?.href || "/")} />

      {/* LocalBusiness JSON-LD (always present) */}
      {localBusiness && (
        <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      )}
      {/* Extra per-page schema (Service, FAQPage, BreadcrumbList…) */}
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(block)}</script>
      ))}
    </Helmet>
  );
};
