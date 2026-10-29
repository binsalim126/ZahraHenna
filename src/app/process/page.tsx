import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  Sparkles,
  Award,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function ProcessPage() {
  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta bg-terracotta/10 px-3.5 py-1 rounded-full">
            The ZAHRA Purity Standard
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-henna-900 leading-tight">
            Our Sourcing, Purity Science & Small Batch Integrity
          </h1>
          <p className="text-base sm:text-lg text-henna-700 leading-relaxed font-normal">
            We believe you deserve to know every detail about what touches your skin and hair. Discover the science behind our 100% natural Sojat henna.
          </p>
        </div>

        {/* Sojat Rajasthan Geography & Terroir */}
        <div className="bg-cream-soft rounded-3xl p-8 sm:p-14 border border-henna-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              ✦ The Global Henna Capital
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900 leading-tight">
              Why Sojat, Rajasthan Produces the World’s Finest Henna
            </h2>
            <p className="text-sm sm:text-base text-henna-800 leading-relaxed font-normal">
              Nestled at the edge of the Thar Desert, Sojat possesses a distinct microclimate: arid air, mineral-rich alkaline soil, and intense desert sunlight. These rigorous environmental conditions prompt the <em>Lawsonia inermis</em> shrub to synthesize extraordinary concentrations of <strong>Lawson phytopigment</strong> (up to 3.2%, compared to 1.1% in tropical humid regions).
            </p>
            <p className="text-sm sm:text-base text-henna-800 leading-relaxed font-normal">
              We partner directly with multigenerational farming families in Sojat. By cutting out industrial brokers, our henna reaches you within weeks of harvest rather than sitting in damp warehouses for years.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-henna-50 border border-henna-200">
                <div className="font-heading text-2xl font-bold text-henna-900">3.2%</div>
                <div className="text-xs font-semibold text-terracotta">Peak Lawson Content</div>
              </div>
              <div className="p-4 rounded-xl bg-henna-50 border border-henna-200">
                <div className="font-heading text-2xl font-bold text-henna-900">100%</div>
                <div className="text-xs font-semibold text-leaf">Single-Origin Traceability</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
                alt="Sojat Henna Field and harvest basket"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-henna-950/70 via-transparent to-transparent flex items-end p-6">
                <span className="text-xs text-white/90 font-medium">
                  Direct farm harvest from Sojat, Rajasthan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Purity Guarantee vs Toxic Commercial Henna */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-leaf-dark bg-leaf/10 px-3 py-1 rounded-full">
              Truth in Beauty
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900 mt-2">
              ZAHRA HENNA vs. Commercial "Instant" Cones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Toxic Henna Warning Card */}
            <div className="p-8 rounded-3xl bg-red-50/60 border border-red-200/80 space-y-4">
              <div className="flex items-center gap-2 text-red-700 font-heading font-bold text-xl">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>Commercial / "Black" Henna Dangers</span>
              </div>
              <p className="text-xs sm:text-sm text-red-900/80 leading-relaxed font-normal">
                Cheap market cones and boxed hair dyes often lace henna with synthetic additives to give "instant 15-minute black stains":
              </p>
              <ul className="space-y-2.5 text-xs text-red-950/90 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Paraphenylenediamine (PPD):</strong> A potent coal-tar allergen known to cause blistering chemical burns and severe respiratory sensitization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Kerosene & Gasoline Solvents:</strong> Used to accelerate artificial dye penetration into human skin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Metallic Salts & Picramic Acid:</strong> React catastrophically with future salon treatments, causing hair melting and breakage.</span>
                </li>
              </ul>
            </div>

            {/* ZAHRA HENNA Purity Card */}
            <div className="p-8 rounded-3xl bg-leaf/10 border border-leaf/30 space-y-4">
              <div className="flex items-center gap-2 text-leaf-dark font-heading font-bold text-xl">
                <ShieldCheck className="w-5 h-5 text-leaf flex-shrink-0" />
                <span>The Pure ZAHRA Promise</span>
              </div>
              <p className="text-xs sm:text-sm text-leaf-dark leading-relaxed font-normal">
                We formulate with ancestral botanical integrity, utilizing only certified non-toxic food-grade botanicals:
              </p>
              <ul className="space-y-2.5 text-xs text-leaf-dark font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-leaf font-bold">✓</span>
                  <span><strong>100% Pure Lawsonia Inermis:</strong> Triple-cloth sieved through medical-grade 120-mesh nylon for ultra-smooth application.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf font-bold">✓</span>
                  <span><strong>Steam-Distilled Terpene Oils:</strong> Cajeput, wild Lavender, and Australian Eucalyptus naturally drive Lawson dye into skin safely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf font-bold">✓</span>
                  <span><strong>Gas Chromatography (GCMS) Certified:</strong> Every harvest batch is lab-tested and verified with 0.00% synthetic chemicals.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Certificate / Lab Badge Showcase */}
        <div className="bg-henna-950 text-cream rounded-3xl p-8 sm:p-12 border border-gold/40 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto border border-gold/40">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="font-heading text-3xl font-bold text-white">
            Independent Lab Test Certificates
          </h3>
          <p className="text-sm text-cream/80 max-w-2xl mx-auto leading-relaxed font-normal">
            We publish third-party gas chromatography and mass spectrometry testing reports for every seasonal harvest. Batch certificates confirm zero heavy metals (Lead 0.00ppm, Arsenic 0.00ppm, Mercury 0.00ppm).
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-light transition-all shadow-xl"
            >
              <span>Experience Pure Henna Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
