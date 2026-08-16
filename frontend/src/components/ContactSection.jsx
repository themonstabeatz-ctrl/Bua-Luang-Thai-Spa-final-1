import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { Mandarin } from "flatpickr/dist/l10n/zh.js";
// Flatpickr does not ship a built-in Serbian or Thai locale by default in the
// react-flatpickr bundle, so the default English locale is used as a graceful
// fallback for `sr` and `th` (still respects the d.m.Y format).
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useSelection } from "@/contexts/SelectionContext";
import { Phone, Send, Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";
import { toast } from "sonner";
import { SlotGrid } from "./SlotGrid";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", date: "", time: "", message: "" };

// Rebuild the "Selected: …" line in the currently active site language, using
// the treatment coordinates (rowIdx/optIdx) stored on the selection. Keeps the
// auto-message in sync with the global header language switch.
const buildLocalizedMessage = (language, rowIdx, optIdx) => {
  const pricing = translations[language]?.pricing || translations.sr.pricing;
  const row = pricing.rows?.[rowIdx];
  const opt = row?.options?.[optIdx];
  if (!row || !opt) return null;
  const price = Number(opt.price).toLocaleString("sr-RS");
  return pricing.selectedTemplate
    .replace("{name}", row.name)
    .replace("{duration}", opt.duration)
    .replace("{price}", price);
};

// Map our app languages to Flatpickr locales (fallback to default English).
const LOCALE_MAP = { ru: Russian, zh: Mandarin };

export const ContactSection = () => {
  const { t, lang } = useLang();
  const { selection } = useSelection();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [slotRefresh, setSlotRefresh] = useState(0);
  const [messageSerbian, setMessageSerbian] = useState(null);
  const [messageThai, setMessageThai] = useState(null);

  const dateFpRef = useRef(null);
  const calWasOpen = useRef(false);
  // Tracks the last auto-generated "Selected: …" line so we only re-translate
  // it on a language switch when the user has NOT manually edited the message.
  const autoMsgRef = useRef("");

  const openStateSnapshot = () => {
    calWasOpen.current = !!dateFpRef.current?.flatpickr?.isOpen;
  };
  // Toggle driven by a mousedown/touchstart snapshot: flatpickr's own
  // document listener may close the calendar before our click fires, so we
  // decide based on whether it WAS open when the tap started.
  const toggleCalendar = () => {
    const fp = dateFpRef.current?.flatpickr;
    if (!fp) return;
    if (calWasOpen.current) fp.close();
    else fp.open();
  };

  // NOTE: the availability grid below the date field replaces the old wheel
  // picker; a slot can only be chosen from the free slots returned by the API.

  // Auto-populate message when a treatment is selected in the Pricing section,
  // and update the Serbian copy used in the owner notification email.
  useEffect(() => {
    if (!selection) return;
    const msg =
      buildLocalizedMessage(lang, selection.rowIdx, selection.optIdx) ||
      selection.message;
    autoMsgRef.current = msg;
    setForm((prev) => ({ ...prev, message: msg }));
    setMessageSerbian(selection.messageSerbian);
    setMessageThai(selection.messageThai);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  // Re-translate the auto-generated "Selected: …" line whenever the global
  // language switches — unless the user has manually edited the text.
  useEffect(() => {
    if (!selection) return;
    const msg = buildLocalizedMessage(lang, selection.rowIdx, selection.optIdx);
    if (!msg) return;
    // Compare against the CURRENT field value (committed) — not inside the
    // setForm updater, whose ref would already be mutated by then.
    if (form.message === autoMsgRef.current) {
      autoMsgRef.current = msg;
      setForm((prev) => ({ ...prev, message: msg }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const selectedTreatmentPayload = selection
    ? {
        name: selection.name,
        duration: selection.duration,
        price: selection.price,
        description: selection.description,
        name_serbian: selection.nameSerbian,
        description_serbian: selection.descriptionSerbian,
        name_thai: selection.nameThai,
        description_thai: selection.descriptionThai,
      }
    : null;

  // If user manually edits the message, drop the cached Serbian translation so
  // we don't ship a stale "Odabrano: …" line to the owner.
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && messageSerbian && value !== form.message) {
      setMessageSerbian(null);
      setMessageThai(null);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.date || !form.time) {
      toast.error(
        lang === "sr"
          ? "Molimo izaberite datum i vreme."
          : "Please select a date and time."
      );
      return;
    }
    setSubmitting(true);
    try {
      const { date, time, ...rest } = form;
      await axios.post(`${API}/contact`, {
        ...rest,
        appointment_date: date,
        appointment_time: time,
        language: lang,
        message_serbian: messageSerbian || undefined,
        message_thai: messageThai || undefined,
        selected_treatment: selectedTreatmentPayload || undefined,
      });
      toast.success(t.contact.form.success);
      setForm(initial);
      setMessageSerbian(null);
      setMessageThai(null);
      dateFpRef.current?.flatpickr?.clear?.();
      setSlotRefresh((k) => k + 1);
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 409) {
        toast.error(t.contact.form.slotTaken);
        setForm((p) => ({ ...p, time: "" }));
        setSlotRefresh((k) => k + 1);
      } else {
        toast.error(t.contact.form.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-[rgba(161,122,53,0.35)] focus:border-[#a17a35] outline-none py-2.5 text-[#2b2620] placeholder:text-[#a09686] transition-colors";

  // Tailored picker classes — large, premium feel with gold borders.
  const pickerInputCls =
    "buaa-picker-input w-full bg-transparent border-b-2 border-[rgba(161,122,53,0.45)] focus:border-[#a17a35] outline-none py-4 pr-12 text-lg sm:text-xl text-[#2b2620] placeholder:text-[#bba98a] tracking-wider font-light transition-colors cursor-pointer";

  const dateLocale = useMemo(() => LOCALE_MAP[lang] || undefined, [lang]);

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative w-full bg-gradient-to-b from-[#f5e7c4] via-[#f8edd4] to-[#fbf3dc] py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="text-center mb-10">
          <div className="text-[11px] tracking-[0.42em] uppercase text-[#a17a35] mb-5 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#a17a35]" />
            {t.contact.eyebrow}
            <span className="h-px w-10 bg-[#a17a35]" />
          </div>
          <h2
            data-testid="contact-title"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] bg-gradient-to-br from-[#c9a45a] via-[#a17a35] to-[#7a5a22] bg-clip-text text-transparent"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {t.contact.title}
          </h2>
          <p className="mt-5 text-[#5a4f44] max-w-xl mx-auto font-light">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-stretch">
          {/* LEFT: form */}
          <div className="h-full">
            <form
              data-testid="contact-form"
              onSubmit={onSubmit}
              className="rounded-2xl border border-[rgba(161,122,53,0.22)] bg-white/85 backdrop-blur-sm p-7 sm:p-9 space-y-5 shadow-[0_18px_60px_rgba(80,55,18,0.08)] h-full flex flex-col"
            >
              <div>
                <label className="block text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  data-testid="contact-input-name"
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className={inputCls}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    data-testid="contact-input-email"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                    {t.contact.form.phone}
                  </label>
                  <input
                    data-testid="contact-input-phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="block text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                    {t.contact.form.dateLabel}
                  </label>
                  <Flatpickr
                    ref={dateFpRef}
                    value={form.date ? new Date(`${form.date}T00:00:00`) : ""}
                    options={{
                      dateFormat: "d.m.Y",
                      altInput: false,
                      minDate: "today",
                      disableMobile: true,
                      monthSelectorType: "static",
                      // Opening is handled manually (toggle on input/icon tap).
                      clickOpens: false,
                      // `static: true` anchors the calendar inside the input
                      // wrapper instead of repositioning relative to the
                      // document, which makes Flatpickr skip its internal
                      // `getDocumentStyleSheet()` loop. That loop crashes
                      // with `SecurityError: Failed to read 'cssRules'…` on
                      // mobile browsers as soon as a cross-origin CSS is
                      // present (Google Fonts, flagcdn, etc.).
                      static: true,
                      ...(dateLocale ? { locale: dateLocale } : {}),
                    }}
                    onChange={(dates) => {
                      const d = dates[0];
                      if (!d) {
                        setForm((p) => ({ ...p, date: "" }));
                        return;
                      }
                      const y = d.getFullYear();
                      const m = String(d.getMonth() + 1).padStart(2, "0");
                      const day = String(d.getDate()).padStart(2, "0");
                      // Store ISO (yyyy-mm-dd) for the backend; user sees d.m.Y.
                      setForm((p) => ({ ...p, date: `${y}-${m}-${day}` }));
                    }}
                    render={({ defaultValue, value: _v, ...props }, ref) => {
                      // react-flatpickr injects helper keys we must not pass to the
                      // native <input> (e.g. `render`, `options`). Strip them out
                      // before spreading so React does not warn.
                      const {
                        render: _r,
                        options: _o,
                        onChange: _oc,
                        ...inputProps
                      } = props;
                      return (
                        <div className="relative">
                          <input
                            {...inputProps}
                            ref={ref}
                            data-testid="contact-input-date"
                            required
                            readOnly
                            placeholder={t.contact.form.datePlaceholder}
                            defaultValue={defaultValue}
                            onMouseDown={openStateSnapshot}
                            onTouchStart={openStateSnapshot}
                            onClick={toggleCalendar}
                            className={pickerInputCls}
                          />
                          <button
                            type="button"
                            data-testid="contact-date-toggle"
                            aria-label={t.contact.form.dateLabel}
                            onMouseDown={openStateSnapshot}
                            onTouchStart={openStateSnapshot}
                            onClick={toggleCalendar}
                            className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-[#a17a35] hover:text-[#7a5a22] transition-colors"
                          >
                            <CalendarIcon className="h-6 w-6" strokeWidth={1.6} />
                          </button>
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="relative">
                  <label className="block text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                    {t.contact.form.timeLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      data-testid="contact-input-time"
                      required
                      readOnly
                      placeholder={t.contact.form.timePlaceholder}
                      value={form.time}
                      className={`${pickerInputCls} cursor-default`}
                    />
                    <ClockIcon
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-[#a17a35] pointer-events-none"
                      strokeWidth={1.6}
                    />
                  </div>
                </div>
              </div>

              <SlotGrid
                refreshKey={slotRefresh}
                date={form.date}
                duration={selection?.duration || 60}
                value={form.time}
                onChange={(hhmm) => setForm((p) => ({ ...p, time: hhmm }))}
                copy={t.contact.form}
              />
              <div>
                <label className="block text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  data-testid="contact-input-message"
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={submitting || !form.date || !form.time}
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-white hover:shadow-[0_12px_36px_rgba(161,122,53,0.45)] transition-shadow duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex-1"
                >
                  {submitting ? t.contact.form.sending : t.contact.form.submit}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href="tel:+38162625500"
                  data-testid="contact-call"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-white hover:shadow-[0_12px_36px_rgba(161,122,53,0.45)] transition-shadow duration-500 flex-1"
                >
                  {t.contact.form.callUs}
                  <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                </a>
              </div>
            </form>
          </div>

          {/* RIGHT: map (Google Maps) */}
          <div
            data-testid="contact-map"
            className="rounded-2xl overflow-hidden border border-[rgba(161,122,53,0.25)] bg-white relative shadow-[0_18px_60px_rgba(80,55,18,0.10)] h-full min-h-[480px]"
          >
            <iframe
              title="Belgrade map"
              src="https://www.google.com/maps?q=Beograd%2C+Srbija&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[480px] block"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[rgba(161,122,53,0.18)] rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
