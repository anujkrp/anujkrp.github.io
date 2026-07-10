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
      const profileText = `# AK DESIGN STUDIO COMPANY PROFILE\n\nFounded by: Anuj Kumar\nSpecialization: Web Development, Custom ERP/CRM, AI Integrations, Digital Growth\nEmail: d.anujkrp@gmail.com\n\nTransform your ideas into powerful digital products! Thank you for downloading our catalog.`;
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
        return <Globe className="h-6 w-6 text-blue-500" />;
      case "Cpu":
        return <Cpu className="h-6 w-6 text-teal-500" />;
      case "TrendingUp":
        return <TrendingUp className="h-6 w-6 text-orange-500" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-yellow-500" />;
      case "CloudLightning":
        return <CloudLightning className="h-6 w-6 text-sky-500" />;
      default:
        return <Globe className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-teal-500 selection:text-white transition-colors duration-300 bg-white dark:bg-[#020617] text-slate-800 dark:text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* BACKGROUND GRAPHICS (SaaS style elegant grid overlay & ambient glowing lights) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Sleek radial gradient spots */}
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#2563EB]/15 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[12%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#14B8A6]/15 blur-[120px]" />
        <div className="absolute top-[35%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-[#F97316]/10 blur-[130px] animate-pulse-slow" />
        <div className="absolute top-[55%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#2563EB]/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#14B8A6]/10 blur-[140px] animate-pulse-slow" />
        
        {/* Elegant grid alignment lines */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* HEADER SECTION (Sticky Navigation) */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 border-b border-slate-200/50 dark:border-slate-900/50 glass-light dark:glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <div className="bg-gradient-to-tr from-blue-600 to-teal-500 p-2 rounded-xl text-white shadow-md shadow-teal-500/10">
              <Sparkles className="h-5 w-5 animate-spin-slow" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-lg sm:text-xl font-display tracking-tight block text-slate-900 dark:text-white leading-none">
                AK DESIGN STUDIO
              </span>
              <span className="text-[9px] font-mono tracking-wider font-semibold uppercase text-teal-600 dark:text-teal-400">
                Premium Digital Solutions
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-slate-300">
            <button onClick={() => scrollToSection("services")} className="hover:text-teal-500 transition-colors cursor-pointer">Services</button>
            <button onClick={() => scrollToSection("portfolio")} className="hover:text-teal-500 transition-colors cursor-pointer">Portfolio</button>
            <button onClick={() => scrollToSection("process")} className="hover:text-teal-500 transition-colors cursor-pointer">Process</button>
            <button onClick={() => scrollToSection("why-choose-me")} className="hover:text-teal-500 transition-colors cursor-pointer">Why Us</button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-teal-500 transition-colors cursor-pointer">FAQ</button>
          </nav>

          {/* Utility Controls (Theme, CRM, Booking) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Toggle Theme */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer shadow-sm"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Secret Admin Portal Button */}
            <button
              onClick={() => setCrmOpen(true)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer shadow-sm"
              title="Admin CRM Portal"
            >
              <Lock className="h-4 w-4" />
            </button>

            {/* Book Consultation Button */}
            <button
              onClick={() => scrollToSection("consultation")}
              className="bg-gradient-to-tr from-blue-600 to-teal-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg shadow-teal-500/10 hover:shadow-xl cursor-pointer hover:scale-102 transition-all active:scale-98"
            >
              Book Call
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 cursor-pointer"
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
              className="md:hidden border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 px-4 py-6 space-y-4 shadow-xl"
            >
              <nav className="flex flex-col gap-4 text-xs font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300">
                <button onClick={() => scrollToSection("services")} className="text-left hover:text-teal-500 transition-colors">Services</button>
                <button onClick={() => scrollToSection("portfolio")} className="text-left hover:text-teal-500 transition-colors">Portfolio</button>
                <button onClick={() => scrollToSection("process")} className="text-left hover:text-teal-500 transition-colors">Our Process</button>
                <button onClick={() => scrollToSection("why-choose-me")} className="text-left hover:text-teal-500 transition-colors">Why Choose Us</button>
                <button onClick={() => scrollToSection("faq")} className="text-left hover:text-teal-500 transition-colors">FAQ</button>
              </nav>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between gap-4">
                <button
                  onClick={() => { setMobileMenuOpen(false); setCrmOpen(true); }}
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-teal-400 font-semibold"
                >
                  <Lock className="h-4 w-4" /> Admin CRM
                </button>

                <button
                  onClick={() => scrollToSection("consultation")}
                  className="flex-1 text-center bg-gradient-to-tr from-blue-600 to-teal-500 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md"
                >
                  Get Consultation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 md:py-24 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Copy (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Elegant upper sub-badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-tr from-blue-600/10 to-teal-500/10 dark:from-blue-600/20 dark:to-teal-500/20 border border-teal-500/20 text-teal-600 dark:text-teal-400 rounded-full text-[11px] font-bold uppercase tracking-widest font-mono">
              <Award className="h-3.5 w-3.5 animate-pulse" /> Ranked #1 Creative Software Architect
            </div>

            {/* Giant Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Transform Your Ideas Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-orange-500">
                Powerful Digital Solutions
              </span>
            </h1>

            {/* Dynamic supportive subheadline */}
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-sans max-w-2xl">
              I build high-performance websites, custom software, AI-powered automation, digital marketing systems, and scalable business solutions that help companies grow faster.
            </p>

            {/* Call To Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("consultation")}
                className="group bg-gradient-to-tr from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-750 text-white text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl shadow-xl shadow-teal-500/10 hover:shadow-2xl hover:scale-102 cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                Get Free Consultation
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("portfolio")}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-250 text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:scale-102 cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                View Portfolio
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Fast Stats highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-900/60 max-w-md">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">140+</span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">Projects Built</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">99%</span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">Client Trust</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">95+</span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">Lighthouse Speed</span>
              </div>
            </div>

          </div>

          {/* Hero Illustration (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glowing blur background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 rounded-full filter blur-[80px] animate-pulse-slow pointer-events-none" />
            
            {/* Asset card frame */}
            <motion.div
              className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 p-3 bg-white/70 dark:bg-slate-900/70 shadow-2xl overflow-hidden max-w-[420px] w-full"
              initial={{ opacity: 0, y: 30, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Image with ReferrerPolicy constraint strictly respected */}
              <img
                src="/src/assets/images/hero_workspace_1783690969808.jpg"
                alt="Modern developer workspace rendering - AK Design Studio"
                className="w-full h-auto object-cover rounded-2xl aspect-[4/3] shadow-md border border-slate-100 dark:border-slate-800/50"
                referrerPolicy="no-referrer"
              />

              {/* Float floating dashboard metrics overlay widget */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/90 backdrop-blur-md border border-slate-850 p-4 rounded-xl flex items-center justify-between text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-500 p-2 rounded-lg">
                    <Zap className="h-4 w-4 text-white animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">AI Agent Core</span>
                    <span className="text-xs font-bold">Workspace initialized</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-teal-400 font-mono">100% ONLINE</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* TRUST / VALUE PROP SECTION */}
      <section id="trust" className="py-12 border-y border-slate-150 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/20 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-center text-slate-400 mb-8">
            STUDIO CORE PRINCIPLES & TRUST METRICS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 text-center">
            {[
              { label: "100% Custom Solutions", desc: "No clones or themes" },
              { label: "Fast Delivery", desc: "Structured cycles" },
              { label: "SEO Optimized", desc: "Rank high instantly" },
              { label: "Mobile Friendly", desc: "Adaptive viewport" },
              { label: "AI Powered", desc: "Intelligent triggers" },
              { label: "Ongoing Support", desc: "Dedicated retainers" }
            ].map((prop, idx) => (
              <div key={idx} className="space-y-1 p-2">
                <span className="block text-sm font-extrabold tracking-tight text-slate-950 dark:text-white">
                  {prop.label}
                </span>
                <span className="block text-[10px] font-medium text-slate-400 uppercase">
                  {prop.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
            Professional Competencies
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Comprehensive Digital Services Built To Scale
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            I don't just build layouts; I engineer business pipelines. Discover our elite technological stacks and direct integration options below.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="group bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border border-slate-150 dark:border-white/10 rounded-3xl p-6 md:p-8 transition-all hover:border-teal-500/30 hover:scale-[1.02] flex flex-col justify-between shadow-md hover:shadow-xl relative hover:glow-teal"
            >
              {/* Highlight subtle corner bar */}
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-teal-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-5">
                {/* Icon Circle */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl w-fit border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform shadow-inner">
                  {getServiceIcon(srv.iconName)}
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {srv.description}
                  </p>
                </div>

                {/* Bullets lists */}
                <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-850 text-left">
                  {srv.bulletPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-350">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action consultation pointer */}
              <button
                onClick={() => scrollToSection("consultation")}
                className="mt-6 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-teal-600 dark:text-teal-400 group-hover:text-teal-500 cursor-pointer pt-4 w-fit focus:outline-none"
              >
                Inquire Service
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section id="statistics" className="py-16 bg-slate-900 text-white z-10 relative overflow-hidden">
        
        {/* Glow sphere background */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-teal-500/10 blur-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 text-center">
            
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-400 font-sans">140+</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Projects Completed</span>
            </div>

            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">98%</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Happy Clients</span>
            </div>

            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-400 font-sans">8+</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Years Experience</span>
            </div>

            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-400 font-sans">24+</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Technologies Mastered</span>
            </div>

            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">15+</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Countries Served</span>
            </div>

          </div>
        </div>
      </section>

      {/* TECHNOLOGIES STACK SECTION */}
      <section id="technologies" className="py-20 bg-slate-50 dark:bg-slate-950/40 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Technology Ecosystem
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Cutting-edge Stacks Engineered For Speed
            </h3>
          </div>

          {/* Scrolling Grid ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {TECH_ICONS.map((tech, idx) => (
              <span
                key={idx}
                className={`${tech.bg} border border-slate-200/40 dark:border-slate-800/60 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-sm`}
              >
                <div className="h-1.5 w-1.5 bg-teal-500 rounded-full" />
                {tech.name}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          <div className="text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Selected Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Pioneering Works That Drive Massive ROI
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Each portfolio project displays real strategic problem-solving. No templates. Hand-coded architectures built for speed and sales growth.
            </p>
          </div>

          {/* Filtering Categories */}
          <div className="flex flex-wrap gap-2">
            {["All", "Web Design", "SaaS", "E-commerce", "AI", "Software", "Branding"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-slate-900 dark:bg-teal-500 text-white border-transparent shadow-md scale-[1.02]"
                    : "bg-white/70 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50/80 dark:hover:bg-slate-900/80 backdrop-blur-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Filtered Portfolio Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                key={proj.id}
                className="bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border border-slate-150 dark:border-white/10 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:border-teal-500/30 transition-all flex flex-col justify-between"
              >
                {/* Image frame */}
                <div className="relative group overflow-hidden">
                  <img
                    src={proj.previewUrl}
                    alt={proj.title}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md border border-slate-800">
                    {proj.category}
                  </span>
                </div>

                {/* Project Details */}
                <div className="p-6 md:p-8 space-y-6 text-left flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                      {proj.title}
                    </h3>

                    {/* Technologies tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-850">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Problem/Solution block */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-850 text-xs">
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        <strong className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">THE PROBLEM:</strong>
                        {proj.problem}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        <strong className="font-semibold text-slate-850 dark:text-teal-400 block mb-0.5">THE SOLUTION:</strong>
                        {proj.solution}
                      </p>
                    </div>

                    {/* Business Results block */}
                    <div className="bg-teal-500/5 dark:bg-teal-500/10 p-4 rounded-xl border border-teal-500/10 text-xs">
                      <span className="font-extrabold uppercase text-[10px] tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                        ✓ Business Results
                      </span>
                      <p className="font-bold text-slate-900 dark:text-teal-200">
                        {proj.businessResults}
                      </p>
                    </div>
                  </div>

                  {/* CTA click */}
                  <button
                    onClick={() => scrollToSection("consultation")}
                    className="group border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-250 transition-colors flex items-center justify-center gap-1.5 mt-6 w-full cursor-pointer"
                  >
                    Discuss Similar Project
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* PROCESS TIMELINE SECTION */}
      <section id="process" className="py-20 md:py-24 bg-slate-50 dark:bg-slate-950/20 z-10 relative border-t border-slate-150 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Operational Roadmap
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              7-Step Elite Delivery Protocol
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              From the initial strategic blueprint validation up to daily backup audits, our roadmap guarantees flawless speed and delivery.
            </p>
          </div>

          {/* Process Timeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border border-slate-150 dark:border-white/10 rounded-2xl p-5 space-y-4 text-left relative"
              >
                {/* Big Step Number indicator */}
                <div className="bg-gradient-to-tr from-blue-600 to-teal-500 text-white font-extrabold text-xs h-7 w-7 rounded-lg flex items-center justify-center shadow-md">
                  {step.stepNumber}
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-slate-950 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE ME SECTION */}
      <section id="why-choose-me" className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Bento copy info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Competitive Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Why Elite Startups & Businesses Partner With Me
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              I bridges the massive gap between gorgeous visual design and robust software engineering. Your business is backed by direct expertise, high speed, and ongoing support metrics.
            </p>

            <button
              onClick={handleDownloadProfile}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Compiling profile...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 text-teal-400" /> Download Studio Profile (PDF)
                </>
              )}
            </button>

            {/* Simulated profile success tooltip */}
            <AnimatePresence>
              {downloadSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-green-500 font-semibold"
                >
                  ✓ Studio profile downloaded successfully! Feel free to review.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Why grid cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Modern UI/UX Guidelines", desc: "Designed around converted buyer psychology, using Outfit/Inter typography hierarchy." },
              { title: "Pristine, Clean Code", desc: "TypeScript and Node systems built natively. Easy to scale, zero legacy bloating." },
              { title: "Lighthouse Speed 95+", desc: "Static renderings, pre-fetched paths, and compressed files designed to load in under 1 second." },
              { title: "Ongoing Security Shield", desc: "Military-grade SSL setups, automated daily DB backups, and custom VPS locks." },
              { title: "Direct AI Specialist", desc: "Autonomous lead generation, workflow automation tools, and customized chatbot representing." },
              { title: "Flexible Support retainers", desc: "Low-cost support care packages to modify layout elements post-launch." }
            ].map((adv, idx) => (
              <div
                key={idx}
                className="bg-slate-50/60 dark:bg-slate-950/40 backdrop-blur-md border border-slate-150 dark:border-white/10 p-5 rounded-2xl text-left space-y-1.5"
              >
                <div className="flex items-center gap-2 text-teal-500">
                  <Check className="h-4 w-4 stroke-[3]" />
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                    {adv.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 md:py-24 bg-slate-900 text-white z-10 relative overflow-hidden">
        
        {/* Glow ambient background spot */}
        <div className="absolute top-0 right-10 h-72 w-72 bg-blue-600/10 rounded-full blur-[90px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
              Client Success Stories
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
              What Inquisitive Founders & Directors Say
            </h2>
          </div>

          {/* Testimonial Active Slider Box */}
          <div className="relative bg-slate-950/40 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-3xl text-left space-y-6 shadow-xl">
            
            {/* Rating Stars */}
            <div className="flex gap-1">
              {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                <span key={i} className="text-amber-400 text-sm">★</span>
              ))}
            </div>

            {/* Story copy */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic font-sans font-medium">
              "{TESTIMONIALS[activeTestimonialIdx].successStory}"
            </p>

            {/* Profile info block */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-900">
              <div className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[activeTestimonialIdx].avatarUrl}
                  alt={TESTIMONIALS[activeTestimonialIdx].name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-teal-500"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {TESTIMONIALS[activeTestimonialIdx].name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {TESTIMONIALS[activeTestimonialIdx].role}, {TESTIMONIALS[activeTestimonialIdx].company}
                  </p>
                </div>
              </div>

              {/* Logo text mockup */}
              <span className="text-xs font-extrabold tracking-widest font-mono text-slate-500">
                {TESTIMONIALS[activeTestimonialIdx].logoText}
              </span>
            </div>

          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={prevTestimonial}
              className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-full cursor-pointer transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-semibold text-slate-400 font-mono">
              0{activeTestimonialIdx + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={nextTestimonial}
              className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-full cursor-pointer transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* LEAD GENERATION & BOOKING CALENDAR DOUBLE BLOCK */}
      <section id="consultation" className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column Left (LeadForm Brief submit - 7 Cols) */}
          <div className="lg:col-span-7">
            <LeadForm />
          </div>

          {/* Column Right (Live Calendar Scheduler - 5 Cols) */}
          <div className="lg:col-span-5">
            <BookingCalendar />
          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 md:py-24 bg-slate-50 dark:bg-slate-950/20 z-10 relative border-t border-slate-150 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Support Center
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              Common Client Questions
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-3 text-left">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border border-slate-150 dark:border-white/10 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4.5 text-left font-bold text-sm sm:text-base text-slate-950 dark:text-white flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-teal-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans border-t border-slate-50 dark:border-slate-850/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT INFORMATION & GOOGLE MAP MOCK */}
      <section id="contact" className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative border-t border-slate-150 dark:border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left info box (5 Cols) */}
          <div className="lg:col-span-5 bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border border-slate-150 dark:border-white/10 p-6 md:p-8 rounded-3xl text-left flex flex-col justify-between shadow-md">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 block">
                  Studio Headquarters
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white font-sans">
                  Direct Points of Communication
                </h3>
              </div>

              {/* Communication contacts */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 mt-1">
                    <Mail className="h-4 w-4 text-teal-500" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Write An Email</span>
                    <a href="mailto:d.anujkrp@gmail.com" className="text-sm font-semibold hover:text-teal-400 transition-colors">
                      d.anujkrp@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 mt-1">
                    <Phone className="h-4 w-4 text-teal-500" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Direct Phone Line</span>
                    <a href="tel:+919999988888" className="text-sm font-semibold hover:text-teal-400 transition-colors">
                      +91 99999 88888
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 mt-1">
                    <MapPin className="h-4 w-4 text-teal-500" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Main Headquarters Location</span>
                    <span className="text-sm font-semibold">
                      New Delhi, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick warning text */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-850 mt-6 text-xs text-slate-400 font-sans leading-normal">
              Need immediate project scoping? Simply launch our interactive AI Smart Assistant in the bottom right corner or click the WhatsApp trigger floating in the corner.
            </div>
          </div>

          {/* Right map box (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative min-h-[300px] flex items-center justify-center p-6 shadow-xl">
            {/* Interactive Vector mockup of map for ultra premium styling */}
            <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-slate-950 pointer-events-none" />
            
            {/* Ambient map circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-teal-500/10 blur-[60px]" />

            <div className="relative text-center space-y-4 max-w-md">
              <div className="mx-auto h-12 w-12 bg-teal-500/10 rounded-full border border-teal-500/20 flex items-center justify-center animate-bounce">
                <MapPin className="h-6 w-6 text-teal-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-white text-base">AK Design Studio Interactive Grid</h4>
                <p className="text-xs text-slate-400">Serving enterprise clients, dynamic startups, and growth-minded businesses globally from New Delhi, India.</p>
              </div>
              {/* Fake coordinate badge */}
              <div className="inline-block bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold text-teal-400">
                LAT/LONG: 28.6139° N, 77.2090° E
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-left">
          
          {/* Brand Info (2 columns wide) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-teal-500 p-2 rounded-xl text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white uppercase">
                AK DESIGN STUDIO
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-sans">
              Elite design and robust software development studio. Delivering custom ERP software layouts, premium headless websites, targeted SEO campaigns, and automated AI agents to accelerate conversions and double business growth.
            </p>
            <div className="text-xs font-mono text-slate-600 font-bold uppercase flex items-center gap-2">
              <span>Status: Active</span>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-200">Services</h5>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => scrollToSection("services")} className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none">Website Development</button></li>
              <li><button onClick={() => scrollToSection("services")} className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none">Software Architecting</button></li>
              <li><button onClick={() => scrollToSection("services")} className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none">Digital Marketing & Ads</button></li>
              <li><button onClick={() => scrollToSection("services")} className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none">AI Workflow Automation</button></li>
            </ul>
          </div>

          {/* Column 2: Studio Navigation */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-200">Studio Navigation</h5>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => scrollToSection("portfolio")} className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none">Featured Portfolio</button></li>
              <li><button onClick={() => scrollToSection("process")} className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none">Operational Process</button></li>
              <li><button onClick={() => scrollToSection("faq")} className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none">Inquiries FAQ</button></li>
              <li><button onClick={() => scrollToSection("consultation")} className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none">Request Consultation</button></li>
            </ul>
          </div>

          {/* Column 3: Secure Management */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-200">Management</h5>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setCrmOpen(true)}
                  className="flex items-center gap-1.5 hover:text-teal-400 transition-colors cursor-pointer focus:outline-none"
                >
                  <Lock className="h-3.5 w-3.5" /> Lead CRM Portal
                </button>
              </li>
              <li><span className="text-slate-600">Privacy Policy</span></li>
              <li><span className="text-slate-600">Terms of Service</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 font-medium">
            © 2026 AK Design Studio. Custom designed & hand-coded. All Rights Reserved.
          </p>
          <p className="text-slate-600">
            Engineered by <strong className="text-slate-400">Anuj Kumar (AK)</strong> • Powered by Antigravity
          </p>
        </div>
      </footer>

      {/* WHATSAPP FLOATING BUTTON (Bottom Left Corner) */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative group">
          <motion.button
            id="whatsapp-floating-btn"
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setShowWhatsAppTooltip(true)}
            onMouseLeave={() => setShowWhatsAppTooltip(false)}
            className="bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 border border-green-400/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Standard WhatsApp logo mockup (simple vector SVG in a custom circle target) */}
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.002 5.21 5.212-.001 11.54.001c3.067 0 5.95 1.19 8.117 3.359 2.168 2.169 3.358 5.053 3.355 8.12-.005 6.328-5.215 11.54-11.543 11.54-1.999-.001-3.962-.524-5.69-1.522L0 24zm6.59-4.846c1.62.963 3.223 1.472 4.935 1.473 5.176.004 9.387-4.202 9.39-9.382.003-2.509-.972-4.866-2.747-6.643-1.774-1.777-4.133-2.754-6.64-2.754-5.18 0-9.391 4.204-9.394 9.385-.001 1.774.475 3.504 1.381 5.031L2.176 21.84l5.47-1.433z" />
            </svg>
          </motion.button>

          {/* Micro-tooltip */}
          <AnimatePresence>
            {showWhatsAppTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-slate-800"
              >
                Chat on WhatsApp
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-6 z-40 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 p-3 rounded-full border border-slate-250 dark:border-slate-800 shadow-xl cursor-pointer"
            title="Scroll to Top"
          >
            <ChevronDown className="h-5 w-5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ADMIN CRM MODAL GATEWAY */}
      <AdminCRM isOpen={crmOpen} onClose={() => setCrmOpen(false)} />

      {/* AI CHATBOT REPRESENTATIVE */}
      <AIChatbot />

    </div>
  );
}
