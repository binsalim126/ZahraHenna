import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-3xl border border-henna-200/90 shadow-sm space-y-6 text-sm text-henna-800 leading-relaxed font-normal">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
          ZAHRA HENNA Legal
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-henna-500">Last updated: October 2026</p>

        <p>
          At ZAHRA HENNA ("we", "our", or "us"), we are deeply committed to protecting your personal information and your privacy rights. This Privacy Policy outlines how we collect, use, disclose, and safeguard your details when you visit and purchase from our website.
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          1. Information We Collect
        </h2>
        <p>
          When you place an order or contact us, we collect information you provide directly: your name, shipping address, billing address, phone number, email address, and order customization preferences.
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          2. Payment Information Security
        </h2>
        <p>
          We do not store your complete credit card or debit card details on our servers. All online transactions are processed through certified PCI-DSS compliant gateways (Razorpay and Stripe) utilizing 256-bit bank-grade SSL encryption.
        </p>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          3. How We Use Your Data
        </h2>
        <p>
          We use your information exclusively to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li>Fulfill, pack, and ship your botanical orders via express courier services.</li>
          <li>Send live SMS and email notifications regarding your package tracking number.</li>
          <li>Provide customer concierge support for henna paste mixing and storage advice.</li>
          <li>Prevent fraudulent transactions and secure our platform.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-henna-900 pt-4">
          4. Contact Our Privacy Officer
        </h2>
        <p>
          If you have questions regarding your data or wish to delete your account record, please contact care@zahrahenna.com.
        </p>
      </div>
    </div>
  );
}
