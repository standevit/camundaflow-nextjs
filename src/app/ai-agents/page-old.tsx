"use client";

import TemplatePage from "@/components/TemplatePage";
import { useTranslation } from "@/components/LanguageProvider";

export default function AiAgentsPage() {
  const { t } = useTranslation();

  return (
    <TemplatePage
      initial="tmp/ai-agents-index.html"
      items={[
        { label: t("ai_agents_opt1") as string, template: "tmp/ai-agents-index.html" },
        { label: t("ai_camunda") as string, template: "tmp/agents-camunda.html" },
        {
          label: t("intelligent_customer_service") as string,
          template: "tmp/ai-customer-service.html",
        },
      ]}
    />
  );
}

