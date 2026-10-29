"use client";

import React from "react";
import Link from "next/link";
import { Bell, Shield, ExternalLink, Plus } from "lucide-react";

export const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-henna-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-xs text-henna-500 font-medium">ZAHRA HENNA Workspace</span>
        <span className="text-henna-300">/</span>
        <span className="text-xs font-bold text-henna-900 uppercase tracking-wider">
          Production Store Management
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Product</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="text-xs font-medium text-henna-700 hover:text-terracotta transition-colors flex items-center gap-1"
        >
          <span>Live Store</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Admin profile badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-henna-200">
          <div className="w-8 h-8 rounded-full bg-henna-900 text-gold flex items-center justify-center font-bold text-xs">
            A
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-henna-900 block leading-tight">
              Admin User
            </span>
            <span className="text-[10px] text-leaf font-medium block">
              Store Owner (Full Access)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
