"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Scissors,
  MoreHorizontal,
  ShieldCheck,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ServiceDialog } from "@/src/components/AddServiceDialog";
import Swal from "sweetalert2";
import { deleteServices, getAllServices } from "@/src/api/AdminApi";
import Cookies from "js-cookie";

type Lang = "en" | "am" | "or";

// Created a sub-component for the Card to manage local "Read More" state independently
const ServiceCard = ({ item, locale, onEdit, onDelete, mode }: any) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 100;

  const rawText =
    item?.description?.[locale] ||
    item?.description?.en ||
    item?.description?.or ||
    item?.description?.am ||
    "No description available";

  const isLongText = rawText.length > maxLength;
  const displayedText = expanded
    ? rawText
    : rawText.slice(0, maxLength) + (isLongText ? "..." : "");

  return (
    <div className="group relative border border-slate-200 bg-white hover:border-slate-950 transition-all duration-300 hover:shadow-[10px_10px_0px_0px_#D4AF37]">
      <span className="absolute top-4 right-4 text-[8px] font-mono text-slate-300 group-hover:text-amber-600 transition-colors">
        #{item._id?.slice(-4)}-{new Date(item.createdAt).getFullYear()}
      </span>

      <div className="p-6">
        <div className="flex justify-between items-start mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-100 translate-x-1 translate-y-1 group-hover:bg-amber-500 transition-colors" />
            <div className="relative bg-white border border-slate-950 p-2 text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all">
              <Scissors size={20} strokeWidth={2.5} />
            </div>
          </div>

          {mode === "admin" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full outline-none cursor-pointer">
                <MoreHorizontal
                  className="stroke-slate-950 group-hover:stroke-amber-900"
                  size={20}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => onEdit(item)}
                className="text-amber-600 cursor-pointer flex items-center"
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(item._id)}
                className="text-red-600 cursor-pointer flex items-center"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>)}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-black text-slate-950 uppercase leading-tight mb-2 group-hover:text-amber-700 transition-colors">
            {item?.name?.[locale] || item?.name?.en || "No Name"}
          </h3>
          <div className="flex flex-wrap gap-1">
            <span className="ml-auto flex items-center gap-1 text-[8px] font-black text-amber-600 uppercase italic">
              <ShieldCheck size={10} /> Verified
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-2">
          {displayedText}
        </p>

        {isLongText && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-amber-600 text-[11px] font-bold hover:underline mb-4 block"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      <div className="h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-500" />
    </div>
  );
};

type Mode = "admin" | "view";

export default function ServiceGridUI({ mode = "admin" }: { mode?: Mode }) {
  const [services, setServices] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const locale = (Cookies.get("NEXT_LOCALE") as Lang) || "en";

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data || []);
    } catch (error: any) {
      const err =
        error.response?.data?.message || error.message || "An error occurred";
      Swal.fire({ icon: "error", title: "Error", text: err });
    }
  };

  const handleDelete = async (id: any) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are You sure?",
      text: "This service will be permanently deleted!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    });

    if (!result.isConfirmed) return;
    try {
      await deleteServices(id);
      Swal.fire({ icon: "success", title: "Deleted", timer: 2000 });
      fetchAllServices();
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to delete" });
    }
  };

  const handleEditClick = (item: any) => {
    setEditItem(item);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="p-6 md:p-12 bg-[#FDFCFB] min-h-screen font-sans">
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
            <span className="font-serif italic text-amber-600 lowercase">
              Catalog
            </span>
          </h1>
        </div>
{


mode === "admin" && (
        <Button
          className="rounded-none bg-slate-950 text-white hover:bg-amber-600 h-14 px-8 font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0px_0px_rgba(212,175,55,1)] transition-all cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus size={18} className="mr-2 stroke-3" /> Create New Service
        </Button>)
}
      </div>

      {/* Dialogs */}
      <ServiceDialog setIsOpen={setIsDialogOpen} isOpen={isDialogOpen} />
      {editItem && (
        <ServiceDialog
          setIsOpen={setIsEditDialogOpen}
          isOpen={isEditDialogOpen}
          isEditing={editItem}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((item: any) => (
          <ServiceCard
            key={item._id}
            item={item}
            locale={locale}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
}
