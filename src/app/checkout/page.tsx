"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  CheckCircle,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import { Store } from "@/lib/data/store";
import { PaymentMethod } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  // Address & Contact State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "Rajasthan",
    postalCode: "",
    country: "India",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("RAZORPAY");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const FREE_SHIPPING_THRESHOLD = 499;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 60;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const result = Store.validateCoupon(couponCode, subtotal);
    if (!result.valid) {
      setCouponError(result.message || "Invalid coupon code");
      setDiscountAmount(0);
      setAppliedCoupon(null);
    } else {
      setDiscountAmount(result.discount || 0);
      setAppliedCoupon(couponCode.toUpperCase());
      setCouponError("");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      // Create new persistent Order in Store
      const newOrderNumber = generateOrderNumber();
      const newOrder = Store.createOrder({
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNumber,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        status: "CONFIRMED",
        subtotal,
        shippingCost,
        discountAmount,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === "CASH_ON_DELIVERY" ? "PENDING" : "COMPLETED",
        couponCode: appliedCoupon,
        address: {
          name: formData.name,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        items: items.map((item) => ({
          id: `item-${Date.now()}-${item.variantId}`,
          productId: item.productId,
          productTitle: item.productTitle,
          variantId: item.variantId,
          variantName: item.variantName,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        notes: formData.notes,
        createdAt: new Date().toISOString(),
      });

      // Clear the client-side cart
      clearCart();

      // Redirect to Order Confirmation Receipt page
      router.push(`/order-confirmation/${newOrder.orderNumber}`);
    } catch (err) {
      console.error("Order creation failed", err);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 bg-cream text-center min-h-[60vh] flex items-center justify-center">
        <div>
          <h2 className="font-heading text-2xl font-bold text-henna-900">
            No items in your bag to checkout.
          </h2>
          <Link
            href="/shop"
            className="mt-4 inline-block px-6 py-2.5 rounded-full bg-henna-900 text-cream-soft text-xs font-bold uppercase tracking-wider hover:bg-terracotta"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900 mb-8">
          Express Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact, Shipping Address, Payment Method */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-cream-soft rounded-3xl p-6 sm:p-8 border border-henna-200/90 shadow-sm space-y-4">
              <h2 className="font-heading font-bold text-xl text-henna-900">
                1. Customer & Delivery Contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-henna-800 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ayesha Sharma"
                    className="w-full bg-white border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-henna-800 block mb-1">
                    Phone Number (for Courier SMS updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-henna-800 block mb-1">
                  Email Address (for Order Confirmation & Tracking) *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ayesha@example.com"
                  className="w-full bg-white border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-cream-soft rounded-3xl p-6 sm:p-8 border border-henna-200/90 shadow-sm space-y-4">
              <h2 className="font-heading font-bold text-xl text-henna-900">
                2. Shipping Address
              </h2>
              <div>
                <label className="text-xs font-semibold text-henna-800 block mb-1">
                  Street Address / Apartment / House No. *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Flat 402, Lotus Residency, Near Civil Lines"
                  className="w-full bg-white border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-henna-800 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Jaipur / Mumbai"
                    className="w-full bg-white border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-henna-800 block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Rajasthan / Maharashtra"
                    className="w-full bg-white border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-henna-800 block mb-1">
                    PIN / Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="302001"
                    className="w-full bg-white border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-henna-800 block mb-1">
                  Delivery Notes or Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ring doorbell, leave with security guard..."
                  className="w-full bg-white border border-henna-200 rounded-xl px-3.5 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-cream-soft rounded-3xl p-6 sm:p-8 border border-henna-200/90 shadow-sm space-y-4">
              <h2 className="font-heading font-bold text-xl text-henna-900">
                3. Payment Method
              </h2>

              <div className="space-y-3">
                {/* Razorpay Option */}
                <label
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "RAZORPAY"
                      ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta"
                      : "border-henna-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="RAZORPAY"
                    checked={paymentMethod === "RAZORPAY"}
                    onChange={() => setPaymentMethod("RAZORPAY")}
                    className="mt-1 accent-terracotta"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-base text-henna-900">
                        Razorpay (UPI, Google Pay, PhonePe, Cards, NetBanking)
                      </span>
                      <span className="text-[10px] uppercase font-bold text-leaf bg-leaf/10 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-henna-600 mt-0.5">
                      Instant zero-touch payment via QR code, UPI apps, or credit/debit cards.
                    </p>
                  </div>
                </label>

                {/* Stripe Card Option */}
                <label
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "STRIPE"
                      ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta"
                      : "border-henna-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="STRIPE"
                    checked={paymentMethod === "STRIPE"}
                    onChange={() => setPaymentMethod("STRIPE")}
                    className="mt-1 accent-terracotta"
                  />
                  <div className="flex-1">
                    <span className="font-heading font-bold text-base text-henna-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-terracotta" />
                      Credit / Debit Card (International & Domestic)
                    </span>
                    <p className="text-xs text-henna-600 mt-0.5">
                      Encrypted card processing powered by Stripe.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery (COD) */}
                <label
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "CASH_ON_DELIVERY"
                      ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta"
                      : "border-henna-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="CASH_ON_DELIVERY"
                    checked={paymentMethod === "CASH_ON_DELIVERY"}
                    onChange={() => setPaymentMethod("CASH_ON_DELIVERY")}
                    className="mt-1 accent-terracotta"
                  />
                  <div className="flex-1">
                    <span className="font-heading font-bold text-base text-henna-900 flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-terracotta" />
                      Cash on Delivery (COD)
                    </span>
                    <p className="text-xs text-henna-600 mt-0.5">
                      Pay cash to the courier representative when your package arrives at your doorstep.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Submit */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-cream-soft rounded-3xl p-6 sm:p-8 border border-henna-200/90 shadow-xl space-y-6 sticky top-28">
              <h2 className="font-heading font-bold text-xl text-henna-900">
                Order Review ({items.length} items)
              </h2>

              {/* Items Mini List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex items-center justify-between gap-3 text-xs border-b border-henna-100 pb-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.productTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-henna-900 line-clamp-1">
                          {item.productTitle}
                        </span>
                        <span className="text-henna-500 block text-[11px]">
                          {item.variantName} × {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-henna-900 text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon voucher input */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. WELCOME10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-henna-200 rounded-xl px-3 py-2 text-xs uppercase font-semibold text-henna-900 placeholder-henna-400 focus:outline-none focus:border-terracotta"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3.5 py-2 rounded-xl bg-henna-900 text-cream-soft text-xs font-bold uppercase hover:bg-terracotta"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="text-[11px] text-leaf font-semibold mt-1">
                    ✓ Voucher {appliedCoupon} applied (-{formatPrice(discountAmount)})
                  </div>
                )}
                {couponError && (
                  <div className="text-[11px] text-red-600 font-medium mt-1">
                    ✕ {couponError}
                  </div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="border-t border-henna-200 pt-4 space-y-2.5 text-xs text-henna-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-henna-900">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-leaf">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Courier Shipping</span>
                  <span className="font-semibold text-henna-900">
                    {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="border-t border-henna-200 pt-3 flex justify-between items-baseline">
                  <span className="font-heading font-bold text-base text-henna-900">
                    Total Payable
                  </span>
                  <span className="font-heading font-bold text-2xl text-terracotta">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-terracotta text-white font-bold text-xs uppercase tracking-wider hover:bg-terracotta-dark transition-all shadow-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === "CASH_ON_DELIVERY"
                        ? "Confirm Cash on Delivery Order"
                        : `Pay ${formatPrice(totalAmount)} & Place Order`}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-henna-500">
                <ShieldCheck className="w-3.5 h-3.5 text-leaf" />
                <span>Small batch fresh harvest guarantee • 100% Skin Safe</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
