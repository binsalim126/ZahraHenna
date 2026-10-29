"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Leaf, Sun, Wind, Filter, PackageCheck, ChevronRight } from "lucide-react";

export const LeafToPowderStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "harvest",
      stage: "Step 01",
      title: "Hand-Harvesting at Dawn",
      subtitle: "Single-origin Sojat, Rajasthan",
      description:
        "Henna leaves reach peak Lawson phytopigment concentration just before the autumn dew evaporates. Local farming families hand-pick the top three crown leaves of the mature henna bush, preserving the plant’s vitality.",
      icon: Leaf,
      badge: "Peak Lawson Pigment",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      fact: "Leaves contain up to 3.2% pure Lawson dye when picked at dawn.",
    },
    {
      id: "sun-dry",
      stage: "Step 02",
      title: "Desert Shade & Sun Drying",
      subtitle: "Evaporating moisture naturally",
      description:
        "The leaves are laid out on clean, elevated muslin sheets under the arid desert breeze of Rajasthan. Controlled shade drying protects the green chlorophyll and prevents heat degradation of natural tannin bonds.",
      icon: Sun,
      badge: "Zero Artificial Heat",
      image: "https://images.unsplash.com/photo-1512290900672-1f55b9e07f0a?auto=format&fit=crop&w=1000&q=80",
      fact: "Takes 72 hours of low humidity to reach optimum 7% residual leaf moisture.",
    },
    {
      id: "grind",
      stage: "Step 03",
      title: "Slow Stone Grinding",
      subtitle: "Preserving delicate terpenes",
      description:
        "Modern high-speed industrial metal blades burn the delicate oils. We use traditional slow-turning natural granite stones that crush the crispy leaves without generating friction heat, keeping the therapeutic botanicals active.",
      icon: Wind,
      badge: "Cold Stone Pulverized",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
      fact: "Granite stones operate under 38°C to prevent essential oil vaporization.",
    },
    {
      id: "sieve",
      stage: "Step 04",
      title: "Triple Cloth Micro-Sieving",
      subtitle: "Medical-grade nylon mesh",
      description:
        "The powder is passed not once, but three distinct times through ultra-fine 120-mesh medical grade nylon cloth filters. This eliminates coarse twigs, fibers, and sand, yielding an extraordinarily smooth, cocoa-like powder.",
      icon: Filter,
      badge: "Zero Clog Guarantee",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      fact: "0.38mm cone pins flow without a single stutter or knot.",
    },
    {
      id: "pack",
      stage: "Step 05",
      title: "Airtight Nitrogen-Flushed Foil",
      subtitle: "Locked freshness for 24 months",
      description:
        "Light and oxygen are the sworn enemies of henna staining potency. We immediately seal every batch into multi-layer matte kraft foil pouches with oxygen scavengers to guarantee peak harvest potency right to your door.",
      icon: PackageCheck,
      badge: "Fresh From Farm",
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=80",
      fact: "Maintains over 98% dye vitality even after 18 months of storage.",
    },
  ];

  const current = steps[activeStep];
  const IconComponent = current.icon;

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta bg-terracotta/10 px-3.5 py-1 rounded-full">
            Artisanal Craftsmanship
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-henna-900 mt-4 leading-tight">
            From Sacred Leaf to Silky Powder
          </h2>
          <p className="text-base text-henna-700 mt-3 leading-relaxed">
            Follow the 5 meticulous stages of authentic Rajasthani henna creation. No shortcuts, no synthetic accelerators — just ancestral respect for pure botanicals.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center justify-between overflow-x-auto pb-4 mb-10 gap-2 border-b border-henna-200">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 text-left ${
                  isCurrent
                    ? "bg-henna-900 text-cream-soft shadow-lg scale-102"
                    : "bg-cream-soft text-henna-700 hover:bg-henna-100 hover:text-henna-900"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isCurrent ? "bg-terracotta text-white" : "bg-henna-100 text-terracotta"
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider block ${isCurrent ? "text-gold" : "text-henna-500"}`}>
                    {step.stage}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                    {step.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Interactive Showcase Card */}
        <div className="bg-cream-soft rounded-3xl p-6 sm:p-10 border border-henna-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/20 text-henna-900 border border-gold/40">
                {current.badge}
              </span>
              <span className="text-xs font-semibold text-terracotta uppercase tracking-widest">
                {current.subtitle}
              </span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna-900">
              {current.title}
            </h3>

            <p className="text-sm sm:text-base text-henna-800 leading-relaxed">
              {current.description}
            </p>

            {/* Purity Highlight Box */}
            <div className="p-4 rounded-2xl bg-henna-50 border border-henna-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-leaf text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-leaf-dark">
                  Artisan Quality Standard
                </h4>
                <p className="text-xs text-henna-700 mt-0.5">{current.fact}</p>
              </div>
            </div>

            {/* Next Step Button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta text-white font-medium text-xs uppercase tracking-wider hover:bg-terracotta-dark transition-all shadow-md"
              >
                Next Step: {steps[(activeStep + 1) % steps.length].title}
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-henna-500 font-medium">
                Stage {activeStep + 1} of {steps.length}
              </span>
            </div>
          </div>

          {/* Realistic High-Res Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-henna-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] tracking-widest uppercase font-bold text-gold">
                  ZAHRA Artisanal Archives
                </span>
                <p className="text-sm font-medium drop-shadow">{current.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
