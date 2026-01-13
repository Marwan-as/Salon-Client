import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Calendar, Search } from "lucide-react";
const HowItWorksModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 btn btn-circle btn-ghost text-gray-400 hover:text-primary">
          ✕
        </button>

        <div className="p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Sparkles size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-gray-800 uppercase">
              How it <span className="text-primary">Works</span>
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { icon: <Search />, title: "Find your Studio", desc: "Browse our curated list of elite salons and wellness experts." },
              { icon: <Calendar />, title: "Choose a Slot", desc: "Select your preferred service and staff member in real-time." },
              { icon: <CheckCircle2 />, title: "Instant Booking", desc: "Secure your spot instantly with our seamless booking engine." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="bg-gray-800 text-white p-3 rounded-xl">{item.icon}</div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={onClose} className="btn btn-primary btn-block h-14 rounded-2xl mt-10 text-[12px] font-black uppercase tracking-widest">
            Got it, Let's go
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorksModal;
