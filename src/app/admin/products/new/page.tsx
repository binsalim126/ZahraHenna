"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Sparkles } from "lucide-react";
import { Store } from "@/lib/data/store";
import { ProductVariant } from "@/types";

export default function AdminNewProductPage() {
  const router = useRouter();
  const categories = Store.getCategories();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [benefits, setBenefits] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Images state
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
  );

  // Variants state
  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      id: `var-${Date.now()}-1`,
      sku: "ZH-NEW-100G",
      name: "100g Standard",
      price: 299,
      discountPrice: 249,
      stockQuantity: 50,
      weightInGrams: 100,
    },
  ]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: `var-${Date.now()}-${variants.length + 1}`,
        sku: `ZH-NEW-${variants.length + 1}`,
        name: "250g Artisanal Tin",
        price: 499,
        discountPrice: 429,
        stockQuantity: 30,
        weightInGrams: 250,
      },
    ]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const handleVariantChange = (
    index: number,
    field: keyof ProductVariant,
    value: any
  ) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) return;

    const selectedCategory = categories.find((c) => c.id === categoryId);

    Store.saveProduct({
      id: `prod-${Date.now()}`,
      title,
      slug,
      shortDesc,
      description,
      ingredients,
      benefits,
      howToUse,
      isFeatured,
      isVisible,
      categoryId,
      categoryName: selectedCategory?.name || "Natural Henna",
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewCount: 0,
      images: [
        {
          id: `img-${Date.now()}`,
          url: imageUrl,
          altText: title,
          isPrimary: true,
          order: 1,
        },
      ],
      variants,
    });

    router.push("/admin/products");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-16 w-full max-w-full overflow-x-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-henna-200 text-henna-700 hover:text-henna-900 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna-900">
              Create New Formulation
            </h1>
            <p className="text-xs text-henna-600">
              Add a new botanical henna product to the live dispensary.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Core Info Card */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-5">
          <h2 className="font-heading font-bold text-xl text-henna-900">
            Product Identity & Categorization
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Organic Rajasthani Henna Powder"
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="organic-rajasthani-henna-powder"
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 font-mono focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta cursor-pointer font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                Image URL (Photography Placeholder)
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-henna-800 block mb-1">
              Short Summary Description (for Product Cards)
            </label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Triple-sieved pure Rajasthani henna for body art and hair care."
              className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-henna-800 block mb-1">
              Full Botanical Story & Sourcing Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of harvest, stone grinding, and purity..."
              className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        {/* Variants, Pricing & Stock */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-henna-900">
                Packaging Variants & Stock Quantities
              </h2>
              <p className="text-xs text-henna-500">
                Define sizes (e.g. 100g, 250g, 500g or 3 cones), SKUs, prices and inventory.
              </p>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-henna-100 hover:bg-henna-200 text-henna-900 text-xs font-bold transition-colors w-fit"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Size / Variant</span>
            </button>
          </div>

          <div className="space-y-3">
            {variants.map((v, i) => (
              <div
                key={v.id}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 p-3.5 rounded-2xl bg-cream-soft border border-henna-200 items-center text-xs"
              >
                <div>
                  <label className="text-[10px] text-henna-600 block mb-0.5">
                    Variant Name
                  </label>
                  <input
                    type="text"
                    required
                    value={v.name}
                    onChange={(e) => handleVariantChange(i, "name", e.target.value)}
                    placeholder="100g Pouch"
                    className="w-full bg-white border border-henna-200 rounded-lg p-1.5 text-xs text-henna-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-henna-600 block mb-0.5">SKU</label>
                  <input
                    type="text"
                    required
                    value={v.sku}
                    onChange={(e) => handleVariantChange(i, "sku", e.target.value)}
                    placeholder="ZH-POW-100"
                    className="w-full bg-white border border-henna-200 rounded-lg p-1.5 text-xs text-henna-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-henna-600 block mb-0.5">
                    Regular Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={v.price}
                    onChange={(e) =>
                      handleVariantChange(i, "price", Number(e.target.value))
                    }
                    className="w-full bg-white border border-henna-200 rounded-lg p-1.5 text-xs text-henna-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-henna-600 block mb-0.5">
                    Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    value={v.discountPrice || ""}
                    onChange={(e) =>
                      handleVariantChange(
                        i,
                        "discountPrice",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    placeholder="Optional"
                    className="w-full bg-white border border-henna-200 rounded-lg p-1.5 text-xs text-henna-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-henna-600 block mb-0.5">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={v.stockQuantity}
                    onChange={(e) =>
                      handleVariantChange(i, "stockQuantity", Number(e.target.value))
                    }
                    className="w-full bg-white border border-henna-200 rounded-lg p-1.5 text-xs text-henna-900"
                  />
                </div>

                <div className="flex items-center justify-end">
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-3"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients & Application */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-henna-900">
            Ingredients & Application Ritual
          </h2>

          <div>
            <label className="text-xs font-semibold text-henna-800 block mb-1">
              Full Transparent Ingredients
            </label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="100% Lawsonia Inermis (Natural Henna Leaf Powder)..."
              className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-henna-800 block mb-1">
              Benefits List (bullet points)
            </label>
            <textarea
              rows={3}
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              placeholder="• Triple cloth sieved&#10;• Imparts rich mahogany stain&#10;• Zero chemicals"
              className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-henna-800 block mb-1">
              How to Use (Step by step instructions)
            </label>
            <textarea
              rows={3}
              value={howToUse}
              onChange={(e) => setHowToUse(e.target.value)}
              placeholder="Mix with water, rest for 12 hours, apply to skin or hair..."
              className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-henna-900">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-terracotta rounded"
              />
              <span>Feature on Homepage Spotlight</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-henna-900">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                className="w-4 h-4 accent-terracotta rounded"
              />
              <span>Visible in Public Shop</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 rounded-2xl bg-white border border-henna-300 text-henna-800 text-xs font-bold uppercase tracking-wider hover:bg-henna-100"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-dark shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>Publish Formulation</span>
          </button>
        </div>
      </form>
    </div>
  );
}
