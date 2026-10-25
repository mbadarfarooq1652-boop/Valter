import React from 'react';
import { ArrowRight, Award, Compass, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BrandStory: React.FC = () => {
  const { setCurrentRoute, siteConfig } = useStore();
  const philosophy = siteConfig.philosophy;

  return (
    <section className="bg-[#EAE3D8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DED6CA] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Lifestyle Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl border border-[#DED6CA] group">
              <img
                src={philosophy.imageUrl || '/images/brand_story_lifestyle_1792603333608.jpg'}
                alt="Person wearing a luxury VALTER timepiece in an editorial studio setting"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle decorative quote plaque */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#082F2B] text-[#F5F0E8] p-5 max-w-xs border border-[#31514A] shadow-xl">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#B89A6A] font-semibold block mb-1">
                HOROLOGY & ATTIRE
              </span>
              <p className="font-serif italic text-sm text-[#F5F0E8]/90">
                “Time is not merely measured; it is worn with intention.”
              </p>
            </div>
          </div>

          {/* Right Column: Copy & Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-[#B89A6A]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold">
                {philosophy.eyebrow}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#082F2B] font-light tracking-tight mb-6">
              {philosophy.headline}
            </h2>

            <p className="text-sm sm:text-base text-[#1C2925]/85 leading-relaxed mb-6 font-normal">
              {philosophy.paragraph1}
            </p>

            <p className="text-sm sm:text-base text-[#716F66] leading-relaxed mb-8">
              {philosophy.paragraph2}
            </p>

            {/* Three Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-6 border-t border-[#DED6CA]">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#082F2B] font-medium text-xs mb-1">
                  <Award className="w-4 h-4 text-[#B89A6A]" />
                  <span>316L Surgical Steel</span>
                </div>
                <span className="text-[11px] text-[#716F66]">Corrosion-resistant & hypoallergenic</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#082F2B] font-medium text-xs mb-1">
                  <Sparkles className="w-4 h-4 text-[#B89A6A]" />
                  <span>Sapphire Crystal</span>
                </div>
                <span className="text-[11px] text-[#716F66]">Diamond-grade scratch resistance</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#082F2B] font-medium text-xs mb-1">
                  <Compass className="w-4 h-4 text-[#B89A6A]" />
                  <span>Balanced Anatomy</span>
                </div>
                <span className="text-[11px] text-[#716F66]">Proportioned for natural wrist drape</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setCurrentRoute('about')}
                className="px-8 py-4 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm border border-[#31514A] hover:border-[#B89A6A] transition-all inline-flex items-center gap-2 group"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-4 h-4 text-[#B89A6A] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
