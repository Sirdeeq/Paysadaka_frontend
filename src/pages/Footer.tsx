import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Contact Info */}
          <div className="text-gray-600 text-sm text-center md:text-left">
            <p>
              Contact us at:{' '}
              <a
                href="mailto:support@example.com"
                className="text-emerald-600 hover:underline"
              >
                support@example.com
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy-policy" className="hover:underline text-gray-600">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:underline text-gray-600">
              Terms of Service
            </Link>
            <Link to="/about" className="hover:underline text-gray-600">
              About Us
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-sm text-center md:text-right">
            <p>
              &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
