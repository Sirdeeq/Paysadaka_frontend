// src/components/StickyButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StickyButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/donation'); // Change to the desired donation page path
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <button
        onClick={handleClick}
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-all"
      >
        Donate Now
      </button>
    </div>
  );
};

export default StickyButton;
