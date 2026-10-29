"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Plus, Minus, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const primaryImage = product.images[0]?.url || "/assets/images/henna-cones-in-hand.png";
  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const displayPrice = currentVariant.discountPrice || currentVariant.price;
  const originalPrice = currentVariant.discountPrice ? currentVariant.price : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      productTitle: product.title,
      productSlug: product.slug,
      variantId: currentVariant.id,
      variantName: currentVariant.name,
      price: displayPrice,
      image: primaryImage,
      quantity,
      maxStock: currentVariant.stockQuantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-sand/25 hover:border-sand/60 hover:shadow-luxury-hover transition-all duration-300 flex flex-col h-full shadow-sm">
      {/* Product Image Link */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square sm:aspect-[4/3] overflow-hidden bg-cream"
      >
        <Image
          src={primaryImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.isFeatured && (
            <span className="bg-moringa text-white font-bold text-[8px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
              Popular
            </span>
          )}
          {originalPrice && (
            <span className="bg-sand text-white font-bold text-[8px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
              Save {Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}%
            </span>
          )}
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-henna-dark/70 mb-0.5 sm:mb-1">
            <span className="font-semibold uppercase tracking-wider text-moringa truncate max-w-[90px] sm:max-w-none">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-sand font-bold">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-sand text-sand" />
              <span>{product.rating?.toFixed(1) || "5.0"}</span>
            </div>
          </div>

          <Link href={`/shop/${product.slug}`} className="block group-hover:text-henna transition-colors">
            <h3 className="font-heading font-bold text-henna-dark text-xs sm:text-base leading-tight sm:leading-snug line-clamp-2 tracking-tight">
              {product.title}
            </h3>
          </Link>

          <p className="hidden sm:block text-xs text-henna-dark/70 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-sand/15">
          {/* Variant Selector Pills if multiple */}
          {product.variants.length > 1 && (
            <div className="flex flex-wrap gap-1">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full border transition-all ${
                    selectedVariantIdx === idx
                      ? "border-henna bg-henna text-white font-semibold"
                      : "border-sand/30 text-henna-dark hover:border-henna"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}

          {/* Price & Quantity Stepper */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="font-heading text-sm sm:text-xl font-bold text-henna tracking-tight">
                {formatPrice(displayPrice)}
              </span>
              {originalPrice && (
                <span className="text-[10px] sm:text-xs text-henna-dark/40 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* Stepper */}
            <div className="flex items-center border border-sand/30 rounded-full bg-cream-soft px-1 sm:px-1.5 py-0.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                className="p-0.5 sm:p-1 text-henna-dark hover:text-henna"
                aria-label="Decrease"
              >
                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
              <span className="text-[10px] sm:text-xs font-semibold px-1 sm:px-2 text-henna-dark">
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity((q) => Math.min(currentVariant.stockQuantity, q + 1));
                }}
                className="p-0.5 sm:p-1 text-henna-dark hover:text-henna"
                aria-label="Increase"
              >
                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          </div>

          {/* Action Button: Add to Cart (NO WHATSAPP ON PRODUCT CARDS) */}
          <div className="pt-1">
            <button
              onClick={handleAddToCart}
              className={`btn-shimmer w-full py-2 sm:py-2.5 px-3 rounded-xl font-bold text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-luxury transition-all ${
                isAdded
                  ? "bg-moringa text-white"
                  : "bg-henna text-white hover:bg-henna-dark active:scale-[0.98]"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
