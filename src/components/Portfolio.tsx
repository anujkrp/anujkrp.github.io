import React from "react";
import { PROJECTS } from "../data";

type PortfolioProps = {
  scrollToSection: (id: string) => void;
};

function buildSrcSet(url: string) {
  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    const w = params.get("w");
    const sizes = [400, 800, 1200];

    const srcset = sizes
      .map((s) => {
        const copy = new URL(url);
        copy.searchParams.set("w", String(s));
        return `${copy.toString()} ${s}w`;
      })
      .join(", ");

    const webpSrcset = sizes
      .map((s) => {
        const copy = new URL(url);
        copy.searchParams.set("w", String(s));
        copy.searchParams.set("fm", "webp");
        return `${copy.toString()} ${s}w`;
      })
      .join(", ");

    const small = new URL(url);
    small.searchParams.set("w", "400");

    const smallWebp = new URL(small.toString());
    smallWebp.searchParams.set("fm", "webp");

    return { small: small.toString(), srcset, webpSrcset, smallWebp: smallWebp.toString() };
  } catch (e) {
    return { small: url, srcset: `${url} 800w`, webpSrcset: `${url} 800w`, smallWebp: url };
  }
}

export default function Portfolio({ scrollToSection }: PortfolioProps) {
  return (
    <section id="portfolio" className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative" aria-labelledby="portfolio-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A65]">Selected Showcase</span>
          <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">Pioneering Works That Drive Massive ROI</h2>
          <p className="text-sm text-[#B8C7D9] max-w-xl">Each portfolio project displays real strategic problem-solving. No templates. Hand-coded architectures built for speed and sales growth.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(PROJECTS.map((p) => p.category))).map((cat) => (
            <button key={cat} onClick={() => { /* category filtering can be added later */ }} className="px-4.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer bg-white/6 text-white">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS.map((proj) => {
          const { small, srcset, webpSrcset, smallWebp } = buildSrcSet(proj.previewUrl);
          return (
            <article key={proj.id} className="bg-black/20 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl">
              <div className="relative group overflow-hidden">
                <picture>
                  <source type="image/webp" srcSet={webpSrcset} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <img
                    src={small}
                    srcSet={srcset}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={proj.title}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </picture>
                <span className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">{proj.category}</span>
              </div>

              <div className="p-6 md:p-8 space-y-6 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl font-extrabold text-white">{proj.title}</h3>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="bg-black/10 text-[#94A3B8] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-800">{t}</span>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-[#B8C7D9]">
                    <p><strong className="block font-semibold text-white">THE PROBLEM:</strong>{proj.problem}</p>
                    <p><strong className="block font-semibold text-white">THE SOLUTION:</strong>{proj.solution}</p>
                  </div>

                  <div className="bg-[#071A52]/10 p-4 rounded-xl border border-[#071A52]/20 text-xs">
                    <span className="font-extrabold uppercase text-[10px] tracking-wider text-[#FF6B6B] block mb-1">✓ Business Results</span>
                    <p className="font-bold text-white">{proj.businessResults}</p>
                  </div>
                </div>

                <button onClick={() => scrollToSection("consultation")} className="group border border-slate-800 bg-black/10 hover:bg-black/20 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  Discuss Similar Project
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
