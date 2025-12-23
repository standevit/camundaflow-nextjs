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
            >
              Multi-Tenant Supply-Chain
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "budgetverwaltung" ? "active" : ""}`}
              onClick={() => setActiveTemplate("budgetverwaltung")}
            >
              Budgetverwaltung
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "service-portal-bw" ? "active" : ""}`}
              onClick={() => setActiveTemplate("service-portal-bw")}
            >
              Service-Portal Baden-Württemberg
            </a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="card">
          <div id="canvas">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}
