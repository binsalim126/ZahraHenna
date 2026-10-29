"use client";

import React from "react";
import Link from "next/link";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = () => {
  return (
    <header className="bg-white border-b border-sand/20 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Title: Dashboard / Admin Panel */}
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-moringa animate-pulse" />
        <h1 className="font-heading font-extrabold text-base sm:text-lg text-henna tracking-tight">
          Admin Panel
        </h1>
        <span className="text-[10px] text-henna-dark/60 font-semibold bg-cream px-2 py-0.5 rounded-full border border-sand/20 hidden sm:inline-block">
          Zahra Henna Store
        </span>
      </div>

      {/* User Image / Avatar Only */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-semibold text-henna hover:text-henna-dark transition-colors px-2.5 py-1 rounded-lg hover:bg-cream hidden sm:inline-block"
        >
          Live Site ↗
        </Link>
        <div
          className="w-8 h-8 rounded-full bg-henna text-sand flex items-center justify-center font-extrabold text-xs shadow-sm border border-sand/40"
          title="Admin User (Zahra Henna Owner)"
        >
          A
        </div>
      </div>
    </header>
  );
};
