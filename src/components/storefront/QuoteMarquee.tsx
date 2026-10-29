"use client";

import React from "react";
import { Sparkles, Leaf } from "lucide-react";

export const QuoteMarquee: React.FC = () => {
  const items = [
    "No Chemicals",
    "No PPD",
    "No Preservatives",
    "100% Natural",
    "Dark Rich Stain",
    "Skin Friendly",
    "Handcrafted in Small Batches",
    "Pure Sojat Henna",
    "Moringa Infused",
  ];

  return (
    <div className="bg-henna text-cream py-3.5 overflow-hidden border-y border-sand/30 shadow-inner relative">
      <div className="flex w-max animate-marquee space-x-8 items-center text-xs font-semibold uppercase tracking-widest">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span>{text}</span>
            <span className="text-sand font-bold text-sm">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
