import { Product, CollectionCategory } from './data/catalog';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export type ViewRoute = 
  | 'home'
  | 'shop'
  | 'collection-mens'
  | 'collection-womens'
  | 'collection-couples'
  | 'collection-luxury'
  | 'collection-sports'
  | 'collection-smart'
  | 'about'
  | 'contact'
  | 'checkout'
  | 'admin';

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  customLogoUrl: string;
  announcementBar: {
    enabled: boolean;
    text: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    imageUrl: string;
    badgeTitle: string;
    badgeSubtitle: string;
  };
  philosophy: {
    eyebrow: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    imageUrl: string;
  };
  contact: {
    conciergeEmail: string;
    phone: string;
    showroomAddress: string;
    showroomHours: string;
  };
}

export interface PlacedOrder {
  id: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  total: number;
  paymentMethod: 'card' | 'cod' | 'transfer';
  status: 'Pending' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
}
