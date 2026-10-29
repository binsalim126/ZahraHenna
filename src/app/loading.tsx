import React from "react";

export default function Loading() {
  return (
    <div className="py-32 bg-cream flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-henna-200 border-t-terracotta animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-gold/30 animate-pulse" />
      </div>
      <p className="font-heading text-sm font-semibold tracking-widest uppercase text-henna-800">
        Preparing Pure Henna...
      </p>
    </div>
  );
}
