import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { Flower2, Droplets, Leaf, Activity, Footprints, Heart } from "lucide-react";

const ICONS = [Flower2, Droplets, Leaf, Activity, Footprints, Heart];

export const MassagesSection = () => {
  const { t } = useLang();
  return (
    <section
      id="massages"
      data-testid="massages-section"
      className="relative py-28 sm:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="max-w-3xl">
          <div className="text-[11px] tracking-[0.42em] uppercase text-[#c49a4c] mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#c49a4c]" />
            {t.massages.eyebrow}
          </div>
          <h2
            data-testid="massages-title"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] bg-gradient-to-br from-[#f4e4bf] via-[#e8c98a] to-[#a17a35] bg-clip-text text-transparent"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {t.massages.title}
          </h2>
          <p className="mt-6 text-white/70 text-base sm:text-lg font-light leading-relaxed">
            {t.massages.subtitle}
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.massages.items.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <article
                key={idx}
                data-testid={`massage-card-${idx}`}
                className="group relative p-7 rounded-xl border border-[rgba(196,154,76,0.22)] bg-[rgba(20,13,9,0.6)] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#c49a4c] hover:shadow-[0_0_38px_rgba(196,154,76,0.22)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(196,154,76,0.06)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[rgba(196,154,76,0.12)] border border-[rgba(196,154,76,0.35)] text-[#e8c98a] mb-6">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-serif text-[#f4e4bf] leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
