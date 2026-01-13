import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles, MapPin, Calendar, PlayCircle } from "lucide-react";
import HowItWorksModal from "../../components/modals/HowItWorksModal";

const steps = [
  { title: "Discover Salons", description: "Browse through top salons in your city, read reviews, and find the perfect fit for you." },
  { title: "Book Instantly", description: "Select services, choose your time, and book in just a few clicks." },
  { title: "Enjoy Your Experience", description: "Arrive at your salon and enjoy a seamless, premium service." },
];

const features = ["Multiple Salons & Services", "Easy Online Booking", "Membership & Loyalty Points", "Multi-language Support"];

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-base-300 overflow-x-hidden">
      {/* PREMIUM HERO SECTION */}
      <section className="bg-white pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:w-1/2 text-left">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg">
                Premium Experiences
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-gray-800 mb-6 leading-[0.9]">
              Elevate Your <br />
              <span className="text-primary">Style Hub.</span>
            </h1>

            <p className="text-gray-500 text-xl max-w-lg mb-10 leading-relaxed">
              Discover, book, and manage your beauty and wellness experiences with the most elite professionals in your area.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Primary CTA */}
              <NavLink
                to="/salons"
                className="btn btn-primary h-14 px-8 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 border-none"
              >
                Explore Salons <ArrowRight size={18} className="ml-2" />
              </NavLink>

              {/* 2. Modal Trigger Button */}
              {/* Changed to a more "Interactive" style to suggest it opens something */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-ghost h-14 px-8 rounded-2xl text-[12px] font-black uppercase tracking-widest border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
              >
                <PlayCircle size={20} className="text-primary" />
                How it works
              </button>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:w-1/2 relative">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white transform lg:rotate-2">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury Salon"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating Glassmorphism Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 hidden md:block"
            >
              <p className="text-primary font-black text-3xl">500+</p>
              <p className="text-gray-800 text-[10px] font-black uppercase tracking-widest">Verified Studios</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (The Editorial Grid) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black tracking-tighter text-gray-800 uppercase">
                Seamless <span className="text-primary">Journey</span>
              </h2>
              <p className="text-gray-500 mt-2">A three-step process to a brand new you.</p>
            </div>
            <div className="h-[2px] flex-1 bg-gray-200 mx-10 hidden md:block mb-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative">
                <div className="text-8xl font-black text-gray-100 absolute -top-10 -left-4 z-0 transition-colors group-hover:text-primary/10">0{index + 1}</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black uppercase tracking-tight text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES (The Bento-Style Section) */}
      <section className="py-24 bg-gray-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4">
              {/* Feature Tiles */}
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  className="bg-gray-700/50 p-8 rounded-3xl border border-gray-600 hover:border-primary transition-colors"
                >
                  <CheckCircle2 className="text-primary mb-4" size={24} />
                  <p className="font-bold tracking-tight">{feature}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-8">
              <h2 className="text-5xl font-black tracking-tighter leading-none">
                WHY THE WORLD <br />
                CHOOSES <span className="text-primary">SALONHUB.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We bridge the gap between world-class talent and the clients who seek perfection. Our platform is built for speed, beauty, and reliability.
              </p>
              <div className="flex gap-8 py-4">
                <div className="text-center">
                  <p className="text-3xl font-black text-white">99%</p>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">24/7</p>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3. The Modal Component */}
      {/* Placed at the end to ensure it layers correctly over everything */}
      <HowItWorksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LandingPage;
