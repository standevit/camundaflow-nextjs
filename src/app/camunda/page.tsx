"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import BpmnContent from "@/components/content/BpmnContent";
import ProcessBasicsContent from "@/components/content/ProcessBasicsContent";
import CamundaIndexContent from "@/components/content/CamundaIndexContent";
import McpIndexContent from "@/components/content/McpIndexContent";
import MigrationContent from "@/components/content/MigrationContent";
import AgentsCamundaContent from "@/components/content/AgentsCamundaContent";
import AiCustomerServiceContent from "@/components/content/AiCustomerServiceContent";

export default function CamundaPage() {
  const { t } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState("bpmn");
  const [snowflakes, setSnowflakes] = useState<Array<{left: string, duration: string, delay: string, size: string}>>([]);

  useEffect(() => {
    // Generate snowflakes on client side only
    const flakes = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `${Math.random() * 5}s`,
      size: `${1 + Math.random() * 1}rem`
    }));
    setSnowflakes(flakes);
  }, []);

  useEffect(() => {
    // Check URL params for tab parameter
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && ['bpmn', 'process-basics', 'camunda-index', 'mcp', 'migration', 'agents-camunda', 'ai-customer-service'].includes(tab)) {
      setActiveTemplate(tab);
    }
  }, []);

  useEffect(() => {
    // Update document title based on active template
    const titleMap: Record<string, string> = {
      'bpmn': t('nav_bpmn') as string,
      'process-basics': 'Camunda 7',
      'camunda-index': t('what_is_camunda8') as string,
      'mcp': t('nav_mcp') as string,
      'migration': t('migration_link') as string,
      'agents-camunda': t('agents_camunda_heading') as string,
      'ai-customer-service': t('ai_customer_service_intro_heading') as string
    };
    document.title = `${titleMap[activeTemplate] || 'Camunda 8'} | CamundaFlow`;
  }, [activeTemplate, t]);

  const renderContent = () => {
    switch (activeTemplate) {
      case "bpmn":
        return <BpmnContent />;
      case "process-basics":
        return <ProcessBasicsContent />;
      case "camunda-index":
        return <CamundaIndexContent />;
      case "mcp":
        return <McpIndexContent />;
      case "migration":
        return <MigrationContent />;
      case "agents-camunda":
        return <AgentsCamundaContent />;
      case "ai-customer-service":
        return <AiCustomerServiceContent />;
      default:
        return <BpmnContent />;
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

        try {
          const viewer = new BpmnJS({ container: block });
          const xml = await fetch(diagram).then((r) => r.text());
          await viewer.importXML(xml);

          const bpmnCanvas = viewer.get("canvas");

          const tryZoom = () => {
            const viewbox = bpmnCanvas.viewbox();

            if (
              viewbox.inner &&
              viewbox.outer &&
              viewbox.outer.width > 0 &&
              viewbox.outer.height > 0
            ) {
              bpmnCanvas.zoom("fit-viewport", { padding: 30 });
            } else {
              requestAnimationFrame(tryZoom);
            }
          };

          tryZoom();
        } catch (err) {
          console.error("Failed to load BPMN diagram:", err);
        }
      }
    };

    initBpmn();
  }, [activeTemplate]);

  return (
    <>
      {/* Snowfall animation */}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(10px);
            opacity: 0.3;
          }
        }
        .snowflake {
          position: fixed;
          top: -10vh;
          z-index: 9999;
          color: #87CEEB;
          font-size: 1.5rem;
          animation: snowfall linear infinite;
          pointer-events: none;
          text-shadow: 0 0 8px rgba(135, 206, 235, 1), 0 0 15px rgba(255, 255, 255, 0.8);
        }
      `}</style>
      
      {/* Generate snowflakes */}
      {snowflakes.map((flake, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            fontSize: flake.size,
          }}
        >
          ❄
        </div>
      ))}

    <div className="container">
      <aside className="sidebar">
        <h3>{t("nav_camunda")}</h3>
        <ul>
          <li>
            <a
              className={`example-link ${activeTemplate === "bpmn" ? "active" : ""}`}
              onClick={() => setActiveTemplate("bpmn")}
            >
              {t("nav_bpmn")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "process-basics" ? "active" : ""}`}
              onClick={() => setActiveTemplate("process-basics")}
            >
              Camunda 7
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "camunda-index" ? "active" : ""}`}
              onClick={() => setActiveTemplate("camunda-index")}
            >
              Camunda 8
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "mcp" ? "active" : ""}`}
              onClick={() => setActiveTemplate("mcp")}
            >
              {t("nav_mcp")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "migration" ? "active" : ""}`}
              onClick={() => setActiveTemplate("migration")}
            >
              Migration C7 → C8
            </a>
          </li>
          <li style={{ marginTop: '1rem' }}><b>AI Integration</b></li>
          <li>
            <a
              className={`example-link ${activeTemplate === "agents-camunda" ? "active" : ""}`}
              onClick={() => setActiveTemplate("agents-camunda")}
            >
              {t("ai_camunda")}
            </a>
          </li>
          <li><b>Use Cases</b></li>
          <li>
            <a
              className={`example-link ${activeTemplate === "ai-customer-service" ? "active" : ""}`}
              onClick={() => setActiveTemplate("ai-customer-service")}
            >
              {t("intelligent_customer_service")}
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
          src="/workflow2.avif" 
          alt="Workflow Design" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
        <img 
          src="/workflow.avif" 
          alt="Workflow Process" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      </aside>
    </div>
    </>
  );
}
