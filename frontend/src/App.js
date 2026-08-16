import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { SelectionProvider } from "@/contexts/SelectionContext";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ChatFloater } from "@/components/ChatFloater";
import { ASSETS } from "@/constants/assets";
import { SEOHead } from "@/seo/SEOHead";
import { HOME_PATH, SERVICE_PATH, LANGS, buildHreflangs, SERVICE_CONTENT, SERVICE_SLUGS } from "@/seo/services";
import { HOME_KEYWORDS } from "@/seo/localSeo";
import { ServicePage } from "@/pages/ServicePage";
import "@/App.css";

const BuddhaShowcase = () => {
  const sectionRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = vh / 2 + rect.height / 2;
      const t = Math.max(0, 1 - distance / maxDistance);
      const eased = t * t * (3 - 2 * t);
      setOpacity(eased);
      // Luxury parallax clamped at 0: the image glides down while the section
      // enters, and stops exactly when the image top edge meets the section
      // top — so the Buddha head is always fully visible at rest.
      setParallax(Math.min(0, -rect.top * 0.35));
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="buddha-showcase"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "95dvh" }}
    >
      <div
        aria-hidden="true"
        data-testid="buddha-showcase-bg"
        className="absolute left-0 right-0 top-0 -bottom-[50%] bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${ASSETS.buddhaBg})`,
          backgroundPosition: "center top",
          transform: `translate3d(0, ${parallax}px, 0)`,
          willChange: "transform",
        }}
      />
      <img
        src={ASSETS.logo}
        alt="Bua Luang Thai Spa Beograd - Autentična Tajlandska masaža logo"
        data-testid="buddha-logo"
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[58vh] w-auto max-w-[90vw]"
        style={{
          mixBlendMode: "screen",
          opacity,
          transition: "opacity 120ms linear",
          filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.55))",
        }}
      />
    </section>
  );
};

// Keep the LanguageContext in sync with the current URL prefix.
const LangSync = ({ lang }) => {
  const { lang: current, setLang } = useLang();
  useEffect(() => {
    if (lang && current !== lang) setLang(lang);
  }, [lang, current, setLang]);
  return null;
};

// Anchor the URL hash (e.g. /sr#contact) once on mount.
const ScrollToHash = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash]);
  return null;
};

const HOME_SEO = {
  sr: {
    title: "Bua Luang Thai Spa Beograd · Autentična Tajlandska Masaža",
    description:
      "Luksuzni tajlandski spa u Beogradu — autentični terapeuti iz Tajlanda, premium ambijent, kompletna ponuda tajlandskih masaža. Zakažite termin online.",
    og: "Najautentičniji tajlandski spa u Beogradu — sertifikovani terapeuti direktno iz Tajlanda.",
  },
  en: {
    title: "Bua Luang Thai Spa Belgrade · Authentic Thai Massage",
    description:
      "Luxury Thai spa in Belgrade — authentic certified therapists from Thailand, premium ambiance, full Thai massage menu. Book online today.",
    og: "Belgrade's most authentic Thai spa — certified therapists directly from Thailand.",
  },
  ru: {
    title: "Bua Luang Thai Spa Белград · Аутентичный тайский массаж",
    description:
      "Премиум тайский спа в Белграде — сертифицированные мастера из Таиланда, роскошная атмосфера, полное меню тайских массажей. Запишитесь онлайн.",
    og: "Самый аутентичный тайский спа в Белграде — мастера прямо из Таиланда.",
  },
  zh: {
    title: "Bua Luang Thai Spa 贝尔格莱德 · 正宗泰式按摩",
    description:
      "贝尔格莱德奢华泰式 SPA —— 来自泰国的认证按摩师、精致环境、完整泰式按摩菜单。立即在线预订。",
    og: "贝尔格莱德最正宗的泰式 SPA —— 来自泰国的认证按摩师。",
  },
  th: {
    title: "Bua Luang Thai Spa เบลเกรด · นวดแผนไทยแท้",
    description:
      "สปาแบบไทยระดับลักชัวรีในเบลเกรด — หมอนวดที่ผ่านการรับรองโดยตรงจากประเทศไทย บรรยากาศพรีเมียม เมนูครบครัน จองออนไลน์วันนี้",
    og: "สปาไทยที่แท้จริงที่สุดในเบลเกรด — หมอนวดผ่านการรับรองโดยตรงจากประเทศไทย",
  },
};

const Home = ({ lang }) => {
  // Build the hreflang map + the FAQPage schema once per render.
  const alternates = buildHreflangs(null);
  const seo = HOME_SEO[lang];

  // Aggregate offer catalog so Google sees the full pricing on the homepage.
  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: lang === "sr" ? "Tajlandske masaže Beograd" : "Thai massage services",
    itemListElement: SERVICE_SLUGS.map((s, i) => {
      const c = SERVICE_CONTENT[s]?.[lang];
      if (!c) return null;
      return {
        "@type": "Offer",
        position: i + 1,
        name: c.name,
        url: `${SERVICE_PATH[lang]}/${s}`,
      };
    }).filter(Boolean),
  };

  return (
    <>
      <LangSync lang={lang} />
      <SEOHead
        title={seo.title}
        description={seo.description}
        ogDescription={seo.og}
        canonical={HOME_PATH[lang]}
        lang={lang}
        keywords={HOME_KEYWORDS[lang] || HOME_KEYWORDS.sr}
        alternates={alternates}
        jsonLd={[offerCatalog]}
      />
      <ScrollToHash />
      <div className="relative">
        <Navigation />
        <Hero />
        <AboutSection />
        <BuddhaShowcase />
        <PricingSection />
        <ContactSection />
        <Footer />
        <ChatFloater />
      </div>
    </>
  );
};

const ServiceRoute = ({ lang }) => (
  <>
    <LangSync lang={lang} />
    <ServicePage lang={lang} />
  </>
);

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <SelectionProvider>
          <div className="App min-h-screen bg-[#0a0705] text-[#2b2620]">
            <BrowserRouter>
              <Routes>
                {/* Root redirects to default Serbian homepage. */}
                <Route path="/" element={<Navigate to="/sr" replace />} />

                {/* Per-language homepages */}
                {LANGS.map((l) => (
                  <Route key={l} path={HOME_PATH[l]} element={<Home lang={l} />} />
                ))}

                {/* Per-language service detail pages */}
                {LANGS.map((l) => (
                  <Route
                    key={`svc-${l}`}
                    path={`${SERVICE_PATH[l]}/:slug`}
                    element={<ServiceRoute lang={l} />}
                  />
                ))}

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/sr" replace />} />
              </Routes>
            </BrowserRouter>
            <Toaster
              theme="light"
              position="top-center"
              toastOptions={{
                style: {
                  background: "#ffffff",
                  border: "1px solid rgba(161,122,53,0.35)",
                  color: "#3a312a",
                  boxShadow: "0 14px 40px rgba(60, 45, 20, 0.12)",
                },
              }}
            />
          </div>
        </SelectionProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
