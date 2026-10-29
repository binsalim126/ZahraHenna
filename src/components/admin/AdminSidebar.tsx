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
} from "lucide-react";
import { Logo } from "@/components/storefront/Logo";

export const AdminSidebar: React.FC = () => {
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

  return (
    <aside className="w-64 bg-henna-dark text-cream flex flex-col border-r border-sand/20 min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-sand/20 space-y-2">
        <Logo variant="light" size="sm" />
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-moringa-soft bg-moringa/15 px-2.5 py-1 rounded-md border border-moringa/30 w-fit">
          <ShieldCheck className="w-3 h-3" />
          <span>Admin Console</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
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
      <div className="p-4 border-t border-sand/20 space-y-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-henna hover:bg-henna/80 text-cream text-xs font-semibold transition-colors"
        >
          <Store className="w-4 h-4 text-sand" />
          <span>View Public Showcase</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl text-cream/60 hover:text-red-400 hover:bg-red-950/30 text-xs font-medium transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
