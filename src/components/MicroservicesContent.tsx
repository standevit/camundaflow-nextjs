"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/components/LanguageProvider";
import MicroservicesIndexContent from "@/components/content/MicroservicesIndexContent";
import MicroservicesPatternsContent from "@/components/content/MicroservicesPatternsContent";
import MicroservicesBestPracticesContent from "@/components/content/MicroservicesBestPracticesContent";
import OrderProcessContent from "@/components/content/OrderProcessContent";

export default function MicroservicesContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [activeTemplate, setActiveTemplate] = useState("overview");

  useEffect(() => {
    // Read tab from URL parameters
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'patterns', 'best-practices', 'order-process'].includes(tab)) {
      setActiveTemplate(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    // Update document title based on active template
    const titleMap: Record<string, string> = {
      'overview': t('microservices_overview') as string,
      'patterns': t('microservices_patterns') as string,
      'best-practices': t('microservices_best_practices') as string,
      'order-process': t('microservices_order_process') as string
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
      case "order-process":
        return <OrderProcessContent />;
      default:
        return <MicroservicesIndexContent />;
    }
  };

  useEffect(() => {
    const initBpmn = async () => {
      const canvas = document.getElementById("canvas");
      if (!canvas) return;

      const BpmnJS = (await import(
        "bpmn-js/dist/bpmn-navigated-viewer.development.js"
      )).default;

      const blocks = canvas.querySelectorAll("[data-diagram]");

      for (const block of Array.from(blocks)) {
        const diagram = block.getAttribute("data-diagram");
        if (!diagram) continue;

        const container = block as HTMLElement;
        container.innerHTML = "";

        const viewer = new BpmnJS({ container });

        try {
          const response = await fetch(diagram);
          const xml = await response.text();
          await viewer.importXML(xml);
          const canvas = viewer.get("canvas");
          canvas.zoom("fit-viewport");
        } catch (err) {
          console.error("Error loading BPMN:", err);
        }
      }
    };

    initBpmn();
  }, [activeTemplate]);

  return (
    <>
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
          <li><b>Use Cases</b></li>
          <li>
            <a
              className={`example-link ${activeTemplate === "order-process" ? "active" : ""}`}
              onClick={() => setActiveTemplate("order-process")}
              style={{ cursor: 'pointer' }}
            >
              🛒 {t("microservices_order_process")}
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
    </>
  );
}
