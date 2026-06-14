import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, LANGUAGES } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "bualuang_lang";

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "sr";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved && translations[saved] ? saved : "sr";
  });

  const setLang = (code) => {
    if (!translations[code]) return;
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang] || translations.sr,
      languages: LANGUAGES,
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
