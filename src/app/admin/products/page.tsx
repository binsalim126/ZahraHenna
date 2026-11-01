"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  CheckCircle,
  Database,
  RefreshCw,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice } from "@/lib/utils";
import { SupabaseHealth } from "@/lib/supabase";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(Store.getAllProductsAdmin());
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [health, setHealth] = useState<SupabaseHealth | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const checkStatus = async () => {
    try {
      const h = await Store.checkHealth();
      setHealth(h);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    // 1. Initial local load
    setProducts(Store.getAllProductsAdmin());

    // 2. Check Supabase connection & schema status
    checkStatus();

    // 3. Listen for store changes (both local edits and cloud updates)
    const handleProductsChange = () => {
      setProducts([...Store.getAllProductsAdmin()]);
    };

    window.addEventListener("zh-products-changed", handleProductsChange);
    return () => window.removeEventListener("zh-products-changed", handleProductsChange);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSyncCloud = async () => {
    setIsSyncing(true);
    try {
      const res = await Store.refreshFromCloud();
      setProducts([...Store.getAllProductsAdmin()]);
      await checkStatus();
      if (res.source === "supabase") {
        showToast("Live products synced from Supabase cloud database");
      } else if (res.error) {
        showToast(`Cloud note: ${res.error.message || "Database table pending"}`);
      } else {
        showToast("Local catalog updated");
      }
    } catch (err: any) {
      showToast(`Sync error: ${err?.message || err}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopySetupInstructions = () => {
    const textToCopy = `-- ZAHRA HENNA SUPABASE SETUP SCRIPT (Run this in Supabase SQL Editor)
-- Direct URL: https://supabase.com/dashboard/project/wqgubwlsmtvwnjeuoqtz/sql/new

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT,
  description TEXT,
  ingredients TEXT,
  benefits TEXT,
  how_to_use TEXT,
  category_id TEXT,
  category_name TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  variants JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  subtotal NUMERIC DEFAULT 0,
  shipping_cost NUMERIC DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'CONFIRMED',
  payment_method TEXT DEFAULT 'CASH_ON_DELIVERY',
  payment_status TEXT DEFAULT 'PENDING',
  address JSONB DEFAULT '{}'::jsonb,
  items JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read and write on products" ON public.products;
CREATE POLICY "Allow public read and write on products" ON public.products FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on categories" ON public.categories;
CREATE POLICY "Allow public read and write on categories" ON public.categories FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on orders" ON public.orders;
CREATE POLICY "Allow public read and write on orders" ON public.orders FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on enquiries" ON public.enquiries;
CREATE POLICY "Allow public read and write on enquiries" ON public.enquiries FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);
`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedSql(true);
      showToast("Setup SQL copied to clipboard! Paste in Supabase SQL editor.");
      setTimeout(() => setCopiedSql(false), 3000);
    }
  };

  const handleToggleVisibility = async (id: string) => {
    const p = Store.getProductById(id);
    if (p) {
      p.isVisible = !p.isVisible;
      await Store.saveProduct({ ...p });
      setProducts([...Store.getAllProductsAdmin()]);
      showToast(p.isVisible ? "Product is now Live" : "Product hidden from store");
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const p = Store.getProductById(id);
    if (p) {
      p.isFeatured = !p.isFeatured;
      await Store.saveProduct({ ...p });
      setProducts([...Store.getAllProductsAdmin()]);
      showToast(p.isFeatured ? "Marked as Featured" : "Removed from Featured");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this product? It will be permanently removed across all devices and Supabase."
      )
    ) {
      const res = await Store.deleteProduct(id);
      setProducts([...Store.getAllProductsAdmin()]);
      if (res.error) {
        showToast("Deleted locally. Note: Supabase database table pending setup.");
      } else {
        showToast("Product permanently deleted across all devices & Supabase");
      }
    }
  };

  const handleResetDefaults = async () => {
    if (
      confirm(
        "Restore original catalog formulations? This will reload the 6 standard products to both devices and Supabase."
      )
    ) {
      const restored = await Store.resetProductsToDefault();
      setProducts([...restored]);
      showToast("Default formulations restored and synced to Supabase");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-henna text-white px-4 py-3 rounded-2xl shadow-luxury flex items-center gap-2 text-xs font-semibold animate-fadeIn border border-sand/30">
          <CheckCircle className="w-4 h-4 text-leaf flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cloud Sync Status Banner (if tables need setup in Supabase) */}
      {health && !health.tableReady && (
        <div className="bg-amber-50/90 border border-amber-300 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-heading font-bold text-sm text-amber-900">
                Action Required: Supabase Cloud Database Tables Need To Be Initialized
              </h3>
              <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                Supabase project <strong>wqgubwlsmtvwnjeuoqtz</strong> is connected, but the{" "}
                <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono text-[11px]">
                  public.products
                </code>{" "}
                table has not been created yet in SQL editor. Edits and deletions on Device A
                cannot sync to Device B until you run the setup script.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:pl-12">
            <button
              onClick={handleCopySetupInstructions}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all active:scale-98"
            >
              {copiedSql ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Setup SQL Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>1-Click Copy Setup SQL</span>
                </>
              )}
            </button>

            <a
              href="https://supabase.com/dashboard/project/wqgubwlsmtvwnjeuoqtz/sql/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/50 text-xs font-bold transition-all shadow-xs"
            >
              <span>Open Supabase SQL Editor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleSyncCloud}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs font-semibold transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Verifying..." : "Verify Connection"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Bar with Cloud Sync status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
              Product Inventory
            </h1>
            {health?.tableReady ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cloud Sync Active</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Cloud Setup Pending</span>
              </span>
            )}
          </div>
          <p className="text-xs text-henna-dark/70 mt-0.5">
            Manage your artisanal henna formulations, weights, and cross-device persistence.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={handleSyncCloud}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl border border-henna-200 bg-white text-henna-700 hover:bg-henna-50 text-xs font-semibold shadow-sm transition-all disabled:opacity-60"
            title="Force refresh live products from Supabase cloud database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Syncing..." : "Sync Cloud"}</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl border border-henna-200 bg-white text-henna-700 hover:bg-henna-50 text-xs font-semibold shadow-sm transition-all"
            title="Reset catalog to standard sample formulations"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <Link
            href="/admin/products/new"
            className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-henna text-white text-xs font-bold uppercase tracking-wider hover:bg-henna-dark shadow-luxury"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-henna-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-henna-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream-soft border border-henna-200 rounded-xl pl-10 pr-4 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
          />
        </div>
        <span className="text-xs font-semibold text-henna-600">
          Showing {filtered.length} products
        </span>
      </div>

      {/* Mobile Products List (Phone size: stacked cards, ZERO horizontal scrolling) */}
      <div className="sm:hidden space-y-3">
        {filtered.map((product) => {
          const primaryImage = product.images[0]?.url || "";
          const startingPrice =
            product.variants[0]?.discountPrice || product.variants[0]?.price || 0;
          const totalStock = product.variants.reduce(
            (acc, v) => acc + v.stockQuantity,
            0
          );

          return (
            <div
              key={product.id}
              className="bg-white p-3.5 rounded-2xl border border-henna-200/80 shadow-sm space-y-3 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-henna-50 flex-shrink-0 border border-henna-200">
                  {primaryImage ? (
                    <Image
                      src={primaryImage}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-henna-100" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-moringa block">
                    {product.categoryName || "Natural Henna"}
                  </span>
                  <h2 className="font-heading font-bold text-xs text-henna-dark truncate">
                    {product.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                    <span className="font-bold text-henna">
                      {formatPrice(startingPrice)}
                    </span>
                    <span className="text-henna-dark/50">•</span>
                    <span className="text-henna-dark/60 font-medium">
                      Stock: {totalStock}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Variants pills */}
              <div className="flex flex-wrap gap-1 pt-1 border-t border-sand/20">
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    className="bg-henna-50 text-henna-800 px-2 py-0.5 rounded text-[10px] font-medium border border-henna-200"
                  >
                    {v.name}: {formatPrice(v.discountPrice || v.price)}
                  </span>
                ))}
              </div>

              {/* Mobile Actions Toolbar */}
              <div className="flex items-center justify-between pt-2 border-t border-sand/20 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleVisibility(product.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.isVisible
                        ? "bg-leaf/10 text-leaf"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.isVisible ? (
                      <>
                        <Eye className="w-3 h-3" /> Live
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" /> Hidden
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleToggleFeatured(product.id)}
                    className={`p-1 rounded-full transition-colors ${
                      product.isFeatured
                        ? "text-gold bg-gold/20"
                        : "text-henna-300"
                    }`}
                    title="Toggle Featured"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="p-1.5 text-henna-600 hover:bg-henna-50 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Products Table */}
      <div className="hidden sm:block bg-white rounded-3xl border border-henna-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-soft text-henna-800 border-b border-henna-200 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Variants / Sizes</th>
                <th className="py-3.5 px-4">Starting Price</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-henna-100">
              {filtered.map((product) => {
                const primaryImage = product.images[0]?.url || "";
                const startingPrice =
                  product.variants[0]?.discountPrice || product.variants[0]?.price || 0;
                const totalStock = product.variants.reduce(
                  (acc, v) => acc + v.stockQuantity,
                  0
                );

                return (
                  <tr key={product.id} className="hover:bg-cream-soft/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-henna-50 flex-shrink-0 border border-henna-200">
                          {primaryImage ? (
                            <Image
                              src={primaryImage}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-henna-100" />
                          )}
                        </div>
                        <div>
                          <h2 className="font-heading font-bold text-sm text-henna-dark line-clamp-1">
                            {product.title}
                          </h2>
                          <span className="text-henna-dark/60 text-[11px] block mt-0.5">
                            Total Stock:{" "}
                            <strong className="font-bold text-henna">
                              {totalStock} units
                            </strong>
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-medium text-henna-700">
                      {product.categoryName || "Natural Henna"}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {product.variants.map((v) => (
                          <span
                            key={v.id}
                            className="bg-henna-100 text-henna-800 px-2 py-0.5 rounded text-[10px] font-semibold"
                          >
                            {v.name} ({v.stockQuantity})
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-heading font-bold text-sm text-henna-900">
                      {formatPrice(startingPrice)}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleVisibility(product.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          product.isVisible
                            ? "bg-leaf/10 text-leaf"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.isVisible ? (
                          <>
                            <Eye className="w-3 h-3" /> Live
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Hidden
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(product.id)}
                        className={`p-1.5 rounded-full transition-colors ${
                          product.isFeatured
                            ? "text-gold bg-gold/20"
                            : "text-henna-300 hover:text-henna-500"
                        }`}
                        title="Toggle Featured"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 text-henna-600 hover:text-terracotta hover:bg-henna-100 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 text-henna-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
