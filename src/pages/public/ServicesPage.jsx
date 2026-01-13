import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Scissors, Sparkles, Wind, Flower2, ChevronRight, Search } from "lucide-react";

// Mock data for service categories
const categories = [
  { id: "hair", name: "Hair Styling", icon: <Scissors />, count: 12, color: "bg-blue-500" },
  { id: "skin", name: "Skincare", icon: <Sparkles />, count: 8, color: "bg-pink-500" },
  { id: "nails", name: "Nail Art", icon: <Flower2 />, count: 15, color: "bg-purple-500" },
  { id: "spa", name: "Massage & Spa", icon: <Wind />, count: 6, color: "bg-teal-500" },
];

const allServices = [
  { id: 1, name: "Haircut", category: "hair", price: "from $45", description: "Precision cutting tailored to your face shape and hair type." },
  { id: 2, name: "Balayage & Color", category: "hair", price: "from $120", description: "Hand-painted highlights for a natural, sun-kissed look." },
  { id: 3, name: "HydraFacial", category: "skin", price: "from $150", description: "Deep cleansing and intense hydration for a glowing complexion." },
  { id: 4, name: "Gel Manicure", category: "nails", price: "from $35", description: "Long-lasting color with a high-shine finish." },
  // Add more as needed...
];

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices = activeTab === "all" ? allServices : allServices.filter((s) => s.category === activeTab);

  return (
    <div className="min-h-screen bg-base-300">
      {/* 1. HERO HEADER */}
      <section className="bg-white pt-12 pb-24 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">Full Service Menu</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-800 mt-6 mb-4">
              Our <span className="text-primary">Specialties.</span>
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto text-lg leading-relaxed">
              Explore professional treatments curated from the top-rated salons in the city.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 -mt-10 pb-20">
        {/* 2. CATEGORY SELECTOR (Horizontal Scroll) */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-shrink-0 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg ${
              activeTab === "all" ? "bg-primary text-white scale-105" : "bg-white text-gray-400 hover:text-gray-800"
            }`}
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg ${
                activeTab === cat.id ? "bg-primary text-white scale-105" : "bg-white text-gray-400 hover:text-gray-800"
              }`}
            >
              <span className={activeTab === cat.id ? "text-white" : "text-primary"}>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3. SERVICES GRID */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {categories.find((c) => c.id === service.category)?.icon}
                    </div>
                    <span className="text-gray-800 font-black text-lg tracking-tight">{service.price}</span>
                  </div>

                  <h3 className="text-xl font-black tracking-tight text-gray-800 mb-2 uppercase">{service.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{service.description}</p>

                  <NavLink
                    to={`/salons?service=${encodeURIComponent(service.name)}`}
                    state={{ expandFilters: true }} // Passing state to trigger the expansion
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-4 transition-all"
                  >
                    Find Salons <ChevronRight size={14} />
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 4. CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gray-800 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div>
            <h2 className="text-3xl font-black tracking-tighter mb-2 uppercase">Not sure what you need?</h2>
            <p className="text-gray-400">Our concierge can help you find the perfect treatment.</p>
          </div>
          <button className="btn btn-primary h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/30">
            Consult an Expert
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
