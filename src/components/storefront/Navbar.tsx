"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { Logo, LogoEmblem } from "./Logo";
import { useCart } from "@/lib/cart-context";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-[#FAF3E8]/95 backdrop-blur-md border-b border-[#C98A4B]/25 ${
        isScrolled
          ? "py-2.5 shadow-[0_4px_24px_rgba(90,46,26,0.08)]"
          : "py-3 sm:py-3.5 shadow-[0_2px_12px_rgba(90,46,26,0.04)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* =========================================================================
            DESKTOP NAVBAR (hidden on mobile, visible on md and up)
           ========================================================================= */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo on Left */}
          <div className="flex-shrink-0 flex items-center">
            <Logo size="md" />
          </div>

          {/* Desktop Nav Links in Center */}
          <nav className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  isActive(link.href)
                    ? "text-henna font-bold"
                    : "text-henna-dark/80 hover:text-henna"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-moringa rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side: Cart Icon with Badge + "Shop Now" Button (NO ADMIN OPTION) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Shopping Bag Button */}
            <button
              onClick={openDrawer}
              className="relative p-2.5 text-henna-dark hover:text-henna rounded-full hover:bg-sand/15 transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-moringa text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* "Shop Now" Button in Henna Brown (#5A2E1A) */}
            <Link
              href="/shop"
              className="btn-shimmer px-5 py-2.5 rounded-full bg-henna text-white font-semibold text-xs tracking-wider uppercase shadow-luxury hover:bg-henna-dark inline-flex items-center gap-1.5"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            PHONE / TABLET SIZE NAVBAR (visible on mobile <md)
            Layout: [Logo Left] ------ [Name Central] ------ [Burger Right + Cart]
           ========================================================================= */}
        <div className="flex md:hidden items-center justify-between relative py-0.5">
          {/* 1. LOGO ON LEFT */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center p-1 rounded-full hover:bg-sand/15 transition-colors"
            aria-label="Zahra Henna Home"
          >
            <LogoEmblem isLight={false} className="w-8 h-8" />
          </Link>

          {/* 2. NAME CENTRAL */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-center absolute left-1/2 -translate-x-1/2"
            aria-label="Zahra Henna"
          >
            <span className="font-heading font-extrabold text-base sm:text-lg text-henna leading-tight tracking-tight">
              Zahra <span className="text-henna-dark font-medium">Henna</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.22em] font-bold text-moringa -mt-0.5">
              100% Natural Henna
            </span>
          </Link>

          {/* 3. BURGER + CART ON RIGHT SIDE */}
          <div className="flex items-center gap-0.5">
            {/* Cart Icon */}
            <button
              onClick={openDrawer}
              className="relative p-2 text-henna-dark hover:text-henna rounded-full hover:bg-sand/15 transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-moringa text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger Button on Right */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-henna-dark hover:text-henna focus:outline-none rounded-xl hover:bg-sand/15 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-henna" />
              ) : (
                <Menu className="w-6 h-6 text-henna-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE SLIDE-DOWN DRAWER (WARM CREAM PALETTE, NO WHITE)
         ========================================================================= */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 top-[57px] bg-henna-dark/45 backdrop-blur-sm z-30"
          />
          <div className="md:hidden relative z-40 bg-[#FAF3E8] border-b border-[#C98A4B]/30 px-5 pt-3 pb-6 space-y-3 shadow-luxury">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all ${
                    isActive(link.href)
                      ? "bg-henna text-white shadow-sm"
                      : "text-henna-dark hover:bg-[#F3E7D5]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#C98A4B]/20">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-shimmer w-full py-3.5 rounded-full bg-henna text-white text-xs font-bold text-center uppercase tracking-wider shadow-luxury flex items-center justify-center gap-2"
              >
                <span>Shop Cones Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
