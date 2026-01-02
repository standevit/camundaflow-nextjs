"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/components/LanguageProvider";
import ProjectRequestModal from "@/components/ProjectRequestModal";
import AiAgentsIndexContent from "@/components/content/AiAgentsIndexContent";
import AgentsCamundaContent from "@/components/content/AgentsCamundaContent";
import AiCustomerServiceContent from "@/components/content/AiCustomerServiceContent";
import LlmTrainingContent from "@/components/content/LlmTrainingContent";
import IntelligenterRezeptionistContent from "@/components/content/IntelligenterRezeptionistContent";
import FraudDetectionContent from "@/components/content/FraudDetectionContent";
import IntelligentDocumentProcessingContent from "@/components/content/IntelligentDocumentProcessingContent";

function AiAgentsContent() {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [activeTemplate, setActiveTemplate] = useState("ai-agents-index");
  const [showRequestModal, setShowRequestModal] = useState(false);

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";

  // Handle URL tab parameter on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTemplate(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    // Update document title based on active template
    const titleMap: Record<string, string> = {
      'ai-agents-index': t('ai_agents_index_heading') as string,
      'agents-camunda': t('agents_camunda_heading') as string,
      'ai-customer-service': t('ai_customer_service_intro_heading') as string,
      'llm-training': 'LLM Training und Modellentwicklung',
      'intelligenter-rezeptionist': 'Intelligenter Rezeptionist',
      'fraud-detection': t('fraud_detection_heading') as string,
      'intelligent-document-processing': t('idp_heading') as string
    };
    document.title = `${titleMap[activeTemplate] || 'AI Agents'} | CamundaFlow`;
  }, [activeTemplate, t]);

  const renderContent = () => {
    switch (activeTemplate) {
      case "ai-agents-index":
        return <AiAgentsIndexContent />;
      case "agents-camunda":
        return <AgentsCamundaContent />;
      case "ai-customer-service":
        return <AiCustomerServiceContent />;
      case "llm-training":
        return <LlmTrainingContent />;
      case "intelligenter-rezeptionist":
        return <IntelligenterRezeptionistContent />;
      case "fraud-detection":
        return <FraudDetectionContent />;
      case "intelligent-document-processing":
        return <IntelligentDocumentProcessingContent />;
      default:
        return <AiAgentsIndexContent />;
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
      <ProjectRequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        userName={userName}
        userEmail={userEmail}
        requestType="ai-agents"
      />
      <div className="container">
      <aside className="sidebar">
        <h3>AI Agents</h3>
        <ul>
          <li>
            <a
              className={`example-link ${activeTemplate === "ai-agents-index" ? "active" : ""}`}
              onClick={() => setActiveTemplate("ai-agents-index")}
            >
              {t("ai_agents_opt1")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "llm-training" ? "active" : ""}`}
              onClick={() => setActiveTemplate("llm-training")}
            >
              LLM Training
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "agents-camunda" ? "active" : ""}`}
              onClick={() => setActiveTemplate("agents-camunda")}
            >
              {t("agents_camunda_heading")}
            </a>
          </li>
          <li><b>Use Cases</b></li>
          <li>
            <a
              className={`example-link ${activeTemplate === "intelligenter-rezeptionist" ? "active" : ""}`}
              onClick={() => setActiveTemplate("intelligenter-rezeptionist")}
            >
              1. {t("intelligent_receptionist")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "fraud-detection" ? "active" : ""}`}
              onClick={() => setActiveTemplate("fraud-detection")}
            >
              2. {t("fraud_detection")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "intelligent-document-processing" ? "active" : ""}`}
              onClick={() => setActiveTemplate("intelligent-document-processing")}
            >
              3. {t("idp_nav")}
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
          src="/ai-profiel.webp" 
          alt="AI Profile" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
        <img 
          src="https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=400&h=400&fit=crop" 
          alt="AI Neural Network" 
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

export default function AiAgentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AiAgentsContent />
    </Suspense>
  );
}
