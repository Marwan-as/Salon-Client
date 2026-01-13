import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import SalonsPage from "./pages/public/SalonsPage";
import Salon from "./pages/public/Salon";
import ServicesPage from "./pages/public/ServicesPage";
import AboutPage from "./pages/public/AboutPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// Authenticated Pages
import MembershipsPage from "./pages/customer/MembershipsPage";
import LoyaltyPointsPage from "./pages/customer/LoyaltyPointsPage";
import DashboardPage from "./pages/customer/DashboardPage";
import SettingsPage from "./pages/customer/SettingsPage";
import BookingPage from "./pages/customer/BookingPage"; // Import the new page

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      /* --- Public Routes --- */
      { path: "/", element: <LandingPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/salons", element: <SalonsPage /> },
      { path: "/salons/:id", element: <Salon /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },

      /* --- PROTECTED CUSTOMER ROUTES --- */
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      // NEW: Booking Route with Salon ID
      {
        path: "/book/:salonId",
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/loyalty",
        element: (
          <ProtectedRoute>
            <LoyaltyPointsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/memberships",
        element: (
          <ProtectedRoute>
            <MembershipsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },

      /* --- PROTECTED OWNER ROUTES --- */
      {
        path: "/salon-manager",
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <div className="p-20 text-center uppercase font-black">Owner Portal Coming Soon</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
