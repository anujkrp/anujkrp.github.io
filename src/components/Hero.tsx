import React from "react";
import { motion } from "motion/react";
import { Award, ArrowRight, ArrowUpRight, Zap } from "lucide-react";

type HeroProps = {
  scrollToSection: (id: string) => void;
};

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:py-24 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10" aria-labelledby="hero-heading">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-transparent border border-[#FF6B6B]/10 text-[#FF6B6B] rounded-full" aria-hidden>
            <Award className="h-3.5 w-3.5 animate-pulse" /> Ranked #1 Creative Software Architect
          </div>

          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
            Transform Your Ideas Into <span className="hero-accent-text">Powerful Digital Solutions</span>
          </h1>

          <p className="text-base sm:text-lg text-[#B8C7D9] leading-relaxed font-sans max-w-2xl">
            I build high-performance websites, custom software, AI-powered automation, digital marketing systems, and scalable business solutions that help companies grow faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => scrollToSection("consultation")} className="btn-coral group text-white text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl shadow-xl flex items-center gap-2" aria-label="Get free consultation">
              Get Free Consultation <ArrowRight className="h-4 w-4" />
            </button>

            <button onClick={() => scrollToSection("portfolio")} className="bg-white/6 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl shadow-inner flex items-center gap-2" aria-label="View portfolio">
              View Portfolio <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

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

        <div className="lg:col-span-5 relative flex justify-center" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#071A52]/20 to-[#FF6B6B]/12 rounded-full filter blur-[80px] animate-pulse-slow pointer-events-none" />

          <motion.div className="relative rounded-3xl border border-slate-800 p-3 bg-black/30 shadow-2xl overflow-hidden max-w-[420px] w-full" initial={{ opacity: 0, y: 30, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.2 }}>
            <img src="/src/assets/images/hero_workspace_1783690969808.jpg" alt="Modern developer workspace rendering - AK Design Studio" className="w-full h-auto object-cover rounded-2xl aspect-[4/3] shadow-md border border-slate-800/50" referrerPolicy="no-referrer" loading="lazy" decoding="async" />

            <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-[#071A52]/70 to-[#FF6B6B]/30 p-4 rounded-xl flex items-center justify-between text-white shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-[#FF6B6B] p-2 rounded-lg"><Zap className="h-4 w-4 text-white animate-bounce" /></div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#FCEBEA] font-bold block">AI Agent Core</span>
                  <span className="text-xs font-bold">Workspace initialized</span>
                </div>
              </div>
              <div className="text-right"><span className="text-xs font-bold text-[#FF8A65] font-mono">100% ONLINE</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
