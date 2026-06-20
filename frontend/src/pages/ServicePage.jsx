import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SEOHead } from "@/seo/SEOHead";
import {
  SERVICE_CONTENT,
  SERVICE_PRICING,
  SERVICE_PATH,
  HOME_PATH,
  buildHreflangs,
  SERVICE_SLUGS,
} from "@/seo/services";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChatFloater } from "@/components/ChatFloater";
import { Reveal } from "@/components/Reveal";
import { ASSETS } from "@/constants/assets";
import { ChevronRight, Phone } from "lucide-react";

/**
 * Minimal-luxury service detail page.
 *
 * Design intent: this page is intentionally short and elegant — eyebrow,
 * gold H1, a single sentence of context, a wide hero image, the pricing
 * cards and a CTA. NOTHING ELSE visible on screen.
 *
 * All the heavy SEO material (benefits, technique copy, competitor capture,
 * FAQ Q&A) is fed exclusively into:
 *   • the LocalBusiness + Service + FAQPage JSON-LD blocks (head),
 *   • the meta description + OG tags (head),
 *   • the long-form `/sr/o-tajlandskoj-masazi-beograd` page (linked once
 *     from the footer).
 *
 * That way Google sees the content; the brand visual stays uncluttered.
 */

const PRICE_FMT = (n) => `${n.toLocaleString("sr-RS").replace(/,/g, ".")} RSD`;

const CTA_COPY = {
  sr: { book: "Zakaži termin", call: "Pozovite nas", related: "Drugi tretmani" },
  en: { book: "Book now", call: "Call us", related: "Other treatments" },
  ru: { book: "Записаться", call: "Позвоните нам", related: "Другие услуги" },
  zh: { book: "立即预订", call: "致电我们", related: "其他疗程" },
};

const HOME_LABEL = { sr: "Početna", en: "Home", ru: "Главная", zh: "首页" };
const SERVICES_LABEL = { sr: "Usluge", en: "Services", ru: "Услуги", zh: "服务" };

export const ServicePage = ({ lang }) => {
  const { slug } = useParams();
  if (!SERVICE_SLUGS.includes(slug)) return <Navigate to={HOME_PATH[lang]} replace />;
  const content = SERVICE_CONTENT[slug]?.[lang];
  if (!content) return <Navigate to={HOME_PATH[lang]} replace />;
  const pricing = SERVICE_PRICING[slug];
  const path = `${SERVICE_PATH[lang]}/${slug}`;
  const alternates = buildHreflangs(slug);

  // ── SEO schema (all hidden in <head>, NOT rendered on screen) ──────────
  // We fold benefits, technique copy and competitor capture into the
  // Service.description field. Google indexes the entire structured-data
  // block, so the competitor keywords + USP statements still rank without
  // cluttering the minimal UI.
  const richDescription = [
    content.intro,
    content.technique,
    content.compareBody,
    `${content.benefitsTitle}: ${(content.benefits || []).join(" · ")}`,
  ]
    .filter(Boolean)
    .join(" \n\n ");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.name,
    serviceType: content.name,
    provider: { "@id": "/#business" },
    areaServed: { "@type": "City", name: "Beograd" },
    description: richDescription,
    offers: pricing.map((p) => ({
      "@type": "Offer",
      priceCurrency: "RSD",
      price: p.price,
      name: `${content.name} — ${p.duration} min`,
      availability: "https://schema.org/InStock",
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (content.faq || []).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: HOME_LABEL[lang], item: HOME_PATH[lang] },
      { "@type": "ListItem", position: 2, name: SERVICES_LABEL[lang], item: SERVICE_PATH[lang] },
      { "@type": "ListItem", position: 3, name: content.name, item: path },
    ],
  };

  const otherServices = []; // related grid intentionally disabled per user request

  return (
    <>
      <SEOHead
        title={content.title}
        description={content.metaDescription}
        ogDescription={content.ogDescription}
        canonical={path}
        lang={lang}
        alternates={alternates}
        jsonLd={[serviceSchema, faqSchema, breadcrumbSchema]}
        ogType="article"
      />
      <Helmet>
        <body className="bg-[#fbf3dc]" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen pt-28 pb-24 bg-gradient-to-b from-[#fbf3dc] via-[#f8edd4] to-[#fbf3dc]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">

          {/* Breadcrumbs — tiny, restrained */}
          <nav aria-label="Breadcrumb" className="text-[10px] tracking-[0.32em] uppercase text-[#7a6e5e] flex items-center gap-2 mb-10">
            <Link to={HOME_PATH[lang]} className="hover:text-[#a17a35] transition-colors">
              {HOME_LABEL[lang]}
            </Link>
            <ChevronRight className="h-3 w-3 text-[#a17a35]" />
            <span className="text-[#2b2620]">{content.name}</span>
          </nav>

          {/* Hero header — eyebrow + gold H1 */}
          <Reveal>
            <header className="text-center mb-12">
              <div className="text-[11px] tracking-[0.42em] uppercase text-[#a17a35] mb-6 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-[#a17a35]" />
                {content.eyebrow}
                <span className="h-px w-10 bg-[#a17a35]" />
              </div>
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] bg-gradient-to-br from-[#c9a45a] via-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
              >
                {content.h1}
              </h1>
            </header>
          </Reveal>

          {/* Premium hero image — single luxury visual, nothing else */}
          <Reveal>
            <div
              className="aspect-[16/9] sm:aspect-[21/9] rounded-2xl bg-cover bg-center shadow-[0_24px_60px_rgba(80,55,18,0.18)] border border-[rgba(161,122,53,0.25)] mb-14"
              style={{ backgroundImage: `url(${ASSETS.heroBg})` }}
              role="img"
              aria-label={content.h1}
            />
          </Reveal>

          {/* Pricing — the only commercial block on the page */}
          <Reveal>
            <section className="mb-14">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {pricing.map((p) => (
                  <Link
                    key={p.duration}
                    to={`${HOME_PATH[lang]}#contact`}
                    className="group rounded-2xl bg-white/85 backdrop-blur-sm border border-[rgba(161,122,53,0.28)] p-6 text-center hover:shadow-[0_18px_50px_rgba(80,55,18,0.15)] transition-shadow"
                    data-testid={`service-price-${p.duration}`}
                  >
                    <div className="text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                      {p.duration} min
                    </div>
                    <div
                      className="font-serif text-3xl text-[#2b2620]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {PRICE_FMT(p.price)}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Single, restrained CTA strip */}
          <Reveal>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
              <Link
                to={`${HOME_PATH[lang]}#contact`}
                data-testid="service-cta-book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-white hover:shadow-[0_12px_36px_rgba(161,122,53,0.45)] transition-shadow"
              >
                {CTA_COPY[lang].book}
              </Link>
              <a
                href="tel:+38162625500"
                data-testid="service-cta-call"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium border border-[#a17a35] text-[#a17a35] hover:bg-[#a17a35] hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" /> {CTA_COPY[lang].call}
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
      <ChatFloater />
    </>
  );
};
