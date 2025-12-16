"use client";

import ContactForm from "@/components/ContactForm";
import { useTranslation } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <aside className="sidebar" style={{ padding: 0, background: 'transparent' }}>
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80" 
          alt="Professional team" 
          className="w-full h-full object-cover"
        />
      </aside>

      <main className="main-content">
        <div className="card">
          <h1 className="contact-title">{t("contact_title")}</h1>

          <p className="contact-desc">
            {t("contact_desc")}
          </p>

          <ContactForm />
        </div>
      </main>
    </div>
  );
}

