import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFemale, FaMale, FaUserCircle, FaSignOutAlt, FaCalendarAlt, FaStar, FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onGenderChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState("female");
  const navigate = useNavigate();

  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const theme = gender === "female" ? "silk" : "nord";
    document.querySelector("html").setAttribute("data-theme", theme);
    if (typeof onGenderChange === "function") onGenderChange(gender);
  }, [gender, onGenderChange]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary ${isActive ? "text-primary" : "text-gray-400"}`;

  const navLinks = [
    { to: "/salons", label: "Salons" },
    { to: "/services", label: "Services" },
    { to: "/memberships", label: "Memberships" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="navbar bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-12 sticky top-0 z-[100] h-24">
      {/* 1. LEFT: LOGO & GENDER TOGGLE */}
      <div className="flex-1 flex items-center gap-4 md:gap-6">
        <NavLink to="/" className="text-xl md:text-2xl font-black tracking-tighter text-gray-800 uppercase shrink-0">
          Salon<span className="text-primary">Hub</span>
        </NavLink>

        <div className="flex items-center bg-gray-100 p-1 rounded-full gap-1 scale-90 md:scale-100">
          <button
            onClick={() => setGender("female")}
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all ${
              gender === "female" ? "bg-white shadow-sm text-pink-500" : "text-gray-400"
            }`}
          >
            <FaFemale size={14} />
          </button>
          <button
            onClick={() => setGender("male")}
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all ${
              gender === "male" ? "bg-white shadow-sm text-blue-500" : "text-gray-400"
            }`}
          >
            <FaMale size={14} />
          </button>
        </div>
      </div>

      {/* 2. CENTER: NAV LINKS (Desktop Only) */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass}>
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* 3. RIGHT: CONDITIONAL AUTH VIEW */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        {!isLoggedIn ? (
          /* GUEST VIEW - Added ml-10 to separate from center NavLinks */
          <div className="hidden md:flex items-center gap-2 ml-10">
            <NavLink to="/login" className="btn btn-ghost btn-sm text-[10px] font-black uppercase tracking-widest">
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-primary btn-sm px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              Join
            </NavLink>
          </div>
        ) : (
          /* LOGGED IN VIEW */
          <div className="flex items-center gap-3 md:gap-4 ml-6">
            <NavLink
              to="/loyalty"
              className="hidden sm:flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10 hover:bg-primary/10 transition-colors"
            >
              <FaStar className="text-primary text-xs" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{user?.points || 0} pts</span>
            </NavLink>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-9 md:w-10 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}`} alt="avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-4 z-[1] p-4 shadow-2xl menu menu-sm dropdown-content bg-white rounded-[24px] w-64 border border-gray-100">
                <li className="px-4 py-3 border-b border-gray-50 mb-2">
                  <p className="font-black text-gray-800 uppercase tracking-tighter text-lg leading-none">{user?.name || "Member"}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user?.role || "Customer"}</p>
                </li>
                {user?.role === "owner" && (
                  <li>
                    <NavLink to="/salon-manager" className="py-3 font-black uppercase text-[10px] tracking-widest text-primary">
                      <FaCog /> Salon Manager
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/dashboard" className="py-3 font-bold uppercase text-[10px] tracking-widest">
                    <FaCalendarAlt className="text-primary" /> My Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings" className="py-3 font-bold uppercase text-[10px] tracking-widest">
                    <FaCog className="text-primary" /> Account Settings
                  </NavLink>
                </li>
                <li className="mt-2 pt-2 border-t border-gray-50">
                  <button onClick={handleLogout} className="py-3 font-bold uppercase text-[10px] tracking-widest text-red-500">
                    <FaSignOutAlt /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Mobile Toggle */}
        <button className="lg:hidden btn btn-ghost btn-circle" onClick={() => setIsOpen(!isOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="absolute top-24 left-0 w-full bg-white border-b shadow-2xl flex flex-col p-8 gap-6 lg:hidden animate-in slide-in-from-top duration-300 z-50">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm font-black uppercase tracking-widest border-b border-gray-50 pb-4"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {!isLoggedIn ? (
            <div className="flex flex-col gap-3 mt-4">
              <NavLink to="/login" className="btn btn-outline border-gray-200 rounded-2xl uppercase text-[10px] font-black" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary rounded-2xl uppercase text-[10px] font-black" onClick={() => setIsOpen(false)}>
                Join Now
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              <NavLink to="/dashboard" className="btn btn-ghost justify-start uppercase text-[10px] font-black" onClick={() => setIsOpen(false)}>
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="btn btn-error btn-outline rounded-2xl uppercase text-[10px] font-black">
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
