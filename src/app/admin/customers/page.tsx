"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice } from "@/lib/utils";

export default function AdminCustomersPage() {
  const orders = Store.getOrders();
  const [search, setSearch] = useState("");

  // Aggregate unique customers from orders
  const customerMap = new Map<
    string,
    {
      name: string;
      email: string;
      phone: string;
      city: string;
      ordersCount: number;
      totalSpend: number;
      lastOrder: string;
    }
  >();

  orders.forEach((o) => {
    const key = o.customerEmail.toLowerCase();
    const existing = customerMap.get(key);
    if (existing) {
      existing.ordersCount += 1;
      existing.totalSpend += o.totalAmount;
    } else {
      customerMap.set(key, {
        name: o.customerName,
        email: o.customerEmail,
        phone: o.customerPhone,
        city: `${o.address.city}, ${o.address.state}`,
        ordersCount: 1,
        totalSpend: o.totalAmount,
        lastOrder: o.createdAt,
      });
    }
  });

  const customers = Array.from(customerMap.values()).filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-henna-900">
            Customer Directory
          </h1>
          <p className="text-xs text-henna-600 mt-1">
            Verified buyers, bridal artists, and customer order history.
          </p>
        </div>

        <div className="text-xs text-henna-700 bg-white border border-henna-200 px-4 py-2 rounded-2xl shadow-sm">
          Total Registered Patrons: <strong>{customers.length}</strong>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-henna-200/80 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-henna-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream-soft border border-henna-200 rounded-xl pl-10 pr-4 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-henna-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-henna-50/70 border-b border-henna-200 text-henna-600 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 font-semibold">Customer</th>
                <th className="py-4 px-4 font-semibold">Contact</th>
                <th className="py-4 px-4 font-semibold">Location</th>
                <th className="py-4 px-4 font-semibold text-center">Total Orders</th>
                <th className="py-4 px-6 font-semibold text-right">Lifetime Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-henna-100">
              {customers.map((c, idx) => (
                <tr key={idx} className="hover:bg-cream-soft/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-henna-900 text-gold font-bold flex items-center justify-center text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-heading font-bold text-sm text-henna-900">
                        {c.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="block font-medium text-henna-800">{c.email}</span>
                    <span className="text-[11px] text-henna-500">{c.phone}</span>
                  </td>

                  <td className="py-4 px-4 text-henna-700">{c.city}</td>

                  <td className="py-4 px-4 text-center font-bold text-henna-900">
                    <span className="px-2.5 py-0.5 rounded-full bg-henna-100 text-henna-800">
                      {c.ordersCount} {c.ordersCount === 1 ? "order" : "orders"}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right font-heading font-bold text-sm text-terracotta">
                    {formatPrice(c.totalSpend)}
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
