"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/src/utils/libs/sanitize";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { addUserByAdmin, getAllROle } from "../api/AdminApi";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AdminAddUser({ open, setOpen }: Props) {

    const [roles, setRoles] = React.useState<any>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      role_id: "",
    },
  });


useEffect(() => {
 fetRole(); }, [])


const fetRole=async()=>{
    try {
const role = await getAllROle();
// console.log('Fetched role', role)
setRoles(role.data)
    } catch (error) {
        console.log('error of fetching role', error)
    }
}

  const onSubmit = async (data: any) => {
    try {

        console.log('data from form', data)
    const response = await addUserByAdmin(data);
    console.log("Response from server:", response);
      Swal.fire({
        icon: "success",
        title: response?.message||"User created.",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
      setOpen(false);
    } catch (error: any) {
        console.error("Error during registration:", error);
        
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create",
        timer:2000,
      });
    }
  };




  


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button className="bg-[#1a2b3c] hover:bg-[#8e6d31] text-[#f8f5f0] gap-2 tracking-[0.2em] text-[10px] uppercase px-6 py-5 transition-all cursor-pointer">
          <UserPlus className="h-4 w-4" /> Add New Member
        </Button> */}
      </DialogTrigger>

      {/* PERFECT MOBILE VIEW LOGIC:
        - w-full sm:w-[95vw] md:max-w-2xl: Forces full width on small phones.
        - h-full sm:h-auto: Full height on mobile (app-like focus).
        - max-h-[100dvh]: Specifically for mobile browsers to avoid address bar issues.
      */}
      <DialogContent className="w-full sm:w-[95vw] md:max-w-2xl h-full sm:h-auto max-h-[100dvh] sm:max-h-[90vh] p-0 flex flex-col border-none bg-white shadow-2xl overflow-hidden rounded-none sm:rounded-xl">
        {/* Branding Header */}
        <div className="bg-[#1a2b3c] py-6 sm:py-8 text-center shrink-0">
          <h1 className="text-xl sm:text-2xl font-serif tracking-[0.4em] text-[#f8f5f0]">
            TOKSIDO<span className="text-[#8e6d31]">.</span>
          </h1>
          <p className="text-[#8e6d31] text-[8px] uppercase tracking-[0.5em] mt-1 font-bold">
            Administrative Portal
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-12 sm:py-10">
          <DialogHeader className="mb-8 text-left sm:text-center">
            <DialogTitle className="text-2xl sm:text-3xl font-serif text-[#1a2b3c] tracking-tight uppercase">
              Provisioning
            </DialogTitle>
            <div className="flex items-center gap-2 mt-2 sm:justify-center">
              <div className="w-8 h-[1px] bg-[#8e6d31]" />
              <p className="text-[#5a6a7a] text-[10px] uppercase tracking-[0.3em] font-medium">
                Enter User Credentials
              </p>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {/* Username */}
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c]/60 font-bold block">
                  Full Name
                </label>
                <input
                  {...register("username")}
                  className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-3 outline-none focus:border-[#8e6d31] transition-all text-sm italic"
                  placeholder="Melkias..."
                />
                {errors.username && (
                  <p className="text-red-500 text-[9px] mt-1">
                    {errors.username.message as string}
                  </p>
                )}
              </div>

              {/* Role Select */}
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c]/60 font-bold block">
                  Access Level
                </label>
                <select
                  {...register("role_id")}
                  className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-3 outline-none focus:border-[#8e6d31] transition-all text-sm cursor-pointer appearance-none"
                >
                  <option value="">Select a Role</option>
                  {roles?.map((role: any) => (
                    <option
                      key={role.id}
                      value={role._id}
                      className="text-black"
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
                {errors.role_id && (
                  <p className="text-red-500 text-[9px] mt-1">
                    {errors.role_id.message as string}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c]/60 font-bold block">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-3 outline-none focus:border-[#8e6d31] transition-all text-sm"
                  placeholder="name@toksido.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c]/60 font-bold block">
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-3 outline-none focus:border-[#8e6d31] transition-all text-sm"
                  placeholder="+251..."
                />
              </div>

              {/* Password */}
              <div className="sm:col-span-2 space-y-1 group">
                <label className="text-[10px] uppercase tracking-widest text-[#1a2b3c]/60 font-bold block">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full bg-transparent border-b border-[#1a2b3c]/10 py-3 outline-none focus:border-[#8e6d31] transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Sticky/Fixed-style Submit Button container for mobile */}
            <div className="pt-6 sm:pt-10">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-[#1a2b3c] text-[#f8f5f0] h-16 sm:h-20 overflow-hidden shadow-2xl transition-all rounded-sm"
              >
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.5em]">
                  {isSubmitting ? "creating..." : "Create Account"}
                </span>
                <div className="absolute inset-0 bg-[#8e6d31] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
