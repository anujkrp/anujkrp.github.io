import React, { useState, useEffect } from "react";
import {
  Globe,
  Cpu,
  TrendingUp,
  Sparkles,
  CloudLightning,
  Check,
  MapPin,
  Mail,
  Phone,
  Clock,
  ArrowUpRight,
  Menu,
  X,
  Lock,
  Sun,
  Moon,
  ExternalLink,
  Award,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Download,
  Calendar,
  ChevronDown,
  Zap,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { SERVICES, PROJECTS, PROCESS_STEPS, TESTIMONIALS, FAQS } from "./data";
import LeadForm from "./components/LeadForm";
import BookingCalendar from "./components/BookingCalendar";
import AdminCRM from "./components/AdminCRM";
import AIChatbot from "./components/AIChatbot";

const TECH_ICONS = [
  { name: "HTML5", bg: "bg-orange-500/10 text-orange-500" },
  { name: "CSS3", bg: "bg-blue-500/10 text-blue-500" },
  { name: "JavaScript", bg: "bg-yellow-500/10 text-yellow-500" },
  { name: "TypeScript", bg: "bg-blue-600/10 text-blue-400" },
  { name: "React", bg: "bg-cyan-500/10 text-cyan-400" },
  { name: "Next.js", bg: "bg-slate-500/10 text-slate-350" },
  { name: "Node.js", bg: "bg-green-500/10 text-green-500" },
  { name: "PHP", bg: "bg-indigo-500/10 text-indigo-400" },
  { name: "Laravel", bg: "bg-red-500/10 text-red-500" },
  { name: "WordPress", bg: "bg-blue-400/10 text-blue-300" },
  { name: "Python", bg: "bg-yellow-400/10 text-yellow-300" },
  { name: "MySQL", bg: "bg-blue-600/10 text-blue-500" },
  { name: "MongoDB", bg: "bg-green-600/10 text-green-400" },
  { name: "Docker", bg: "bg-cyan-600/10 text-cyan-500" },
  { name: "Git", bg: "bg-orange-600/10 text-orange-500" },
  { name: "AWS", bg: "bg-amber-500/10 text-amber-500" },
  { name: "Google Cloud", bg: "bg-blue-400/10 text-blue-400" },
  { name: "OpenAI", bg: "bg-teal-500/10 text-teal-400" }
];

export default function App() {
  // Theme state - defaults to Dark for that sleek premium SaaS feel
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [crmOpen, setCrmOpen] = useState<boolean>(false);
  
  // Portfolio category filtering
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Testimonial index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);
  
  // Accordion active questions tracker
  const [openFaqId, setOpenFaqId] = useState<string | null>("q1");

  // WhatsApp Floating state
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState<boolean>(false);

  // Scroll visibility for back-to-top button
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Simulated PDF download success message
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Sync theme class to html node
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    // Open standard whatsapp link
    window.open("https://wa.me/919999988888?text=Hi%20Anuj,%20I%20visited%20your%2520portfolio%20and%20want%20to%20discuss%20a%20project!", "_blank");
  };

  const handleDownloadProfile = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      
      // Actually download a mock beautiful markdown profile as a text/pdf simulator!
      const profileText = `# AK DESIGN STUDIO COMPANY PROFILE\n\nFounded by: Anuj Kumar\nSpecialization: Web Development, Custom ERP/CRM, AI Integrations, Digital Growth\nEmail: d.anujkrp@gmail.c[...]`;
      const blob = new Blob([profileText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "AK_Design_Studio_Profile.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1500);
  };

  // Filter project cards
  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper mapping to render custom icons dynamically from lucide-react
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="h-6 w-6 text-[#FF8A65]" />;
      case "Cpu":
        return <Cpu className="h-6 w-6 text-[#FF6B6B]" />;
      case "TrendingUp":
        return <TrendingUp className="h-6 w-6 text-[#FF8A65]" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-[#FFD1CC]" />;
      case "CloudLightning":
        return <CloudLightning className="h-6 w-6 text-[#9FB8FF]" />;
      default:
        return <Globe className="h-6 w-6 text-[#FF8A65]" />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#FF6B6B] selection:text-white transition-colors duration-300 text-slate-100 font-sans antialiased overflow-hidden relative">
      
      {/* BACKGROUND GRAPHICS (tinted toward coral/navy) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0" aria-hidden>
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#071A52]/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[12%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#FF6B6B]/12 blur-[120px]" />
        <div className="absolute top-[35%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-[#FF8A65]/10 blur-[130px] animate-pulse-slow" />
        <div className="absolute top-[55%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#071A52]/12 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF6B6B]/10 blur-[140px] animate-pulse-slow" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* HEADER SECTION (Sticky Navigation) */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 border-b border-slate-200/10 glass-light dark:glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
            aria-label="Go to top"
          >
            <div className="brand-badge p-2 rounded-xl text-white shadow-md">
              <Sparkles className="h-5 w-5 animate-spin-slow" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-lg sm:text-xl font-display tracking-tight block text-white leading-none">
                AK DESIGN STUDIO
              </span>
              <span className="text-[9px] font-mono tracking-wider font-semibold uppercase text-[#FF8A65]">
                Premium Digital Solutions
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-slate-300" aria-label="Primary">
            <button onClick={() => scrollToSection("services")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">Services</button>
            <button onClick={() => scrollToSection("portfolio")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">Portfolio</button>
            <button onClick={() => scrollToSection("process")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">Process</button>
            <button onClick={() => scrollToSection("why-choose-me")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">Why Us</button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-[#FF8A65] transition-colors cursor-pointer">FAQ</button>
          </nav>

          {/* Utility Controls (Theme, CRM, Booking) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Toggle Theme */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-transparent text-slate-200 hover:bg-slate-800 transition-all"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-pressed={darkMode}
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Secret Admin Portal Button */}
            <button
              onClick={() => setCrmOpen(true)}
              className="p-2.5 rounded-xl border border-transparent text-slate-300 hover:text-[#FF6B6B] hover:bg-slate-800 transition-all"
              title="Admin CRM Portal"
              aria-label="Open admin CRM"
            >
              <Lock className="h-4 w-4" />
            </button>

            {/* Book Consultation Button */}
            <button
              onClick={() => scrollToSection("consultation")}
              className="btn-coral text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg"
              aria-label="Book a consultation"
            >
              Book Call
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-800 bg-transparent px-4 py-6 space-y-4 shadow-xl"
              role="dialog"
              aria-label="Mobile menu"
            >
              <nav className="flex flex-col gap-4 text-xs font-bold tracking-wider uppercase text-slate-300" aria-label="Mobile">
                <button onClick={() => scrollToSection("services")} className="text-left hover:text-[#FF8A65] transition-colors">Services</button>
                <button onClick={() => scrollToSection("portfolio")} className="text-left hover:text-[#FF8A65] transition-colors">Portfolio</button>
                <button onClick={() => scrollToSection("process")} className="text-left hover:text-[#FF8A65] transition-colors">Our Process</button>
                <button onClick={() => scrollToSection("why-choose-me")} className="text-left hover:text-[#FF8A65] transition-colors">Why Choose Us</button>
                <button onClick={() => scrollToSection("faq")} className="text-left hover:text-[#FF8A65] transition-colors">FAQ</button>
              </nav>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => { setMobileMenuOpen(false); setCrmOpen(true); }}
                  className="flex items-center gap-2 text-xs text-slate-300 hover:text-[#FF6B6B] font-semibold"
                >
                  <Lock className="h-4 w-4" /> Admin CRM
                </button>

                <button
                  onClick={() => scrollToSection("consultation")}
                  className="flex-1 text-center btn-coral text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md"
                >
                  Get Consultation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <main>
      <section id="hero" className="relative pt-12 pb-20 md:py-24 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10" aria-labelledby="hero-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Copy (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Elegant upper sub-badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-transparent border border-[#FF6B6B]/10 text-[#FF6B6B] rounded-full" aria-hidden>
              <Award className="h-3.5 w-3.5 animate-pulse" /> Ranked #1 Creative Software Architect
            </div>

            {/* Giant Display Headline */}
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Transform Your Ideas Into{" "}
              <span className="hero-accent-text" aria-hidden>
                Powerful Digital Solutions
              </span>
            </h1>

            {/* Dynamic supportive subheadline */}
            <p className="text-base sm:text-lg text-[#B8C7D9] leading-relaxed font-sans max-w-2xl">
              I build high-performance websites, custom software, AI-powered automation, digital marketing systems, and scalable business solutions that help companies grow faster.
            </p>

            {/* Call To Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("consultation")}
                className="btn-coral group text-white text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl shadow-xl flex items-center gap-2"
                aria-label="Get free consultation"
              >
                Get Free Consultation
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollToSection("portfolio")}
                className="bg-white/6 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl shadow-inner flex items-center gap-2"
                aria-label="View portfolio"
              >
                View Portfolio
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Fast Stats highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/40 max-w-md" role="list" aria-label="Key stats">
              <div role="listitem">
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-white">140+</span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] mt-1">Projects Built</span>
              </div>
              <div role="listitem">
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-white">99%</span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] mt-1">Client Trust</span>
              </div>
              <div role="listitem">
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-white">95+</span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] mt-1">Lighthouse Speed</span>
              </div>
            </div>

          </div>

          {/* Hero Illustration (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center" aria-hidden>
            
            {/* Glowing blur background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#071A52]/20 to-[#FF6B6B]/12 rounded-full filter blur-[80px] animate-pulse-slow pointer-events-none" />
            
            {/* Asset card frame */}
            <motion.div
              className="relative rounded-3xl border border-slate-800 p-3 bg-black/30 shadow-2xl overflow-hidden max-w-[420px] w-full"
              initial={{ opacity: 0, y: 30, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Image with ReferrerPolicy constraint strictly respected */}
              <img
                src="/src/assets/images/hero_workspace_1783690969808.jpg"
                alt="Modern developer workspace rendering - AK Design Studio"
                className="w-full h-auto object-cover rounded-2xl aspect-[4/3] shadow-md border border-slate-800/50"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />

              {/* Float floating dashboard metrics overlay widget */}
              <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-[#071A52]/70 to-[#FF6B6B]/30 p-4 rounded-xl flex items-center justify-between text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FF6B6B] p-2 rounded-lg">
                    <Zap className="h-4 w-4 text-white animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#FCEBEA] font-bold block">AI Agent Core</span>
                    <span className="text-xs font-bold">Workspace initialized</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#FF8A65] font-mono">100% ONLINE</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative" aria-labelledby="services-heading">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A65]">
            Professional Competencies
          </span>
          <h2 id="services-heading" className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
            Comprehensive Digital Services Built To Scale
          </h2>
          <p className="text-sm text-[#B8C7D9] leading-relaxed">
            I don't just build layouts; I engineer business pipelines. Discover our elite technological stacks and direct integration options below.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <article
              key={srv.id}
              className="group bg-black/20 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 transition-all hover:glow-coral"
              aria-labelledby={`service-${srv.id}`}
            >
              <div className="space-y-5">
                {/* Icon Circle */}
                <div className="p-3 bg-black/30 rounded-2xl w-fit border border-slate-800 group-hover:scale-105 transition-transform shadow-inner">
                  {getServiceIcon(srv.iconName)}
                </div>

                <div className="space-y-2 text-left">
                  <h3 id={`service-${srv.id}`} className="font-extrabold text-lg text-white">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
                    {srv.description}
                  </p>
                </div>

                {/* Bullets lists */}
                <ul className="space-y-2 pt-2 border-t border-slate-800 text-left">
                  {srv.bulletPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B6B] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action consultation pointer */}
              <button
                onClick={() => scrollToSection("consultation")}
                className="mt-6 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#FF6B6B] group-hover:text-[#FF8A65] cursor-pointer pt-4 w-fit"
                aria-label={`Inquire about ${srv.title}`}
              >
                Inquire Service
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* PORTFOLIO and rest of site will be polished in following commits; for now images have lazy loading and improved aria attributes */}
      </main>

      {/* ADMIN CRM MODAL GATEWAY */}
      <AdminCRM isOpen={crmOpen} onClose={() => setCrmOpen(false)} />

      {/* AI CHATBOT REPRESENTATIVE */}
      <AIChatbot />

    </div>
  );
}
