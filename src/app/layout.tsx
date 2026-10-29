import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

export const metadata: Metadata = {
  title: "Zahra Henna | 100% Natural. Zero Chemicals. Pure Henna.",
  description:
    "Handcrafted natural henna cones made with pure henna leaf powder, moringa, and therapeutic essential oils for rich, dark-brown stains. Individually sealed in clear plastic wrap with fine tip.",
  keywords: [
    "Zahra Henna",
    "natural henna cones",
    "pure henna cones",
    "chemical free henna",
    "zero PPD henna",
    "moringa henna",
    "bridal henna cones",
    "wholesale henna cones",
  ],
  authors: [{ name: "Zahra Henna" }],
  openGraph: {
    title: "Zahra Henna — 100% Natural. Zero Chemicals. Pure Henna.",
    description:
      "Handcrafted natural henna cones, individually sealed in clear wrap with caramel-brown paste and fine tip for intricate bridal designs.",
    url: "https://zahrahenna.com",
    siteName: "Zahra Henna",
    images: [
      {
        url: "/assets/images/henna-cones-in-hand.png",
        width: 1200,
        height: 630,
        alt: "Zahra Henna Cones in Hand",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-cream text-henna-dark antialiased selection:bg-sand selection:text-white overflow-x-hidden">
        <CartProvider>
          <StorefrontShell>{children}</StorefrontShell>
        </CartProvider>
      </body>
    </html>
  );
}
