"use client";

import React, { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2, ShieldCheck } from "lucide-react";
import { Store } from "@/lib/data/store";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(Store.getReviews(false));

  const handleToggle = (id: string) => {
    Store.toggleReviewApproval(id);
    setReviews([...Store.getReviews(false)]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this review permanently?")) {
      Store.deleteReview(id);
      setReviews([...Store.getReviews(false)]);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl font-bold text-henna-900">
          Reviews Moderation Queue
        </h1>
        <p className="text-xs text-henna-600 mt-1">
          Approve or delete customer testimonials and stain feedback.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white border border-henna-200/90 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-henna-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-heading font-bold text-base text-henna-900">
                  {rev.author}
                </span>
                <span className="text-xs text-henna-500 font-medium">
                  reviewed <strong>{rev.productTitle}</strong>
                </span>
                {rev.isVerifiedPurchase && (
                  <span className="text-[10px] font-semibold text-leaf bg-leaf/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-[11px] text-henna-400">
                  {formatDate(rev.createdAt)}
                </span>
              </div>
            </div>

            {rev.title && (
              <h3 className="font-bold text-sm text-henna-900">{rev.title}</h3>
            )}

            <p className="text-xs sm:text-sm text-henna-700 leading-relaxed font-normal">
              "{rev.comment}"
            </p>

            <div className="pt-2 flex items-center justify-between">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  rev.isApproved ? "bg-leaf/10 text-leaf" : "bg-gold/20 text-henna-900"
                }`}
              >
                {rev.isApproved ? "✓ Public on Store" : "Pending Approval"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggle(rev.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    rev.isApproved
                      ? "bg-henna-100 text-henna-800 hover:bg-henna-200"
                      : "bg-leaf text-white hover:bg-leaf-dark"
                  }`}
                >
                  {rev.isApproved ? "Hide from Store" : "Approve & Publish"}
                </button>

                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
