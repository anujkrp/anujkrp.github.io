import React from "react";
import { Menu, X, Sun, Moon, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  setCrmOpen: (v: boolean) => void;
  scrollToSection: (id: string) => void;
};

export default function Header({ darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen, setCrmOpen, scrollToSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 border-b border-slate-200/10 glass-light dark:glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 cursor-pointer focus:outline-none" aria-label="Go to top">
          <div className="brand-badge p-2 rounded-xl text-white shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white"/></svg>
          </div>
          <div className="text-left">
            <span className="font-extrabold text-lg sm:text-xl font-display tracking-tight block text-white leading-none">AK DESIGN STUDIO</span>
            <span className="text-[9px] font-mono tracking-wider font-semibold uppercase text-[#FF8A65]">Premium Digital Solutions</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-slate-300" aria-label="Primary">
          <button onClick={() => scrollToSection("services")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">Services</button>
          <button onClick={() => scrollToSection("portfolio")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">Portfolio</button>
          <button onClick={() => scrollToSection("process")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">Process</button>
          <button onClick={() => scrollToSection("why-choose-me")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">Why Us</button>
          <button onClick={() => scrollToSection("faq")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">FAQ</button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl border border-transparent text-slate-200 hover:bg-slate-800 transition-all" title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <button onClick={() => setCrmOpen(true)} className="p-2.5 rounded-xl border border-transparent text-slate-300 hover:text-[#FF6B6B] hover:bg-slate-800 transition-all" title="Admin CRM Portal">
            <Lock className="h-4 w-4" />
          </button>

          <button onClick={() => scrollToSection("consultation")} className="btn-coral text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg">Book Call</button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl text-slate-200" aria-label="Toggle theme">{darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}</button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl text-slate-200 cursor-pointer" aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-slate-800 bg-transparent px-4 py-6 space-y-4 shadow-xl" role="dialog" aria-label="Mobile menu">
            <nav className="flex flex-col gap-4 text-xs font-bold tracking-wider uppercase text-slate-300" aria-label="Mobile">
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("services"); }} className="text-left hover:text-[#FF8A65] transition-colors">Services</button>
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("portfolio"); }} className="text-left hover:text-[#FF8A65] transition-colors">Portfolio</button>
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("process"); }} className="text-left hover:text-[#FF8A65] transition-colors">Our Process</button>
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("why-choose-me"); }} className="text-left hover:text-[#FF8A65] transition-colors">Why Choose Us</button>
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("faq"); }} className="text-left hover:text-[#FF8A65] transition-colors">FAQ</button>
            </nav>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <button onClick={() => { setMobileMenuOpen(false); setCrmOpen(true); }} className="flex items-center gap-2 text-xs text-slate-300 hover:text-[#FF6B6B] font-semibold"><Lock className="h-4 w-4" /> Admin CRM</button>
              <button onClick={() => { setMobileMenuOpen(false); scrollToSection("consultation"); }} className="flex-1 text-center btn-coral text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md">Get Consultation</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
