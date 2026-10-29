"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles } from "lucide-react";
import { Store } from "@/lib/data/store";
import { ProductCard } from "@/components/storefront/ProductCard";

export default function ShopPage() {
  const products = Store.getProducts();
  const categories = Store.getCategories();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.shortDesc?.toLowerCase().includes(search.toLowerCase());

        const matchesCat =
          selectedCategory === "all" || p.categoryId === selectedCategory;

        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        const priceA = a.variants[0]?.discountPrice || a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.discountPrice || b.variants[0]?.price || 0;

        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
        return 0;
      });
  }, [products, search, selectedCategory, sortBy]);

  return (
    <div className="py-12 bg-luxury-home bg-henna-filigree min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full">
            Ready-to-Use Cones & Powder
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna tracking-tight">
            The Zahra Henna Shop
          </h1>
          <p className="text-xs sm:text-sm text-henna-dark/75">
            Every cone is hand-filled, individually sealed in clear wrap, and shipped fresh.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white/90 backdrop-blur-sm p-5 rounded-3xl border border-sand/30 shadow-luxury space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-henna-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cones, packs, powder..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-cream border border-sand/30 rounded-full pl-10 pr-4 py-2.5 text-xs text-henna-dark placeholder-henna-dark/40 focus:outline-none focus:border-henna"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end text-xs">
              <span className="text-henna-dark/70 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream border border-sand/30 rounded-full px-3 py-2 text-xs font-semibold text-henna-dark focus:outline-none focus:border-henna cursor-pointer"
              >
                <option value="featured">Featured & Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-sand/15">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-henna text-white shadow-sm"
                  : "bg-cream text-henna-dark hover:bg-cream-soft border border-sand/20"
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? "bg-henna text-white shadow-sm"
                    : "bg-cream text-henna-dark hover:bg-cream-soft border border-sand/20"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-sand/30 space-y-3">
            <Sparkles className="w-10 h-10 text-sand mx-auto" />
            <h3 className="font-heading text-xl font-bold text-henna">
              No products found
            </h3>
            <p className="text-xs text-henna-dark/70">
              Try adjusting your search terms or selecting another category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
