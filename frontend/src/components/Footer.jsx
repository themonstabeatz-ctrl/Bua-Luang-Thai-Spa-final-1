import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ASSETS } from "@/constants/assets";
import { Instagram, Mail, Phone } from "lucide-react";

export const Footer = () => {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="footer"
      className="relative pt-20 pb-10 border-t border-[rgba(161,122,53,0.22)] bg-gradient-to-b from-[#fbf3e3] to-[#f7ead0]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 grid md:grid-cols-3 gap-12">
        <div>
          {/* Bigger logo, kept inside dark badge so the gold/white print stays legible */}
          <div className="inline-block rounded-2xl bg-[#0a0705] px-8 py-6 shadow-[0_18px_60px_rgba(20,12,4,0.20)]">
            <img
              src={ASSETS.logo}
              alt="Bua Luang Thai Spa"
              data-testid="footer-logo"
              className="h-44 sm:h-52 lg:h-56 w-auto"
            />
          </div>
          <p className="mt-5 text-sm text-[#5a4f44] leading-relaxed max-w-xs">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.32em] uppercase text-[#a17a35] mb-5">
            {t.footer.quickLinks}
          </div>
          <ul className="space-y-2.5 text-sm text-[#3a312a]">
            {["home", "about", "pricing", "contact"].map((k) => (
              <li key={k}>
                <a
                  href={`#${k}`}
                  className="hover:text-[#a17a35] transition-colors"
                  data-testid={`footer-link-${k}`}
                >
                  {t.nav[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.32em] uppercase text-[#a17a35] mb-5">
            {t.footer.followUs}
          </div>
          <div className="space-y-3 text-sm text-[#3a312a]">
            <a
              href="mailto:bualuangthailandspa@gmail.com"
              className="flex items-center gap-3 hover:text-[#a17a35] transition-colors"
              data-testid="footer-email"
            >
              <Mail className="h-4 w-4 text-[#a17a35]" />
              bualuangthailandspa@gmail.com
            </a>
            <a
              href="tel:+38162625500"
              className="flex items-center gap-3 hover:text-[#a17a35] transition-colors"
              data-testid="footer-phone"
            >
              <Phone className="h-4 w-4 text-[#a17a35]" />
              +381 62 625 500
            </a>
            <a
              href="https://instagram.com/bualuang_thai_spa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-[#a17a35] transition-colors"
              data-testid="footer-instagram"
            >
              <Instagram className="h-4 w-4 text-[#a17a35]" />
              @bualuang_thai_spa
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-[rgba(161,122,53,0.18)] text-center text-xs text-[#7a6e5e] tracking-wider">
        © {year} Bua Luang Thai Spa. {t.footer.rights}
      </div>
    </footer>
  );
};
