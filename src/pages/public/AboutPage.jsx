import { motion } from "framer-motion";
import { Users, ShieldCheck, Globe, Zap, Award, Heart } from "lucide-react";

const stats = [
  { label: "Partner Salons", value: "2,500+" },
  { label: "Happy Clients", value: "150k+" },
  { label: "Cities Reached", value: "45" },
  { label: "Service Hours", value: "1.2M" },
];

const values = [
  {
    title: "Uncompromising Quality",
    desc: "We only partner with salons that meet our rigorous 50-point excellence check.",
    icon: <ShieldCheck size={28} />,
  },
  {
    title: "Human Connection",
    desc: "Technology is our tool, but beauty is a deeply personal, human experience.",
    icon: <Users size={28} />,
  },
  {
    title: "Inclusion for All",
    desc: "Every hair type, skin tone, and identity finds a home in our curated network.",
    icon: <Heart size={28} />,
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-300 overflow-x-hidden">
      {/* 1. EDITORIAL HERO */}
      <section className="bg-white pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">Our Story</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-800 mt-8 mb-8 leading-[0.85] uppercase">
                Redefining <br />
                <span className="text-primary text-outline">Beauty Tech.</span>
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed max-w-lg">
                Founded in 2026, SalonHub was born out of a simple frustration: finding a world-class stylist shouldn't feel like a full-time job.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="rounded-[60px] overflow-hidden shadow-2xl border-[16px] border-white rotate-3 hover:rotate-0 transition-transform duration-700">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1000"
                  alt="Founder at Work"
                  className="w-full h-[600px] object-cover"
                />
              </div>
              {/* Floating Award */}
              <div className="absolute top-10 -left-10 bg-gray-800 text-white p-6 rounded-3xl shadow-2xl border border-gray-700 max-w-[180px]">
                <Award className="text-primary mb-2" size={32} />
                <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Voted #1 Booking Platform 2025</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CORE VALUES (Bento Style) */}
      <section className="py-24 px-6 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black tracking-tighter uppercase">
              Our Core <span className="text-primary">Philosophy</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                className="bg-gray-700/30 p-10 rounded-[40px] border border-gray-600 hover:border-primary transition-all group"
              >
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  {val.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{val.title}</h3>
                <p className="text-gray-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS BAR (Minimalist) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-5xl font-black text-gray-800 tracking-tighter mb-2">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. JOIN THE REVOLUTION (CTA) */}
      <section className="py-24 px-6 mb-20">
        <div className="max-w-7xl mx-auto bg-primary rounded-[50px] p-16 relative overflow-hidden flex flex-col items-center text-center">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6 leading-none">Are you a salon owner looking to grow?</h2>
            <p className="text-white/80 text-lg mb-10">Join 2,500+ elite partners who have transformed their business with our booking ecosystem.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn bg-gray-800 text-white border-none h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                Partner With Us
              </button>
              <button className="btn btn-ghost text-white h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest border-white/30">
                View Success Stories
              </button>
            </div>
          </div>
          {/* Abstract background shape */}
          <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
