import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useSelection } from "@/contexts/SelectionContext";

const PHONE_RAW = "38162625500";

const WhatsAppIcon = ({ className = "" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.001 4C9.926 4 5 8.925 5 14.999c0 2.114.59 4.092 1.617 5.776L5 28l7.412-1.581a10.93 10.93 0 0 0 3.589.586c6.075 0 11-4.925 11-11C27 8.925 22.076 4 16.001 4Zm6.397 15.611c-.269.762-1.55 1.445-2.151 1.504-.572.056-1.293.08-2.087-.131-.482-.128-1.101-.341-1.892-.689-3.327-1.467-5.504-4.879-5.67-5.107-.166-.228-1.358-1.83-1.358-3.491 0-1.661.86-2.477 1.165-2.81.305-.333.665-.416.886-.416.221 0 .443.002.637.012.204.01.479-.078.749.583.277.683.94 2.36 1.023 2.531.083.171.139.371.027.6-.111.229-.166.371-.331.571-.166.2-.349.447-.499.6-.166.166-.34.345-.146.677.194.331.866 1.45 1.86 2.35 1.276 1.156 2.353 1.515 2.685 1.682.331.166.526.139.721-.083.194-.222.831-.971 1.054-1.305.222-.333.443-.278.749-.166.305.111 1.94.915 2.273 1.081.331.166.554.249.638.388.083.139.083.804-.186 1.566Z"/>
  </svg>
);
const ViberIcon = ({ className = "" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M21.94 18.05c-.43-.21-2.55-1.25-2.94-1.39-.4-.14-.69-.21-.97.21-.29.43-1.11 1.39-1.36 1.68-.25.29-.5.32-.93.11-.43-.21-1.82-.67-3.46-2.13-1.28-1.14-2.14-2.55-2.39-2.98-.25-.43-.03-.66.19-.87.19-.19.43-.5.64-.75.21-.25.29-.43.43-.71.14-.29.07-.54-.04-.75-.11-.21-.97-2.33-1.32-3.19-.35-.84-.71-.72-.97-.74-.25-.01-.54-.01-.83-.01-.29 0-.75.11-1.14.54-.4.43-1.5 1.47-1.5 3.58 0 2.11 1.54 4.16 1.75 4.45.21.29 3.03 4.62 7.34 6.48.99.43 1.76.69 2.36.89.99.31 1.9.27 2.62.16.8-.12 2.55-1.04 2.91-2.05.36-1.01.36-1.87.25-2.05-.11-.18-.4-.29-.83-.5ZM16 4C9.37 4 4 9.37 4 16c0 2.4.71 4.64 1.93 6.51L4.5 28.5l6.18-1.42A11.94 11.94 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4Z"/>
  </svg>
);

// Belgrade-style seasonal greeting:
//   05:00–10:00  → "Dobro jutro!" (all year)
//   Winter (Oct–Mar):
//      10:00–17:00 → "Dobar dan!"
//      else        → "Dobro veče!"
//   Summer (Apr–Sep):
//      10:00–20:00 → "Dobar dan!"
//      else        → "Dobro veče!"
const getGreeting = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMonth(); // 0=Jan
  if (h >= 5 && h < 10) return "Dobro jutro!";
  const isWinter = m >= 9 || m <= 2; // Oct(9)–Mar(2)
  const dayEnd = isWinter ? 17 : 20;
  return h >= 10 && h < dayEnd ? "Dobar dan!" : "Dobro veče!";
};

const buildMessage = (selection) => {
  const greeting = getGreeting();
  const treatmentLine = selection?.messageSerbian
    ? `Tretman: ${selection.messageSerbian}`
    : "Tretman: ";
  return (
    `${greeting}\n\n` +
    `Želim da rezervišem termin za masažu u Bua Luang Thai Spa.\n\n` +
    `Moje ime: \n` +
    `${treatmentLine}\n` +
    `Željeni datum i vreme: \n\n` +
    `Hvala unapred!`
  );
};

export const ChatFloater = () => {
  const { t } = useLang();
  const { selection } = useSelection();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [open]);

  // Recompute links on every open so the greeting and selection stay fresh.
  const message = buildMessage(selection);
  const waUrl = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(message)}`;
  // Viber's `viber://chat?number=...` protocol does NOT support a `text=`
  // parameter, so we only pass the phone number to guarantee the chat opens.
  const viberUrl = `viber://chat?number=%2B${PHONE_RAW}`;

  return (
    <div
      ref={wrapperRef}
      data-testid="chat-floater"
      className="fixed bottom-20 right-5 sm:bottom-24 sm:right-8 z-[60]"
    >
      <div
        data-testid="chat-floater-panel"
        className={`absolute bottom-20 right-0 w-[320px] origin-bottom-right rounded-2xl border border-[rgba(161,122,53,0.30)] bg-white/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(60,40,18,0.22)] p-3 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="px-3 py-2">
          <div className="text-[10px] tracking-[0.32em] uppercase text-[#a17a35]">
            {t.chat.title}
          </div>
          <div className="text-sm text-[#7a6e5e] mt-1">{t.chat.subtitle}</div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="chat-whatsapp"
          className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl border border-[rgba(161,122,53,0.20)] bg-gradient-to-r from-[#fbf6ec] to-white hover:border-[#a17a35] hover:shadow-[0_8px_24px_rgba(161,122,53,0.18)] transition-all"
        >
          <span className="h-10 w-10 rounded-full bg-gradient-to-br from-[#25d366] to-[#128c4f] text-white flex items-center justify-center shadow">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-medium text-[#3a312a] leading-tight">
              {t.chat.whatsapp}
            </span>
            <span className="block text-[11px] text-[#7a6e5e] tracking-wider mt-0.5">
              +381 62 625 500
            </span>
          </span>
        </a>

        <a
          href={viberUrl}
          data-testid="chat-viber"
          className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl border border-[rgba(161,122,53,0.20)] bg-gradient-to-r from-[#fbf6ec] to-white hover:border-[#a17a35] hover:shadow-[0_8px_24px_rgba(161,122,53,0.18)] transition-all"
        >
          <span className="h-10 w-10 rounded-full bg-gradient-to-br from-[#7c4dff] to-[#4a2bbf] text-white flex items-center justify-center shadow">
            <ViberIcon className="h-5 w-5" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-medium text-[#3a312a] leading-tight">
              {t.chat.viber}
            </span>
            <span className="block text-[11px] text-[#7a6e5e] tracking-wider mt-0.5">
              +381 62 625 500
            </span>
          </span>
        </a>
      </div>

      <button
        type="button"
        data-testid="chat-floater-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t.chat.title}
        className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-[#c9a45a] via-[#a17a35] to-[#7a5a22] text-white flex items-center justify-center shadow-[0_14px_38px_rgba(161,122,53,0.50)] hover:shadow-[0_18px_50px_rgba(161,122,53,0.65)] transition-all duration-300 hover:scale-105"
      >
        <span
          className={`absolute inset-0 rounded-full bg-[#c9a45a] opacity-50 animate-ping ${open ? "hidden" : ""}`}
        />
        <span className="relative">
          {open ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" />}
        </span>
      </button>
    </div>
  );
};
