"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import BpmnContent from "@/components/content/BpmnContent";
import ProcessBasicsContent from "@/components/content/ProcessBasicsContent";
import CamundaIndexContent from "@/components/content/CamundaIndexContent";
import McpIndexContent from "@/components/content/McpIndexContent";
import MigrationContent from "@/components/content/MigrationContent";

export default function CamundaPage() {
  const { t } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState("bpmn");

  useEffect(() => {
    // Check URL params for tab parameter
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && ['bpmn', 'process-basics', 'camunda-index', 'mcp', 'migration'].includes(tab)) {
      setActiveTemplate(tab);
    }
  }, []);

  useEffect(() => {
    // Update document title based on active template
    const titleMap: Record<string, string> = {
      'bpmn': t('nav_bpmn') as string,
      'process-basics': t('process_basics_title') as string,
      'camunda-index': t('what_is_camunda8') as string,
      'mcp': t('nav_mcp') as string,
      'migration': t('migration_link') as string
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
              {t("process_basics_title")}
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
              {t("migration_link")}
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
