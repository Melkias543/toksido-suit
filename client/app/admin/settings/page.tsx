"use client";

import { useState } from "react";
import {
  Key,
  ShieldCheck,
  Smartphone,
  LogOut,
  Eye,
  EyeOff,
  AlertTriangle,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function AccountSection() {
  const [showPass, setShowPass] = useState(false);

  return (
    // Added a subtle background tint to the section to make the white cards pop
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10 p-1">
      <div className="space-y-1">
        <h3 className="text-3xl font-black tracking-tight uppercase text-slate-950">
          Admin{" "}
          <span className="font-serif italic text-amber-700">Account</span>
        </h3>
        <p className="text-sm text-slate-600 font-bold uppercase tracking-tight">
          Secure your access to the Toksido Atelier management suite.
        </p>
      </div>

      {/* --- PASSWORD CHANGE MODULE --- */}
      {/* High Contrast: border-slate-950 and a stronger shadow */}
      <div className="border-2 border-slate-950 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="p-6 border-b-2 border-slate-950 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 p-2 text-white">
              <Key size={18} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-950">
              Authentication Credentials
            </h4>
          </div>
          <Badge
            variant="outline"
            className="rounded-none border-2 border-slate-950 bg-white font-black text-[9px] uppercase tracking-widest text-slate-950"
          >
            Last changed 3 months ago
          </Badge>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  // Changed border to slate-950 for maximum visibility
                  className="rounded-none border-2 border-slate-950 pr-10 focus:ring-0 focus:border-amber-700 h-12 font-bold text-slate-950 placeholder:text-slate-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-950 hover:text-amber-700 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                New Password
              </Label>
              <Input
                type="password"
                className="rounded-none border-2 border-slate-950 focus:ring-0 focus:border-amber-700 h-12 font-bold text-slate-950 placeholder:text-slate-300"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button className="rounded-none bg-slate-950 text-white font-black uppercase text-[10px] tracking-widest h-12 px-8 hover:bg-amber-700 transition-all shadow-[4px_4px_0px_0px_rgba(180,130,20,0.4)]">
            Update Credentials
          </Button>
        </div>
      </div>

      {/* --- TWO-FACTOR AUTH & SESSIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2FA Card */}
        <div className="border-2 border-slate-950 p-8 bg-white space-y-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 border border-amber-200">
              <Smartphone className="text-amber-700" size={20} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-950">
              Multi-Factor Auth
            </h4>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Add an extra layer of security to your account by requiring a
            verification code from your mobile device.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              className="rounded-none border-2 border-slate-950 w-full font-black uppercase text-[10px] tracking-widest hover:bg-slate-950 hover:text-white transition-all h-12"
            >
              Enable 2FA Protection
            </Button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="border-2 border-slate-950 p-8 bg-white space-y-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 border border-emerald-200">
              <ShieldCheck className="text-emerald-600" size={20} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-950">
              Login Activity
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black border-b-2 border-slate-950 pb-2">
              <span className="text-slate-900 uppercase">
                Addis Ababa, ET (Current)
              </span>
              <span className="text-emerald-600">Active Now</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
              <span>Nairobi, KE • Chrome / MacOS</span>
              <span>2 days ago</span>
            </div>
          </div>
          <button className="text-[9px] font-black uppercase tracking-widest text-red-600 hover:text-red-800 transition-colors pt-2">
            Sign out of all other devices
          </button>
        </div>
      </div>

      {/* --- DANGER ZONE --- */}
      <div className="pt-10 border-t-4 border-slate-950">
        <div className="bg-white border-2 border-red-600 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)]">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 text-white">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-red-600">
                Deactivate Account
              </h4>
              <p className="text-[11px] text-slate-600 font-bold uppercase tracking-tight">
                This will permanently revoke your access to the Toksido Atelier
                management system.
              </p>
            </div>
          </div>
          <Button className="rounded-none bg-red-600 hover:bg-red-800 text-white font-black uppercase text-[10px] tracking-widest px-10 h-12 w-full md:w-auto transition-all">
            Deactivate
          </Button>
        </div>
      </div>
    </section>
  );
}
