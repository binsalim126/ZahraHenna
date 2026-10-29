import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 bg-cream min-h-[70vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full bg-henna-100 text-terracotta flex items-center justify-center mx-auto shadow-inner">
          <Sparkles className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
          404 Page Not Found
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900">
          This Botanical Path Wandered Off
        </h1>
        <p className="text-sm text-henna-600 leading-relaxed font-normal">
          The page you are looking for has been moved or does not exist. Explore our pure Sojat henna collections below.
        </p>
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-henna-900 text-cream-soft text-xs font-bold uppercase tracking-wider hover:bg-terracotta transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dispensary</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
