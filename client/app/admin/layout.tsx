"use client";
import { Sidebar } from "@/components/ui/modern-side-bar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Changed max-h-screen to min-h-screen for better stability
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Remove the extra <div> wrapper here to let Flexbox handle the alignment */}
      <div >
        <Sidebar/>
      </div>

      {/* Main area: 
          - flex-1 takes up all remaining width
          - h-screen + overflow-y-auto makes only the center scroll 
      */}
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
