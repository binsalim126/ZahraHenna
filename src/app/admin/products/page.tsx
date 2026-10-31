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
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(Store.getAllProductsAdmin());
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Hydrate persistent state from localStorage
    setProducts(Store.getAllProductsAdmin());

    const handleProductsChange = () => {
      setProducts([...Store.getAllProductsAdmin()]);
    };

    window.addEventListener("zh-products-changed", handleProductsChange);
    return () => window.removeEventListener("zh-products-changed", handleProductsChange);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleVisibility = (id: string) => {
    const p = Store.getProductById(id);
    if (p) {
      p.isVisible = !p.isVisible;
      Store.saveProduct({ ...p });
      setProducts([...Store.getAllProductsAdmin()]);
      showToast(p.isVisible ? "Product is now Live" : "Product hidden from store");
    }
  };

  const handleToggleFeatured = (id: string) => {
    const p = Store.getProductById(id);
    if (p) {
      p.isFeatured = !p.isFeatured;
      Store.saveProduct({ ...p });
      setProducts([...Store.getAllProductsAdmin()]);
      showToast(p.isFeatured ? "Marked as Featured" : "Removed from Featured");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      Store.deleteProduct(id);
      setProducts([...Store.getAllProductsAdmin()]);
      showToast("Product permanently deleted from store & database");
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Restore original catalog formulations? This will reload the 6 standard products.")) {
      const restored = Store.resetProductsToDefault();
      setProducts([...restored]);
      showToast("Default formulations restored");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-henna text-white px-4 py-3 rounded-2xl shadow-luxury flex items-center gap-2 text-xs font-semibold animate-fadeIn border border-sand/30">
          <CheckCircle className="w-4 h-4 text-leaf" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
            Product Inventory
          </h1>
          <p className="text-xs text-henna-dark/70 mt-0.5">
            Manage your artisanal henna formulations, weights, and pricing.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
              className="bg-white p-3.5 rounded-2xl border border-henna-200/80 shadow-sm space-y-3"
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
                            Total Stock: <strong className="font-bold text-henna">{totalStock} units</strong>
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
