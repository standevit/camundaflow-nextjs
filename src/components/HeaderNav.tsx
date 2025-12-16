"use client";

import { useTranslation } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import Link from "next/link";

export default function HeaderNav() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-xl border-b border-gray-200 py-4">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="logo">
          <img src="/logo.svg" alt="Camunda Flow" height={46} />
        </Link>
        <div className="menu flex items-center space-x-6 text-lg font-medium">
          <Link href="/" className="hover:text-blue-600 transition">{t("nav_bpmn")}</Link>
          <Link href="/camunda" className="hover:text-blue-600 transition">{t("nav_camunda")}</Link>
          <Link href="/ai-agents" className="hover:text-blue-600 transition">{t("nav_ai_agents")}</Link>
          <Link href="/model-context-protocol" className="hover:text-blue-600 transition">
            {t("nav_mcp")}
          </Link>
          <Link href="/leistungen" className="hover:text-blue-600 transition">{t("nav_leistungen")}</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">{t("nav_contact")}</Link>
        </div>
        <div className="ml-4">
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
}
