import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LiveSupport } from '../components/common/LiveSupport';
import StickyButton from '../pages/StickyButton';
import { Footer } from '../pages/Footer';

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
      {/* Header Section */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/">
          <img
            src="../src/assets/images/Paysadaqa.png" // Update this path to your logo's location
            alt="Website Logo"
            className="w-20 sm:w-24 md:w-32 lg:w-40 h-auto"
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-gray-500 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          id="mobile-menu-toggle"
          onClick={() => {
            const menu = document.getElementById('mobile-menu');
            menu?.classList.toggle('hidden');
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className="hidden md:hidden bg-white shadow-md p-4"
      >
        <ul className="flex flex-col space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-gray-500 transition-colors font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 mb-6 mt-6 px-6">
        <Outlet />
      </main>

      {/* Live Support Section */}
      <LiveSupport />
      <Footer />
      <StickyButton />  

    </div>
  );
};
