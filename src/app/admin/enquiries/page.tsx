"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Phone, Clock, Check, Trash2 } from "lucide-react";
import { Store, Enquiry } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(Store.getEnquiries());

  const handleMarkRead = (id: string) => {
    Store.markEnquiryRead(id);
    setEnquiries([...Store.getEnquiries()]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this message?")) {
      Store.deleteEnquiry(id);
      setEnquiries([...Store.getEnquiries()]);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
            Customer Enquiries & Messages
          </h1>
          <p className="text-xs text-henna-dark/70 mt-1">
            Incoming inquiries submitted through the website contact and wholesale form.
          </p>
        </div>

        <div className="text-xs text-henna-dark font-medium bg-white border border-sand/20 px-4 py-2 rounded-2xl shadow-sm">
          Total Messages: <strong>{enquiries.length}</strong>
        </div>
      </div>

      <div className="space-y-4">
        {enquiries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-sand/30">
            <MessageSquare className="w-10 h-10 text-sand mx-auto mb-2" />
            <h3 className="font-heading text-lg font-bold text-henna">
              No Messages Yet
            </h3>
            <p className="text-xs text-henna-dark/60 mt-1">
              New customer inquiries will appear here automatically.
            </p>
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className={`p-6 rounded-3xl border transition-all ${
                enq.isRead
                  ? "bg-white border-sand/20 opacity-90 shadow-sm"
                  : "bg-white border-moringa ring-1 ring-moringa/30 shadow-md"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand/15 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-base text-henna">
                    {enq.name}
                  </span>
                  {!enq.isRead && (
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-moringa/15 text-moringa px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-henna-dark/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDate(enq.createdAt)}</span>
                  </span>
                </div>
              </div>

              {/* Message body */}
              <div className="py-3 text-xs sm:text-sm text-henna-dark leading-relaxed font-normal">
                "{enq.message}"
              </div>

              <div className="pt-3 border-t border-sand/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-henna-dark/70">
                  <a
                    href={`tel:${enq.phone}`}
                    className="flex items-center gap-1.5 hover:text-henna font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-sand" />
                    <span>{enq.phone}</span>
                  </a>
                  <a
                    href={`mailto:${enq.email}`}
                    className="flex items-center gap-1.5 hover:text-henna font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-sand" />
                    <span>{enq.email}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  {!enq.isRead && (
                    <button
                      onClick={() => handleMarkRead(enq.id)}
                      className="px-3 py-1.5 rounded-xl bg-moringa/15 text-moringa font-bold text-xs hover:bg-moringa/25 transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark as Read</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(enq.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
