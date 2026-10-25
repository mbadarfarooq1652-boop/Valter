import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/catalog';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
    formatPrice,
    products
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#F4F0E9] text-[#1C2925] shadow-2xl flex flex-col border-l border-[#DED6CA] z-50">
        
        {/* Header */}
        <div className="p-6 bg-[#082F2B] text-[#F5F0E8] flex items-center justify-between border-b border-[#31514A]">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#B89A6A] fill-[#B89A6A]" />
            <h3 className="font-serif text-xl tracking-tight">Saved Timepieces</h3>
            <span className="text-xs bg-[#052522] border border-[#31514A] px-2 py-0.5 rounded-full text-[#B89A6A] font-mono tabular-nums">
              {savedProducts.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-[#F5F0E8] hover:text-[#B89A6A] transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#DED6CA]">
          {savedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#EAE3D8] flex items-center justify-center text-[#716F66] mb-4">
                <Heart className="w-8 h-8 text-[#B89A6A]" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-2xl text-[#082F2B] mb-2">No Saved Items Yet</h4>
              <p className="text-xs text-[#716F66] max-w-xs mb-6">
                Tap the heart on any timepiece across our collections to curate your personal VALTER wishlist.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-3 bg-[#082F2B] text-[#F5F0E8] text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#0B3B35] transition-colors"
              >
                BROWSE WATCHES
              </button>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-20 bg-[#EAE3D8] border border-[#DED6CA] rounded-xs overflow-hidden shrink-0 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#716F66] block">
                        {product.categoryLabel}
                      </span>
                      <h5 
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="font-serif text-base text-[#082F2B] font-medium leading-snug cursor-pointer hover:text-[#B89A6A]"
                      >
                        {product.name}
                      </h5>
                      <span className="font-mono text-xs font-semibold text-[#082F2B] tabular-nums mt-0.5 block">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-[#716F66] hover:text-red-700 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#DED6CA]/50">
                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product.id);
                      }}
                      className="px-3 py-1.5 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-[10px] tracking-wider uppercase font-medium rounded-xs flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#B89A6A]" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsWishlistOpen(false);
                      }}
                      className="text-[10px] text-[#082F2B] hover:text-[#B89A6A] uppercase tracking-wider font-semibold inline-flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
