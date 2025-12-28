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

            <div style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              width: '100%'
            }}>
              <a 
                href="https://www.linkedin.com/company/camundaflow" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'opacity 0.3s ease',
                  padding: '0.5rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.006 1.419-.103.249-.129.597-.129.946v5.44h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.598 2.897-1.598 2.117 0 3.704 1.385 3.704 4.362v5.589zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.768-1.71 1.959-1.71 1.19 0 1.916.755 1.935 1.71 0 .951-.745 1.71-1.979 1.71zm1.616 11.597H3.721V9.624h3.232v10.828zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

