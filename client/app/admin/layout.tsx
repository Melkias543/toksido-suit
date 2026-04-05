"use client";
import { Sidebar } from "@/components/ui/modern-side-bar";
import { Globe, Languages, LanguagesIcon } from "lucide-react";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Changed max-h-screen to min-h-screen for better stability
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}

      {/* Remove the extra <div> wrapper here to let Flexbox handle the alignment */}
      <div >
      
        <Sidebar/>
      </div>

      {/* Main area: 
          - flex-1 takes up all remaining width
          - h-screen + overflow-y-auto makes only the center scroll 
      */}
      <main className="flex-1 h-screen overflow-y-auto">
      <header className="bg-white border-b border-slate-200 p-4 shadow-sm justify-end items-center flex">
        {/* <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1> */}
        <Globe color="black"/>
      </header> 
     { children}
      
      </main>
    </div>
  );
}
