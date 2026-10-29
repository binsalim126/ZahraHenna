"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  Sparkles,
  Users,
  Award,
  Heart,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

export default function AboutPage() {
  const steps = [
    {
      step: "01",
      title: "Leaves Hand-Picked at Dawn",
      desc: "Fresh green henna leaves are harvested at peak pigment maturity in Sojat, Rajasthan, alongside wild organic moringa leaves.",
      icon: Leaf,
    },
    {
      step: "02",
      title: "Shade-Dried & Stone-Ground",
      desc: "Leaves are dried in natural desert shade to protect chlorophyll and crushed on slow cold-stone mills without burning heat.",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Blended with Pure Oils",
      desc: "Infused with therapeutic eucalyptus and cajeput essential oils to naturally trigger dye release for deep mahogany oxidation.",
      icon: Heart,
    },
    {
      step: "04",
      title: "Hand-Filled & Individually Sealed",
      desc: "Carefully hand-poured into applicator cones and sealed in clear airtight plastic wrap to lock in moisture and peak freshness.",
      icon: ShieldCheck,
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Search for Pure Henna",
      desc: "Frustrated by severe chemical burns from commercial black henna cones filled with toxic PPD, Zahra set out to revive the ancestral art of 100% natural henna.",
    },
    {
      year: "2021",
      title: "Sojat & Moringa Breakthrough",
      desc: "Partnered directly with generational farming families in Sojat, Rajasthan, and developed our signature moringa-infused paste for silky flow.",
    },
    {
      year: "2023",
      title: "Loved by 500+ Bridal Artists",
      desc: "Recognized nationwide by wedding mehndi specialists for guaranteed rich mahogany stain and individually sealed fresh cones.",
    },
    {
      year: "2026",
      title: "Direct Distributor to Your Doorstep",
      desc: "Delivering freshly churned small batches directly to homes and studios with seamless WhatsApp ordering.",
    },
  ];

  return (
    <div className="py-16 bg-luxury-home bg-henna-filigree min-h-screen space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full">
            Our Journey
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna leading-tight tracking-tight">
            Pure Botanical Beauty, Honoring Tradition
          </h1>
          <p className="text-xs sm:text-base text-henna-dark/75 leading-relaxed font-normal">
            We are a dedicated manufacturer and distributor of 100% natural, chemical-free henna cones crafted for bridal artists and natural beauty lovers.
          </p>
        </div>

        {/* Narrative & Visual */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-sand/20 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-cream">
              <Image
                src="/assets/images/bridal-henna-hands.jpg"
                alt="Zahra Henna bridal artwork with dark stain"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-henna-dark/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-white text-xs font-medium">
                  Intricate bridal henna stained with pure Zahra Henna cones
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-moringa">
              ✦ Handcrafted in Small Batches
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-henna leading-tight">
              "Henna should celebrate life, not burn your skin with chemicals."
            </h2>
            <p className="text-xs sm:text-sm text-henna-dark/80 leading-relaxed font-normal">
              Most store-bought cones contain industrial dyes (PPD), kerosene, and synthetic preservatives to give instantaneous black stains. These chemicals damage delicate skin and cause lasting allergic sensitization.
            </p>
            <p className="text-xs sm:text-sm text-henna-dark/80 leading-relaxed font-normal">
              At Zahra Henna, we returned to first principles: pure single-origin henna leaves from Sojat, nutritious green moringa powder, cane sugar for skin adhesion, and natural eucalyptus oil. The result is a smooth caramel-brown paste that smells divine and stains deeply.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 rounded-full bg-henna text-white font-medium text-xs uppercase tracking-wider hover:bg-henna-dark transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Shop Fresh Cones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Timeline: Our Journey */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-henna tracking-tight">
              From Kitchen Batches to National Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm space-y-3 relative"
              >
                <span className="font-heading text-2xl font-bold text-sand block tracking-tight">
                  {item.year}
                </span>
                <h3 className="font-heading font-bold text-base text-henna-dark tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-henna-dark/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Promise: Chemical-Free Products */}
        <div className="bg-henna text-cream rounded-3xl p-8 sm:p-14 border border-sand/20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sand bg-sand/20 px-3 py-1 rounded-full">
              Our Solemn Promise
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Chemical-Free Henna Cones
            </h2>
            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
              We reject all harmful additives. Here is our transparent standard:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-henna-dark/60 border border-sand/20 space-y-2">
              <span className="text-red-400 font-bold text-base">✕ NO PPD</span>
              <p className="text-xs text-cream/75">
                Zero paraphenylenediamine or synthetic black coal-tar dyes that trigger allergic burns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-henna-dark/60 border border-sand/20 space-y-2">
              <span className="text-red-400 font-bold text-base">✕ NO CHEMICAL PRESERVATIVES</span>
              <p className="text-xs text-cream/75">
                We never add petroleum, gasoline, or artificial stabilizers. Our cones stay fresh by freezing!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-henna-dark/60 border border-sand/20 space-y-2">
              <span className="text-moringa-soft font-bold text-base">✓ 100% BOTANICALS</span>
              <p className="text-xs text-cream/75">
                Only pure Lawsonia inermis, moringa oleifera, unrefined sugar, and steam-distilled essential oils.
              </p>
            </div>
          </div>
        </div>

        {/* How We Make It: 4-Step Illustrated Process */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full">
              Artisanal Craftsmanship
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-henna">
              How We Make Zahra Henna Cones
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-sand/20 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-moringa/15 text-moringa flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-bold text-xl text-sand">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-henna-dark">
                    {s.title}
                  </h3>
                  <p className="text-xs text-henna-dark/70 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-cream-soft rounded-3xl p-8 sm:p-12 border border-sand/20 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading text-3xl font-bold text-henna">
              Our 4 Core Values
            </h2>
            <p className="text-xs text-henna-dark/70">
              The foundation of every batch we ship out.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="font-heading text-xl font-bold text-henna">Purity</div>
              <p className="text-xs text-henna-dark/70">
                100% natural ingredients. Transparent disclosure on every single pack.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-heading text-xl font-bold text-henna">Quality</div>
              <p className="text-xs text-henna-dark/70">
                Smooth caramel paste and needle-thin 0.38mm tip for effortless precision.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-heading text-xl font-bold text-henna">Tradition</div>
              <p className="text-xs text-henna-dark/70">
                Honoring ancestral Rajasthani shade drying and stone crushing heritage.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-heading text-lg font-bold text-henna">Customer Trust</div>
              <p className="text-xs text-henna-dark/70">
                Direct WhatsApp relationship with our artisans for support and advice.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Counters */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-sand/20 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-heading text-3xl sm:text-4xl font-bold text-henna tracking-tight">
              15,000+
            </div>
            <div className="text-xs font-semibold text-moringa uppercase tracking-wider mt-1">
              Happy Brides & Artists
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl sm:text-4xl font-bold text-henna tracking-tight">
              85,000+
            </div>
            <div className="text-xs font-semibold text-moringa uppercase tracking-wider mt-1">
              Cones Handcrafted
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl sm:text-4xl font-bold text-henna tracking-tight">
              5+ Years
            </div>
            <div className="text-xs font-semibold text-moringa uppercase tracking-wider mt-1">
              Small Batch Experience
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl sm:text-4xl font-bold text-henna tracking-tight">
              100%
            </div>
            <div className="text-xs font-semibold text-moringa uppercase tracking-wider mt-1">
              Chemical-Free PPD 0%
            </div>
          </div>
        </div>

        {/* Final CTA to Shop */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-henna tracking-tight">
            Experience the Zahra Henna Difference
          </h3>
          <p className="text-xs sm:text-sm text-henna-dark/70 max-w-md mx-auto">
            Order a pack of 12 cones or chat with us about wholesale quantities.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="btn-shimmer px-8 py-3.5 rounded-full bg-henna hover:bg-henna-dark text-white font-bold text-xs uppercase tracking-wider shadow-luxury inline-flex items-center gap-2"
            >
              <span>Explore The Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
