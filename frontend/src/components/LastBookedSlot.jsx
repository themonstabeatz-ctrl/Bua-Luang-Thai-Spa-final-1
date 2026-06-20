import React, { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

/**
 * Subtle "Last booked slot X minutes ago" social-proof line.
 *
 * Design principles enforced:
 *   • muted gold color, no red, no blink, no countdown,
 *   • soft 10–11px tracking-wide caption typography,
 *   • single line, centered, breathes — not a banner,
 *   • X is randomised between 5 and 45 minutes per mount and slowly
 *     "ticks" upward every 60s so it feels alive without being theatrical,
 *   • localised string per route language.
 */

const COPY = {
  sr: (n) => `Poslednji termin rezervisan pre ${n} minuta`,
  en: (n) => `Last slot booked ${n} minutes ago`,
  ru: (n) => `Последний сеанс забронирован ${n} минут назад`,
  zh: (n) => `最后一次预约是在 ${n} 分钟前`,
};

const MIN_MINUTES = 5;
const MAX_MINUTES = 45;

const pickInitial = () =>
  Math.floor(Math.random() * (MAX_MINUTES - MIN_MINUTES + 1)) + MIN_MINUTES;

export const LastBookedSlot = ({ className = "" }) => {
  const { lang } = useLang();
  const [minutes, setMinutes] = useState(pickInitial);

  useEffect(() => {
    // Once per minute, advance by 1 and roll back to a fresh random slot
    // when we'd exceed the realistic window. Keeps the proof "warm".
    const id = setInterval(() => {
      setMinutes((m) => (m + 1 > MAX_MINUTES ? pickInitial() : m + 1));
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const renderer = COPY[lang] || COPY.en;

  return (
    <div
      data-testid="last-booked-slot"
      className={`text-center text-[11px] tracking-[0.18em] text-[#a17a35]/75 font-light ${className}`}
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-2">
        {/* Tiny static dot — no animation, just a visual anchor */}
        <span
          aria-hidden="true"
          className="inline-block w-1.5 h-1.5 rounded-full bg-[#a17a35]/60"
        />
        {renderer(minutes)}
      </span>
    </div>
  );
};
