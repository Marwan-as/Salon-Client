import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Essentials",
    price: "0",
    description: "Perfect for occasional grooming and discovery.",
    features: ["Access to all salons", "Instant booking", "Digital receipts", "Email support"],
    buttonText: "Get Started",
    highlight: false,
    icon: <Zap size={24} />,
  },
  {
    name: "Elite",
    price: "29",
    description: "For those who prioritize their routine and style.",
    features: ["Everything in Essentials", "10% off all services", "Priority booking slots", "Exclusive monthly offers", "Priority chat support"],
    buttonText: "Go Elite",
    highlight: true, // This will trigger the dark theme
    icon: <Star size={24} />,
  },
  {
    name: "Prestige",
    price: "79",
    description: "The ultimate lifestyle and wellness experience.",
    features: ["Everything in Elite", "Unlimited 20% discounts", "Concierge style matching", "Free monthly treatment", "Dedicated account manager"],
    buttonText: "Join Prestige",
    highlight: false,
    icon: <Crown size={24} />,
  },
];

const MembershipsPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-base-300">
      {/* 1. HERO HEADER */}
      <section className="bg-white pt-16 pb-32 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg shadow-primary/20">
              Membership Tiers
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-800 mt-8 mb-6 uppercase">
              Unlock the <span className="text-primary">Best You.</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl leading-relaxed">
              Join the SalonHub community and enjoy exclusive benefits, priority access, and specialized pricing at elite studios.
            </p>

            {/* Billing Toggle */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <span className={`text-sm font-bold uppercase tracking-widest ${!isAnnual ? "text-gray-800" : "text-gray-400"}`}>Monthly</span>
              <input type="checkbox" className="toggle toggle-primary toggle-lg" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} />
              <span className={`text-sm font-bold uppercase tracking-widest ${isAnnual ? "text-gray-800" : "text-gray-400"}`}>
                Annually <span className="text-primary text-[10px] ml-1">(Save 20%)</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PRICING CARDS */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 pb-24">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-10 rounded-[40px] shadow-2xl transition-transform hover:scale-[1.02] ${
                plan.highlight ? "bg-gray-800 text-white ring-4 ring-primary ring-offset-8" : "bg-white text-gray-800"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-xl">
                  Most Popular
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${
                  plan.highlight ? "bg-primary text-white" : "bg-gray-100 text-primary"
                }`}
              >
                {plan.icon}
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{plan.name}</h3>
              <p className={`text-sm mb-8 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black tracking-tighter">${isAnnual ? Math.floor(plan.price * 0.8) : plan.price}</span>
                <span className={`text-sm font-bold uppercase tracking-widest ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                  / {isAnnual ? "year" : "month"}
                </span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm font-medium">
                    <Check size={18} className="text-primary flex-shrink-0" />
                    <span className={plan.highlight ? "text-gray-300" : "text-gray-600"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn btn-block h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all ${
                  plan.highlight ? "btn-primary" : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* 3. FAQ SECTION PREVIEW */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-800 mb-4">Membership FAQ</h2>
          <p className="text-gray-500 mb-12">Common questions about our membership programs.</p>

          <div className="max-w-3xl mx-auto space-y-4">
            {["Can I cancel my membership anytime?", "Do discounts apply to all salons?", "How does priority booking work?"].map((q, i) => (
              <div key={i} className="collapse collapse-plus bg-white rounded-3xl border border-gray-100 shadow-sm">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-sm font-bold uppercase tracking-widest text-gray-800 py-6">{q}</div>
                <div className="collapse-content text-gray-500 text-sm">
                  <p className="pb-4">
                    Yes, we pride ourselves on transparency. You can manage your subscription directly from your account dashboard with one click.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MembershipsPage;
