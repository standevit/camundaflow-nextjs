"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="flex items-center justify-center p-1 rounded-md border"
      >
        <img
          src={locale === "de" ? "/flags/de.svg" : "/flags/us.svg"}

          className="object-contain"
          style={{ width: "5rem", height: "1.4rem" }}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-40" style={{ width: "2.7rem" }}>
          <button
            onClick={() => {
              setLocale("de");
              setOpen(false);
            }}
            className="w-full flex items-center hover:bg-gray-50"
            style={{ padding: "0.2rem" }}
          >
            <img src="/flags/de.svg" className="object-contain" style={{ width: "2.2rem", height: "1.4rem" }} />
            
          </button>

          <button
            onClick={() => {
              setLocale("en");
              setOpen(false);
            }}
            className="w-full flex items-center hover:bg-gray-50"
            style={{ padding: "0.2rem" }}
          >
            <img src="/flags/us.svg"  className="object-contain" style={{ width: "2.2rem", height: "1.4rem" }} />
           
          </button>
        </div>
      )}
    </div>
  );
}
