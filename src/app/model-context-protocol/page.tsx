import TemplatePage from "@/components/TemplatePage";

export const metadata = {
  title: "AI Agents mit Camunda 8 – Camunda Flow",
};

export default function AiAgentsPage() {
  return (
    <TemplatePage
      initial="tmp/ai-agents-index.html"
      items={[
        { label: "AI Agents", template: "tmp/ai-agents-index.html" },
        { label: "AI & Camunda", template: "tmp/agents-camunda.html" },
        {
          label: "Intelligenter Kundenservice",
          template: "tmp/ai-customer-service.html",
        },
      ]}
    />
  );
}

