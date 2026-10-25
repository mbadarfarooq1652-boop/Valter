import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES, CollectionCategory } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

interface CollectionViewProps {
  categoryId: CollectionCategory['id'];
}

export const CollectionView: React.FC<CollectionViewProps> = ({ categoryId }) => {
  const { setCurrentRoute, products, categories } = useStore();
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const category = categories.find(c => c.id === categoryId) || categories[0];

  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category === categoryId).sort((a, b) => {
      if (sortOrder === 'price-low') return a.price - b.price;
      if (sortOrder === 'price-high') return b.price - a.price;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, categoryId, sortOrder]);

  return (
    <div className="bg-[#F4F0E9] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#716F66] mb-8">
          <button onClick={() => setCurrentRoute('home')} className="hover:text-[#082F2B] transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => setCurrentRoute('shop')} className="hover:text-[#082F2B] transition-colors">
            Collections
          </button>
          <span>/</span>
          <span className="text-[#082F2B] font-medium">{category.title}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-sm overflow-hidden bg-[#082F2B] text-[#F5F0E8] border border-[#31514A] shadow-xl mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Banner Text */}
            <div className="lg:col-span-6 p-8 sm:p-12 z-10">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold block mb-2">
                {category.eyebrow}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight mb-4">
                {category.title}
              </h1>
              <p className="text-sm sm:text-base text-[#F5F0E8]/85 leading-relaxed mb-6">
                {category.description}
              </p>

              {categoryId === 'couple-watches' && (
                <div className="p-3 bg-[#052522] border border-[#31514A] rounded-xs text-xs text-[#F5F0E8] mb-4">
                  <strong>Couple Set Guarantee:</strong> All items in this collection are delivered as complementary sets of two matching watches packaged in a single luxury presentation box.
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-[#B89A6A]">
                <span>{categoryProducts.length} Timepieces Available</span>
                <span>·</span>
                <span>Insured Global Courier</span>
              </div>
            </div>

            {/* Banner Photo */}
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-full">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#082F2B] via-transparent to-transparent opacity-70" />
            </div>

          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-[#DED6CA] gap-4">
          <div>
            <h3 className="font-serif text-2xl text-[#082F2B]">
              The {category.title} Edition
            </h3>
            <p className="text-xs text-[#716F66]">
              Showing all {categoryProducts.length} handcrafted models
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B89A6A]" />
            <select
              value={sortOrder}
              onChange={(e: any) => setSortOrder(e.target.value)}
              className="bg-white border border-[#DED6CA] text-xs text-[#082F2B] py-2 px-3 rounded-xs focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} showCategory={false} />
          ))}
        </div>

        {/* Explore Other Collections Bar */}
        <div className="bg-[#EAE3D8] border border-[#DED6CA] rounded-sm p-8 text-center">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89A6A] font-semibold block mb-1">
            CONTINUE EXPLORING
          </span>
          <h4 className="font-serif text-2xl text-[#082F2B] mb-4">
            Discover Adjacent VALTER Collections
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.filter(c => c.id !== categoryId).map(otherCat => (
              <button
                key={otherCat.id}
                onClick={() => {
                  if (otherCat.id === 'mens-watches') setCurrentRoute('collection-mens');
                  else if (otherCat.id === 'womens-watches') setCurrentRoute('collection-womens');
                  else if (otherCat.id === 'couple-watches') setCurrentRoute('collection-couples');
                  else if (otherCat.id === 'luxury-watches') setCurrentRoute('collection-luxury');
                  else if (otherCat.id === 'sports-watches') setCurrentRoute('collection-sports');
                  else if (otherCat.id === 'smart-watches') setCurrentRoute('collection-smart');
                }}
                className="px-4 py-2 bg-white hover:bg-[#082F2B] hover:text-[#F5F0E8] text-xs text-[#082F2B] border border-[#DED6CA] rounded-xs transition-colors"
              >
                {otherCat.title}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
