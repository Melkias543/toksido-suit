"use client";
import React from "react";
import { useTranslations } from "next-intl";

function Contact() {
  const t = useTranslations("Footer");

  return (
    <div className="relative">
      {/* Subtle texture overlay for a premium paper feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <footer className="relative py-24 bg-[#f8f5f0] text-[#5a6a7a] border-t border-[#8e6d31]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8">
            {/* BRAND SECTION */}
            <div className="md:col-span-5 lg:col-span-4">
              <h2 className="text-4xl font-serif text-[#1a2b3c] mb-8 tracking-tighter leading-none">
                TOKSIDO<span className="text-[#8e6d31]">.</span>
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-[#1a2b3c]/70 mb-10">
                {t("description")}
              </p>

              {/* NEWSLETTER PREVIEW (Visual Booster) */}
              <div className="relative max-w-xs group">
                <input
                  type="email"
                  placeholder="Join the inner circle"
                  className="w-full bg-transparent border-b border-[#1a2b3c]/20 py-2 focus:border-[#8e6d31] transition-colors outline-none text-sm italic"
                />
                <button className="absolute right-0 bottom-2 text-[#8e6d31] hover:text-[#1a2b3c] transition-colors">
                  →
                </button>
              </div>
            </div>

            {/* LINKS SECTIONS */}
            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
              {/* CONTACT */}
              <div>
                <h4 className="text-[#1a2b3c] font-bold mb-8 text-[11px] uppercase tracking-[0.2em]">
                  {t("contactHeader")}
                </h4>
                <ul className="text-sm space-y-5">
                  <li className="group cursor-pointer">
                    <span className="block text-[#1a2b3c]/60 group-hover:text-[#8e6d31] transition-colors">
                      {t("location")}
                    </span>
                  </li>
                  <li className="group cursor-pointer">
                    <span className="relative inline-block hover:text-[#1a2b3c] transition-colors">
                      info@toksido.com
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8e6d31] transition-all group-hover:w-full" />
                    </span>
                  </li>
                  <li className="text-[#1a2b3c] font-serif italic text-lg">
                    +251 900 000 000
                  </li>
                </ul>
              </div>

              {/* SOCIAL */}
              <div>
                <h4 className="text-[#1a2b3c] font-bold mb-8 text-[11px] uppercase tracking-[0.2em]">
                  {t("socialHeader")}
                </h4>
                <ul className="text-sm space-y-5">
                  {["Instagram", "Pinterest", "Twitter"].map((social) => (
                    <li key={social} className="group cursor-pointer w-fit">
                      <span className="relative inline-block text-[#1a2b3c]/60 group-hover:text-[#1a2b3c] transition-colors">
                        {social}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8e6d31] transition-all group-hover:w-full" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SERVICE (Extra Column for visual balance) */}
              <div>
                <h4 className="text-[#1a2b3c] font-bold mb-8 text-[11px] uppercase tracking-[0.2em]">
                  The Atelier
                </h4>
                <ul className="text-sm space-y-5 text-[#1a2b3c]/60">
                  <li className="hover:text-[#8e6d31] cursor-pointer transition-colors">
                    Bespoke Tailoring
                  </li>
                  <li className="hover:text-[#8e6d31] cursor-pointer transition-colors">
                    Wedding Services
                  </li>
                  <li className="hover:text-[#8e6d31] cursor-pointer transition-colors">
                    Care Guide
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-24 pt-12 border-t border-[#8e6d31]/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#1a2b3c]/40">
              {t("copyright")}
            </div>

            {/* Visual Decorative element */}
            <div className="flex gap-4 items-center">
              <div className="w-12 h-[1px] bg-[#8e6d31]/30" />
              <span className="text-[10px] font-serif italic text-[#8e6d31]">
                EST. 2026
              </span>
              <div className="w-12 h-[1px] bg-[#8e6d31]/30" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
