import React from 'react';
import { Award, Compass, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutView: React.FC = () => {
  const { setCurrentRoute } = useStore();

  return (
    <div className="bg-[#F4F0E9] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#716F66] mb-8">
          <button onClick={() => setCurrentRoute('home')} className="hover:text-[#082F2B] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-[#082F2B] font-medium">Our Story</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold block mb-2">
            THE HOUSE OF VALTER
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#082F2B] font-light tracking-tight mb-4">
            Timeless Design. Distinctive Character.
          </h1>
          <p className="text-sm sm:text-base text-[#716F66] leading-relaxed">
            Founded on the conviction that a luxury timepiece should be defined not by fleeting trends or prohibitive markup, but by intentional proportions, authentic mechanical craft, and enduring beauty.
          </p>
        </div>

        {/* Lifestyle Banner */}
        <div className="aspect-[16/9] w-full rounded-sm overflow-hidden bg-[#EAE3D8] border border-[#DED6CA] shadow-lg mb-16">
          <img
            src="/images/brand_story_lifestyle_1792603333608.jpg"
            alt="VALTER atelier craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 mb-16">
          <div>
            <h3 className="font-serif text-2xl text-[#082F2B] mb-3">
              Alpine Precision & Milanese Proportion
            </h3>
            <p className="text-xs sm:text-sm text-[#716F66] leading-relaxed mb-4">
              Our design studio draws inspiration from the stillness of alpine ridges and the architectural precision of mid-century industrial design. Every radius of a VALTER case is calculated so the watch sits flush against the wrist bone, sliding naturally beneath tailored cuffs.
            </p>
            <p className="text-xs sm:text-sm text-[#716F66] leading-relaxed">
              We reject empty ornamentation in favor of balanced typography, diamond-cut hands, and radiant sunburst dials calibrated to capture natural ambient light across every hour of the day.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-[#082F2B] mb-3">
              The Six Horological Disciplines
            </h3>
            <p className="text-xs sm:text-sm text-[#716F66] leading-relaxed mb-4">
              Unlike traditional single-focus labels, VALTER designs for the full spectrum of contemporary life. Whether seeking an understated everyday automatic, a matching set to commemorate a wedding, an openworked skeleton complication, or titanium smartwatch connectivity—every piece carries identical standards of material integrity.
            </p>
            <div className="p-4 bg-white border border-[#DED6CA] rounded-xs space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#082F2B] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B89A6A]" />
                <span>316L Surgical Stainless Steel & Grade 5 Titanium</span>
              </div>
              <div className="flex items-center gap-2 text-[#082F2B] font-medium">
                <Sparkles className="w-4 h-4 text-[#B89A6A]" />
                <span>Anti-Reflective Sapphire Crystals Throughout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-8 border-t border-[#DED6CA]">
          <button
            onClick={() => setCurrentRoute('shop')}
            className="px-8 py-4 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm inline-flex items-center gap-2"
          >
            <span>EXPLORE ALL VALTER TIMEPIECES</span>
            <ArrowRight className="w-4 h-4 text-[#B89A6A]" />
          </button>
        </div>

      </div>
    </div>
  );
};
