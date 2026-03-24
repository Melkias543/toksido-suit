"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const languages = ["EN", "AM", "OM"];

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(/^\/(en|am|om)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="relative text-[10px] font-bold tracking-widest uppercase">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-yellow-500 transition-colors"
      >
        Language ▾
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-20 bg-black border border-gray-700 shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                handleLocaleChange(lang.toLowerCase());
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left hover:bg-gray-800 hover:text-yellow-500 transition"
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
