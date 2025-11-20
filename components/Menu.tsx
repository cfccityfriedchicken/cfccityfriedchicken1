import React, { useState } from 'react';
import { menuData } from '../data';
import { MenuItem } from '../types';
import { Flame, Plus } from 'lucide-react';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = [
    'All', 
    'Burgers & Sandwiches', 
    'Pizza', 
    'Royal Premium Flavors Pizza', 
    'Kabab Stuffer', 
    'Pasta', 
    'Starters, Fried & Rolls',
    'Ice Cream',
    'Deals'
  ];
  
  const filteredItems = activeCategory === 'All' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Hot Menu <span className="text-red-600">🔥</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            From crispy zingers to cheesy pizzas, we have everything to satisfy your cravings.
          </p>
          
          {/* Category Filter - Horizontal Scroll on Mobile */}
          <div className="mt-8 relative">
             <div className="flex gap-3 overflow-x-auto pb-4 md:justify-center md:flex-wrap no-scrollbar px-2 -mx-2 md:mx-0 snap-x">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border snap-start ${
                    activeCategory === cat 
                      ? 'bg-red-600 text-white border-red-600 shadow-lg transform scale-105' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-red-200 hover:bg-red-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
             </div>
             {/* Fade effect for mobile scroll indication */}
             <div className="md:hidden absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition duration-300 group flex flex-col h-full">
              <div className="relative mb-4 overflow-hidden rounded-xl h-48 sm:h-56">
                {item.isSpicy && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 z-10 shadow-md">
                    <Flame className="w-3 h-3" /> SPICY
                  </div>
                )}
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1 group-hover:text-red-600 transition-colors">{item.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
                
                <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{item.category.split(' ')[0]}</span>
                    <span className="text-xl font-bold text-gray-900">Rs. {item.price}</span>
                  </div>
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md active:scale-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
             <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No items found in this category.</p>
             </div>
        )}
      </div>
    </section>
  );
};