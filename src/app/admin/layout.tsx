"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If on the login page, don't check authentication
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    try {
      const auth = localStorage.getItem("zahra_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/admin/login");
      }
    } catch {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // If on login page, render children directly with NO admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state while checking authentication
  if (isAuthenticated === false || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
        <div className="w-8 h-8 border-3 border-henna border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-henna-dark/70 font-semibold">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  const mobileNav = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      {/* Sidebar with mobile drawer support */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content with bottom padding on mobile for the bottom bar */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto max-w-full overflow-x-hidden">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (Phone size only) */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-henna-dark text-cream border-t border-sand/20 z-40 px-2 py-2 flex items-center justify-around shadow-2xl">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-all ${
                  active
                    ? "text-sand bg-white/10 font-bold"
                    : "text-cream/65 hover:text-cream"
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
