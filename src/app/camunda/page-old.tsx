"use client";

import TemplatePage from "@/components/TemplatePage";
import { useTranslation } from "@/components/LanguageProvider";

export default function CamundaPage() {
  const { t } = useTranslation();

  return (
    <TemplatePage
      initial="tmp/camunda-index.html"
      items={[
        { label: t("what_is_camunda8") as string, template: "tmp/camunda-index.html" },
        { label: t("workflow_automation") as string, template: "tmp/workflow-automation.html" },
        { label: t("process_orchestration") as string, template: "tmp/process-orchestration.html" },
        { label: t("user_tasks_cockpit") as string, template: "tmp/human-centric.html" },
        { label: t("scalability") as string, template: "tmp/skalierbarkeit-tmp.html" },
      ]}
    />
  );
}

