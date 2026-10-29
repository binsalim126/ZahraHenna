"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";
import { Store } from "@/lib/data/store";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = Store.getFaqs();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    // Save enquiry into Store / Database so it appears in Admin Enquiries!
    Store.addEnquiry({
      id: `enq-${Date.now()}`,
      name: formData.name,
      phone: formData.phone || "Not provided",
      email: formData.email || "Not provided",
      message: formData.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  const handleSendOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Zahra Henna 👋
Name: ${formData.name || "Customer"}
Phone: ${formData.phone || "Not provided"}
Email: ${formData.email || "Not provided"}
Message: ${formData.message || "I have an enquiry about your natural henna cones."}`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="py-16 bg-luxury-home bg-henna-filigree min-h-screen space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full">
            We Are Here For You
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-henna tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-henna-dark/75 leading-relaxed font-normal">
            Whether you need custom bridal batches, wholesale salon supply, or advice on paste storage — reach out directly to us!
          </p>
        </div>

        {/* 4 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WhatsApp Card */}
          <a
            href={BRAND_CONFIG.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm hover:shadow-md transition-all space-y-3 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-moringa text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 fill-white stroke-none" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-moringa tracking-wider block">
                Instant Chat
              </span>
              <h3 className="font-heading font-bold text-base text-henna-dark">
                WhatsApp Direct
              </h3>
              <p className="text-xs text-henna-dark/70 mt-1 font-mono">
                {BRAND_CONFIG.phone}
              </p>
            </div>
          </a>

          {/* Phone Card */}
          <div className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-henna text-white flex items-center justify-center shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">
                Direct Helpline
              </span>
              <h3 className="font-heading font-bold text-base text-henna-dark">
                Phone Support
              </h3>
              <p className="text-xs text-henna-dark/70 mt-1">
                {BRAND_CONFIG.phone} (10am–7pm)
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sand text-white flex items-center justify-center shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-sand tracking-wider block">
                Inquiries & Orders
              </span>
              <h3 className="font-heading font-bold text-base text-henna-dark">
                Email Us
              </h3>
              <p className="text-xs text-henna-dark/70 mt-1">
                {BRAND_CONFIG.email}
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-henna-dark text-white flex items-center justify-center shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-moringa tracking-wider block">
                Workshop & Studio
              </span>
              <h3 className="font-heading font-bold text-base text-henna-dark">
                Studio Hub
              </h3>
              <p className="text-xs text-henna-dark/70 mt-1">
                {BRAND_CONFIG.location}
              </p>
            </div>
          </div>
        </div>

        {/* Enquiry Form + Social Links & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-sand/20 shadow-md space-y-6">
            <div>
              <h2 className="font-heading font-bold text-2xl text-henna">
                Send Us an Enquiry
              </h2>
              <p className="text-xs text-henna-dark/70 mt-1">
                Fill out this form or click "Send on WhatsApp" to open our direct line immediately.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-moringa/15 border border-moringa/30 text-center space-y-3 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-moringa mx-auto" />
                <h3 className="font-heading font-bold text-xl text-henna-dark">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs text-henna-dark/80 max-w-sm mx-auto leading-relaxed">
                  Your message has been saved in our system. A Zahra Henna specialist will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-henna text-white text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-henna-dark block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohini Mehta"
                    className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-henna-dark block mb-1">
                      Phone Number (for WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-henna-dark block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rohini@example.com"
                      className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-henna-dark block mb-1">
                    Your Message / Custom Requirement *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your event, number of cones needed, or wholesale salon requirements..."
                    className="w-full bg-cream border border-sand/30 rounded-xl p-3 text-xs text-henna-dark focus:outline-none focus:border-henna"
                  />
                </div>

                {/* Form Buttons with Shimmer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    className="btn-shimmer w-full py-3.5 px-6 rounded-2xl bg-henna text-white font-bold uppercase tracking-wider text-xs hover:bg-henna-dark shadow-luxury flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendOnWhatsApp}
                    className="btn-shimmer w-full py-3.5 px-6 rounded-2xl bg-moringa hover:bg-[#4E7528] text-white font-bold uppercase tracking-wider text-xs shadow-luxury flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Social Media Links & Google Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            {/* Social Media Card */}
            <div className="bg-white p-7 rounded-3xl border border-sand/20 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-henna">
                Follow Zahra Henna
              </h3>
              <p className="text-xs text-henna-dark/70">
                Join our botanical community for daily bridal stain results, mixing masterclasses, and fresh harvest drops.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href={BRAND_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream hover:bg-sand/20 text-henna text-xs font-semibold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BRAND_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream hover:bg-sand/20 text-henna text-xs font-semibold transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
                <a
                  href={BRAND_CONFIG.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream hover:bg-sand/20 text-henna text-xs font-semibold transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
                <a
                  href={BRAND_CONFIG.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-moringa/15 hover:bg-moringa/25 text-moringa text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map Placeholder */}
            <div className="bg-white p-6 rounded-3xl border border-sand/20 shadow-sm space-y-3">
              <h3 className="font-heading font-bold text-lg text-henna">
                Our Workshop Location
              </h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-cream border border-sand/20 flex items-center justify-center text-center p-4">
                <div className="space-y-1">
                  <MapPin className="w-8 h-8 text-henna mx-auto animate-bounce" />
                  <p className="font-heading font-bold text-sm text-henna-dark">
                    Zahra Henna Artisanal Studio
                  </p>
                  <p className="text-[11px] text-henna-dark/70">
                    Sojat Henna Belt, Pali District, Rajasthan 306104
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-moringa bg-moringa/15 px-3 py-1 rounded-full">
              Common Questions
            </span>
            <h2 className="font-heading text-3xl font-bold text-henna">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-sand/20 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-henna-dark hover:text-henna transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-moringa flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-henna-dark/80 leading-relaxed border-t border-sand/15 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
