import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-left">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-[#071A52] to-[#FF6B6B] p-2 rounded-xl text-white"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white"/></svg></div>
            <span className="font-extrabold text-base tracking-tight text-white uppercase">AK DESIGN STUDIO</span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-sans">Elite design and robust software development studio. Delivering custom ERP software layouts, premium headless websites, targeted SEO campaigns, and automated AI agents to accelerate growth.</p>
          <div className="text-xs font-mono text-slate-600 font-bold uppercase flex items-center gap-2">
            <span>Status: Active</span>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-widest text-slate-200">Services</h5>
          <ul className="space-y-2 text-xs font-medium">
            <li>Website Development</li>
            <li>Software Architecting</li>
            <li>Digital Marketing & Ads</li>
            <li>AI Workflow Automation</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-widest text-slate-200">Studio Navigation</h5>
          <ul className="space-y-2 text-xs font-medium">
            <li>Featured Portfolio</li>
            <li>Operational Process</li>
            <li>Inquiries FAQ</li>
            <li>Request Consultation</li>
          </ul>
        </div>

        <div className="space-y-3 col-span-2 md:col-span-1">
          <h5 className="text-xs font-bold uppercase tracking-widest text-slate-200">Management</h5>
          <ul className="space-y-2 text-xs font-medium">
            <li>Lead CRM Portal</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="text-slate-500 font-medium">© 2026 AK Design Studio. Custom designed & hand-coded. All Rights Reserved.</p>
        <p className="text-slate-600">Engineered by <strong className="text-slate-400">Anuj Kumar (AK)</strong> • Powered by Antigravity</p>
      </div>
    </footer>
  );
}
