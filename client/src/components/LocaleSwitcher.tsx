"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  // const router = useRouter();
  const locale = useLocale(); // Gets current locale (en, am, or om)
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);


  const languages = [
    { code: "en", label: "EN" },
    { code: "am", label: "AM" },
    { code: "om", label: "OM" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setOpen(false);
    window.location.reload();
  };

  return (
    <div
      ref={containerRef}
      className="relative text-[10px] font-bold tracking-widest uppercase"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-yellow-500 transition-colors"
      >
        {locale} {open ? "▴" : "▾"}
      </button>

      {open && (
        <ul className="absolute mt-2 w-20 bg-black border border-gray-700 shadow-lg z-50">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => handleLocaleChange(lang.code)}
                className={`block w-full px-3 py-2 text-left hover:bg-gray-800 transition ${
                  locale === lang.code ? "text-yellow-500" : "text-white"
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
