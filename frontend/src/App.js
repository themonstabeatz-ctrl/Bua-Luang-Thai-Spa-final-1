import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { MassagesSection } from "@/components/MassagesSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ASSETS } from "@/constants/assets";
import "@/App.css";

const Home = () => {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      {/* Content slabs that slide over the fixed hero */}
      <div
        data-testid="content-stack"
        className="relative z-[2] text-white"
        style={{
          backgroundColor: "#0a0705",
          backgroundImage: `linear-gradient(180deg, rgba(10,7,5,0.97) 0%, rgba(10,7,5,0.985) 100%), url(${ASSETS.patternBg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "640px auto",
        }}
      >
        <AboutSection />
        <div className="h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-[rgba(196,154,76,0.35)] to-transparent" />
        <MassagesSection />
        <div className="h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-[rgba(196,154,76,0.35)] to-transparent" />
        <PricingSection />
        <div className="h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-[rgba(196,154,76,0.35)] to-transparent" />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-[#0a0705] text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "#140d09",
              border: "1px solid rgba(196,154,76,0.35)",
              color: "#f4e4bf",
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
