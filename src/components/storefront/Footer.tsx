"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND_CONFIG } from "@/lib/config";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-henna-dark text-cream pt-16 pb-10 border-t border-sand/20 relative overflow-hidden">
      {/* Background subtle mandala watermark */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-moringa/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-sand/15">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <Logo variant="light" size="lg" />
            <p className="text-xs text-cream/75 leading-relaxed pr-2">
              Natural henna cones handcrafted for bridal artists, distributors, and lovers of pure beauty. 100% natural, zero chemicals, pure henna.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-henna flex items-center justify-center text-cream hover:text-soft hover:bg-moringa transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-henna flex items-center justify-center text-cream hover:text-soft hover:bg-moringa transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-henna flex items-center justify-center text-cream hover:text-soft hover:bg-moringa transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-moringa flex items-center justify-center text-white hover:bg-moringa-soft transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-cream text-base tracking-tight">Quick Links</h4>
            <ul className="space-y-2 text-xs text-cream/75">
              <li>
                <Link href="/" className="hover:text-sand transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sand transition-colors">
                  Our Journey & Values
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-sand transition-colors">
                  Shop Cones & Powder
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-sand transition-colors">
                  Your Cart & WhatsApp Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sand transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sand/80 hover:text-sand transition-colors font-medium">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-cream text-base tracking-tight">Henna Collection</h4>
            <ul className="space-y-2 text-xs text-cream/75">
              <li>
                <Link href="/shop?category=pack-of-12" className="hover:text-sand transition-colors">
                  Pack of 12 Cones
                </Link>
              </li>
              <li>
                <Link href="/shop?category=single-cone" className="hover:text-sand transition-colors">
                  Single Precision Cone
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bulk-wholesale" className="hover:text-sand transition-colors">
                  Bulk Wholesale (Box of 50)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=henna-powder" className="hover:text-sand transition-colors">
                  Pure Henna Leaf Powder
                </Link>
              </li>
              <li>
                <Link href="/shop?category=henna-powder" className="hover:text-sand transition-colors">
                  Moringa & Henna Blend
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Ordering */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-cream text-base tracking-tight">Direct Orders</h4>
            <p className="text-xs text-cream/75 leading-relaxed">
              We process all customer orders and bulk salon enquiries directly on WhatsApp:
            </p>
            <div className="space-y-2 text-xs text-cream/80 pt-1">
              <a
                href={BRAND_CONFIG.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-moringa-soft transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-moringa-soft" />
                <span className="font-semibold">{BRAND_CONFIG.phone}</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sand" />
                <span>{BRAND_CONFIG.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sand" />
                <span>{BRAND_CONFIG.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Zahra Henna. All rights reserved.</p>
          <p className="text-xs">
            100% Natural • Zero Chemicals • Pure Henna
          </p>
        </div>
      </div>
    </footer>
  );
};
