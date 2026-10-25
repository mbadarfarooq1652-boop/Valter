import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export const ShopView: React.FC = () => {
  const { setCurrentRoute, products, categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') return a.price - b.price;
      if (sortOrder === 'price-high') return b.price - a.price;
      if (sortOrder === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, sortOrder, searchQuery]);

  const categoryButtons = [
    { id: 'all', label: 'All Watches' },
    ...categories.map(c => ({ id: c.id, label: c.title }))
  ];

  return (
    <div className="bg-[#F4F0E9] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#716F66] mb-6">
          <button onClick={() => setCurrentRoute('home')} className="hover:text-[#082F2B] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-[#082F2B] font-medium">All Watches</span>
        </nav>

        {/* Page Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold block mb-2">
            COMPLETE HOROLOGICAL CATALOG
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#082F2B] font-light tracking-tight mb-3">
            Discover the VALTER Collection
          </h1>
          <p className="text-sm sm:text-base text-[#716F66] leading-relaxed">
            Explore thoughtfully selected timepieces for every style and occasion across our six signature disciplines.
          </p>
        </div>

        {/* Filter & Control Bar */}
        <div className="bg-white border border-[#DED6CA] rounded-sm p-4 sm:p-5 mb-8 shadow-xs">
          
          {/* Top row: Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-[#DED6CA]/60 scrollbar-none">
            {categoryButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedCategory(btn.id)}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider rounded-xs whitespace-nowrap transition-all font-medium ${
                  selectedCategory === btn.id
                    ? 'bg-[#082F2B] text-[#F5F0E8] shadow-xs'
                    : 'bg-[#EAE3D8]/50 text-[#716F66] hover:bg-[#EAE3D8] hover:text-[#082F2B]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Bottom row: Search & Sorting */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search input within catalog */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#716F66]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name or feature..."
                className="w-full pl-9 pr-8 py-2 bg-[#F4F0E9] border border-[#DED6CA] focus:border-[#B89A6A] text-xs text-[#082F2B] rounded-xs focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#716F66] hover:text-[#082F2B]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Product count & Sort dropdown */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-xs text-[#716F66]">
                Showing <strong>{filteredProducts.length}</strong> timepieces
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#B89A6A]" />
                <select
                  value={sortOrder}
                  onChange={(e: any) => setSortOrder(e.target.value)}
                  className="bg-[#F4F0E9] border border-[#DED6CA] text-xs text-[#082F2B] py-1.5 px-2.5 rounded-xs focus:outline-none cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Sort: Newest</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Results Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#DED6CA] rounded-sm p-12 text-center my-8">
            <Search className="w-12 h-12 text-[#B89A6A] mx-auto mb-3" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-[#082F2B] mb-2">No Matching Timepieces</h3>
            <p className="text-xs text-[#716F66] max-w-md mx-auto mb-6">
              We couldn't find any watches matching your current search and filter criteria. Try clearing filters or exploring other collections.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#082F2B] text-[#F5F0E8] text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#0B3B35] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
