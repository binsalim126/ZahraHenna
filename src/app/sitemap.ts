import { MetadataRoute } from "next";
import { Store } from "@/lib/data/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zahrahenna.com";
  const products = Store.getProducts();

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticUrls = [
    "",
    "/shop",
    "/process",
    "/about",
    "/contact",
    "/track-order",
    "/privacy-policy",
    "/terms-of-service",
    "/shipping-policy",
    "/refund-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.7,
  }));

  return [...staticUrls, ...productUrls];
}
