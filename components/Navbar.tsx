
import React from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Clock, Bike } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onOrderHistoryClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onOrderHistoryClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-red-600 text-white sticky top-0 z-50 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-white p-1.5 rounded-full shadow-md">
                 <span className="text-2xl">🍗</span>
            </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold leading-none tracking-tighter">CFC</span>
            <span className="text-[10px] font-medium opacity-90 tracking-widest">CITY FRIED CHICKEN</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 font-semibold items-center text-sm lg:text-base">
          <a href="#home" className="hover:text-yellow-300 transition hover:scale-105 transform">Home</a>
          <a href="#menu" className="hover:text-yellow-300 transition hover:scale-105 transform">Menu</a>
          <a href="#about" className="hover:text-yellow-300 transition hover:scale-105 transform">About Us</a>
          <a href="#contact" className="hover:text-yellow-300 transition hover:scale-105 transform">Contact Us</a>
          <a href="#blog" className="hover:text-yellow-300 transition hover:scale-105 transform">Blog</a>
          
          <div className="flex items-center gap-2 ml-4 border-l border-red-500 pl-4">
            <button 
                onClick={onOrderHistoryClick}
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition hover:scale-105"
                title="Track Order"
            >
                <Bike className="w-5 h-5" />
                <span className="hidden lg:inline">Track</span>
            </button>
            <button 
                onClick={onOrderHistoryClick}
                className="flex items-center gap-2 bg-red-800/50 px-3 py-1.5 rounded-full hover:bg-red-800 transition text-xs lg:text-sm border border-red-500 hover:border-red-400"
            >
                <Clock className="w-4 h-4" />
                <span>Order History</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-red-700 rounded-full transition group active:scale-95"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-yellow-400 text-red-900 text-[10px] md:text-xs font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full animate-bounce shadow-sm border-2 border-red-600">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className="md:hidden p-2 hover:bg-red-700 rounded-full transition active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-red-700 px-4 py-4 space-y-1 border-t border-red-500 shadow-inner">
          <a href="#home" className="block px-4 py-3 rounded-lg hover:bg-red-800 hover:text-yellow-300 transition font-medium" onClick={handleLinkClick}>Home</a>
          <a href="#menu" className="block px-4 py-3 rounded-lg hover:bg-red-800 hover:text-yellow-300 transition font-medium" onClick={handleLinkClick}>Menu</a>
          <a href="#about" className="block px-4 py-3 rounded-lg hover:bg-red-800 hover:text-yellow-300 transition font-medium" onClick={handleLinkClick}>About Us</a>
          <a href="#contact" className="block px-4 py-3 rounded-lg hover:bg-red-800 hover:text-yellow-300 transition font-medium" onClick={handleLinkClick}>Contact Us</a>
          <a href="#blog" className="block px-4 py-3 rounded-lg hover:bg-red-800 hover:text-yellow-300 transition font-medium" onClick={handleLinkClick}>Blog</a>
          <div className="flex gap-2 pt-2">
             <button 
                onClick={() => {
                onOrderHistoryClick();
                handleLinkClick();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-800 text-yellow-300 font-semibold transition"
            >
                <Bike className="w-5 h-5" /> Track
            </button>
            <button 
                onClick={() => {
                onOrderHistoryClick();
                handleLinkClick();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-900/50 text-white font-semibold transition"
            >
                <Clock className="w-5 h-5" /> Order History
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
