"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Package, DollarSign, Camera, X, ImageIcon } from "lucide-react";

interface SuitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuitDialog({ isOpen, onOpenChange }: SuitDialogProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] rounded-none border-2 border-slate-950 p-0 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
        <form>
          {/* --- HEADER --- */}
          <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-black mb-1">
              Atelier Vault
            </h2>
            <DialogTitle className="text-4xl font-black tracking-tighter text-slate-950">
              New{" "}
              <span className="font-serif italic text-amber-700">Garment</span>
            </DialogTitle>
          </DialogHeader>

          <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            {/* --- GLOBAL DATA GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Stats */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-950">
                    <DollarSign size={14} className="text-amber-700" />{" "}
                    Valuation (ETB)
                  </Label>
                  <Input
                    type="number"
                    className="rounded-none border-slate-300 focus:border-amber-700 h-14 text-lg font-bold"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-950">
                    <Package size={14} className="text-amber-700" /> Stock Level
                  </Label>
                  <Input
                    type="number"
                    className="rounded-none border-slate-300 focus:border-amber-700 h-14 text-lg font-bold"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Right Column: Image Upload */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-950">
                  <ImageIcon size={14} className="text-amber-700" /> Showcase
                  Image
                </Label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative border-2 border-dashed border-slate-200 h-[132px] flex flex-col items-center justify-center group hover:border-amber-700 hover:bg-slate-50 transition-all cursor-pointer overflow-hidden bg-white"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />

                  {preview ? (
                    <>
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-slate-950 text-white p-1 hover:bg-red-600 z-10"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Camera
                        size={24}
                        className="text-slate-300 group-hover:text-amber-700 mb-2 transition-transform group-hover:scale-110"
                      />
                      <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-slate-950">
                        Upload Photo
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* --- TRILINGUAL TABS --- */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={14} className="text-amber-700" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-950">
                  Localization
                </span>
              </div>

              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-none bg-slate-200 border border-slate-300 p-1 h-12">
                  <TabsTrigger
                    value="en"
                    className="rounded-none font-black text-[10px] uppercase tracking-[0.2em] text-slate-700 data-[state=active]:bg-slate-950 data-[state=active]:text-white shadow-none transition-all"
                  >
                    English
                  </TabsTrigger>
                  <TabsTrigger
                    value="am"
                    className="rounded-none font-black text-[10px] uppercase tracking-[0.2em] text-slate-700 data-[state=active]:bg-slate-950 data-[state=active]:text-white shadow-none transition-all"
                  >
                    አማርኛ
                  </TabsTrigger>
                  <TabsTrigger
                    value="or"
                    className="rounded-none font-black text-[10px] uppercase tracking-[0.2em] text-slate-700 data-[state=active]:bg-slate-950 data-[state=active]:text-white shadow-none transition-all"
                  >
                    Oromoo
                  </TabsTrigger>
                </TabsList>

                {["en", "am", "or"].map((lang) => (
                  <TabsContent
                    key={lang}
                    value={lang}
                    className="pt-6 space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500"
                  >
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Suit Title ({lang})
                      </Label>
                      <Input
                        placeholder="Midnight Peak Lapel..."
                        className="rounded-none border-slate-300 focus:border-amber-700 text-lg font-bold bg-white h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Description ({lang})
                      </Label>
                      <Textarea
                        placeholder="Crafted from premium Italian wool..."
                        className="rounded-none border-slate-300 focus:border-amber-700 min-h-[120px] resize-none bg-white p-4 leading-relaxed"
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          {/* --- FOOTER --- */}
          <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 flex flex-row items-center justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="rounded-none font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-slate-950 hover:bg-transparent cursor-pointer"
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="rounded-none bg-slate-950 text-white hover:bg-amber-700 px-12 h-14 font-black uppercase text-xs tracking-[0.3em] transition-all shadow-[6px_6px_0px_0px_rgba(180,130,20,0.3)] active:translate-y-1 active:shadow-none cursor-pointer"
            >
              Confirm Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
