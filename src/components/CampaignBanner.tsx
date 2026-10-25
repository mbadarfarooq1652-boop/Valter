import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CampaignBanner: React.FC = () => {
  const { setCurrentRoute } = useStore();

  return (
    <section className="relative bg-[#052522] text-[#F5F0E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#31514A] overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(184, 154, 106, 0.18), transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Statement Left */}
          <div className="lg:col-span-6 z-10">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-3.5 h-3.5 text-[#B89A6A]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold">
                THE ART OF TIME
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F0E8] font-light tracking-tight leading-[1.1] mb-6">
              Elegance in <br />
              <span className="italic font-normal text-[#B89A6A]">Every Detail</span>
            </h2>

            <p className="text-sm sm:text-base text-[#F5F0E8]/80 leading-relaxed mb-8 max-w-lg">
              Find the timepiece that feels unmistakably yours. Each watch is assembled with calibrated precision, tested across four positions, and sealed for lasting durability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentRoute('shop')}
                className="px-8 py-4 bg-[#B89A6A] hover:bg-[#c9ad7f] text-[#082F2B] font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>DISCOVER VALTER</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Close-Up Watch Right */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-[#31514A] group">
              <img
                src="/images/cat_luxury_watch_1792603317321.jpg"
                alt="VALTER The Nocturne Haute Horlogerie Close-up"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#052522]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-end justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#B89A6A] block">
                    OPENWORKED CALIBRE
                  </span>
                  <span className="font-serif text-lg text-white font-normal">
                    The Nocturne Skeleton
                  </span>
                </div>
                <span className="font-mono text-sm text-[#B89A6A] font-semibold">
                  $450
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
