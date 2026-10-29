"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import { BRAND_CONFIG } from "@/lib/config";
import { Store } from "@/lib/data/store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, clearCart } = useCart();

  // Customer Delivery Details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [orderSaved, setOrderSaved] = useState(false);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    // 1. Build Item Lines for formatted WhatsApp text
    const itemsText = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.productTitle} (${item.variantName}) x ${item.quantity} - ₹${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const fullAddress = city ? `${address}, ${city}` : address;

    // 2. Exact requested WhatsApp Message format
    const message = `Hello Zahra Henna 👋
I would like to place an order:
${itemsText}

Total: ₹${subtotal}
Name: ${customerName || "Customer"}
Phone: ${customerPhone || "Not provided"}
Address: ${fullAddress || "To be confirmed on chat"}
Notes: ${notes || "None"}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    // 3. Save order into Store / Database so it appears in the Admin Dashboard!
    const newOrderNumber = generateOrderNumber();
    Store.createOrder({
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      customerName: customerName || "WhatsApp Customer",
      customerEmail: "whatsapp.order@zahrahenna.com",
      customerPhone: customerPhone || "Via WhatsApp",
      status: "PENDING",
      subtotal,
      shippingCost: 0,
      discountAmount: 0,
      totalAmount: subtotal,
      paymentMethod: "CASH_ON_DELIVERY",
      paymentStatus: "PENDING",
      address: {
        name: customerName || "Customer",
        street: address || "Shared on WhatsApp",
        city: city || "India",
        state: "Rajasthan",
        postalCode: "302001",
        country: "India",
        phone: customerPhone || "",
      },
      items: items.map((i) => ({
        id: `it-${Date.now()}-${i.variantId}`,
        productId: i.productId,
        productTitle: i.productTitle,
        variantId: i.variantId,
        variantName: i.variantName,
        quantity: i.quantity,
        price: i.price,
        image: i.image,
      })),
      notes,
      createdAt: new Date().toISOString(),
    });

    setOrderSaved(true);

    // Open WhatsApp in new window
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="py-24 bg-cream min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 space-y-4">
          <div className="w-20 h-20 rounded-full bg-sand/20 text-henna flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-henna">
            Your Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-henna-dark/70 leading-relaxed font-normal">
            Discover our individually sealed natural henna cones, bulk artist bundles, and pure moringa blends.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-henna text-white text-xs font-bold uppercase tracking-wider hover:bg-henna-dark transition-all shadow-md mt-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-luxury-home bg-henna-filigree min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-sand/20 pb-4">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna">
            Your Henna Cart ({totalItems} items)
          </h1>
          <p className="text-xs text-henna-dark/70 mt-1">
            Complete your order smoothly through our direct WhatsApp line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="p-5 rounded-3xl bg-white border border-sand/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-cream flex-shrink-0 border border-sand/20">
                    <Image
                      src={item.image}
                      alt={item.productTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-henna-dark tracking-tight">
                      {item.productTitle}
                    </h3>
                    <p className="text-xs text-moringa font-medium mt-0.5">
                      {item.variantName}
                    </p>
                    <p className="text-xs text-henna font-bold mt-1">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Stepper */}
                  <div className="flex items-center border border-sand/30 rounded-full bg-cream-soft px-2 py-0.5">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-1 text-henna-dark hover:text-henna"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-henna-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="p-1 text-henna-dark hover:text-henna"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-heading font-bold text-base text-henna w-20 text-right tracking-tight">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Details & Checkout on WhatsApp */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-sand/20 shadow-md space-y-6">
            <h2 className="font-heading font-bold text-xl text-henna border-b border-sand/15 pb-3 tracking-tight">
              Delivery Details (Optional)
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-henna-dark block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Priyal Sharma"
                  className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
                />
              </div>

              <div>
                <label className="font-semibold text-henna-dark block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-henna-dark block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai / Jaipur"
                    className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
                  />
                </div>

                <div>
                  <label className="font-semibold text-henna-dark block mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street / House No."
                    className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-henna-dark block mb-1">
                  Notes / Special Instructions
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please deliver before Friday..."
                  className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
                />
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-sand/15 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-henna-dark/80">
                <span>Items Subtotal:</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-baseline font-heading font-bold text-xl text-henna pt-1 tracking-tight">
                <span>Order Total:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* "Checkout via WhatsApp" Button (Green with WhatsApp Icon and Shimmer Animation) */}
            <button
              onClick={handleWhatsAppCheckout}
              className="btn-shimmer w-full py-4 px-6 rounded-2xl bg-moringa hover:bg-[#4E7528] text-white font-bold text-xs uppercase tracking-wider shadow-luxury flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
              <span>Checkout via WhatsApp</span>
            </button>

            {orderSaved && (
              <div className="p-3 bg-moringa/15 text-moringa text-xs rounded-xl flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Order recorded! Opening WhatsApp conversation...</span>
              </div>
            )}

            <p className="text-[11px] text-center text-henna-dark/60 leading-relaxed">
              Clicking will open a pre-filled WhatsApp message with your order details to <strong>+{BRAND_CONFIG.whatsappNumber}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
