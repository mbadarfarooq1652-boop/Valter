import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../data/catalog';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Standard');

  if (!selectedProduct) return null;

  const isSaved = isInWishlist(selectedProduct.id);
  const galleryImages = [
    selectedProduct.image,
    ...(selectedProduct.additionalImages || [])
  ];

  const variants = selectedProduct.isPair
    ? ['Matching Duo Box (40mm + 32mm)', 'Engraved Keepsake Edition (+$40)']
    : selectedProduct.category === 'smart-watches'
    ? ['Brushed Titanium (Gray Strap)', 'Satin Black (Black Silicone)']
    : ['Champagne Gold Steel', 'Handcrafted Leather Strap'];

  const handleAdd = () => {
    addToCart(selectedProduct, quantity, selectedVariant);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#082F2B]/85 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      <div className="relative min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="relative bg-[#F4F0E9] text-[#1C2925] rounded-sm max-w-4xl w-full border border-[#DED6CA] shadow-2xl overflow-hidden my-8">
          
          {/* Close button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#082F2B] rounded-full border border-[#DED6CA] transition-colors focus:outline-none"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Left: Gallery (6 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 bg-[#EAE3D8] border-b md:border-b-0 md:border-r border-[#DED6CA] flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white border border-[#DED6CA] shadow-inner mb-4">
                <img
                  src={galleryImages[activeImageIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {selectedProduct.isPair && (
                  <span className="absolute top-3 left-3 bg-[#082F2B] text-[#F5F0E8] text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-xs border border-[#31514A]">
                    Set of 2 Timepieces Included
                  </span>
                )}
              </div>

              {/* Thumbnails row */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded-xs overflow-hidden border transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#B89A6A] ring-1 ring-[#B89A6A]'
                          : 'border-[#DED6CA] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="perspective" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Pair Notice Banner */}
              {selectedProduct.isPair && (
                <div className="mt-4 p-3 bg-[#082F2B] text-[#F5F0E8] rounded-xs border border-[#31514A] text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#B89A6A] shrink-0 mt-0.5" />
                  <p className="leading-snug text-[#F5F0E8]/90">
                    <strong>Set of 2:</strong> {selectedProduct.pairDetails || 'Includes both matching timepieces and a dual velvet presentation box.'}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Details & Purchase Module (6 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89A6A] font-semibold">
                    {selectedProduct.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>In Stock · Ready to Dispatch</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#082F2B] font-normal leading-tight mb-2">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-2xl font-semibold text-[#082F2B] tabular-nums">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.isPair && (
                    <span className="text-xs text-[#716F66] italic">
                      (Complete Set of 2 Watches)
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#716F66] leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                {/* Variant Selector */}
                <div className="mb-6">
                  <label className="text-[10px] uppercase tracking-wider text-[#716F66] font-semibold block mb-2">
                    Edition / Configuration
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {variants.map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-2 text-left text-xs rounded-xs border transition-all flex items-center justify-between ${
                          selectedVariant === v
                            ? 'border-[#B89A6A] bg-white text-[#082F2B] font-medium shadow-xs'
                            : 'border-[#DED6CA] bg-[#EAE3D8]/50 text-[#716F66] hover:bg-white'
                        }`}
                      >
                        <span>{v}</span>
                        {selectedVariant === v && <Check className="w-3.5 h-3.5 text-[#B89A6A]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center gap-3 mb-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#DED6CA] rounded-xs bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-[#082F2B] hover:bg-[#EAE3D8] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-mono font-medium text-[#082F2B]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-[#082F2B] hover:bg-[#EAE3D8] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Bag */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-4 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#B89A6A]" />
                    <span>ADD TO BAG · {formatPrice(selectedProduct.price * quantity)}</span>
                  </button>

                  {/* Wishlist button */}
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-3 rounded-xs border transition-colors ${
                      isSaved
                        ? 'border-[#B89A6A] bg-[#082F2B] text-[#B89A6A]'
                        : 'border-[#DED6CA] bg-white hover:border-[#B89A6A] text-[#082F2B]'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#B89A6A]' : ''}`} />
                  </button>
                </div>

                {/* Technical Specifications Table */}
                <div className="pt-4 border-t border-[#DED6CA]">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#082F2B] font-semibold mb-3">
                    HOROLOGICAL SPECIFICATIONS
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#716F66]">
                    <div>
                      <span className="font-medium text-[#082F2B] block">Case Diameter:</span>
                      <span>{selectedProduct.specs.caseDiameter}</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#082F2B] block">Case Thickness:</span>
                      <span>{selectedProduct.specs.caseThickness}</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#082F2B] block">Movement:</span>
                      <span>{selectedProduct.specs.movement}</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#082F2B] block">Crystal:</span>
                      <span>{selectedProduct.specs.crystal}</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#082F2B] block">Water Resistance:</span>
                      <span>{selectedProduct.specs.waterResistance}</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#082F2B] block">Case Material:</span>
                      <span>{selectedProduct.specs.caseMaterial}</span>
                    </div>
                    {selectedProduct.specs.powerReserve && (
                      <div>
                        <span className="font-medium text-[#082F2B] block">Power Reserve:</span>
                        <span>{selectedProduct.specs.powerReserve}</span>
                      </div>
                    )}
                    {selectedProduct.specs.display && (
                      <div>
                        <span className="font-medium text-[#082F2B] block">Screen / Display:</span>
                        <span>{selectedProduct.specs.display}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trust perks */}
                <div className="mt-6 pt-4 border-t border-[#DED6CA] space-y-2 text-xs text-[#716F66]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#B89A6A]" />
                    <span>Complimentary insured courier delivery with signature</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B89A6A]" />
                    <span>2-Year international manufacturer warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-[#B89A6A]" />
                    <span>30-Day complimentary return policy in original packaging</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
