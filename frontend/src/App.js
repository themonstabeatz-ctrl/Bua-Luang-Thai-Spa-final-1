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

// Each parallax stack uses a fixed background so the contained content
// visually slides over the still spa / Buddha imagery.
const fixedBg = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const Home = () => {
  return (
    <div className="relative">
      <Navigation />

      {/* Parallax stack 1 — Hero + About glide over the candle-lit spa image */}
      <div className="parallax-stack" style={fixedBg(ASSETS.heroBg)}>
        <Hero />
        <AboutSection />
      </div>

      {/* Buddha showcase — a tall fixed-background panel between About & Pricing */}
      <div
        data-testid="buddha-showcase"
        className="parallax-stack relative w-full"
        style={{ ...fixedBg(ASSETS.buddhaBg), minHeight: "70vh" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,7,5,0.12)_0%,rgba(10,7,5,0.55)_100%)]" />
      </div>

      {/* Parallax stack 2 — Pricing rides over the same Buddha image */}
      <div className="parallax-stack" style={fixedBg(ASSETS.buddhaBg)}>
        <PricingSection />
      </div>

      {/* Solid bright section for Contact + Footer */}
      <div className="relative bg-gradient-to-b from-[#fbf6ec] via-[#fdfaf3] to-[#ffffff] text-[#2b2620]">
        <ContactSection />
        <Footer />
      </div>
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
