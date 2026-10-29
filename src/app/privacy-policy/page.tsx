import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-luxury-home bg-henna-filigree min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm p-6 sm:p-12 rounded-3xl border border-sand/25 shadow-sm space-y-5 text-xs sm:text-sm text-henna-dark/80 leading-relaxed font-normal text-left">
        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-moringa bg-moringa/15 px-3 py-1 rounded-full border border-moringa/25 inline-block">
          Zahra Henna Legal
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-henna tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-[11px] text-henna-dark/50">Last updated: October 2026</p>

        <p>
          At <strong>Zahra Henna</strong> ("we", "our", or "us"), we are deeply committed to protecting your personal information and your privacy rights. This Privacy Policy outlines how we collect, use, and safeguard your details when you visit and purchase from our storefront.
        </p>

        <h2 className="font-heading text-lg sm:text-xl font-bold text-henna pt-3">
          1. Information We Collect
        </h2>
        <p>
          When you place an order or contact us, we collect information you provide directly: your name, shipping address, phone number (for WhatsApp updates and courier delivery), email address, and order preferences.
        </p>

        <h2 className="font-heading text-lg sm:text-xl font-bold text-henna pt-3">
          2. Payment Information Security
        </h2>
        <p>
          We do not store your complete credit card or debit card details on our servers. All transactions are securely processed with 256-bit bank-grade SSL encryption through verified gateways.
        </p>

        <h2 className="font-heading text-lg sm:text-xl font-bold text-henna pt-3">
          3. How We Use Your Data
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li>Fulfill, pack, and ship your botanical orders via express courier services.</li>
          <li>Send live courier tracking notifications and dispatch updates via WhatsApp.</li>
          <li>Provide customer support for henna paste application and freezer storage.</li>
          <li>Ensure platform security and prevent fraudulent transactions.</li>
        </ul>

        <h2 className="font-heading text-lg sm:text-xl font-bold text-henna pt-3">
          4. Contact Our Privacy Team
        </h2>
        <p>
          If you have questions regarding your data, please contact <strong>care@zahrahenna.com</strong> or WhatsApp <strong>+91 7907118180</strong>.
        </p>
      </div>
    </div>
  );
}
