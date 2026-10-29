import React from "react";

export default function ShippingPolicyPage() {
  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-3xl border border-henna-200/90 shadow-sm space-y-6 text-sm text-henna-800 leading-relaxed font-normal">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
          ZAHRA HENNA Logistics
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900">
          Shipping & Delivery Policy
        </h1>

        <p>
          Because our ready-to-use henna cones and bridal pastes are handmade fresh without chemical preservatives, proper thermal packing and swift shipping are our highest priorities.
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          1. Dispatch Timelines
        </h2>
        <p>
          Fresh henna cones are churned and rolled in batches every Monday and Thursday. Orders placed before 1:00 PM on batch days are dispatched the same day via express air couriers (BlueDart / DTDC Air).
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          2. Free Shipping Threshold
        </h2>
        <p>
          We provide <strong>FREE Express Air Shipping</strong> on all domestic orders over <strong>₹499</strong>. For orders below ₹499, a flat subsidised fee of ₹60 is applied at checkout.
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          3. Immediate Storage Upon Arrival
        </h2>
        <p>
          Natural cones arrive in insulated thermal envelopes. <strong>Please place your cones directly into the freezer upon delivery</strong> unless you plan to use them immediately. In the freezer, natural cones retain peak staining dye vitality for up to 6 months.
        </p>
      </div>
    </div>
  );
}
