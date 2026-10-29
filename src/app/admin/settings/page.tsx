"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle, MessageCircle, Share2, Sparkles } from "lucide-react";
import { Store } from "@/lib/data/store";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(Store.getSettings());
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Store.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
          Storefront & WhatsApp Settings
        </h1>
        <p className="text-xs text-henna-dark/70 mt-1">
          Update your direct WhatsApp order number, social handles, studio contact, and hero banner copy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* WhatsApp & Contact Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand/20 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-henna flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-moringa" />
            <span>WhatsApp Ordering & Studio Contact</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                WhatsApp Order Line (Country code + digits, e.g. 917907118180) *
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) =>
                  setSettings({ ...settings, whatsappNumber: e.target.value })
                }
                placeholder="91XXXXXXXXXX"
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2.5 text-xs text-henna-dark font-mono font-bold focus:outline-none focus:border-henna"
              />
              <p className="text-[10px] text-henna-dark/50 mt-1">
                All "Checkout via WhatsApp" clicks trigger messages to this number.
              </p>
            </div>

            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Support Email Address
              </label>
              <input
                type="email"
                required
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings({ ...settings, supportEmail: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Helpline Phone
              </label>
              <input
                type="text"
                required
                value={settings.supportPhone}
                onChange={(e) =>
                  setSettings({ ...settings, supportPhone: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>

            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Studio Location Address
              </label>
              <input
                type="text"
                required
                value={settings.location}
                onChange={(e) =>
                  setSettings({ ...settings, location: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand/20 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-henna flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sand" />
            <span>Homepage Hero Copy</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Hero Main Headline
              </label>
              <input
                type="text"
                required
                value={settings.heroHeadline}
                onChange={(e) =>
                  setSettings({ ...settings, heroHeadline: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>

            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Hero Sub-text
              </label>
              <textarea
                rows={2}
                required
                value={settings.heroSubheadline}
                onChange={(e) =>
                  setSettings({ ...settings, heroSubheadline: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl p-3 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand/20 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-henna flex items-center gap-2">
            <Share2 className="w-5 h-5 text-sand" />
            <span>Social Media Channels</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) =>
                  setSettings({ ...settings, instagram: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>

            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebook}
                onChange={(e) =>
                  setSettings({ ...settings, facebook: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>

            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube}
                onChange={(e) =>
                  setSettings({ ...settings, youtube: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>

            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                TikTok URL
              </label>
              <input
                type="url"
                value={settings.tiktok}
                onChange={(e) =>
                  setSettings({ ...settings, tiktok: e.target.value })
                }
                className="w-full bg-cream border border-sand/30 rounded-xl px-3.5 py-2 text-xs text-henna-dark focus:outline-none focus:border-henna"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          {saved && (
            <span className="text-xs font-bold text-moringa flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Settings updated successfully!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-8 py-3.5 rounded-2xl bg-henna text-white font-bold uppercase tracking-wider text-xs hover:bg-henna-dark transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
