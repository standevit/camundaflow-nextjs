"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import McpIndexContent from "@/components/content/McpIndexContent";
import McpContent from "@/components/content/McpContent";

export default function McpPage() {
  const { t } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState("mcp-index");

  useEffect(() => {
    // Update document title based on active template
    const titleMap: Record<string, string> = {
      'mcp-index': t('mcp_index_heading') as string,
      'mcp': t('mcp_heading') as string
    };
    document.title = `${titleMap[activeTemplate] || 'MCP'} | CamundaFlow`;
  }, [activeTemplate, t]);

  const renderContent = () => {
    switch (activeTemplate) {
      case "mcp-index":
        return <McpIndexContent />;
      case "mcp":
        return <McpContent />;
      default:
        return <McpIndexContent />;
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
        <h3>{t("select_examples")}</h3>
        <ul>
          <li>
            <a
              className={`example-link ${activeTemplate === "mcp-index" ? "active" : ""}`}
              onClick={() => setActiveTemplate("mcp-index")}
            >
              {t("mcp_option1")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "mcp" ? "active" : ""}`}
              onClick={() => setActiveTemplate("mcp")}
            >
              {t("mcp_example")}
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
