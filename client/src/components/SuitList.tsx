"use client";

import Image from "next/image";
import Link from "next/link";
import suits from "@/src/data/suits";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react"; // Better icons
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminSuitsGrid = () => {
  const handleDelete = (id: any) => {
    alert(`Delete suit with id: ${id}`);
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen text-slate-950">
      {/* GRID RESPONSIVENESS:
          - grid-cols-1 (Mobile)
          - sm:grid-cols-2 (Tablets)
          - lg:grid-cols-3 (Small Laptops)
          - xl:grid-cols-4 (Large Screens)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {suits.map((suit) => (
          <Card
            key={suit.id}
            className="group rounded-none border-slate-200 hover:border-amber-700 transition-all duration-500 shadow-none hover:shadow-[8px_8px_0px_0px_rgba(180,130,20,0.1)] overflow-hidden"
          >
            {/* IMAGE CONTAINER 
                Using aspect-square or a fixed h-80 ensures images don't overflow 
            */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
              <Image
                src={suit.image}
                alt={suit.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                ⭐ {suit.rating}
              </div>
            </div>

            {/* CONTENT */}
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-black text-lg leading-tight group-hover:text-amber-700 transition-colors uppercase tracking-tighter">
                  {suit.title}
                </h3>
              </div>
              <p className="text-amber-700 font-serif italic text-xl">
                <span className="font-sans not-italic text-xs mr-1 text-slate-400">
                  ETB
                </span>
                {suit.price}
              </p>
            </CardContent>

            {/* ACTIONS */}
            <CardFooter className="flex justify-between items-center p-5 border-t border-slate-50">
              <Link href={`/admin/edit/${suit.id}`} className="w-full mr-2">
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
                      <Edit2 size={14} className="mr-3 text-amber-700" /> Edit
                      Details
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleDelete(suit.id)}
                    className=" text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer flex items-center text-[10px] font-black uppercase tracking-widest py-3 px-4 transition-colors border-t border-slate-50"
                  >
                    <Trash2 size={14} className="mr-3" /> Archive Item
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSuitsGrid;
