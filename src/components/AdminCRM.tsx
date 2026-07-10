import React, { useState, useEffect } from "react";
import { Users, Mail, Calendar, ShieldCheck, Download, Trash2, CheckCircle2, Archive, PhoneCall, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LeadSubmission, BookingAppointment } from "../types";

interface AdminCRMProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminCRM({ isOpen, onClose }: AdminCRMProps) {
  const [activeTab, setActiveTab] = useState<"leads" | "bookings">("leads");
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [bookings, setBookings] = useState<BookingAppointment[]>([]);

  const loadData = () => {
    const storedLeads = localStorage.getItem("ak_studio_leads");
    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial dummy leads if empty, to make the dashboard look populated and gorgeous immediately!
      const dummyLeads: LeadSubmission[] = [
        {
          id: "lead_1",
          fullName: "Sarah Connor",
          companyName: "Cyberdyne Systems",
          email: "sarah.connor@cyberdyne.io",
          phone: "+1 (555) 019-2831",
          whatsApp: "+1 (555) 019-2831",
          businessWebsite: "cyberdyne.io",
          servicesInterested: ["Software Development", "AI Automation"],
          budget: "$10,000 - $25,000",
          timeline: "2-3 Months",
          message: "We need an AI agent that scans assembly-line telemetry in real time and automatically queues repair orders before hardware failure. We've heard AK Design Studio is expert in automated AI workflows.",
          submittedAt: new Date(Date.now() - 3600000 * 2.5).toISOString(), // 2.5 hrs ago
          status: "new"
        },
        {
          id: "lead_2",
          fullName: "James Mercer",
          companyName: "Shins Apparel",
          email: "james@shinsapparel.com",
          phone: "+44 7911 123456",
          whatsApp: "+44 7911 123456",
          businessWebsite: "shinsapparel.com",
          servicesInterested: ["Website Development", "SEO"],
          budget: "$5,000 - $10,000",
          timeline: "1 Month",
          message: "Our shopify page has extremely slow load times (almost 8s) on mobile, and SEO traffic has decreased by 30%. We want to explore a headless React storefront architecture as seen in your portfolio.",
          submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
          status: "contacted"
        }
      ];
      setLeads(dummyLeads);
      localStorage.setItem("ak_studio_leads", JSON.stringify(dummyLeads));
    }

    const storedBookings = localStorage.getItem("ak_studio_bookings");
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed dummy bookings
      const dummyBookings: BookingAppointment[] = [
        {
          id: "book_1",
          name: "Diana Prince",
          email: "diana@themyscira.org",
          phone: "+1 (555) 489-1029",
          date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
          timeSlot: "11:00 AM",
          message: "Discussion regarding a school management software setup for 1,200 active students.",
          bookedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        }
      ];
      setBookings(dummyBookings);
      localStorage.setItem("ak_studio_bookings", JSON.stringify(dummyBookings));
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }

    // Listen for custom lead/booking updates from form submissions
    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener("ak_leads_updated", handleUpdate);
    return () => window.removeEventListener("ak_leads_updated", handleUpdate);
  }, [isOpen]);

  const updateLeadStatus = (leadId: string, newStatus: "new" | "contacted" | "archived") => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updated);
    localStorage.setItem("ak_studio_leads", JSON.stringify(updated));
  };

  const deleteLead = (leadId: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    const updated = leads.filter(l => l.id !== leadId);
    setLeads(updated);
    localStorage.setItem("ak_studio_leads", JSON.stringify(updated));
  };

  const deleteBooking = (bookingId: string) => {
    if (!window.confirm("Are you sure you want to delete this booking appointment?")) return;
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem("ak_studio_bookings", JSON.stringify(updated));
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ leads, bookings }, null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ak_design_studio_leads_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-slate-900 border border-slate-800 w-full max-w-6xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] text-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-blue-600 to-teal-400 p-2.5 rounded-xl text-white shadow-lg shadow-teal-500/10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
                  AK Client Lead & CRM Portal
                  <span className="text-[10px] bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded-full font-semibold uppercase tracking-widest">
                    Demo Active
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Monitor inbound client briefs and scheduled calls captured in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between">
              <button
                onClick={exportData}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl text-slate-200 transition-colors cursor-pointer border border-slate-700/60"
              >
                <Download className="h-4 w-4" /> Export Leads (.JSON)
              </button>
              
              <button
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-slate-950 px-6 py-2 border-b border-slate-800/80 items-center justify-between gap-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("leads")}
                className={`flex items-center gap-2 py-3 text-xs font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                  activeTab === "leads"
                    ? "border-teal-400 text-teal-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Users className="h-4 w-4" />
                Prospect Leads ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex items-center gap-2 py-3 text-xs font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                  activeTab === "bookings"
                    ? "border-teal-400 text-teal-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Booked Strategy Calls ({bookings.length})
              </button>
            </div>

            <button
              onClick={loadData}
              className="p-1.5 rounded-lg text-slate-500 hover:text-teal-400 hover:bg-slate-900 transition-all cursor-pointer"
              title="Reload Leads"
            >
              <RefreshCw className="h-4 w-4 animate-spin-slow" />
            </button>
          </div>

          {/* List panel */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-950/40">
            {activeTab === "leads" ? (
              leads.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Mail className="h-12 w-12 text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm">No lead submissions captured yet.</p>
                  <p className="text-xs text-slate-500">Fill out the Free Consultation form on the main page to see it appear here instantly!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-4 shadow-sm"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                        <div>
                          <h4 className="font-bold text-base text-white flex items-center gap-2">
                            {lead.fullName}
                            {lead.companyName && (
                              <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                                @ {lead.companyName}
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-teal-400" /> {lead.email}</span>
                            <span>Phone: {lead.phone}</span>
                            {lead.businessWebsite && <span>Web: <a href={`https://${lead.businessWebsite}`} target="_blank" className="text-teal-400 underline">{lead.businessWebsite}</a></span>}
                          </p>
                        </div>

                        {/* Status controls */}
                        <div className="flex items-center gap-2 self-stretch md:self-auto justify-between">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateLeadStatus(lead.id, "new")}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border cursor-pointer transition-all ${
                                lead.status === "new"
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30 font-extrabold"
                                  : "bg-slate-800/40 text-slate-400 border-slate-800 hover:text-slate-350"
                              }`}
                            >
                              New
                            </button>
                            <button
                              onClick={() => updateLeadStatus(lead.id, "contacted")}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border cursor-pointer transition-all ${
                                lead.status === "contacted"
                                  ? "bg-teal-500/20 text-teal-400 border-teal-500/30 font-extrabold"
                                  : "bg-slate-800/40 text-slate-400 border-slate-800 hover:text-slate-350"
                              }`}
                            >
                              Contacted
                            </button>
                            <button
                              onClick={() => updateLeadStatus(lead.id, "archived")}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border cursor-pointer transition-all ${
                                lead.status === "archived"
                                  ? "bg-slate-800 text-slate-300 border-slate-700 font-extrabold"
                                  : "bg-slate-800/40 text-slate-400 border-slate-800 hover:text-slate-350"
                              }`}
                            >
                              Archive
                            </button>
                          </div>

                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-850 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 space-y-1">
                          <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider block">Budget Preference</span>
                          <span className="font-bold text-orange-400 text-sm">{lead.budget}</span>
                        </div>
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 space-y-1">
                          <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider block">Expected Timeline</span>
                          <span className="font-bold text-blue-400 text-sm">{lead.timeline}</span>
                        </div>
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 space-y-1">
                          <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider block">Submitted On</span>
                          <span className="font-mono text-slate-300 text-xs block truncate">
                            {new Date(lead.submittedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Services Requested */}
                      <div className="flex flex-wrap gap-1.5">
                        {lead.servicesInterested.map((srv, sIdx) => (
                          <span key={sIdx} className="bg-teal-500/10 text-teal-300 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-md border border-teal-500/20">
                            {srv}
                          </span>
                        ))}
                      </div>

                      {/* Brief Brief */}
                      {lead.message && (
                        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-1.5">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Project Scope Brief:</span>
                          <p className="text-slate-300 text-xs leading-relaxed italic">
                            "{lead.message}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              bookings.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Calendar className="h-12 w-12 text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm">No scheduled strategy calls found.</p>
                  <p className="text-xs text-slate-500">Pick a day and time slot in the booking calendar widget to see it lock in here!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="bg-gradient-to-tr from-teal-500 to-blue-600 p-3 rounded-xl text-white shrink-0 shadow-lg mt-1">
                          <PhoneCall className="h-5 w-5" />
                        </div>
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-base text-white">{booking.name}</h4>
                          <p className="text-xs text-slate-400 flex flex-wrap gap-x-4">
                            <span>Email: {booking.email}</span>
                            <span>Phone: {booking.phone}</span>
                          </p>
                          {booking.message && (
                            <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-850 max-w-lg mt-2">
                              "{booking.message}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-stretch md:self-auto justify-between pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                        <div className="text-right">
                          <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider block">Meeting Slot</span>
                          <div className="font-bold text-teal-400 text-sm mt-0.5">
                            {booking.date} @ {booking.timeSlot}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Booked on {new Date(booking.bookedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-850 transition-colors cursor-pointer self-center"
                          title="Cancel Booking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
          
          {/* Footer warning */}
          <div className="bg-slate-950/80 p-4 border-t border-slate-850/80 text-center text-[10px] text-slate-500 tracking-wide">
            CONFIDENTIAL CLIENT DATABASE • SECURITY RULES SECURE • LOCAL STORAGE SYNCHRONIZATION RUNNING
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
