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
      {/* Mandala accent */}
      <img
        src={ASSETS.mandalaBg}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -right-40 top-10 w-[720px] max-w-[80vw] opacity-[0.18] mix-blend-screen"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <div className="text-[11px] tracking-[0.42em] uppercase text-[#c49a4c] mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c49a4c]" />
              {t.about.eyebrow}
            </div>
            <h2
              data-testid="about-title"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight bg-gradient-to-br from-[#f4e4bf] via-[#e8c98a] to-[#a17a35] bg-clip-text text-transparent"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              {t.about.title}
            </h2>

            <div className="mt-12 grid grid-cols-3 gap-4">
              {t.about.stats.map((s, idx) => (
                <div
                  key={idx}
                  data-testid={`about-stat-${idx}`}
                  className="p-4 rounded-lg border border-[rgba(196,154,76,0.25)] bg-[rgba(20,13,9,0.55)]"
                >
                  <div className="text-2xl sm:text-3xl font-semibold text-[#e8c98a]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-white/55">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-white/80 leading-[1.85] text-[15px] sm:text-base font-light">
            {t.about.paragraphs.map((p, idx) => (
              <p
                key={idx}
                data-testid={`about-paragraph-${idx}`}
                className={
                  idx === 0
                    ? "text-lg sm:text-xl text-white/90 leading-relaxed border-l-2 border-[#c49a4c] pl-6"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
