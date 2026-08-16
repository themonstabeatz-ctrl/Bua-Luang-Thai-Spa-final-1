import React, { useEffect, useRef, useState } from "react";
import { ASSETS } from "@/constants/assets";
import { useLang } from "@/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const [parallax, setParallax] = useState(0);

  // Luxury parallax pattern: an isolated absolutely-positioned bg layer
  // larger than the section, driven by transform: translate3d. Decoupled
  // from `background-attachment: fixed` (which iOS ignores and Android
  // re-anchors on address-bar collapse, causing the "jump"). Now the bg
  // moves smoothly with scroll while the section keeps a stable 100dvh
  // box — no jerks, no re-anchors.
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // While the hero is in view, map its top offset (-vh..+vh) to a small
      // translate. Factor 0.35 = subtle, premium parallax depth.
      const progress = -rect.top;
      setParallax(progress * 0.35);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      data-testid="hero-section"
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Parallax bg layer — fills section + extra 30% on each side so the
          translate never reveals an empty edge. NOT background-attachment. */}
      <div
        aria-hidden="true"
        data-testid="hero-bg"
        className="hero-parallax-bg absolute left-0 right-0 -top-[30%] -bottom-[30%] bg-cover pointer-events-none"
        style={{
          backgroundImage: `url(${ASSETS.heroBg})`,
          transform: `translate3d(0, ${parallax}px, 0)`,
          willChange: "transform",
        }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-32 text-center">
        {/* Logo — transparent against dark spa scene via screen blend */}
        <img
          src={ASSETS.logo}
          alt="Bua Luang Thai Spa Beograd - Tradicionalna Tajlandska masaza logo"
          data-testid="hero-logo"
          className="mx-auto h-32 sm:h-44 lg:h-52 w-auto mb-6"
          style={{ mixBlendMode: "screen", filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.45))" }}
        />

        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[#f4e4bf] mb-6"
          style={{ textShadow: "0 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1), 0 2px 2px rgba(0,0,0,0.95)" }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#e8c98a]" />
          {t.hero.eyebrow}
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#e8c98a]" />
        </div>

        <h1
          data-testid="hero-title"
          className="font-serif mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            filter:
              "drop-shadow(0 2px 0 rgba(0,0,0,1)) drop-shadow(2px 2px 0 rgba(0,0,0,1)) drop-shadow(-1px 1px 0 rgba(0,0,0,1)) drop-shadow(0 4px 3px rgba(0,0,0,0.9))",
          }}
        >
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tight uppercase bg-gradient-to-br from-[#fff4d6] via-[#e8c98a] to-[#a17a35] bg-clip-text text-transparent">
            Bua Luang Thai Spa
          </span>
          {/* SEO-only text — preserves the H1 keyword phrase without showing the subtitle visually */}
          <span className="sr-only"> — Autentična Tajlandska Masaža Beograd</span>
        </h1>

        <p
          data-testid="hero-subtitle"
          className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-white/95 leading-relaxed font-light"
          style={{ textShadow: "0 3px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)" }}
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
