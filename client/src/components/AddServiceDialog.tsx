"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Globe, Briefcase, Plus } from "lucide-react";

export function ServiceDialogUI({ isOpen }: { isOpen: boolean }) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[700px] rounded-none border-4 border-slate-950 p-0 bg-white shadow-[30px_30px_0px_0px_rgba(180,130,20,0.2)]">
        {/* --- DIALOG HEADER --- */}
        <div className="p-10 bg-slate-50 border-b-4 border-slate-950 relative">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={16} className="text-amber-700" />
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-black">
              Admin Panel
            </h2>
          </div>
          <DialogTitle className="text-5xl font-black tracking-tighter text-slate-950 uppercase">
            New{" "}
            <span className="font-serif italic text-amber-700">Service</span>
          </DialogTitle>
        </div>

        {/* --- FORM BODY --- */}
        <div className="p-10 space-y-10 max-h-[60vh] overflow-y-auto">
          {/* PRICE INPUT */}
          <div className="space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-widest text-slate-950 flex items-center">
              <DollarSign size={14} className="mr-1 text-amber-700" /> Base
              Valuation (ETB)
            </Label>
            <Input
              className="rounded-none border-2 border-slate-950 h-16 text-2xl font-black focus-visible:ring-0 focus-visible:border-amber-700 bg-white"
              placeholder="0.00"
            />
          </div>

          {/* TRILINGUAL TABS */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-950 pb-2 border-b-2 border-slate-100">
              <Globe size={16} className="text-amber-700" /> Language Content
            </div>

            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-none bg-slate-100 border-2 border-slate-950 p-1 h-14">
                <TabsTrigger
                  value="en"
                  className="rounded-none font-black text-[11px] uppercase data-[state=active]:bg-slate-950 data-[state=active]:text-white"
                >
                  English
                </TabsTrigger>
                <TabsTrigger
                  value="am"
                  className="rounded-none font-black text-[11px] uppercase data-[state=active]:bg-slate-950 data-[state=active]:text-white"
                >
                  አማርኛ
                </TabsTrigger>
                <TabsTrigger
                  value="or"
                  className="rounded-none font-black text-[11px] uppercase data-[state=active]:bg-slate-950 data-[state=active]:text-white"
                >
                  Oromoo
                </TabsTrigger>
              </TabsList>

              {["en", "am", "or"].map((lang) => (
                <TabsContent key={lang} value={lang} className="pt-8 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-950 uppercase tracking-widest">
                      Service Name ({lang})
                    </Label>
                    <Input
                      className="rounded-none border-2 border-slate-200 h-12 font-bold focus-visible:border-slate-950"
                      placeholder="e.g. Bespoke Tuxedo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-950 uppercase tracking-widest">
                      Description ({lang})
                    </Label>
                    <Textarea
                      className="rounded-none border-2 border-slate-200 min-h-[120px] font-medium p-4 focus-visible:border-slate-950"
                      placeholder="Describe the craftsmanship..."
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        {/* --- DIALOG FOOTER --- */}
        <div className="p-10 bg-slate-50 border-t-4 border-slate-950 flex flex-row justify-end gap-6">
          <button className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors">
            Discard
          </button>
          <Button className="rounded-none bg-slate-950 text-white hover:bg-amber-700 h-16 px-12 font-black uppercase text-xs tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(180,130,20,0.3)]">
            <Plus size={18} className="mr-2" /> Save Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
