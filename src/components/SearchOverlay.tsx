import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct, formatPrice, products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts: Product[] = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.specs.caseMaterial.toLowerCase().includes(q) ||
          p.specs.movement.toLowerCase().includes(q)
        );
      });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#082F2B]/90 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen px-4 py-8 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col">
        {/* Top bar with close button */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#31514A]">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89A6A] font-semibold">
            VALTER ARCHIVE SEARCH
          </span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#F5F0E8] hover:text-[#B89A6A] transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#B89A6A]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by timepiece name, collection (e.g. Men's, Couple, Smart), or feature..."
            className="w-full pl-14 pr-12 py-4 bg-[#052522] border border-[#31514A] focus:border-[#B89A6A] text-[#F5F0E8] placeholder-[#716F66] text-base sm:text-lg focus:outline-none rounded-sm transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#716F66] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Suggested Quick Filters */}
        {query.trim() === '' && (
          <div className="mb-8">
            <span className="text-[11px] text-[#716F66] uppercase tracking-wider block mb-3">
              Popular Horological Inquiries:
            </span>
            <div className="flex flex-wrap gap-2">
              {["Evergreen", "Couple Watches", "Automatic", "Titanium", "Chronograph", "Emerald", "Skeleton"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 bg-[#052522] border border-[#31514A] hover:border-[#B89A6A] text-xs text-[#F5F0E8] rounded-sm transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Area */}
        {query.trim() !== '' && (
          <div className="flex-1">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#31514A] text-xs text-[#F5F0E8]/80">
              <span>
                Found <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'timepiece' : 'timepieces'}
              </span>
              <span className="text-[10px] text-[#B89A6A] uppercase tracking-wider">
                All 6 Collections Queried
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#052522]/60 border border-[#31514A] rounded-sm p-8">
                <Search className="w-10 h-10 text-[#716F66] mx-auto mb-3" />
                <h4 className="font-serif text-xl text-[#F5F0E8] mb-1">No timepieces match "{query}"</h4>
                <p className="text-xs text-[#716F66] max-w-sm mx-auto mb-4">
                  Please try checking spelling or browsing directly through our six signature collections.
                </p>
                <button
                  onClick={() => setQuery('')}
                  className="text-xs uppercase tracking-wider text-[#B89A6A] underline"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsSearchOpen(false);
                    }}
                    className="group cursor-pointer bg-[#052522] border border-[#31514A] hover:border-[#B89A6A] p-3 rounded-sm transition-all flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xs bg-[#082F2B] mb-2.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#B89A6A] mb-0.5">
                      {product.categoryLabel}
                    </span>
                    <h5 className="font-serif text-base text-[#F5F0E8] group-hover:text-[#B89A6A] transition-colors leading-tight mb-1">
                      {product.name}
                    </h5>
                    <div className="mt-auto pt-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-[#F5F0E8] font-medium tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#B89A6A] inline-flex items-center gap-0.5">
                        View <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
