import {
  Product,
  Category,
  Order,
  Review,
  Coupon,
  SiteSettings,
  OrderStatus,
} from "@/types";
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
} from "./mock-data";
import { BRAND_CONFIG } from "@/lib/config";
import {
  syncOrderToSupabase,
  syncEnquiryToSupabase,
  syncProductToSupabase,
  deleteProductFromSupabase,
} from "@/lib/supabase";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const isBrowser = typeof window !== "undefined";

const STORAGE_KEYS = {
  PRODUCTS: "zh_products_v3",
  CATEGORIES: "zh_categories_v3",
  ORDERS: "zh_orders_v3",
  ENQUIRIES: "zh_enquiries_v3",
  SETTINGS: "zh_settings_v3",
};

function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("localStorage write error:", err);
  }
}

function notifyStoreChange(event: string) {
  if (isBrowser) {
    try {
      window.dispatchEvent(new CustomEvent(event));
    } catch {}
  }
}

// In-memory caches, initialized with persistent localStorage data on client
let products: Product[] = isBrowser
  ? readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, [...INITIAL_PRODUCTS])
  : [...INITIAL_PRODUCTS];

let categories: Category[] = isBrowser
  ? readStorage<Category[]>(STORAGE_KEYS.CATEGORIES, [...INITIAL_CATEGORIES])
  : [...INITIAL_CATEGORIES];

let coupons: Coupon[] = [
  {
    id: "coup-1",
    code: "WELCOME10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minSpend: 299,
    maxDiscount: 100,
    isActive: true,
  },
  {
    id: "coup-2",
    code: "PUREHENNA50",
    discountType: "FIXED_AMOUNT",
    discountValue: 50,
    minSpend: 499,
    maxDiscount: 50,
    isActive: true,
  },
];

let reviews: Review[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    productTitle: "Natural Henna Cones (Pack of 12)",
    author: "Fatima Zehra",
    rating: 5,
    title: "Deepest bridal mahogany stain ever!",
    comment: "The paste was buttery smooth and didn't clog once. My bridal stain was gorgeous dark mahogany for 12 days.",
    isApproved: true,
    isVerifiedPurchase: true,
    createdAt: "2026-10-25T10:00:00Z",
  },
  {
    id: "rev-2",
    productId: "prod-1",
    productTitle: "Natural Henna Cones (Pack of 12)",
    author: "Pooja Sharma",
    rating: 5,
    title: "100% natural, zero chemical burn",
    comment: "I have ultra sensitive skin and usually get rashes from chemical cones. Zahra henna felt cooling and natural.",
    isApproved: true,
    isVerifiedPurchase: true,
    createdAt: "2026-10-26T14:30:00Z",
  },
];

let enquiries: Enquiry[] = isBrowser
  ? readStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, [
      {
        id: "enq-1",
        name: "Pooja Sharma",
        phone: "+91 98200 45678",
        email: "pooja@example.com",
        message: "Interested in ordering 50 cones for a family wedding in December. Can you ship with express cold packs?",
        isRead: false,
        createdAt: "2026-10-27T14:20:00Z",
      },
      {
        id: "enq-2",
        name: "Fatima Zehra",
        phone: "+91 98711 98765",
        email: "fatima.z@example.com",
        message: "Do you supply bridal salons in Hyderabad with weekly fresh batches?",
        isRead: true,
        createdAt: "2026-10-26T10:15:00Z",
      },
    ])
  : [
      {
        id: "enq-1",
        name: "Pooja Sharma",
        phone: "+91 98200 45678",
        email: "pooja@example.com",
        message: "Interested in ordering 50 cones for a family wedding in December. Can you ship with express cold packs?",
        isRead: false,
        createdAt: "2026-10-27T14:20:00Z",
      },
      {
        id: "enq-2",
        name: "Fatima Zehra",
        phone: "+91 98711 98765",
        email: "fatima.z@example.com",
        message: "Do you supply bridal salons in Hyderabad with weekly fresh batches?",
        isRead: true,
        createdAt: "2026-10-26T10:15:00Z",
      },
    ];

let orders: Order[] = isBrowser
  ? readStorage<Order[]>(STORAGE_KEYS.ORDERS, [
      {
        id: "ord-1",
        orderNumber: "ZH-WA-101",
        customerName: "Sana Sheikh",
        customerEmail: "sana@example.com",
        customerPhone: "+91 98199 12345",
        status: "CONFIRMED",
        subtotal: 449,
        shippingCost: 0,
        discountAmount: 0,
        totalAmount: 449,
        paymentMethod: "CASH_ON_DELIVERY",
        paymentStatus: "PENDING",
        address: {
          name: "Sana Sheikh",
          street: "Flat 12, Rose Villa, Bandra",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400050",
          country: "India",
          phone: "+91 98199 12345",
        },
        items: [
          {
            id: "item-1",
            productId: "prod-1",
            productTitle: "Natural Henna Cones (Pack of 12)",
            variantId: "var-1-pack12",
            variantName: "Pack of 12 Cones",
            quantity: 1,
            price: 449,
            image: "/assets/images/henna-cones-in-hand.png",
          },
        ],
        notes: "Please pack with extra thermal protection.",
        createdAt: "2026-10-27T16:40:00Z",
      },
      {
        id: "ord-2",
        orderNumber: "ZH-WA-102",
        customerName: "Kavita Verma",
        customerEmail: "kavita@example.com",
        customerPhone: "+91 98765 11223",
        status: "DELIVERED",
        subtotal: 1699,
        shippingCost: 0,
        discountAmount: 0,
        totalAmount: 1699,
        paymentMethod: "CASH_ON_DELIVERY",
        paymentStatus: "COMPLETED",
        address: {
          name: "Kavita Verma",
          street: "Plot 45, Civil Lines",
          city: "Jaipur",
          state: "Rajasthan",
          postalCode: "302001",
          country: "India",
          phone: "+91 98765 11223",
        },
        items: [
          {
            id: "item-2",
            productId: "prod-3",
            productTitle: "Master Artist Wholesale Bundle (Box of 50)",
            variantId: "var-3-box50",
            variantName: "Box of 50 Cones",
            quantity: 1,
            price: 1699,
            image: "/assets/images/henna-cones-in-hand.png",
          },
        ],
        createdAt: "2026-10-25T11:15:00Z",
      },
    ])
  : [
      {
        id: "ord-1",
        orderNumber: "ZH-WA-101",
        customerName: "Sana Sheikh",
        customerEmail: "sana@example.com",
        customerPhone: "+91 98199 12345",
        status: "CONFIRMED",
        subtotal: 449,
        shippingCost: 0,
        discountAmount: 0,
        totalAmount: 449,
        paymentMethod: "CASH_ON_DELIVERY",
        paymentStatus: "PENDING",
        address: {
          name: "Sana Sheikh",
          street: "Flat 12, Rose Villa, Bandra",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400050",
          country: "India",
          phone: "+91 98199 12345",
        },
        items: [
          {
            id: "item-1",
            productId: "prod-1",
            productTitle: "Natural Henna Cones (Pack of 12)",
            variantId: "var-1-pack12",
            variantName: "Pack of 12 Cones",
            quantity: 1,
            price: 449,
            image: "/assets/images/henna-cones-in-hand.png",
          },
        ],
        notes: "Please pack with extra thermal protection.",
        createdAt: "2026-10-27T16:40:00Z",
      },
      {
        id: "ord-2",
        orderNumber: "ZH-WA-102",
        customerName: "Kavita Verma",
        customerEmail: "kavita@example.com",
        customerPhone: "+91 98765 11223",
        status: "DELIVERED",
        subtotal: 1699,
        shippingCost: 0,
        discountAmount: 0,
        totalAmount: 1699,
        paymentMethod: "CASH_ON_DELIVERY",
        paymentStatus: "COMPLETED",
        address: {
          name: "Kavita Verma",
          street: "Plot 45, Civil Lines",
          city: "Jaipur",
          state: "Rajasthan",
          postalCode: "302001",
          country: "India",
          phone: "+91 98765 11223",
        },
        items: [
          {
            id: "item-2",
            productId: "prod-3",
            productTitle: "Master Artist Wholesale Bundle (Box of 50)",
            variantId: "var-3-box50",
            variantName: "Box of 50 Cones",
            quantity: 1,
            price: 1699,
            image: "/assets/images/henna-cones-in-hand.png",
          },
        ],
        createdAt: "2026-10-25T11:15:00Z",
      },
    ];

let siteSettings = isBrowser
  ? readStorage(STORAGE_KEYS.SETTINGS, {
      whatsappNumber: BRAND_CONFIG.whatsappNumber,
      supportEmail: BRAND_CONFIG.email,
      supportPhone: BRAND_CONFIG.phone,
      location: BRAND_CONFIG.location,
      heroHeadline: "100% Natural Henna, Straight From Nature",
      heroSubheadline: "Handcrafted natural henna cones made with pure henna leaf powder, moringa, and therapeutic essential oils for rich, dark-brown stains. Zero chemicals. Zero PPD.",
      instagram: BRAND_CONFIG.socialLinks.instagram,
      facebook: BRAND_CONFIG.socialLinks.facebook,
      youtube: BRAND_CONFIG.socialLinks.youtube,
      tiktok: BRAND_CONFIG.socialLinks.tiktok,
    })
  : {
      whatsappNumber: BRAND_CONFIG.whatsappNumber,
      supportEmail: BRAND_CONFIG.email,
      supportPhone: BRAND_CONFIG.phone,
      location: BRAND_CONFIG.location,
      heroHeadline: "100% Natural Henna, Straight From Nature",
      heroSubheadline: "Handcrafted natural henna cones made with pure henna leaf powder, moringa, and therapeutic essential oils for rich, dark-brown stains. Zero chemicals. Zero PPD.",
      instagram: BRAND_CONFIG.socialLinks.instagram,
      facebook: BRAND_CONFIG.socialLinks.facebook,
      youtube: BRAND_CONFIG.socialLinks.youtube,
      tiktok: BRAND_CONFIG.socialLinks.tiktok,
    };

export const Store = {
  // Products (Fully Persistent with localStorage & Supabase Sync)
  getProducts: () => {
    if (isBrowser) {
      products = readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, products);
    }
    return products.filter((p) => p.isVisible);
  },
  getAllProductsAdmin: () => {
    if (isBrowser) {
      products = readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, products);
    }
    return products;
  },
  getProductBySlug: (slug: string) => {
    if (isBrowser) {
      products = readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, products);
    }
    return products.find((p) => p.slug === slug);
  },
  getProductById: (id: string) => {
    if (isBrowser) {
      products = readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, products);
    }
    return products.find((p) => p.id === id);
  },
  saveProduct: (product: Product) => {
    if (isBrowser) {
      products = readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, products);
    }
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      products[idx] = product;
    } else {
      products.unshift(product);
    }
    writeStorage(STORAGE_KEYS.PRODUCTS, products);
    notifyStoreChange("zh-products-changed");
    // Async background sync to Supabase
    syncProductToSupabase(product).catch(() => {});
    return product;
  },
  deleteProduct: (id: string) => {
    if (isBrowser) {
      products = readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, products);
    }
    products = products.filter((p) => p.id !== id);
    writeStorage(STORAGE_KEYS.PRODUCTS, products);
    notifyStoreChange("zh-products-changed");
    // Async background delete from Supabase
    deleteProductFromSupabase(id).catch(() => {});
    return true;
  },
  resetProductsToDefault: () => {
    products = [...INITIAL_PRODUCTS];
    writeStorage(STORAGE_KEYS.PRODUCTS, products);
    notifyStoreChange("zh-products-changed");
    return products;
  },

  // Categories
  getCategories: () => {
    if (isBrowser) {
      categories = readStorage<Category[]>(STORAGE_KEYS.CATEGORIES, categories);
    }
    return categories;
  },
  saveCategory: (cat: Category) => {
    if (isBrowser) {
      categories = readStorage<Category[]>(STORAGE_KEYS.CATEGORIES, categories);
    }
    const idx = categories.findIndex((c) => c.id === cat.id);
    if (idx >= 0) categories[idx] = cat;
    else categories.push(cat);
    writeStorage(STORAGE_KEYS.CATEGORIES, categories);
    return cat;
  },

  // Orders (WhatsApp Orders)
  getOrders: () => {
    if (isBrowser) {
      orders = readStorage<Order[]>(STORAGE_KEYS.ORDERS, orders);
    }
    return orders;
  },
  getOrderById: (id: string) => {
    if (isBrowser) {
      orders = readStorage<Order[]>(STORAGE_KEYS.ORDERS, orders);
    }
    return orders.find((o) => o.id === id || o.orderNumber === id);
  },
  createOrder: (order: Order) => {
    if (isBrowser) {
      orders = readStorage<Order[]>(STORAGE_KEYS.ORDERS, orders);
    }
    orders.unshift(order);
    writeStorage(STORAGE_KEYS.ORDERS, orders);
    // Async background sync to Supabase
    syncOrderToSupabase(order).catch(() => {});
    return order;
  },
  updateOrderStatus: (
    id: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ) => {
    if (isBrowser) {
      orders = readStorage<Order[]>(STORAGE_KEYS.ORDERS, orders);
    }
    const o = orders.find((ord) => ord.id === id || ord.orderNumber === id);
    if (o) {
      o.status = status;
      if (trackingNumber !== undefined) o.trackingNumber = trackingNumber;
      if (carrier !== undefined) o.shippingCarrier = carrier;
      writeStorage(STORAGE_KEYS.ORDERS, orders);
    }
    return o;
  },

  // Coupons
  getCoupons: () => coupons,
  validateCoupon: (code: string, subtotal: number) => {
    const c = coupons.find(
      (cp) => cp.code.toUpperCase() === code.trim().toUpperCase() && cp.isActive
    );
    if (!c) return { valid: false, message: "Invalid or expired coupon code" };
    if (c.minSpend && subtotal < c.minSpend) {
      return { valid: false, message: `Minimum spend of ₹${c.minSpend} required` };
    }
    let discount = 0;
    if (c.discountType === "PERCENTAGE") {
      discount = (subtotal * c.discountValue) / 100;
      if (c.maxDiscount && discount > c.maxDiscount) discount = c.maxDiscount;
    } else {
      discount = c.discountValue;
    }
    return { valid: true, discount: Math.round(discount) };
  },

  // Reviews
  getReviews: (approvedOnly = true) => {
    return approvedOnly ? reviews.filter((r) => r.isApproved) : reviews;
  },
  toggleReviewApproval: (id: string) => {
    const r = reviews.find((rev) => rev.id === id);
    if (r) r.isApproved = !r.isApproved;
    return r;
  },
  deleteReview: (id: string) => {
    reviews = reviews.filter((rev) => rev.id !== id);
  },

  // Enquiries
  getEnquiries: () => {
    if (isBrowser) {
      enquiries = readStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, enquiries);
    }
    return enquiries;
  },
  addEnquiry: (enquiry: Enquiry) => {
    if (isBrowser) {
      enquiries = readStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, enquiries);
    }
    enquiries.unshift(enquiry);
    writeStorage(STORAGE_KEYS.ENQUIRIES, enquiries);
    // Async background sync to Supabase
    syncEnquiryToSupabase(enquiry).catch(() => {});
    return enquiry;
  },
  markEnquiryRead: (id: string) => {
    if (isBrowser) {
      enquiries = readStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, enquiries);
    }
    const e = enquiries.find((enq) => enq.id === id);
    if (e) {
      e.isRead = true;
      writeStorage(STORAGE_KEYS.ENQUIRIES, enquiries);
    }
    return e;
  },
  deleteEnquiry: (id: string) => {
    if (isBrowser) {
      enquiries = readStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, enquiries);
    }
    enquiries = enquiries.filter((enq) => enq.id !== id);
    writeStorage(STORAGE_KEYS.ENQUIRIES, enquiries);
  },

  // Settings
  getSettings: () => {
    if (isBrowser) {
      siteSettings = readStorage(STORAGE_KEYS.SETTINGS, siteSettings);
    }
    return siteSettings;
  },
  updateSettings: (newSettings: Partial<typeof siteSettings>) => {
    if (isBrowser) {
      siteSettings = readStorage(STORAGE_KEYS.SETTINGS, siteSettings);
    }
    siteSettings = { ...siteSettings, ...newSettings };
    writeStorage(STORAGE_KEYS.SETTINGS, siteSettings);
    return siteSettings;
  },

  // Content
  getTestimonials: () => INITIAL_TESTIMONIALS,
  getFaqs: () => INITIAL_FAQS,
};
