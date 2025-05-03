import type React from "react"
import { Link, useLocation } from "react-router-dom"
import type { MenuItem } from "../../types"
import { ChevronRight } from "lucide-react"
import Logo from "../../../public/images/Paysadaqa.png";


interface SidebarProps {
  menuItems: MenuItem[]
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const location = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white shadow-md min-h-screen z-10">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-bold text-emerald-600">
            <img
              src={Logo}
              className="w-60 h-40 object-contain"
              alt="paysadaka logo"
            />
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
      </div>

      <div className="p-4">
        <div className="bg-emerald-50 rounded-lg p-3 mb-6">
          <div className="flex items-center gap-2 text-emerald-700">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <p className="text-sm font-medium">Active Account</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 pl-4">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-2">
        <div className="mb-2 px-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Main Menu</p>
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2.5 my-1 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
              }`}
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-gray-500"}`} />}
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-emerald-600" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-white">
          <h3 className="font-medium mb-1">Need Help?</h3>
          <p className="text-xs opacity-90 mb-3">Contact our support team for assistance</p>
          <button className="text-xs bg-white text-emerald-700 px-3 py-1.5 rounded-md font-medium hover:bg-opacity-90 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  )
}
