"use client";

import React, { useState } from "react";
import { Tag, Plus, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { Store } from "@/lib/data/store";
import { Coupon, DiscountType } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(Store.getCoupons());
  const [code, setCode] = useState("");
  const [type, setType] = useState<DiscountType>("PERCENTAGE");
  const [value, setValue] = useState(10);
  const [minSpend, setMinSpend] = useState(499);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(200);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: code.toUpperCase().trim(),
      discountType: type,
      discountValue: value,
      minSpend: minSpend || null,
      maxDiscount: maxDiscount || null,
      isActive: true,
    };

    Store.getCoupons().unshift(newCoupon);
    setCoupons([...Store.getCoupons()]);
    setCode("");
  };

  const toggleStatus = (id: string) => {
    const coup = coupons.find((c) => c.id === id);
    if (coup) {
      coup.isActive = !coup.isActive;
      setCoupons([...Store.getCoupons()]);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl font-bold text-henna-900">
          Coupons & Promo Codes
        </h1>
        <p className="text-xs text-henna-600 mt-1">
          Create bridal discounts, festive vouchers, and first-order savings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Create Coupon Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-henna-200/90 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-henna-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-terracotta" />
            <span>Generate New Voucher</span>
          </h2>

          <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-henna-800 block mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. FESTIVE15"
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs uppercase font-mono font-bold text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-henna-800 block mb-1">
                  Discount Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as DiscountType)}
                  className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3 py-2 text-xs font-semibold text-henna-900"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED_AMOUNT">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-henna-800 block mb-1">
                  Value ({type === "PERCENTAGE" ? "%" : "₹"})
                </label>
                <input
                  type="number"
                  required
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3 py-2 text-xs text-henna-900 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-henna-800 block mb-1">
                  Min Cart Spend (₹)
                </label>
                <input
                  type="number"
                  value={minSpend}
                  onChange={(e) => setMinSpend(Number(e.target.value))}
                  className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3 py-2 text-xs text-henna-900"
                />
              </div>

              <div>
                <label className="font-semibold text-henna-800 block mb-1">
                  Max Cap (₹, optional)
                </label>
                <input
                  type="number"
                  value={maxDiscount || ""}
                  onChange={(e) =>
                    setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)
                  }
                  placeholder="No limit"
                  className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3 py-2 text-xs text-henna-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-terracotta text-white font-bold uppercase tracking-wider text-xs hover:bg-terracotta-dark shadow-md flex items-center justify-center gap-2 pt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Activate Coupon Code</span>
            </button>
          </form>
        </div>

        {/* Existing Coupons Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-henna-200/90 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-henna-900">
            Active Promo Codes ({coupons.length})
          </h2>

          <div className="space-y-3">
            {coupons.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-cream-soft border border-henna-100"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-terracotta bg-white px-2 py-0.5 rounded border border-henna-200">
                      {c.code}
                    </span>
                    <span className="font-bold text-xs text-henna-900">
                      {c.discountType === "PERCENTAGE"
                        ? `${c.discountValue}% OFF`
                        : `${formatPrice(c.discountValue)} FLAT OFF`}
                    </span>
                  </div>
                  <p className="text-[11px] text-henna-600 mt-1">
                    {c.minSpend ? `Min order ₹${c.minSpend}` : "No min spend"}
                    {c.maxDiscount ? ` • Max cap ₹${c.maxDiscount}` : ""}
                  </p>
                </div>

                <button
                  onClick={() => toggleStatus(c.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    c.isActive
                      ? "bg-leaf/10 text-leaf hover:bg-leaf/20"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {c.isActive ? "Active" : "Disabled"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
