import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS, CollectionCategory, CATEGORIES, JournalArticle, JOURNAL_ARTICLES } from '../data/catalog';
import { CartItem, ViewRoute, SiteConfig, PlacedOrder } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'VALTER',
  brandTagline: 'TIMELESS DESIGN. DISTINCTIVE CHARACTER.',
  customLogoUrl: '',
  announcementBar: {
    enabled: true,
    text: 'Complimentary Worldwide Insured Delivery & 2-Year International Guarantee'
  },
  hero: {
    eyebrow: 'TIMELESS BY DESIGN',
    headline: 'More Than a Watch.',
    headlineHighlight: 'A Statement.',
    subheadline: 'Discover distinctive timepieces for every style, every occasion, and every moment that matters. Meticulously designed with surgical steel, sapphire crystal, and balanced proportions.',
    primaryCtaText: 'EXPLORE ALL WATCHES',
    secondaryCtaText: 'DISCOVER OUR COLLECTIONS',
    imageUrl: '/images/hero_emerald_watch_1792603314884.jpg',
    badgeTitle: 'FEATURED TIMEPIECE',
    badgeSubtitle: 'The Evergreen Automatic · $425'
  },
  philosophy: {
    eyebrow: 'THE VALTER PHILOSOPHY',
    headline: 'Crafted with Purpose',
    paragraph1: 'At VALTER, we believe a timepiece is more than an accessory. It is a reflection of personal style, individual character, and the moments that shape our lives. Our approach brings together thoughtful proportions, refined details, and a modern appreciation for timeless design.',
    paragraph2: 'Every dial is calibrated for balance under varying light, every case is milled from surgical-grade stainless steel or aerospace titanium, and every strap is chosen for tactile longevity.',
    imageUrl: '/images/brand_story_lifestyle_1792603333608.jpg'
  },
  contact: {
    conciergeEmail: 'concierge@valterwatches.com',
    phone: '+41 22 819 4000',
    showroomAddress: 'Rue du Rhône 42, 1204 Genève, Switzerland',
    showroomHours: 'Tuesday – Saturday: 10:00 – 18:30 (By appointment)'
  }
};

const INITIAL_DEMO_ORDERS: PlacedOrder[] = [
  {
    id: 'VLT-849120',
    createdAt: '2026-10-24 14:32',
    customer: {
      firstName: 'Alexander',
      lastName: 'Sterling',
      email: 'alex.sterling@couture.com',
      phone: '+1 212 555 0192',
      address: '740 Park Avenue, Apt 14B',
      city: 'New York',
      postalCode: '10021',
      country: 'United States'
    },
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1
      }
    ],
    total: 425,
    paymentMethod: 'card',
    status: 'Processing'
  },
  {
    id: 'VLT-632941',
    createdAt: '2026-10-23 09:15',
    customer: {
      firstName: 'Sophie',
      lastName: 'Laurent',
      email: 'sophie.laurent@paris.fr',
      phone: '+33 1 42 68 55 00',
      address: '28 Rue de la Paix',
      city: 'Paris',
      postalCode: '75002',
      country: 'France'
    },
    items: [
      {
        product: PRODUCTS[6], // Together set
        quantity: 1
      }
    ],
    total: 520,
    paymentMethod: 'card',
    status: 'Dispatched'
  }
];

interface StoreContextType {
  // Navigation
  currentRoute: ViewRoute;
  setCurrentRoute: (route: ViewRoute) => void;
  navigateToCollection: (categorySlug: string) => void;
  
  // Products Dynamic State
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetProductsToDefault: () => void;

  // Categories Dynamic State
  categories: CollectionCategory[];
  updateCategory: (category: CollectionCategory) => void;

  // Site Config / CMS State
  siteConfig: SiteConfig;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  resetSiteConfigToDefault: () => void;

  // Orders State
  orders: PlacedOrder[];
  addOrder: (order: PlacedOrder) => void;
  updateOrderStatus: (orderId: string, status: PlacedOrder['status']) => void;
  deleteOrder: (orderId: string) => void;

  // Admin Auth State
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedArticle: JournalArticle | null;
  setSelectedArticle: (article: JournalArticle | null) => void;

  // Toast notification
  toast: string | null;
  showToast: (msg: string) => void;

  // Currency
  currency: string;
  setCurrency: (c: string) => void;
  formatPrice: (price: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRouteState] = useState<ViewRoute>('home');
  
  // Dynamic Products initialized from LocalStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('valter_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Dynamic Categories initialized from LocalStorage
  const [categories, setCategories] = useState<CollectionCategory[]>(() => {
    try {
      const saved = localStorage.getItem('valter_categories');
      return saved ? JSON.parse(saved) : CATEGORIES;
    } catch {
      return CATEGORIES;
    }
  });

  // Dynamic Site Config / CMS Content
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('valter_site_config');
      return saved ? JSON.parse(saved) : DEFAULT_SITE_CONFIG;
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('valter_orders');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('valter_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('valter_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('valter_wishlist');
      return saved ? JSON.parse(saved) : ['valter-evergreen', 'valter-together-set'];
    } catch {
      return ['valter-evergreen', 'valter-together-set'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [currency, setCurrency] = useState('USD');

  // Persistence hooks
  useEffect(() => {
    try {
      localStorage.setItem('valter_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Storage error products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('valter_categories', JSON.stringify(categories));
    } catch (e) {
      console.warn('Storage error categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('valter_site_config', JSON.stringify(siteConfig));
    } catch (e) {
      console.warn('Storage error siteConfig', e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('valter_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage error orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('valter_admin_auth', isAdminAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.warn('Storage error admin auth', e);
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('valter_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage error cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('valter_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage error wishlist', e);
    }
  }, [wishlist]);

  // Toast timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  const setCurrentRoute = (route: ViewRoute) => {
    setCurrentRouteState(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCollection = (categorySlug: string) => {
    if (categorySlug.includes('mens')) setCurrentRoute('collection-mens');
    else if (categorySlug.includes('womens')) setCurrentRoute('collection-womens');
    else if (categorySlug.includes('couple')) setCurrentRoute('collection-couples');
    else if (categorySlug.includes('luxury')) setCurrentRoute('collection-luxury');
    else if (categorySlug.includes('sports')) setCurrentRoute('collection-sports');
    else if (categorySlug.includes('smart')) setCurrentRoute('collection-smart');
    else setCurrentRoute('shop');
  };

  // Product CRUD
  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added timepiece "${newProduct.name}" to catalog.`);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showToast(`Updated timepiece "${updatedProduct.name}".`);
  };

  const deleteProduct = (productId: string) => {
    const p = products.find(prod => prod.id === productId);
    setProducts(prev => prev.filter(prod => prod.id !== productId));
    setCart(prev => prev.filter(item => item.product.id !== productId));
    setWishlist(prev => prev.filter(id => id !== productId));
    showToast(`Deleted "${p ? p.name : 'Product'}" from catalog.`);
  };

  const resetProductsToDefault = () => {
    setProducts(PRODUCTS);
    showToast('Reset catalog to factory default timepieces.');
  };

  // Category management
  const updateCategory = (updatedCat: CollectionCategory) => {
    setCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c));
    showToast(`Updated collection "${updatedCat.title}".`);
  };

  // Site Config / CMS management
  const updateSiteConfig = (partialConfig: Partial<SiteConfig>) => {
    setSiteConfig(prev => ({ ...prev, ...partialConfig }));
    showToast('Updated website settings & content successfully.');
  };

  const resetSiteConfigToDefault = () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    showToast('Reset website branding & hero texts to defaults.');
  };

  // Orders management
  const addOrder = (order: PlacedOrder) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: PlacedOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order #${orderId} marked as ${status}.`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(`Deleted order #${orderId}.`);
  };

  // Admin Authentication
  const adminLogin = (pin: string) => {
    // Default master PIN is 'valter2026' or 'admin123' or 'admin'
    if (pin.trim() === 'valter2026' || pin.trim() === 'admin123' || pin.trim() === 'admin') {
      setIsAdminAuthenticated(true);
      showToast('Master Admin Access Granted.');
      return true;
    }
    showToast('Invalid Admin Security PIN. (Hint: valter2026)');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    showToast('Admin logged out.');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedVariant === selectedVariant);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedVariant }];
    });
    showToast(`Added "${product.name}" to shopping bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed item from shopping bag');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const prodName = product ? product.name : 'Timepiece';
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed "${prodName}" from saved items`);
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved "${prodName}" to your wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const formatPrice = (price: number) => {
    if (currency === 'EUR') return `€${Math.round(price * 0.92)}`;
    if (currency === 'GBP') return `£${Math.round(price * 0.79)}`;
    return `$${price.toLocaleString()}`;
  };

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        navigateToCollection,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        categories,
        updateCategory,
        siteConfig,
        updateSiteConfig,
        resetSiteConfigToDefault,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminLogin,
        adminLogout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen,
        selectedProduct,
        setSelectedProduct,
        selectedArticle,
        setSelectedArticle,
        toast,
        showToast,
        currency,
        setCurrency,
        formatPrice
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
