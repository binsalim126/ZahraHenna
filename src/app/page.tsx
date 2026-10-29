"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Leaf,
  CheckCircle2,
  Heart,
  Star,
  X,
  Maximize2,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { BRAND_CONFIG } from "@/lib/config";
import { QuoteMarquee } from "@/components/storefront/QuoteMarquee";
import { ProductCard } from "@/components/storefront/ProductCard";

export default function HomePage() {
  const products = Store.getProducts();
  const featuredProducts = products.slice(0, 3);
  const testimonials = Store.getTestimonials();

  // Lightbox state for design gallery
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: "/assets/images/bridal-henna-hands.jpg",
      title: "Intricate Bridal Mandala & Lace",
      caption: "Rich dark-brown oxidation 48 hours post-application",
    },
    {
      src: "/assets/images/henna-cones-in-hand.png",
      title: "Fresh Hand-Filled Cones",
      caption: "Individually wrapped with precision 0.38mm tip",
    },
    {
      src: "/assets/images/moringa-leaf-powder-swirl.png",
      title: "Botanical Moringa Leaf & Powder Swirl",
      caption: "Pure leaves shade-dried and micro-sieved",
    },
  ];

  return (
    <div className="space-y-0 bg-luxury-home bg-henna-filigree min-h-screen relative">
      {/* 1. HERO SECTION WITH LEAF MANIPULATION BACKGROUND */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden py-14 lg:py-0 border-b border-sand/20">
        {/* Leaf Type Manipulation Background Art */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/assets/images/moringa-leaf-powder-swirl.png"
              alt="Botanical Moringa Leaf and Swirling Powder Manipulation"
              fill
              priority
              className="object-cover object-right lg:object-center opacity-40 lg:opacity-55 mix-blend-multiply filter contrast-110 saturate-110 transform scale-105"
            />
            {/* Ambient Gradient Overlays for optimal readability & luxury depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-transparent lg:via-cream/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/50" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-cream/60" />
          </div>
        </div>

        {/* Drifting Floating Leaf Particles */}
        <div className="absolute top-10 left-1/4 animate-drift pointer-events-none z-10">
          <span className="text-soft text-2xl">🍃</span>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-drift pointer-events-none [animation-delay:3s] z-10">
          <span className="text-moringa text-xl">🌿</span>
        </div>
        <div className="absolute bottom-20 left-10 animate-drift pointer-events-none [animation-delay:5s] z-10">
          <span className="text-sand text-lg">🍂</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Copy - Clean Left Alignment on Phone, Tablet & Desktop */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              {/* Eyebrow with horizontal dash line - Left Aligned */}
              <div className="inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-moringa">
                <span className="w-8 sm:w-12 h-[2px] bg-moringa inline-block rounded-full" />
                <span>100% NATURAL • HARVEST 2026</span>
              </div>

              {/* Bold 3-Tier Headline - Left Aligned */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-henna-dark leading-[1.15] tracking-tight text-left">
                Pure Natural Henna, <br />
                <span className="text-moringa">crafted by nature,</span> <br />
                zero chemicals.
              </h1>

              {/* Subtitle - Left Aligned */}
              <p className="text-sm sm:text-base lg:text-lg text-henna-dark/85 max-w-xl text-left leading-relaxed font-normal">
                We are <strong className="font-bold text-henna-dark">Zahra Henna</strong> — crafting fresh ready cones blended with single-origin Rajasthani henna leaves, organic moringa, and therapeutic oils for rich, dark-brown bridal stains.
              </p>

              {/* Action Buttons - Left Aligned & Mobile Optimized */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4">
                <Link
                  href="/shop"
                  className="btn-shimmer w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-henna text-white font-bold text-xs tracking-wider uppercase shadow-luxury hover:bg-henna-dark flex items-center justify-center gap-2.5 text-center"
                >
                  <span>Shop Cones Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="btn-outline-animated w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/80 backdrop-blur-sm border border-sand/50 text-henna font-bold text-xs tracking-wider uppercase hover:bg-white flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  Our Story
                </Link>
              </div>

              {/* Trust Badges - Left Aligned */}
              <div className="pt-5 sm:pt-6 border-t border-sand/20 flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-xs text-henna-dark/80 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-moringa flex-shrink-0" />
                  <span>No PPD or Ammonia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0" />
                  <span>Individually Sealed Cones</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-moringa flex-shrink-0" />
                  <span>WhatsApp Direct Checkout</span>
                </div>
              </div>
            </div>

            {/* Hero Visual: Cones in Hand Floating Over Leaf Swirl Backdrop */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-64 sm:w-80 lg:w-96 aspect-[3/4] animate-float max-w-full">
                {/* Decorative glow backing */}
                <div className="absolute inset-0 bg-moringa/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />

                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-luxury border-4 border-white bg-cream">
                  <Image
                    src="/assets/images/henna-cones-in-hand.png"
                    alt="Natural Henna Cones individually sealed held in hand"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-henna-dark/80 via-transparent to-transparent flex items-end p-5 sm:p-6">
                    <div className="text-white text-left">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-soft block">
                        Fresh Weekly Batches
                      </span>
                      <p className="font-heading text-base sm:text-lg font-bold">
                        Individually Wrapped Caramel Paste Cones
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "100% NATURAL" QUOTE STRIP (MARQUEE) */}
      <QuoteMarquee />

      {/* 3. FEATURED PRODUCTS */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3.5 py-1 rounded-full border border-moringa/25 inline-block">
                Pure Natural Selection
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna mt-2.5 tracking-tight text-left">
                Featured Henna Cones & Powder
              </h2>
            </div>

            <Link
              href="/shop"
              className="btn-outline-animated px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-sand/40 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-henna hover:text-henna-dark shadow-sm w-fit"
            >
              <span>View Full Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE ZAHRA HENNA (4 ICON CARDS - LEFT ALIGNED) */}
      <section className="py-14 sm:py-20 border-y border-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-2xl mb-8 sm:mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3.5 py-1 rounded-full border border-moringa/25 inline-block">
              Botanical Standard
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna mt-2.5 tracking-tight text-left">
              Why Choose Zahra Henna?
            </h2>
            <p className="text-xs sm:text-sm text-henna-dark/75 font-normal text-left">
              Pure botanical integrity for rich stains, handcrafted without shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1 */}
            <div className="bg-white/85 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-sand/25 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-300 text-left space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-moringa/15 text-moringa flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="font-heading text-lg sm:text-xl font-bold text-henna tracking-tight">100% Natural</div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-henna-dark">
                Pure Sojat Henna
              </h3>
              <p className="text-xs text-henna-dark/70 leading-relaxed font-normal">
                Shade-dried Rajasthan henna leaves and moringa powder. Zero synthetic dyes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/85 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-sand/25 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-300 text-left space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-sand/20 text-sand flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="font-heading text-lg sm:text-xl font-bold text-henna tracking-tight">Zero Chemicals</div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-henna-dark">
                0% PPD & Ammonia
              </h3>
              <p className="text-xs text-henna-dark/70 leading-relaxed font-normal">
                Never contains kerosene, toxic black dyes, or preservatives. Completely skin-safe.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/85 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-sand/25 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-300 text-left space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-henna/15 text-henna flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="font-heading text-lg sm:text-xl font-bold text-henna tracking-tight">Rich Dark Stain</div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-henna-dark">
                Deep Mahogany Tone
              </h3>
              <p className="text-xs text-henna-dark/70 leading-relaxed font-normal">
                Develops into deep chocolate brown within 48 hours and lasts 10 to 14 days.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/85 backdrop-blur-sm p-5 sm:p-7 rounded-3xl border border-sand/25 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-300 text-left space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-moringa/15 text-moringa flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div className="font-heading text-lg sm:text-xl font-bold text-henna tracking-tight">Skin Safe</div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-henna-dark">
                Gentle on Sensitive Skin
              </h3>
              <p className="text-xs text-henna-dark/70 leading-relaxed font-normal">
                Enriched with soothing moringa vitamins and cold-pressed pure therapeutic oils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INGREDIENTS SHOWCASE (MORINGA & HENNA SWIRL) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-14 border border-sand/30 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image on Left */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury border-2 border-sand/20">
                <Image
                  src="/assets/images/moringa-leaf-powder-swirl.png"
                  alt="Moringa leaf branch with swirling fresh green botanical powder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Narrative on Right */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3.5 py-1 rounded-full border border-moringa/25">
                The Sacred Recipe
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna leading-tight tracking-tight">
                Pure Sojat Henna & Nutrient-Rich Moringa
              </h2>

              <p className="text-xs sm:text-sm text-henna-dark/80 leading-relaxed font-normal">
                Our formula pairs single-origin <strong>Rajasthani henna leaves</strong> with organic <strong>Moringa leaf powder</strong>. Moringa naturally conditions and nourishes the skin, creating an ultra-smooth paste that drapes like melted caramel through a 0.38mm fine tip without clogging.
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-henna-dark">
                    <strong>Triple-Sieved Leaf Powder:</strong> Micro-filtered for butter-like paste and ultra-fine line precision.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-henna-dark">
                    <strong>Therapeutic Essential Oils:</strong> Eucalyptus and cajeput naturally activate deep dark staining.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-henna-dark">
                    <strong>Individually Sealed Cones:</strong> Sealed in clear wrap to lock in freshness, moisture, and aroma.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="btn-outline-animated inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-sand/50 text-xs font-bold uppercase tracking-wider text-henna hover:text-henna-dark shadow-sm"
                >
                  <span>Our Crafting Process</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DESIGN GALLERY (MASONRY WITH LIGHTBOX) */}
      <section className="py-14 sm:py-20 border-t border-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="text-left max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3.5 py-1 rounded-full border border-moringa/25 inline-block">
              Real Stain Results
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna tracking-tight text-left">
              Intricate Bridal Henna Gallery
            </h2>
            <p className="text-xs sm:text-sm text-henna-dark/70 font-normal text-left">
              Click any image to inspect the razor-sharp lines and rich mahogany stain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage(img.src)}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover cursor-pointer border-2 border-sand/25 bg-cream transition-all duration-300"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-henna-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/95 text-henna flex items-center justify-center shadow-luxury">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-henna-dark/85 via-henna-dark/40 to-transparent text-white text-left">
                  <h4 className="font-heading font-bold text-sm tracking-tight">{img.title}</h4>
                  <p className="text-[11px] text-cream/80 mt-0.5">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-henna-dark/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white hover:text-sand p-2 z-50"
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7 sm:w-8 h-8" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[85vh] w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black"
          >
            <Image
              src={lightboxImage}
              alt="Enlarged view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="text-left space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3.5 py-1 rounded-full border border-moringa/25 inline-block">
              Customer Love
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna tracking-tight text-left">
              Trusted by Bridal Artists & Brides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white/85 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border border-sand/25 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between space-y-4 text-left"
              >
                <div className="space-y-3">
                  <div className="flex text-sand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sand text-sand" />
                    ))}
                  </div>
                  <p className="text-xs text-henna-dark/80 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="border-t border-sand/15 pt-3">
                  <h4 className="font-heading font-bold text-sm text-henna tracking-tight">{t.name}</h4>
                  <p className="text-[10px] text-henna-dark/60">{t.role} • {t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL-TO-ACTION BANNER - LEFT ALIGNED ON PHONE */}
      <section className="py-14 sm:py-20 bg-henna text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-henna-filigree opacity-10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left sm:text-center space-y-5 sm:space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sand bg-sand/20 px-3.5 py-1 rounded-full border border-sand/30 inline-block">
            Start Your Pure Henna Experience
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Ready for your perfect henna color?
          </h2>

          <p className="text-xs sm:text-sm text-cream/80 max-w-xl mx-0 sm:mx-auto leading-relaxed font-normal">
            Order individually wrapped ready cones or discuss custom bulk quantities directly with us on WhatsApp.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start sm:justify-center gap-3 sm:gap-4">
            <Link
              href="/shop"
              className="btn-shimmer w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-henna font-bold text-xs uppercase tracking-wider shadow-luxury hover:bg-cream text-center"
            >
              Shop Cones Now
            </Link>

            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "Hello Zahra Henna 👋 I would like to enquire about ordering natural henna cones."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-moringa hover:bg-[#4E7528] text-white font-bold text-xs uppercase tracking-wider shadow-luxury flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
