/**
 * DAVIOUS STORE — Main JavaScript
 * Handles: nav, search, filtering, animations, zoom, mobile menu
 */

// =============================================
// PRODUCT CARDS — pass clicked image to detail page
// =============================================
document.querySelectorAll('.product-card').forEach(card => {
  const viewBtn = card.querySelector('.product-quick-actions a[href]');
  const cardImg = card.querySelector('.product-card-img img');
  if (!viewBtn || !cardImg) return;

  viewBtn.addEventListener('click', (e) => {
    e.preventDefault(); // stop the browser from navigating with the old href
    const imgSrc = cardImg.getAttribute('src');
    if (!imgSrc) return;
    const base = viewBtn.getAttribute('href').split('?')[0];
    window.location.href = `${base}?img=${encodeURIComponent(imgSrc)}`;
  });
});

// =============================================
// PRODUCT DETAIL PAGE — restore image from URL param
// =============================================
(function () {
  const mainImg = document.getElementById('main-product-image');
  if (!mainImg) return; // only runs on product detail pages

  const params = new URLSearchParams(window.location.search);
  const imgSrc = params.get('img'); // URLSearchParams.get() already decodes
  if (!imgSrc) return;

  // Set the main image
  mainImg.src = imgSrc;

  // Find the matching thumbnail and mark it active
  const thumbs = document.querySelectorAll('.thumb-img');
  let matched = false;
  thumbs.forEach(thumb => {
    thumb.classList.remove('active');
    const thumbImgSrc = thumb.querySelector('img')?.getAttribute('src') || '';
    const thumbDataSrc = thumb.dataset.src || '';
    if (thumbImgSrc === imgSrc || thumbDataSrc === imgSrc) {
      thumb.classList.add('active');
      matched = true;
    }
  });
  // If the image isn't in the thumbnail strip, inject it into the first thumb
  if (!matched && thumbs.length > 0) {
    thumbs[0].classList.add('active');
    const firstThumbImg = thumbs[0].querySelector('img');
    if (firstThumbImg) firstThumbImg.src = imgSrc;
    thumbs[0].dataset.src = imgSrc;
  }
})();
// =============================================
// CIRCULAR FAVICON
// =============================================
(function () {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'assets/images/logos/your-logo.png'; // 👈 change this to your actual filename
  img.onload = () => {
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 0, 0, 64, 64);
    const link = document.querySelector("link[rel='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = canvas.toDataURL('image/png');
    document.head.appendChild(link);
  };
})();

// =============================================
// PAGE LOADER
// =============================================
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1400);
  }
});

// =============================================
// STICKY HEADER
// =============================================
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// =============================================
// MOBILE MENU
// =============================================
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// =============================================
// SEARCH OVERLAY
// =============================================
const searchBtn = document.querySelector('.header-search-btn');
const searchOverlay = document.querySelector('.search-overlay');
const searchClose = document.querySelector('.search-close');
const searchInput = document.querySelector('.search-form input');

if (searchBtn && searchOverlay) {
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  });

  searchClose?.addEventListener('click', closeSearch);

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('open')) closeSearch();
  });
}

function closeSearch() {
  searchOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
const animElements = document.querySelectorAll('.animate-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger children if parent has multiple
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

animElements.forEach(el => observer.observe(el));

// =============================================
// PRODUCT FILTERING (Shop Page)
// =============================================
const categoryTabs = document.querySelectorAll('.cat-tab');
const productCards = document.querySelectorAll('.product-card[data-category]');

if (categoryTabs.length && productCards.length) {
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.cat;

      productCards.forEach(card => {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
        const cardCat = card.dataset.category?.toLowerCase() || '';

        const categoryMatch = (category === 'all' || card.dataset.category === category);
        const searchMatch = !query || name.includes(query) || cardCat.includes(query);

        if (categoryMatch && searchMatch) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });

      updateResultsCount();
    });
  });
}

function updateResultsCount() {
  const countEl = document.querySelector('.results-count');
  if (countEl) {
    const visible = document.querySelectorAll('.product-card[data-category]:not([style*="display: none"])').length;
    countEl.textContent = `${visible} item${visible !== 1 ? 's' : ''}`;
  }
}

// Sorting
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    // Placeholder: backend would handle actual sorting
    console.log('Sort by:', sortSelect.value);
  });
}

// Checkbox filters
document.querySelectorAll('.filter-option').forEach(option => {
  option.addEventListener('click', () => {
    const checkbox = option.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.checked = !checkbox.checked;
    applyFilters();
  });
});

function applyFilters() {
  // Placeholder: future backend integration
  console.log('Filters applied');
}

// Color swatches
document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    swatch.classList.toggle('selected');
  });
});

// Grid toggle
document.querySelectorAll('.grid-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.grid-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cols = btn.dataset.cols;
    const grid = document.querySelector('.products-grid');
    if (grid) {
      grid.style.gridTemplateColumns = cols === '2' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)';
    }
  });
});

// =============================================
// PRODUCT SIZE SELECTION (Detail Page)
// =============================================
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// =============================================
// IMAGE ZOOM (Detail Page)
// =============================================
const mainImg = document.querySelector('.main-product-img');
const zoomOverlay = document.querySelector('.zoom-overlay');
const zoomClose = document.querySelector('.zoom-close');

if (mainImg && zoomOverlay) {
  mainImg.addEventListener('click', () => {
    zoomOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  zoomClose?.addEventListener('click', () => {
    zoomOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });

  zoomOverlay.addEventListener('click', (e) => {
    if (e.target === zoomOverlay) {
      zoomOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Thumbnail switching
document.querySelectorAll('.thumb-img').forEach((thumb, idx) => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    // Placeholder: swap main image src
    console.log('Switch to image', idx);
  });
});

// =============================================
// NEWSLETTER FORM
// =============================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const email = input?.value;
    if (email) {
      input.value = '';
      showToast('Thank you! You\'re now subscribed. 🌸');
    }
  });
}

// =============================================
// TOAST NOTIFICATION
// =============================================
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: #2C2520; color: #F9F5F0; padding: 1rem 2rem;
    font-family: 'Jost', sans-serif; font-size: 0.8rem; letter-spacing: 0.05em;
    z-index: 9999; animation: fadeInUp 0.4s ease;
    white-space: nowrap;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// =============================================
// ACTIVE NAV LINK
// =============================================
const navLinks = document.querySelectorAll('.main-nav a');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// =============================================
// WISHLIST TOGGLE
// =============================================
document.querySelectorAll('.product-wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const svg = btn.querySelector('svg');
    if (btn.dataset.liked === 'true') {
      btn.dataset.liked = 'false';
      svg.style.fill = 'none';
      svg.style.stroke = '';
    } else {
      btn.dataset.liked = 'true';
      svg.style.fill = '#C9897A';
      svg.style.stroke = '#C9897A';
      showToast('Added to wishlist ♡');
    }
  });
});

// =============================================
// SEARCH FUNCTIONALITY (Live filter)
// =============================================
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();
      const isShopPage = window.location.pathname.endsWith('shop.html');
      if (query && !isShopPage) {
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
      } else if (query && isShopPage) {
        closeSearch();
      }
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll('.product-card[data-category]');

    // Respect active category tab if present
    const activeTab = document.querySelector('.cat-tab.active');
    const activeCat = activeTab ? activeTab.dataset.cat : 'all';

    let visibleCount = 0;
    allCards.forEach(card => {
      const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
      const category = card.dataset.category?.toLowerCase() || '';

      const categoryMatch = (activeCat === 'all' || card.dataset.category === activeCat);
      const searchMatch = !query || name.includes(query) || category.includes(query);

      const matches = categoryMatch && searchMatch;
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    const countEl = document.querySelector('.results-count');
    if (countEl) {
      countEl.textContent = `${visibleCount} item${visibleCount !== 1 ? 's' : ''}`;
    }
  });
}

// On load, apply search if present in URL
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get('search');
  if (searchQuery && searchInput) {
    searchInput.value = searchQuery;
    searchInput.dispatchEvent(new Event('input'));
  }
});

// =============================================
// PRODUCT PAGE — DYNAMIC WHATSAPP ORDER
// =============================================
(function () {
  const waBtn = document.getElementById('whatsapp-order-btn');
  if (!waBtn) return; // only runs on product pages

  const phone = waBtn.dataset.phone || '250787353993';
  const productName = document.getElementById('product-name')?.dataset.product
    || document.getElementById('product-name')?.textContent.trim()
    || 'this item';

  let selectedSize = null;
  let selectedColour = null;

  const summary = document.getElementById('order-summary');
  const summaryText = document.getElementById('summary-text');
  const colourLabel = document.querySelector('.colour-label-name');

  // Build WhatsApp message and update button href
  function updateOrder() {
    if (selectedSize && selectedColour) {
      const msg = `Hi Davious Store! 👋\n\nI'd like to order the following:\n\n🛍️ *Product:* ${productName}\n🎨 *Colour:* ${selectedColour}\n📏 *Size:* ${selectedSize}\n\nPlease let me know the price and availability. Thank you!`;
      waBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      if (summary && summaryText) {
        summaryText.innerHTML = `<strong>${productName}</strong> · ${selectedColour} · Size ${selectedSize}`;
        summary.style.display = 'block';
      }
    } else {
      waBtn.removeAttribute('href');
      if (summary) summary.style.display = 'none';
    }
  }

  // SIZE buttons
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size || btn.textContent.trim();
      updateOrder();
    });
  });

  // COLOUR swatches
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => {
        s.classList.remove('selected');
        s.style.border = '';
      });
      swatch.classList.add('selected');
      swatch.style.border = '2px solid var(--charcoal)';
      selectedColour = swatch.dataset.colour || swatch.title || 'Selected';
      if (colourLabel) colourLabel.textContent = selectedColour;
      updateOrder();
    });
  });

  // Clicking without selections — warn the user
  waBtn.addEventListener('click', function (e) {
    if (!selectedSize || !selectedColour) {
      e.preventDefault();
      if (!selectedSize) {
        showToast('⚠️ Please select a size first');
        document.querySelectorAll('.size-btn').forEach(b => {
          b.style.borderColor = 'var(--rose)';
          setTimeout(() => b.style.borderColor = '', 1500);
        });
      }
      if (!selectedColour) {
        showToast('⚠️ Please select a colour first');
        document.querySelectorAll('.color-swatch').forEach(s => {
          s.style.outline = '2px solid var(--rose)';
          setTimeout(() => s.style.outline = '', 1500);
        });
      }
    }
  });

  updateOrder();
})();

// =============================================
// THUMBNAIL IMAGE SWITCHING
// =============================================
document.querySelectorAll('.thumb-img').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const newSrc = thumb.dataset.src;
    const mainImg = document.getElementById('main-product-image');
    if (mainImg && newSrc) mainImg.src = newSrc;
    const zoomImg = document.getElementById('zoom-img');
    if (zoomImg && newSrc) zoomImg.src = newSrc;
  });
});

// =============================================
// IMAGE ZOOM — click main image to zoom
// =============================================
const mainImgWrap = document.getElementById('main-img-wrap');
const zoomImg2 = document.getElementById('zoom-img');

if (mainImgWrap && zoomOverlay) {
  mainImgWrap.addEventListener('click', () => {
    const src = document.getElementById('main-product-image')?.src;
    if (zoomImg2) zoomImg2.src = src;
    zoomOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
