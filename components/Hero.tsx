import React from 'react';
import { ArrowRight, Clock, Truck, Star } from 'lucide-react';
import { WhatsAppIcon } from './IconComponents';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-orange-50 overflow-hidden min-h-[calc(100vh-64px)] flex items-center pt-8 pb-16 md:py-0">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-100/30 skew-x-12 translate-x-20 hidden lg:block"></div>
      
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6 md:space-y-8 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white border border-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm">
            <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>Best Fried Chicken in Town</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            It's Not Just Food,<br/>
            It's an <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">Emotion.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Order the crispiest fried chicken, juicy burgers, and spicy wings. Delivered hot & fresh to your doorstep in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <a 
              href="#menu" 
              className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-700 hover:shadow-red-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Order Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://wa.me/923000421400?text=Hi%20CFC,%20I%20want%20to%20place%20an%20order!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-green-600 border-2 border-green-500 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp
            </a>
          </div>

          <div className="flex justify-center lg:justify-start gap-6 md:gap-8 pt-6 md:pt-8 border-t border-orange-200/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-full shadow-sm text-red-600 border border-red-50">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders above 1000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-full shadow-sm text-red-600 border border-red-50">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900">30 Mins</p>
                <p className="text-xs text-gray-500">Super fast delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400/20 w-[120%] h-[120%] rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
            <div className="relative bg-white p-3 md:p-5 rounded-3xl shadow-2xl transform lg:rotate-2 hover:rotate-0 transition duration-700 ease-out">
                 <img 
                    src="https://images.unsplash.com/photo-1513639776629-9269d052130d?w=1000&q=80" 
                    alt="Delicious Fried Chicken Feast" 
                    className="rounded-2xl w-full object-cover h-[280px] sm:h-[350px] md:h-[450px] shadow-inner"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 md:bottom-8 -left-2 md:-left-8 bg-white p-3 md:p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce border border-gray-50 max-w-[200px] md:max-w-none">
                    <div className="bg-green-100 p-2.5 rounded-full text-green-600">
                        <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-gray-900 text-sm md:text-base">4.9 Rating</p>
                        <p className="text-xs text-gray-500">From 2k+ happy customers</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};