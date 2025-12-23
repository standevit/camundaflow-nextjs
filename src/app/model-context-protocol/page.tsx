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
