"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";
import Link from "next/link";

interface AnnouncementBarProps {
  message?: string;
  link?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = "🌿 Handcrafted in Small Batches | 100% Pure Sojat Henna | Free Express Delivery over ₹499",
  link = "/shop",
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside aria-label="Announcement" className="bg-henna-900 text-cream-soft py-2 px-4 text-xs font-medium tracking-wide relative border-b border-gold/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse hidden sm:inline" />
          <Link href={link} className="hover:text-gold transition-colors underline-offset-4 hover:underline">
            {message}
          </Link>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-cream/60 hover:text-cream ml-2 transition-colors p-1"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
