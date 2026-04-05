"use client";

import React from "react";
import {
  Plus,
  Scissors,
  MoreHorizontal,
  Globe,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceGridUI() {
  return (
    <div className="p-8 bg-white min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-slate-950 pb-10 mb-12 gap-6">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-black mb-3">
            Atelier Management
          </h2>
          <h1 className="text-6xl font-black tracking-tighter text-slate-950 uppercase">
            Service{" "}
            <span className="font-serif italic text-amber-700 underline decoration-1 underline-offset-8">
              Catalog
            </span>
          </h1>
        </div>
        <Button className="rounded-none bg-slate-950 text-white hover:bg-amber-700 h-16 px-10 font-black uppercase text-xs tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(180,130,20,0.3)] transition-all active:translate-y-1 active:shadow-none">
          <Plus size={20} className="mr-2" /> Add New Entry
        </Button>
      </div>

      {/* GRID CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="group relative border-2 border-slate-950 bg-white p-0 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[12px_12px_0px_0px_rgba(180,130,20,0.2)] transition-all"
          >
            {/* Card Header Tag */}
            <div className="absolute -top-4 left-6 bg-slate-950 text-white px-4 py-1 text-[9px] font-black uppercase tracking-widest">
              Bespoke Service
            </div>

            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="bg-amber-50 p-3 border-2 border-amber-200">
                  <Scissors className="text-amber-700" size={24} />
                </div>
                <button className="text-slate-300 hover:text-slate-950 transition-colors">
                  <MoreHorizontal size={24} />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-950 uppercase leading-none">
                  Premium Suit Set
                </h3>
                <div className="flex gap-2">
                  <span className="text-[9px] font-black px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 uppercase tracking-tighter">
                    AM: አማርኛ
                  </span>
                  <span className="text-[9px] font-black px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 uppercase tracking-tighter">
                    OR: OROMOO
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-bold leading-relaxed border-l-4 border-slate-950 pl-4 py-1">
                Hand-stitched Italian wool fabric with custom silk lining and
                personalized measurements.
              </p>

              <div className="pt-6 border-t-2 border-slate-950 flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                    Base Price
                  </p>
                  <p className="text-2xl font-black text-slate-950 tracking-tighter">
                    ETB 15,000
                  </p>
                </div>
                <Globe
                  size={20}
                  className="text-slate-200 group-hover:text-amber-700 transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
