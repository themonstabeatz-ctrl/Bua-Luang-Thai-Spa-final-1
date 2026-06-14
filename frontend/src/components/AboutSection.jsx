import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ASSETS } from "@/constants/assets";

export const AboutSection = () => {
  const { t } = useLang();
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-28 sm:py-36 overflow-hidden"
    >
      {/* Mandala accent — soft, light */}
      <img
        src={ASSETS.mandalaBg}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -right-44 top-16 w-[720px] max-w-[80vw] opacity-[0.08]"
      />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-14 text-center">
        <div className="text-[11px] tracking-[0.42em] uppercase text-[#a17a35] mb-6 inline-flex items-center gap-3">
          <span className="h-px w-10 bg-[#a17a35]" />
          {t.about.eyebrow}
          <span className="h-px w-10 bg-[#a17a35]" />
        </div>

        <h2
          data-testid="about-title"
          className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight bg-gradient-to-br from-[#c9a45a] via-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          {t.about.title}
        </h2>

        <div className="mt-3 mb-10 flex justify-center">
          <span className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-[#a17a35] to-transparent" />
        </div>

        <div className="space-y-6 text-[#3a312a]/85 leading-[1.95] text-[15px] sm:text-[17px] font-light max-w-3xl mx-auto text-left sm:text-justify">
          {t.about.paragraphs.map((p, idx) => (
            <p
              key={idx}
              data-testid={`about-paragraph-${idx}`}
              className={idx === 0 ? "text-lg sm:text-xl text-[#5a4017] text-center font-normal" : ""}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
