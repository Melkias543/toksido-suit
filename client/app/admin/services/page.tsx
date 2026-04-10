"use client";

import React, { useState } from "react";
import {
  Plus,
  Scissors,
  MoreHorizontal,
  Globe,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceDialog } from "@/src/components/AddServiceDialog";

export default function ServiceGridUI() {
  const services = [1, 2, 3, 4, 5, 6, 7, 8];

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="p-6 md:p-12 bg-[#FDFCFB] min-h-screen font-sans selection:bg-amber-200">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-end border-b-2 border-slate-950 pb-8 mb-10 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse" />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">
              Atelier Management Services
            </h2>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-950 uppercase leading-none">
            Our Service{" "}
            <span className="font-serif italic text-amber-600 lowercase tracking-normal">
              Catalog
            </span>
          </h1>
        </div>

        <Button className="rounded-none bg-slate-950 text-white hover:bg-amber-600 h-14 px-8 font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0px_0px_rgba(212,175,55,1)] transition-all hover:translate-x-0.5hover:translate-y-0.5 hover:shadow-none"
        
        onClick={()=>setIsDialogOpen(true)}
        
        
        >
          <Plus size={18} className="mr-2 stroke-3" /> Create New Service
        </Button>
      </div>
<ServiceDialog
setIsOpen={setIsDialogOpen}
isOpen={isDialogOpen}

/>
      {/* GRID CONTAINER - Increased density with 4 columns on XL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((item) => (
          <div
            key={item}
            className="group relative border border-slate-200 bg-white hover:border-slate-950 transition-all duration-300 hover:shadow-[10px_10px_0px_0px_#D4AF37]"
          >
            {/* Card ID Decor */}
            <span className="absolute top-4 right-4 text-[8px] font-mono text-slate-300 group-hover:text-amber-600 transition-colors">
              #000{item}-2024
            </span>

            <div className="p-6">
              {/* Header: Icon & Action */}
              <div className="flex justify-between items-start mb-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-100 translate-x-1 translate-y-1 group-hover:bg-amber-500 transition-colors" />
                  <div className="relative bg-white border border-slate-950 p-2 text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all">
                    <Scissors size={20} strokeWidth={2.5} />
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-950">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="mb-6">
                <h3 className="text-lg font-black text-slate-950 uppercase leading-tight mb-2 group-hover:text-amber-700 transition-colors">
                  Premium Bespoke Suit Set
                </h3>
                <div className="flex flex-wrap gap-1">
                  {["AM", "OR"].map((lang) => (
                    <span
                      key={lang}
                      className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-400 uppercase"
                    >
                      {lang}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1 text-[8px] font-black text-amber-600 uppercase italic">
                    <ShieldCheck size={10} /> Certified
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                Italian cashmere blend, hand-cut patterns, and signature inner
                lining for corporate excellence.
              </p>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    Starting From
                  </p>
                  <p className="text-xl font-black text-slate-950 italic">
                    <span className="text-[10px] not-italic mr-1 text-amber-600">
                      ETB
                    </span>
                    15.2k
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all cursor-pointer">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>

            {/* Bottom Progress Bar Decor */}
            <div className="h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
