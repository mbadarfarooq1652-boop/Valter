import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock, Truck, CreditCard, Banknote, Building2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutView: React.FC = () => {
  const { cart, cartSubtotal, clearCart, setCurrentRoute, formatPrice, addOrder } = useStore();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'transfer'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  // Form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    postalCode: '',
    notes: ''
  });

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VALTER10') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "VALTER10" for 10% off.');
    }
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingAmount = cartSubtotal >= 150 ? 0 : 15;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `VLT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedId);

    // Save order into Admin orders ledger
    addOrder({
      id: generatedId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      customer: { ...formData },
      items: [...cart],
      total: finalTotal,
      paymentMethod,
      status: 'Pending'
    });

    setStep('success');
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="bg-[#F4F0E9] min-h-screen py-20 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif text-3xl text-[#082F2B] mb-3">Your Shopping Bag is Empty</h2>
        <p className="text-sm text-[#716F66] mb-6">
          Add items to your bag before proceeding to checkout.
        </p>
        <button
          onClick={() => setCurrentRoute('shop')}
          className="px-8 py-3.5 bg-[#082F2B] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm"
        >
          EXPLORE THE COLLECTION
        </button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="bg-[#F4F0E9] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white border border-[#DED6CA] rounded-sm p-8 sm:p-12 shadow-lg text-center">
          <div className="w-16 h-16 rounded-full bg-[#082F2B] text-[#B89A6A] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold block mb-2">
            ORDER CONFIRMED · VALTER ATELIER
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#082F2B] font-light mb-3">
            Thank You for Your Order
          </h1>
          <p className="text-sm text-[#716F66] mb-6">
            A confirmation receipt and courier tracking details will be dispatched to <strong>{formData.email || 'your email'}</strong> once your timepiece is inspected and packed.
          </p>

          <div className="bg-[#F4F0E9] border border-[#DED6CA] rounded-xs p-6 mb-8 text-left">
            <div className="flex justify-between items-center pb-3 border-b border-[#DED6CA]">
              <span className="text-xs text-[#716F66]">Order Reference:</span>
              <span className="font-mono font-bold text-[#082F2B] tracking-wide">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="text-[#716F66]">Shipping Address:</span>
              <span className="text-[#082F2B] font-medium text-right">
                {formData.address}, {formData.city} {formData.postalCode}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="text-[#716F66]">Estimated Delivery:</span>
              <span className="text-[#082F2B] font-medium">3–5 Business Days (Insured)</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#DED6CA] font-semibold text-sm">
              <span className="text-[#082F2B]">Amount Charged:</span>
              <span className="font-mono text-[#082F2B]">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCurrentRoute('home')}
              className="px-8 py-3.5 bg-[#082F2B] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#0B3B35]"
            >
              RETURN TO HOMEPAGE
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 bg-white border border-[#DED6CA] text-[#082F2B] text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#F4F0E9]"
            >
              PRINT RECEIPT
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F0E9] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top return */}
        <button
          onClick={() => setCurrentRoute('shop')}
          className="inline-flex items-center gap-2 text-xs text-[#716F66] hover:text-[#082F2B] mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form: 7 cols */}
          <div className="lg:col-span-7 bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-4 h-4 text-[#B89A6A]" />
              <h2 className="font-serif text-2xl text-[#082F2B]">
                Secure Boutique Checkout
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Contact details */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#B89A6A] font-semibold mb-3">
                  01. Client Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div className="pt-4 border-t border-[#DED6CA]">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#B89A6A] font-semibold mb-3">
                  02. Destination Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                        Country *
                      </label>
                      <select
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                      >
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Switzerland</option>
                        <option>United Arab Emirates</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Demo Simulator */}
              <div className="pt-4 border-t border-[#DED6CA]">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#B89A6A] font-semibold mb-3">
                  03. Payment Simulation (Demonstration Mode)
                </h3>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xs border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#082F2B] bg-[#082F2B] text-[#F5F0E8]'
                        : 'border-[#DED6CA] bg-[#F4F0E9] text-[#082F2B]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[10px] uppercase tracking-wider block font-medium">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xs border text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#082F2B] bg-[#082F2B] text-[#F5F0E8]'
                        : 'border-[#DED6CA] bg-[#F4F0E9] text-[#082F2B]'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[10px] uppercase tracking-wider block font-medium">Pay on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-3 rounded-xs border text-center transition-all ${
                      paymentMethod === 'transfer'
                        ? 'border-[#082F2B] bg-[#082F2B] text-[#F5F0E8]'
                        : 'border-[#DED6CA] bg-[#F4F0E9] text-[#082F2B]'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[10px] uppercase tracking-wider block font-medium">Bank Wire</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs space-y-3">
                    <div>
                      <label className="text-[10px] uppercase text-[#716F66] block mb-1">
                        Card Number (Demo)
                      </label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8892"
                        className="w-full px-3 py-2 bg-white border border-[#DED6CA] text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase text-[#716F66] block mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="08/28"
                          className="w-full px-3 py-2 bg-white border border-[#DED6CA] text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[#716F66] block mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          placeholder="•••"
                          className="w-full px-3 py-2 bg-white border border-[#DED6CA] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs text-[#716F66]">
                    Pay upon physical delivery to the insured courier driver via cash or card terminal.
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="p-4 bg-[#F4F0E9] border border-[#DED6CA] rounded-xs text-xs text-[#716F66]">
                    Direct bank wire instructions will be dispatched to your email upon order confirmation.
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-colors shadow-lg"
              >
                COMPLETE ORDER · {formatPrice(finalTotal)}
              </button>

            </form>
          </div>

          {/* Right Summary: 5 cols */}
          <div className="lg:col-span-5 bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-xl text-[#082F2B] pb-3 border-b border-[#DED6CA]">
              Order Summary ({cart.length} items)
            </h3>

            {/* List */}
            <div className="space-y-4 max-h-72 overflow-y-auto divide-y divide-[#DED6CA]">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3">
                  <div className="w-14 h-14 bg-[#EAE3D8] rounded-xs overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-serif text-sm text-[#082F2B] font-medium leading-tight">
                      {item.product.name}
                    </h5>
                    {item.product.isPair && (
                      <span className="text-[10px] text-[#B89A6A] font-semibold block">
                        Set of 2 Timepieces
                      </span>
                    )}
                    <span className="text-xs text-[#716F66]">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#082F2B] tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="pt-4 border-t border-[#DED6CA]">
              <label className="text-[10px] uppercase tracking-wider text-[#716F66] font-semibold block mb-1.5">
                Promotional Voucher (Use "VALTER10")
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="e.g. VALTER10"
                  className="flex-1 px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs uppercase font-mono rounded-xs focus:outline-none focus:border-[#B89A6A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#082F2B] text-[#F5F0E8] text-xs tracking-wider uppercase font-medium rounded-xs hover:bg-[#0B3B35]"
                >
                  Apply
                </button>
              </div>
              {discountPercent > 0 && (
                <span className="text-xs text-emerald-800 font-medium block mt-1.5">
                  ✓ 10% Luxury Privilege discount applied!
                </span>
              )}
              {promoError && (
                <span className="text-xs text-red-600 block mt-1.5">
                  {promoError}
                </span>
              )}
            </form>

            {/* Price breakdown */}
            <div className="pt-4 border-t border-[#DED6CA] space-y-2 text-xs">
              <div className="flex justify-between text-[#716F66]">
                <span>Subtotal</span>
                <span className="font-mono text-[#082F2B] tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Privilege Discount ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#716F66]">
                <span>Insured Global Courier</span>
                <span>{shippingAmount === 0 ? 'COMPLIMENTARY' : formatPrice(shippingAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#082F2B] pt-3 border-t border-[#DED6CA]">
                <span>Final Total</span>
                <span className="font-mono text-lg tabular-nums">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="p-4 bg-[#F4F0E9] rounded-xs border border-[#DED6CA] space-y-2 text-[11px] text-[#716F66]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B89A6A]" />
                <span>Complimentary tracked & insured delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B89A6A]" />
                <span>2-Year International Manufacturer Warranty</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
