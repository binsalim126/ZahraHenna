"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-24 bg-cream min-h-[70vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-henna-900">
          Something went wrong
        </h1>
        <p className="text-sm text-henna-600 leading-relaxed font-normal">
          We encountered an unexpected condition. Please try refreshing or return home.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-henna-900 text-cream-soft text-xs font-bold uppercase tracking-wider hover:bg-terracotta transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full bg-white border border-henna-200 text-henna-900 text-xs font-semibold uppercase tracking-wider"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
