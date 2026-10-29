import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-3xl border border-henna-200/90 shadow-sm space-y-6 text-sm text-henna-800 leading-relaxed font-normal">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
          ZAHRA HENNA Guarantee
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900">
          Refund & Exchange Policy
        </h1>

        <p>
          We stand by the purity and staining excellence of every batch. If you experience any issue with your order, we are here to make it right.
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          1. Transit Damage or Courier Delay
        </h2>
        <p>
          If your package arrives damaged or is delayed beyond courier guarantees causing paste spoilage, take a quick photo and contact us on WhatsApp (+91 98765 43210) or email within 48 hours. We will immediately dispatch a fresh replacement batch at zero additional cost, or issue a 100% refund.
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          2. Pure Henna Powder & Dry Products
        </h2>
        <p>
          Unopened foil pouches of Pure Henna Powder and Hair Color Powders can be returned within 14 days of receipt for a full product refund.
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          3. How to Request a Refund
        </h2>
        <p>
          Send your order ID (e.g. ZH-2026-1001) to care@zahrahenna.com. Approved refunds are credited back to your original payment method within 3-5 business days.
        </p>
      </div>
    </div>
  );
}
