"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/storefront/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@zahrahenna.com");
  const [password, setPassword] = useState("ZahraAdmin2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate secure credential / Supabase auth check
    setTimeout(() => {
      if (email && password) {
        try {
          localStorage.setItem("zahra_admin_auth", "true");
        } catch {
          // Ignore
        }
        router.push("/admin");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-moringa/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10">
        <Logo size="lg" />
        <h2 className="font-heading text-2xl font-bold text-henna">
          Admin Portal Authentication
        </h2>
        <p className="text-xs text-henna-dark/70">
          Sign in to manage cones inventory, WhatsApp orders, and customer enquiries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-sand/25 shadow-xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold text-center border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-henna-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-cream border border-sand/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-henna-dark block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-henna-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cream border border-sand/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-henna-dark focus:outline-none focus:border-henna font-medium"
                />
              </div>
              <p className="text-[10px] text-moringa mt-1">
                Default: admin@zahrahenna.com / ZahraAdmin2026!
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-henna hover:bg-henna-dark text-white font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-sand/15 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-henna font-semibold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Showcase</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
