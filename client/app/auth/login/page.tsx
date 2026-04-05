"use client";
import React from "react";
import Link from "next/link";

function Login() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center p-4 md:p-10 relative">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* EXPANDED MASTER CONTAINER */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white shadow-[0_40px_100px_rgba(26,43,60,0.12)] relative overflow-hidden border border-[#1a2b3c]/5">
        {/* LEFT PANEL: Branding & Visuals (The "Visible" impact) */}
        <div className="md:w-1/2 bg-[#1a2b3c] relative flex flex-col justify-between p-12 text-[#f8f5f0] overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#8e6d31]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-5xl font-serif tracking-tighter leading-none mb-4">
              TOKSIDO<span className="text-[#8e6d31]">.</span>
            </h1>
            <div className="w-16 h-[1px] bg-[#8e6d31]" />
          </div>

          <div className="relative z-10">
            <p className="text-[#8e6d31] text-[10px] uppercase tracking-[0.5em] font-bold mb-4">
              Est. 2026
            </p>
            <h3 className="text-2xl font-serif italic opacity-90 leading-tight">
              "Precision in every stitch, <br />
              excellence in every detail."
            </h3>
          </div>

          {/* Background Image Overlay (Optional: Replace with a real suit image) */}
          <div
            className="absolute inset-0 opacity-20 hover:opacity-30 transition-opacity duration-1000 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1594932224491-76033878b7b1?q=80&w=1000&auto=format&fit=crop')`,
            }}
          />
        </div>

        {/* RIGHT PANEL: The Form (Clean & Spaced) */}
        <div className="md:w-1/2 p-8 md:p-20 bg-white flex flex-col justify-center relative">
          {/* Bronze Top Accent for Right Side */}
          <div className="absolute top-0 right-0 w-32 h-1 bg-[#8e6d31]" />

          <div className="mb-12">
            <h2 className="text-3xl font-serif text-[#1a2b3c] tracking-tighter mb-2">
              SIGN IN
            </h2>
            <p className="text-[#5a6a7a] text-[10px] uppercase tracking-[0.3em]">
              Access your bespoke profile
            </p>
          </div>

          <form className="space-y-8">
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c] font-bold block group-focus-within:text-[#8e6d31] transition-colors">
                Identity / Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-3 outline-none focus:border-[#8e6d31] transition-all text-[#1a2b3c] placeholder:text-gray-300 italic text-sm"
                placeholder="gentleman@toksido.com"
              />
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c] font-bold block group-focus-within:text-[#8e6d31] transition-colors">
                  Secret / Password
                </label>
                <a
                  href="#"
                  className="text-[9px] uppercase tracking-widest text-[#8e6d31] hover:text-[#1a2b3c] transition-colors font-bold"
                >
                  Recover
                </a>
              </div>
              <input
                type="password"
                className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-3 outline-none focus:border-[#8e6d31] transition-all text-[#1a2b3c] placeholder:text-gray-300 text-sm"
                placeholder="••••••••"
              />
            </div>

            <button className="group relative w-full bg-[#1a2b3c] text-[#f8f5f0] py-5 overflow-hidden transition-all shadow-xl">
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em]">
                Initialize Session
              </span>
              <div className="absolute inset-0 bg-[#8e6d31] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-[#f8f5f0] flex flex-col items-center">
            <p className="text-xs text-[#5a6a7a] mb-4">New to the atelier?</p>
            <Link
              href="/register"
              className="text-[10px] uppercase tracking-[0.2em] font-black text-[#1a2b3c] hover:text-[#8e6d31] transition-all border-b border-[#8e6d31] pb-1"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Aesthetic Labels */}
      <div className="absolute bottom-8 left-10 text-[9px] tracking-[0.5em] text-[#1a2b3c]/20 uppercase hidden lg:block">
        Crafting Legacy since 2026
      </div>
      <div className="absolute bottom-8 right-10 text-[9px] tracking-[0.5em] text-[#1a2b3c]/20 uppercase hidden lg:block">
        Toksido Atelier
      </div>
    </div>
  );
}

export default Login;
