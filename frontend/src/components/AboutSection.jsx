import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";

// Each paragraph enters from a different direction to create a soft cascade.
const DIRECTIONS = ["top", "left", "right", "bottom"];

export const AboutSection = () => {
  const { t } = useLang();
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative w-full bg-gradient-to-b from-[#fbf6ec] via-[#fdfaf3] to-[#fbf6ec] py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-14 text-center">
        <Reveal direction="top" duration={800}>
          <div className="text-[11px] tracking-[0.42em] uppercase text-[#a17a35] mb-6 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#a17a35]" />
            {t.about.eyebrow}
            <span className="h-px w-10 bg-[#a17a35]" />
          </div>
        </Reveal>

        <Reveal direction="top" duration={1000} delay={120}>
          <h2
            data-testid="about-title"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight bg-gradient-to-br from-[#c9a45a] via-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {t.about.title}
          </h2>
        </Reveal>

        <div className="mt-3 mb-10 flex justify-center">
          <span className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-[#a17a35] to-transparent" />
        </div>

        <div className="space-y-6 text-[#3a312a]/90 leading-[1.95] text-[15px] sm:text-[17px] font-light max-w-3xl mx-auto text-left sm:text-justify">
          {t.about.paragraphs.map((p, idx) => (
            <Reveal
              key={idx}
              direction={DIRECTIONS[idx % DIRECTIONS.length]}
              duration={900}
              delay={idx * 90}
            >
              <p
                data-testid={`about-paragraph-${idx}`}
                className={idx === 0 ? "text-lg sm:text-xl text-[#5a4017] text-center font-normal" : ""}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
