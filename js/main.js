/**
 * Main application logic for Khuyut
 */

// --- UTILITIES ---

// Wishlist management
function getWishlist() {
  const wishlist = localStorage.getItem('khuyut-wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
  } else {
    wishlist.push(productId);
  }
  localStorage.setItem('khuyut-wishlist', JSON.stringify(wishlist));
  return wishlist.includes(productId);
}

// Format currency
function formatPrice(price, lang) {
  return `${price} ${t('egp')}`;
}

// --- DOM CONTENT LOADED ---
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // 3. Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
  });

  // 4. Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileToggle.classList.remove('active');
        }
      }
    });
  });

  // Page specific initialization
  initShopPage();
  initProductDetailPage();
  initGalleryPage();
  initFAQPage();
  initTestimonials();
  initFeaturedProducts();

  // Re-render components on language change
  window.addEventListener('languageChanged', (e) => {
    initShopPage();
    initProductDetailPage();
    initFeaturedProducts();
  });
});

// --- SHOP PAGE ---
function initShopPage() {
  const productsGrid = document.querySelector('.products-grid');
  if (!productsGrid || typeof products === 'undefined') return;

  let currentCategory = 'all';
  let currentSort = 'default';

  const renderProducts = (productList) => {
    const lang = getCurrentLang();
    productsGrid.innerHTML = '';
    
    if (productList.length === 0) {
      productsGrid.innerHTML = `<p class="no-results">${lang === 'ar' ? 'لا توجد منتجات' : 'No products found'}</p>`;
      return;
    }

    productList.forEach(product => {
      const name = lang === 'ar' ? product.nameAr : product.nameEn;
      const badge = product.badge ? (lang === 'ar' ? product.badgeAr : product.badgeEn) : '';
      const badgeHtml = badge ? `<span class="product-badge">${badge}</span>` : '';
      const isFav = isInWishlist(product.id);
      
      const card = document.createElement('div');
      card.className = 'card product-card visible';
      card.innerHTML = `
        <div class="product-image-container">
          ${badgeHtml}
          <img src="${product.image}" alt="${name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80';">
          <button class="wishlist-btn ${isFav ? 'active' : ''}" data-id="${product.id}" aria-label="Add to wishlist">
            <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="product-info">
          <h3 class="product-title"><a href="product.html?id=${product.id}">${name}</a></h3>
          <p class="product-price">${formatPrice(product.price, lang)}</p>
          <a href="${getWhatsAppLink(product, lang)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
            <i class="fab fa-whatsapp"></i> ${t('orderOnWhatsapp')}
          </a>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    // Re-observe new elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting) e.target.classList.add('visible');
      });
    });
    document.querySelectorAll('.product-card').forEach(el => observer.observe(el));
    
    // Attach wishlist events
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-id'));
        const active = toggleWishlist(id);
        btn.classList.toggle('active', active);
        btn.querySelector('svg').setAttribute('fill', active ? 'currentColor' : 'none');
      });
    });
  };

  const filterAndSortProducts = () => {
    let filtered = products;
    if (currentCategory !== 'all') {
      filtered = products.filter(p => p.category === currentCategory);
    }
    
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    renderProducts(filtered);
  };

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      filterAndSortProducts();
    });
  });

  // Sort Select
  const sortSelect = document.getElementById('sort-products');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      filterAndSortProducts();
    });
  }

  // Initial render
  filterAndSortProducts();
}

// --- FEATURED PRODUCTS ---
function initFeaturedProducts() {
  const featuredGrid = document.getElementById('featuredGrid');
  if (!featuredGrid || typeof products === 'undefined') return;
  
  const lang = getCurrentLang();
  const featured = products.filter(p => p.featured).slice(0, 4);
  
  featuredGrid.innerHTML = '';
  featured.forEach(product => {
    const name = lang === 'ar' ? product.nameAr : product.nameEn;
    const isFav = isInWishlist(product.id);
    const badge = product.badge ? (lang === 'ar' ? product.badgeAr : product.badgeEn) : '';
    const badgeHtml = badge ? `<span class="product-badge">${badge}</span>` : '';
    
    const card = document.createElement('div');
    card.className = 'card product-card visible';
    card.innerHTML = `
      <div class="product-image-container">
        ${badgeHtml}
        <img src="${product.image}" alt="${name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80';">
        <button class="wishlist-btn ${isFav ? 'active' : ''}" data-id="${product.id}" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-title"><a href="product.html?id=${product.id}">${name}</a></h3>
        <p class="product-price">${formatPrice(product.price, lang)}</p>
        <a href="${getWhatsAppLink(product, lang)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          <i class="fab fa-whatsapp"></i> ${t('orderOnWhatsapp')}
        </a>
      </div>
    `;
    featuredGrid.appendChild(card);
  });
  
  // Attach wishlist logic
  featuredGrid.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.getAttribute('data-id'));
      const active = toggleWishlist(id);
      btn.classList.toggle('active', active);
      btn.querySelector('svg').setAttribute('fill', active ? 'currentColor' : 'none');
    });
  });
}

// --- PRODUCT DETAIL PAGE ---
function initProductDetailPage() {
  const productContainer = document.querySelector('.product-detail-container');
  if (!productContainer || typeof products === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    productContainer.innerHTML = '<h2>Product not found / المنتج غير موجود</h2>';
    return;
  }

  const lang = getCurrentLang();
  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const description = lang === 'ar' ? product.descriptionAr : product.descriptionEn;
  const material = lang === 'ar' ? product.material : product.materialEn;
  const isFav = isInWishlist(product.id);

  // Render Gallery
  const thumbnailsHtml = product.images.map((img, idx) => `
    <img src="${img}" class="thumbnail ${idx === 0 ? 'active' : ''}" data-full="${img}" alt="${name} thumbnail">
  `).join('');

  productContainer.innerHTML = `
    <div class="product-gallery">
      <div class="main-image-container">
        <img src="${product.images[0]}" alt="${name}" id="main-product-image">
      </div>
      <div class="thumbnails-container">
        ${thumbnailsHtml}
      </div>
    </div>
    
    <div class="product-info">
      <h1 class="product-title-large">${name}</h1>
      <p class="product-price-large">${formatPrice(product.price, lang)}</p>
      
      <div class="product-description mt-4">
        <p>${description}</p>
      </div>
      
      <ul class="product-specs mt-4">
        <li><strong>${t('dimensions')}:</strong> ${product.dimensions}</li>
        <li><strong>${t('material')}:</strong> ${material}</li>
      </ul>
      
      <div class="product-actions mt-5">
        <a href="${getWhatsAppLink(product, lang)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-large w-100">
          ${t('orderOnWhatsapp')}
        </a>
        <button class="btn btn-secondary btn-large w-100 mt-3 wishlist-toggle ${isFav ? 'active' : ''}" data-id="${product.id}">
          <span class="icon">♥</span> ${t('addToFav')}
        </button>
      </div>
    </div>
  `;

  // Image Gallery Interaction
  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImage.src = thumb.getAttribute('data-full');
    });
  });
  
  // Wishlist toggle on detail page
  const wishlistToggleBtn = document.querySelector('.wishlist-toggle');
  wishlistToggleBtn.addEventListener('click', () => {
    const active = toggleWishlist(product.id);
    wishlistToggleBtn.classList.toggle('active', active);
  });
}

// --- GALLERY PAGE ---
function initGalleryPage() {
  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid) return;

  const filterBtns = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  document.body.appendChild(lightbox);

  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      img.addEventListener('click', () => {
        lightbox.classList.add('active');
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        while (lightbox.firstChild) {
          lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(lightboxImg);
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        lightbox.appendChild(closeBtn);
      });
    }
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget && e.target.className !== 'lightbox-close') return;
    lightbox.classList.remove('active');
  });
}

// --- FAQ PAGE ---
function initFAQPage() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// --- TESTIMONIALS CAROUSEL ---
function initTestimonials() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  const goToSlide = (index) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
  };
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Auto rotate
  setInterval(() => {
    let next = (currentSlide + 1) % slideCount;
    goToSlide(next);
  }, 5000);
}
