"use client";

import { useEffect, useState, Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useTranslation();
  const [companyInfo, setCompanyInfo] = useState<{ name: string; address: string; phone: string; email: string; kvk: string } | null>(null);

  useEffect(() => {
    document.title = `${t('contact_title') as string} | CamundaFlow`;
  }, [t]);

  useEffect(() => {

    const obfuscated = {
      name: "UHJvQXBweg==",
      address: "UmFuZHN0YWQgMjIgNDYsIDEzMTZCWiBBbG1lcmUsIE5lZGVybGFuZA==", 
      phone: "ICs0OSAxNTEgMjU1Nzk0MzU=",
      email: "cG9zdEBjYW11bmRhZmxvdy5kZQ==",
      kvk: "NzU3MDU1OTE="
    };


    try {
      setCompanyInfo({
        name: atob(obfuscated.name),
        address: atob(obfuscated.address),
        phone: atob(obfuscated.phone),
        email: atob(obfuscated.email),
        kvk: atob(obfuscated.kvk)
      });
    } catch (e) {
      console.error("Error decoding company info");
    }
  }, []);

  return (
    <div className="container">
      <aside className="sidebar" style={{ 
        padding: '1rem', 
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'hidden'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&h=300&fit=crop&q=80" 
          alt="Service desk support" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
        <img 
          src="/contact.avif" 
          alt="Contact us" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop&q=80" 
          alt="Developer at workspace" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
      </aside>

      <main className="main-content">
        <div className="card">
          <h1 className="contact-title">{t("contact_title")}</h1>

          <p className="contact-desc">
            {t("contact_desc")}
          </p>

          <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Učitavanje...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </main>

      <aside className="sidebar" style={{ 
        padding: '2rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        color: 'white'
      }}>
        {companyInfo && (
          <div style={{ width: '100%', marginTop: '3rem' }}>
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
              <div style={{ marginBottom: '0.3rem', wordBreak: 'break-all' }}>
                <a href={`mailto:${companyInfo.email}`} style={{ color: 'white', textDecoration: 'none' }}>
                  ✉️ {companyInfo.email}
                </a>
              </div>
              <div>
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

