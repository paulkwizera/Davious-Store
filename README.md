# Davious Store — Website

A complete, production-ready website for Davious Store ladies' fashion brand.

## 📁 File Structure

```
davious/
├── index.html          ← Home page
├── shop.html           ← Shop / Gallery page
├── product.html        ← Product detail page (template)
├── about.html          ← About us page
├── contact.html        ← Contact page
├── css/
│   └── style.css       ← Main stylesheet
├── js/
│   └── main.js         ← All JavaScript interactions
└── assets/
    └── images/         ← Add your product images here
        ├── reallogo.png              ← Store logo
        ├── hero-banner.png      ← Homepage hero image
        ├── brandstory.png      ← Brand story image
        ├── aboutfounder.jpg    ← About page image
        ├── dressformom.jpg       ← Category images
        ├── tshirt.jpg
        ├── classicdress.jpg
        ├── completeoutfits.jpg
        └── products/             ← Product images
            └── Dress for Mom/
            │  ├── dress-01.jpg
            │  ├── dress-01-main.jpg
                ....
            └── Dress/
            │ ├── dress-01.jpg
            │ ├── dress-01-main.jpg
              .....
             └── T-shirt/
            │ ├── dress-01.jpg
            │ ├── dress-01-main.jpg
            .....
             └── Complete matching outfits/
            │ ├── dress-01.jpg
            │ ├── dress-01-main.jpg
            ...
```

## 🚀 Quick Setup

### 1. Add Your Logo
Replace the text logo in all HTML files with your actual logo image:
```html
<!-- Find this in each file's <header> -->
<a href="index.html" class="logo">DAVIOUS <span>STORE</span></a>

<!-- Replace with: -->
<a href="index.html" class="logo">
  <img src="assets/images/logo.png" alt="Davious Store" class="logo-img" />
</a>
```

### 2. Update Contact Details
Search all HTML files for `PLACEHOLDER` comments and replace:
- `YOURNUMBER` → WhatsApp number (digits only, with country code, no + or spaces). E.g. `12025551234`
- Phone number: `+1 (000) 000-0000`
- Email: `hello@daviousstore.com`
- Instagram handle: `@daviousstore`

### 3. Add Product Images
Place product images in `assets/images/products/` and replace placeholder divs:
```html
<!-- Remove the placeholder div -->
<div class="placeholder-img" style="height:100%">...</div>

<!-- Add your image -->
<img src="assets/images/products/dress-01.jpg" alt="Floral Wrap Dress" loading="lazy" />
```

### 4. Add Hero Image
Replace the hero placeholder in `index.html`:
```html
<img src="assets/images/hero-banner.jpg" alt="Davious Store — New Collection" 
     style="width:100%;height:100%;object-fit:cover;" />
```

### 5. Update WhatsApp Order Messages
In `product.html`, update the order message template:
```html
href="https://wa.me/YOURNUMBER?text=Hi%20Davious%20Store!%20I%20would%20like%20to%20order%20..."
```

### 6. Google Maps (Contact Page)
In `contact.html`, replace the map placeholder with a real Google Maps embed:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  width="100%" height="350" style="border:0;" 
  allowfullscreen="" loading="lazy"
  title="Davious Store Location">
</iframe>
```

## 📸 Image Guidelines

- **Product images**: Minimum 800×1200px, aspect ratio 2:3 (portrait)
- **Hero banner**: Minimum 1200×800px, aspect ratio 3:2 (landscape)
- **Category images**: Minimum 600×800px, aspect ratio 3:4
- **Format**: JPEG for photos (quality 80-85%), PNG for logos/icons
- **File naming**: Use lowercase with hyphens (e.g. `dress-blue-01.jpg`)

## ♟ Adding More Products

To add a new product card, copy this template into the products grid in `shop.html`:

```html
<article class="product-card" data-category="CATEGORY">
  <div class="product-card-img">
    <img src="assets/images/products/YOUR-IMAGE.jpg" alt="PRODUCT NAME" loading="lazy" />
    <span class="product-badge badge-new">New</span>  <!-- Optional badge -->
    <div class="product-quick-actions">
      <a href="product.html" class="btn btn--primary">View Details</a>
      <button class="product-wishlist" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
  </div>
  <div class="product-info">
    <p class="product-category-tag">CATEGORY</p>
    <h2 class="product-name">PRODUCT NAME</h2>
    <p class="product-price">$00.00</p>
  </div>
</article>
```

**Valid `data-category` values:** `dresses`, `tops`, `skirts`, `trousers`, `accessories`

## 🌐 Deployment

### Netlify (Recommended — Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the entire `davious/` folder
3. Your site is live instantly!

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `davious/` folder
3. Follow the prompts

### Firebase Hosting
1. Install: `npm i -g firebase-tools`
2. Run `firebase init` and `firebase deploy`

### cPanel / Shared Hosting
1. Upload all files via File Manager or FTP
2. Ensure `index.html` is in the public root directory (often `public_html/`)

## 🔮 Future Enhancements

The code is structured to support:
- **Backend integration**: Product cards can be generated dynamically from a database
- **CMS**: Easily connect to Contentful, Sanity, or WordPress headless CMS
- **E-commerce**: Upgrade to Shopify, WooCommerce, or custom payment flow
- **Admin dashboard**: Product management system can be added
- **Search**: Replace client-side filter with server-side search (e.g. Algolia)

## ✉️ Support

For setup help, contact your web developer or refer to the code comments marked `<!-- PLACEHOLDER -->`.

---
© 2025 Davious Store. All rights reserved.
