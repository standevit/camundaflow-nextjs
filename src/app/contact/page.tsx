"use client";

import ContactForm from "@/components/ContactForm";
import { useTranslation } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <main>
      <div className="card max-w-3xl mx-auto">
        <h1 className="contact-title">{t("contact_title")}</h1>

        <p className="contact-desc">
          {t("contact_desc")}
        </p>

        <ContactForm />
      </div>
    </main>
  );
}

