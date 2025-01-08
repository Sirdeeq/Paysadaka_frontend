import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBullseye, faEye } from '@fortawesome/free-solid-svg-icons';

export const Services: React.FC = () => {
  return (
    <section className="bg-emerald-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-emerald-600 text-center mb-12">
          About Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Who We Are */}
          <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-yellow-200 text-emerald-600 p-5 rounded-full">
                <FontAwesomeIcon icon={faUsers} size="3x" />
              </span>
            </div>
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">Who We Are</h2>
            <p className="text-gray-400 leading-relaxed">
              We are a platform dedicated to simplifying donations for Masjids worldwide.
              Our goal is to bridge the gap between donors and Masjids, making it easier 
              for individuals to support causes that matter most to them.
            </p>
          </div>

          {/* Our Mission */}
          <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white p-6 rounded-lg shadow-lg text-center ">
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-yellow-200 text-emerald-600 p-5 rounded-full">
                <FontAwesomeIcon icon={faBullseye} size="3x" />
              </span>
            </div>
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To provide a secure, transparent, and efficient way for people to donate to 
              their chosen Masjids, empowering communities to thrive and grow together.
            </p>
          </div>

          {/* Our Vision */}
          <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white p-6 rounded-lg shadow-lg text-center ">
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-yellow-200 text-emerald-600 p-5 rounded-full">
                <FontAwesomeIcon icon={faEye} size="3x" />
              </span>
            </div>
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To become the leading platform for charitable donations, fostering global 
              connections and strengthening communities through shared generosity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;