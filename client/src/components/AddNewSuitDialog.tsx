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

// import { DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Package, DollarSign, Camera, X, ImageIcon } from "lucide-react";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../utils/libs/sanitize";
import z from "zod";
import Swal from "sweetalert2";
type ProductForm = z.infer<typeof productSchema>;
const languages = ["en", "am", "or"] as const;
interface SuitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuitDialog({ isOpen, onOpenChange }: SuitDialogProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
const {
  handleSubmit,
  register,
  setValue,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(productSchema),
  defaultValues: {
    name: { en: "", am: "", or: "" },
    description: { en: "", am: "", or: "" },
    category_id: "",
    price: 0,
    image: null,
  },
});
const { ref: registerRef, ...imageRegisterProps } = register("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      const url = URL.createObjectURL(file);
      setPreview(url);
      // Manually update RHF value
      setValue("image", file, { shouldValidate: true });
    }
  };
 const removeImage = (e: React.MouseEvent) => {
   e.preventDefault();
   e.stopPropagation();
   if (preview) URL.revokeObjectURL(preview); // ✅ important
   setPreview(null);
 };


// const { ref, onChange, ...rest } = register("image");


  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("price", data.price);
      formData.append("name", JSON.stringify(data.name));
      formData.append("description", JSON.stringify(data.description));
      console.log("Form Data to be submitted:", formData);
    } catch (error: any) {
      const errors = error.response?.data?.message || error.message || "An error occurred while submitting the suit.";
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: errors,
      });
    }
  }



  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-175 rounded-none border-2 border-slate-950 p-0 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* --- HEADER --- */}
          <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-black">
              Atelier Vault
            </h2>
            <DialogTitle className="text-4xl font-black tracking-tighter text-slate-950">
              New
              <span className="font-serif italic text-amber-700 ml-1.5">
                Garment
              </span>
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
                    {...register("price", { valueAsNumber: true })}
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-950">
                    <Package size={14} className="text-amber-700" /> Category
                  </Label>

                  <div className="flex flex-col gap-2">
                    <Select
                    {
                      ...register("category_id")
                    }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <Button
                          className="bg-stone-600 hover:bg-stone-800"
                            variant="outline"
                            size="sm"
                            onClick={() => console.log("Add new category")}
                          >
                            Add New Category
                          </Button>
                          <SelectItem value="category1">Category 1</SelectItem>
                          <SelectItem value="category2">Category 2</SelectItem>
                          <SelectItem value="category3">Category 3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {
                    errors.category_id && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.category_id.message}
                      </p>
                    )
                  }
                </div>
              </div>

              {/* Right Column: Image Upload */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-950">
                  <ImageIcon size={14} className="text-amber-700" /> Showcase
                  Image
                </Label>

                <div
                  onClick={() => fileInputRef.current?.click()} // ✅ trigger hidden input
                  className="relative border-2 border-dashed border-slate-200 h-[132px] flex flex-col items-center justify-center group hover:border-amber-700 hover:bg-slate-50 transition-all cursor-pointer overflow-hidden bg-white"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image")}
                    ref={fileInputRef} // ✅ assign ref here
                    onChange={(e) => handleFileChange(e)}
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
                        onClick={(e) => {
                          e.stopPropagation(); // prevent triggering input click
                          removeImage(e);
                        }}
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

                {languages.map((lang) => (
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
                        {...register(`name.${lang}`)}
                        placeholder="Midnight Peak suit..."
                        className="rounded-none border-slate-300 focus:border-amber-700 text-lg font-bold bg-white h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Description ({lang})
                      </Label>
                      <Textarea
                        {...register(`description.${lang}`)}
                        placeholder="Crafted from premium Italian wool..."
                        className="rounded-none border-slate-300 focus:border-amber-700 min-h-30 resize-none bg-white p-4 leading-relaxed"
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
              {isSubmitting ? "Adding..." : "Add to Inventory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
