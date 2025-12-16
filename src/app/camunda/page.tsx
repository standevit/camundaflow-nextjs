"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import CamundaIndexContent from "@/components/content/CamundaIndexContent";
import WorkflowAutomationContent from "@/components/content/WorkflowAutomationContent";
import ProcessOrchestrationContent from "@/components/content/ProcessOrchestrationContent";
import HumanCentricContent from "@/components/content/HumanCentricContent";
import ScalabilityContent from "@/components/content/ScalabilityContent";

export default function CamundaPage() {
  const { t } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState("camunda-index");

  const renderContent = () => {
    switch (activeTemplate) {
      case "camunda-index":
        return <CamundaIndexContent />;
      case "workflow-automation":
        return <WorkflowAutomationContent />;
      case "process-orchestration":
        return <ProcessOrchestrationContent />;
      case "human-centric":
        return <HumanCentricContent />;
      case "scalability":
        return <ScalabilityContent />;
      default:
        return <CamundaIndexContent />;
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h3>{t("select_examples")}</h3>
        <ul>
          <li>
            <a
              className={`example-link ${activeTemplate === "camunda-index" ? "active" : ""}`}
              onClick={() => setActiveTemplate("camunda-index")}
            >
              {t("what_is_camunda8")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "workflow-automation" ? "active" : ""}`}
              onClick={() => setActiveTemplate("workflow-automation")}
            >
              {t("workflow_automation")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "process-orchestration" ? "active" : ""}`}
              onClick={() => setActiveTemplate("process-orchestration")}
            >
              {t("process_orchestration")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "human-centric" ? "active" : ""}`}
              onClick={() => setActiveTemplate("human-centric")}
            >
              {t("user_tasks_cockpit")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "scalability" ? "active" : ""}`}
              onClick={() => setActiveTemplate("scalability")}
            >
              {t("scalability")}
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
