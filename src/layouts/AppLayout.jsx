import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

const AppLayout = () => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  const isDashboardView = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/salon-manager") || location.pathname.startsWith("/book"); // Added booking to view list

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />

      <main className="flex-grow flex flex-col relative">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-grow flex flex-col"
        >
          <Outlet />
        </motion.div>
      </main>

      {!isDashboardView && <Footer />}
    </div>
  );
};

export default AppLayout;
