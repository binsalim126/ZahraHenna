"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck } from "lucide-react";

export const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("zahra_cookie_consent");
      if (!consent) {
        setShowBanner(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("zahra_cookie_consent", "accepted");
    } catch {
      // Ignore
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("zahra_cookie_consent", "declined");
    } catch {
      // Ignore
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 bg-cream-soft/95 backdrop-blur-md border border-henna-200/90 rounded-2xl p-5 shadow-2xl text-xs text-henna-800">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-henna-100 flex items-center justify-center flex-shrink-0 text-terracotta">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-henna-900 text-sm">
            We value your botanical experience & privacy
          </p>
          <p className="text-henna-700 leading-relaxed">
            We use essential cookies to keep your shopping bag, secure checkout, and preferred currency synchronized. Read our{" "}
            <Link href="/privacy-policy" className="text-terracotta underline font-medium">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-xl bg-henna-900 text-cream-soft font-medium hover:bg-terracotta transition-colors shadow-sm"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3.5 py-2 rounded-xl bg-henna-100 text-henna-800 font-medium hover:bg-henna-200 transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
