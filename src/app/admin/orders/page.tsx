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
  ExternalLink,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice, formatDate } from "@/lib/utils";
import { OrderStatus } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(Store.getOrders());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
            WhatsApp Orders Log
          </h1>
          <p className="text-xs text-henna-dark/70 mt-1">
            Orders placed via WhatsApp checkout with customer delivery details.
          </p>
        </div>

        <div className="text-xs font-semibold text-henna-dark bg-white border border-sand/20 px-4 py-2 rounded-2xl shadow-sm">
          Total Recorded Orders: <strong>{orders.length}</strong>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-sand/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-henna-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, order ID, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream border border-sand/30 rounded-full pl-10 pr-4 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {["ALL", "PENDING", "CONFIRMED", "DELIVERED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
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

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-sand/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream/70 border-b border-sand/20 text-henna uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 font-semibold">Order Reference</th>
                <th className="py-4 px-4 font-semibold">Customer & Delivery</th>
                <th className="py-4 px-4 font-semibold">Items Ordered</th>
                <th className="py-4 px-4 font-semibold">Order Total</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Customer Chat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/15">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-cream/40 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-henna block">
                      {order.orderNumber}
                    </span>
                    <span className="text-[10px] text-henna-dark/50 block font-normal">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-henna-dark block">
                      {order.customerName}
                    </span>
                    <span className="text-henna-dark/70 text-[11px] block font-mono">
                      {order.customerPhone}
                    </span>
                    <span className="text-henna-dark/50 text-[10px] block line-clamp-1">
                      {order.address.street}, {order.address.city}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="space-y-0.5">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="text-henna-dark/80 text-[11px]">
                          <strong>{it.productTitle}</strong> ({it.variantName}) × {it.quantity}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 font-bold text-sm text-henna">
                    {formatPrice(order.totalAmount)}
                  </td>

                  <td className="py-4 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className="bg-cream border border-sand/30 rounded-xl px-2.5 py-1 text-xs font-bold text-henna focus:outline-none focus:border-henna cursor-pointer"
                    >
                      <option value="PENDING">New (Pending)</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="DELIVERED">Delivered</option>
                    </select>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <a
                      href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hello ${order.customerName}! This is Zahra Henna regarding your order #${order.orderNumber}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-moringa/15 text-moringa hover:bg-moringa/25 text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WA</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
