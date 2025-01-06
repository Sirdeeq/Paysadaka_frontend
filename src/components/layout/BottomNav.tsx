import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem } from '../../types';

interface BottomNavProps {
  menuItems: MenuItem[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ menuItems }) => {
  const location = useLocation();

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-3 text-xs ${
                  location.pathname === item.path
                    ? 'text-emerald-600'
                    : 'text-gray-600'
                }`}
              >
                {Icon && <Icon className = "w-5 h-5" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <footer className="hidden lg:block bg-gray-100 border-t border-gray-300 py-4 text-center">
        <div className="container mx-auto text-gray-600 text-sm">
          <div className="flex flex-col items-center space-y-2">
            {/* Contact Info */}
            <p>Contact us at: <a href="mailto:support@example.com" className="text-emerald-600 hover:underline">support@example.com</a></p>

            {/* Links */}
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </div>

            {/* Copyright */}
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
