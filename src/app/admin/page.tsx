"use client";

import React, { useState, useEffect } from "react";
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
  Database,
  AlertTriangle,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice, formatDate } from "@/lib/utils";
import { SupabaseHealth } from "@/lib/supabase";

export default function AdminOverviewPage() {
  const [products, setProducts] = useState(Store.getAllProductsAdmin());
  const [orders, setOrders] = useState(Store.getOrders());
  const [enquiries, setEnquiries] = useState(Store.getEnquiries());
  const [health, setHealth] = useState<SupabaseHealth | null>(null);

  useEffect(() => {
    setProducts(Store.getAllProductsAdmin());
    setOrders(Store.getOrders());
    setEnquiries(Store.getEnquiries());

    Store.checkHealth().then((h) => setHealth(h)).catch(() => {});

    const handleChange = () => {
      setProducts([...Store.getAllProductsAdmin()]);
      setOrders([...Store.getOrders()]);
      setEnquiries([...Store.getEnquiries()]);
    };

    window.addEventListener("zh-products-changed", handleChange);
    return () => window.removeEventListener("zh-products-changed", handleChange);
  }, []);

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const unreadEnquiries = enquiries.filter((e) => !e.isRead);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
              Zahra Henna Overview
            </h1>
            {health?.tableReady ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supabase Live</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Supabase Setup Needed</span>
              </span>
            )}
          </div>
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

      {/* Database Warning if tables are missing */}
      {health && !health.tableReady && (
        <div className="bg-amber-50 border border-amber-300 rounded-3xl p-4 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-amber-900 font-medium">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>
              Cloud database tables need initialization for changes on Device A to appear on Device B.
            </span>
          </div>
          <Link
            href="/admin/products"
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-bold whitespace-nowrap hover:bg-amber-700 transition-colors shadow-xs"
          >
            Run Setup Script →
          </Link>
        </div>
      )}

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
          <div className="text-xs text-henna-dark/60 font-medium">
            {unreadEnquiries.length} unread messages awaiting reply
          </div>
        </div>
      </div>

      {/* Recent WhatsApp Orders Section */}
      <div className="bg-white rounded-3xl border border-sand/20 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-henna">
              Recent WhatsApp Orders
            </h2>
            <p className="text-xs text-henna-dark/60">
              Live orders received from customers
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-henna hover:text-henna-dark flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-sand/15">
          {orders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-henna">
                    {order.orderNumber}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-moringa/15 text-moringa">
                    {order.status}
                  </span>
                </div>
                <div className="text-xs text-henna-dark font-medium">
                  {order.customerName} ({order.customerPhone})
                </div>
                <div className="text-[11px] text-henna-dark/60 flex items-center gap-2">
                  <span>{order.items.length} items</span>
                  <span>•</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className="font-heading font-bold text-sm text-henna">
                  {formatPrice(order.totalAmount)}
                </span>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="px-3 py-1.5 rounded-xl border border-sand/30 hover:bg-cream text-xs font-semibold text-henna-dark flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Inspect</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
