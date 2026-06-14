import React, { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";

const formatPrice = (n) => n.toLocaleString("sr-RS");

const PricingRow = ({ row, idx, t }) => {
  const [open, setOpen] = useState(false);
  return (
    <li
      data-testid={`pricing-row-${idx}`}
      className="border-b border-[rgba(161,122,53,0.18)] last:border-b-0 py-6"
    >
      <div className="flex items-start gap-3 sm:gap-5">
        {/* Left: name + subname + toggle */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3
              className="text-lg sm:text-2xl font-serif text-[#3a312a] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {row.name}
            </h3>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#a17a35]/75">
              {row.subname}
            </span>
          </div>

          <button
            type="button"
            data-testid={`pricing-toggle-${idx}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm tracking-[0.16em] uppercase text-[#a17a35] hover:text-[#7a5a22] transition-colors font-medium"
          >
            {open ? t.pricing.hideDescription : t.pricing.showDescription}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Right: durations + prices stacked */}
        <div className="flex flex-col items-end gap-1.5 text-right shrink-0 pt-1">
          {row.options.map((opt, i) => (
            <div key={i} className="flex items-baseline gap-3 whitespace-nowrap">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#a17a35]/90 font-medium tabular-nums">
                {opt.duration} MIN
              </span>
              <span className="hidden sm:inline-block w-6 self-end mb-[6px] border-b border-dotted border-[rgba(161,122,53,0.45)]" />
              <span>
                <span className="text-base sm:text-xl font-semibold bg-gradient-to-r from-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent tabular-nums">
                  {formatPrice(opt.price)}
                </span>
                <span className="ml-1 text-[10px] tracking-[0.18em] text-[#a17a35]/85 font-medium">
                  {t.pricing.currency}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Description toggle */}
      <div
        data-testid={`pricing-description-${idx}`}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-4 rounded-xl bg-[rgba(161,122,53,0.07)] border border-[rgba(161,122,53,0.20)] px-5 py-4">
            <p className="text-sm sm:text-[15px] text-[#3a312a]/85 leading-relaxed font-light italic">
              {row.description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

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

        <ul data-testid="pricing-list">
          {t.pricing.rows.map((row, idx) => (
            <PricingRow key={idx} row={row} idx={idx} t={t} />
          ))}
        </ul>

        <p
          data-testid="pricing-note"
          className="mt-8 text-center text-xs text-[#7a6e5e] italic"
        >
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
};
