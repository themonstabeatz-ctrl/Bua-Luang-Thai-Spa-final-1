import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
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
  { id: "massages", href: "#massages" },
  { id: "pricing", href: "#pricing" },
  { id: "contact", href: "#contact" },
];

export const Navigation = () => {
  const { t, lang, setLang, languages } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(10,7,5,0.78)] backdrop-blur-xl border-b border-[rgba(196,154,76,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-20">
        <a
          href="#home"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
        >
          <img
            src={ASSETS.logo}
            alt="Bua Luang Thai Spa"
            className="h-12 w-auto drop-shadow-[0_0_18px_rgba(196,154,76,0.25)] transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              data-testid={`nav-link-${item.id}`}
              className="relative text-sm tracking-[0.18em] uppercase text-white/85 hover:text-[#e8c98a] transition-colors duration-300 font-light after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-gradient-to-r after:from-[#c49a4c] after:to-[#e8c98a] after:transition-all after:duration-500 hover:after:w-full"
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
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(196,154,76,0.35)] bg-[rgba(20,13,9,0.55)] backdrop-blur-md text-[#e8c98a] hover:border-[#c49a4c] hover:bg-[rgba(196,154,76,0.12)] transition-all duration-300"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium tracking-wider">
                  {current.flag} {current.label}
                </span>
                <ChevronDown className="h-3.5 w-3.5 opacity-80" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              data-testid="language-menu"
              className="bg-[#140d09] border border-[rgba(196,154,76,0.35)] text-white min-w-[170px]"
            >
              {languages.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  data-testid={`lang-option-${l.code}`}
                  onClick={() => setLang(l.code)}
                  className={`cursor-pointer focus:bg-[rgba(196,154,76,0.16)] focus:text-[#e8c98a] gap-3 ${
                    l.code === lang ? "text-[#e8c98a]" : "text-white/90"
                  }`}
                >
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span className="text-sm tracking-wider">{l.label}</span>
                  <span className="text-xs text-white/50 ml-auto">{l.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#contact"
            data-testid="nav-cta"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm tracking-[0.16em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-[#0a0705] hover:shadow-[0_0_24px_rgba(212,173,94,0.5)] transition-shadow duration-500"
          >
            {t.nav.book}
          </a>

          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-[#e8c98a]"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
          mobileOpen ? "max-h-[480px]" : "max-h-0"
        } bg-[rgba(10,7,5,0.97)] backdrop-blur-xl border-t border-[rgba(196,154,76,0.18)]`}
      >
        <div className="flex flex-col px-6 py-6 gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              data-testid={`nav-mobile-link-${item.id}`}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-base tracking-[0.18em] uppercase text-white/85 hover:text-[#e8c98a] border-b border-[rgba(196,154,76,0.12)] last:border-b-0"
            >
              {t.nav[item.id]}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            data-testid="nav-mobile-cta"
            className="mt-4 text-center px-5 py-3 rounded-full text-sm tracking-[0.16em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-[#0a0705]"
          >
            {t.nav.book}
          </a>
        </div>
      </div>
    </header>
  );
};
