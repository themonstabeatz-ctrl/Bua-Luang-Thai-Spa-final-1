import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ASSETS } from "@/constants/assets";
import { Instagram, Mail, Phone, Clock } from "lucide-react";

export const Footer = () => {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="footer"
      className="relative pt-12 pb-8 border-t border-[rgba(161,122,53,0.25)] bg-gradient-to-b from-[#fbf3dc] to-[#f5e7c4]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 grid md:grid-cols-3 gap-10 items-start">
        <div>
          {/* Logo without dark wrap — multiply blend so black PNG bg blends into the warm gold footer */}
          <img
            src={ASSETS.logo}
            alt="Bua Luang Thai Spa Beograd - Tradicionalna Tajlandska masaza logo"
            data-testid="footer-logo"
            className="h-28 sm:h-32 w-auto"
            style={{ mixBlendMode: "multiply" }}
          />
          <p className="mt-3 text-sm text-[#5a4f44] leading-relaxed max-w-xs">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.32em] uppercase text-[#a17a35] mb-4">
            {t.footer.quickLinks}
          </div>
          <ul className="space-y-2 text-sm text-[#3a312a]">
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
          <div className="text-[11px] tracking-[0.32em] uppercase text-[#a17a35] mb-4">
            {t.footer.followUs}
          </div>
          <div className="space-y-2.5 text-sm text-[#3a312a]">
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
            <div
              className="flex items-center gap-3 text-[#3a312a]"
              data-testid="footer-hours"
            >
              <Clock className="h-4 w-4 text-[#a17a35]" />
              <span>
                <span className="block text-[10px] uppercase tracking-[0.28em] text-[#a17a35]">
                  {t.contact.info.hoursLabel}
                </span>
                {t.contact.info.hoursValue}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-5 border-t border-[rgba(161,122,53,0.22)] text-center text-xs text-[#7a6e5e] tracking-wider">
        © {year} Bua Luang Thai Spa. {t.footer.rights}
      </div>
    </footer>
  );
};
