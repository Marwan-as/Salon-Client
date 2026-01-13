import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Calendar, Star, Clock, MapPin, ArrowRight, History, TicketPercent, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();

  // MOCK DATA: In the future, this will come from an API call using user.id
  const upcomingAppointments = [
    {
      id: 1,
      salonName: "Glow & Co. Studio",
      service: "Premium Balayage",
      date: "Oct 24, 2025",
      time: "14:30",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const stats = [
    { label: "Loyalty Points", value: user?.points || 0, icon: Star, color: "text-yellow-500" },
    { label: "Active Bookings", value: upcomingAppointments.length, icon: Calendar, color: "text-primary" },
    { label: "Vouchers", value: 3, icon: TicketPercent, color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* 1. WELCOME HEADER */}
      <section className="bg-white border-b border-gray-100 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Customer Portal</p>
              <h1 className="text-5xl font-black tracking-tighter text-gray-800 uppercase italic leading-none">
                Welcome back, <br />
                <span className="text-outline text-primary">{user?.name?.split(" ")[0] || "Guest"}.</span>
              </h1>
            </div>

            <div className="flex gap-4">
              <Link to="/salons" className="btn btn-primary rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] h-14">
                Book New Session
              </Link>
            </div>
          </motion.div>

          {/* STATS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-gray-800 tracking-tighter">{stat.value}</p>
                </div>
                <div
                  className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}
                >
                  <stat.icon size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: UPCOMING & HISTORY */}
        <div className="lg:col-span-2 space-y-8">
          {/* UPCOMING APPOINTMENT CARD */}
          <section>
            <div className="flex justify-between items-center mb-6 px-2">
              <h2 className="text-xl font-black uppercase tracking-tighter text-gray-800 italic">Next Appointment</h2>
              <Link to="/account/bookings" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                View All
              </Link>
            </div>

            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[40px] overflow-hidden shadow-xl shadow-gray-200/50 flex flex-col md:flex-row border border-gray-100"
                >
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img src={apt.image} className="w-full h-full object-cover" alt="Salon" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Confirmed
                    </div>
                  </div>
                  <div className="p-8 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-gray-800 tracking-tight uppercase mb-1">{apt.salonName}</h3>
                      <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-6">{apt.service}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-gray-500">
                          <Calendar size={18} className="text-gray-300" />
                          <span className="text-sm font-bold">{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500">
                          <Clock size={18} className="text-gray-300" />
                          <span className="text-sm font-bold">{apt.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <button className="btn btn-primary flex-1 rounded-2xl font-black uppercase text-[10px] tracking-widest">Reschedule</button>
                      <button className="btn btn-ghost border-gray-100 flex-1 rounded-2xl font-black uppercase text-[10px] tracking-widest text-gray-400">
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No upcoming sessions</p>
              </div>
            )}
          </section>

          {/* QUICK REBOOK */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-100">
            <h2 className="text-xl font-black uppercase tracking-tighter text-gray-800 mb-6 italic">Recent Stylists</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center min-w-[100px] group cursor-pointer">
                  <div className="w-16 h-16 rounded-full ring-2 ring-transparent group-hover:ring-primary ring-offset-4 transition-all mb-3 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="stylist" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-primary">Marco P.</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: LOYALTY & SETTINGS */}
        <div className="space-y-8">
          {/* LOYALTY CARD */}
          <section className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <h2 className="text-lg font-black uppercase tracking-widest mb-8 italic">
              Rewards <span className="text-primary">Status</span>
            </h2>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <p className="text-3xl font-black italic tracking-tighter">
                  845 <span className="text-sm uppercase text-gray-500 not-italic">pts</span>
                </p>
                <p className="text-[10px] font-black text-primary uppercase">Gold Member</p>
              </div>
              <progress className="progress progress-primary w-full h-3 rounded-full bg-white/10" value="84.5" max="100"></progress>
              <p className="text-[10px] font-bold text-gray-500 uppercase mt-4 tracking-widest">155 pts until your next free treatment</p>
            </div>

            <Link
              to="/loyalty"
              className="btn btn-outline border-white/10 text-white btn-block rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Redeem Rewards
            </Link>
          </section>

          {/* MINI SETTINGS LINKS */}
          <section className="bg-white rounded-[40px] p-8 border border-gray-100">
            <ul className="space-y-2">
              {[
                { label: "Profile Settings", icon: History, to: "/settings" },
                { label: "Payment Methods", icon: TicketPercent, to: "/settings" },
                { label: "Email Preferences", icon: Clock, to: "/settings" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.to} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors group">
                    <div className="flex items-center gap-4">
                      <link.icon size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{link.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
