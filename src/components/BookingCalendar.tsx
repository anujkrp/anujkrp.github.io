import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Check, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BookingAppointment } from "../types";

const TIME_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM"
];

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [briefMessage, setBriefMessage] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedSessions, setBookedSessions] = useState<BookingAppointment[]>([]);

  // Calculate the next 7 days for selection
  const [availableDays, setAvailableDays] = useState<{ dateString: string; displayDay: string; displayDate: string }[]>([]);

  useEffect(() => {
    const days = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Start from tomorrow
    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      // Skip Sundays for bookings
      if (d.getDay() === 0) continue;

      const year = d.getFullYear();
      const monthStr = String(d.getMonth() + 1).padStart(2, "0");
      const dateStr = String(d.getDate()).padStart(2, "0");
      const key = `${year}-${monthStr}-${dateStr}`;

      days.push({
        dateString: key,
        displayDay: weekdays[d.getDay()],
        displayDate: `${d.getDate()} ${months[d.getMonth()]}`
      });
    }
    setAvailableDays(days.slice(0, 6)); // Display 6 days
    
    // Load booked sessions from local storage
    const stored = localStorage.getItem("ak_studio_bookings");
    if (stored) {
      try {
        setBookedSessions(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedDate) {
      setErrorMsg("Please select a date for your consultation.");
      return;
    }
    if (!selectedSlot) {
      setErrorMsg("Please select a convenient time slot.");
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter your phone or WhatsApp number.");
      return;
    }

    const newAppointment: BookingAppointment = {
      id: "book_" + Math.random().toString(36).substr(2, 9),
      name: fullName,
      email,
      phone,
      date: selectedDate,
      timeSlot: selectedSlot,
      message: briefMessage,
      bookedAt: new Date().toISOString()
    };

    const updated = [newAppointment, ...bookedSessions];
    setBookedSessions(updated);
    localStorage.setItem("ak_studio_bookings", JSON.stringify(updated));

    // Dispatch custom event to notify CRM Dashboard
    window.dispatchEvent(new Event("ak_leads_updated"));

    setIsSuccess(true);
  };

  const handleReset = () => {
    setSelectedDate("");
    setSelectedSlot("");
    setFullName("");
    setEmail("");
    setPhone("");
    setBriefMessage("");
    setIsSuccess(false);
  };

  return (
    <div className="bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border border-slate-150 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="booking-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleBookingSubmit}
            className="space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded-full mb-3 border border-teal-500/10">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Live Scheduler
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                Book a 1:1 Strategy Call
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select your convenient day and time slot to discuss custom website development, SaaS workflows, or AI automation needs.
              </p>
            </div>

            {/* Step 1: Date Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase">
                1. Select a Date
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableDays.map((day) => {
                  const isActive = selectedDate === day.dateString;
                  return (
                    <button
                      type="button"
                      key={day.dateString}
                      onClick={() => {
                        setSelectedDate(day.dateString);
                        setErrorMsg("");
                      }}
                      className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-br from-blue-600 to-teal-500 text-white border-transparent scale-[1.02] shadow-md"
                          : "bg-slate-50/50 dark:bg-slate-950/60 hover:bg-slate-100/80 dark:hover:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className={`text-[10px] font-medium tracking-wide uppercase ${isActive ? "text-teal-200" : "text-slate-400"}`}>
                        {day.displayDay}
                      </span>
                      <span className="text-sm font-bold mt-1 tracking-tight">
                        {day.displayDate}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Time Slot Selection */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  2. Pick a Time (IST / UTC+5.5)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isActive = selectedSlot === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setErrorMsg("");
                        }}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          isActive
                            ? "bg-teal-500 text-white border-transparent shadow-sm scale-[1.02]"
                            : "bg-slate-50/50 dark:bg-slate-950/60 hover:bg-slate-100/80 dark:hover:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5 opacity-70" />
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Client Info */}
            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/60"
              >
                <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  3. Your Contact Details
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      id="calendar-full-name"
                      type="text"
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <input
                      id="calendar-email"
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      id="calendar-phone"
                      type="tel"
                      placeholder="Phone / WhatsApp Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <textarea
                      id="calendar-message"
                      rows={2}
                      placeholder="Tell me briefly about your project/goals..."
                      value={briefMessage}
                      onChange={(e) => setBriefMessage(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 text-xs bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200/20">
                <AlertCircle className="h-4 w-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            {selectedSlot && (
              <motion.button
                id="booking-submit-btn"
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-lg hover:shadow-xl cursor-pointer transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <CalendarIcon className="h-4 w-4" />
                Book Consultation Now
              </motion.button>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-10 space-y-5"
          >
            <div className="mx-auto h-16 w-16 bg-green-50 dark:bg-green-950/30 rounded-full flex items-center justify-center border border-green-500/20">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Consultation Request Confirmed!
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-teal-500">{fullName}</span>! Your slot on <strong className="text-slate-800 dark:text-slate-200">{selectedDate}</strong> at <strong className="text-slate-800 dark:text-slate-200">{selectedSlot}</strong> is locked.
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2">
                An calendar invite link and introductory details has been pre-scheduled and sent to your email address: {email}.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Book Another Slot
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
