import React from 'react';
import { Building2, Heart } from 'lucide-react';

interface DonationTypeProps {
  onSelect: (type: 'masjid' | 'charity') => void;
}

export const DonationType: React.FC<DonationTypeProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <button
        onClick={() => onSelect('masjid')}
        className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <Building2 className="w-16 h-16 text-emerald-600 mb-4" />
        <h3 className="text-xl font-semibold">Donate to Masjid</h3>
        <p className="text-gray-600 mt-2 text-center">
          Support your local mosque and community
        </p>
      </button>

      <button
        onClick={() => onSelect('charity')}
        className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <Heart className="w-16 h-16 text-emerald-600 mb-4" />
        <h3 className="text-xl font-semibold">Donate to Charity</h3>
        <p className="text-gray-600 mt-2 text-center">
          Help those in need through charitable organizations
        </p>
      </button>
    </div>
  );
};