"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquare,
  Settings,
  Store,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";
import { Logo } from "@/components/storefront/Logo";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders (WhatsApp)", href: "/admin/orders", icon: ShoppingBag },
    { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("zahra_admin_auth");
    } catch {
      // Ignore
    }
    router.push("/admin/login");
  };

  const content = (
    <div className="w-64 bg-henna-dark text-cream flex flex-col border-r border-sand/20 h-full">
      {/* Brand Header */}
      <div className="p-5 border-b border-sand/20 flex items-center justify-between">
        <div className="space-y-1.5">
          <Logo variant="light" size="sm" />
          <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-moringa bg-moringa/15 px-2 py-0.5 rounded-md border border-moringa/30 w-fit">
            <ShieldCheck className="w-3 h-3" />
            <span>Admin Console</span>
          </div>
        </div>

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-cream/70 hover:text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                active
                  ? "bg-henna text-white shadow-md font-bold"
                  : "text-cream/75 hover:bg-henna/40 hover:text-cream"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions: Back to Store + Logout */}
      <div className="p-3.5 border-t border-sand/20 space-y-2">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-henna hover:bg-henna/80 text-cream text-xs font-semibold transition-colors"
        >
          <Store className="w-4 h-4 text-sand" />
          <span>View Public Site</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-cream/60 hover:text-red-400 hover:bg-red-950/30 text-xs font-medium transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen flex-shrink-0">
        {content}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer container */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-henna-dark shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
