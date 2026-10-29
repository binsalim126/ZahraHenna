import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  Sparkles,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function ProcessPage() {
  return (
    <div className="py-12 sm:py-20 bg-luxury-home bg-henna-filigree min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
            The Zahra Purity Standard
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-henna leading-tight tracking-tight">
            Sojat Heritage & Botanical Purity
          </h1>
          <p className="text-xs sm:text-sm text-henna-dark/75 leading-relaxed font-normal">
            Every batch of Zahra Henna is crafted from single-origin Rajasthan harvests, cold stone-ground, and lab-verified 100% free of PPD and chemical additives.
          </p>
        </div>

        {/* Sojat Rajasthan Geography & Terroir */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-sand/25 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-moringa block">
              ✦ The Global Henna Capital
            </span>
            <h2 className="font-heading text-xl sm:text-3xl font-bold text-henna-dark leading-snug tracking-tight">
              Why Sojat, Rajasthan Produces the World’s Finest Henna
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-henna-dark/80 leading-relaxed font-normal">
              <p>
                Nestled on the edge of the Thar Desert, Sojat possesses a distinct microclimate: arid air, mineral-rich alkaline soil, and intense desert sunlight. These environmental conditions prompt the <em>Lawsonia inermis</em> shrub to synthesize extraordinary concentrations of <strong>Lawsone dye molecules</strong> (up to 3.2%, compared to 1.1% in humid regions).
              </p>
              <p>
                We partner directly with multigenerational farming families in Sojat, Rajasthan. By cutting out brokers, our henna leaves reach our studio within weeks of harvest rather than sitting in damp warehouses for months.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-cream border border-sand/20">
                <div className="font-heading text-xl sm:text-2xl font-bold text-henna">3.2%</div>
                <div className="text-[11px] font-bold text-sand">Peak Lawsone Content</div>
              </div>
              <div className="p-3.5 rounded-xl bg-cream border border-sand/20">
                <div className="font-heading text-xl sm:text-2xl font-bold text-henna">100%</div>
                <div className="text-[11px] font-bold text-moringa">Single-Origin Sojat</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury border-2 sm:border-4 border-white bg-cream">
              <Image
                src="/assets/images/henna-cones-in-hand.png"
                alt="Direct farm harvest from Sojat Rajasthan"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-henna-dark/85 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-[11px] font-medium">
                  Direct farm harvest from Sojat, Rajasthan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Purity Guarantee vs Toxic Commercial Henna */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
              Truth in Beauty
            </span>
            <h2 className="font-heading text-xl sm:text-3xl font-bold text-henna tracking-tight">
              Zahra Henna vs. Commercial "Instant" Cones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Toxic Henna Warning Card */}
            <div className="p-6 rounded-2xl bg-red-50/70 border border-red-200/80 space-y-3">
              <div className="flex items-center gap-2 text-red-800 font-heading font-bold text-base sm:text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>Commercial / "Black" Henna Dangers</span>
              </div>
              <p className="text-xs text-red-900/80 leading-relaxed font-normal">
                Cheap market cones and chemical dyes lace henna with synthetic additives to force an instant artificial black stain:
              </p>
              <ul className="space-y-2 text-xs text-red-950/90 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Paraphenylenediamine (PPD):</strong> A potent coal-tar dye known to cause severe chemical burns and lasting skin allergies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Kerosene & Industrial Solvents:</strong> Used to chemically force artificial dye penetration into human skin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Synthetic Preservatives:</strong> Allow market cones to sit on store shelves unrefrigerated for years.</span>
                </li>
              </ul>
            </div>

            {/* ZAHRA HENNA Purity Card */}
            <div className="p-6 rounded-2xl bg-moringa/10 border border-moringa/25 space-y-3">
              <div className="flex items-center gap-2 text-moringa-dark font-heading font-bold text-base sm:text-lg">
                <ShieldCheck className="w-5 h-5 text-moringa flex-shrink-0" />
                <span>The Pure Zahra Promise</span>
              </div>
              <p className="text-xs text-henna-dark leading-relaxed font-normal">
                We formulate with ancestral botanical integrity, utilizing only certified non-toxic food-grade botanicals:
              </p>
              <ul className="space-y-2 text-xs text-henna-dark font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-moringa font-bold">✓</span>
                  <span><strong>100% Pure Lawsonia Inermis:</strong> Triple-cloth sieved through micro nylon mesh for ultra-smooth buttery flow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-moringa font-bold">✓</span>
                  <span><strong>Steam-Distilled Essential Oils:</strong> Eucalyptus and cajeput naturally trigger rich mahogany oxidation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-moringa font-bold">✓</span>
                  <span><strong>Chemical-Free Purity:</strong> 0.00% synthetic chemicals, zero PPD. Safe for brides, sensitive skin, and children.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Certificate / Lab Badge Showcase */}
        <div className="bg-henna text-cream rounded-3xl p-6 sm:p-10 border border-sand/20 text-center space-y-4 shadow-luxury">
          <div className="w-12 h-12 rounded-full bg-sand/20 text-sand flex items-center justify-center mx-auto border border-sand/40">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl sm:text-3xl font-bold text-white tracking-tight">
            100% Verified Botanical Purity
          </h3>
          <p className="text-xs sm:text-sm text-cream/80 max-w-xl mx-auto leading-relaxed font-normal">
            Every seasonal harvest is verified free of heavy metals and synthetic dyes. Experience the natural richness of true Sojat henna.
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-full bg-sand hover:bg-sand/90 text-white text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              <span>Explore The Fresh Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
