"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Trash2, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { Store } from "@/lib/data/store";
import { Product, ProductVariant } from "@/types";

export default function AdminEditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState(Store.getCategories());

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [benefits, setBenefits] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    const cats = Store.getCategories();
    setCategories(cats);
    const p = Store.getProductById(params.id);
    if (p) {
      setProduct(p);
      setTitle(p.title);
      setSlug(p.slug);
      setCategoryId(p.categoryId || cats[0]?.id || "");
      setShortDesc(p.shortDesc || "");
      setDescription(p.description || "");
      setIngredients(p.ingredients || "");
      setBenefits(p.benefits || "");
      setHowToUse(p.howToUse || "");
      setIsFeatured(p.isFeatured || false);
      setIsVisible(p.isVisible ?? true);
      setImageUrl(p.images[0]?.url || "");
      setVariants(p.variants || []);
    }
    setLoaded(true);
  }, [params.id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!loaded) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-henna border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-henna-600">Loading product formulation...</p>
      </div>
    );
  }

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
        {/* Core Info */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-5">
          <h2 className="font-heading font-bold text-xl text-henna-900">
            Product Identity
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
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-henna-800 block mb-1">
              Short Teaser
            </label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
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
              className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        {/* Media Upload */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-5">
          <h2 className="font-heading font-bold text-xl text-henna-900">
            Formulation Photography
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-dashed border-henna-300 bg-cream flex items-center justify-center flex-shrink-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Product preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-henna-400" />
              )}
            </div>

            <div className="space-y-3 flex-1 w-full">
              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-henna text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-henna-dark shadow-sm">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-henna-dark/60 mt-1">
                  Upload directly from your phone gallery or desktop.
                </p>
              </div>

              <div>
                <span className="text-[10px] text-henna-dark/50 block mb-1">
                  Or enter image URL:
                </span>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or /assets/images/..."
                  className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Variants & Pricing */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-henna-900">
              Weights, Sizes & Stock
            </h2>
            <button
              type="button"
              onClick={addVariant}
              className="text-xs font-bold text-henna hover:text-henna-dark inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Size
            </button>
          </div>

          <div className="space-y-3">
            {variants.map((v, idx) => (
              <div
                key={v.id}
                className="p-3 sm:p-4 rounded-2xl bg-cream-soft border border-henna-200 grid grid-cols-2 sm:grid-cols-5 gap-3 items-end"
              >
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-bold text-henna-700 block mb-1 uppercase">
                    Variant Name
                  </label>
                  <input
                    type="text"
                    value={v.name}
                    onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
                    className="w-full bg-white border border-henna-200 rounded-lg px-2.5 py-1.5 text-xs text-henna-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-henna-700 block mb-1 uppercase">
                    MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) =>
                      handleVariantChange(idx, "price", Number(e.target.value))
                    }
                    className="w-full bg-white border border-henna-200 rounded-lg px-2.5 py-1.5 text-xs text-henna-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-henna-700 block mb-1 uppercase">
                    Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    value={v.discountPrice || ""}
                    onChange={(e) =>
                      handleVariantChange(
                        idx,
                        "discountPrice",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="w-full bg-white border border-henna-200 rounded-lg px-2.5 py-1.5 text-xs text-henna-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-henna-700 block mb-1 uppercase">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={v.stockQuantity}
                    onChange={(e) =>
                      handleVariantChange(idx, "stockQuantity", Number(e.target.value))
                    }
                    className="w-full bg-white border border-henna-200 rounded-lg px-2.5 py-1.5 text-xs text-henna-900"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botanical Specifications */}
        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-henna-200/90 shadow-sm space-y-5">
          <h2 className="font-heading font-bold text-xl text-henna-900">
            Botanical Specifications
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                Ingredients
              </label>
              <textarea
                rows={2}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                Key Benefits (bullet lines)
              </label>
              <textarea
                rows={3}
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-henna-800 block mb-1">
                How to Apply & Stain Care
              </label>
              <textarea
                rows={3}
                value={howToUse}
                onChange={(e) => setHowToUse(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Toggles & Submit */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-henna-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                className="w-4 h-4 text-henna rounded border-henna-300"
              />
              <span className="text-xs font-semibold text-henna-800">
                Visible on Storefront (Live)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-henna rounded border-henna-300"
              />
              <span className="text-xs font-semibold text-henna-800">
                Featured on Homepage
              </span>
            </label>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/admin/products"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-henna-200 bg-white text-henna-700 hover:bg-henna-50 text-xs font-bold uppercase tracking-wider text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-shimmer w-full sm:w-auto px-7 py-3 rounded-2xl bg-henna text-white text-xs font-bold uppercase tracking-wider hover:bg-henna-dark shadow-luxury flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Formulation</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
