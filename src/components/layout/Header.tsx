"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, Bell, User, LogOut, Search } from "lucide-react"
// import { ChurchIcon as Mosque } from "lucide-react"
import Logo from "../../../public/images/Paysadaqa.png";


interface HeaderProps {
  menuItems: { label: string; path: string }[]
  isDashboard?: boolean
  onLogout?: () => void
}

export const Header: React.FC<HeaderProps> = ({ menuItems, isDashboard, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1 rounded-md hover:bg-gray-100">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* <Link to="/" className="flex items-center gap-2">
              <Mosque className="h-7 w-7 text-emerald-600 hidden sm:block" />
              <span className="text-xl font-bold text-emerald-700">PaySadaka</span>
            </Link> */}
            <Link to="/" className="text-2xl font-bold text-emerald-600">
            <img
              src={Logo}
              className="w-16 h-40 object-contain"
              alt="paysadaka logo"
            />
          </Link>
          </div>

          {isDashboard && (
            <div className="hidden md:flex items-center bg-gray-50 rounded-md px-3 py-1.5 flex-1 max-w-md mx-4">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          )}

          {isDashboard ? (
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </Link>
                    <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Settings
                    </Link>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <Link key={item.path} to={item.path} className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
