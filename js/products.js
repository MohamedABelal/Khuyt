const products = [
  {
    id: 1,
    nameAr: 'شنطة خرز شمواه كلاسيك (فيروزي)',
    nameEn: 'Velvet Beaded Classic Clutch',
    price: 280,
    currency: 'EGP',
    image: 'images/products/product-1.jpg',
    images: ['images/products/product-1.jpg'],
    category: 'beaded',
    color: 'teal',
    badge: 'bestseller',
    badgeAr: 'بيست سيلر',
    badgeEn: 'Best Seller',
    descriptionAr: 'شنطة سواريه مميزة جداً مشغولة بالخرز الشمواه الفيروزي مع إطار ومقبض معدني كلاسيكي منقوش. قطعة فريدة تعكس الفخامة في مناسباتك.',
    descriptionEn: 'A unique evening clutch handcrafted with teal velvet beads and an intricately engraved vintage metal frame. Luxurious and eye-catching.',
    dimensions: '22 × 16 × 7 سم',
    material: 'خرز شمواه مخملي + شاسيه معدن كلاسيك',
    materialEn: 'Velvet textured beads + antique metal frame',
    featured: true
  },
  {
    id: 2,
    nameAr: 'شنطة خرز لؤلؤي شكل قلب',
    nameEn: 'Pearl Heart-Shaped Bag',
    price: 220,
    currency: 'EGP',
    image: 'images/products/product-2.jpg',
    images: ['images/products/product-2.jpg'],
    category: 'beaded',
    color: 'white',
    badge: 'new',
    badgeAr: 'جديد',
    badgeEn: 'New',
    descriptionAr: 'تصميم رومانسي عصري على شكل قلب مصنوع يدويًا بالكامل من حبات اللؤلؤ الأبيض اللامع مع يد لؤلؤية رقيقة. مثالية للفتيات والخروجات المميزة.',
    descriptionEn: 'A trendy romantic heart-shaped bag entirely handcrafted from shiny white pearl beads with a delicate pearl handle.',
    dimensions: '20 × 18 × 5 سم',
    material: 'حبات لؤلؤ عاجي لامع',
    materialEn: 'Lustrous ivory pearl beads',
    featured: true
  },
  {
    id: 3,
    nameAr: 'ميني باج لؤلؤ مع فيونكة ستان رويال',
    nameEn: 'Mini Pearl Bag with Satin Ribbon',
    price: 190,
    currency: 'EGP',
    image: 'images/products/product-3.jpg',
    images: ['images/products/product-3.jpg', 'images/products/product-3-2.jpg', 'images/products/product-3-3.jpg'],
    category: 'beaded',
    color: 'white',
    badge: 'bestseller',
    badgeAr: 'بيست سيلر',
    badgeEn: 'Best Seller',
    descriptionAr: 'شنطة يد ميني من حبات اللؤلؤ الأنيقة مزينة بفيونكة ستان زرقاء ملكية مع فص لؤلؤ في المنتصف. تناسب السهرات والمناسبات الصيفية.',
    descriptionEn: 'Charming mini pearl handbag adorned with a royal blue satin ribbon and center pearl detail. Perfect for chic occasions.',
    dimensions: '18 × 15 × 5 سم',
    material: 'لؤلؤ عالي الجودة + ستان حريري',
    materialEn: 'High-quality pearl beads + silk satin ribbon',
    featured: true
  },
  {
    id: 4,
    nameAr: 'شنطة لؤلؤ كروس بحزام طويل',
    nameEn: 'Pearl Crossbody Bag with Long Strap',
    price: 260,
    currency: 'EGP',
    image: 'images/products/product-4.jpg',
    images: ['images/products/product-4.jpg'],
    category: 'beaded',
    color: 'white',
    badge: null,
    badgeAr: '',
    badgeEn: '',
    descriptionAr: 'شنطة كروس مستطيلة بغطاء قلاب مصنوعة من اللؤلؤ الأبيض مع حزام لؤلؤي طويل متين، تمنحك إطلالة راقية وعملية أثناء الحركة.',
    descriptionEn: 'Elegant flap-closure rectangular pearl crossbody bag featuring a durable long pearl shoulder strap.',
    dimensions: '22 × 15 × 6 سم',
    material: 'لؤلؤ كروي ناصع البياض',
    materialEn: 'Pure white spherical pearl beads',
    featured: false
  },
  {
    id: 5,
    nameAr: 'شنطة خرز لؤلؤي بيد وسلسلة ذهبية',
    nameEn: 'Luxury Pearl Bag with Gold Chain',
    price: 290,
    currency: 'EGP',
    image: 'images/products/product-5.jpg',
    images: ['images/products/product-5.jpg', 'images/products/product-5-2.jpg'],
    category: 'beaded',
    color: 'white',
    badge: 'bestseller',
    badgeAr: 'بيست سيلر',
    badgeEn: 'Best Seller',
    descriptionAr: 'مزيج فاخر يجمع بين حبات اللؤلؤ النقية وسلاسل ذهبية سميكة وحلقات معدنية برّاقة. تضفي لمسة ملكية على أي فستان أو إطلالة سواريه.',
    descriptionEn: 'Luxurious fusion of pristine pearl beads paired with chunky gold chain handles and metallic rings.',
    dimensions: '24 × 17 × 6 سم',
    material: 'لؤلؤ زجاجي + إكسسوارات سلسلة ذهبية غير قابلة للصدأ',
    materialEn: 'Glass pearls + stainless gold chain hardware',
    featured: true
  },
  {
    id: 6,
    nameAr: 'شنطة خرز لؤلؤي كلاسيك بقوس عريض',
    nameEn: 'Classic Structured Pearl Handbag',
    price: 270,
    currency: 'EGP',
    image: 'images/products/product-6.jpg',
    images: ['images/products/product-6.jpg', 'images/products/product-6-2.jpg'],
    category: 'beaded',
    color: 'white',
    badge: null,
    badgeAr: '',
    badgeEn: '',
    descriptionAr: 'شنطة يد كلاسيكية بتصميم متماسك ويد مقوسة عريضة من اللؤلؤ المجدول. قفل قلاب محكم لتجمع بين الشياكة وسهولة الاستخدام.',
    descriptionEn: 'Structured classic handbag with a wide arched braided pearl top handle and secure flap design.',
    dimensions: '21 × 16 × 6 سم',
    material: 'حبات لؤلؤ متينة محاكة بخيوط قوية',
    materialEn: 'Reinforced pearl beads with heavy-duty weave',
    featured: false
  },
  {
    id: 7,
    nameAr: 'مرآة دائرية بإطار لؤلؤ هاند ميد',
    nameEn: 'Handmade Pearl Beaded Round Mirror',
    price: 160,
    currency: 'EGP',
    image: 'images/products/product-7.jpg',
    images: ['images/products/product-7.jpg', 'images/products/product-7-2.jpg'],
    category: 'beaded',
    color: 'white',
    badge: 'new',
    badgeAr: 'جديد',
    badgeEn: 'New',
    descriptionAr: 'مرآة تسريحة دائرية محاطة بطبقات مجدولة من خرز اللؤلؤ الأبيض. قطعة ديكورية وإكسسوار ساحر لغرفتك أو هدية راقية لصديقتك.',
    descriptionEn: 'Vanity round mirror surrounded by multi-layer braided pearl bead framing. An aesthetic room accessory and lovely gift.',
    dimensions: 'قطر 22 سم',
    material: 'مرآة نقية + تطريز خرز لؤلؤي يدوي',
    materialEn: 'HD glass mirror + hand-beaded pearl border',
    featured: true
  },
  {
    id: 8,
    nameAr: 'ميدالية حرف خرز أسود مع تعليقة فضية',
    nameEn: 'Handmade Black Beaded Letter Keychain',
    price: 85,
    currency: 'EGP',
    image: 'images/products/product-8.jpg',
    images: ['images/products/product-8.jpg'],
    category: 'beaded',
    color: 'black',
    badge: 'new',
    badgeAr: 'جديد',
    badgeEn: 'New',
    descriptionAr: 'ميدالية مفاتيح أو تعليقة شنطة على شكل حرفك المفضل بخيوط وخرز كريستالي أسود لامع مع تعليقة فضية منقوشة (ما شاء الله / اسمك).',
    descriptionEn: 'Personalized letter keychain made with lustrous black crystal beads and engraved silver charm accents.',
    dimensions: '8 × 6 سم',
    material: 'خرز كريستالي أسود + دلاية معدنية فضية',
    materialEn: 'Black crystal beads + engraved silver metal charm',
    featured: false
  },
  {
    id: 9,
    nameAr: 'توزيعات وهدايا ميني شنط خرز (مجموعة)',
    nameEn: 'Mini Pearl Favor Bags (Set)',
    price: 350,
    currency: 'EGP',
    image: 'images/products/product-9.jpg',
    images: ['images/products/product-9.jpg'],
    category: 'beaded',
    color: 'white',
    badge: 'bestseller',
    badgeAr: 'بيست سيلر',
    badgeEn: 'Best Seller',
    descriptionAr: 'مجموعة شنط ميني كيوت من اللؤلؤ بفيونكات ستان بألوان متعددة، مناسبة جداً كتوزيعات كتب كتاب، خطوبة، أعياد ميلاد وهدايا تذكارية فريدة.',
    descriptionEn: 'A set of cute mini pearl bags with colorful satin bows, ideal as bridal favors, engagement giveaways, and personalized gifts.',
    dimensions: '8 × 7 سم للقطعة',
    material: 'لؤلؤ ناعم + فيونكات ستان ملونة',
    materialEn: 'Fine pearls + colorful satin ribbon bows',
    featured: true
  }
];

function getWhatsAppLink(product, lang = 'ar') {
  const phone = '201097595196';
  let message;
  if (lang === 'ar') {
    message = `مرحباً! 👋 أنا عايزة أطلب: ${product.nameAr} — السعر: ${product.price} جنيه`;
  } else {
    message = `Hi! 👋 I'd like to order: ${product.nameEn} — Price: ${product.price} EGP`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function getGeneralWhatsAppLink(lang = 'ar') {
  const phone = '201097595196';
  const message = lang === 'ar' 
    ? 'مرحباً! عايزة أعرف أكتر عن المنتجات 😊'
    : "Hi! I'd like to know more about your products 😊";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
