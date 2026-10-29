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
      label: "Packed Fresh",
      desc: "Triple-sieved cones sealed in thermal wrap",
    },
    {
      status: "SHIPPED",
      label: "Dispatched",
      desc: "Handed over to express courier",
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
    <div className="py-12 sm:py-20 bg-luxury-home bg-henna-filigree min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2.5">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
            Courier Tracking
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-henna tracking-tight">
            Track Your Fresh Batch
          </h1>
          <p className="text-xs sm:text-sm text-henna-dark/75 leading-relaxed font-normal">
            Enter your order reference number to follow your package journey from our workshop to your doorstep.
          </p>
        </div>

        {/* Lookup Search Input */}
        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-sand/25 shadow-sm flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-henna-dark/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order Number (e.g. ZH-ORD-101)"
              className="w-full bg-cream border border-sand/30 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-henna-dark focus:outline-none focus:border-henna font-mono font-semibold"
            />
          </div>
          <button
            type="submit"
            className="btn-shimmer px-8 py-3.5 rounded-xl bg-henna hover:bg-henna-dark text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Track Status
          </button>
        </form>

        {/* Search Results */}
        {searched && (
          <div>
            {!order ? (
              <div className="p-8 rounded-3xl bg-white border border-dashed border-sand/40 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-sand mx-auto" />
                <h3 className="font-heading text-lg font-bold text-henna">
                  Order Not Found
                </h3>
                <p className="text-xs text-henna-dark/70 max-w-md mx-auto">
                  We couldn't locate an order matching "{orderQuery}". Please check your order confirmation on WhatsApp or email.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand/25 shadow-sm space-y-6">
                {/* Order Top Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-sand/20">
                  <div>
                    <span className="text-[10px] text-henna-dark/50 uppercase font-semibold tracking-wider block">
                      Order Reference
                    </span>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-henna">
                      #{order.orderNumber}
                    </h3>
                    <p className="text-xs text-henna-dark/60 mt-0.5">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-henna-dark/50 uppercase font-semibold tracking-wider block">
                      Current Status
                    </span>
                    <span className="inline-block mt-0.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-moringa/15 text-moringa border border-moringa/30">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Steps */}
                <div className="py-2 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {steps.map((st, idx) => {
                      const isComplete = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;

                      return (
                        <div
                          key={st.status}
                          className={`p-3.5 rounded-2xl border transition-all text-left ${
                            isCurrent
                              ? "bg-moringa/10 border-moringa shadow-xs ring-1 ring-moringa/30"
                              : isComplete
                              ? "bg-cream border-sand/30"
                              : "bg-cream-soft/60 border-sand/15 opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {isComplete ? (
                              <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0" />
                            ) : (
                              <Clock className="w-4 h-4 text-sand flex-shrink-0" />
                            )}
                            <span className="font-heading font-bold text-xs text-henna-dark">
                              {st.label}
                            </span>
                          </div>
                          <p className="text-[10px] text-henna-dark/70 leading-snug">
                            {st.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items & Address Summary */}
                <div className="pt-4 border-t border-sand/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-cream border border-sand/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-moringa">
                      Recipient & Destination
                    </span>
                    <p className="font-bold text-henna-dark">{order.customerName}</p>
                    <p className="text-henna-dark/70">
                      {order.address.street}, {order.address.city}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cream border border-sand/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-moringa">
                      Order Total & Payment
                    </span>
                    <p className="font-heading font-extrabold text-sm text-henna">
                      {formatPrice(order.totalAmount)}
                    </p>
                    <p className="text-henna-dark/70">
                      {order.items.length} item(s) • {order.paymentMethod.replace("_", " ")}
                    </p>
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
