import React from 'react';
import { CTA } from '../components/common/CTA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faBook, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleDonateClick = () => {
    navigate('/donation');
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6 text-emerald-600">
            Empowering Masjids Through Donations
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
            PaySadaka makes it easy to contribute to mosques, ramadan and charities in your area.
            Join us in making a difference.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <CTA
        title="Ready to Make a Difference?"
        description="Join thousands of donors supporting their local communities"
        buttonText="Start Donating"
        onClick={handleDonateClick}
      />

      {/* Icon Grid Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Icon 1 */}
            <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-yellow-200 text-emerald-600 p-4 rounded-full">
                  <FontAwesomeIcon icon={faLock} size="2x" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Donations</h3>
              <p className="text-gray-600">
                Your contributions are processed with top-tier security protocols.
              </p>
            </div>

            {/* Icon 2 */}
            <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-yellow-200 text-emerald-600 p-4 rounded-full">
                  <FontAwesomeIcon icon={faBook} size="2x" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Transparent Records</h3>
              <p className="text-gray-600">
                Track all donations with detailed transaction records.
              </p>
            </div>

            {/* Icon 3 */}
            <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-yellow-200 text-emerald-600 p-4 rounded-full">
                  <FontAwesomeIcon icon={faExchangeAlt} size="2x" />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Transfers</h3>
              <p className="text-gray-600">
                Quick and hassle-free transfers directly to the Masjids.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};