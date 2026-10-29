import React from "react";
import { Sparkles, Leaf, ShieldCheck, HeartHandshake } from "lucide-react";

export const BrandTrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Leaf,
      title: "100% Pure Sojat Henna",
      subtitle: "Direct-from-farm single origin",
    },
    {
      icon: ShieldCheck,
      title: "Zero Chemicals & No PPD",
      subtitle: "GCMS lab tested, 0.00% synthetic dye",
    },
    {
      icon: HeartHandshake,
      title: "Handmade in Small Batches",
      subtitle: "Triple-sieved for micro-precision",
    },
    {
      icon: Sparkles,
      title: "Skin-Safe & Pregnancy Safe",
      subtitle: "Certified gentle, holistic beauty",
    },
  ];

  return (
    <section className="bg-cream-soft border-y border-henna-200/60 py-8 relative overflow-hidden">
      {/* Decorative leaf watermarks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 group transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-henna-100 flex items-center justify-center flex-shrink-0 text-terracotta border border-henna-300/60 group-hover:bg-terracotta group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-henna-900 text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-henna-600 mt-0.5 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
