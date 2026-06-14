import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { ASSETS } from "@/constants/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "pricing", href: "#pricing" },
  { id: "contact", href: "#contact" },
];

// Tiny flag image — flagcdn.com is a free public flag CDN with stable urls.
const Flag = ({ iso, className = "" }) => (
  <img
    src={`https://flagcdn.com/w40/${iso}.png`}
    srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
    alt=""
    width={20}
    height={14}
    className={`inline-block rounded-[2px] object-cover shadow-[0_1px_3px_rgba(0,0,0,0.25)] ${className}`}
  />
);

export const Navigation = () => {
  const { t, lang, setLang, languages } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      // Fade out the nav logo as the user scrolls. Fully visible at top,
      // fully hidden after ~480px of scroll (smooth easing).
      const t = Math.min(1, Math.max(0, y / 480));
      const eased = 1 - t * t;
      setLogoOpacity(eased);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(26,18,10,0.78)] backdrop-blur-xl border-b border-[rgba(196,154,76,0.25)] shadow-[0_6px_30px_rgba(0,0,0,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-20">
        <a
          href="#home"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
          style={{ opacity: logoOpacity, transition: "opacity 200ms linear" }}
        >
          <img
            src={ASSETS.logo}
            alt="Bua Luang Thai Spa Beograd - Tradicionalna Tajlandska masaza logo"
            className="h-12 w-auto transition-transform duration-500 group-hover:scale-105"
            style={{
              mixBlendMode: "screen",
              filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.45))",
            }}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              data-testid={`nav-link-${item.id}`}
              className="relative text-sm tracking-[0.18em] uppercase font-medium transition-colors duration-300 text-white hover:text-[#e8c98a] after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-gradient-to-r after:from-[#a17a35] after:to-[#e8c98a] after:transition-all after:duration-500 hover:after:w-full"
            >
              {t.nav[item.id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                data-testid="language-switcher"
                aria-label={current.name}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/70 transition-all duration-300"
              >
                <Flag iso={current.iso} />
                <ChevronDown className="h-3.5 w-3.5 opacity-80" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              data-testid="language-menu"
              className="bg-[#1a120a] border border-[rgba(196,154,76,0.35)] text-white min-w-[200px] shadow-2xl"
            >
              {languages.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  data-testid={`lang-option-${l.code}`}
                  onClick={() => setLang(l.code)}
                  className={`cursor-pointer focus:bg-[rgba(196,154,76,0.18)] focus:text-[#e8c98a] gap-3 ${
                    l.code === lang ? "text-[#e8c98a]" : "text-white"
                  }`}
                >
                  <Flag iso={l.iso} />
                  <span className="text-sm font-medium">{l.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#contact"
            data-testid="nav-cta"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm tracking-[0.16em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-[#1a120a] hover:shadow-[0_8px_28px_rgba(212,173,94,0.55)] transition-shadow duration-500"
          >
            {t.nav.book}
          </a>

          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
          mobileOpen ? "max-h-[480px]" : "max-h-0"
        } bg-[rgba(26,18,10,0.96)] backdrop-blur-xl border-t border-[rgba(196,154,76,0.22)]`}
      >
        <div className="flex flex-col px-6 py-6 gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              data-testid={`nav-mobile-link-${item.id}`}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-base tracking-[0.18em] uppercase text-white hover:text-[#e8c98a] border-b border-[rgba(196,154,76,0.18)] last:border-b-0 font-medium"
            >
              {t.nav[item.id]}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            data-testid="nav-mobile-cta"
            className="mt-4 text-center px-5 py-3 rounded-full text-sm tracking-[0.16em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-[#1a120a]"
          >
            {t.nav.book}
          </a>
        </div>
      </div>
    </header>
  );
};
