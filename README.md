# VALTER — Premium Horology E-Commerce Website

VALTER is a luxury watch e-commerce storefront combining contemporary Swiss/Milanese editorial aesthetics with a complete, modern online shopping experience.

## The Six Signature Collections

1. **Men's Watches**: Distinctive everyday automatic and chronograph models (The Evergreen, The Sterling Chrono, The Heritage Automatic).
2. **Women's Watches**: Refined silhouettes with mother-of-pearl dials and Milanese mesh bracelets (The Meridian, The Solstice, The Petite Royale).
3. **Couple Watches**: Coordinated timepieces paired in bespoke double presentation cases (The Together Set, The Harmony Duo, The Horizon Pair).
4. **Luxury Watches**: Haute horlogerie openworked skeleton calibers and astronomical moonphases (The Nocturne, The Grand Celestial, The Sovereign).
5. **Sports Watches**: Ceramic bezels, high-visibility Super-LumiNova, and tactile fluoroelastomer straps (The Velocity, The Apex Tactical, The Endurance Pro).
6. **Smart Watches**: Grade 5 aerospace titanium cases, curved sapphire crystal, and bespoke ambient analogue watch faces (The Pulse, The Element Hybrid, The Vantage Connected).

---

## Brand Aesthetic & Color System

- **Primary Forest Green**: `#082F2B`
- **Deep Emerald**: `#0B3B35`
- **Dark Background**: `#052522`
- **Warm Ivory Canvas**: `#F4F0E9`
- **Soft Cream**: `#EAE3D8`
- **Champagne Gold Accents**: `#B89A6A`
- **Muted Bronze**: `#90764F`
- **Headings**: Cormorant Garamond
- **Body & Pricing**: Inter (tabular numerals)

---

## Key Features

- **Mega Menu Navigation**: Instant visual preview of all six collections with photography and descriptions.
- **Instant Live Search**: Search across all 18 models by name, collection, movement, or material.
- **Cart & Wishlist Persistence**: Automatically saved to browser LocalStorage.
- **Complete Product Detail Modals (PDP)**: Full horological specifications, diameter, thickness, sapphire crystal, water resistance, and pair details.
- **Checkout Simulator**: Contact info, shipping address, promo code support (`VALTER10`), payment method simulation (Credit Card, Pay on Delivery, Bank Wire), and order confirmation receipt with printable summary.
- **Journal ("Notes on Time")**: Editorial articles on watch styling and care with interactive reading views.

---

## Development & Build Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The site runs on `http://localhost:3000`.

### 3. Build for Production (Hostinger / Static Hosting)
```bash
npm run build
```
The output is generated in the `dist/` directory.

---

## Hostinger Deployment

See [`HOSTINGER_DEPLOYMENT.md`](./HOSTINGER_DEPLOYMENT.md) for full instructions on uploading to Hostinger File Manager or FTP, SSL activation, and `.htaccess` configuration.
