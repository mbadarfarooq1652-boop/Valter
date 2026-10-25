import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const CategoryGrid: React.FC = () => {
  const { navigateToCollection, categories } = useStore();

  return (
    <section id="valter-collections-section" className="bg-[#F4F0E9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-[#B89A6A]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B89A6A] font-medium">
              EXPLORE THE VALTER WORLD
            </span>
            <span className="h-[1px] w-6 bg-[#B89A6A]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#082F2B] font-light tracking-tight mb-4">
            A Timepiece for Every Style
          </h2>
          <p className="text-sm sm:text-base text-[#716F66] font-normal leading-relaxed">
            From refined everyday essentials to statement-making luxury and modern technology, discover the collection that speaks to you.
          </p>
        </div>

        {/* 6 Category Cards Grid: 3 cols desktop, 2 cols tablet, 1-2 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigateToCollection(category.slug)}
              className="group cursor-pointer bg-white border border-[#DED6CA] hover:border-[#B89A6A] transition-all duration-300 rounded-sm overflow-hidden flex flex-col hover:shadow-lg"
            >
              {/* Card Image Container (Aspect 4:3) */}
              <div className="relative aspect-[4/3] w-full bg-[#EAE3D8] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle scrim & decorative border */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                {/* For couple watches, add an informative tag */}
                {category.id === 'couple-watches' && (
                  <span className="absolute top-3 left-3 bg-[#082F2B]/90 backdrop-blur-sm text-[#F5F0E8] text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm border border-[#31514A]">
                    Coordinated Pair
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89A6A] font-semibold">
                    {category.eyebrow}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#082F2B] font-medium group-hover:text-[#B89A6A] transition-colors mb-2.5">
                  {category.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#716F66] leading-relaxed mb-6 flex-1">
                  {category.description}
                </p>

                {/* Card CTA */}
                <div className="pt-4 border-t border-[#DED6CA]/70 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#082F2B] font-semibold group-hover:text-[#B89A6A] transition-colors inline-flex items-center gap-1.5">
                    {category.ctaText}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#DED6CA] group-hover:border-[#B89A6A] group-hover:bg-[#082F2B] group-hover:text-[#F5F0E8] text-[#082F2B] flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
