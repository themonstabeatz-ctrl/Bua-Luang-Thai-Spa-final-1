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
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${ASSETS.heroBg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-32 text-center">
        <img
          src={ASSETS.logo}
          alt="Bua Luang Thai Spa"
          data-testid="hero-logo"
          className="mx-auto h-32 sm:h-44 lg:h-52 w-auto mb-6"
          style={{ mixBlendMode: "screen", filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.45))" }}
        />

        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[#f4e4bf] mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#e8c98a]" />
          {t.hero.eyebrow}
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#e8c98a]" />
        </div>

        <h1
          data-testid="hero-title"
          className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tight mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            textShadow: "0 4px 28px rgba(0, 0, 0, 0.6)",
          }}
        >
          <span className="block bg-gradient-to-br from-[#fff4d6] via-[#e8c98a] to-[#a17a35] bg-clip-text text-transparent">
            {t.hero.title}
          </span>
        </h1>

        <p
          data-testid="hero-subtitle"
          className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-white/95 leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
        >
          {t.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            data-testid="hero-cta-primary"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-white hover:shadow-[0_14px_44px_rgba(212,173,94,0.55)] transition-shadow duration-500"
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

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/90 animate-bounce-slow"
      >
        <ChevronDown className="h-7 w-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
      </a>
    </section>
  );
};
