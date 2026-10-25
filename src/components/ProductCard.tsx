import React from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/catalog';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showCategory = true
}) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    formatPrice
  } = useStore();

  const isSaved = isInWishlist(product.id);

  return (
    <div className="group relative bg-white border border-[#DED6CA] hover:border-[#B89A6A] rounded-sm transition-all duration-300 flex flex-col hover:shadow-md">
      {/* Image Area with hover reveal & quick actions */}
      <div className="relative aspect-[4/3] w-full bg-[#EAE3D8] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Secondary image on hover if available */}
        {product.additionalImages && product.additionalImages.length > 0 && (
          <img
            src={product.additionalImages[0]}
            alt={`${product.name} secondary perspective`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isPair && (
            <span className="bg-[#082F2B] text-[#F5F0E8] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-[#31514A]">
              Set of 2 Watches
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#B89A6A] text-[#082F2B] font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button (Always visible / top right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-sm transition-all z-20 focus:outline-none ${
            isSaved
              ? 'bg-[#082F2B] text-[#B89A6A] border border-[#B89A6A]'
              : 'bg-white/80 hover:bg-white text-[#082F2B] hover:text-[#B89A6A] border border-[#DED6CA]'
          }`}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#B89A6A]' : ''}`} strokeWidth={1.75} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2 z-20">
          <button
            onClick={() => setSelectedProduct(product)}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-[#082F2B] text-[#082F2B] hover:text-[#F5F0E8] text-[10px] tracking-[0.16em] uppercase font-medium border border-[#DED6CA] hover:border-[#082F2B] rounded-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2 bg-[#B89A6A] hover:bg-[#c9ad7f] text-[#082F2B] rounded-xs shadow-sm transition-colors flex items-center justify-center"
            aria-label={`Add ${product.name} to bag`}
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div 
        onClick={() => setSelectedProduct(product)}
        className="p-4 sm:p-5 flex flex-col flex-1 cursor-pointer bg-white"
      >
        {showCategory && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#716F66] mb-1 font-medium">
            {product.categoryLabel}
          </span>
        )}

        <h4 className="font-serif text-lg text-[#082F2B] font-normal group-hover:text-[#B89A6A] transition-colors leading-snug mb-1">
          {product.name}
        </h4>

        <p className="text-xs text-[#716F66] line-clamp-1 mb-3">
          {product.shortDescription}
        </p>

        {/* Price & Action Footer */}
        <div className="mt-auto pt-3 border-t border-[#DED6CA]/60 flex items-center justify-between">
          <div>
            <span className="font-mono text-sm sm:text-base font-semibold text-[#082F2B] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.isPair && (
              <span className="block text-[10px] text-[#716F66] italic -mt-0.5">
                Price for pair
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#082F2B] hover:text-[#B89A6A] transition-colors flex items-center gap-1"
          >
            <span>ADD TO BAG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
