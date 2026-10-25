# VALTER Horology — Hostinger Deployment Guide

This document provides a step-by-step production deployment manual for publishing the **VALTER** luxury watch e-commerce website to **Hostinger Web Hosting**, **Hostinger Cloud Hosting**, or **Hostinger VPS**.

---

## 1. Prerequisites & Build Overview

The VALTER storefront is built with **React 19**, **TypeScript**, and **Vite**, producing static HTML, JavaScript, CSS, and optimized image assets in the `dist/` directory. It requires zero Node.js server processes to run in production, allowing it to be served at peak speed by Hostinger's LiteSpeed / Apache web servers or Nginx.

---

## 2. Step-by-Step Build & Export

### Step 1: Install Dependencies
In the root directory of your project, run:
```bash
npm install
```

### Step 2: Build the Production Bundle
Compile the optimized bundle:
```bash
npm run build
```
This generates the `dist/` folder containing:
```
dist/
├── .htaccess            <-- Apache / LiteSpeed SPA rewrite rules (already configured)
├── index.html           <-- Optimized HTML entry point with metadata & Cormorant fonts
├── images/              <-- All high-resolution horological photography assets
└── assets/              <-- Minified & fingerprinted JS and CSS bundles
```

---

## 3. Uploading to Hostinger (hPanel)

### Method A: Hostinger File Manager (Recommended & Quickest)
1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Websites** and click **Manage** next to your domain.
3. In the sidebar under **Files**, select **File Manager**.
4. Open the `public_html` directory for your domain.
   - If deploying to your primary root domain: upload directly into `public_html/`.
   - If deploying to a subdomain (e.g., `store.valterwatches.com`): navigate to `public_html/subdomains/store/` or the subdomain folder created by Hostinger.
5. Compress the contents of your local `dist/` folder into a `.zip` archive (e.g. `valter-dist.zip`).
   *(Note: Zip the files INSIDE `dist`, not the `dist` folder itself).*
6. In Hostinger File Manager, click **Upload** $\to$ **File**, and select `valter-dist.zip`.
7. Right-click `valter-dist.zip` inside `public_html` and choose **Extract**.
8. Verify that `index.html`, `.htaccess`, and the `images/` directory are visible directly under `public_html`.

### Method B: FTP / SFTP Deployment (FileZilla or Cyberduck)
1. In hPanel, go to **Files** $\to$ **FTP Accounts** to retrieve your FTP hostname, username, and password.
2. Connect using your FTP client (Host: `ftp.yourdomain.com`, Port `21` or SFTP Port `22`).
3. Upload all files and folders located inside `dist/` directly into the remote `public_html/` folder.

---

## 4. SPA Route Rewriting & `.htaccess` Verification

Single-Page Applications require the web server to route deep links (e.g., `/shop`, `/collections/mens-watches`, `/collections/couple-watches`) back to `index.html`.

This project includes a pre-configured `.htaccess` file located in `public/.htaccess`, which Vite automatically copies to `dist/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Caching for static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

Verify that hidden files (files starting with `.`) are displayed in Hostinger File Manager by checking **Settings** $\to$ **Show Hidden Files (dotfiles)**.

---

## 5. SSL & Domain Configuration on Hostinger

1. In hPanel, navigate to **Security** $\to$ **SSL**.
2. Ensure **Let's Encrypt SSL** is active (Hostinger provides free lifetime SSL).
3. Enable **Force HTTPS** to ensure all visitor traffic is securely encrypted.

---

## 6. Store Configuration & Content Customization

All store inventory, collections, and brand information are managed in a single centralized source file:

- **Products & Specs**: Edit `src/data/catalog.ts` to adjust prices, watch names, case materials, power reserve, water resistance ratings, and stock status.
- **Images**: Drop new product photography into `public/images/` and update the `image` path in `src/data/catalog.ts`.
- **Currency & Global Shipping**: Managed in `src/context/StoreContext.tsx` and selectable via the currency dropdown in the footer.
- **Concierge & Contact Info**: Edit `src/views/ContactView.tsx` with your physical showroom address, email, and phone numbers.
- **Promotional Coupons**: Configured in `src/views/CheckoutView.tsx` (the default active voucher is `VALTER10` offering 10% privilege discount).
