"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";
import { INITIAL_TESTIMONIALS } from "@/lib/data/mock-data";

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = INITIAL_TESTIMONIALS;

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const active = testimonials[currentIndex];

  return (
    <section className="py-20 bg-cream-soft border-t border-henna-200/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
            Bridal Artists & Customers
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-henna-900 mt-3">
            Loved Across 10,000+ Celebrations
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="bg-cream rounded-3xl p-8 sm:p-12 border border-henna-200/90 shadow-xl relative">
          <Quote className="absolute top-6 right-8 w-16 h-16 text-henna-200/60 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gold flex-shrink-0 shadow-md">
              <Image
                src={active.image}
                alt={active.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Quote details */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-gold">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="font-heading text-lg sm:text-xl text-henna-900 leading-relaxed italic">
                “{active.quote}”
              </blockquote>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-heading font-bold text-base text-henna-900">
                    {active.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-leaf bg-leaf/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
                <p className="text-xs text-henna-600 mt-0.5">
                  {active.role} • {active.location}
                </p>
              </div>
            </div>
          </div>

          {/* Stepper controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-henna-200/70">
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? "w-8 bg-terracotta" : "w-2 bg-henna-200"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white border border-henna-200 flex items-center justify-center text-henna-800 hover:bg-henna-100 hover:text-terracotta transition-colors shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white border border-henna-200 flex items-center justify-center text-henna-800 hover:bg-henna-100 hover:text-terracotta transition-colors shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
