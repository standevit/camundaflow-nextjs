"use client";

import { useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";

export default function LeistungenPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('leistungen_title') as string} | CamundaFlow`;
  }, [t]);

  return (
    <div className="container">
      <aside className="sidebar" style={{ 
        padding: '0', 
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <img 
          src="/leistung1.avif" 
          alt="Leistung 1" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
        <img 
          src="/leistung2.avif" 
          alt="Leistung 2" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      </aside>

      <main className="main-content">
        <div className="card">
          <h2>{t("leistungen_title")}</h2>
          <p style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 3rem" }}>
            {t("leistungen_desc")}
          </p>

          <div className="grid">
            <div className="leistungen-card">
              <h3>{t("architecture_consulting")}</h3>
              <p>
                {t("architecture_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("implementation")}</h3>
              <p>
                {t("implementation_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("migration")}</h3>
              <p>
                {t("migration_desc")}
              </p>
              <a 
                href="/camunda?tab=migration" 
                className="btn-primary" 
                style={{ 
                  marginTop: '1rem', 
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                {t("migration_link")} →
              </a>
            </div>

            <div className="leistungen-card">
              <h3>{t("training")}</h3>
              <p>
                {t("training_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("microservices")}</h3>
              <p>
                {t("microservices_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("event_driven_service")}</h3>
              <p>
                {t("event_driven_service_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("identity_management")}</h3>
              <p>
                {t("identity_management_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("devops_kubernetes")}</h3>
              <p>
                {t("devops_kubernetes_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("ai_integration")}</h3>
              <p>
                {t("ai_integration_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("frontend_development")}</h3>
              <p>
                {t("frontend_development_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("ecommerce")}</h3>
              <p>
                {t("ecommerce_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("performance")}</h3>
              <p>
                {t("performance_desc")}
              </p>
            </div>
          </div>

          <a 
            href="/contact" 
            className="btn-primary"
            style={{ 
              marginTop: '2rem',
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            {t("request_quote")}
          </a>
        </div>
      </main>

      <aside className="sidebar" style={{ 
        padding: '0', 
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <img 
          src="/leistung3.avif" 
          alt="Leistung 3" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
        <img 
          src="/leistung4.avif" 
          alt="Leistung 4" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      </aside>
    </div>
  );
}

