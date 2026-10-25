import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    setCurrentRoute,
    formatPrice
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentRoute('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#F4F0E9] text-[#1C2925] shadow-2xl flex flex-col border-l border-[#DED6CA] z-50">
        
        {/* Drawer Header */}
        <div className="p-6 bg-[#082F2B] text-[#F5F0E8] flex items-center justify-between border-b border-[#31514A]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B89A6A]" />
            <h3 className="font-serif text-xl tracking-tight">Shopping Bag</h3>
            <span className="text-xs bg-[#052522] border border-[#31514A] px-2 py-0.5 rounded-full text-[#B89A6A] font-mono tabular-nums">
              {cartCount}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#F5F0E8] hover:text-[#B89A6A] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3.5 bg-[#EAE3D8] border-b border-[#DED6CA] text-xs">
          <div className="flex items-center justify-between text-[#082F2B] font-medium mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#B89A6A]" />
              {isFreeShipping ? (
                <span className="text-[#082F2B] font-semibold">You've unlocked Free Insured Shipping!</span>
              ) : (
                <span>
                  Add <strong>{formatPrice(freeShippingThreshold - cartSubtotal)}</strong> for Free Express Shipping
                </span>
              )}
            </span>
            <span className="font-mono text-[11px]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-[#DED6CA] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#B89A6A] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#DED6CA]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#EAE3D8] flex items-center justify-center text-[#716F66] mb-4">
                <ShoppingBag className="w-8 h-8 text-[#B89A6A]" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-2xl text-[#082F2B] mb-2">Your Bag is Empty</h4>
              <p className="text-xs text-[#716F66] max-w-xs mb-6">
                Discover our signature timepieces across men's, women's, couple, and luxury collections.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentRoute('shop');
                }}
                className="px-6 py-3 bg-[#082F2B] text-[#F5F0E8] text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#0B3B35] transition-colors"
              >
                EXPLORE WATCHES
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedVariant || 'default'}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                {/* Product Thumbnail */}
                <div className="w-20 h-20 bg-[#EAE3D8] border border-[#DED6CA] rounded-xs overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#716F66] block">
                        {item.product.categoryLabel}
                      </span>
                      <h5 className="font-serif text-base text-[#082F2B] font-medium leading-snug">
                        {item.product.name}
                      </h5>
                      {item.product.isPair && (
                        <span className="text-[10px] text-[#B89A6A] font-semibold block">
                          Set of 2 Timepieces Included
                        </span>
                      )}
                      {item.selectedVariant && (
                        <span className="text-[11px] text-[#716F66]">
                          Edition: {item.selectedVariant}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#716F66] hover:text-red-700 p-1 transition-colors"
                      aria-label="Remove item"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#DED6CA]/50">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DED6CA] rounded-xs bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#EAE3D8] text-[#082F2B] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-medium text-[#082F2B]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#EAE3D8] text-[#082F2B] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-mono text-sm font-semibold text-[#082F2B] tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#DED6CA] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#716F66]">
                <span>Subtotal</span>
                <span className="font-mono text-[#082F2B] font-medium tabular-nums">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#716F66]">
                <span>Insured Boutique Delivery</span>
                <span>{isFreeShipping ? 'COMPLIMENTARY' : formatPrice(15)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#082F2B] pt-2 border-t border-[#DED6CA]">
                <span>Estimated Total</span>
                <span className="font-mono text-base tabular-nums">
                  {formatPrice(isFreeShipping ? cartSubtotal : cartSubtotal + 15)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 shadow-md group"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 text-[#B89A6A] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 bg-transparent text-[#716F66] hover:text-[#082F2B] text-xs tracking-wider uppercase transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#716F66] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89A6A]" />
              <span>Complimentary 30-Day Returns & 2-Year International Guarantee</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
