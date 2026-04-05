"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Search,
  UserPlus,
  Mail,
  MoreVertical,
  Trash2,
  UserCog,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@toksido.com",
    role: "Premium Client",
    status: "Active",
    joined: "Oct 2025",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Sara Selam",
    email: "sara.s@toksido.com",
    role: "Regular Guest",
    status: "Pending",
    joined: "Jan 2026",
    avatar: "/api/placeholder/40/40",
  },
];

export default function UserList() {
  return (
    <div className="p-8 bg-white min-h-screen text-slate-950 font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b-2 border-slate-900 pb-10">
        <div>
          <h2 className="text-xs uppercase tracking-[0.4em] text-amber-700 font-black mb-3">
            Administration
          </h2>
          <h1 className="text-5xl font-black tracking-tighter text-slate-950">
            Client{" "}
            <span className="font-serif italic text-amber-700">Directory</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              placeholder="Search by name or email..."
              className="pl-10 h-12 bg-slate-50 border border-slate-200 rounded-none focus:border-amber-700 focus:outline-none w-[320px] text-sm tracking-tight transition-all text-slate-950 placeholder:text-slate-400"
            />
          </div>
          <Button className="bg-slate-950 text-white hover:bg-amber-700 rounded-none px-8 h-12 uppercase text-xs tracking-widest font-black transition-all shadow-xl">
            <UserPlus size={16} className="mr-2" /> Add User
          </Button>
        </div>
      </div>

      {/* --- TABLE CONTENT AREA --- */}
      <div className="bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-2 border-slate-950">
              <TableHead className="text-slate-950 font-black uppercase tracking-widest text-xs py-5">
                Profile
              </TableHead>
              <TableHead className="text-slate-950 font-black uppercase tracking-widest text-xs">
                Client Info
              </TableHead>
              <TableHead className="text-slate-950 font-black uppercase tracking-widest text-xs">
                Membership
              </TableHead>
              <TableHead className="text-slate-950 font-black uppercase tracking-widest text-xs">
                Status
              </TableHead>
              <TableHead className="text-right text-slate-950 font-black uppercase tracking-widest text-xs pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="group border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <TableCell className="py-6">
                  <div className="w-14 h-14 rounded-none overflow-hidden border-2 border-slate-950 group-hover:border-amber-700 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={56}
                      height={56}
                      className="object-cover transition-all duration-700"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-slate-950 tracking-tight group-hover:text-amber-700 transition-colors">
                      {user.name}
                    </span>
                    <div className="flex items-center text-sm text-slate-600 font-medium mt-1">
                      <Mail size={14} className="mr-2 text-amber-700" />
                      {user.email}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-wide">
                      {user.role}
                    </span>
                    <span className="text-xs text-slate-500 font-medium italic">
                      Client since {user.joined}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-none ${user.status === "Active" ? "bg-slate-950" : "bg-amber-600 animate-pulse"}`}
                    />
                    <span className="text-xs uppercase font-black tracking-widest text-slate-950">
                      {user.status}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right pr-6">
                  <div className="flex justify-end items-center gap-4">
                    <button
                      className="p-2 text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-all"
                      title="Edit"
                    >
                      <UserCog size={20} />
                    </button>
                    <button
                      className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-950">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- FOOTER --- */}
      <div className="mt-12 flex justify-between items-center text-xs uppercase tracking-widest text-slate-950 font-black border-t-2 border-slate-950 pt-8">
        <p>© 2026 TOKSIDO SUITS ATELIER</p>
        <div className="flex gap-8">
          <span>
            Total Clients:{" "}
            <span className="text-amber-700">{users.length}</span>
          </span>
          <span>
            VIP Access: <span className="text-amber-700">84</span>
          </span>
        </div>
      </div>
    </div>
  );
}
