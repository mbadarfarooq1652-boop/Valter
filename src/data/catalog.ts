export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  category: 'mens-watches' | 'womens-watches' | 'couple-watches' | 'luxury-watches' | 'sports-watches' | 'smart-watches';
  categoryLabel: string;
  description: string;
  shortDescription: string;
  image: string;
  additionalImages?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isPair?: boolean;
  pairDetails?: string;
  inStock: boolean;
  specs: {
    caseDiameter: string;
    caseThickness: string;
    movement: string;
    crystal: string;
    waterResistance: string;
    strap: string;
    caseMaterial: string;
    powerReserve?: string;
    display?: string;
    compatibility?: string;
  };
}

export interface CollectionCategory {
  id: 'mens-watches' | 'womens-watches' | 'couple-watches' | 'luxury-watches' | 'sports-watches' | 'smart-watches';
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  ctaText: string;
  slug: string;
  image: string;
}

export const CATEGORIES: CollectionCategory[] = [
  {
    id: 'mens-watches',
    title: "Men's Watches",
    eyebrow: "DESIGNED WITH CHARACTER",
    headline: "Distinctive Confidence & Everyday Elegance",
    description: "Explore considered designs that bring confidence and versatility to everyday wear.",
    ctaText: "SHOP MEN'S WATCHES",
    slug: '/collections/mens-watches',
    image: '/images/cat_mens_watch_1792603314936.jpg'
  },
  {
    id: 'womens-watches',
    title: "Women's Watches",
    eyebrow: "ELEGANCE IN EVERY DETAIL",
    headline: "Graceful Craftsmanship & Refined Silhouette",
    description: "Discover refined timepieces designed to complement personal style with delicate proportions.",
    ctaText: "SHOP WOMEN'S WATCHES",
    slug: '/collections/womens-watches',
    image: '/images/cat_womens_watch_1792603315966.jpg'
  },
  {
    id: 'couple-watches',
    title: "Couple Watches",
    eyebrow: "TWO TIMEPIECES. ONE STORY.",
    headline: "Complementary Pairs to Celebrate Shared Moments",
    description: "Coordinated timepieces created to celebrate shared occasions, milestones, and enduring bonds.",
    ctaText: "SHOP COUPLE WATCHES",
    slug: '/collections/couple-watches',
    image: '/images/cat_couple_watches_1792603317361.jpg'
  },
  {
    id: 'luxury-watches',
    title: "Luxury Watches",
    eyebrow: "AN ELEVATED PERSPECTIVE",
    headline: "Haute Horlogerie & Exceptional Mechanical Finishing",
    description: "Discover statement-making designs with refined details, exhibition movements, and a premium aesthetic.",
    ctaText: "SHOP LUXURY WATCHES",
    slug: '/collections/luxury-watches',
    image: '/images/cat_luxury_watch_1792603317321.jpg'
  },
  {
    id: 'sports-watches',
    title: "Sports Watches",
    eyebrow: "READY FOR YOUR EVERYDAY",
    headline: "Dynamic Performance & Robust Modern Presence",
    description: "Explore dynamic designs inspired by movement, resilience, and an active modern lifestyle.",
    ctaText: "SHOP SPORTS WATCHES",
    slug: '/collections/sports-watches',
    image: '/images/cat_sports_watch_1792603317550.jpg'
  },
  {
    id: 'smart-watches',
    title: "Smart Watches",
    eyebrow: "MODERN TIME, CONNECTED",
    headline: "Contemporary Technology & Elevated Horology",
    description: "Contemporary watches bringing advanced connectivity, health tracking, and timeless design together.",
    ctaText: "SHOP SMART WATCHES",
    slug: '/collections/smart-watches',
    image: '/images/cat_smart_watch_1792603333900.jpg'
  }
];

export const PRODUCTS: Product[] = [
  // 1. Men's Watches
  {
    id: 'valter-evergreen',
    name: 'The Evergreen',
    slug: 'the-evergreen',
    price: 425,
    currency: '$',
    category: 'mens-watches',
    categoryLabel: "Men's Watches",
    shortDescription: "Sunburst emerald dial with champagne gold-tone fluted bezel and integrated solid steel bracelet.",
    description: "The signature VALTER timepiece. Inspired by alpine pine forests and classic mid-century horology, The Evergreen pairs a radiant sunburst emerald dial with a precision-milled gold bezel and multi-link oyster bracelet. Engineered for both formal occasions and everyday refinement.",
    image: '/images/hero_emerald_watch_1792603314884.jpg',
    additionalImages: [
      '/images/cat_mens_watch_1792603314936.jpg',
      '/images/brand_story_lifestyle_1792603333608.jpg'
    ],
    isFeatured: true,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "40 mm",
      caseThickness: "11.2 mm",
      movement: "Swiss Calibre Automatic (28,800 vph)",
      crystal: "Anti-reflective Sapphire Crystal",
      waterResistance: "100 meters / 10 ATM",
      strap: "Brushed 316L Stainless Steel & Champagne PVD Gold",
      caseMaterial: "316L Surgical-Grade Stainless Steel",
      powerReserve: "42 Hours"
    }
  },
  {
    id: 'valter-sterling',
    name: 'The Sterling Chrono',
    slug: 'the-sterling-chrono',
    price: 350,
    currency: '$',
    category: 'mens-watches',
    categoryLabel: "Men's Watches",
    shortDescription: "Triple register chronograph with forest green dial and saddle-stitched Italian leather strap.",
    description: "A tribute to vintage grand touring chronographs. The Sterling Chrono features high-contrast subsidiary dials, dual pushers with tactile feedback, and an artisan hand-burnished green alligator-embossed leather strap.",
    image: '/images/cat_mens_watch_1792603314936.jpg',
    additionalImages: [
      '/images/hero_emerald_watch_1792603314884.jpg'
    ],
    isFeatured: true,
    isNew: true,
    inStock: true,
    specs: {
      caseDiameter: "41.5 mm",
      caseThickness: "12.0 mm",
      movement: "Mecca-Quartz Chronograph Movement",
      crystal: "Domed Double-AR Sapphire",
      waterResistance: "50 meters / 5 ATM",
      strap: "Genuine Italian Calfskin Leather with Deployant Clasp",
      caseMaterial: "Dual-tone Stainless Steel & Champagne Gold"
    }
  },
  {
    id: 'valter-aethel-heritage',
    name: 'The Heritage Automatic',
    slug: 'the-heritage-automatic',
    price: 480,
    currency: '$',
    category: 'mens-watches',
    categoryLabel: "Men's Watches",
    shortDescription: "Minimalist sector dial with blued hands, exhibition sapphire caseback, and 42-hour power reserve.",
    description: "Understated sophistication at its finest. The Heritage Automatic highlights pure dial geometry, polished applied baton markers, and a display caseback revealing the decorated rotor and balance wheel.",
    image: '/images/cat_mens_watch_1792603314936.jpg',
    isFeatured: false,
    isNew: true,
    inStock: true,
    specs: {
      caseDiameter: "39 mm",
      caseThickness: "10.4 mm",
      movement: "Precision Automatic Calibre 8215",
      crystal: "Scratch-Resistant Sapphire Crystal",
      waterResistance: "50 meters / 5 ATM",
      strap: "Horween Leather Strap, Quick-Release",
      caseMaterial: "Fine-Brushed 316L Stainless Steel",
      powerReserve: "42 Hours"
    }
  },

  // 2. Women's Watches
  {
    id: 'valter-meridian',
    name: 'The Meridian',
    slug: 'the-meridian',
    price: 295,
    currency: '$',
    category: 'womens-watches',
    categoryLabel: "Women's Watches",
    shortDescription: "Shimmering mother-of-pearl dial framed in champagne gold with a delicate Milanese mesh bracelet.",
    description: "The Meridian embodies quiet luxury. Its iridescent mother-of-pearl dial catches ambient light softly, accented by diamond-cut hour markers and an ultra-supple champagne gold Milanese mesh bracelet that drapes seamlessly around the wrist.",
    image: '/images/cat_womens_watch_1792603315966.jpg',
    additionalImages: [
      '/images/brand_story_lifestyle_1792603333608.jpg'
    ],
    isFeatured: true,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "32 mm",
      caseThickness: "7.8 mm",
      movement: "High-Precision Swiss Quartz Movement",
      crystal: "Sapphire Crystal with Anti-Scratch Coating",
      waterResistance: "30 meters / 3 ATM",
      strap: "Champagne Gold Milanese Mesh with Safety Buckle",
      caseMaterial: "316L Stainless Steel with 18K Champagne PVD"
    }
  },
  {
    id: 'valter-solstice',
    name: 'The Solstice',
    slug: 'the-solstice',
    price: 325,
    currency: '$',
    category: 'womens-watches',
    categoryLabel: "Women's Watches",
    shortDescription: "Petite 30mm cushion case with warm champagne dial and polished five-link jewelry bracelet.",
    description: "Subtle elegance tailored for graceful everyday wear. The Solstice blends soft curved contours with hand-polished bevels and a sunray dial that complements both evening attire and tailored casual pieces.",
    image: '/images/cat_womens_watch_1792603315966.jpg',
    isFeatured: true,
    isNew: true,
    inStock: true,
    specs: {
      caseDiameter: "30 mm",
      caseThickness: "7.4 mm",
      movement: "Japanese Two-Hand Slim Quartz",
      crystal: "Beveled Sapphire Crystal",
      waterResistance: "50 meters / 5 ATM",
      strap: "Five-Link Jewelry Bracelet with Butterfly Clasp",
      caseMaterial: "Polished Rose-Gold Tone Stainless Steel"
    }
  },
  {
    id: 'valter-petite-royale',
    name: 'The Petite Royale',
    slug: 'the-petite-royale',
    price: 275,
    currency: '$',
    category: 'womens-watches',
    categoryLabel: "Women's Watches",
    shortDescription: "Geometric rectangular art-deco silhouette with Roman numerals and ivory cabochon crown.",
    description: "An homage to classic Parisian watchmaking. The Petite Royale features elongated Roman indices, thermal-blued hands, and a fluted crown inset with a synthetic sapphire cabochon.",
    image: '/images/cat_womens_watch_1792603315966.jpg',
    isFeatured: false,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "24 x 31 mm",
      caseThickness: "6.9 mm",
      movement: "Ultra-Thin Precision Quartz",
      crystal: "Curved Mineral Sapphire-Coated Glass",
      waterResistance: "30 meters / 3 ATM",
      strap: "Supple Suede Calfskin with Gold Pin Buckle",
      caseMaterial: "Champagne Gold Ion-Plated Brass & Steel"
    }
  },

  // 3. Couple Watches
  {
    id: 'valter-together-set',
    name: 'The Together Set',
    slug: 'the-together-set',
    price: 520,
    currency: '$',
    category: 'couple-watches',
    categoryLabel: "Couple Watches",
    isPair: true,
    pairDetails: "Set of 2 Timepieces: Includes 1x 40mm Men's and 1x 32mm Women's matching emerald & gold watches in a dual velvet presentation box.",
    shortDescription: "Complete set of two coordinated timepieces featuring matching sunburst emerald dials and champagne gold link bracelets.",
    description: "Designed to commemorate shared beginnings, anniversaries, and milestones. The Together Set includes two individually proportioned watches—a 40mm men's edition and a 32mm women's edition. Each timepiece shares the signature VALTER emerald dial, champagne gold fluted bezel, and integrated link bracelet, presented together in a bespoke keepsake box.",
    image: '/images/cat_couple_watches_1792603317361.jpg',
    additionalImages: [
      '/images/hero_emerald_watch_1792603314884.jpg',
      '/images/cat_womens_watch_1792603315966.jpg'
    ],
    isFeatured: true,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "40 mm (His) / 32 mm (Hers)",
      caseThickness: "10.5 mm / 8.0 mm",
      movement: "Synchronized High-Accuracy Japanese Quartz",
      crystal: "Dual Sapphire Crystals with Anti-Glare",
      waterResistance: "50 meters / 5 ATM each",
      strap: "Coordinated Champagne Gold Solid Link Bracelets",
      caseMaterial: "316L Stainless Steel with 18K Champagne Gold PVD"
    }
  },
  {
    id: 'valter-harmony-duo',
    name: 'The Harmony Duo',
    slug: 'the-harmony-duo',
    price: 610,
    currency: '$',
    category: 'couple-watches',
    categoryLabel: "Couple Watches",
    isPair: true,
    pairDetails: "Set of 2 Timepieces: Includes matching silver sunray dial automatic edition (41mm) and quartz edition (33mm).",
    shortDescription: "Two coordinated timepieces in dual-tone silver and champagne gold, celebrating eternal harmony.",
    description: "An understated matching pair crafted for couples with an eye for subtle luxury. Features matching guilloché dial textures, luminescent hands, and dual-tone bracelets that gracefully transition from morning casual to formal gala.",
    image: '/images/cat_couple_watches_1792603317361.jpg',
    isFeatured: false,
    isNew: true,
    inStock: true,
    specs: {
      caseDiameter: "41 mm (His) / 33 mm (Hers)",
      caseThickness: "11.0 mm / 8.2 mm",
      movement: "Automatic 3-Hand (His) / Slim Quartz (Hers)",
      crystal: "Scratch-Resistant Sapphire Crystal",
      waterResistance: "50 meters / 5 ATM",
      strap: "Dual-Tone Brushed Stainless & Champagne PVD",
      caseMaterial: "Polished 316L Steel & Gold PVD"
    }
  },
  {
    id: 'valter-horizon-pair',
    name: 'The Horizon Pair',
    slug: 'the-horizon-pair',
    price: 490,
    currency: '$',
    category: 'couple-watches',
    categoryLabel: "Couple Watches",
    isPair: true,
    pairDetails: "Set of 2 Timepieces: Includes 1x 40mm and 1x 34mm minimalist editions with matched forest-green dials.",
    shortDescription: "Two minimalist timepieces celebrating shared horizons with matte dials and warm saddle leather straps.",
    description: "Understated and modern. The Horizon Pair is designed for couples who appreciate contemporary minimalism over ornate ornamentation. Crisp markers and supple matched Italian leather straps celebrate quiet connection.",
    image: '/images/cat_couple_watches_1792603317361.jpg',
    isFeatured: false,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "40 mm (His) / 34 mm (Hers)",
      caseThickness: "9.5 mm / 7.6 mm",
      movement: "Precision Japanese Quartz",
      crystal: "Flat Sapphire Crystal",
      waterResistance: "30 meters / 3 ATM",
      strap: "Genuine Full-Grain Italian Leather",
      caseMaterial: "Brushed 316L Stainless Steel"
    }
  },

  // 4. Luxury Watches
  {
    id: 'valter-nocturne',
    name: 'The Nocturne Skeleton',
    slug: 'the-nocturne-skeleton',
    price: 450,
    currency: '$',
    category: 'luxury-watches',
    categoryLabel: "Luxury Watches",
    shortDescription: "Openworked mechanical movement with hand-finished bridges, rose gold bezel, and exhibition dial.",
    description: "The apex of artisanal mechanical watchmaking in the VALTER collection. The Nocturne showcases an openworked caliber with perlage decoration, visible blued screws, and a dual-stepped fluted rose gold bezel mounted on a genuine leather strap.",
    image: '/images/cat_luxury_watch_1792603317321.jpg',
    additionalImages: [
      '/images/hero_emerald_watch_1792603314884.jpg'
    ],
    isFeatured: true,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "42 mm",
      caseThickness: "12.8 mm",
      movement: "Skeletonised Self-Winding Mechanical Calibre (21,600 vph)",
      crystal: "Dual Domed Sapphire with Multi-Layer Anti-Reflective Coating",
      waterResistance: "50 meters / 5 ATM",
      strap: "Hand-Stitched Embossed Alligator-Grain Leather",
      caseMaterial: "Rose-Gold Plated 316L Surgical Steel",
      powerReserve: "40 Hours"
    }
  },
  {
    id: 'valter-grand-celestial',
    name: 'The Grand Celestial',
    slug: 'the-grand-celestial',
    price: 780,
    currency: '$',
    category: 'luxury-watches',
    categoryLabel: "Luxury Watches",
    shortDescription: "Moonphase complication with deep aventurine starfield dial and 18K champagne PVD case.",
    description: "Inspired by clear night skies over Swiss valleys. The Grand Celestial incorporates a high-accuracy astronomical moonphase disc that traces the lunar cycle across a dial crafted from natural aventurine mineral stone.",
    image: '/images/cat_luxury_watch_1792603317321.jpg',
    isFeatured: false,
    isNew: true,
    inStock: true,
    specs: {
      caseDiameter: "41 mm",
      caseThickness: "11.8 mm",
      movement: "Automatic Moonphase Calibre 9015",
      crystal: "Curved Sapphire Crystal",
      waterResistance: "50 meters / 5 ATM",
      strap: "Midnight Blue Louisiana Calfskin with Deployant",
      caseMaterial: "316L Steel with Micro-Blasted Gold PVD",
      powerReserve: "42 Hours"
    }
  },
  {
    id: 'valter-sovereign',
    name: 'The Sovereign Open-Heart',
    slug: 'the-sovereign-open-heart',
    price: 950,
    currency: '$',
    category: 'luxury-watches',
    categoryLabel: "Luxury Watches",
    shortDescription: "Haute horlogerie open-heart aperture at 9 o'clock revealing balance wheel oscillations.",
    description: "Built for true horology connoisseurs. The Sovereign features an open-heart dial revealing the pulsating balance spring, surrounded by concentric guilloché rings and hand-applied rose gold Roman numerals.",
    image: '/images/cat_luxury_watch_1792603317321.jpg',
    isFeatured: false,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "42.5 mm",
      caseThickness: "12.2 mm",
      movement: "Premium Automatic Calibre with 24 Jewels",
      crystal: "Box Sapphire with Colorless AR",
      waterResistance: "100 meters / 10 ATM",
      strap: "Solid 316L Multi-Link Bracelet with Hidden Clasp",
      caseMaterial: "Hand-Polished Stainless Steel & 18K Gold PVD",
      powerReserve: "45 Hours"
    }
  },

  // 5. Sports Watches
  {
    id: 'valter-velocity',
    name: 'The Velocity Diver',
    slug: 'the-velocity-diver',
    price: 185,
    currency: '$',
    category: 'sports-watches',
    categoryLabel: "Sports Watches",
    shortDescription: "Durable matte black case with dark green 120-click rotating ceramic bezel and waffle rubber strap.",
    description: "Engineered for active pursuits, ocean exploration, and modern versatility. The Velocity features a high-legibility matte dial with Swiss Super-LumiNova markers, a screw-down crown, and a sweat-resistant fluoroelastomer strap.",
    image: '/images/cat_sports_watch_1792603317550.jpg',
    additionalImages: [
      '/images/hero_emerald_watch_1792603314884.jpg'
    ],
    isFeatured: true,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "43 mm",
      caseThickness: "13.2 mm",
      movement: "High-Torque Heavy-Duty Quartz Movement",
      crystal: "Anti-Scratch Flat Sapphire Crystal",
      waterResistance: "200 meters / 20 ATM with Screw-Down Crown",
      strap: "Engineered Waffle Fluoroelastomer (FKM) Rubber",
      caseMaterial: "Matte DLC Carbon-Coated 316L Steel"
    }
  },
  {
    id: 'valter-apex-tactical',
    name: 'The Apex Tactical Chrono',
    slug: 'the-apex-tactical-chrono',
    price: 240,
    currency: '$',
    category: 'sports-watches',
    categoryLabel: "Sports Watches",
    shortDescription: "Military-inspired field chronograph with olive drab indices, tachymeter scale, and reinforced steel case.",
    description: "Built to withstand rugged environments while retaining a refined silhouette. The Apex features 1/10th second chronograph precision, matte anti-glare finish, and high-tensile ballistic nylon strap.",
    image: '/images/cat_sports_watch_1792603317550.jpg',
    isFeatured: false,
    isNew: true,
    inStock: true,
    specs: {
      caseDiameter: "42.5 mm",
      caseThickness: "12.6 mm",
      movement: "Precision Split-Second Chronograph",
      crystal: "Hardened Sapphire Crystal",
      waterResistance: "100 meters / 10 ATM",
      strap: "Heavy-Duty Ballistic Nylon with Steel Hardware",
      caseMaterial: "Bead-Blasted Titanium-Grey Steel"
    }
  },
  {
    id: 'valter-endurance-pro',
    name: 'The Endurance Pro',
    slug: 'the-endurance-pro',
    price: 210,
    currency: '$',
    category: 'sports-watches',
    categoryLabel: "Sports Watches",
    shortDescription: "Ultra-lightweight sports timepiece with high-visibility countdown bezel and ergonomic contoured lugs.",
    description: "Designed for track, trail, and urban sprint. Weighing under 75 grams, the Endurance Pro pairs ultra-light ergonomic case geometry with uncompromised shock-absorbing movement mounts.",
    image: '/images/cat_sports_watch_1792603317550.jpg',
    isFeatured: false,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "42 mm",
      caseThickness: "11.5 mm",
      movement: "Shock-Protected Japanese Quartz",
      crystal: "Sapphire Crystal with Dual Anti-Reflective Coating",
      waterResistance: "100 meters / 10 ATM",
      strap: "Perforated Breathable Silicone Strap",
      caseMaterial: "Reinforced Composite Carbon & 316L Core"
    }
  },

  // 6. Smart Watches
  {
    id: 'valter-pulse',
    name: 'The Pulse Titanium',
    slug: 'the-pulse-titanium',
    price: 225,
    currency: '$',
    category: 'smart-watches',
    categoryLabel: "Smart Watches",
    shortDescription: "Curved sapphire AMOLED display in aerospace titanium with customizable analog watch faces and 7-day battery.",
    description: "Where modern technology meets timeless horological restraint. The Pulse Titanium features an ultra-sharp 1.4-inch AMOLED display that renders authentic luxury watchfaces with realistic ticking hands, paired with comprehensive heart health, workout tracking, and smartphone notifications.",
    image: '/images/cat_smart_watch_1792603333900.jpg',
    additionalImages: [
      '/images/cat_sports_watch_1792603317550.jpg'
    ],
    isFeatured: true,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "44 mm",
      caseThickness: "10.8 mm",
      movement: "Dual-Core Sensor Engine + Bluetooth 5.3 Low Energy",
      crystal: "Edge-to-Edge Curved Sapphire Glass",
      waterResistance: "50 meters / 5 ATM Swim-Proof",
      strap: "Fluted Slate Gray Silicone & Interchangeable 22mm Lugs",
      caseMaterial: "Grade 5 Aerospace Titanium with Ceramic Caseback",
      display: "1.43\" Ultra-Retina AMOLED (466x466, 1000 nits)",
      compatibility: "iOS 14+ and Android 9.0+"
    }
  },
  {
    id: 'valter-element-smart',
    name: 'The Element Hybrid',
    slug: 'the-element-hybrid',
    price: 290,
    currency: '$',
    category: 'smart-watches',
    categoryLabel: "Smart Watches",
    shortDescription: "Real mechanical hands over a discreet hidden electronic display with champagne gold Milanese loop.",
    description: "The best of both worlds. The Element Hybrid features real physical luminescent hands that sweep gracefully over an invisible e-ink sub-screen. The digital screen wakes only when you lift your wrist or receive an alert.",
    image: '/images/cat_smart_watch_1792603333900.jpg',
    isFeatured: false,
    isNew: true,
    inStock: true,
    specs: {
      caseDiameter: "41 mm",
      caseThickness: "11.2 mm",
      movement: "Hybrid Mechanical Gear Train + Smart Microcontroller",
      crystal: "Domed Sapphire Crystal",
      waterResistance: "50 meters / 5 ATM",
      strap: "Quick-Release Champagne Gold Milanese Loop",
      caseMaterial: "316L Stainless Steel with Champagne PVD",
      display: "Micro-Transflective Hidden Matrix",
      compatibility: "iOS & Android Companion App"
    }
  },
  {
    id: 'valter-vantage-connected',
    name: 'The Vantage Connected',
    slug: 'the-vantage-connected',
    price: 340,
    currency: '$',
    category: 'smart-watches',
    categoryLabel: "Smart Watches",
    shortDescription: "Ultra-luxury connected timepiece with brushed ceramic bezel, GPS telemetry, and wireless magnetic dock.",
    description: "Precision engineered for professionals who demand both horological presence in the boardroom and modern tracking during travel and exercise. Features wireless fast charging and custom VALTER bespoke complications.",
    image: '/images/cat_smart_watch_1792603333900.jpg',
    isFeatured: false,
    isNew: false,
    inStock: true,
    specs: {
      caseDiameter: "45 mm",
      caseThickness: "12.0 mm",
      movement: "Quad-Core Connected Module with Dual-Frequency GPS",
      crystal: "Sapphire Crystal with Oleophobic Coating",
      waterResistance: "50 meters / 5 ATM",
      strap: "Hybrid Fluororubber & Textured Saddle Leather",
      caseMaterial: "Brushed Titanium & Ceramic Zirconia Bezel",
      display: "Always-On High Contrast AMOLED",
      compatibility: "Universal Bluetooth 5.3"
    }
  }
];

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  content: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'finding-right-watch-style',
    title: "Finding the Right Watch for Your Everyday Style",
    category: "STYLING & PROPORTIONS",
    excerpt: "From dial diameter to strap materials, discover how considered proportions create harmony between your wardrobe and wrist.",
    readTime: "4 min read",
    date: "October 2026",
    image: '/images/brand_story_lifestyle_1792603333608.jpg',
    content: [
      "A timepiece is the most intimate item of personal jewelry a person can wear. Unlike accessories selected purely for ornamentation, a wristwatch merges functional mechanical rhythm with personal identity.",
      "When selecting a watch for daily wear, proportion is paramount. As a general guide, the lugs of the case should never extend beyond the natural silhouette of your wrist.",
      "For versatility, a forest green or sunray charcoal dial offers remarkable versatility—pairing as effortlessly with dark worsted wool suits as with crisp linen and relaxed weekend denim."
    ]
  },
  {
    id: 'how-to-choose-thoughtful-watch-gift',
    title: "How to Choose a Thoughtful Watch Gift",
    category: "GIFTING & OCCASIONS",
    excerpt: "A timepiece marks moments in time. Here is our guide to selecting a gift that will be treasured for decades to come.",
    readTime: "5 min read",
    date: "September 2026",
    image: '/images/cat_couple_watches_1792603317361.jpg',
    content: [
      "To gift a watch is to gift the celebration of shared time. Whether honoring a graduation, anniversary, or wedding, timepieces retain sentimental weight that outlasts transient trends.",
      "For couples celebrating a significant milestone, coordinated watches—such as The Together Set—offer a poetic visual echo between two individuals without feeling excessively matching.",
      "Every VALTER timepiece is accompanied by a gift-ready presentation box, padded velvet interior, and dedicated certificate of authenticity."
    ]
  },
  {
    id: 'guide-to-classic-contemporary-designs',
    title: "A Guide to Classic and Contemporary Watch Designs",
    category: "HOROLOGICAL CRAFT",
    excerpt: "Exploring the evolution of chronographs, skeleton movements, and how modern smart technology integrates into fine horology.",
    readTime: "6 min read",
    date: "August 2026",
    image: '/images/cat_luxury_watch_1792603317321.jpg',
    content: [
      "Horology has evolved continuously for over five centuries, yet the core principles of dial balance, tactile bezel action, and legible hands remain remarkably enduring.",
      "The openworked movement of a skeleton watch like The Nocturne allows the wearer to witness the micro-mechanical heartbeat of the escapement—an aesthetic counterpoint to our increasingly digital world.",
      "At VALTER, our design studio bridges this continuum: celebrating traditional Swiss and Japanese mechanical engineering while pioneering contemporary smart connected models."
    ]
  }
];
