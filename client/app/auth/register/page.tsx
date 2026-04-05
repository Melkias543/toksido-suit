"use client";
import React from "react";
import Link from "next/link";

function Register() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center p-4 md:p-10 relative">
      {/* Texture Overlay for that premium paper feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* MASTER CONTAINER: Expanded for maximum visibility */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white shadow-[0_40px_100px_rgba(26,43,60,0.12)] relative overflow-hidden border border-[#1a2b3c]/5">
        {/* LEFT PANEL: The Brand Presence */}
        <div className="md:w-5/12 bg-[#1a2b3c] relative flex flex-col justify-between p-12 text-[#f8f5f0] overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#8e6d31]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-4xl font-serif tracking-tighter leading-none mb-4">
              TOKSIDO<span className="text-[#8e6d31]">.</span>
            </h1>
            <div className="w-12 h-[1px] bg-[#8e6d31]" />
          </div>

          <div className="relative z-10">
            <span className="text-[#8e6d31] text-[9px] uppercase tracking-[0.6em] font-bold block mb-4">
              The Membership
            </span>
            <h3 className="text-3xl font-serif italic opacity-95 leading-tight mb-6">
              "Crafting a legacy <br />
              unique to you."
            </h3>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed font-light tracking-wide">
              Enter your details to begin your journey with Toksido. Enjoy
              bespoke fittings, early access to seasonal collections, and
              personal style consultation.
            </p>
          </div>

          {/* Background Visual (Luxury fabric/suit texture) */}
          <div
            className="absolute inset-0 opacity-15 hover:opacity-25 transition-opacity duration-1000 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000&auto=format&fit=crop')`,
            }}
          />
        </div>

        {/* RIGHT PANEL: Expanded Form Area */}
        <div className="md:w-7/12 p-8 md:p-16 lg:p-20 bg-white flex flex-col justify-center relative">
          {/* Bronze Decorative Accent */}
          <div className="absolute top-0 right-0 w-24 h-1 bg-[#8e6d31]" />

          <div className="mb-10">
            <h2 className="text-3xl font-serif text-[#1a2b3c] tracking-tighter mb-2">
              BECOME A MEMBER
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#8e6d31]" />
              <p className="text-[#5a6a7a] text-[9px] uppercase tracking-[0.3em]">
                The World of Bespoke Tailoring
              </p>
            </div>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {/* First Name */}
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c] font-bold block group-focus-within:text-[#8e6d31] transition-colors">
                First Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-2 outline-none focus:border-[#8e6d31] transition-all text-[#1a2b3c] text-sm italic"
                placeholder="E.g. Julian"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c] font-bold block group-focus-within:text-[#8e6d31] transition-colors">
                Last Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-2 outline-none focus:border-[#8e6d31] transition-all text-[#1a2b3c] text-sm italic"
                placeholder="E.g. Vane"
              />
            </div>

            {/* Email - Spans full width */}
            <div className="md:col-span-2 space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c] font-bold block group-focus-within:text-[#8e6d31] transition-colors">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-2 outline-none focus:border-[#8e6d31] transition-all text-[#1a2b3c] text-sm"
                placeholder="gentleman@toksido.com"
              />
            </div>

            {/* Password - Spans full width */}
            <div className="md:col-span-2 space-y-2 group">
              <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c] font-bold block group-focus-within:text-[#8e6d31] transition-colors">
                Choose Password
              </label>
              <input
                type="password"
                className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-2 outline-none focus:border-[#8e6d31] transition-all text-[#1a2b3c] text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Join Button */}
            <div className="md:col-span-2 pt-4">
              <button className="group relative w-full bg-[#1a2b3c] text-[#f8f5f0] py-5 overflow-hidden transition-all shadow-xl">
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em]">
                  Initialize Membership
                </span>
                <div className="absolute inset-0 bg-[#8e6d31] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-[#f8f5f0] text-center">
            <p className="text-xs text-[#5a6a7a] mb-4">
              Already recognized by our atelier?
            </p>
            <Link
              href="/login"
              className="inline-block text-[10px] uppercase tracking-[0.2em] font-black text-[#1a2b3c] hover:text-[#8e6d31] transition-all border-b border-[#8e6d31] pb-1"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Background Brand Decoration */}
      <div className="absolute bottom-10 w-full text-center pointer-events-none opacity-[0.02]">
        <h1 className="text-[150px] font-serif font-black italic tracking-tighter text-[#1a2b3c] select-none">
          TOKSIDO
        </h1>
      </div>
    </div>
  );
}

export default Register;
