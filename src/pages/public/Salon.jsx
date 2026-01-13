import { useParams, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, Clock, Phone, Mail, CalendarCheck, Star, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const salonsData = [
  {
    id: 1,
    name: "Glamour Studio",
    description: "Luxury salon offering hair, nails, and spa services.",
    image: "https://placehold.co/400x250?text=Glamour+Studio",
    address: "123 Fashion St",
    city: "Beirut",
    street: "Fashion St",
    country: "Lebanon",
    postal_code: "1100",
    phone: "+96170123456",
    email: "contact@glamourstudio.com",
    opening_hours: "Mon-Sat: 9am - 8pm",
    services: ["Haircut", "Nails", "Spa"],
    staff: [
      {
        id: 1,
        salon_id: 1,
        user_id: 101,
        name: "Alice Johnson",
        image: "https://placehold.co/100x100?text=Alice",
        position: "Hair Stylist",
        bio: "Expert in modern haircuts and coloring.",
        available_hours: "Mon-Fri: 10am - 6pm",
      },
      {
        id: 2,
        salon_id: 1,
        user_id: 102,
        name: "Maya Smith",
        image: "https://placehold.co/100x100?text=Maya",
        position: "Nail Technician",
        bio: "Specializes in manicures and nail art.",
        available_hours: "Tue-Sat: 11am - 7pm",
      },
    ],
  },
  {
    id: 2,
    name: "Bella Beauty",
    description: "Professional makeup and skincare treatments.",
    image: "https://placehold.co/400x250?text=Bella+Beauty",
    address: "45 Beauty Ave",
    city: "Tripoli",
    street: "Beauty Ave",
    country: "Lebanon",
    postal_code: "1300",
    phone: "+96171987654",
    email: "info@bellabeauty.com",
    opening_hours: "Mon-Sun: 10am - 7pm",
    services: ["Makeup", "Skincare"],
    staff: [
      {
        id: 3,
        salon_id: 2,
        user_id: 103,
        name: "Sophia Lee",
        image: "https://placehold.co/100x100?text=Sophia",
        position: "Makeup Artist",
        bio: "Creates stunning makeup looks for all occasions.",
        available_hours: "Mon-Sat: 10am - 6pm",
      },
      {
        id: 4,
        salon_id: 2,
        user_id: 104,
        name: "Lina Brown",
        image: "https://placehold.co/100x100?text=Lina",
        position: "Skincare Specialist",
        bio: "Facials and advanced skincare treatments.",
        available_hours: "Tue-Sun: 11am - 7pm",
      },
    ],
  },
  {
    id: 3,
    name: "Urban Cuts",
    description: "Trendy hair salon specializing in modern cuts and coloring.",
    image: "https://placehold.co/400x250?text=Urban+Cuts",
    address: "77 Trendy Blvd",
    city: "Beirut",
    street: "Trendy Blvd",
    country: "Lebanon",
    postal_code: "1100",
    phone: "+96170111222",
    email: "hello@urbancuts.com",
    opening_hours: "Mon-Sat: 9am - 7pm",
    services: ["Haircut", "Coloring"],
    staff: [
      {
        id: 5,
        salon_id: 3,
        user_id: 105,
        name: "Emma Davis",
        image: "https://placehold.co/100x100?text=Emma",
        position: "Senior Hair Stylist",
        bio: "Trendy cuts and professional coloring.",
        available_hours: "Mon-Fri: 9am - 5pm",
      },
      {
        id: 6,
        salon_id: 3,
        user_id: 106,
        name: "Olivia White",
        image: "https://placehold.co/100x100?text=Olivia",
        position: "Junior Stylist",
        bio: "Assists with styling and coloring services.",
        available_hours: "Tue-Sat: 10am - 6pm",
      },
    ],
  },
  {
    id: 4,
    name: "Serenity Spa",
    description: "Relax and rejuvenate with our massage and spa therapies.",
    image: "https://placehold.co/400x250?text=Serenity+Spa",
    address: "12 Calm Street",
    city: "Sidon",
    street: "Calm Street",
    country: "Lebanon",
    postal_code: "1200",
    phone: "+96170133445",
    email: "contact@serenityspa.com",
    opening_hours: "Mon-Sun: 10am - 8pm",
    services: ["Spa", "Massage"],
    staff: [
      {
        id: 7,
        salon_id: 4,
        user_id: 107,
        name: "Nora Wilson",
        image: "https://placehold.co/100x100?text=Nora",
        position: "Massage Therapist",
        bio: "Expert in deep tissue and relaxation massages.",
        available_hours: "Mon-Sat: 10am - 6pm",
      },
      {
        id: 8,
        salon_id: 4,
        user_id: 108,
        name: "Chloe Taylor",
        image: "https://placehold.co/100x100?text=Chloe",
        position: "Spa Specialist",
        bio: "Facials and holistic spa treatments.",
        available_hours: "Tue-Sun: 11am - 7pm",
      },
    ],
  },
  {
    id: 5,
    name: "Elite Looks",
    description: "High-end salon offering bridal packages and premium styling.",
    image: "https://placehold.co/400x250?text=Elite+Looks",
    address: "90 Luxury Rd",
    city: "Beirut",
    street: "Luxury Rd",
    country: "Lebanon",
    postal_code: "1100",
    phone: "+96170223344",
    email: "info@elitelooks.com",
    opening_hours: "Mon-Sat: 9am - 8pm",
    services: ["Bridal", "Makeup", "Hair Styling"],
    staff: [
      {
        id: 9,
        salon_id: 5,
        user_id: 109,
        name: "Grace Allen",
        image: "https://placehold.co/100x100?text=Grace",
        position: "Bridal Specialist",
        bio: "Expert in bridal styling and makeup.",
        available_hours: "Mon-Fri: 9am - 5pm",
      },
      {
        id: 10,
        salon_id: 5,
        user_id: 110,
        name: "Ella Scott",
        image: "https://placehold.co/100x100?text=Ella",
        position: "Hair Stylist",
        bio: "Premium haircuts and styling.",
        available_hours: "Tue-Sat: 10am - 6pm",
      },
    ],
  },
  {
    id: 6,
    name: "Nail Heaven",
    description: "Specialized nail art and manicure/pedicure salon.",
    image: "https://placehold.co/400x250?text=Nail+Heaven",
    address: "56 Nail Street",
    city: "Jounieh",
    street: "Nail Street",
    country: "Lebanon",
    postal_code: "1201",
    phone: "+96170334455",
    email: "contact@nailheaven.com",
    opening_hours: "Mon-Sat: 10am - 7pm",
    services: ["Nail Art", "Manicure", "Pedicure"],
    staff: [
      {
        id: 11,
        salon_id: 6,
        user_id: 111,
        name: "Zoe King",
        image: "https://placehold.co/100x100?text=Zoe",
        position: "Nail Artist",
        bio: "Creative nail art and professional manicure/pedicure.",
        available_hours: "Mon-Fri: 10am - 6pm",
      },
      {
        id: 12,
        salon_id: 6,
        user_id: 112,
        name: "Mia Harris",
        image: "https://placehold.co/100x100?text=Mia",
        position: "Assistant",
        bio: "Assists in nail care and customer service.",
        available_hours: "Tue-Sat: 11am - 7pm",
      },
    ],
  },
  {
    id: 7,
    name: "Royal Touch",
    description: "Premium grooming for men and women with modern styles.",
    image: "https://placehold.co/400x250?text=Royal+Touch",
    address: "15 Royal Ave",
    city: "Zahle",
    street: "Royal Ave",
    country: "Lebanon",
    postal_code: "1400",
    phone: "+96170445566",
    email: "info@royaltouch.com",
    opening_hours: "Mon-Sat: 9am - 7pm",
    services: ["Haircut", "Beard Trim", "Coloring"],
    staff: [
      {
        id: 13,
        salon_id: 7,
        user_id: 113,
        name: "Liam Moore",
        image: "https://placehold.co/100x100?text=Liam",
        position: "Hair Stylist",
        bio: "Men and women's haircuts.",
        available_hours: "Mon-Fri: 9am - 5pm",
      },
      {
        id: 14,
        salon_id: 7,
        user_id: 114,
        name: "Noah Walker",
        image: "https://placehold.co/100x100?text=Noah",
        position: "Barber",
        bio: "Professional beard trimming and styling.",
        available_hours: "Tue-Sat: 10am - 6pm",
      },
    ],
  },
  {
    id: 8,
    name: "Glow Aesthetics",
    description: "Advanced skincare, facials, and anti-aging treatments.",
    image: "https://placehold.co/400x250?text=Glow+Aesthetics",
    address: "22 Glow St",
    city: "Byblos",
    street: "Glow St",
    country: "Lebanon",
    postal_code: "1301",
    phone: "+96170556677",
    email: "contact@glowaesthetics.com",
    opening_hours: "Mon-Sun: 10am - 8pm",
    services: ["Facial", "Skincare", "Laser"],
    staff: [
      {
        id: 15,
        salon_id: 8,
        user_id: 115,
        name: "Ava Perez",
        image: "https://placehold.co/100x100?text=Ava",
        position: "Facialist",
        bio: "Advanced skincare treatments.",
        available_hours: "Mon-Fri: 10am - 6pm",
      },
      {
        id: 16,
        salon_id: 8,
        user_id: 116,
        name: "Isabella Roberts",
        image: "https://placehold.co/100x100?text=Isabella",
        position: "Laser Specialist",
        bio: "Laser treatments and anti-aging therapies.",
        available_hours: "Tue-Sun: 11am - 7pm",
      },
    ],
  },
  {
    id: 9,
    name: "Ocean Breeze Spa",
    description: "Sea-inspired spa and wellness therapies.",
    image: "https://placehold.co/400x250?text=Ocean+Breeze+Spa",
    address: "33 Ocean Rd",
    city: "Tyre",
    street: "Ocean Rd",
    country: "Lebanon",
    postal_code: "1401",
    phone: "+96170667788",
    email: "info@oceanbreezespa.com",
    opening_hours: "Mon-Sun: 10am - 8pm",
    services: ["Spa", "Massage", "Hydrotherapy"],
    staff: [
      {
        id: 17,
        salon_id: 9,
        user_id: 117,
        name: "Mason Hill",
        image: "https://placehold.co/100x100?text=Mason",
        position: "Massage Therapist",
        bio: "Relaxation and hydrotherapy expert.",
        available_hours: "Mon-Sat: 10am - 6pm",
      },
      {
        id: 18,
        salon_id: 9,
        user_id: 118,
        name: "Ethan Young",
        image: "https://placehold.co/100x100?text=Ethan",
        position: "Spa Therapist",
        bio: "Spa treatments and wellness therapies.",
        available_hours: "Tue-Sun: 11am - 7pm",
      },
    ],
  },
  {
    id: 10,
    name: "Chic & Shine",
    description: "Trendy salon for quick makeovers and stylish looks.",
    image: "https://placehold.co/400x250?text=Chic+%26+Shine",
    address: "88 Chic Ln",
    city: "Beirut",
    street: "Chic Ln",
    country: "Lebanon",
    postal_code: "1100",
    phone: "+96170778899",
    email: "contact@chicandshine.com",
    opening_hours: "Mon-Sat: 9am - 7pm",
    services: ["Haircut", "Blow Dry", "Makeup"],
    staff: [
      {
        id: 19,
        salon_id: 10,
        user_id: 119,
        name: "Harper Adams",
        image: "https://placehold.co/100x100?text=Harper",
        position: "Hair Stylist",
        bio: "Trendy haircuts and blow-dry styling.",
        available_hours: "Mon-Fri: 9am - 5pm",
      },
      {
        id: 20,
        salon_id: 10,
        user_id: 120,
        name: "Charlotte Martin",
        image: "https://placehold.co/100x100?text=Charlotte",
        position: "Makeup Artist",
        bio: "Quick and professional makeovers.",
        available_hours: "Tue-Sat: 10am - 6pm",
      },
    ],
  },
];

const Salon = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedService, setSelectedService] = useState(null);

  const salon = salonsData.find((s) => s.id === parseInt(id));

  if (!salon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-base-300 px-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-800">
          Salon not <span className="text-primary">found.</span>
        </h2>
        <NavLink to="/salons" className="btn btn-primary mt-8 rounded-2xl px-10 font-black uppercase tracking-widest">
          Return to Discovery
        </NavLink>
      </div>
    );
  }

  // ADAPTIVE ACTION: Check auth before booking
  const handleBookingClick = () => {
    if (!isLoggedIn) {
      // Save current salon path so they return here after login
      navigate("/login", { state: { from: location } });
    } else {
      // Proceed to booking flow (e.g., /book/1)
      console.log("Proceeding to book service:", selectedService || "General");
      navigate(`/book/${id}`, { state: { service: selectedService } });
    }
  };

  return (
    <div className="min-h-screen bg-base-300">
      {/* 1. SEAMLESS HERO HEADER */}
      <section className="bg-white border-b border-gray-100 pt-10 pb-24 px-6 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[120%] bg-primary/5 rounded-full blur-3xl -rotate-12 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <NavLink to="/salons" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all mb-8 w-fit group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Salons</span>
          </NavLink>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  <Star size={14} fill="currentColor" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Top Rated Studio</span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter text-gray-800 mb-6 leading-[0.9] uppercase italic">
                {salon.name.split(" ")[0]} <br />
                <span className="text-primary text-outline">{salon.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-8">
                <MapPin size={16} strokeWidth={3} />
                <span>
                  {salon.city}, {salon.country}
                </span>
              </div>
              <p className="text-gray-500 text-lg max-w-xl leading-relaxed font-medium italic">"{salon.description}"</p>
            </motion.div>

            {/* Image Card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:w-1/2 w-full">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={salon.image} alt={salon.name} className="w-full h-[450px] object-cover" />
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                    <ShieldCheck className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-800 italic">Sanitized & Safe</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 pb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Interactive Services Selector */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-800 italic">Services</h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Select a treatment to begin</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {salon.services.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedService(service)}
                    className={`px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 text-center
                      ${
                        selectedService === service
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-95"
                          : "bg-gray-50 border-transparent text-gray-500 hover:border-gray-200"
                      }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Staff Section */}
            <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-800 mb-8 italic">Artistic Team</h2>
              <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide">
                {salon.staff?.map((member) => (
                  <div
                    key={member.id}
                    className="min-w-[280px] bg-gray-50 rounded-[32px] p-8 border border-transparent hover:border-primary/20 transition-all group"
                  >
                    <div className="relative w-24 h-24 mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-3xl object-cover shadow-xl group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                        <Star size={12} fill="currentColor" />
                      </div>
                    </div>
                    <h3 className="font-black text-gray-800 uppercase tracking-tighter text-xl">{member.name}</h3>
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">{member.position}</p>
                    <p className="text-sm text-gray-500 leading-relaxed italic line-clamp-3">"{member.bio}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:h-fit lg:sticky lg:top-28">
            <div className="bg-gray-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              {/* Card background decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

              <h2 className="text-3xl font-black mb-8 tracking-tighter uppercase italic">
                Stay <br />
                <span className="text-primary">Connected.</span>
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-5 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Clock className="text-primary group-hover:text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Hours</p>
                    <span className="text-sm font-bold">{salon.opening_hours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Phone className="text-primary group-hover:text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Direct Line</p>
                    <span className="text-sm font-bold">{salon.phone}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Location</p>
                  <p className="text-sm font-bold leading-relaxed">
                    {salon.address}, {salon.street}
                    <br />
                    {salon.city}, {salon.postal_code}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBookingClick}
                className="btn btn-primary btn-block h-16 rounded-[24px] text-[12px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 border-none transition-all hover:scale-[1.02] active:scale-95"
              >
                <CalendarCheck size={20} />
                {isLoggedIn ? "Confirm Booking" : "Sign in to Book"}
              </button>

              {!isLoggedIn && (
                <p className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-4">Quick login required to secure slot</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Salon;
