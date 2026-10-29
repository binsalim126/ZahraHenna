"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Plus } from "lucide-react";
import { Store } from "@/lib/data/store";
import { ProductVariant } from "@/types";

export default function AdminEditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const product = Store.getProductById(params.id);
  const categories = Store.getCategories();

  const [title, setTitle] = useState(product?.title || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [shortDesc, setShortDesc] = useState(product?.shortDesc || "");
  const [description, setDescription] = useState(product?.description || "");
  const [ingredients, setIngredients] = useState(product?.ingredients || "");
  const [benefits, setBenefits] = useState(product?.benefits || "");
  const [howToUse, setHowToUse] = useState(product?.howToUse || "");
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);
  const [isVisible, setIsVisible] = useState(product?.isVisible ?? true);
  const [imageUrl, setImageUrl] = useState(product?.images[0]?.url || "");
  const [variants, setVariants] = useState<ProductVariant[]>(
    product?.variants || []
  );

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-henna-900">Product Not Found</h2>
        <Link
          href="/admin/products"
          className="mt-4 inline-block text-xs uppercase font-bold text-terracotta underline"
        >
          Return to Products List
        </Link>
      </div>
    );
  }

  const handleVariantChange = (
    index: number,
    field: keyof ProductVariant,
    value: any
  ) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: `var-${Date.now()}`,
        sku: `ZH-MOD-${Date.now()}`,
        name: "Custom Size",
        price: 399,
        discountPrice: null,
        stockQuantity: 25,
        weightInGrams: 200,
      },
    ]);
  };

  const removeVariant = (idx: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCategory = categories.find((c) => c.id === categoryId);

    Store.saveProduct({
      ...product,
      title,
      slug,
      categoryId,
      categoryName: selectedCategory?.name || product.categoryName,
      shortDesc,
      description,
      ingredients,
      benefits,
      howToUse,
      isFeatured,
      isVisible,
      images: [
        {
          id: product.images[0]?.id || `img-${Date.now()}`,
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
              Edit Formulation: {product.title}
            </h1>
            <p className="text-xs text-henna-600">
              Update pricing, inventory quantities, and descriptions.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-5">
          <h2 className="font-heading font-bold text-xl text-henna-900">
            Product Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                Product Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
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
                Image URL
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-henna-800 block mb-1">
              Short Description
            </label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-henna-800 block mb-1">
              Full Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-henna-900">
              Variants & Stock
            </h2>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-henna-100 hover:bg-henna-200 text-henna-900 text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Size</span>
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
                    value={v.name}
                    onChange={(e) => handleVariantChange(i, "name", e.target.value)}
                    className="w-full bg-white border border-henna-200 rounded-lg p-1.5 text-xs text-henna-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-henna-600 block mb-0.5">SKU</label>
                  <input
                    type="text"
                    value={v.sku}
                    onChange={(e) => handleVariantChange(i, "sku", e.target.value)}
                    className="w-full bg-white border border-henna-200 rounded-lg p-1.5 text-xs text-henna-900 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-henna-600 block mb-0.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
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
                    className="w-full bg-white border border-henna-200 rounded-lg p-1.5 text-xs text-henna-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-henna-600 block mb-0.5">
                    Stock
                  </label>
                  <input
                    type="number"
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

        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 rounded-2xl bg-white border border-henna-300 text-henna-800 text-xs font-bold uppercase tracking-wider"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-dark shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>Save Modifications</span>
          </button>
        </div>
      </form>
    </div>
  );
}
