import TemplatePage from "@/components/TemplatePage";

export const metadata = {
  title: "AI Agents mit Camunda 8 – Camunda Flow",
};

export default function AiAgentsPage() {
  return (
    <TemplatePage
      initial="tmp/mcp-index.html"
      items={[
        { label: "Model Context Protocol", template: "tmp/mcp-index.html" },
        { label: "MCP Beispeil", template: "tmp/mcp.html" },
      ]}
    />
  );
}

