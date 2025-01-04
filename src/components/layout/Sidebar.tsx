import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem } from '../../types';

interface SidebarProps {
  menuItems: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold text-emerald-600">Dashboard</h2>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${
                location.pathname === item.path
                  ? 'bg-emerald-50 text-emerald-600'
                  : ''
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};