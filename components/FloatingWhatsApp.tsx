import React from 'react';
import { WhatsAppIcon } from './IconComponents';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/923000421400?text=Hi%20CFC,%20I%20want%20to%20place%20an%20order!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#1da851] transition-transform hover:scale-110 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
      <span className="absolute left-full ml-4 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-green-100">
        Order via WhatsApp
      </span>
    </a>
  );
};