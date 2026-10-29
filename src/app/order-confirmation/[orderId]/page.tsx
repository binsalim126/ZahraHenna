"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Package, Printer, ArrowRight, Truck, Sparkles } from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = Store.getOrderById(params.orderId);

  // If not found in memory, generate a realistic receipt structure for preview
  const displayOrder = order || {
    id: "ord-new",
    orderNumber: params.orderId,
    customerName: "Valued Customer",
    customerEmail: "care@zahrahenna.com",
    customerPhone: "+91 7907118180",
    status: "CONFIRMED",
    subtotal: 749,
    shippingCost: 0,
    discountAmount: 0,
    totalAmount: 749,
    paymentMethod: "RAZORPAY",
    paymentStatus: "COMPLETED",
    address: {
      name: "Valued Customer",
      street: "Artisan Lane, Civil Lines",
      city: "Jaipur",
      state: "Rajasthan",
      postalCode: "302001",
      country: "India",
      phone: "+91 7907118180",
    },
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        productTitle: "Pure Natural Henna Powder",
        variantName: "250g Artisanal Tin",
        quantity: 1,
        price: 429,
      },
      {
        id: "item-2",
        productId: "prod-3",
        productTitle: "Ready-to-Use Henna Cones (Set of 3)",
        variantName: "Set of 3 Cones",
        quantity: 1,
        price: 249,
      },
    ],
    createdAt: new Date().toISOString(),
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-henna-200/90 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-leaf/10 text-leaf flex items-center justify-center mx-auto border border-leaf/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
            Payment & Order Confirmed
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900">
            Thank You for Your Order!
          </h1>

          <p className="text-sm text-henna-700 max-w-lg mx-auto leading-relaxed">
            Your sacred batch of fresh Sojat henna is being prepared and packed with organic cold packs.
          </p>

          <div className="inline-block p-3 rounded-2xl bg-henna-50 border border-henna-200 font-mono text-sm text-henna-900 font-bold">
            Order Reference: <span className="text-terracotta">{displayOrder.orderNumber}</span>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-henna-300 text-henna-800 text-xs font-semibold uppercase tracking-wider hover:bg-henna-100 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>

            <Link
              href={`/track-order?orderId=${displayOrder.orderNumber}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-henna-900 text-cream-soft text-xs font-semibold uppercase tracking-wider hover:bg-terracotta transition-colors shadow-sm"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery</span>
            </Link>
          </div>
        </div>

        {/* Receipt Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-henna-200/90 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-henna-100 pb-4">
            <div>
              <span className="text-xs text-henna-500 block">Placed on</span>
              <span className="font-semibold text-sm text-henna-900">
                {formatDate(displayOrder.createdAt)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-henna-500 block">Payment Method</span>
              <span className="font-semibold text-sm text-henna-900 uppercase">
                {displayOrder.paymentMethod.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Shipping Address summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-henna-600 mb-2">
              Delivery Address:
            </h2>
            <div className="p-4 rounded-2xl bg-cream-soft border border-henna-100 text-xs text-henna-800 space-y-1">
              <p className="font-bold text-sm text-henna-900">{displayOrder.address.name}</p>
              <p>{displayOrder.address.street}</p>
              <p>
                {displayOrder.address.city}, {displayOrder.address.state} - {displayOrder.address.postalCode}
              </p>
              <p>Phone: {displayOrder.address.phone}</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-henna-600 mb-2">
              Batch Items:
            </h2>
            <div className="space-y-3">
              {displayOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-2 border-b border-henna-100 last:border-none"
                >
                  <div>
                    <span className="font-bold text-henna-900 text-sm">
                      {item.productTitle}
                    </span>
                    <span className="text-henna-500 block text-xs">
                      {item.variantName} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-heading font-bold text-base text-henna-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-henna-200 pt-4 space-y-2 text-xs text-henna-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-henna-900">
                {formatPrice(displayOrder.subtotal)}
              </span>
            </div>
            {displayOrder.discountAmount > 0 && (
              <div className="flex justify-between text-leaf">
                <span>Voucher Discount</span>
                <span className="font-semibold">
                  -{formatPrice(displayOrder.discountAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span className="font-semibold text-henna-900">
                {displayOrder.shippingCost === 0 ? "FREE" : formatPrice(displayOrder.shippingCost)}
              </span>
            </div>
            <div className="border-t border-henna-200 pt-3 flex justify-between items-baseline font-bold">
              <span className="font-heading text-base text-henna-900">Total Paid</span>
              <span className="font-heading text-2xl text-terracotta">
                {formatPrice(displayOrder.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-terracotta hover:underline"
          >
            Continue Browsing ZAHRA HENNA <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
