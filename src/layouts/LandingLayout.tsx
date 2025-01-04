import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { LiveSupport } from '../components/common/LiveSupport';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Donation', path: '/donation' },
  { label: 'Contact', path: '/contact' },
  { label: 'New Masjid', path: '/new-masjid' },
  { label: 'New Charity', path: '/new-charity' },
  
];

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header menuItems={menuItems} />
      <main className="flex-1">
        <Outlet />
      </main>
      <LiveSupport />
    </div>
  );
};