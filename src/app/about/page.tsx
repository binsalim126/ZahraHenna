"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  Sparkles,
  ArrowRight,
  Heart,
  Droplet,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const processSteps = [
    {
      num: "01",
      title: "Dawn Leaf Harvest",
      desc: "Single-origin Rajasthani henna leaves picked at peak Lawsonia pigment maturity in Sojat.",
    },
    {
      num: "02",
      title: "Slow Stone Crushed",
      desc: "Shade-dried and cold-milled on traditional stone wheels to preserve vital plant nutrients.",
    },
    {
      num: "03",
      title: "Essential Oil Infusion",
      desc: "Blended with steam-distilled eucalyptus and cajeput oils for deep mahogany dye release.",
    },
    {
      num: "04",
      title: "Sealed Fresh Weekly",
      desc: "Hand-rolled into precision 0.38mm cones and airtight sealed in clear protective wrap.",
    },
  ];

  const standards = [
    {
      icon: ShieldCheck,
      title: "Zero PPD & Chemicals",
      desc: "Completely free of coal-tar dyes, kerosene, and preservatives. 100% skin safe.",
    },
    {
      icon: Droplet,
      title: "0.38mm Needle Tip",
      desc: "Ultra-fine tip allowing bridal artists to draw flawless lace and intricate mandalas.",
    },
    {
      icon: Sparkles,
      title: "Deep Mahogany Oxidation",
      desc: "Naturally oxidizes into an intense dark-brown stain over 24 to 48 hours.",
    },
  ];

  const stats = [
    { num: "15,000+", label: "Happy Brides" },
    { num: "85,000+", label: "Cones Rolled" },
    { num: "5+ Years", label: "Artisan Craft" },
    { num: "100%", label: "Pure Botanical" },
  ];

  return (
    <div className="py-10 sm:py-16 bg-luxury-home bg-henna-filigree min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* 1. Header (Minimalist & Focused) */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
            Our Heritage & Craft
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-henna tracking-tight">
            Pure Botanical Henna, Honoring Tradition
          </h1>
          <p className="text-xs sm:text-sm text-henna-dark/75 leading-relaxed">
            Fresh handcrafted cones and Rajasthani leaf powder, made without harsh chemicals.
          </p>
        </div>

        {/* 2. Story Card with Image */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-sand/25 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury border-2 sm:border-4 border-white bg-cream">
              <Image
                src="/assets/images/bridal-henna-hands.jpg"
                alt="Zahra Henna bridal artwork with dark stain"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-henna-dark/85 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-[11px] font-medium leading-snug">
                  48-hour natural mahogany oxidation with Zahra Henna paste
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-moringa block">
              ✦ Handcrafted in Fresh Weekly Batches
            </span>
            <h2 className="font-heading text-xl sm:text-3xl font-bold text-henna-dark leading-snug tracking-tight">
              "Henna should celebrate life, not burn your skin with chemicals."
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm text-henna-dark/80 leading-relaxed font-normal">
              <p>
                Commercial cones are often packed with industrial black dyes (PPD), kerosene, and synthetic binders to force an instant artificial black stain. These additives trigger severe allergic reactions and damage skin.
              </p>
              <p>
                At <strong>Zahra Henna</strong>, we source single-origin Sojat leaves, triple-cloth-sieve them to a silk texture, and blend them with natural cane sugar, eucalyptus oil, and organic moringa. The result is a smooth paste that glides effortlessly and stains richly.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-henna text-white text-xs font-bold uppercase tracking-wider hover:bg-henna-dark shadow-sm"
              >
                <span>Browse Fresh Cones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Purity Standards (3 Clean Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {standards.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-sand/20 shadow-xs space-y-2 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-moringa/15 text-moringa flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm text-henna">
                  {st.title}
                </h3>
                <p className="text-xs text-henna-dark/70 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 4. The 4-Step Craft Ritual (Minimalist Layout) */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-moringa">
              How It Is Made
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-henna tracking-tight">
              Our 4-Step Artisanal Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/85 p-4 sm:p-5 rounded-2xl border border-sand/20 space-y-2 text-left shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-extrabold text-lg text-sand">
                    {step.num}
                  </span>
                  <Leaf className="w-4 h-4 text-moringa/60" />
                </div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-henna-dark">
                  {step.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-henna-dark/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Minimalist Stats Strip (Proper font size and spacing, ZERO overlap on mobile) */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-sand/30 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center divide-x-0 sm:divide-x divide-sand/15">
            {stats.map((s, idx) => (
              <div key={idx} className="p-2 sm:px-4 space-y-1">
                <span className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-henna block tracking-tight tabular-nums">
                  {s.num}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-moringa block">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Minimalist Final CTA */}
        <div className="text-center space-y-3 pt-2">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-henna tracking-tight">
            Ready to Experience Fresh Zahra Cones?
          </h3>
          <p className="text-xs text-henna-dark/70 max-w-sm mx-auto">
            Order fresh ready-to-use cones or get in touch for custom bridal bookings.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-full bg-henna text-white font-bold text-xs uppercase tracking-wider hover:bg-henna-dark shadow-luxury"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
