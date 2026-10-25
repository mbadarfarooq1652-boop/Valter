import React from 'react';
import { ArrowRight, Users, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CoupleWatchFeature: React.FC = () => {
  const { navigateToCollection, setCurrentRoute } = useStore();

  return (
    <section className="bg-[#F4F0E9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-10 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Coordinated Watches Image */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#EAE3D8] border border-[#DED6CA] group">
                <img
                  src="/images/cat_couple_watches_1792603317361.jpg"
                  alt="Coordinated Couple Watches side by side"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                
                {/* Badge specifying 2 timepieces included */}
                <div className="absolute top-4 left-4 bg-[#082F2B]/95 text-[#F5F0E8] px-3 py-1.5 rounded-sm border border-[#31514A] backdrop-blur-sm text-[10px] tracking-wider uppercase font-medium">
                  Two Watches Included In Each Set
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-[#B89A6A]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold">
                  COUPLE TIMEPIECES
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#082F2B] font-light tracking-tight mb-4">
                Made to Go Together
              </h2>

              <p className="text-sm sm:text-base text-[#716F66] leading-relaxed mb-6">
                Discover coordinated timepieces designed to celebrate meaningful moments, thoughtful gifts, and shared memories. Each couple set includes two individually proportioned watches styled in harmonious sync.
              </p>

              {/* Pair Highlights */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#B89A6A] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#1C2925]">
                    <strong>Dual Presentation Box:</strong> Both watches packaged together in a bespoke velvet-lined keepsake case.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#B89A6A] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#1C2925]">
                    <strong>Harmonious Proportions:</strong> Perfectly sized 40mm and 32mm cases with matching dials and metalwork.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#B89A6A] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#1C2925]">
                    <strong>Singular Set Price:</strong> Transparent listed pricing covering both individual watches.
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigateToCollection('/collections/couple-watches')}
                  className="px-7 py-3.5 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm border border-[#31514A] hover:border-[#B89A6A] transition-all inline-flex items-center gap-2 group"
                >
                  <span>EXPLORE COUPLE WATCHES</span>
                  <ArrowRight className="w-4 h-4 text-[#B89A6A] transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
