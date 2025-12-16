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
          alt={locale === "de" ? "Deutsch" : "English"}
          className="object-contain"
          style={{ width: "4rem", height: "1.4rem" }}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-40">
          <button
            onClick={() => {
              setLocale("de");
              setOpen(false);
            }}
            className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50"
          >
            <img src="/flags/de.svg" alt="Deutsch" className="object-contain" style={{ width: "4rem", height: "1.4rem" }} />
            <span className="text-sm">Deutsch</span>
          </button>

          <button
            onClick={() => {
              setLocale("en");
              setOpen(false);
            }}
            className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50"
          >
            <img src="/flags/us.svg" alt="English" className="object-contain" style={{ width: "4rem", height: "1.4rem" }} />
            <span className="text-sm">English</span>
          </button>
        </div>
      )}
    </div>
  );
}
