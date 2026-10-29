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

let products: Product[] = [...INITIAL_PRODUCTS];
let categories: Category[] = [...INITIAL_CATEGORIES];

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

let enquiries: Enquiry[] = [
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

let orders: Order[] = [
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

let siteSettings = {
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
  // Products
  getProducts: () => products.filter((p) => p.isVisible),
  getAllProductsAdmin: () => products,
  getProductBySlug: (slug: string) => products.find((p) => p.slug === slug),
  getProductById: (id: string) => products.find((p) => p.id === id),
  saveProduct: (product: Product) => {
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      products[idx] = product;
    } else {
      products.unshift(product);
    }
    // Async background sync to Supabase
    syncProductToSupabase(product).catch(() => {});
    return product;
  },
  deleteProduct: (id: string) => {
    products = products.filter((p) => p.id !== id);
  },

  // Categories
  getCategories: () => categories,
  saveCategory: (cat: Category) => {
    const idx = categories.findIndex((c) => c.id === cat.id);
    if (idx >= 0) categories[idx] = cat;
    else categories.push(cat);
    return cat;
  },

  // Orders (WhatsApp Orders)
  getOrders: () => orders,
  getOrderById: (id: string) => orders.find((o) => o.id === id || o.orderNumber === id),
  createOrder: (order: Order) => {
    orders.unshift(order);
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
    const o = orders.find((ord) => ord.id === id || ord.orderNumber === id);
    if (o) {
      o.status = status;
      if (trackingNumber !== undefined) o.trackingNumber = trackingNumber;
      if (carrier !== undefined) o.shippingCarrier = carrier;
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
  getEnquiries: () => enquiries,
  addEnquiry: (enquiry: Enquiry) => {
    enquiries.unshift(enquiry);
    // Async background sync to Supabase
    syncEnquiryToSupabase(enquiry).catch(() => {});
    return enquiry;
  },
  markEnquiryRead: (id: string) => {
    const e = enquiries.find((enq) => enq.id === id);
    if (e) e.isRead = true;
    return e;
  },
  deleteEnquiry: (id: string) => {
    enquiries = enquiries.filter((enq) => enq.id !== id);
  },

  // Settings
  getSettings: () => siteSettings,
  updateSettings: (newSettings: Partial<typeof siteSettings>) => {
    siteSettings = { ...siteSettings, ...newSettings };
    return siteSettings;
  },

  // Content
  getTestimonials: () => INITIAL_TESTIMONIALS,
  getFaqs: () => INITIAL_FAQS,
};
