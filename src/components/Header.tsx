import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { ValterLogo } from './ValterLogo';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/catalog';

export const Header: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    navigateToCollection,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAccountOpen,
    siteConfig
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnterMega = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveMega = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 220);
  };

  return (
    <>
      {/* Top Announcement Banner (Controlled via Admin CMS) */}
      {siteConfig?.announcementBar?.enabled && (
        <div className="bg-[#082F2B] text-[#F5F0E8] py-2 px-4 text-center text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium border-b border-[#31514A] flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B89A6A] animate-pulse" />
          <span>{siteConfig.announcementBar.text}</span>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F4F0E9]/95 backdrop-blur-md shadow-sm border-b border-[#DED6CA]'
            : 'bg-[#F4F0E9] border-b border-[#DED6CA]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand Emblem & Wordmark */}
          <button
            onClick={() => {
              setCurrentRoute('home');
              setIsMobileMenuOpen(false);
            }}
            className="group flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B89A6A]"
            aria-label="VALTER Homepage"
          >
            <ValterLogo variant="dark" size="md" />
          </button>

          {/* Center: Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-medium tracking-[0.2em] text-[#1C2925]/90">
            <button
              onClick={() => setCurrentRoute('home')}
              className={`hover:text-[#B89A6A] transition-colors py-2 uppercase ${
                currentRoute === 'home' ? 'text-[#B89A6A] font-semibold border-b border-[#B89A6A]' : ''
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => setCurrentRoute('collection-mens')}
              className={`hover:text-[#B89A6A] transition-colors py-2 uppercase ${
                currentRoute === 'collection-mens' ? 'text-[#B89A6A] font-semibold border-b border-[#B89A6A]' : ''
              }`}
            >
              MEN
            </button>
            <button
              onClick={() => setCurrentRoute('collection-womens')}
              className={`hover:text-[#B89A6A] transition-colors py-2 uppercase ${
                currentRoute === 'collection-womens' ? 'text-[#B89A6A] font-semibold border-b border-[#B89A6A]' : ''
              }`}
            >
              WOMEN
            </button>
            <button
              onClick={() => setCurrentRoute('collection-couples')}
              className={`hover:text-[#B89A6A] transition-colors py-2 uppercase ${
                currentRoute === 'collection-couples' ? 'text-[#B89A6A] font-semibold border-b border-[#B89A6A]' : ''
              }`}
            >
              COUPLES
            </button>

            {/* COLLECTIONS Mega Menu Trigger */}
            <div
              className="relative py-2"
              onMouseEnter={handleMouseEnterMega}
              onMouseLeave={handleMouseLeaveMega}
            >
              <button
                onClick={() => setCurrentRoute('shop')}
                className={`flex items-center gap-1 hover:text-[#B89A6A] transition-colors uppercase ${
                  isMegaMenuOpen || currentRoute.startsWith('collection') || currentRoute === 'shop'
                    ? 'text-[#B89A6A]'
                    : ''
                }`}
                aria-expanded={isMegaMenuOpen}
              >
                <span>COLLECTIONS</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#B89A6A]' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div
                  className="fixed left-0 top-20 w-full bg-[#F4F0E9] text-[#1C2925] border-b border-[#DED6CA] shadow-2xl transition-all duration-300 py-8 px-6 lg:px-12 z-50 animate-fadeIn"
                  onMouseEnter={handleMouseEnterMega}
                  onMouseLeave={handleMouseLeaveMega}
                >
                  <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#DED6CA]/70">
                      <div>
                        <span className="text-[10px] tracking-[0.25em] text-[#B89A6A] uppercase font-semibold">
                          HAUTE HORLOGERIE & LIFESTYLE
                        </span>
                        <h3 className="font-serif text-2xl text-[#082F2B] font-normal">
                          The Six VALTER Collections
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentRoute('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#082F2B] font-medium hover:text-[#B89A6A] transition-colors group"
                      >
                        <span>View All Timepieces</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    <div className="grid grid-cols-6 gap-5">
                      {CATEGORIES.map(category => (
                        <div
                          key={category.id}
                          onClick={() => {
                            navigateToCollection(category.slug);
                            setIsMegaMenuOpen(false);
                          }}
                          className="group/card cursor-pointer p-2.5 rounded border border-[#DED6CA]/60 bg-white/70 hover:bg-white hover:border-[#B89A6A] hover:shadow-md transition-all duration-200 flex flex-col h-full"
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#EAE3D8] mb-3">
                            <img
                              src={category.image}
                              alt={category.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-[9px] tracking-widest text-[#B89A6A] uppercase font-semibold mb-0.5">
                            Collection
                          </span>
                          <h4 className="font-serif text-base text-[#082F2B] font-medium group-hover/card:text-[#B89A6A] transition-colors leading-tight mb-1">
                            {category.title}
                          </h4>
                          <p className="text-[11px] text-[#716F66] line-clamp-2 leading-relaxed mb-3 flex-1">
                            {category.description}
                          </p>
                          <span className="text-[9px] tracking-[0.15em] uppercase text-[#082F2B] font-semibold group-hover/card:text-[#B89A6A] inline-flex items-center gap-1">
                            Explore <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentRoute('about')}
              className={`hover:text-[#B89A6A] transition-colors py-2 uppercase ${
                currentRoute === 'about' ? 'text-[#B89A6A] font-semibold border-b border-[#B89A6A]' : ''
              }`}
            >
              OUR STORY
            </button>
            <button
              onClick={() => setCurrentRoute('contact')}
              className={`hover:text-[#B89A6A] transition-colors py-2 uppercase ${
                currentRoute === 'contact' ? 'text-[#B89A6A] font-semibold border-b border-[#B89A6A]' : ''
              }`}
            >
              CONTACT
            </button>
          </nav>

          {/* Right: Action Utilities */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-[#1C2925]">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-[#B89A6A] transition-colors focus:outline-none"
              aria-label="Search catalog"
              title="Search Timepieces"
            >
              <Search className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Account Icon */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2 hover:text-[#B89A6A] transition-colors focus:outline-none hidden sm:inline-flex"
              aria-label="Client Account"
              title="Client Account"
            >
              <User className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 hover:text-[#B89A6A] transition-colors relative focus:outline-none"
              aria-label={`Wishlist (${wishlist.length} saved)`}
              title="Saved Timepieces"
            >
              <Heart className="w-5 h-5" strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B89A6A] text-[#082F2B] font-bold text-[9px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-[#B89A6A] transition-colors relative focus:outline-none"
              aria-label={`Shopping bag with ${cartCount} items`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B89A6A] text-[#082F2B] font-bold text-[9px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Portal Direct Button */}
            <button
              onClick={() => setCurrentRoute('admin')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-semibold tracking-widest rounded-xs border transition-colors ${
                currentRoute === 'admin'
                  ? 'bg-[#082F2B] text-[#B89A6A] border-[#082F2B]'
                  : 'bg-[#EAE3D8] hover:bg-[#B89A6A] text-[#082F2B] border-[#DED6CA]'
              }`}
              title="Valter Master Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89A6A]" />
              <span>ADMIN</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1C2925] hover:text-[#B89A6A] transition-colors lg:hidden focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#082F2B] text-[#F5F0E8] border-l border-[#31514A] shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#31514A]">
              <ValterLogo variant="light" size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#F5F0E8] hover:text-[#B89A6A] focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Links */}
            <div className="py-6 flex flex-col space-y-4 text-xs tracking-[0.2em] uppercase font-medium">
              <button
                onClick={() => {
                  setCurrentRoute('home');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#B89A6A] transition-colors"
              >
                HOME
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('shop');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#B89A6A] transition-colors"
              >
                ALL WATCHES
              </button>

              <div className="pt-2 pb-1 border-t border-[#31514A]/60">
                <span className="text-[10px] tracking-[0.25em] text-[#B89A6A] font-semibold block mb-3">
                  SHOP BY COLLECTION
                </span>
                <div className="grid grid-cols-1 gap-2.5 pl-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigateToCollection(cat.slug);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-sm text-[#F5F0E8]/90 hover:text-[#B89A6A] transition-colors flex items-center justify-between py-1"
                    >
                      <span>{cat.title}</span>
                      <ArrowRight className="w-3 h-3 text-[#B89A6A]" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#31514A]/60 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setCurrentRoute('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 hover:text-[#B89A6A] transition-colors"
                >
                  OUR STORY
                </button>
                <button
                  onClick={() => {
                    setCurrentRoute('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 hover:text-[#B89A6A] transition-colors"
                >
                  CONTACT & BOUTIQUE
                </button>
                <button
                  onClick={() => {
                    setIsAccountOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 hover:text-[#B89A6A] transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#B89A6A]" />
                  <span>CLIENT ACCOUNT</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRoute('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 hover:text-[#B89A6A] transition-colors flex items-center gap-2 text-[#B89A6A] font-semibold"
                >
                  <ShieldCheck className="w-4 h-4 text-[#B89A6A]" />
                  <span>ADMIN CONTROL PANEL</span>
                </button>
              </div>
            </div>

            {/* Bottom info */}
            <div className="mt-auto pt-6 border-t border-[#31514A] text-center">
              <p className="text-[10px] tracking-[0.2em] text-[#B89A6A] uppercase mb-1">
                TIMELESS DESIGN. DISTINCTIVE CHARACTER.
              </p>
              <p className="text-[11px] text-[#716F66]">
                Complimentary worldwide boutique insured shipping on all orders.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
