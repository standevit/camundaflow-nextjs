"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import SupplyChainContent from "@/components/content/SupplyChainContent";
import BudgetverwaltungContent from "@/components/content/BudgetverwaltungContent";
import ServicePortalBWContent from "@/components/content/ServicePortalBWContent";

export default function ReferencesPage() {
  const { t } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState("supply-chain");

  useEffect(() => {
    document.title = `${t('nav_references') as string} | CamundaFlow`;
  }, [t]);

  const renderContent = () => {
    switch (activeTemplate) {
      case "supply-chain":
        return <SupplyChainContent />;
      case "budgetverwaltung":
        return <BudgetverwaltungContent />;
      case "service-portal-bw":
        return <ServicePortalBWContent />;
      default:
        return <SupplyChainContent />;
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h3>{t("nav_references")}</h3>
        <ul>
          <li>
            <a
              className={`example-link ${activeTemplate === "supply-chain" ? "active" : ""}`}
              onClick={() => setActiveTemplate("supply-chain")}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>Multi-Tenant Supply-Chain</span>
              <img src="/vink.jpeg" alt="✓" style={{ width: '36px', height: '36px', flexShrink: 0 }} />
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "budgetverwaltung" ? "active" : ""}`}
              onClick={() => setActiveTemplate("budgetverwaltung")}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>Budgetverwaltung</span>
              <img src="/vink.jpeg" alt="✓" style={{ width: '36px', height: '36px', flexShrink: 0 }} />
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "service-portal-bw" ? "active" : ""}`}
              onClick={() => setActiveTemplate("service-portal-bw")}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>Service-Portal Baden-Württemberg</span>
              <img src="/vink.jpeg" alt="✓" style={{ width: '36px', height: '36px', flexShrink: 0 }} />
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
        {activeTemplate === "supply-chain" && (
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=300&fit=crop&q=80" 
            alt="Happy business team" 
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        )}
        {activeTemplate === "budgetverwaltung" && (
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&q=80" 
            alt="Business handshake" 
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        )}
        {activeTemplate === "service-portal-bw" && (
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop&q=80" 
            alt="Business professionals handshake" 
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        )}
      </aside>
    </div>
  );
}
