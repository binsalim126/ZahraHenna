"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  MessageCircle,
  Clock,
  CheckCircle,
  Truck,
  ChevronDown,
  ChevronUp,
  MapPin,
  User,
  Phone,
  Package,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice, formatDate } from "@/lib/utils";
import { OrderStatus } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(Store.getOrders());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    Store.updateOrderStatus(orderId, status);
    setOrders([...Store.getOrders()]);
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "SHIPPED":
      case "PACKED":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "CANCELLED":
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
            Customer Orders
          </h1>
          <p className="text-xs text-henna-dark/70 mt-0.5">
            Tap any order to view customer details, items, address, and update status.
          </p>
        </div>

        <div className="text-xs font-semibold text-henna-dark bg-white border border-sand/30 px-3.5 py-1.5 rounded-full shadow-xs w-fit">
          Total Orders: <strong className="text-henna">{orders.length}</strong>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-sand/25 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-henna-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order ID, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream border border-sand/30 rounded-xl pl-10 pr-4 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
          {["ALL", "PENDING", "CONFIRMED", "DELIVERED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                statusFilter === st
                  ? "bg-henna text-white shadow-sm"
                  : "bg-cream text-henna-dark hover:bg-cream-soft"
              }`}
            >
              {st === "PENDING" ? "New" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List (ID, Total, and Status with click-to-expand details - ZERO side scrolling) */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-sand/25 text-henna-dark/60 text-xs">
            No orders found matching your search.
          </div>
        ) : (
          filtered.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  isExpanded ? "border-henna shadow-md ring-1 ring-henna/20" : "border-sand/25 hover:border-sand/60"
                }`}
              >
                {/* Compact Bar: ID, TOTAL, and STATUS only */}
                <button
                  type="button"
                  onClick={() => toggleExpand(order.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-cream-soft/40 transition-colors gap-2"
                >
                  {/* 1. ORDER ID */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-cream text-henna flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-heading font-extrabold text-xs sm:text-sm text-henna block truncate tracking-tight">
                        #{order.orderNumber}
                      </span>
                      <span className="text-[10px] text-henna-dark/50 block font-normal">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* 2. ORDER TOTAL & 3. STATUS BADGE */}
                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    {/* TOTAL */}
                    <span className="font-heading font-extrabold text-sm sm:text-base text-henna-dark tabular-nums">
                      {formatPrice(order.totalAmount)}
                    </span>

                    {/* STATUS */}
                    <span
                      className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border uppercase tracking-wider ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                    {/* Chevron Indicator */}
                    <div className="text-henna-dark/40 hover:text-henna transition-transform">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-henna" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Full Order Details (Opened on Click) */}
                {isExpanded && (
                  <div className="border-t border-sand/20 bg-cream-soft/60 p-4 sm:p-6 space-y-4 text-xs animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Customer Info & WhatsApp Chat */}
                      <div className="bg-white p-3.5 rounded-xl border border-sand/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-moringa tracking-wider flex items-center gap-1">
                            <User className="w-3 h-3" /> Customer Details
                          </span>
                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${order.customerName}! This is Zahra Henna regarding your order #${order.orderNumber}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moringa text-white text-[11px] font-bold shadow-xs hover:bg-moringa-dark transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Chat on WhatsApp</span>
                          </a>
                        </div>
                        <p className="font-heading font-bold text-sm text-henna-dark">
                          {order.customerName}
                        </p>
                        <p className="text-henna-dark/70 font-mono text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3 text-sand" />
                          <span>{order.customerPhone}</span>
                        </p>
                        {order.customerEmail && (
                          <p className="text-henna-dark/60 text-[11px]">
                            {order.customerEmail}
                          </p>
                        )}
                      </div>

                      {/* Delivery Address */}
                      <div className="bg-white p-3.5 rounded-xl border border-sand/20 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-moringa tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Delivery Address
                        </span>
                        <p className="text-henna-dark font-medium leading-relaxed">
                          {order.address.street}
                        </p>
                        <p className="text-henna-dark/70 text-[11px]">
                          {order.address.city}, {order.address.state} —{" "}
                          <strong className="text-henna">{order.address.postalCode}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Items Ordered List */}
                    <div className="bg-white p-3.5 rounded-xl border border-sand/20 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-moringa tracking-wider flex items-center gap-1">
                        <Package className="w-3 h-3" /> Ordered Items ({order.items.length})
                      </span>
                      <div className="divide-y divide-sand/15">
                        {order.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="py-2 flex items-center justify-between text-xs"
                          >
                            <div>
                              <p className="font-bold text-henna-dark">
                                {it.productTitle}
                              </p>
                              <span className="text-[10px] text-henna-dark/60">
                                Variant: {it.variantName} × {it.quantity}
                              </span>
                            </div>
                            <span className="font-bold text-henna font-mono">
                              {formatPrice(it.price * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary & Status Update */}
                      <div className="pt-3 border-t border-sand/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-henna-dark">
                            Update Order Status:
                          </span>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as OrderStatus)
                            }
                            className="bg-cream border border-sand/30 rounded-xl px-3 py-1.5 text-xs font-bold text-henna focus:outline-none focus:border-henna cursor-pointer"
                          >
                            <option value="PENDING">PENDING (New)</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PACKED">PACKED</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </div>

                        <div className="flex items-baseline gap-2 justify-end">
                          <span className="text-xs text-henna-dark/60">Total:</span>
                          <span className="font-heading font-extrabold text-base text-henna">
                            {formatPrice(order.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
