"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    isDrawerOpen,
    closeDrawer,
    subtotal,
    totalItems,
  } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-henna-dark/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream shadow-2xl flex flex-col border-l border-sand/30">
          {/* Header */}
          <div className="p-5 border-b border-sand/20 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-henna" />
              <h2 className="font-heading font-bold text-lg text-henna-dark">
                Your Henna Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-full text-henna-dark/60 hover:text-henna-dark hover:bg-cream transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-sand/20 flex items-center justify-center mx-auto text-henna mb-2">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-lg font-bold text-henna">
                  Your cart is empty
                </h3>
                <p className="text-xs text-henna-dark/70">
                  Select your natural henna cones or packs from the shop.
                </p>
                <button
                  onClick={closeDrawer}
                  className="mt-4 px-6 py-2.5 rounded-full bg-henna text-white font-medium text-xs uppercase tracking-wider hover:bg-henna-dark transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-white border border-sand/20 shadow-sm"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream flex-shrink-0 border border-sand/20">
                    <Image
                      src={item.image}
                      alt={item.productTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/shop/${item.productSlug}`}
                          onClick={closeDrawer}
                          className="font-heading font-bold text-xs text-henna-dark hover:text-henna line-clamp-1"
                        >
                          {item.productTitle}
                        </Link>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-henna-dark/40 hover:text-red-600 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-moringa font-medium mt-0.5">
                        {item.variantName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-sand/30 rounded-full bg-cream px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 hover:text-henna text-henna-dark"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-henna-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 hover:text-henna text-henna-dark"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-heading font-bold text-xs text-henna tracking-tight">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-sand/20 bg-white space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-henna-dark/70">Subtotal:</span>
                <span className="font-heading font-bold text-lg text-henna tracking-tight">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="btn-shimmer w-full py-3.5 px-4 rounded-2xl bg-moringa hover:bg-[#4E7528] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-luxury"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Order via WhatsApp</span>
                </Link>

                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="w-full py-2.5 px-4 rounded-2xl bg-cream hover:bg-cream-soft text-henna text-center text-xs font-semibold block transition-colors border border-sand/20"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
