"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Search,
  UserPlus,
  Mail,
  Trash2,
  Loader2,
  UserSearch,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import AdminAddUser from "./AdminAddUser";
import { deleteUser, getAllUser } from "../api/AdminApi";
import Swal from "sweetalert2";

export default function UserList() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Logic to filter the users based on the search input
  const filteredItems = user.filter(
    (item: any) =>
      item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.includes(searchQuery),
  );

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      setLoading(true);
      const data = await getAllUser();
      setUser(data?.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userData: any) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure to Delete ${userData?.username}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      const response = await deleteUser(userData._id);
      Swal.fire({
        title: "Deleted!",
        text: response.message || "User has been deleted.",
        icon: "success",
      });
      fetchAllUser();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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

        <AdminAddUser open={open} setOpen={setOpen} />

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              placeholder="Search by name or email..."
              className="pl-10 h-12 bg-slate-50 border border-slate-200 rounded-none focus:border-amber-700 focus:outline-none w-[320px] text-sm tracking-tight transition-all text-slate-950 placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-slate-950 text-white hover:bg-amber-700 rounded-none px-8 h-12 uppercase text-xs tracking-widest font-black transition-all shadow-xl"
          >
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
            {loading ? (
              /* --- LOADING STATE --- */
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-amber-700" />
                    <p className="text-xs uppercase tracking-[0.3em] font-black text-slate-400">
                      Syncing Directory...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
              /* --- NOT FOUND / EMPTY STATE --- */
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <UserSearch className="h-12 w-12 text-slate-200" />
                    <p className="text-sm font-serif italic text-slate-500">
                      {searchQuery
                        ? `No results found for "${searchQuery}"`
                        : "No clients found in the directory."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              /* --- DATA LIST --- */
              filteredItems.map((item: any) => (
                <TableRow
                  key={item?._id}
                  className="group border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="py-6">
                    <div className="w-14 h-14 rounded-none overflow-hidden border-2 border-slate-950 group-hover:border-amber-700 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex items-center justify-center bg-gray-200">
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          alt={item.username || "User"}
                          width={56}
                          height={56}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-xl font-bold text-gray-700">
                          {item.username?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-slate-950 tracking-tight group-hover:text-amber-700 transition-colors">
                        {item?.username}
                      </span>
                      <div className="flex items-center text-sm text-slate-600 font-medium mt-1">
                        <Mail size={14} className="mr-2 text-amber-700" />
                        {item?.email}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-800 uppercase tracking-wide">
                        {item?.role_id?.name || "Client"}
                      </span>
                      <span className="text-xs text-slate-500 font-medium italic">
                        Provisioned{" "}
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-slate-950" />
                      <span className="text-xs uppercase font-black tracking-widest text-slate-950">
                        {item?.phone || "No Phone"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end items-center gap-4">
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-50 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- FOOTER --- */}
      <div className="mt-12 flex justify-between items-center text-xs uppercase tracking-widest text-slate-950 font-black border-t-2 border-slate-950 pt-8">
        <p>© 2026 TOKSIDO SUITS ATELIER</p>
        <div className="flex gap-8">
          <span>
            Total Clients: <span className="text-amber-700">{user.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
}