"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useTranslation();
  const [companyInfo, setCompanyInfo] = useState<{ name: string; address: string; phone: string; kvk: string } | null>(null);

  useEffect(() => {
    document.title = `${t('contact_title')} | CamundaFlow`;
  }, [t]);

  useEffect(() => {

    const obfuscated = {
      name: "UHJvQXBweg==",
      address: "UmFuZHN0YWQgMjIgNDYsIDEzMTZCWiBBbG1lcmUsIE5lZGVybGFuZA==", 
      phone: "ICs0OSAxNTEgMjU1Nzk0MzU=",
      kvk: "NzU3MDU1OTE="
    };


    try {
      setCompanyInfo({
        name: atob(obfuscated.name),
        address: atob(obfuscated.address),
        phone: atob(obfuscated.phone),
        kvk: atob(obfuscated.kvk)
      });
    } catch (e) {
      console.error("Error decoding company info");
    }
  }, []);

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

      <aside className="sidebar" style={{ 
        padding: '2rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: 'white'
      }}>
        {companyInfo && (
          <div style={{ width: '100%' }}>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid rgba(255,255,255,0.3)'
            }}>
              {companyInfo.name}
            </div>
            
            <div style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              opacity: '0.95'
            }}>
              <div style={{ marginBottom: '0.2rem' }}>
                <span style={{ fontStyle: 'italic' }}>{t("establishment_type")}:</span>
              </div>
              <div style={{ marginBottom: '0.3rem' }}>
                {companyInfo.address}
              </div>
              <div style={{ marginBottom: '0.3rem' }}>
                <span style={{ fontStyle: 'italic' }}>{t("kvk_number")}:</span> {companyInfo.kvk}
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                📞 {companyInfo.phone}
              </div>
            </div>
            
            <div style={{
              fontSize: '0.9rem',
              lineHeight: '1.6',
              opacity: '0.85',
              fontStyle: 'italic',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '1.5rem'
            }}>
              {t("contact_eu_text")}
              <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                {t("no_cure_no_pay")}
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

