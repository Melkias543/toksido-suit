"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link.js";
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react"; // Better icons
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import suits from "@/src/data/suits";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface ProductCardProps {
  suits: any; // Ideally, define a proper interface for your suit
  isAdmin: boolean;
}
function ProductCard({ suits, isAdmin }: ProductCardProps) {
  // Dummy category data using colors as placeholders to avoid Next.js Image errors
  const categories = [
    { id: 1, name: "Wedding", color: "bg-blue-900", count: "12 Styles" },
    { id: 2, name: "Business", color: "bg-gray-800", count: "18 Styles" },
    { id: 3, name: "Casual", color: "bg-amber-900", count: "9 Styles" },
    { id: 4, name: "Bespoke", color: "bg-zinc-900", count: "5 Styles" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* --- CATEGORY GRID SECTION --- */}
      <section className="pt-24 pb-10 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-500 font-bold mb-2">
            Curated Collections
          </h2>
          <h3 className="text-3xl font-bold">Shop by Category</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`${cat.color} group relative h-32 md:h-44 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 border border-white/5`}
            >
              {/* Overlay pattern or subtle gradient */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-white font-bold text-lg md:text-xl tracking-tight group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </span>
                <span className="text-gray-300 text-[10px] uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {cat.count} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED PRODUCTS --- */}
      <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Featured Suits</h2>
          <div className="hidden md:block px bg-gray-200 dark:bg-gray-800 flex-grow mx-8"></div>
          <button className="text-sm font-bold text-yellow-500 uppercase tracking-widest hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {suits.map((suit: any) => (
            <div
              key={suit.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-yellow-400/20"
            >
              <Link href={`/product/${suit.id}`}>
                <div className="relative w-full h-100 overflow-hidden">
                  <Image
                    src={suit.image}
                    alt={suit.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                  />
                  {/* Subtle dark overlay on bottom of image for legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">{suit.title}</h3>
                  <div className="flex items-center text-yellow-400 text-sm font-bold bg-yellow-400/10 px-2 py-1 rounded">
                    {suit.rating} <span className="ml-1">★</span>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
                  {suit.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    ${suit.price}
                  </span>
                  {/* {!isAdmin && (
                    
                  )} */}

                  {isAdmin ?(
                    <CardFooter className="flex justify-between items-center p-5 border-t border-slate-50">
                      <Link
                        href={`/admin/edit/${suit.id}`}
                        className="w-full mr-2"
                      >
                        <Button className="w-full bg-slate-950 text-white hover:bg-amber-700 rounded-none h-10 uppercase text-[10px] tracking-widest font-bold transition-all cursor-pointer">
                          Edit Piece
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="rounded-none border-slate-200 hover:border-slate-950 hover:bg-slate-950 hover:text-white h-10 w-10 p-0 flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                          >
                            <MoreHorizontal size={20} strokeWidth={2.5} />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="rounded-none border-slate-950 bg-white p-1 min-w-[180px] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                        >
                          <DropdownMenuItem
                            asChild
                            className="cursor-pointer  focus:bg-amber-50 focus:text-amber-900 py-3 px-4 transition-colors"
                          >
                            <Link
                              href={`/admin/edit/${suit.id}`}
                              className="flex items-center text-[10px] font-black uppercase cursor-pointer tracking-widest"
                            >
                              <Edit2
                                size={14}
                                className="mr-3 text-amber-700"
                              />{" "}
                              Edit Details
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            //   onClick={() => handleDelete(suit.id)}
                            className=" text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer flex items-center text-[10px] font-black uppercase tracking-widest py-3 px-4 transition-colors border-t border-slate-50"
                          >
                            <Trash2 size={14} className="mr-3" /> Archive Item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  ) : (
                    <button className="bg-gray-900 dark:bg-gray-100 dark:text-gray-900 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-gray-900 transition-all">
                    Make Your  Favorite
                    </button>
                  ) 
                   
                  
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductCard;
