"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice, formatDate } from "@/lib/utils";
import { Order, OrderStatus } from "@/types";

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      const match = Store.getOrderById(initialOrderId);
      if (match) {
        setOrder(match);
      }
      setSearched(true);
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    const match = Store.getOrderById(orderQuery.trim());
    setOrder(match || null);
    setSearched(true);
  };

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    {
      status: "PENDING",
      label: "Order Placed",
      desc: "Batch order registered and sent to workshop",
    },
    {
      status: "CONFIRMED",
      label: "Confirmed",
      desc: "Fresh paste ingredients verified & allocated",
    },
    {
      status: "PACKED",
      label: "Packed with Cold Packs",
      desc: "Triple-sieved cones sealed in thermal pouch",
    },
    {
      status: "SHIPPED",
      label: "Dispatched",
      desc: "Handed over to express air courier",
    },
    {
      status: "DELIVERED",
      label: "Delivered",
      desc: "Arrived safely at customer doorstep",
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    const map: Record<OrderStatus, number> = {
      PENDING: 0,
      CONFIRMED: 1,
      PACKED: 2,
      SHIPPED: 3,
      DELIVERED: 4,
      CANCELLED: -1,
      REFUNDED: -1,
    };
    return map[status] ?? 0;
  };

  const currentStepIndex = order ? getStepIndex(order.status) : 0;

  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta bg-terracotta/10 px-3.5 py-1 rounded-full">
            Logistics & Delivery Concierge
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900">
            Track Your Sacred Batch
          </h1>
          <p className="text-sm text-henna-700 leading-relaxed font-normal">
            Enter your order reference number (e.g., <strong>ZH-2026-1001</strong>) to follow your package journey from Sojat to your doorstep.
          </p>
        </div>

        {/* Lookup Search Input */}
        <form
          onSubmit={handleSearch}
          className="bg-cream-soft p-4 sm:p-6 rounded-3xl border border-henna-200/90 shadow-md flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-henna-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. ZH-2026-1001)"
              className="w-full bg-white border border-henna-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-henna-900 focus:outline-none focus:border-terracotta font-mono font-semibold"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-henna-900 text-cream-soft font-bold text-xs uppercase tracking-wider hover:bg-terracotta transition-colors shadow-sm"
          >
            Track Status
          </button>
        </form>

        {/* Search Results */}
        {searched && (
          <div>
            {!order ? (
              <div className="p-8 rounded-3xl bg-cream-soft border border-dashed border-henna-300 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-terracotta mx-auto" />
                <h3 className="font-heading text-xl font-bold text-henna-900">
                  Order Not Found
                </h3>
                <p className="text-xs text-henna-600 max-w-md mx-auto">
                  We couldn't locate an order matching "{orderQuery}". Try using seeded reference <strong>ZH-2026-1001</strong> or <strong>ZH-2026-1002</strong>.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-henna-200/90 shadow-xl space-y-8">
                {/* Order Top Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-henna-100">
                  <div>
                    <span className="text-xs text-henna-500 block">Order Reference</span>
                    <h3 className="font-heading font-bold text-2xl text-henna-900">
                      {order.orderNumber}
                    </h3>
                    <p className="text-xs text-henna-600 mt-0.5">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-henna-500 block">Current Status</span>
                    <span className="inline-block mt-0.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-terracotta/10 text-terracotta border border-terracotta/30">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Tracking & Carrier Info */}
                {(order.trackingNumber || order.shippingCarrier) && (
                  <div className="p-4 rounded-2xl bg-henna-50 border border-henna-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-terracotta" />
                      <div>
                        <span className="font-bold text-henna-900 block">
                          Carrier: {order.shippingCarrier || "Express Air Courier"}
                        </span>
                        <span className="text-henna-600">
                          Tracking AWB: <strong className="font-mono">{order.trackingNumber}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Step Pipeline */}
                <div className="py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                    {steps.map((step, idx) => {
                      const isCompleted = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <div
                          key={step.status}
                          className={`flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 p-3 rounded-2xl transition-all ${
                            isCurrent
                              ? "bg-terracotta/10 border border-terracotta/30"
                              : isCompleted
                              ? "bg-cream-soft/60"
                              : "opacity-40"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted
                                ? "bg-terracotta text-white shadow-md"
                                : "bg-henna-200 text-henna-600"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <span className="font-heading font-bold text-xs sm:text-sm text-henna-900 block">
                              {step.label}
                            </span>
                            <span className="text-[10px] text-henna-600 block mt-0.5 leading-tight">
                              {step.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Destination & Purchased Items */}
                <div className="pt-6 border-t border-henna-100 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-henna-700 mb-2">
                      Destination Address
                    </h4>
                    <div className="p-4 rounded-xl bg-cream-soft space-y-1">
                      <p className="font-bold text-henna-900">{order.address.name}</p>
                      <p>{order.address.street}</p>
                      <p>
                        {order.address.city}, {order.address.state} - {order.address.postalCode}
                      </p>
                      <p>Contact: {order.address.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-henna-700 mb-2">
                      Items in Package ({order.items.length})
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-1.5 border-b border-henna-100 last:border-none"
                        >
                          <span>
                            {item.productTitle} ({item.variantName}) × {item.quantity}
                          </span>
                          <span className="font-bold text-henna-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                      <div className="pt-2 flex justify-between font-bold text-sm text-terracotta">
                        <span>Total Paid</span>
                        <span>{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
