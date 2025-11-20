import React from 'react';
import { Facebook, Instagram, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './IconComponents';

export const Footer: React.FC = () => {
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Deals', href: '#Deals' },
    { name: 'Burgers & Sandwiches', href: '#Burgers & Sandwiches' },
    { name: 'Pizza', href: '#Pizza' },
    { name: 'Premium Pizza', href: '#Royal Premium Flavors Pizza' },
    { name: 'Kabab Stuffer', href: '#Kabab Stuffer' },
    { name: 'Pasta', href: '#Pasta' },
    { name: 'Starters & Rolls', href: '#Starters, Fried & Rolls' },
    { name: 'Ice Cream', href: '#Ice Cream' },
    { name: 'About Us', href: '#about' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-white">
                {/* LOGO: Replace the src below with your actual uploaded logo URL */}
                <img 
                    src="https://placehold.co/150x150/111827/white?text=CFC+Logo" 
                    alt="CFC City Fried Chicken" 
                    className="h-24 w-auto object-contain" 
                />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Serving the city's best fried chicken since 2022. Crispy, Tasty, and delivered fast to your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://www.facebook.com/people/CFC-Nia-Lahore/100075725813566/?sk=about_details" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:bg-[#1877F2] hover:text-white transition-colors transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/923000421400" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:bg-[#25D366] hover:text-white transition-colors transform hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.google.com/maps/place/City+Fried+Chicken+(+C.F.C+)/@31.3251875,72.7269375,17z/data=!3m1!4b1!4m6!3m5!1s0x39225367af84645f:0xe32ee68a3008ab40!8m2!3d31.3251875!4d72.7269375!16s%2Fg%2F11rhjdqxdp?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-green-600 hover:text-white transition-colors transform hover:-translate-y-1"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-colors transform hover:-translate-y-1">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 hover:pl-2 py-1"
                  >
                    <ChevronRight className="w-3 h-3 text-red-600 mr-2 transition-transform group-hover:scale-110" />
                    <span className="group-hover:text-red-500 transition-colors text-sm">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
                    <MapPin className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" /> 
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors pt-1">Main Jhang Road,<br/>Ada New Lahore</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
                    <Phone className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" /> 
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">+92 300 0421400</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
                    <Mail className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" /> 
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">order@cfccity.online</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Get Offers
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">Subscribe to get exclusive deals, coupons and 20% off your first order.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 w-full text-sm border border-gray-700 focus:border-red-500 transition-colors" 
              />
              <button className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition text-sm font-bold shadow-lg hover:shadow-red-600/20 flex justify-center items-center gap-2 group">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CFC - City Fried Chicken. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-red-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-red-500 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};