import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, Calendar, Clock, User, Scissors, Info, Star, ShieldCheck, Check, Sparkles, MapPin } from "lucide-react";

// --- MOCK DATA FOR FRONT-END PHASE ---
const SERVICES = [
  { id: 1, name: "Premium Balayage", price: 180, time: "180 min", description: "Full hair lightening with custom toning." },
  { id: 2, name: "Signature Haircut", price: 65, time: "60 min", description: "Precision cut with luxury wash and style." },
  { id: 3, name: "Glossing & Blowout", price: 90, time: "90 min", description: "Refresh your color and add high-shine finish." },
  { id: 4, name: "Scalp Treatment", price: 45, time: "30 min", description: "Deep detox for healthy hair growth." },
];

const STAFF = [
  { id: 1, name: "Marco P.", role: "Master Artisan", image: "https://i.pravatar.cc/150?u=marco" },
  { id: 2, name: "Sarah J.", role: "Color Specialist", image: "https://i.pravatar.cc/150?u=sarah" },
  { id: 3, name: "Elena V.", role: "Lead Stylist", image: "https://i.pravatar.cc/150?u=elena" },
];

const TIME_SLOTS = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];

const BookingPage = () => {
  const { salonId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = parseInt(searchParams.get("step") || "1");

  const [booking, setBooking] = useState(() => {
    const saved = localStorage.getItem(`booking_draft_${salonId}`);
    return saved ? JSON.parse(saved) : { service: null, specialist: null, date: null, time: null, price: 0 };
  });

  useEffect(() => {
    localStorage.setItem(`booking_draft_${salonId}`, JSON.stringify(booking));
  }, [booking, salonId]);

  const goToStep = (step) => setSearchParams({ step });
  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  const isStepComplete = (stepNum) => {
    if (stepNum === 1) return !!booking.service;
    if (stepNum === 2) return !!booking.specialist;
    if (stepNum === 3) return !!booking.date && !!booking.time;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT: THE FUNNEL */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {/* STEP INDICATOR */}
          <div className="bg-white rounded-[32px] p-6 flex justify-between items-center shadow-sm border border-gray-100">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 ${
                      currentStep >= s ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isStepComplete(s) || currentStep > s ? <Check size={16} strokeWidth={4} /> : s}
                  </div>
                </div>
                {s < 4 && <div className={`flex-grow h-[2px] mx-4 rounded-full ${currentStep > s ? "bg-primary" : "bg-gray-100"}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* MAIN FLOW CARD */}
          <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-white relative overflow-hidden min-h-[650px] flex flex-col">
            <div className="p-8 md:p-12 flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <Header title="Select" accent="Treatment" />
                      <div className="grid gap-4">
                        {SERVICES.map((s) => (
                          <SelectionCard
                            key={s.id}
                            active={booking.service === s.name}
                            onClick={() => {
                              setBooking({ ...booking, service: s.name, price: s.price });
                              nextStep();
                            }}
                          >
                            <div className="flex justify-between w-full items-center">
                              <div>
                                <p className="font-black uppercase tracking-widest text-sm mb-1">{s.name}</p>
                                <p className="text-xs text-gray-400 font-medium">{s.description}</p>
                              </div>
                              <p className="text-2xl font-black tracking-tighter text-primary">${s.price}</p>
                            </div>
                          </SelectionCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <Header title="Choose" accent="Specialist" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {STAFF.map((sp) => (
                          <SelectionCard
                            key={sp.id}
                            active={booking.specialist === sp.name}
                            onClick={() => {
                              setBooking({ ...booking, specialist: sp.name });
                              nextStep();
                            }}
                          >
                            <div className="flex items-center gap-4">
                              <img src={sp.image} className="w-14 h-14 rounded-2xl object-cover shadow-md" alt={sp.name} />
                              <div>
                                <p className="font-black uppercase tracking-widest text-sm">{sp.name}</p>
                                <p className="text-[10px] font-black uppercase text-primary tracking-widest">{sp.role}</p>
                              </div>
                            </div>
                          </SelectionCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <Header title="Secure" accent="Time Slot" />
                      <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Pick Date</label>
                          <input
                            type="date"
                            className="input input-bordered w-full rounded-2xl h-14 font-bold focus:border-primary"
                            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                            value={booking.date || ""}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t}
                              disabled={!booking.date}
                              onClick={() => {
                                setBooking({ ...booking, time: t });
                                nextStep();
                              }}
                              className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                                ${booking.time === t ? "bg-primary text-white scale-95" : "bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-30"}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8 text-center">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles size={40} />
                      </div>
                      <Header title="Ready to" accent="Confirm?" center />
                      <p className="text-gray-500 max-w-sm mx-auto text-sm font-medium">
                        Please review your details in the sidebar. No payment is required until after your appointment.
                      </p>
                      <button
                        onClick={() => {
                          localStorage.removeItem(`booking_draft_${salonId}`);
                          navigate("/dashboard");
                        }}
                        className="btn btn-primary btn-block h-16 rounded-[24px] text-[12px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/30 border-none mt-8"
                      >
                        Book Appointment Now
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* NAVIGATION */}
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
              <button
                onClick={prevStep}
                className={`btn btn-ghost rounded-2xl font-black uppercase text-[10px] tracking-widest ${currentStep === 1 ? "invisible" : ""}`}
              >
                <ChevronLeft size={16} /> Back
              </button>
              <div className="flex items-center gap-2 text-gray-400">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: LIVE SUMMARY */}
        <div className="lg:w-1/3">
          <div className="bg-gray-900 text-white rounded-[40px] p-10 shadow-2xl sticky top-28 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-10">
              Your <span className="text-primary">Summary.</span>
            </h2>

            <div className="space-y-8 mb-12 relative z-10">
              <SummaryRow label="Service" value={booking.service} icon={Scissors} />
              <SummaryRow label="Specialist" value={booking.specialist} icon={User} />
              <SummaryRow label="Schedule" value={booking.date ? `${booking.date} @ ${booking.time}` : null} icon={Calendar} />
            </div>

            <div className="pt-8 border-t border-white/10 relative z-10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Estimated Total</p>
                  <p className="text-4xl font-black tracking-tighter">${booking.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Loyalty Points</p>
                  <p className="font-bold">+{booking.price * 5}</p>
                </div>
              </div>

              <div className="bg-white/5 p-5 rounded-[24px] flex gap-4 items-start border border-white/5">
                <Info size={18} className="text-primary mt-1 shrink-0" />
                <p className="text-[9px] text-gray-400 font-black uppercase leading-relaxed tracking-widest">
                  Pay at the salon. Free cancellation up to 24 hours before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPERS ---

const Header = ({ title, accent, center }) => (
  <header className={center ? "text-center" : ""}>
    <h3 className="text-4xl font-black uppercase italic tracking-tighter text-gray-800 leading-none">
      {title} <br /> <span className="text-primary text-outline">{accent}.</span>
    </h3>
  </header>
);

const SelectionCard = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-[24px] border-2 transition-all duration-300 text-left
      ${active ? "bg-white border-primary shadow-xl shadow-primary/10 translate-x-2" : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200"}`}
  >
    {children}
  </button>
);

const SummaryRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-4">
    <div className={`p-2.5 rounded-xl ${value ? "bg-primary text-white" : "bg-white/5 text-gray-700"}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <p className={`text-sm font-black uppercase tracking-tight ${value ? "text-white" : "text-gray-800 italic"}`}>{value || "Pending..."}</p>
    </div>
  </div>
);

export default BookingPage;
