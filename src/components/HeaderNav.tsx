"use client";

import { useTranslation } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-xl border-b border-gray-200 py-[0.3rem]">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="logo">
          <img src="/workflow.svg" alt="Development" height={46} />
        </Link>
        <div className="menu flex items-center space-x-6 font-medium" style={{ fontSize: '1.5rem' }}>
          <Link href="/microservices" className={`hover:text-blue-600 transition${pathname.startsWith('/microservices') ? ' active' : ''}`}>Microservices</Link>
          <Link href="/camunda" className={`hover:text-blue-600 transition${pathname.startsWith('/camunda') ? ' active' : ''}`}>{t("nav_camunda")}</Link>
          <Link href="/ai-agents" className={`hover:text-blue-600 transition${pathname.startsWith('/ai-agents') ? ' active' : ''}`}>{t("nav_ai_agents")}</Link>
          <Link href="/leistungen" className={`hover:text-blue-600 transition${pathname.startsWith('/leistungen') ? ' active' : ''}`}>{t("nav_leistungen")}</Link>
          <Link href="/references" className={`hover:text-blue-600 transition${pathname.startsWith('/references') ? ' active' : ''}`}>{t("nav_references")}</Link>
          <Link href="/contact" className={`hover:text-blue-600 transition${pathname.startsWith('/contact') ? ' active' : ''}`}>{t("nav_contact")}</Link>
        </div>
        <div className="ml-20">
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
}
