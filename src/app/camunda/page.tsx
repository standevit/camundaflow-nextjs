import TemplatePage from "@/components/TemplatePage";

export const metadata = {
  title: "Camunda 8 – Camunda Flow",
};

export default function CamundaPage() {
  return (
    <TemplatePage
      initial="tmp/camunda-index.html"
      items={[
        { label: "Was ist Camunda 8?", template: "tmp/camunda-index.html" },
        { label: "Workflow Automation", template: "tmp/workflow-automation.html" },
        { label: "Process Orchestration", template: "tmp/process-orchestration.html" },
        { label: "User Tasks & Cockpit", template: "tmp/human-centric.html" },
        { label: "Skalierbarkeit", template: "tmp/skalierbarkeit-tmp.html" },
      ]}
    />
  );
}

