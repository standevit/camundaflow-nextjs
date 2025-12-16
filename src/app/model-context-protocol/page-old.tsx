"use client";

import TemplatePage from "@/components/TemplatePage";
import { useTranslation } from "@/components/LanguageProvider";

export default function McpPage() {
  const { t } = useTranslation();

  return (
    <TemplatePage
      initial="tmp/mcp-index.html"
      items={[
        { label: t("mcp_option1") as string, template: "tmp/mcp-index.html" },
        { label: t("mcp_example") as string, template: "tmp/mcp.html" },
      ]}
    />
  );
}

