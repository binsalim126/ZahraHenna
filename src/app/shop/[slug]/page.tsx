"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  Plus,
  Minus,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { BRAND_CONFIG } from "@/lib/config";
import { ProductCard } from "@/components/storefront/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const product = Store.getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const displayPrice = currentVariant.discountPrice || currentVariant.price;
  const originalPrice = currentVariant.discountPrice ? currentVariant.price : null;
  const currentImage = product.images[selectedImageIdx]?.url || product.images[0]?.url || "/assets/images/henna-cones-in-hand.png";

  const relatedProducts = Store.getProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productTitle: product.title,
      productSlug: product.slug,
      variantId: currentVariant.id,
      variantName: currentVariant.name,
      price: displayPrice,
      image: currentImage,
      quantity,
      maxStock: currentVariant.stockQuantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Zahra Henna 👋 I would like to enquire about: ${product.title} (${currentVariant.name}) priced at ₹${displayPrice}. Quantity: ${quantity}.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="py-12 bg-luxury-home bg-henna-filigree min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-henna-dark/60 flex items-center gap-2">
          <Link href="/" className="hover:text-henna">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-henna">Shop</Link>
          <span>/</span>
          <span className="text-henna font-semibold">{product.title}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Images Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-sand/30 shadow-md">
              <Image
                src={currentImage}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImageIdx === idx
                        ? "border-henna scale-105 shadow-sm"
                        : "border-sand/30 opacity-70"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full">
                {product.categoryName}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna mt-2.5">
                {product.title}
              </h1>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex text-sand">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sand text-sand" />
                  ))}
                </div>
                <span className="text-xs font-bold text-henna-dark">
                  {product.rating || "5.0"}
                </span>
                <span className="text-xs text-henna-dark/60">
                  ({product.reviewCount || 42} verified customer reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-sand/20 flex items-baseline justify-between shadow-sm">
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-3xl font-bold text-henna tracking-tight">
                  {formatPrice(displayPrice)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-henna-dark/40 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-moringa bg-moringa/10 px-2.5 py-1 rounded-full">
                In Stock ({currentVariant.stockQuantity} ready)
              </span>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-henna-dark">
                  Select Pack / Size:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedVariantIdx === idx
                          ? "border-henna bg-henna/5 ring-1 ring-henna"
                          : "border-sand/30 bg-white hover:border-sand"
                      }`}
                    >
                      <div className="font-bold text-xs text-henna-dark">{v.name}</div>
                      <div className="text-xs text-henna font-bold mt-0.5">
                        {formatPrice(v.discountPrice || v.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-sand/30 rounded-2xl bg-white p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-henna-dark hover:text-henna"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm text-henna-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(currentVariant.stockQuantity, q + 1)
                      )
                    }
                    className="p-2 text-henna-dark hover:text-henna"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-shimmer flex-1 py-3.5 px-6 rounded-2xl bg-henna text-white font-bold text-xs uppercase tracking-wider hover:bg-henna-dark shadow-luxury flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? "Added to Cart ✓" : "Add to Cart"}</span>
                </button>
              </div>

              {/* Direct WhatsApp Enquiry Button with Shimmer */}
              <button
                onClick={handleWhatsAppEnquiry}
                className="btn-shimmer w-full py-3.5 px-6 rounded-2xl bg-moringa hover:bg-[#4E7528] text-white font-bold text-xs uppercase tracking-wider shadow-luxury flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>Enquire & Order on WhatsApp</span>
              </button>
            </div>

            {/* Natural Story Bullets */}
            <div className="pt-4 border-t border-sand/20 space-y-2 text-xs text-henna-dark/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-moringa" />
                <span>100% Natural • Zero Chemicals & Zero PPD</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-moringa" />
                <span>Individually sealed in clear wrap with micro 0.38mm tip</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sand" />
                <span>Hand-filled fresh in small batches every week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Ingredients, Usage Tips, Aftercare Tips */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sand/20 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Description & Ingredients */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-henna tracking-tight">
                About this Formulation
              </h3>
              <p className="text-xs sm:text-sm text-henna-dark/80 leading-relaxed font-normal whitespace-pre-line">
                {product.description}
              </p>

              <div className="p-4 rounded-2xl bg-cream border border-sand/20 space-y-1">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-moringa">
                  Pure Ingredients:
                </h4>
                <p className="text-xs text-henna-dark/80 font-mono">
                  {product.ingredients}
                </p>
              </div>
            </div>

            {/* Usage & Aftercare Tips */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-henna tracking-tight">
                Usage & Aftercare Tips
              </h3>

              <div className="p-4 rounded-2xl bg-cream border border-sand/20 space-y-1">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-henna">
                  How to Apply:
                </h4>
                <p className="text-xs text-henna-dark/80 whitespace-pre-line leading-relaxed">
                  {product.howToUse}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-moringa/10 border border-moringa/20 space-y-1">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-moringa">
                  Aftercare for Deepest Dark Stain:
                </h4>
                <p className="text-xs text-henna-dark/80 leading-relaxed">
                  Keep paste on for 6 to 8 hours. Scrape off gently without water. Apply coconut oil or balm to shield skin from water for the first 24 hours. The stain will deepen into rich dark brown!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-henna mb-6">
            You May Also Love
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
