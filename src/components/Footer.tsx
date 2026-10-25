import React from 'react';
import { ValterLogo } from './ValterLogo';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/catalog';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentRoute, navigateToCollection, currency, setCurrency } = useStore();

  return (
    <footer className="bg-[#082F2B] text-[#F5F0E8] border-t border-[#31514A] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-[#31514A]">
          
          {/* Col 1: Brand & Philosophy (Takes 2 cols on lg) */}
          <div className="lg:col-span-2">
            <ValterLogo variant="light" size="md" showTagline={true} className="mb-5" />
            
            <p className="text-xs sm:text-sm text-[#F5F0E8]/75 leading-relaxed max-w-sm mb-6">
              Contemporary timepieces for people who value precision, craftsmanship, personal style, and timeless design. Meticulously engineered from alpine inspiration.
            </p>

            {/* Currency & Region Selector */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#052522] border border-[#31514A] rounded-sm text-xs text-[#F5F0E8]/90">
              <Globe className="w-3.5 h-3.5 text-[#B89A6A]" />
              <span className="text-[10px] tracking-wider uppercase text-[#716F66]">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-[#B89A6A] font-semibold text-xs focus:outline-none cursor-pointer"
              >
                <option value="USD" className="bg-[#082F2B] text-[#F5F0E8]">USD ($)</option>
                <option value="EUR" className="bg-[#082F2B] text-[#F5F0E8]">EUR (€)</option>
                <option value="GBP" className="bg-[#082F2B] text-[#F5F0E8]">GBP (£)</option>
              </select>
            </div>
          </div>

          {/* Col 2: Shop Collections */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#B89A6A] mb-4">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E8]/80">
              <li>
                <button
                  onClick={() => setCurrentRoute('shop')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  All Watches (Full Edit)
                </button>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateToCollection(cat.slug)}
                    className="hover:text-[#B89A6A] transition-colors"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#B89A6A] mb-4">
              CLIENT CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E8]/80">
              <li>
                <button
                  onClick={() => setCurrentRoute('contact')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  Contact & Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('contact')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  Boutique Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('contact')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  Shipping & Customs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('contact')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  Complimentary 30-Day Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('contact')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  2-Year International Warranty
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: The House */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#B89A6A] mb-4">
              THE HOUSE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E8]/80">
              <li>
                <button
                  onClick={() => setCurrentRoute('about')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('home')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  Notes on Time Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('about')}
                  className="hover:text-[#B89A6A] transition-colors"
                >
                  Materials & Craftsmanship
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('admin')}
                  className="text-[#B89A6A] hover:underline transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Admin Control Portal</span>
                </button>
              </li>
              <li>
                <span className="text-[#716F66] text-xs">
                  Geneva & Milan Design Studios
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#716F66] gap-4">
          <p>
            © 2026 VALTER. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Terms of Service</span>
            <span>·</span>
            <button
              onClick={() => setCurrentRoute('admin')}
              className="text-[#B89A6A] hover:text-[#F5F0E8] transition-colors font-semibold"
            >
              Owner Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
