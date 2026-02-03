import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href="https://wa.me/37499031383"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group flex items-center justify-center"
    >
      <span className="absolute right-14 bg-white text-charcoal px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Book Now
      </span>
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
        <MessageCircle size={28} className="text-white fill-white" />
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20"></div>
    </a>
  );
};

export default FloatingWhatsApp;