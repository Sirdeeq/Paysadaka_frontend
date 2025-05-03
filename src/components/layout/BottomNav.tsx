import type React from "react"
import { Link, useLocation } from "react-router-dom"
import type { MenuItem } from "../../types"

interface BottomNavProps {
  menuItems: MenuItem[]
}

export const BottomNav: React.FC<BottomNavProps> = ({ menuItems }) => {
  const location = useLocation()

  // Only show the first 5 menu items on mobile
  const mobileMenuItems = menuItems.slice(0, 5)

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-5 gap-1">
        {mobileMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link key={item.id} to={item.path} className="flex flex-col items-center gap-1 py-3 text-xs">
              <div className={`p-1.5 rounded-full ${isActive ? "bg-emerald-50" : ""}`}>
                {Icon && <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-gray-500"}`} />}
              </div>
              <span className={isActive ? "text-emerald-600 font-medium" : "text-gray-600"}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
