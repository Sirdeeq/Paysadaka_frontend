import React from 'react';
import { CTA } from '../components/common/CTA';

export const Home: React.FC = () => {
  return (
    <div>
      <section className="bg-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6">
            Support Your Community Through Digital Giving
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
            PaySadaka makes it easy to contribute to mosques and charities in your area.
            Join us in making a difference.
          </p>
        </div>
      </section>
      
      <CTA
        title="Ready to Make a Difference?"
        description="Join thousands of donors supporting their local communities"
        buttonText="Start Donating"
        onClick={() => window.location.href = '/donation'}
      />
    </div>
  );
};