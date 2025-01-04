import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export const CTA: React.FC<CTAProps> = ({
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="bg-emerald-600 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg mb-8 text-emerald-100">{description}</p>
          <button
            onClick={onClick}
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-emerald-50 transition-colors"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};