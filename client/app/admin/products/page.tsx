'use client'; 

import AdminSuitsGrid from "@/src/components/SuitList";
import React, { useState } from "react";
import suits from "@/src/data/suits";
import { Plus, Package, ShieldCheck, TrendingUp } from "lucide-react"; // Icons add a premium feel
import { SuitDialog } from "@/src/components/AddNewSuitDialog";

function SuitPages() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="bg-white min-h-screen">
      {/* --- HERO HEADER SECTION --- */}
      <div className="pt-10 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-950 pb-8 gap-6">
          <div className="space-y-1">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-black">
              System Administration
            </h2>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-950">
              Atelier{" "}
              <span className="font-serif italic text-amber-700">
                Inventory
              </span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Quick Stats inside Header */}
            <div className="hidden lg:flex items-center gap-6 mr-6 border-r border-slate-200 pr-8">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Total Stock
                </p>
                <p className="text-xl font-black text-slate-950">
                  {suits.length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Premium Line
                </p>
                <p className="text-xl font-black text-amber-700">12</p>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 bg-slate-950 text-white hover:bg-amber-700 transition-all duration-300 text-xs font-black uppercase tracking-[0.2em] py-4 px-8 rounded-none shadow-[6px_6px_0px_0px_rgba(180,130,20,0.2)] active:translate-y-1 active:shadow-none hover:cursor-pointer  cursor-pointer"
            onClick={()=>setIsDialogOpen(true)}
            >
              <Plus size={16} strokeWidth={3} />
              Add New Piece
            </button>
          </div>
        </div>
        <SuitDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
        {/* --- SUB-NAVIGATION / FILTER BAR (Optional but looks great) --- */}
        <div className="flex items-center gap-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 mb-8">
          <span className="text-slate-950 border-b border-slate-950 pb-1 cursor-pointer">
            All Collections
          </span>
          <span className="hover:text-amber-700 cursor-pointer transition-colors">
            Wedding
          </span>
          <span className="hover:text-amber-700 cursor-pointer transition-colors">
            Bespoke
          </span>
          <span className="hover:text-amber-700 cursor-pointer transition-colors">
            Business
          </span>
        </div>
      </div>

      {/* --- GRID SECTION --- */}
      <div className="max-w-[1600px] mx-auto">
        <AdminSuitsGrid />
      </div>

      {/* --- FOOTER STATUS --- */}
      <div className="p-8 mt-12 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-bold text-slate-400 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-amber-700" />
          Secure Inventory Management System v2.4
        </div>
        <p>© 2026 TOKSIDO SUITS ATELIER — CRAFTED FOR EXCELLENCE</p>
      </div>
    </div>
  );
}

export default SuitPages;
