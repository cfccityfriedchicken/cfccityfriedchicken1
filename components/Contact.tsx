
import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Restaurant</h2>
           <p className="text-gray-500 max-w-xl mx-auto">Come dine with us to experience the best atmosphere or order online for quick delivery. We are always ready to serve you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Info Cards */}
            <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 transition border border-gray-100">
                    <div className="bg-red-100 p-4 rounded-full text-red-600">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1 text-gray-900">Our Location</h3>
                        <p className="text-gray-600">Main Jhang Road,<br/>Ada New Lahore</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 transition border border-gray-100">
                    <div className="bg-red-100 p-4 rounded-full text-red-600">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1 text-gray-900">Call Us</h3>
                        <p className="text-gray-600 font-mono">+92 300 0421400</p>
                        <p className="text-xs text-gray-500 mt-1">Available for Delivery & Takeaway</p>
                    </div>
                </div>
                
                 <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 transition border border-gray-100">
                    <div className="bg-red-100 p-4 rounded-full text-red-600">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1 text-gray-900">Opening Hours</h3>
                        <p className="text-gray-600">Mon - Sun: 11:00 AM - 2:00 AM</p>
                        <p className="text-red-500 text-sm font-bold mt-1">Open Now</p>
                    </div>
                </div>
            </div>

            {/* Visual / Map Placeholder */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" 
                    alt="Restaurant Location" 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                    <Navigation className="w-12 h-12 text-white mb-4 animate-bounce" />
                    <h3 className="text-2xl font-bold text-white mb-2">Easy to Find</h3>
                    <p className="text-white/80 mb-6">Located in the heart of the food street.</p>
                    <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition shadow-lg transform hover:scale-105">
                        Get Directions
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
