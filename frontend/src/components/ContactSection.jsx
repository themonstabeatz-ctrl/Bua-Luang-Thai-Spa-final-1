import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLang } from "@/i18n/LanguageContext";
import { useSelection } from "@/contexts/SelectionContext";
import { Phone, Send } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", date: "", time: "", message: "" };

export const ContactSection = () => {
  const { t, lang } = useLang();
  const { selection } = useSelection();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [messageSerbian, setMessageSerbian] = useState(null);

  // Auto-populate message when a treatment is selected in the Pricing section,
  // and update the Serbian copy used in the owner notification email.
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
      }
    : null;

  // If user manually edits the message, drop the cached Serbian translation so
  // we don't ship a stale "Odabrano: …" line to the owner.
  const onChange = (e) => {
    const { name, value } = e.target;
    // Enforce business-hours window for the time picker (10:00 – 22:00).
    if (name === "time" && value) {
      const [hh, mm] = value.split(":").map(Number);
      const minutes = hh * 60 + mm;
      if (minutes < 600 || minutes > 1320) {
        toast.error("Radno vreme: 10:00 — 22:00");
        return;
      }
    }
    if (name === "message" && messageSerbian && value !== form.message) {
      setMessageSerbian(null);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        ...form,
        language: lang,
        message_serbian: messageSerbian || undefined,
        selected_treatment: selectedTreatmentPayload || undefined,
      });
      toast.success(t.contact.form.success);
      setForm(initial);
      setMessageSerbian(null);
    } catch (err) {
      console.error(err);
      toast.error(t.contact.form.error);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-[rgba(161,122,53,0.35)] focus:border-[#a17a35] outline-none py-2.5 text-[#2b2620] placeholder:text-[#a09686] transition-colors";

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
                <div>
                  <label className="block text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                    {t.contact.form.dateLabel}
                  </label>
                  <input
                    data-testid="contact-input-date"
                    required
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={onChange}
                    className={`${inputCls} contact-datepicker`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.3em] uppercase text-[#a17a35] mb-2">
                    {t.contact.form.timeLabel}
                  </label>
                  <input
                    data-testid="contact-input-time"
                    required
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={onChange}
                    min="10:00"
                    max="22:00"
                    step="900"
                    className={`${inputCls} contact-timepicker`}
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
                  disabled={submitting}
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-white hover:shadow-[0_12px_36px_rgba(161,122,53,0.45)] transition-shadow duration-500 disabled:opacity-60 disabled:cursor-not-allowed flex-1"
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
