import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { Mandarin } from "flatpickr/dist/l10n/zh.js";
// Flatpickr does not ship a built-in Serbian or Thai locale by default in the
// react-flatpickr bundle, so the default English locale is used as a graceful
// fallback for `sr` and `th` (still respects the d.m.Y format).
import { useLang } from "@/i18n/LanguageContext";
import { useSelection } from "@/contexts/SelectionContext";
import { Phone, Send, Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";
import { toast } from "sonner";
import { TimeWheelPicker } from "./TimeWheelPicker";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", date: "", time: "", message: "" };

// Localized labels for the custom scroll-wheel time picker.
const WHEEL_LABELS = {
  sr: { hour: "Sat", minute: "Min", confirm: "Potvrdi", cancel: "Otkaži" },
  en: { hour: "Hour", minute: "Min", confirm: "Confirm", cancel: "Cancel" },
  ru: { hour: "Час", minute: "Мин", confirm: "Подтвердить", cancel: "Отмена" },
  zh: { hour: "时", minute: "分", confirm: "确认", cancel: "取消" },
  th: { hour: "ชม.", minute: "นาที", confirm: "ยืนยัน", cancel: "ยกเลิก" },
};

// Map our app languages to Flatpickr locales (fallback to default English).
const LOCALE_MAP = { ru: Russian, zh: Mandarin };

export const ContactSection = () => {
  const { t, lang } = useLang();
  const { selection } = useSelection();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [messageSerbian, setMessageSerbian] = useState(null);
  const [timeWheelOpen, setTimeWheelOpen] = useState(false);

  const dateFpRef = useRef(null);

  // NOTE: outside-click closing of the time wheel is INTENTIONALLY disabled.
  // Per product spec, the wheel must only close when the user explicitly
  // taps the in-modal "Potvrdi" (Confirm) button. Escape still closes it
  // (see the keyboard handler inside <TimeWheelPicker>).

  // Auto-populate message when a treatment is selected in the Pricing section,
  // and update the Serbian copy used in the owner notification email.
  useEffect(() => {
    if (!selection) return;
    setForm((prev) => ({ ...prev, message: selection.message }));
    setMessageSerbian(selection.messageSerbian);
  }, [selection]);

  const selectedTreatmentPayload = selection
    ? {
        name: selection.name,
        duration: selection.duration,
        price: selection.price,
        description: selection.description,
        name_serbian: selection.nameSerbian,
        description_serbian: selection.descriptionSerbian,
      }
    : null;

  // If user manually edits the message, drop the cached Serbian translation so
  // we don't ship a stale "Odabrano: …" line to the owner.
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && messageSerbian && value !== form.message) {
      setMessageSerbian(null);
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
        selected_treatment: selectedTreatmentPayload || undefined,
      });
      toast.success(t.contact.form.success);
      setForm(initial);
      setMessageSerbian(null);
      dateFpRef.current?.flatpickr?.clear?.();
    } catch (err) {
      console.error(err);
      toast.error(t.contact.form.error);
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

  // ISO yyyy-mm-dd today (browser/local time) — used as the earliest allowed
  // booking date so a user cannot pick a past day.
  const minDateIso = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

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
                    value={form.date}
                    options={{
                      dateFormat: "d.m.Y",
                      altInput: false,
                      minDate: minDateIso,
                      disableMobile: true,
                      monthSelectorType: "static",
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
                            className={pickerInputCls}
                          />
                          <CalendarIcon
                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-[#a17a35]"
                            strokeWidth={1.6}
                          />
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
                      onClick={() => setTimeWheelOpen(true)}
                      onFocus={() => setTimeWheelOpen(true)}
                      className={pickerInputCls}
                    />
                    <button
                      type="button"
                      onClick={() => setTimeWheelOpen((v) => !v)}
                      aria-label={t.contact.form.timeLabel}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-[#a17a35] hover:text-[#7a5a22] transition-colors"
                    >
                      <ClockIcon className="h-6 w-6" strokeWidth={1.6} />
                    </button>
                  </div>
                  <TimeWheelPicker
                    open={timeWheelOpen}
                    value={form.time}
                    onChange={(hhmm) =>
                      setForm((p) => ({ ...p, time: hhmm }))
                    }
                    onConfirm={(hhmm) => {
                      setForm((p) => ({ ...p, time: hhmm }));
                      setTimeWheelOpen(false);
                    }}
                    onCancel={() => setTimeWheelOpen(false)}
                    labels={WHEEL_LABELS[lang] || WHEEL_LABELS.en}
                  />
                </div>
              </div>
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
