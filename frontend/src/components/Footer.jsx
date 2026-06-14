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
      className="relative pt-20 pb-10 border-t border-[rgba(196,154,76,0.18)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 grid md:grid-cols-3 gap-12">
        <div>
          <img
            src={ASSETS.logo}
            alt="Bua Luang Thai Spa"
            className="h-20 w-auto"
          />
          <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-xs">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.32em] uppercase text-[#c49a4c] mb-5">
            {t.footer.quickLinks}
          </div>
          <ul className="space-y-2.5 text-sm text-white/75">
            {["home", "about", "massages", "pricing", "contact"].map((k) => (
              <li key={k}>
                <a
                  href={`#${k}`}
                  className="hover:text-[#e8c98a] transition-colors"
                  data-testid={`footer-link-${k}`}
                >
                  {t.nav[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.32em] uppercase text-[#c49a4c] mb-5">
            {t.footer.followUs}
          </div>
          <div className="space-y-3 text-sm text-white/75">
            <a
              href="mailto:bualuangthailandspa@gmail.com"
              className="flex items-center gap-3 hover:text-[#e8c98a] transition-colors"
              data-testid="footer-email"
            >
              <Mail className="h-4 w-4 text-[#c49a4c]" />
              bualuangthailandspa@gmail.com
            </a>
            <a
              href="tel:+38162625500"
              className="flex items-center gap-3 hover:text-[#e8c98a] transition-colors"
              data-testid="footer-phone"
            >
              <Phone className="h-4 w-4 text-[#c49a4c]" />
              +381 62 625 500
            </a>
            <a
              href="https://instagram.com/bualuang_thai_spa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-[#e8c98a] transition-colors"
              data-testid="footer-instagram"
            >
              <Instagram className="h-4 w-4 text-[#c49a4c]" />
              @bualuang_thai_spa
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-[rgba(196,154,76,0.12)] text-center text-xs text-white/40 tracking-wider">
        © {year} Bua Luang Thai Spa. {t.footer.rights}
      </div>
    </footer>
  );
};
