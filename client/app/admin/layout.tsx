"use client";
import { Sidebar } from "@/components/ui/modern-side-bar";
import NavBar from "@/src/components/NavBar";
import apiClient from "@/src/utils/libs/api-client";
import { Globe, Languages, LanguagesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

const [loading, setLoading] = useState(true);
const router = useRouter();

useEffect(() => {
  const checkAuth = async () => {
    try {
      // This endpoint should use authMiddleware and authorize('admin')
      await apiClient.get("/auth/verify-admin");
      setLoading(false);
    } catch (err) {
      // If 401 (No token) or 403 (Not admin), send to login
      router.push("/auth/login");
    }
  };

  checkAuth();
}, [router]);

if (loading) return <div>Loading Admin Panel...</div>;


  return (
    // Changed max-h-screen to min-h-screen for better stability
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      {/* <div className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <NavBar />
      </div> */}
      {/* Remove the extra <div> wrapper here to let Flexbox handle the alignment */}
      <div>
        <Sidebar />
      </div>

      {/* Main area: 
          - flex-1 takes up all remaining width
          - h-screen + overflow-y-auto makes only the center scroll 
      */}
      <main className="flex-1 h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 p-4 shadow-sm justify-end items-center flex">
          {/* <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1> */}
          <Globe color="black" />
        </header>
        {children}
      </main>
    </div>
  );
}
