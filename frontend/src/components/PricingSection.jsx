import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ASSETS } from "@/constants/assets";

export const PricingSection = () => {
  const { t } = useLang();
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative py-28 sm:py-36 overflow-hidden"
    >
      <img
        src={ASSETS.mandalaBg}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -left-48 top-10 w-[640px] max-w-[80vw] opacity-[0.14] mix-blend-screen scale-x-[-1]"
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.42em] uppercase text-[#c49a4c] mb-6 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#c49a4c]" />
            {t.pricing.eyebrow}
            <span className="h-px w-10 bg-[#c49a4c]" />
          </div>
          <h2
            data-testid="pricing-title"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] bg-gradient-to-br from-[#f4e4bf] via-[#e8c98a] to-[#a17a35] bg-clip-text text-transparent"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {t.pricing.title}
          </h2>
          <p className="mt-5 text-white/65 max-w-xl mx-auto font-light">
            {t.pricing.subtitle}
          </p>
        </div>

        <div
          data-testid="pricing-list"
          className="rounded-2xl border border-[rgba(196,154,76,0.25)] bg-[rgba(15,10,7,0.7)] backdrop-blur-sm overflow-hidden"
        >
          {t.pricing.rows.map((row, idx) => (
            <div
              key={idx}
              data-testid={`pricing-row-${idx}`}
              className="flex items-center justify-between gap-4 px-6 sm:px-10 py-5 border-b border-[rgba(196,154,76,0.15)] last:border-b-0 hover:bg-[rgba(196,154,76,0.06)] transition-colors duration-300"
            >
              <div className="flex-1 min-w-0">
                <div
                  className="text-lg sm:text-xl text-[#f4e4bf] font-serif leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {row.name}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-[0.22em] text-white/45 mt-1">
                  {row.duration}
                </div>
              </div>
              <div className="hidden sm:block flex-1 mx-6 border-t border-dotted border-[rgba(196,154,76,0.3)]" />
              <div className="text-right whitespace-nowrap">
                <span className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-[#e8c98a] to-[#c49a4c] bg-clip-text text-transparent">
                  {row.price.toLocaleString("sr-RS")}
                </span>
                <span className="ml-1.5 text-xs tracking-wider text-[#c49a4c]/80">
                  {t.pricing.currency}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p
          data-testid="pricing-note"
          className="mt-6 text-center text-xs text-white/45 italic"
        >
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
};
