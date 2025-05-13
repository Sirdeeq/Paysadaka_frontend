import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-600 text-tertiary py-8">
      <div className="container mx-auto px-6">
        {/* nurseryer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About paysadaqa</h3>
            <p className="text-emerald-50">
              paysadaqa Donation Platform simplifies secure donations for Masjids
              worldwide, bridging the gap between donors and Masjids.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-emerald-50 text-y space-y-2">
              <li>
                 <Link to="/Services"className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/Features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <a href="/Contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-emerald-50">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 hover:text-yellow-200" />
              Email:{" "}
              <a
                href="mailto:paysadaqa@gmail.com"
                className="text-emerald-50 hover:underline"
              >
                paysadaqa@gmail.com
              </a>
            </p>
            <p className="text-emerald-50">
              <FontAwesomeIcon icon={faPhone} className="mr-2 hover:text-yellow-200" />
              Phone: +234 806 601 1841
            </p>
            <p className="text-emerald-50">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 hover:text-yellow-200" />
              Address: professor m/kaba Street, near old Airport, kano state,Nigeria-Branch office: no,52 kokoro abu Street lagos, Nigeria
              RC: 8384409
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-emerald-50 pt-4 text-center">
          <p className="text-emerald-50 text-sm">
            &copy; 2025 paysadaqa Donation Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
