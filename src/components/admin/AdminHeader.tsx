"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = () => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("zahra_admin_auth");
      localStorage.removeItem("zahra_admin_email");
    } catch {
      // Ignore
    }
    router.replace("/admin/login");
  };

  return (
    <header className="bg-white border-b border-sand/20 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
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

      {/* User Avatar + Quick Live Link + Logout */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-semibold text-henna hover:text-henna-dark transition-colors px-2.5 py-1 rounded-lg hover:bg-cream hidden sm:inline-block"
        >
          Live Site ↗
        </Link>

        {/* User Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-henna text-sand flex items-center justify-center font-extrabold text-xs shadow-sm border border-sand/40"
          title="Admin User (Zahra Henna Owner)"
        >
          A
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-1.5 text-henna-dark/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs flex items-center gap-1"
          title="Sign Out of Admin Dashboard"
          aria-label="Log Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] font-bold hidden sm:inline-block">Exit</span>
        </button>
      </div>
    </header>
  );
};
