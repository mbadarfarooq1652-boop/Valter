import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

export const FeaturedCollection: React.FC = () => {
  const { setCurrentRoute, products } = useStore();

  // Featured timepieces from dynamic inventory
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);

  return (
    <section className="bg-[#F4F0E9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-6 bg-[#B89A6A]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold">
                THE VALTER EDIT
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#082F2B] font-light tracking-tight mb-3">
              Selected for You
            </h2>
            <p className="text-sm sm:text-base text-[#716F66] leading-relaxed">
              Explore timepieces that bring together considered design, exceptional finishing, and distinctive character.
            </p>
          </div>

          <button
            onClick={() => setCurrentRoute('shop')}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#082F2B] hover:text-[#B89A6A] transition-colors py-2 group"
          >
            <span>VIEW ALL WATCHES</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 columns on large desktop, 3 on medium, 2 on tablet/mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setCurrentRoute('shop')}
            className="px-8 py-3.5 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm border border-[#31514A] hover:border-[#B89A6A] transition-all inline-flex items-center gap-2"
          >
            <span>DISCOVER THE FULL CATALOG (18 TIMEPIECES)</span>
            <ArrowRight className="w-4 h-4 text-[#B89A6A]" />
          </button>
        </div>

      </div>
    </section>
  );
};
