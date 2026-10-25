import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { setCurrentRoute, siteConfig } = useStore();

  const handleScrollToCategories = () => {
    const el = document.getElementById('valter-collections-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentRoute('shop');
    }
  };

  const hero = siteConfig.hero;

  return (
    <section className="relative bg-[#EAE3D8] text-[#1C2925] overflow-hidden border-b border-[#DED6CA]">
      {/* Subtle background luxury lighting gradients on warm cream */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle at 75% 50%, rgba(184, 154, 106, 0.16), transparent 60%), radial-gradient(circle at 15% 25%, rgba(244, 240, 233, 0.9), transparent 50%)'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[480px]">
          
          {/* Left Column: Copy & CTAs (45-50% width on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-6 bg-[#B89A6A]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold">
                {hero.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#082F2B] font-light tracking-tight leading-[1.08] mb-6">
              {hero.headline} <br />
              <span className="italic font-normal text-[#B89A6A]">{hero.headlineHighlight}</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-[#1C2925]/85 font-light leading-relaxed mb-8 max-w-xl">
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setCurrentRoute('shop')}
                className="px-8 py-4 bg-[#082F2B] hover:bg-[#0B3B35] active:bg-[#052522] text-[#F5F0E8] font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 group"
              >
                <span>{hero.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-[#B89A6A] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleScrollToCategories}
                className="px-7 py-4 bg-transparent border border-[#082F2B]/40 hover:border-[#082F2B] text-[#082F2B] hover:bg-[#082F2B]/5 font-medium text-xs tracking-[0.2em] uppercase transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#B89A6A]" />
                <span>{hero.secondaryCtaText}</span>
              </button>
            </div>

            {/* Quick Micro-Note */}
            <div className="mt-8 pt-6 border-t border-[#DED6CA] flex items-center gap-6 text-[11px] text-[#716F66]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A6A]" />
                <span>6 Signature Collections</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A6A]" />
                <span>2-Year International Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Luxury Watch Photography (50-55% width) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] overflow-hidden rounded-sm shadow-xl border border-[#DED6CA] group">
              <img
                src={hero.imageUrl || '/images/hero_emerald_watch_1792603314884.jpg'}
                alt="VALTER The Evergreen - Luxury emerald dial wristwatch in champagne gold"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-102"
                loading="eager"
              />
              
              {/* Soft warm vignette */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(234, 227, 216, 0.25) 0%, transparent 20%, transparent 80%, rgba(234, 227, 216, 0.25) 100%), linear-gradient(to top, rgba(8, 47, 43, 0.35) 0%, transparent 35%)'
                }}
              />

              {/* Floating Horological Callout in corner */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 border border-[#DED6CA] text-[#082F2B] rounded-sm shadow-md pointer-events-none">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#B89A6A] font-semibold block">
                  {hero.badgeTitle}
                </span>
                <span className="font-serif text-base font-normal">
                  {hero.badgeSubtitle}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
