"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Scissors,
  Plus,
  Download,
  LayoutGrid,
  List,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SuitPages from "../products/page";
import { SuitDialog } from "@/src/components/AddNewSuitDialog";
// imprt AdminSuitsGrid from "@/src/components/SuitList";
// --- MOCK DATA ---
const salesData = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 48000 },
  { name: "Apr", revenue: 61000 },
];

const categoryData = [
  { name: "Bespoke", value: 45, color: "#020617" },
  { name: "Wedding", value: 30, color: "#b45309" },
  { name: "Ready", value: 25, color: "#94a3b8" },
];

// --- DUMMY SUITS ---
const dummySuits = [
  {
    id: 1,
    title: "Classic Black Suit",
    price: 4500,
    rating: 4.8,
    image: "/dummy/suit1.jpg",
  },
  {
    id: 2,
    title: "Elegant Wedding Suit",
    price: 7800,
    rating: 4.6,
    image: "/dummy/suit2.jpg",
  },
  {
    id: 3,
    title: "Modern Blue Suit",
    price: 5600,
    rating: 4.9,
    image: "/dummy/suit3.jpg",
  },
  {
    id: 4,
    title: "Slim Fit Grey Suit",
    price: 6200,
    rating: 4.7,
    image: "/dummy/suit4.jpg",
  },
  {
    id: 5,
    title: "Luxury Tuxedo",
    price: 12000,
    rating: 5.0,
    image: "/dummy/suit5.jpg",
  },
];

export default function AdminDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans">
      {/* --- NAVBAR --- */}
      <nav className="border-b-2 border-slate-950 px-8 py-4 flex justify-between items-center sticky top-0 bg-white z-30">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-950 flex items-center justify-center text-white font-black">
            T
          </div>
          <h1 className="font-black uppercase tracking-[0.3em] text-sm">
            Toksido <span className="text-amber-700">Atelier</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[10px] font-black uppercase tracking-widest hover:text-amber-700 transition-colors">
            Reports
          </button>
          <button className="text-[10px] font-black uppercase tracking-widest hover:text-amber-700 transition-colors">
            Settings
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" />
        </div>
      </nav>

      <div className="p-8 max-w-[1600px] mx-auto space-y-12">
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-black mb-2">
              Management Console
            </h2>
            <h1 className="text-6xl font-black tracking-tighter">
              Executive{" "}
              <span className="font-serif italic text-amber-700 text-5xl">
                Overview
              </span>
            </h1>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="rounded-none border-2 border-slate-950 font-black uppercase text-[10px] tracking-widest h-12 px-6"
            >
              <Download size={14} className="mr-2" /> Export PDF
            </Button>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="rounded-none bg-slate-950 text-white hover:bg-amber-700 h-12 px-8 font-black uppercase text-[10px] tracking-widest shadow-[6px_6px_0px_0px_rgba(180,130,20,0.3)] transition-all active:translate-y-1 active:shadow-none"
            >
              <Plus size={16} className="mr-2" /> Register New Suit
            </Button>
          </div>
        </header>

        {/* --- ANALYTICS CARDS --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Annual Revenue"
            value="ETB 2.4M"
            trend="+12.5%"
            icon={<DollarSign />}
          />
          <StatCard
            title="Active Bespoke"
            value="48 Orders"
            trend="+5.2%"
            icon={<Scissors />}
          />
          <StatCard
            title="Elite Clients"
            value="1,240"
            trend="+18.3%"
            icon={<Users />}
          />
          <StatCard
            title="Market Growth"
            value="24.8%"
            trend="+2.1%"
            icon={<TrendingUp />}
          />
        </section>

        {/* --- CHARTS --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue */}
          <Card className="lg:col-span-2 rounded-none border-2 border-slate-950 shadow-none p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-black uppercase tracking-widest">
                Revenue <span className="text-amber-700">Trajectory</span>
              </CardTitle>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 900 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 900 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "0",
                      border: "2px solid #020617",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#b45309"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#020617" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category */}
          <Card className="rounded-none border-2 border-slate-950 shadow-none p-6 bg-slate-50">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-950">
                Collection <span className="text-amber-700">Mix</span>
              </CardTitle>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 900 }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* --- SUITS GRID --- */}
        <section className="space-y-6 pt-10 border-t-2 border-slate-100">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black tracking-tighter uppercase italic font-serif">
              Suit Inventory
            </h3>
          </div>
          {/* <AdminSuitsGrid suits={dummySuits} /> */}
        </section>

        {/* --- DIALOG --- */}
        <SuitDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </div>
  );
}

// --- STAT CARD HELPER ---
function StatCard({ title, value, trend, icon }: any) {
  return (
    <Card className="rounded-none border-2 border-slate-950 shadow-none hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          {title}
        </CardTitle>
        <div className="text-amber-700">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black tracking-tighter">{value}</div>
        <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-widest">
          {trend} vs Last Period
        </p>
      </CardContent>
    </Card>
  );
}
