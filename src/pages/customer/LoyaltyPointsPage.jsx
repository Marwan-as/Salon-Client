import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Gift, History, Star, ArrowUpRight, Coins, Wallet } from "lucide-react";

const rewards = [
  {
    id: 1,
    title: "Free Blowout",
    points: 500,
    category: "Hair",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Luxury Facial",
    points: 1200,
    category: "Skin",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Gel Polish Set",
    points: 350,
    category: "Nails",
    image: "https://images.unsplash.com/photo-1604654894610-df49ff66a7cb?auto=format&fit=crop&q=80&w=400",
  },
];

const transactions = [
  { id: 1, date: "Oct 24, 2025", salon: "Velvet Cut", points: "+45", type: "Booking" },
  { id: 2, date: "Oct 20, 2025", salon: "Glow Skin Spa", points: "+120", type: "Review Bonus" },
  { id: 3, date: "Oct 15, 2025", salon: "System Reward", points: "-500", type: "Redeemed Blowout" },
];

const LoyaltyPointsPage = () => {
  const currentPoints = 845;
  const nextTierPoints = 1000;
  const progressPercentage = (currentPoints / nextTierPoints) * 100;

  return (
    <div className="min-h-screen bg-base-300">
      {/* 1. STATUS HERO (Glassmorphism + Dark Mode) */}
      <section className="bg-white pt-12 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">Loyalty Program</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-800 mt-6 mb-4 uppercase leading-[0.9]">
                Your Rewards <br />
                <span className="text-primary">Status.</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                Earn 1 point for every $1 spent. Redeem them for exclusive treatments and premium products.
              </p>
            </motion.div>

            {/* Points Progress Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                    <Trophy size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Current Balance</p>
                    <p className="text-4xl font-black text-white">{currentPoints} pts</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span>Gold Tier Progress</span>
                    <span className="text-primary">{nextTierPoints - currentPoints} pts to go</span>
                  </div>
                  <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-[-20%] right-[-10%] opacity-10">
                <Coins size={300} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. REWARDS SHOP & HISTORY */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rewards Grid */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-black uppercase tracking-tighter text-gray-800 flex items-center gap-3">
              <Gift className="text-primary" /> Redeem Points
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {rewards.map((reward) => (
                <motion.div key={reward.id} whileHover={{ y: -5 }} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 group">
                  <div className="h-48 relative overflow-hidden">
                    <img src={reward.image} alt={reward.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {reward.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black uppercase tracking-tight text-gray-800 mb-4">{reward.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-black">{reward.points} pts</span>
                      <button className="btn btn-sm btn-primary rounded-xl text-[10px] font-black uppercase tracking-widest">Redeem</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* History Sidebar */}
          <div className="space-y-8">
            <h2 className="text-xl font-black uppercase tracking-tighter text-gray-800 flex items-center gap-3">
              <History className="text-primary" /> Activity
            </h2>
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
              <div className="space-y-6">
                {transactions.map((t) => (
                  <div key={t.id} className="flex justify-between items-center pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{t.salon}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t.date}</p>
                    </div>
                    <div className={`font-black ${t.points.startsWith("+") ? "text-green-500" : "text-primary"}`}>{t.points}</div>
                  </div>
                ))}
              </div>
              <button className="btn btn-ghost btn-block mt-8 text-[10px] font-black uppercase tracking-widest border border-gray-100">View All History</button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. HOW TO EARN SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[40px] p-12 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <Wallet />, title: "Book Services", desc: "Earn 1pt for every $1 spent on any treatment." },
              { icon: <Star />, title: "Leave Reviews", desc: "Get 50pts for every verified photo review you post." },
              { icon: <ArrowUpRight />, title: "Refer Friends", desc: "Unlock 200pts when a friend makes their first booking." },
            ].map((way, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">{way.icon}</div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-800 mb-2">{way.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{way.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoyaltyPointsPage;
