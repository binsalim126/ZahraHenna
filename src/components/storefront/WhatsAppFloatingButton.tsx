"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const defaultMessage = encodeURIComponent(
    "Hello Zahra Henna 👋 I would like to enquire about your natural henna cones."
  );
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end flex-col gap-2">
      {/* Tooltip greeting */}
      {showTooltip && (
        <div className="bg-white/95 backdrop-blur-md text-henna-dark border border-sand/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-xl text-[11px] sm:text-xs max-w-[240px] sm:max-w-xs flex items-center gap-2">
          <span className="font-medium">
            👋 Order or chat on WhatsApp!
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-henna-dark/40 hover:text-henna-dark p-0.5"
            aria-label="Dismiss chat tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with Shimmer & Glow */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-shimmer w-13 h-13 sm:w-14 sm:h-14 p-3 rounded-full bg-moringa hover:bg-[#4E7528] text-white flex items-center justify-center shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:scale-110 active:scale-95 group border-2 border-white relative"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-moringa/40 animate-ping opacity-40 pointer-events-none" />
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none group-hover:rotate-6 transition-transform relative z-10" />
      </a>
    </div>
  );
};
