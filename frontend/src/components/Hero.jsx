import React from "react";
import { ASSETS } from "@/constants/assets";
import { useLang } from "@/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const { t } = useLang();
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
      style={{
        backgroundImage: `url(${ASSETS.heroBg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Warm, bright overlay — keeps gold typography luminous and readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,240,210,0.22)_0%,rgba(255,225,180,0.18)_45%,rgba(60,40,18,0.55)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,235,200,0.15)] via-transparent to-[rgba(253,250,243,0.92)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-32 w-full">
        <div className="max-w-3xl">
          <div
            data-testid="hero-eyebrow"
            className="inline-flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[#f4e4bf] mb-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#e8c98a]" />
            {t.hero.eyebrow}
          </div>

          <h1
            data-testid="hero-title"
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              textShadow: "0 4px 28px rgba(60, 40, 18, 0.45)",
            }}
          >
            <span className="block bg-gradient-to-br from-[#fff4d6] via-[#e8c98a] to-[#a17a35] bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </h1>

          <p
            data-testid="hero-subtitle"
            className="mt-7 max-w-2xl text-base sm:text-lg text-white/95 leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          >
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-white hover:shadow-[0_14px_44px_rgba(161,122,53,0.55)] transition-shadow duration-500"
            >
              {t.hero.cta}
            </a>
            <a
              href="#pricing"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-light text-white border border-white/70 hover:border-white hover:bg-white/15 backdrop-blur-sm transition-all duration-400"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/90 animate-bounce-slow"
      >
        <ChevronDown className="h-7 w-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" />
      </a>
    </section>
  );
};
