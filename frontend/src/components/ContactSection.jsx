import React, { useState } from "react";
import axios from "axios";
import { useLang } from "@/i18n/LanguageContext";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", message: "" };

export const ContactSection = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, { ...form, language: lang });
      toast.success(t.contact.form.success);
      setForm(initial);
    } catch (err) {
      console.error(err);
      toast.error(t.contact.form.error);
    } finally {
      setSubmitting(false);
    }
  };

  const infoItems = [
    {
      Icon: Mail,
      label: t.contact.info.emailLabel,
      value: "bualuangthailandspa@gmail.com",
      href: "mailto:bualuangthailandspa@gmail.com",
      testid: "contact-email",
    },
    {
      Icon: Phone,
      label: t.contact.info.phoneLabel,
      value: "+381 62 625 500",
      href: "tel:+38162625500",
      testid: "contact-phone",
    },
    {
      Icon: Clock,
      label: t.contact.info.hoursLabel,
      value: t.contact.info.hoursValue,
      testid: "contact-hours",
    },
    {
      Icon: MapPin,
      label: t.contact.info.addressLabel,
      value: t.contact.info.addressValue,
      testid: "contact-address",
    },
  ];

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-28 sm:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.42em] uppercase text-[#c49a4c] mb-6 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#c49a4c]" />
            {t.contact.eyebrow}
            <span className="h-px w-10 bg-[#c49a4c]" />
          </div>
          <h2
            data-testid="contact-title"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] bg-gradient-to-br from-[#f4e4bf] via-[#e8c98a] to-[#a17a35] bg-clip-text text-transparent"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {t.contact.title}
          </h2>
          <p className="mt-5 text-white/65 max-w-xl mx-auto font-light">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT: form + info */}
          <div>
            <form
              data-testid="contact-form"
              onSubmit={onSubmit}
              className="rounded-2xl border border-[rgba(196,154,76,0.25)] bg-[rgba(15,10,7,0.7)] backdrop-blur-sm p-7 sm:p-9 space-y-5"
            >
              <div>
                <label className="block text-[11px] tracking-[0.3em] uppercase text-[#c49a4c] mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  data-testid="contact-input-name"
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full bg-transparent border-b border-[rgba(196,154,76,0.4)] focus:border-[#e8c98a] outline-none py-2.5 text-white placeholder:text-white/30 transition-colors"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] tracking-[0.3em] uppercase text-[#c49a4c] mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    data-testid="contact-input-email"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full bg-transparent border-b border-[rgba(196,154,76,0.4)] focus:border-[#e8c98a] outline-none py-2.5 text-white placeholder:text-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.3em] uppercase text-[#c49a4c] mb-2">
                    {t.contact.form.phone}
                  </label>
                  <input
                    data-testid="contact-input-phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className="w-full bg-transparent border-b border-[rgba(196,154,76,0.4)] focus:border-[#e8c98a] outline-none py-2.5 text-white placeholder:text-white/30 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.3em] uppercase text-[#c49a4c] mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  data-testid="contact-input-message"
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  className="w-full bg-transparent border-b border-[rgba(196,154,76,0.4)] focus:border-[#e8c98a] outline-none py-2.5 text-white placeholder:text-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                data-testid="contact-submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.22em] uppercase font-medium bg-gradient-to-r from-[#a17a35] via-[#d4ad5e] to-[#a17a35] text-[#0a0705] hover:shadow-[0_0_36px_rgba(212,173,94,0.55)] transition-shadow duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? t.contact.form.sending : t.contact.form.submit}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {infoItems.map(({ Icon, label, value, href, testid }) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[rgba(196,154,76,0.12)] border border-[rgba(196,154,76,0.35)] flex items-center justify-center text-[#e8c98a]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#c49a4c]">
                        {label}
                      </div>
                      <div className="mt-1 text-sm text-white/85 leading-snug break-words">
                        {value}
                      </div>
                    </div>
                  </div>
                );
                return href ? (
                  <a
                    key={testid}
                    data-testid={testid}
                    href={href}
                    className="block p-4 rounded-xl border border-[rgba(196,154,76,0.18)] bg-[rgba(20,13,9,0.5)] hover:border-[#c49a4c] transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={testid}
                    data-testid={testid}
                    className="p-4 rounded-xl border border-[rgba(196,154,76,0.18)] bg-[rgba(20,13,9,0.5)]"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: map */}
          <div
            data-testid="contact-map"
            className="rounded-2xl overflow-hidden border border-[rgba(196,154,76,0.25)] bg-[rgba(20,13,9,0.6)] min-h-[480px] lg:min-h-full relative"
          >
            <iframe
              title="Belgrade map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=20.36%2C44.78%2C20.55%2C44.84&layer=mapnik&marker=44.8125%2C20.4612"
              className="w-full h-full min-h-[480px]"
              style={{
                border: 0,
                filter: "invert(0.92) hue-rotate(180deg) saturate(0.65) brightness(0.85) contrast(1.05)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(10,7,5,0.18)] via-transparent to-[rgba(10,7,5,0.45)] mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[rgba(196,154,76,0.18)] rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
