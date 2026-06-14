import React from "react";
import { useLang } from "@/i18n/LanguageContext";

export const PricingSection = () => {
  const { t } = useLang();
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative w-full bg-gradient-to-b from-[#fbf6ec] via-[#fdfaf3] to-[#fbf6ec] py-28 sm:py-36"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <div className="text-[11px] tracking-[0.42em] uppercase text-[#a17a35] mb-6 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#a17a35]" />
            {t.pricing.eyebrow}
            <span className="h-px w-10 bg-[#a17a35]" />
          </div>
          <h2
            data-testid="pricing-title"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] bg-gradient-to-br from-[#c9a45a] via-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {t.pricing.title}
          </h2>
          <p className="mt-5 text-[#5a4f44] max-w-xl mx-auto font-light">
            {t.pricing.subtitle}
          </p>
        </div>

        <ul
          data-testid="pricing-list"
          className="divide-y divide-[rgba(161,122,53,0.18)]"
        >
          {t.pricing.rows.map((row, idx) => (
            <li
              key={idx}
              data-testid={`pricing-row-${idx}`}
              className="group flex items-baseline gap-3 sm:gap-5 py-5 hover:bg-[rgba(161,122,53,0.05)] -mx-3 sm:-mx-5 px-3 sm:px-5 rounded-lg transition-colors duration-300"
            >
              <span
                className="text-base sm:text-xl font-serif text-[#3a312a] leading-snug whitespace-nowrap"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {row.name}
              </span>
              <span
                aria-hidden
                className="hidden sm:block flex-1 self-end mb-[10px] border-b border-dotted border-[rgba(161,122,53,0.45)]"
              />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.26em] text-[#a17a35]/90 font-medium whitespace-nowrap">
                {row.duration}
              </span>
              <span
                aria-hidden
                className="hidden sm:block w-10 self-end mb-[10px] border-b border-dotted border-[rgba(161,122,53,0.45)]"
              />
              <span className="whitespace-nowrap text-right ml-auto sm:ml-0">
                <span className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent">
                  {row.price.toLocaleString("sr-RS")}
                </span>
                <span className="ml-1.5 text-[10px] sm:text-xs tracking-[0.2em] text-[#a17a35]/90 font-medium">
                  {t.pricing.currency}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p
          data-testid="pricing-note"
          className="mt-6 text-center text-xs text-[#7a6e5e] italic"
        >
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
};
