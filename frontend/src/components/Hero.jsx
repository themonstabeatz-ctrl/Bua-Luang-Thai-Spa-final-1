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
      {/* warm vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,7,5,0.35)_0%,rgba(10,7,5,0.7)_55%,rgba(10,7,5,0.92)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,7,5,0.55)] via-transparent to-[#0a0705]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          <div
            data-testid="hero-eyebrow"
            className="inline-flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[#e8c98a]/90 mb-7"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c49a4c]" />
            {t.hero.eyebrow}
          </div>

          <h1
            data-testid="hero-title"
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            <span className="block bg-gradient-to-br from-[#f4e4bf] via-[#e8c98a] to-[#a17a35] bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </h1>

          <p
            data-testid="hero-subtitle"
            className="mt-7 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-light"
          >
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-[#0a0705] hover:shadow-[0_0_44px_rgba(212,173,94,0.55)] transition-shadow duration-500"
            >
              {t.hero.cta}
            </a>
            <a
              href="#pricing"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-light text-[#e8c98a] border border-[rgba(196,154,76,0.55)] hover:border-[#e8c98a] hover:bg-[rgba(196,154,76,0.10)] transition-all duration-400"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#e8c98a]/80 animate-bounce-slow"
      >
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  );
};
