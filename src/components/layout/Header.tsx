import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface HeaderProps {
  menuItems: { label: string; path: string }[];
  isDashboard?: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ menuItems, isDashboard, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            PaySadaka
          </Link>

          {isDashboard ? (
            <div className="flex items-center gap-4">
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};