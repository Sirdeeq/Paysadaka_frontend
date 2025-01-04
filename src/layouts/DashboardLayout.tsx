import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { BottomNav } from "../components/layout/BottomNav";
import { LayoutDashboard, Building2, Heart, Currency } from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },
  {
    id: "masjids",
    label: "Masjids",
    path: "/dashboard/masjids",
    icon: Building2
  },
  {
    id: "charities",
    label: "Charities",
    path: "/dashboard/charities",
    icon: Heart
  },
  {
    id: "donations",
    label: "Donations",
    path: "/dashboard/donations",
    icon: Currency
  }
];

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminPassword");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 flex flex-col">
        <Header menuItems={[]} isDashboard onLogout={handleLogout} />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
        <BottomNav menuItems={menuItems} />
      </div>
    </div>
  );
};
