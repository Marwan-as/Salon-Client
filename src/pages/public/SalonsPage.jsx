import { useState, useEffect } from "react";
import NoItems from "../../components/NoItems";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useSearchParams } from "react-router";
import { Search, MapPin, Pin, PinOff, SlidersHorizontal, ChevronDown } from "lucide-react";
const salonsData = [
  {
    id: 1,
    name: "Glamour Studio",
    description: "Luxury salon offering hair, nails, and spa services.",
    image: "https://placehold.co/400x250?text=Glamour+Studio",
    services: ["Haircut", "Nails", "Spa"],
    location: "Beirut",
  },
  {
    id: 2,
    name: "Bella Beauty",
    description: "Professional makeup and skincare treatments.",
    image: "https://placehold.co/400x250?text=Bella+Beauty",
    services: ["Makeup", "Skincare"],
    location: "Tripoli",
  },
  {
    id: 3,
    name: "Urban Cuts",
    description: "Trendy hair salon specializing in modern cuts and coloring.",
    image: "https://placehold.co/400x250?text=Urban+Cuts",
    services: ["Haircut", "Coloring"],
    location: "Beirut",
  },
  {
    id: 4,
    name: "Serenity Spa",
    description: "Relax and rejuvenate with our massage and spa therapies.",
    image: "https://placehold.co/400x250?text=Serenity+Spa",
    services: ["Spa", "Massage"],
    location: "Sidon",
  },
  {
    id: 5,
    name: "Elite Looks",
    description: "High-end salon offering bridal packages and premium styling.",
    image: "https://placehold.co/400x250?text=Elite+Looks",
    services: ["Bridal", "Makeup", "Hair Styling"],
    location: "Beirut",
  },
  {
    id: 6,
    name: "Nail Heaven",
    description: "Specialized nail art and manicure/pedicure salon.",
    image: "https://placehold.co/400x250?text=Nail+Heaven",
    services: ["Nail Art", "Manicure", "Pedicure"],
    location: "Jounieh",
  },
  {
    id: 7,
    name: "Royal Touch",
    description: "Premium grooming for men and women with modern styles.",
    image: "https://placehold.co/400x250?text=Royal+Touch",
    services: ["Haircut", "Beard Trim", "Coloring"],
    location: "Zahle",
  },
  {
    id: 8,
    name: "Glow Aesthetics",
    description: "Advanced skincare, facials, and anti-aging treatments.",
    image: "https://placehold.co/400x250?text=Glow+Aesthetics",
    services: ["Facial", "Skincare", "Laser"],
    location: "Byblos",
  },
  {
    id: 9,
    name: "Ocean Breeze Spa",
    description: "Sea-inspired spa and wellness therapies.",
    image: "https://placehold.co/400x250?text=Ocean+Breeze+Spa",
    services: ["Spa", "Massage", "Hydrotherapy"],
    location: "Tyre",
  },
  {
    id: 10,
    name: "Chic & Shine",
    description: "Trendy salon for quick makeovers and stylish looks.",
    image: "https://placehold.co/400x250?text=Chic+%26+Shine",
    services: ["Haircut", "Blow Dry", "Makeup"],
    location: "Beirut",
  },
];

const availableServices = ["Haircut", "Nails", "Spa", "Makeup", "Skincare", "Coloring", "Massage"];

// Auto-generate location options from salonsData
const availableLocations = [...new Set(salonsData.map((salon) => salon.location))];

const SalonsPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // New State: Pin Toggle
  const [isPinned, setIsPinned] = useState(false);
  // New state: Toolbar expansion
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredSalons = salonsData.filter((salon) => {
    const matchesSearch = salon.name.toLowerCase().includes(search.toLowerCase());
    const matchesService = selectedService ? salon.services.includes(selectedService) : true;
    const matchesLocation = selectedLocation ? salon.location === selectedLocation : true;
    return matchesSearch && matchesService && matchesLocation;
  });

  useEffect(() => {
    // 1. Check if there is a 'service' in the URL
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setSelectedService(serviceParam);
    }

    // 2. Check if we came from the Services page and need to expand
    if (location.state?.expandFilters || serviceParam) {
      setIsExpanded(true);
    }

    // Optional: Clear the state so it doesn't stay expanded if they refresh
    window.history.replaceState({}, document.title);
  }, [searchParams, location.state]);

  return (
    <div className="min-h-screen bg-base-300">
      {/* Hero Section - The "Source" of the toolbar */}
      <section className="bg-white pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black tracking-tighter text-gray-800 mb-4">
            Discover <span className="text-primary">Salons</span>
          </motion.h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Premium grooming and wellness experiences, curated for you.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* Search & Filters Toolbar */}
        <div className={`z-[40] transition-all duration-500 ease-in-out ${isPinned ? "sticky top-24 mt-4" : "relative -mt-10"}`}>
          <div
            className={`flex flex-col gap-4 p-4 transition-all duration-500 ${
              isPinned
                ? "bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20"
                : "bg-white rounded-b-3xl rounded-t-none border-x border-b border-gray-100 shadow-xl shadow-gray-400/10"
            }`}
          >
            {/* Main Row: Search + Expand Toggle + Pin */}
            <div className="flex items-center gap-3 w-full">
              {/* Search Input Container */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by salon name..."
                  className="input input-bordered w-full pl-12 h-12 focus:outline-primary border-gray-200 bg-gray-50/50 backdrop-blur-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`btn h-12 px-4 flex items-center gap-2 transition-all duration-300 ${
                  isExpanded ? "btn-primary shadow-md" : "btn-ghost border border-gray-200 text-gray-600"
                }`}
              >
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">{isExpanded ? "Hide Filters" : "Filters"}</span>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              {/* Advanced Pin Toggle */}
              <button
                onClick={() => setIsPinned(!isPinned)}
                className={`btn btn-circle h-12 w-12 min-h-[3rem] transition-all duration-300 ${
                  isPinned ? "btn-primary shadow-lg scale-110" : "btn-ghost text-gray-400 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <motion.div animate={{ rotate: isPinned ? 45 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                  {isPinned ? <Pin size={20} /> : <PinOff size={20} />}
                </motion.div>
              </button>
            </div>

            {/* Expandable Controls Row */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 px-2 pb-2 border-t border-gray-100/50 mt-2">
                    <select
                      className={`select select-bordered h-12 w-full sm:flex-1 transition-all ${
                        selectedService ? "border-primary ring-1 ring-primary/20" : "border-gray-200"
                      } focus:outline-primary bg-white`}
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="">All Services</option>
                      {availableServices.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select select-bordered h-12 w-full sm:flex-1 focus:outline-primary border-gray-200 bg-white"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {availableLocations.map((l, i) => (
                        <option key={i} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Salon Cards Grid */}
        <div className="mt-12">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSalons.length > 0 ? (
                filteredSalons.map((salon) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={salon.id}
                  >
                    <NavLink
                      to={`/salons/${salon.id}`}
                      className="group card bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full"
                    >
                      {/* Image Container with 'New' Tag */}
                      <figure className="relative overflow-hidden">
                        <img src={salon.image} alt={salon.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />

                        {/* Re-added 'New' Tag */}
                        {/* Logic: You can wrap this in a conditional like {salon.isNew && (...)} */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg ring-2 ring-white/20">
                            New
                          </span>
                        </div>
                      </figure>

                      <div className="card-body p-5">
                        <h2 className="card-title text-gray-800 font-bold group-hover:text-primary transition-colors">{salon.name}</h2>

                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
                          <MapPin size={14} className="text-primary" />
                          {salon.location}
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
                          {salon.services.slice(0, 3).map((service, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-bold bg-gray-100 text-gray-500 transition-colors group-hover:bg-primary/5 group-hover:text-primary"
                            >
                              {service}
                            </span>
                          ))}
                          {salon.services.length > 3 && <span className="text-[10px] text-gray-400 py-1">+{salon.services.length - 3} more</span>}
                        </div>
                      </div>
                    </NavLink>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <NoItems title="No salons match your filters." />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
export default SalonsPage;
