import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import AdminCRM from "./components/AdminCRM";
import AIChatbot from "./components/AIChatbot";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [crmOpen, setCrmOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen selection:bg-[#FF6B6B] selection:text-white transition-colors duration-300 text-slate-100 font-sans antialiased overflow-hidden relative">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setCrmOpen={setCrmOpen}
        scrollToSection={scrollToSection}
      />

      <main>
        <Hero scrollToSection={scrollToSection} />
        <Services scrollToSection={scrollToSection} />
        <Portfolio scrollToSection={scrollToSection} />
      </main>

      <Footer />

      <AdminCRM isOpen={crmOpen} onClose={() => setCrmOpen(false)} />
      <AIChatbot />
    </div>
  );
}
