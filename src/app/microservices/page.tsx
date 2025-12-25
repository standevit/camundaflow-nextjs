"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import MicroservicesIndexContent from "@/components/content/MicroservicesIndexContent";
import MicroservicesPatternsContent from "@/components/content/MicroservicesPatternsContent";
import MicroservicesBestPracticesContent from "@/components/content/MicroservicesBestPracticesContent";

export default function MicroservicesPage() {
  const { t } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState("overview");

  useEffect(() => {
    // Update document title based on active template
    const titleMap: Record<string, string> = {
      'overview': t('microservices_overview') as string,
      'patterns': t('microservices_patterns') as string,
      'best-practices': t('microservices_best_practices') as string
    };
    document.title = `${titleMap[activeTemplate] || t('microservices_page_title')} | CamundaFlow`;
  }, [activeTemplate, t]);

  const renderContent = () => {
    switch (activeTemplate) {
      case "overview":
        return <MicroservicesIndexContent />;
      case "patterns":
        return <MicroservicesPatternsContent />;
      case "best-practices":
        return <MicroservicesBestPracticesContent />;
      default:
        return <MicroservicesIndexContent />;
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h3>{t("microservices_page_title")}</h3>
        <ul>
          <li>
            <a
              className={`example-link ${activeTemplate === "overview" ? "active" : ""}`}
              onClick={() => setActiveTemplate("overview")}
              style={{ cursor: 'pointer' }}
            >
              📖 {t("microservices_overview")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "patterns" ? "active" : ""}`}
              onClick={() => setActiveTemplate("patterns")}
              style={{ cursor: 'pointer' }}
            >
              🎨 {t("microservices_patterns")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "best-practices" ? "active" : ""}`}
              onClick={() => setActiveTemplate("best-practices")}
              style={{ cursor: 'pointer' }}
            >
              ✨ {t("microservices_best_practices")}
            </a>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <div className="card">
          <div id="canvas">{renderContent()}</div>
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
          src="/service-portal.avif" 
          alt="Microservices Portal" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
        <img 
          src="/supply-chain.avif" 
          alt="Supply Chain" 
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
