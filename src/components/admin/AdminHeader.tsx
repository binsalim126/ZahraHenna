"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Plus, Menu } from "lucide-react";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-sand/20 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger to open sidebar */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-xl text-henna-dark hover:bg-cream hover:text-henna transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm font-bold text-henna tracking-tight">
            Zahra Henna
          </span>
          <span className="text-sand/60 text-xs">/</span>
          <span className="text-[11px] sm:text-xs font-semibold text-moringa uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-henna text-white text-[11px] sm:text-xs font-bold hover:bg-henna-dark transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="text-xs font-semibold text-henna hover:text-henna-dark transition-colors flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-cream"
        >
          <span className="hidden sm:inline">Live Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Profile Avatar */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-henna text-sand flex items-center justify-center font-bold text-xs shadow-sm">
          A
        </div>
      </div>
    </header>
  );
};
