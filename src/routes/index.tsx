import { createBrowserRouter, Navigate } from "react-router-dom";
import { LandingLayout } from "../layouts/LandingLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Home } from "../pages/Home";
import { Services } from "../pages/Services";
import { Donation } from "../pages/Donation";
import { Contact } from "../pages/Contact";
import { Masjids } from "../pages/dashboard/Masjids";
import { Charities } from "../pages/dashboard/Charities";
import VerificationCard from "../components/common/VerificationCard";
import { MasjidForm } from "../components/dashboard/MasjidForm";
import { Donations } from "../pages/dashboard/Donations";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import { Footer } from "../pages/Footer";
import CharityForm from "../components/dashboard/CharityForm";

const isAuthenticated = () => {
  // Implement your authentication logic here (check local storage, cookies, or context)
  return localStorage.getItem("user") !== null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "donation", element: <Donation /> },
      { path: "contact", element: <Contact /> },
      { path: "new-masjid", element: <MasjidForm /> },
      { path: "new-charity", element: <CharityForm /> },
      {
        path: "verify-masjid/:id/:token",
        element: <VerificationCard type="masjid" />
      },
      {
        path: "verify-charity/:id/:token",
        element: <VerificationCard type="charity" />
      },
      {
        path: "login",
        element: isAuthenticated() ? <Navigate to="/" /> : <Login />
      },
      { path: "footer", element: <Footer /> }
    ]
  },
  {
    path: "dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "masjids", element: <Masjids /> },
          { path: "charities", element: <Charities /> },
          { path: "donations", element: <Donations /> }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
