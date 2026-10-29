"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Truck,
  CheckCircle,
  Package,
  Calendar,
  CreditCard,
  User,
  MapPin,
  Save,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice, formatDate } from "@/lib/utils";
import { OrderStatus } from "@/types";

export default function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = Store.getOrderById(params.id);
  const [status, setStatus] = useState<OrderStatus>(order?.status || "CONFIRMED");
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || "");
  const [carrier, setCarrier] = useState(order?.shippingCarrier || "DTDC Air Express");
  const [savedMessage, setSavedMessage] = useState(false);

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-henna-900">Order Record Not Found</h2>
        <Link
          href="/admin/orders"
          className="mt-4 inline-block text-xs uppercase font-bold text-terracotta underline"
        >
          Return to Orders
        </Link>
      </div>
    );
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    Store.updateOrderStatus(order.id, status, trackingNumber, carrier);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top action bar */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 rounded-xl bg-white border border-henna-200 text-henna-700 hover:text-henna-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-henna-900">
              Order {order.orderNumber}
            </h1>
            <span className="text-xs text-henna-500">
              Placed {formatDate(order.createdAt)}
            </span>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-henna-900 text-cream-soft text-xs font-bold uppercase tracking-wider hover:bg-terracotta shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>Print Tax Invoice (A4)</span>
        </button>
      </div>

      {/* Admin Quick Status Update Form (Hidden in Print) */}
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-3xl border border-henna-200/90 shadow-sm print:hidden space-y-4"
      >
        <h2 className="font-heading font-bold text-lg text-henna-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-terracotta" />
          <span>Fulfillment & Dispatch Controls</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-semibold text-henna-800 block mb-1">
              Order Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3 py-2 text-xs font-bold text-henna-900 focus:outline-none focus:border-terracotta"
            >
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="PACKED">PACKED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-henna-800 block mb-1">
              Courier Carrier Name
            </label>
            <input
              type="text"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              placeholder="e.g. DTDC Air Express"
              className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="font-semibold text-henna-800 block mb-1">
              AWB / Tracking Number
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g. DTDC-88392019"
              className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedMessage && (
            <span className="text-xs font-bold text-leaf flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Status & AWB Updated!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2 rounded-xl bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-dark shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update Fulfillment</span>
          </button>
        </div>
      </form>

      {/* OFFICIAL BRANDED TAX INVOICE & PACKING SLIP (Printable) */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-henna-200/90 shadow-lg space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Invoice Header */}
        <div className="flex justify-between items-start border-b border-henna-200 pb-6">
          <div>
            <span className="font-heading font-bold text-2xl text-henna-900 tracking-wider">
              ZAHRA <span className="text-terracotta font-normal">HENNA</span>
            </span>
            <p className="text-[11px] text-henna-600 mt-1">
              Artisan Studios, Sojat Henna Hub, Rajasthan 306104, India <br />
              Email: care@zahrahenna.com • GSTIN: 08AAACZ1234A1Z5
            </p>
          </div>

          <div className="text-right">
            <h2 className="font-heading font-bold text-xl text-henna-900">TAX INVOICE</h2>
            <p className="text-xs font-mono font-bold text-terracotta mt-0.5">
              Invoice #{order.orderNumber}
            </p>
            <p className="text-[11px] text-henna-500 mt-0.5">
              Date: {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Customer & Shipping Details Grid */}
        <div className="grid grid-cols-2 gap-8 text-xs text-henna-800">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-henna-500 mb-1">
              Billed & Shipped To:
            </h3>
            <p className="font-bold text-sm text-henna-900">{order.address.name}</p>
            <p>{order.address.street}</p>
            <p>
              {order.address.city}, {order.address.state} - {order.address.postalCode}
            </p>
            <p>Phone: {order.address.phone}</p>
            <p>Email: {order.customerEmail}</p>
          </div>

          <div className="text-right">
            <h3 className="font-bold uppercase tracking-wider text-henna-500 mb-1">
              Payment & Logistics:
            </h3>
            <p>
              Payment Method: <strong>{order.paymentMethod.replace("_", " ")}</strong>
            </p>
            <p>
              Payment Status: <strong>{order.paymentStatus}</strong>
            </p>
            <p>
              Courier Partner: <strong>{order.shippingCarrier || "Air Express"}</strong>
            </p>
            {order.trackingNumber && (
              <p>
                AWB Tracking: <strong>{order.trackingNumber}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <table className="w-full text-left text-xs border-y border-henna-200">
          <thead>
            <tr className="bg-henna-50/60 uppercase tracking-wider text-henna-600">
              <th className="py-2.5 px-3">Item Description</th>
              <th className="py-2.5 px-3">Packaging / Size</th>
              <th className="py-2.5 px-3 text-center">Qty</th>
              <th className="py-2.5 px-3 text-right">Unit Price</th>
              <th className="py-2.5 px-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-henna-100">
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-3 px-3 font-bold text-henna-900">
                  {item.productTitle}
                </td>
                <td className="py-3 px-3 text-henna-600">{item.variantName}</td>
                <td className="py-3 px-3 text-center font-bold text-henna-900">
                  {item.quantity}
                </td>
                <td className="py-3 px-3 text-right">{formatPrice(item.price)}</td>
                <td className="py-3 px-3 text-right font-bold text-henna-900">
                  {formatPrice(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Summary */}
        <div className="flex justify-end text-xs text-henna-800">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-leaf">
                <span>Voucher Discount:</span>
                <span className="font-bold">-{formatPrice(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery:</span>
              <span className="font-bold">
                {order.shippingCost === 0 ? "FREE" : formatPrice(order.shippingCost)}
              </span>
            </div>
            <div className="border-t border-henna-200 pt-2 flex justify-between font-heading font-bold text-base text-henna-900">
              <span>Total Paid:</span>
              <span className="text-terracotta">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-henna-200 pt-6 text-center text-[10px] text-henna-500 space-y-1">
          <p className="font-bold">100% Pure Sojat Henna • Zero Chemicals • Handmade in Small Batches</p>
          <p>
            Store cones immediately in freezer upon arrival. For assistance: care@zahrahenna.com | +91 7907118180
          </p>
        </div>
      </div>
    </div>
  );
}
