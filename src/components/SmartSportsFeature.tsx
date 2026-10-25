import React from 'react';
import { ArrowRight, Activity, Cpu } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SmartSportsFeature: React.FC = () => {
  const { navigateToCollection } = useStore();

  return (
    <section className="bg-[#EAE3D8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Tile 1: Sports Watches */}
          <div 
            onClick={() => navigateToCollection('/collections/sports-watches')}
            className="group cursor-pointer bg-[#082F2B] text-[#F5F0E8] rounded-sm overflow-hidden border border-[#31514A] hover:border-[#B89A6A] transition-all duration-300 flex flex-col shadow-lg"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#052522]">
              <img
                src="/images/cat_sports_watch_1792603317550.jpg"
                alt="VALTER Sports Chronograph"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082F2B] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[#B89A6A]" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89A6A] font-semibold">
                    HIGH RESILIENCE
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-3">
                  Move with Confidence
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F0E8]/75 leading-relaxed mb-6">
                  Engineered with rotating ceramic bezels, tactile chronograph pushers, and sweat-resistant fluoroelastomer straps designed for active modern living.
                </p>
              </div>

              <div className="pt-4 border-t border-[#31514A] flex items-center justify-between text-xs tracking-[0.2em] uppercase font-semibold text-[#B89A6A]">
                <span>EXPLORE SPORTS WATCHES</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Tile 2: Smart Watches */}
          <div 
            onClick={() => navigateToCollection('/collections/smart-watches')}
            className="group cursor-pointer bg-[#082F2B] text-[#F5F0E8] rounded-sm overflow-hidden border border-[#31514A] hover:border-[#B89A6A] transition-all duration-300 flex flex-col shadow-lg"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#052522]">
              <img
                src="/images/cat_smart_watch_1792603333900.jpg"
                alt="VALTER Pulse Titanium Smartwatch"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082F2B] via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-[#B89A6A]" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89A6A] font-semibold">
                    CONNECTED HOROLOGY
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-3">
                  A Smarter Way to Wear Time
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F0E8]/75 leading-relaxed mb-6">
                  Experience edge-to-edge sapphire glass, Grade 5 aerospace titanium, and bespoke ambient analogue watch faces that integrate seamlessly into everyday life.
                </p>
              </div>

              <div className="pt-4 border-t border-[#31514A] flex items-center justify-between text-xs tracking-[0.2em] uppercase font-semibold text-[#B89A6A]">
                <span>EXPLORE SMART WATCHES</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
