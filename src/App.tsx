import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedCollection } from './components/FeaturedCollection';
import { BrandStory } from './components/BrandStory';
import { NewArrivals } from './components/NewArrivals';
import { CoupleWatchFeature } from './components/CoupleWatchFeature';
import { CampaignBanner } from './components/CampaignBanner';
import { SmartSportsFeature } from './components/SmartSportsFeature';
import { JournalSection } from './components/JournalSection';
import { NewsletterForm } from './components/NewsletterForm';
import { Footer } from './components/Footer';

// Modals & Drawers
import { SearchOverlay } from './components/SearchOverlay';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AccountModal } from './components/AccountModal';
import { ArticleModal } from './components/ArticleModal';

// Dedicated Views
import { ShopView } from './views/ShopView';
import { CollectionView } from './views/CollectionView';
import { CheckoutView } from './views/CheckoutView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

const MainContent: React.FC = () => {
  const { currentRoute, toast } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E9] text-[#1C2925] relative selection:bg-[#B89A6A] selection:text-[#082F2B]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#082F2B] text-[#F5F0E8] border border-[#B89A6A] px-5 py-3 rounded-xs shadow-2xl flex items-center gap-3 animate-slideUp text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-[#B89A6A]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            <HeroSection />
            <TrustStrip />
            <CategoryGrid />
            <FeaturedCollection />
            <BrandStory />
            <NewArrivals />
            <CoupleWatchFeature />
            <CampaignBanner />
            <SmartSportsFeature />
            <JournalSection />
            <NewsletterForm />
          </>
        )}

        {currentRoute === 'shop' && <ShopView />}
        {currentRoute === 'collection-mens' && <CollectionView categoryId="mens-watches" />}
        {currentRoute === 'collection-womens' && <CollectionView categoryId="womens-watches" />}
        {currentRoute === 'collection-couples' && <CollectionView categoryId="couple-watches" />}
        {currentRoute === 'collection-luxury' && <CollectionView categoryId="luxury-watches" />}
        {currentRoute === 'collection-sports' && <CollectionView categoryId="sports-watches" />}
        {currentRoute === 'collection-smart' && <CollectionView categoryId="smart-watches" />}
        {currentRoute === 'checkout' && <CheckoutView />}
        {currentRoute === 'about' && <AboutView />}
        {currentRoute === 'contact' && <ContactView />}
        {currentRoute === 'admin' && <AdminView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Overlays & Drawers */}
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <ProductDetailModal />
      <AccountModal />
      <ArticleModal />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

export default App;
