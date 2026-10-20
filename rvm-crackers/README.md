# RVM Crackers — Fireworks E-Commerce (React + Vite)

Premium, conversion-focused fireworks storefront. Enquiry-based checkout model
(standard for Indian fireworks e-commerce), demo product data, no backend
required to run.

## Quick Start
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build -> dist/
    npm run preview    # serve the production build locally
Requires Node 18+.

## Pages Implemented
Home · All Products · 8 Category pages · Product Detail · Search (live
suggestions) · Quick Order price-list table · Cart · Checkout (enquiry) ·
Order Confirmation · Wishlist · Account + Order Enquiry History · Login/
Register (UI) · About · Contact · FAQ · Safety · 4 Policy pages · 404.

## Architecture
    src/
      components/   common/ (ProductImage, Breadcrumbs) · layout/ · products/
      pages/        Home, Category, Product, Search, QuickOrder, Cart,
                    Checkout, Wishlist, Account, Static, Policies, NotFound
      context/      StoreContext (cart + wishlist, localStorage persistence)
      data/         products, categories, site, coupons  <- edit these first
      hooks/        useReveal, usePageMeta
      utils/        format, orders
      styles/       tokens.css (design system) · global.css
All colors, type, spacing, radii and shadows live in src/styles/tokens.css.
To rebrand, edit that one file plus the logo block in Header.jsx.

## Swapping In Real Content
1. Products: replace the array in src/data/products.js; set isDemo: false.
2. Images: drop files at public/images/products/<id>.jpg. Missing images
   automatically render a branded placeholder (never a broken image).
3. Logo: add public/images/logo.png and swap the placeholder mark in
   src/components/layout/Header.jsx.
4. Business info: src/data/site.js (phone, email, minimums, announcement).
5. Policies: edit drafts in src/pages/Policies/Policy.jsx — have them
   reviewed by the business/legal before launch.

## Demo vs Production-Ready
- Browsing, filters, sort, search, quick order: fully working, client-side.
- Cart & wishlist with persistence: working (localStorage).
- Checkout validation + enquiry submission: working — saved to localStorage
  only; NOTHING is transmitted.
- Order history: reads local enquiries; live tracking needs a backend.
- Contact form, newsletter: UI + validation only; needs a mail backend.
- Login/Register, accounts: UI only; needs an auth backend.
- Online payment (Razorpay): NOT integrated — shown as disabled, never simulated.
- Email/WhatsApp order notifications: needs a backend.

## Payment & Backend Integration Boundary
The enquiry flow calls saveOrder() in src/utils/orders.js. To go live:
1. Build a small backend (Node/serverless) with POST /orders that stores the
   enquiry and notifies the team (email/WhatsApp). Point saveOrder at it.
2. For online payment later: create a Razorpay Order server-side with the
   SECRET KEY kept only on the server, open Razorpay Checkout on the client
   with the public VITE_RAZORPAY_KEY_ID, then VERIFY the payment signature
   server-side before marking anything paid. Handle success / failure /
   cancellation / pending as distinct order states. Never trust client-side
   payment status.
3. Replace the disabled payment option in src/pages/Checkout/Checkout.jsx.

## Compliance Checklist Before Real Sales
Seller licensing (Explosives Rules), permitted "green" product lists, state/
local restrictions and court orders, licensed transport only, serviceability
rules per PIN, and reviewed legal policies. Do NOT enable real orders or
payments until these are confirmed.

## Rebuilding From the Text Bundles
The project ships as four text bundles plus a tiny extractor. Run them in
this exact order — bundle4 replaces the truncated Product.jsx and this README
from the earlier bundles:

    node make.mjs bundle1.txt bundle2.txt bundle3.txt bundle4.txt
    cd rvm-crackers
    npm install
    npm run dev

The extractor should report "Done: 61 files." (61 writes for 58 unique files;
Product.jsx, layout.css and README.md are written twice; the later copy wins).

## Testing Notes
Verified with `npm run build` (Vite production build, no errors) and a
server-side render of every route listed above. Demo data only: run through
the cart → checkout → confirmation → My Account flow in your browser before
showing it to the client, and test on a real phone for the mobile drawer and
sticky buy bar.
