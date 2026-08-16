import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HOME_FAQ } from "@/seo/localSeo";

const COPY = {
  sr: { eyebrow: "Česta pitanja", title: "Sve što treba da znate" },
  en: { eyebrow: "FAQ", title: "Everything you need to know" },
  ru: { eyebrow: "Частые вопросы", title: "Всё, что нужно знать" },
  zh: { eyebrow: "常见问题", title: "您需要了解的一切" },
  th: { eyebrow: "คำถามที่พบบ่อย", title: "ทุกสิ่งที่คุณควรรู้" },
};

export const FaqSection = () => {
  const { lang } = useLang();
  const copy = COPY[lang] || COPY.sr;
  const items = HOME_FAQ[lang] || HOME_FAQ.sr;

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative w-full bg-gradient-to-b from-[#fbf3dc] to-[#f5e7c4] py-16 sm:py-20"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="mb-10">
          <div className="text-[11px] tracking-[0.42em] uppercase text-[#a17a35] mb-5 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#a17a35]" />
            {copy.eyebrow}
          </div>
          <h2
            data-testid="faq-title"
            className="font-serif text-4xl sm:text-5xl leading-[1.05] bg-gradient-to-br from-[#c9a45a] via-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {copy.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map(([q, a], i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              data-testid={`faq-item-${i}`}
              className="rounded-2xl border border-[rgba(161,122,53,0.25)] bg-white/70 px-5 sm:px-6 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-left text-base md:text-lg text-[#3a312a] hover:text-[#a17a35] hover:no-underline py-5">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-[#5a4f44] pb-5">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
