import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ASSETS } from "@/constants/assets";
import "@/App.css";

const Home = () => {
  return (
    <div className="relative">
      <Navigation />

      {/* Hero — fixed candle-lit spa scene, no filter */}
      <Hero />

      {/* About — full-width solid cream. Slides up over fixed hero (parallax). */}
      <AboutSection />

      {/* Buddha reveal — fixed Buddha image visible immediately below About,
         while user scrolls past it, before Pricing slides up over it. */}
      <section
        data-testid="buddha-showcase"
        aria-hidden
        className="relative w-full"
        style={{
          backgroundImage: `url(${ASSETS.buddhaBg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "85vh",
        }}
      />

      {/* Pricing — full-width solid cream. Slides up over the Buddha image. */}
      <PricingSection />

      {/* Contact + Footer — solid cream */}
      <ContactSection />
      <Footer />
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
