import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem } from '../../types';

interface BottomNavProps {
  menuItems: MenuItem[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ menuItems }) => {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
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
              {Icon && <Icon className="w-5 h-5" />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};