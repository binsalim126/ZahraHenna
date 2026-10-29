"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Clock,
  Eye,
  CheckCircle,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminOverviewPage() {
  const products = Store.getAllProductsAdmin();
  const orders = Store.getOrders();
  const enquiries = Store.getEnquiries();

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const unreadEnquiries = enquiries.filter((e) => !e.isRead);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
            Zahra Henna Overview
          </h1>
          <p className="text-xs text-henna-dark/70 mt-1">
            Real-time control center for natural henna cones, WhatsApp enquiries, and distributor orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 rounded-2xl bg-henna text-white text-xs font-bold uppercase tracking-wider hover:bg-henna-dark transition-all shadow-sm"
          >
            + Add New Product
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl bg-white border border-sand/30 text-henna text-xs font-bold uppercase tracking-wider hover:bg-cream transition-colors"
          >
            View Live Site ↗
          </Link>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-henna-dark/60 text-xs font-medium">
            <span>Total Catalog Products</span>
            <div className="w-9 h-9 rounded-2xl bg-sand/20 text-sand flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-3xl font-bold text-henna">
            {products.length} Products
          </div>
          <div className="text-xs text-moringa font-medium flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>All active in public dispensary</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-henna-dark/60 text-xs font-medium">
            <span>WhatsApp Orders</span>
            <div className="w-9 h-9 rounded-2xl bg-moringa/15 text-moringa flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-3xl font-bold text-henna">
            {orders.length} Orders
          </div>
          <div className="text-xs text-henna font-bold">
            Revenue: {formatPrice(totalRevenue)}
          </div>
        </div>

        {/* Customer Enquiries */}
        <div className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-henna-dark/60 text-xs font-medium">
            <span>Customer Enquiries</span>
            <div className="w-9 h-9 rounded-2xl bg-henna/15 text-henna flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading text-3xl font-bold text-henna">
            {enquiries.length} Messages
          </div>
          <div className="text-xs text-moringa font-semibold">
            {unreadEnquiries.length} unread messages awaiting reply
          </div>
        </div>
      </div>

      {/* Two-Column Section: Recent WhatsApp Orders & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent WhatsApp Orders */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-sand/20 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-lg text-henna">
                Recent WhatsApp Orders
              </h2>
              <p className="text-xs text-henna-dark/60">Live orders received from customers</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-moringa hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-cream border border-sand/20 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-henna block">
                    {order.orderNumber}
                  </span>
                  <span className="font-bold text-henna-dark block mt-0.5">
                    {order.customerName} ({order.customerPhone})
                  </span>
                  <span className="text-[11px] text-henna-dark/60">
                    {order.items.length} items • {formatDate(order.createdAt)}
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <span className="font-heading font-bold text-sm text-henna block">
                    {formatPrice(order.totalAmount)}
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      order.status === "DELIVERED"
                        ? "bg-moringa/15 text-moringa"
                        : "bg-sand/20 text-henna"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-sand/20 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-lg text-henna">
                Recent Enquiries
              </h2>
              <p className="text-xs text-henna-dark/60">From contact form</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-moringa hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 3).map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-2xl bg-cream border border-sand/20 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-henna">{enq.name}</span>
                  {!enq.isRead && (
                    <span className="text-[9px] uppercase font-bold text-moringa bg-moringa/15 px-1.5 py-0.5 rounded">
                      New
                    </span>
                  )}
                </div>
                <p className="text-henna-dark/80 line-clamp-2 leading-relaxed">
                  "{enq.message}"
                </p>
                <span className="text-[10px] text-henna-dark/50 block font-mono">
                  {enq.phone}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
