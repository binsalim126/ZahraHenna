"use client";

import React, { useState, useMemo } from "react";
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
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import { Store } from "@/lib/data/store";
import { BRAND_CONFIG } from "@/lib/config";
import { QuoteMarquee } from "@/components/storefront/QuoteMarquee";
import { ProductCard } from "@/components/storefront/ProductCard";

export default function HomePage() {
  const allProducts = Store.getProducts();
  const categories = Store.getCategories();
  const testimonials = Store.getTestimonials();

  // Popular Cones for Home Page (Phone side-scroller & desktop grid)
  const popularProducts = useMemo(() => {
    const cones = allProducts.filter(
      (p) =>
        p.isFeatured ||
        p.categoryId?.includes("cone") ||
        p.title.toLowerCase().includes("cone")
    );
    return (cones.length >= 2 ? cones : allProducts).slice(0, 4);
  }, [allProducts]);

  // Lightbox state for Real Stain Results
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    caption: string;
  } | null>(null);

  const realStainGallery = [
    {
      src: "/assets/images/bridal-henna-hands.jpg",
      title: "Intricate Bridal Mandala & Lace",
      caption: "Rich dark-brown mahogany oxidation 48 hours post-application. 100% natural Sojat henna.",
    },
    {
      src: "/assets/images/bridal-henna-hands.jpg",
      title: "Deep Mahogany Palm Details",
      caption: "Razor-sharp 0.38mm lines with zero bleeding or feathering on warm bridal skin.",
    },
    {
      src: "/assets/images/henna-cones-in-hand.png",
      title: "Fresh Hand-Filled Cones in Hand",
      caption: "Individually sealed in clear airtight wrap to preserve essential oils and natural moisture.",
    },
    {
      src: "/assets/images/moringa-leaf-powder-swirl.png",
      title: "Botanical Moringa Leaf & Powder Swirl",
      caption: "Micro-sieved pure leaves creating buttery paste that glides effortlessly.",
    },
  ];

  return (
    <div className="space-y-0 bg-luxury-home bg-henna-filigree min-h-screen relative pb-16">
      {/* 1. HERO SECTION WITH LEAF MANIPULATION BACKGROUND */}
      <section className="relative min-h-[calc(100svh-64px)] sm:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between sm:justify-center overflow-hidden py-4 sm:py-16 lg:py-0 border-b border-sand/20">
        {/* Leaf Type Manipulation Background Art */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/assets/images/moringa-leaf-powder-swirl.png"
              alt="Botanical Moringa Leaf and Swirling Powder Manipulation"
              fill
              priority
              className="object-cover object-right lg:object-center opacity-35 sm:opacity-45 lg:opacity-55 mix-blend-multiply filter contrast-110 saturate-110 transform scale-105"
            />
            {/* Ambient Gradient Overlays for optimal readability & luxury depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-transparent lg:via-cream/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/50" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-cream/60" />
          </div>
        </div>

        {/* Drifting Floating Leaf Particles */}
        <div className="absolute top-8 left-6 sm:left-1/4 animate-drift pointer-events-none z-10">
          <span className="text-soft text-xl sm:text-2xl">🍃</span>
        </div>
        <div className="absolute top-1/3 right-6 sm:right-1/4 animate-drift pointer-events-none [animation-delay:3s] z-10">
          <span className="text-moringa text-lg sm:text-xl">🌿</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex flex-col justify-between sm:block py-2 sm:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center flex-1 flex flex-col justify-between sm:grid">
            {/* Hero Copy - Clean Left Alignment on Phone, Tablet & Desktop */}
            <div className="lg:col-span-7 flex-1 flex flex-col justify-between sm:block text-left w-full">
              {/* Content block: Eyebrow + Headline + Subtitle */}
              <div className="space-y-3.5 sm:space-y-6 pt-2 sm:pt-0">
                {/* Eyebrow with horizontal dash line */}
                <div className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] text-moringa">
                  <span className="w-7 sm:w-12 h-[2.5px] bg-moringa inline-block rounded-full" />
                  <span>100% NATURAL • HARVEST 2026</span>
                </div>

                {/* Bold 3-Tier Headline - Increased font size for mobile prominence */}
                <h1 className="font-heading text-[32px] xs:text-[38px] sm:text-5xl lg:text-6xl font-black text-henna-dark leading-[1.12] tracking-tight text-left">
                  Pure Natural Henna, <br />
                  <span className="text-moringa">crafted by nature,</span> <br />
                  zero chemicals.
                </h1>

                {/* Subtitle - Increased size for mobile readability */}
                <p className="text-base sm:text-lg lg:text-xl text-henna-dark/85 max-w-xl text-left leading-relaxed font-normal">
                  We are <strong className="font-bold text-henna-dark">Zahra Henna</strong> — crafting fresh ready cones blended with single-origin Rajasthani henna leaves, organic moringa, and therapeutic oils for rich, dark-brown bridal stains.
                </p>
              </div>

              {/* Action Buttons - Pinned at the very bottom of the mobile screen before scrolling */}
              <div className="mt-auto pt-6 sm:pt-4 pb-2 sm:pb-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-2.5 sm:gap-4 w-full">
                <Link
                  href="/shop"
                  className="btn-shimmer w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-henna text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-luxury hover:bg-henna-dark flex items-center justify-center gap-2 text-center"
                >
                  <span>Shop Cones Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="btn-outline-animated w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/80 backdrop-blur-sm border border-sand/50 text-henna font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* Hero Visual: Cones in Hand Floating Over Leaf Swirl Backdrop (Desktop & Tablet) */}
            <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center pt-2 lg:pt-0">
              <div className="relative w-56 sm:w-72 lg:w-96 aspect-[3/4] animate-float max-w-full">
                <div className="absolute inset-0 bg-moringa/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />
                <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxury border-2 sm:border-4 border-white bg-cream">
                  <Image
                    src="/assets/images/henna-cones-in-hand.png"
                    alt="Natural Henna Cones individually sealed held in hand"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-henna-dark/85 via-transparent to-transparent flex items-end p-4 sm:p-6">
                    <div className="text-white text-left">
                      <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-soft block">
                        Fresh Weekly Batches
                      </span>
                      <p className="font-heading text-sm sm:text-lg font-bold">
                        Individually Wrapped Caramel Paste Cones
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges: Hidden on phone size, visible on desktop/tablet */}
          <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-sand/20 hidden sm:flex flex-wrap items-center justify-start gap-6 lg:gap-8 text-xs sm:text-sm text-henna-dark/85 font-semibold">
            <div className="flex items-center gap-2 bg-white/70 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-full border border-sand/20 sm:border-0 shadow-sm sm:shadow-none">
              <ShieldCheck className="w-4 h-4 text-moringa flex-shrink-0" />
              <span>No PPD or Ammonia</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-full border border-sand/20 sm:border-0 shadow-sm sm:shadow-none">
              <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0" />
              <span>Individually Sealed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-full border border-sand/20 sm:border-0 shadow-sm sm:shadow-none">
              <MessageCircle className="w-4 h-4 text-moringa flex-shrink-0" />
              <span>WhatsApp Orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "100% NATURAL" QUOTE STRIP (MARQUEE) */}
      <QuoteMarquee />

      {/* =========================================================================
          3. POPULAR HENNA CONES (PHONE SIDE-SCROLLING + DESKTOP RESPONSIVE GRID)
         ========================================================================= */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Most Loved Cones</span>
              </span>
              <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-henna mt-2 tracking-tight text-left">
                Popular Henna Cones
              </h2>
              <p className="text-xs sm:text-sm text-henna-dark/75 mt-1 font-normal">
                Individually sealed cones with fine 0.38mm pin-tip for rich mahogany stains.
              </p>
            </div>

            <Link
              href="/shop"
              className="btn-outline-animated px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-sand/40 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-henna hover:text-henna-dark shadow-sm w-fit"
            >
              <span>Full Catalog ({allProducts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* PHONE SIZE: Smooth Horizontal Side Scroller with peek and snap */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between text-[11px] text-henna-dark/60 font-medium mb-2 px-0.5">
              <span>Bestselling Cones</span>
              <span className="flex items-center gap-1 text-moringa font-bold">
                Swipe sideways <span>→</span>
              </span>
            </div>

            <div className="flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 pt-0.5 px-0.5">
              {popularProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[240px] flex-shrink-0 snap-start flex flex-col"
                >
                  <ProductCard product={product} />
                </div>
              ))}

              {/* End of mobile scroller: Browse all card */}
              <div className="w-[180px] flex-shrink-0 snap-start flex flex-col items-center justify-center text-center p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-sand/30 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-moringa/15 text-moringa flex items-center justify-center font-bold">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-henna">
                    Full Collection
                  </h4>
                  <p className="text-[11px] text-henna-dark/70 mt-1">
                    Discover all {allProducts.length} cones and powders
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="px-4 py-2 rounded-full bg-henna text-white text-[11px] font-bold uppercase tracking-wider hover:bg-henna-dark shadow-sm"
                >
                  View Shop
                </Link>
              </div>
            </div>
          </div>

          {/* DESKTOP & TABLET: Clean Responsive Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom Catalog CTA */}
          <div className="text-center pt-2">
            <Link
              href="/shop"
              className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-henna text-white text-xs font-bold uppercase tracking-wider hover:bg-henna-dark shadow-luxury"
            >
              <span>Explore All Products ({allProducts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. REAL STAIN RESULTS SECTION (DEDICATED SHOWCASE + OXIDATION TIMELINE)
         ========================================================================= */}
      <section className="py-12 sm:py-20 border-t border-sand/20 bg-cream/40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-left max-w-2xl space-y-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
              Verified Botanical Oxidation
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-henna tracking-tight text-left">
              Real Stain Results
            </h2>
            <p className="text-xs sm:text-sm text-henna-dark/80 font-normal text-left leading-relaxed">
              Witness the deep mahogany dark-brown stain achieved naturally with pure Rajasthani henna leaves, organic moringa, and therapeutic oils — zero PPD, zero synthetic black dyes.
            </p>
          </div>

          {/* 3-Step Stain Progression Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {/* Step 1 */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-sand/25 shadow-sm space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sand bg-sand/15 px-2.5 py-0.5 rounded-full">
                  Step 1 • Hour 0
                </span>
                <Clock className="w-4 h-4 text-sand" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-henna">
                Fresh Paste Application
              </h3>
              <p className="text-[11px] sm:text-xs text-henna-dark/70 leading-relaxed font-normal">
                Buttery smooth caramel-brown paste glides with a 0.38mm fine tip. Keep on skin for 6–8 hours for deepest absorption.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-sand/25 shadow-sm space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-moringa bg-moringa/15 px-2.5 py-0.5 rounded-full">
                  Step 2 • Hour 24
                </span>
                <Sparkles className="w-4 h-4 text-moringa" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-henna">
                Warm Pumpkin Orange
              </h3>
              <p className="text-[11px] sm:text-xs text-henna-dark/70 leading-relaxed font-normal">
                Dried paste scraped off gently without water. Lawsone molecules bind to skin keratin and begin natural air oxidation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-henna/30 shadow-luxury space-y-2 text-left bg-gradient-to-br from-white to-sand/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-henna px-2.5 py-0.5 rounded-full">
                  Step 3 • Hour 48 Peak
                </span>
                <ShieldCheck className="w-4 h-4 text-henna" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-henna">
                Intense Mahogany Dark Stain
              </h3>
              <p className="text-[11px] sm:text-xs text-henna-dark/70 leading-relaxed font-normal">
                Peak dark-brown mahogany bridal shade achieved naturally with body warmth. Stain stays rich for 10 to 14 days!
              </p>
            </div>
          </div>

          {/* Real Stain Gallery (2 columns on mobile, 4 on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {realStainGallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage(img)}
                className="group relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-luxury-hover cursor-pointer border-2 border-sand/25 bg-cream transition-all duration-300"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-henna-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-henna flex items-center justify-center shadow-luxury">
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-4 bg-gradient-to-t from-henna-dark/90 via-henna-dark/50 to-transparent text-white text-left">
                  <h4 className="font-heading font-bold text-xs sm:text-sm tracking-tight line-clamp-1">
                    {img.title}
                  </h4>
                  <p className="text-[10px] text-cream/80 mt-0.5 line-clamp-1">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stain Guarantee Strip */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-sand/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-moringa/15 text-moringa flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-henna">
                  100% Chemical-Free Stain Guarantee
                </h4>
                <p className="text-xs text-henna-dark/70">
                  Zero PPD, zero synthetic black chemicals. Completely safe for brides, sensitive skin, and children.
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="btn-shimmer px-5 py-2.5 rounded-full bg-henna text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-sm hover:bg-henna-dark"
            >
              Order Cones for Events
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE ZAHRA HENNA (2-COLUMN ON PHONE, 4 ON DESKTOP) */}
      <section className="py-10 sm:py-16 border-t border-sand/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-left max-w-2xl mb-6 sm:mb-10 space-y-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
              Botanical Standard
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-henna mt-2 tracking-tight text-left">
              Why Choose Zahra Henna?
            </h2>
            <p className="text-xs sm:text-sm text-henna-dark/75 font-normal text-left">
              Pure botanical integrity for rich stains, handcrafted without shortcuts.
            </p>
          </div>

          {/* 2-Columns on Mobile for Compact Design */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {/* Card 1 */}
            <div className="bg-white/90 backdrop-blur-sm p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-sand/25 shadow-sm text-left space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-moringa/15 text-moringa flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="font-heading text-base sm:text-lg font-bold text-henna tracking-tight">
                100% Natural
              </div>
              <p className="text-[11px] sm:text-xs text-henna-dark/70 leading-relaxed font-normal">
                Shade-dried Rajasthan henna leaves and moringa. Zero synthetic dyes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/90 backdrop-blur-sm p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-sand/25 shadow-sm text-left space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-sand/20 text-sand flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-heading text-base sm:text-lg font-bold text-henna tracking-tight">
                Zero Chemicals
              </div>
              <p className="text-[11px] sm:text-xs text-henna-dark/70 leading-relaxed font-normal">
                0% PPD & ammonia. Never contains kerosene or harsh synthetic preservatives.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/90 backdrop-blur-sm p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-sand/25 shadow-sm text-left space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-henna/15 text-henna flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="font-heading text-base sm:text-lg font-bold text-henna tracking-tight">
                Rich Dark Stain
              </div>
              <p className="text-[11px] sm:text-xs text-henna-dark/70 leading-relaxed font-normal">
                Oxidizes into deep chocolate mahogany within 48 hours and lasts 10 to 14 days.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/90 backdrop-blur-sm p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-sand/25 shadow-sm text-left space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-moringa/15 text-moringa flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div className="font-heading text-base sm:text-lg font-bold text-henna tracking-tight">
                Skin Safe
              </div>
              <p className="text-[11px] sm:text-xs text-henna-dark/70 leading-relaxed font-normal">
                Enriched with soothing moringa vitamins and cold-pressed therapeutic oils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INGREDIENTS SHOWCASE (MORINGA & HENNA SWIRL) */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-sand/30 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Image on Left */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury border-2 border-sand/20">
                <Image
                  src="/assets/images/moringa-leaf-powder-swirl.png"
                  alt="Moringa leaf branch with swirling fresh green botanical powder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Narrative on Right */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
                The Sacred Recipe
              </span>

              <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-henna leading-tight tracking-tight text-left">
                Pure Sojat Henna & Nutrient-Rich Moringa
              </h2>

              <p className="text-xs sm:text-sm text-henna-dark/80 leading-relaxed font-normal">
                Our formula pairs single-origin <strong>Rajasthani henna leaves</strong> with organic <strong>Moringa leaf powder</strong>. Moringa naturally conditions and nourishes the skin, creating an ultra-smooth paste that drapes like melted caramel through a 0.38mm fine tip without clogging.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-henna-dark">
                    <strong>Triple-Sieved Leaf Powder:</strong> Micro-filtered for butter-like paste and ultra-fine precision.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-henna-dark">
                    <strong>Therapeutic Essential Oils:</strong> Eucalyptus and cajeput naturally activate dark staining.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-moringa flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-henna-dark">
                    <strong>Individually Sealed Cones:</strong> Sealed in clear wrap to lock in freshness and aroma.
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

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="py-10 sm:py-16 border-t border-sand/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="text-left max-w-2xl space-y-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
              Customer Love
            </span>
            <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-henna tracking-tight text-left">
              Trusted by Bridal Artists & Brides
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-sand/25 shadow-sm space-y-3 text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-sand">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-sand text-sand" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-henna-dark/80 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-sand/15">
                  <span className="font-heading font-bold text-xs sm:text-sm text-henna block">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-moringa font-medium block">
                    {t.role} • {t.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION BANNER */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-henna to-henna-dark rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-sand bg-white/10 px-3 py-1 rounded-full inline-block">
                Fresh Batch Ready to Ship
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-cream leading-tight">
                Ready for your perfect henna color?
              </h2>
              <p className="text-xs sm:text-sm text-cream/80 font-normal">
                Handcrafted Rajasthani cones individually sealed with zero chemicals. Delivered fast across India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href="/shop"
                className="btn-shimmer w-full sm:w-auto px-6 py-3.5 rounded-full bg-sand text-white font-bold text-xs uppercase tracking-wider text-center shadow-lg hover:bg-sand/90"
              >
                Shop Cones Now
              </Link>
              <a
                href={BRAND_CONFIG.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-moringa-soft" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-sand p-2 z-50 rounded-full bg-white/10"
            aria-label="Close image"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[85vh] w-full rounded-2xl overflow-hidden bg-henna-dark text-white flex flex-col shadow-2xl border border-sand/30"
          >
            <div className="relative aspect-[3/4] sm:aspect-square w-full">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 sm:p-5 bg-henna-dark border-t border-sand/20 text-left">
              <h3 className="font-heading font-bold text-base text-cream">
                {lightboxImage.title}
              </h3>
              <p className="text-xs text-cream/75 mt-1 font-normal">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
