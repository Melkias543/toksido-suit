"use client";
import { Sidebar } from "@/components/ui/modern-side-bar";
import NavBar from "@/src/components/NavBar";
import { useAuth } from "@/src/context/authContext";
import apiClient from "@/src/utils/libs/api-client";
import { Globe, Languages, LanguagesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

const { user, isLoggedIn, isLoading: authLoading } = useAuth();
const router = useRouter();
const [verifyingServer, setVerifyingServer] = useState(true); // Start as true

useEffect(() => {
  // 1. Wait for AuthContext to finish reading localStorage/Cookies
  if (authLoading) return;

  // 2. Client-side check: If no user or not admin, bounce immediately
  if (!isLoggedIn || user?.role !== "admin") {
    router.push("/auth/login");
    return;
  }

  // 3. Server-side check: Verify the actual token
  const verifyToken = async () => {
    try {
      const response = await apiClient.get("/auth/verify-admin");
      if (response.status === 200) {
        setVerifyingServer(false); // SUCCESS: Let them in
      } else {
        // router.push("/auth/login");
      }
    } catch (err) {
      console.error("Verification failed", err);
      router.push("/auth/login");
    }
  };

  verifyToken();
}, [authLoading, isLoggedIn, user, router]);

// IMPORTANT: Show loading if Context is loading OR if we are waiting for API verification
if (authLoading || verifyingServer) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative flex h-12 w-12">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-12 w-12 bg-blue-500"></span>
      </div>
      <h2 className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
        Loding...
      </h2>
    </div>
  );
}


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
