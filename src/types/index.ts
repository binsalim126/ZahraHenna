export type Role = "ADMIN" | "CUSTOMER";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod = "RAZORPAY" | "STRIPE" | "CASH_ON_DELIVERY";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT";

export interface ProductVariant {
  id: string;
  sku: string;
  name: string; // e.g. "100g", "250g", "500g"
  price: number;
  discountPrice?: number | null;
  stockQuantity: number;
  weightInGrams?: number | null;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  order: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string | null;
  ingredients?: string | null;
  benefits?: string | null;
  howToUse?: string | null;
  isFeatured: boolean;
  isVisible: boolean;
  categoryId: string;
  categoryName?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  productCount?: number;
}

export interface CartItem {
  productId: string;
  productTitle: string;
  productSlug: string;
  variantId: string;
  variantName: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  variantId: string;
  variantName: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  couponCode?: string | null;
  trackingNumber?: string | null;
  shippingCarrier?: string | null;
  address: Address;
  items: OrderItem[];
  notes?: string | null;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productTitle?: string;
  author: string;
  rating: number;
  title?: string;
  comment: string;
  isApproved: boolean;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minSpend?: number | null;
  maxDiscount?: number | null;
  isActive: boolean;
  expiresAt?: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  location?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SiteSettings {
  announcementText: string;
  announcementActive: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  whatsappNumber: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  heroHeadline: string;
  heroSubheadline: string;
}
