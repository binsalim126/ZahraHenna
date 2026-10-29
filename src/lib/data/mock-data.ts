import { Category, Product, Testimonial, FAQItem } from "@/types";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-cones-pack",
    name: "Pack of 12",
    slug: "pack-of-12",
    description: "Individually sealed in clear wrap with caramel-brown paste and fine tip.",
    image: "/assets/images/henna-cones-in-hand.png",
    productCount: 2,
  },
  {
    id: "cat-single",
    name: "Single Cone",
    slug: "single-cone",
    description: "Freshly churned ready-to-use cone with razor-fine pin tip.",
    image: "/assets/images/henna-cones-in-hand.png",
    productCount: 1,
  },
  {
    id: "cat-bulk",
    name: "Bulk / Wholesale",
    slug: "bulk-wholesale",
    description: "Wholesale boxes for professional mehndi artists and salons.",
    image: "/assets/images/henna-cones-in-hand.png",
    productCount: 1,
  },
  {
    id: "cat-powder",
    name: "Henna Powder",
    slug: "henna-powder",
    description: "Triple-sieved pure henna and moringa leaf powder.",
    image: "/assets/images/moringa-leaf-powder-swirl.png",
    productCount: 2,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Natural Henna Cones (Pack of 12)",
    slug: "natural-henna-cones-pack-of-12",
    shortDesc: "Individually sealed in clear plastic wrap, smooth caramel-brown paste, ultra-fine 0.38mm tip for precision bridal designs.",
    description: `Our signature ready-to-use natural henna cones are freshly rolled and hand-filled with pure Rajasthani henna leaf powder, nutrient-dense moringa leaf extract, and premium eucalyptus and cajeput essential oils.

Each cone is individually sealed in clear airtight plastic wrap to lock in freshness and aroma. The smooth caramel-brown paste glides effortlessly without clogging, yielding an intense dark-brown to mahogany stain within 24 to 48 hours.

100% natural. Zero chemicals, zero PPD, zero synthetic preservatives. Completely skin-safe for brides, children, and sensitive skin.`,
    ingredients: "100% Natural Lawsonia Inermis (Henna Leaf Powder), Moringa Oleifera Leaf Powder, Filtered Water, Unrefined Cane Sugar, Eucalyptus Globulus Leaf Oil, Cajeput Essential Oil.",
    benefits: `• Individually sealed in clear wrap for maximum freshness
• Ultra-fine 0.38mm tip for intricate lace, mandala, and bridal lines
• Rich dark-brown mahogany stain that lasts 10 to 14 days
• Infused with soothing moringa and pure essential oils
• 100% chemical-free and PPD-free (safe for sensitive skin)`,
    howToUse: `1. Gently peel the outer wrap or snip the fine tip to your desired line width.
2. Apply onto clean, lotion-free skin.
3. Allow the paste to dry for 30–45 minutes.
4. Keep the paste on your skin for 6–8 hours (or overnight) for maximum stain depth.
5. Gently scrape off the dried paste without water. Avoid water for the first 24 hours.`,
    isFeatured: true,
    isVisible: true,
    categoryId: "cat-cones-pack",
    categoryName: "Pack of 12",
    createdAt: new Date().toISOString(),
    rating: 4.98,
    reviewCount: 240,
    images: [
      {
        id: "img-1",
        url: "/assets/images/henna-cones-in-hand.png",
        altText: "Zahra Henna cones held in hand individually wrapped",
        isPrimary: true,
        order: 1,
      },
      {
        id: "img-1-2",
        url: "/assets/images/bridal-henna-hands.jpg",
        altText: "Rich dark stain results on bridal hands",
        isPrimary: false,
        order: 2,
      },
    ],
    variants: [
      {
        id: "var-1-pack12",
        sku: "ZH-CONE-PK12",
        name: "Pack of 12 Cones",
        price: 499,
        discountPrice: 449,
        stockQuantity: 120,
        weightInGrams: 360,
      },
      {
        id: "var-1-pack24",
        sku: "ZH-CONE-PK24",
        name: "Pack of 24 Cones (Double Pack)",
        price: 899,
        discountPrice: 799,
        stockQuantity: 65,
        weightInGrams: 720,
      },
    ],
  },
  {
    id: "prod-2",
    title: "Single Precision Henna Cone",
    slug: "single-precision-henna-cone",
    shortDesc: "Freshly prepared ready-to-use cone individually sealed with needle-thin applicator tip.",
    description: `Perfect for casual occasions, festive celebrations, or trial sessions. Hand-filled with fresh caramel-brown henna paste, rich in moringa and cajeput oil. Guarantees razor-sharp fine lines and dark stain oxidation.`,
    ingredients: "Fresh Sojat Henna Leaf Powder, Moringa Leaf Extract, Filtered Spring Water, Organic Sugar, Eucalyptus & Cajeput Essential Oils.",
    benefits: `• Individually wrapped in clear sealed plastic
• Zero preparation needed — ready to apply immediately
• 100% natural botanicals with no black dye or chemicals`,
    howToUse: `Cut the micro tip to desired thickness, apply on clean skin, let dry, and keep on for 6-8 hours. Scrape off and avoid water for 24 hours.`,
    isFeatured: false,
    isVisible: true,
    categoryId: "cat-single",
    categoryName: "Single Cone",
    createdAt: new Date().toISOString(),
    rating: 4.9,
    reviewCount: 88,
    images: [
      {
        id: "img-2",
        url: "/assets/images/henna-cones-in-hand.png",
        altText: "Single precision henna cone",
        isPrimary: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "var-2-single",
        sku: "ZH-CONE-SINGLE",
        name: "1 Precision Cone (30g)",
        price: 55,
        discountPrice: 45,
        stockQuantity: 200,
        weightInGrams: 30,
      },
    ],
  },
  {
    id: "prod-3",
    title: "Master Artist Wholesale Bundle (Box of 50)",
    slug: "master-artist-wholesale-bundle-box-of-50",
    shortDesc: "Bulk pack of 50 individually wrapped cones for bridal henna artists and beauty salons.",
    description: `Crafted specifically for bridal mehndi specialists who need consistent, smooth paste flow for hours of non-stop application. Shipped fresh with thermal packing. Freezes perfectly for up to 6 months.`,
    ingredients: "Select harvest Rajasthani Henna, Moringa Oleifera, High-terpene Cajeput & Lavender Essential Oils, Pure Cane Sugar.",
    benefits: `• Wholesale tier pricing for professionals and studios
• Consistent 0.38mm tip with zero clogging
• Deep dark-brown stain guarantee across all clients`,
    howToUse: `Store in freezer upon arrival. Thaw for 30 minutes at room temperature before use.`,
    isFeatured: true,
    isVisible: true,
    categoryId: "cat-bulk",
    categoryName: "Bulk / Wholesale",
    createdAt: new Date().toISOString(),
    rating: 5.0,
    reviewCount: 52,
    images: [
      {
        id: "img-3",
        url: "/assets/images/henna-cones-in-hand.png",
        altText: "Bundle of 50 henna cones in hand",
        isPrimary: true,
        order: 1,
      },
      {
        id: "img-3-2",
        url: "/assets/images/bridal-henna-hands.jpg",
        altText: "Bridal stain result",
        isPrimary: false,
        order: 2,
      },
    ],
    variants: [
      {
        id: "var-3-box50",
        sku: "ZH-BULK-50",
        name: "Box of 50 Cones",
        price: 1899,
        discountPrice: 1699,
        stockQuantity: 40,
        weightInGrams: 1500,
      },
      {
        id: "var-3-box100",
        sku: "ZH-BULK-100",
        name: "Studio Master Pack (100 Cones)",
        price: 3499,
        discountPrice: 2999,
        stockQuantity: 20,
        weightInGrams: 3000,
      },
    ],
  },
  {
    id: "prod-4",
    title: "Pure Natural Henna Powder (Grade AAA)",
    slug: "pure-natural-henna-powder-grade-aaa",
    shortDesc: "Triple-cloth micro-sieved Rajasthani henna leaf powder. 100% Lawsonia Inermis with 3.2% natural Lawson dye content.",
    description: `Stone-ground from shade-dried crown leaves of mature henna bushes in Sojat, Rajasthan. Triple micro-sieved through medical-grade nylon cloth for a silky flour-like consistency. Mixes effortlessly into smooth bridal paste without clumps.`,
    ingredients: "100% Pure Lawsonia Inermis (Organic Henna Leaf Powder).",
    benefits: `• Sifted 3 times — guarantees zero lumps in cones
• High natural dye potency for deep mahogany stains
• 100% chemical-free, pesticide-free, and PPD-free`,
    howToUse: `Mix 100g powder with 30ml lemon juice, 10ml cajeput oil, and 30g sugar. Rest 12-24 hours for dye release before cone filling.`,
    isFeatured: true,
    isVisible: true,
    categoryId: "cat-powder",
    categoryName: "Henna Powder",
    createdAt: new Date().toISOString(),
    rating: 4.95,
    reviewCount: 164,
    images: [
      {
        id: "img-4",
        url: "/assets/images/moringa-leaf-powder-swirl.png",
        altText: "Pure botanical leaf and swirling powder",
        isPrimary: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "var-4-100g",
        sku: "ZH-POW-100G",
        name: "100g Foil Pouch",
        price: 199,
        discountPrice: 169,
        stockQuantity: 80,
        weightInGrams: 100,
      },
      {
        id: "var-4-250g",
        sku: "ZH-POW-250G",
        name: "250g Artisanal Tin",
        price: 399,
        discountPrice: 349,
        stockQuantity: 50,
        weightInGrams: 250,
      },
      {
        id: "var-4-500g",
        sku: "ZH-POW-500G",
        name: "500g Value Pack",
        price: 699,
        discountPrice: 599,
        stockQuantity: 30,
        weightInGrams: 500,
      },
    ],
  },
  {
    id: "prod-5",
    title: "Moringa & Henna Herbal Hair Blend",
    slug: "moringa-henna-herbal-hair-blend",
    shortDesc: "Ayurvedic blend of pure Henna and nutrient-rich Moringa powder for vibrant natural brown gloss and scalp strength.",
    description: `Supercharged with organic Moringa leaf powder — known as the 'miracle tree' — packed with vitamins A, C, and iron. Combined with pure henna, this hair mask nourishes the roots, covers stubborn greys, and coats each strand with brilliant gloss.`,
    ingredients: "Pure Henna (Lawsonia Inermis), Organic Moringa Oleifera Leaf Powder, Wild Amla, Bhringraj.",
    benefits: `• Promotes thick hair growth and strengthens roots
• Natural brown gloss with zero chemical burning
• Eliminates dandruff and soothes sensitive scalps`,
    howToUse: `Mix with warm black tea or water into a creamy paste. Apply from roots to ends for 2 hours, then rinse.`,
    isFeatured: false,
    isVisible: true,
    categoryId: "cat-powder",
    categoryName: "Henna Powder",
    createdAt: new Date().toISOString(),
    rating: 4.88,
    reviewCount: 76,
    images: [
      {
        id: "img-5",
        url: "/assets/images/moringa-leaf-powder-swirl.png",
        altText: "Moringa leaf swirl with fresh green powder",
        isPrimary: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "var-5-200g",
        sku: "ZH-MOR-200G",
        name: "200g Pouch",
        price: 349,
        discountPrice: 299,
        stockQuantity: 60,
        weightInGrams: 200,
      },
    ],
  },
  {
    id: "prod-6",
    title: "Bridal Mehndi Luxury Collection Box",
    slug: "bridal-mehndi-luxury-collection-box",
    shortDesc: "Complete bridal set: 12 ready cones, natural aftercare balm, and sealant spray for darkest stain longevity.",
    description: `Everything needed for a bride's unforgettable wedding celebration. Includes 12 freshly churned cones, organic beeswax aftercare balm to protect against water, and essential oil sealant spray.`,
    ingredients: "Pure Sojat Henna Cones, Beeswax, Clove & Cardamom Balm, Lavender Sealant.",
    benefits: `• Complete bridal kit in luxury gift packaging
• Includes water-resistant aftercare balm to seal stain
• Stains develop into breathtaking deep midnight mahogany`,
    howToUse: `Apply cones, allow to dry, keep on skin overnight. Scrape off and massage balm generously. Avoid water for 24 hours.`,
    isFeatured: true,
    isVisible: true,
    categoryId: "cat-cones-pack",
    categoryName: "Pack of 12",
    createdAt: new Date().toISOString(),
    rating: 5.0,
    reviewCount: 94,
    images: [
      {
        id: "img-6",
        url: "/assets/images/bridal-henna-hands.jpg",
        altText: "Bridal henna hands with intricate floral mandalas",
        isPrimary: true,
        order: 1,
      },
      {
        id: "img-6-2",
        url: "/assets/images/henna-cones-in-hand.png",
        altText: "Cones included in the set",
        isPrimary: false,
        order: 2,
      },
    ],
    variants: [
      {
        id: "var-6-set",
        sku: "ZH-BRD-BOX",
        name: "Full Bridal Box Set",
        price: 799,
        discountPrice: 699,
        stockQuantity: 35,
        weightInGrams: 550,
      },
    ],
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Farah Qureshi",
    role: "Bridal Henna Artist, Mumbai",
    quote: "The caramel-brown paste consistency of Zahra Henna cones is phenomenal. Not a single clump, smooth 0.38mm tip flow, and my brides get deep mahogany stains every single time without chemical irritation.",
    rating: 5,
    image: "/assets/images/bridal-henna-hands.jpg",
    location: "Mumbai",
  },
  {
    id: "t-2",
    name: "Ayesha Malik",
    role: "Verified Bride",
    quote: "I was terrified of chemical burns from market cones. Zahra Henna gave me peace of mind with 100% natural ingredients. The smell of eucalyptus was so calming and the color lasted two whole weeks!",
    rating: 5,
    image: "/assets/images/henna-cones-in-hand.png",
    location: "Jaipur",
  },
  {
    id: "t-3",
    name: "Dr. Nazia Khan",
    role: "Dermatologist & Henna Enthusiast",
    quote: "Finally a henna brand that is truly 100% natural with zero PPD. The addition of moringa leaf makes the paste silky while maintaining traditional Rajasthani staining potency.",
    rating: 5,
    image: "/assets/images/moringa-leaf-powder-swirl.png",
    location: "New Delhi",
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Purity & Safety",
    question: "Is Zahra Henna 100% chemical-free with zero PPD?",
    answer: "Yes, 100%. We use only pure henna leaf powder from Sojat, nutrient-rich moringa powder, and pure therapeutic essential oils. We never use PPD, kerosene, synthetic preservatives, or artificial dyes.",
  },
  {
    id: "faq-2",
    category: "Staining & Results",
    question: "How long does the stain last and how dark does it get?",
    answer: "With proper aftercare, our natural henna produces a rich, dark-brown to mahogany stain that lasts 10 to 14 days. The stain starts as a warm pumpkin orange and oxidizes into deep brown over 24 to 48 hours.",
  },
  {
    id: "faq-3",
    category: "Shelf Life & Storage",
    question: "What is the shelf life and how should cones be stored?",
    answer: "Because our cones have zero chemical preservatives, store them in your freezer immediately upon arrival. In the freezer, they remain fresh for up to 6 months! Thaw at room temperature for 30 minutes before use.",
  },
  {
    id: "faq-4",
    category: "Ordering & WhatsApp",
    question: "How do I place an order via WhatsApp?",
    answer: "Add your desired packs to your cart, fill in your delivery details, and click 'Checkout via WhatsApp'. It instantly opens WhatsApp with your formatted order summary ready to send to our direct line!",
  },
  {
    id: "faq-5",
    category: "Wholesale & Bulk",
    question: "Do you offer bulk wholesale rates for salons and bridal artists?",
    answer: "Yes! We supply professional artists and salons across the country with fresh bundles of 50 and 100 cones at discounted distributor pricing.",
  },
];
