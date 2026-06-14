import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ChatFloater } from "@/components/ChatFloater";
import { ASSETS } from "@/constants/assets";
import "@/App.css";

const BuddhaShowcase = () => {
  const sectionRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section is far from center, 1 when its center is the viewport center
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = vh / 2 + rect.height / 2;
      const t = Math.max(0, 1 - distance / maxDistance);
      // ease-in-out curve so fade feels smooth
      const eased = t * t * (3 - 2 * t);
      setOpacity(eased);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="buddha-showcase"
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${ASSETS.buddhaBg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "95vh",
      }}
    >
      {/* Floating, transparent logo with scroll fade */}
      <img
        src={ASSETS.logo}
        alt="Bua Luang Thai Spa Beograd - Autentična Tajlandska masaža logo"
        data-testid="buddha-logo"
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[58vh] w-auto max-w-[90vw]"
        style={{
          mixBlendMode: "screen",
          opacity,
          transition: "opacity 120ms linear",
          filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.55))",
        }}
      />
    </section>
  );
};

const Home = () => {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <AboutSection />
      <BuddhaShowcase />
      <PricingSection />
      <ContactSection />
      <Footer />
      <ChatFloater />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-[#0a0705] text-[#2b2620]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          theme="light"
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              border: "1px solid rgba(161,122,53,0.35)",
              color: "#3a312a",
              boxShadow: "0 14px 40px rgba(60, 45, 20, 0.12)",
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
