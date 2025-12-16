"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";
import BpmnContent from "@/components/content/BpmnContent";
import ProcessBasicsContent from "@/components/content/ProcessBasicsContent";
import PizzaContent from "@/components/content/PizzaContent";
import OrderApprovalContent from "@/components/content/OrderApprovalContent";
import DeliveryContent from "@/components/content/DeliveryContent";
import B2BOrderContent from "@/components/content/B2BOrderContent";

export default function HomePage() {
  const { t } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState("bpmn");

  const renderContent = () => {
    switch (activeTemplate) {
      case "bpmn":
        return <BpmnContent />;
      case "process-basics":
        return <ProcessBasicsContent />;
      case "pizza":
        return <PizzaContent />;
      case "order-approval":
        return <OrderApprovalContent />;
      case "delivery":
        return <DeliveryContent />;
      case "b2b":
        return <B2BOrderContent />;
      default:
        return <BpmnContent />;
    }
  };

  // Initialize BPMN viewer after content changes
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
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h3>{t("select_examples")}</h3>
        <ul>
          <li>
            <a
              className={`example-link ${activeTemplate === "bpmn" ? "active" : ""}`}
              onClick={() => setActiveTemplate("bpmn")}
            >
              {t("bpmn_20")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "process-basics" ? "active" : ""}`}
              onClick={() => setActiveTemplate("process-basics")}
            >
              {t("process_modeling")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "pizza" ? "active" : ""}`}
              onClick={() => setActiveTemplate("pizza")}
            >
              {t("pizza_order")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "order-approval" ? "active" : ""}`}
              onClick={() => setActiveTemplate("order-approval")}
            >
              {t("order_approval")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "delivery" ? "active" : ""}`}
              onClick={() => setActiveTemplate("delivery")}
            >
              {t("event_driven")}
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "b2b" ? "active" : ""}`}
              onClick={() => setActiveTemplate("b2b")}
            >
              {t("webshop")}
            </a>
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        <div className="card">
          <div id="canvas">{renderContent()}</div>
          <Link href="/ai-agents" className="btn-primary">
            {t("ai_agents_link")}
          </Link>
        </div>
      </main>
    </div>
  );
}
