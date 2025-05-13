import React, { useState } from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export const LiveSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-8">
      <div
        className={`bg-white rounded-lg shadow-lg mb-4 transition-all duration-200 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-4 space-y-3">
          <a
            href="mailto:paysadaqa@gmail.com"
            className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-emerald-50 rounded-md"
          >
            <Mail className="w-5 h-5" />
            <span>Email Support</span>
          </a>
          <a
            href="https://wa.me/+2348066011841"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-emerald-50 rounded-md"
          >
            <Phone className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => {/* Implement live chat */}}
            className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-emerald-50 rounded-md w-full"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Live Chat</span>
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
