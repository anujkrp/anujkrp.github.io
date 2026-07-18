import React from "react";
import { ChevronRight } from "lucide-react";
import { SERVICES } from "../data";

type ServicesProps = {
  scrollToSection: (id: string) => void;
};

export default function Services({ scrollToSection }: ServicesProps) {
  return (
    <section id="services" className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative" aria-labelledby="services-heading">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A65]">Professional Competencies</span>
        <h2 id="services-heading" className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">Comprehensive Digital Services Built To Scale</h2>
        <p className="text-sm text-[#B8C7D9] leading-relaxed">I don't just build layouts; I engineer business pipelines. Discover our elite technological stacks and direct integration options below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((srv) => (
          <article key={srv.id} className="group bg-black/20 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 transition-all hover:glow-coral" aria-labelledby={`service-${srv.id}`}>
            <div className="space-y-5">
              <div className="p-3 bg-black/30 rounded-2xl w-fit border border-slate-800 group-hover:scale-105 transition-transform shadow-inner">{/* icon placeholder */}</div>

              <div className="space-y-2 text-left">
                <h3 id={`service-${srv.id}`} className="font-extrabold text-lg text-white">{srv.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">{srv.description}</p>
              </div>

              <ul className="space-y-2 pt-2 border-t border-slate-800 text-left">
                {srv.bulletPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2 text-xs text-[#94A3B8]"><div className="h-1.5 w-1.5 rounded-full bg-[#FF6B6B] shrink-0" /> <span>{pt}</span></li>
                ))}
              </ul>
            </div>

            <button onClick={() => scrollToSection("consultation")} className="mt-6 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#FF6B6B] group-hover:text-[#FF8A65] cursor-pointer pt-4 w-fit" aria-label={`Inquire about ${srv.title}`}>
              Inquire Service <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
