import React, { useState } from "react";
import { Send, CheckCircle, ShieldCheck, Mail, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LeadSubmission } from "../types";

const BUDGET_OPTIONS = [
  "Select a Budget Range",
  "Below $1,500 (Basic/Small)",
  "$1,500 - $5,000 (Standard Business)",
  "$5,000 - $15,000 (Growth/SaaS/Automation)",
  "$15,000 - $35,000 (Custom ERP/CRM/Enterprise)",
  "Above $35,000 (Large-scale/Long-term)"
];

const TIMELINE_OPTIONS = [
  "Select expected timeline",
  "Extremely Urgent (Under 2 weeks)",
  "Standard (3-6 weeks)",
  "Flexible (2-3 months)",
  "Ongoing support partnership"
];

const SERVICE_CHECKBOXES = [
  { label: "Website Development", val: "Web Dev" },
  { label: "Software Development", val: "Software" },
  { label: "SEO Optimization", val: "SEO" },
  { label: "Digital Marketing", val: "Marketing" },
  { label: "AI Automation", val: "AI" },
  { label: "Mobile App Development", val: "Mobile App" },
  { label: "Cloud Hosting & Security", val: "Hosting" },
  { label: "Branding & Visuals", val: "Branding" }
];

export default function LeadForm() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [gdprConsent, setGdprConsent] = useState(false);

  // Spam protection math puzzle
  const [spamAnswer, setSpamAnswer] = useState("");
  const [mathA] = useState(() => Math.floor(Math.random() * 5) + 3);
  const [mathB] = useState(() => Math.floor(Math.random() * 5) + 2);

  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckboxChange = (srvVal: string) => {
    if (selectedServices.includes(srvVal)) {
      setSelectedServices(selectedServices.filter((s) => s !== srvVal));
    } else {
      setSelectedServices([...selectedServices, srvVal]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Form Validations
    if (!fullName.trim()) {
      setValidationError("Please enter your Full Name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setValidationError("Please enter a valid business email address.");
      return;
    }
    if (!phone.trim()) {
      setValidationError("Please provide your contact number.");
      return;
    }
    if (selectedServices.length === 0) {
      setValidationError("Please select at least one Service of interest.");
      return;
    }
    if (!budget || budget === BUDGET_OPTIONS[0]) {
      setValidationError("Please select an estimated budget range.");
      return;
    }
    if (!timeline || timeline === TIMELINE_OPTIONS[0]) {
      setValidationError("Please select your desired project timeline.");
      return;
    }
    if (!gdprConsent) {
      setValidationError("Please agree to the privacy statement and GDPR consent.");
      return;
    }

    // Spam Protection Check
    if (parseInt(spamAnswer) !== (mathA + mathB)) {
      setValidationError(`Spam verification failed. What is ${mathA} + ${mathB}?`);
      return;
    }

    setIsSubmitting(true);

    // Simulate Network API POST & Save to LocalStorage CRM
    setTimeout(() => {
      const storedLeadsStr = localStorage.getItem("ak_studio_leads");
      let storedLeads: LeadSubmission[] = [];
      if (storedLeadsStr) {
        try {
          storedLeads = JSON.parse(storedLeadsStr);
        } catch (error) {
          console.error(error);
        }
      }

      const newLead: LeadSubmission = {
        id: "lead_" + Math.random().toString(36).substr(2, 9),
        fullName,
        companyName,
        email,
        phone,
        whatsApp: whatsApp || phone,
        businessWebsite,
        servicesInterested: selectedServices,
        budget,
        timeline,
        message,
        submittedAt: new Date().toISOString(),
        status: "new"
      };

      const updatedLeads = [newLead, ...storedLeads];
      localStorage.setItem("ak_studio_leads", JSON.stringify(updatedLeads));

      // Dispatch custom lead submission event so AdminCRM reloads dynamically
      window.dispatchEvent(new Event("ak_leads_updated"));

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFullName("");
    setCompanyName("");
    setEmail("");
    setPhone("");
    setWhatsApp("");
    setBusinessWebsite("");
    setBudget("");
    setTimeline("");
    setMessage("");
    setSelectedServices([]);
    setGdprConsent(false);
    setSpamAnswer("");
    setIsSuccess(false);
  };

  return (
    <div className="bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border border-slate-150 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
      
      {/* Decorative colored glow corner */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="lead-form-fields"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Form Title block */}
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Submit your project specifications below to request a tailored analysis, strategic options list, and locked price estimates from AK.
              </p>
            </div>

            {/* General Info block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="lead-full-name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Full Name *
                </label>
                <input
                  id="lead-full-name"
                  type="text"
                  required
                  placeholder="e.g. Anuj Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="lead-company" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Company Name
                </label>
                <input
                  id="lead-company"
                  type="text"
                  placeholder="e.g. Cyberdyne Systems"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            {/* Email + Phones block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Work Email *
                </label>
                <input
                  id="lead-email"
                  type="email"
                  required
                  placeholder="e.g. d.anujkrp@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Phone Number *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  placeholder="e.g. +91 99999 88888"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="lead-whatsapp" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  WhatsApp Number
                </label>
                <input
                  id="lead-whatsapp"
                  type="tel"
                  placeholder="Leave empty if same as phone"
                  value={whatsApp}
                  onChange={(e) => setWhatsApp(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            {/* Business Web input */}
            <div className="space-y-1">
              <label htmlFor="lead-website" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                Current Business Website (if any)
              </label>
              <input
                id="lead-website"
                type="url"
                placeholder="https://example.com"
                value={businessWebsite}
                onChange={(e) => setBusinessWebsite(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Services Checkboxes block */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                Select Services Interested In *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SERVICE_CHECKBOXES.map((srv) => {
                  const isChecked = selectedServices.includes(srv.val);
                  return (
                    <button
                      type="button"
                      key={srv.val}
                      onClick={() => handleCheckboxChange(srv.val)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isChecked
                          ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/40 font-semibold shadow-sm"
                          : "bg-slate-50/50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by button click
                        className="rounded text-teal-500 focus:ring-teal-500 h-3.5 w-3.5 cursor-pointer pointer-events-none"
                      />
                      <span className="text-[11px] truncate">{srv.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget & Timeline Select block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="lead-budget" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Estimated Project Budget *
                </label>
                <select
                  id="lead-budget"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((opt, idx) => (
                    <option key={idx} value={opt} disabled={idx === 0}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="lead-timeline" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Project Timeline *
                </label>
                <select
                  id="lead-timeline"
                  required
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
                >
                  {TIMELINE_OPTIONS.map((opt, idx) => (
                    <option key={idx} value={opt} disabled={idx === 0}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message block */}
            <div className="space-y-1">
              <label htmlFor="lead-message" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                Describe Your Project Goals & Requirements
              </label>
              <textarea
                id="lead-message"
                rows={4}
                placeholder="Tell us about the features you need, technical stack, or goals you want to accomplish..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-250 focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            {/* Spam calculation + GDPR check */}
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/50">
              {/* Math anti-spam */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50/50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-200/50 dark:border-white/10">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-teal-400 animate-pulse" /> Anti-Spam verification:
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono bg-slate-200/80 dark:bg-slate-900 px-2.5 py-1 rounded-md text-slate-800 dark:text-slate-250 font-bold border border-slate-300 dark:border-white/10">
                    What is {mathA} + {mathB}?
                  </span>
                  <input
                    id="spam-verification"
                    type="number"
                    required
                    placeholder="Your answer"
                    value={spamAnswer}
                    onChange={(e) => setSpamAnswer(e.target.value)}
                    className="w-20 bg-white/70 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-md px-2.5 py-1 text-center font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* GDPR consent */}
              <div className="flex items-start gap-3">
                <input
                  id="gdpr-consent-checkbox"
                  type="checkbox"
                  checked={gdprConsent}
                  onChange={(e) => {
                    setGdprConsent(e.target.checked);
                    setValidationError("");
                  }}
                  className="mt-1 rounded border-slate-300 dark:border-slate-800 text-teal-500 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                />
                <label htmlFor="gdpr-consent-checkbox" className="text-xs text-slate-500 dark:text-slate-400 leading-normal cursor-pointer">
                  I consent to allow AK Design Studio to store my submitted details so they can reply to my business inquiry and schedule my free consultation. (GDPR compliant)
                </label>
              </div>
            </div>

            {/* Error notifications */}
            {validationError && (
              <div className="flex items-center gap-2 p-3 text-xs bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200/20">
                <AlertCircle className="h-4 w-4" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Submit button with loader */}
            <button
              id="lead-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-tr from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Syncing with CRM Database...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Get My Free Consultation
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="lead-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 space-y-6"
          >
            <div className="mx-auto h-20 w-20 bg-green-50 dark:bg-green-950/20 rounded-full flex items-center justify-center border border-green-500/20 animate-bounce">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
                Project Lead Registered!
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you for your trust, <span className="font-bold text-teal-500">{fullName}</span>! Your consultation request has been successfully registered in our CRM database.
              </p>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-4 space-y-1">
                <span className="font-bold uppercase tracking-wide text-teal-500 block">Automatic Trigger Action:</span>
                <p>✓ Automated Lead Validation Active</p>
                <p>✓ Draft follow-up compiled in CRM</p>
                <p>✓ Syncing secure backup triggers</p>
              </div>
              <p className="text-xs text-slate-400 italic max-w-xs mx-auto pt-2">
                Anuj Kumar will personally review your brief and contact you within 24 hours at <strong>{email}</strong> or <strong>{phone}</strong>.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
