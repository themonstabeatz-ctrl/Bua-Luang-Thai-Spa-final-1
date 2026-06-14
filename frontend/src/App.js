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
import "@/App.css";

const Home = () => {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      {/* Bright content slabs that slide up over the fixed hero */}
      <div
        data-testid="content-stack"
        className="relative z-[2]"
        style={{
          background:
            "linear-gradient(180deg, #fbf6ec 0%, #fdfaf3 35%, #ffffff 100%)",
          color: "#2b2620",
        }}
      >
        <AboutSection />
        <div className="h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-[rgba(161,122,53,0.35)] to-transparent" />
        <PricingSection />
        <div className="h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-[rgba(161,122,53,0.35)] to-transparent" />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-[#fdfaf3] text-[#2b2620]">
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
