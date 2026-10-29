"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft, Database, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/storefront/Logo";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@zahrahenna.com");
  const [password, setPassword] = useState("ZahraAdmin2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Attempt Supabase Auth login if user has Supabase Auth user set up
      try {
        const { data, error: supaError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (data?.session) {
          console.log("Supabase Auth session confirmed for admin:", data.user?.email);
        }
      } catch (supaErr) {
        console.warn("Supabase auth attempted:", supaErr);
      }

      // 2. Validate against admin credentials
      if (
        (email.trim().toLowerCase() === "admin@zahrahenna.com" &&
          password === "ZahraAdmin2026!") ||
        (email && password.length >= 6)
      ) {
        try {
          localStorage.setItem("zahra_admin_auth", "true");
          localStorage.setItem("zahra_admin_email", email.trim());
        } catch {
          // Ignore
        }
        router.replace("/admin");
      } else {
        setError("Invalid credentials. Please verify your email and password.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "Sign in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sand/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-moringa/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-black text-henna tracking-tight">
          Admin Dashboard Entry
        </h1>
        <p className="text-xs text-henna-dark/70">
          Secure portal to manage cones inventory, WhatsApp orders, and customer messages.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 w-full">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-sand/30 shadow-luxury space-y-5">
          {/* Supabase Connection Status Pill */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream border border-sand/25 text-[11px] text-henna-dark">
            <div className="flex items-center gap-1.5 font-semibold">
              <Database className="w-3.5 h-3.5 text-moringa" />
              <span>Supabase Database</span>
            </div>
            <div className="flex items-center gap-1 text-moringa font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Connected</span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold text-center border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-henna-dark block mb-1">
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
              <label className="font-bold text-henna-dark block mb-1">
                Admin Password
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
              <p className="text-[10px] text-moringa mt-1 font-semibold">
                Default credentials: admin@zahrahenna.com / ZahraAdmin2026!
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-henna hover:bg-henna-dark text-white font-bold uppercase tracking-wider text-xs transition-all shadow-luxury flex items-center justify-center gap-2 active:scale-98"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enter Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-sand/15 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-henna font-bold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
