const translations = {
  ar: {
    home: 'الرئيسية',
    shop: 'المنتجات',
    about: 'قصتنا',
    gallery: 'معرض الأعمال',
    contact: 'تواصلي معانا',
    faq: 'الأسئلة الشائعة',
    orderNow: 'اطلبي دلوقتي',
    orderOnWhatsapp: 'اطلبي على واتساب',
    viewProducts: 'شوفي المنتجات',
    price: 'السعر',
    egp: 'ج.م',
    addToFav: 'أضيفي للمفضلة',
    new: 'جديد',
    bestseller: 'بيست سيلر',
    all: 'الكل',
    beaded: 'خرز',
    macrame: 'ماكرامي',
    mix: 'ميكس',
    dimensions: 'المقاسات',
    material: 'الخامات',
    similarProducts: 'ممكن يعجبك كمان',
    contactUs: 'تواصلي معانا',
    followUs: 'تابعينا',
    madeWithLove: 'صنع بحب في مصر 🇪🇬',
    copyright: '© 2026 خيوط — جميع الحقوق محفوظة',
    whyChooseUs: 'ليه تختاري شنطنا؟',
    handmade: 'هاند ميد 100%',
    handmadeDesc: 'كل قطعة مصنوعة بإيدينا بحب وعناية',
    affordable: 'أسعار في المتناول',
    affordableDesc: 'شنط مميزة تبدأ من 100 جنيه',
    shipping: 'شحن لكل مصر',
    shippingDesc: 'بنوصلك الشنطة لحد باب بيتك',
    featuredProducts: 'منتجات مميزة',
    customerReviews: 'آراء عملاءنا'
  },
  en: {
    home: 'Home',
    shop: 'Shop',
    about: 'Our Story',
    gallery: 'Gallery',
    contact: 'Contact Us',
    faq: 'FAQ',
    orderNow: 'Order Now',
    orderOnWhatsapp: 'Order on WhatsApp',
    viewProducts: 'View Products',
    price: 'Price',
    egp: 'EGP',
    addToFav: 'Add to Favorites',
    new: 'New',
    bestseller: 'Best Seller',
    all: 'All',
    beaded: 'Beaded',
    macrame: 'Macramé',
    mix: 'Mix',
    dimensions: 'Dimensions',
    material: 'Materials',
    similarProducts: 'You May Also Like',
    contactUs: 'Contact Us',
    followUs: 'Follow Us',
    madeWithLove: 'Made with love in Egypt 🇪🇬',
    copyright: '© 2026 Khuyut — All Rights Reserved',
    whyChooseUs: 'Why Choose Us?',
    handmade: '100% Handmade',
    handmadeDesc: 'Each piece is crafted by hand with love and care',
    affordable: 'Affordable Prices',
    affordableDesc: 'Unique bags starting from 100 EGP',
    shipping: 'Shipping All Over Egypt',
    shippingDesc: 'We deliver right to your doorstep',
    featuredProducts: 'Featured Products',
    customerReviews: 'Customer Reviews'
  }
};

function getCurrentLang() {
  return localStorage.getItem('khuyut-lang') || 'ar';
}

function t(key) {
  const lang = getCurrentLang();
  return translations[lang][key] || key;
}

function switchLanguage(lang) {
  localStorage.setItem('khuyut-lang', lang);
  
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  if (lang === 'en') {
    document.body.classList.add('ltr');
  } else {
    document.body.classList.remove('ltr');
  }

  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Handle data-key elements (nav links, footer links, etc.)
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    // Only update if the element doesn't also have data-ar/data-en (those are handled above)
    if (!el.hasAttribute('data-ar') && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    langBtn.textContent = lang === 'ar' ? 'English' : 'عربي';
  }
  
  const floatingWa = document.querySelector('.floating-whatsapp');
  if (floatingWa && typeof getGeneralWhatsAppLink === 'function') {
    floatingWa.href = getGeneralWhatsAppLink(lang);
  }
  
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLang();
  switchLanguage(currentLang);

  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newLang = getCurrentLang() === 'ar' ? 'en' : 'ar';
      switchLanguage(newLang);
    });
  }
});
