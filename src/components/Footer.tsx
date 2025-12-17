"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-200 text-center text-gray-600">
      {t("footer_year")}
    </footer>
  );
}
