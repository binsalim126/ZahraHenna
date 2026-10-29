"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Clock,
  ArrowRight,
  LogOut,
  Shield,
  Trash2,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Store } from "@/lib/data/store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses">("orders");
  const orders = Store.getOrders();
  const { wishlist, toggleWishlist, addItem } = useCart();
  const products = Store.getProducts();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-cream-soft rounded-3xl p-6 sm:p-10 border border-henna-200/90 shadow-md mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-henna-900 text-gold flex items-center justify-center font-heading text-2xl font-bold shadow-md">
              Z
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna-900">
                  Welcome to Your Sanctuary
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gold/20 text-henna-900 border border-gold/40 px-2 py-0.5 rounded-full">
                  Artisan Circle Member
                </span>
              </div>
              <p className="text-xs text-henna-600 mt-1">
                Manage your orders, saved addresses, and bridal wishlist.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-full bg-gold/20 border border-gold/40 text-henna-900 text-xs font-semibold hover:bg-gold/30 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-terracotta" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-henna-200 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-henna-900 text-cream-soft shadow-md"
                : "bg-white text-henna-700 hover:bg-henna-100"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "wishlist"
                ? "bg-henna-900 text-cream-soft shadow-md"
                : "bg-white text-henna-700 hover:bg-henna-100"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "addresses"
                ? "bg-henna-900 text-cream-soft shadow-md"
                : "bg-white text-henna-700 hover:bg-henna-100"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-cream-soft rounded-3xl border border-dashed border-henna-200">
                <ShoppingBag className="w-10 h-10 text-henna-400 mx-auto mb-2" />
                <h3 className="font-heading text-lg font-bold text-henna-900">
                  No orders placed yet
                </h3>
                <Link
                  href="/shop"
                  className="mt-4 inline-block px-6 py-2 rounded-full bg-henna-900 text-cream-soft text-xs uppercase font-bold tracking-wider"
                >
                  Browse Shop
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 border border-henna-200/90 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-henna-100 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-terracotta">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-henna-500 block">
                        Placed on {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-terracotta/10 text-terracotta">
                        {order.status}
                      </span>
                      <Link
                        href={`/track-order?orderId=${order.orderNumber}`}
                        className="px-4 py-1.5 rounded-full bg-henna-100 text-henna-900 text-xs font-semibold hover:bg-henna-200 transition-colors"
                      >
                        Track Package
                      </Link>
                    </div>
                  </div>

                  {/* Items row */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-xs text-henna-800"
                      >
                        <span>
                          <strong>{item.productTitle}</strong> ({item.variantName}) × {item.quantity}
                        </span>
                        <span className="font-semibold text-henna-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-henna-100 flex justify-between items-center">
                    <span className="text-xs text-henna-600">
                      Payment via {order.paymentMethod.replace("_", " ")}
                    </span>
                    <span className="font-heading font-bold text-lg text-henna-900">
                      Total: {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 bg-cream-soft rounded-3xl border border-dashed border-henna-200">
                <Heart className="w-10 h-10 text-henna-400 mx-auto mb-2" />
                <h3 className="font-heading text-lg font-bold text-henna-900">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-henna-600 mt-1">
                  Click the heart icon on any product to save it for upcoming events.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-block px-6 py-2 rounded-full bg-henna-900 text-cream-soft text-xs uppercase font-bold tracking-wider"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-white border border-henna-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-heading font-bold text-base text-henna-900">
                        {p.title}
                      </h4>
                      <p className="text-xs text-henna-600 mt-1 line-clamp-2">
                        {p.shortDesc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-henna-100 flex items-center justify-between">
                      <span className="font-heading font-bold text-lg text-henna-900">
                        {formatPrice(p.variants[0]?.discountPrice || p.variants[0]?.price || 199)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-2 text-henna-400 hover:text-red-500 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/shop/${p.slug}`}
                          className="px-4 py-1.5 rounded-full bg-henna-900 text-cream-soft text-xs font-semibold hover:bg-terracotta transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-henna-200/90 shadow-sm space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full inline-block">
                Default Primary Address
              </span>
              <h4 className="font-bold text-sm text-henna-900">Ayesha Siddiqui</h4>
              <p className="text-xs text-henna-700 leading-relaxed">
                Flat 402, Green Meadows Apt, Bandra West <br />
                Mumbai, Maharashtra - 400050, India <br />
                Contact: +91 98200 12345
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
