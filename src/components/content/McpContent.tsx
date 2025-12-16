"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function McpContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("mcp_heading")}</h2>
      <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3rem" }}>
        {t("mcp_intro")}
      </p>

      <section>
        <ul>
          <li>{t("mcp_step_1")}</li>
          <li>{t("mcp_step_2")}</li>
          <li>{t("mcp_step_3")}</li>
          <li>{t("mcp_step_4")}</li>
          <li>{t("mcp_step_5")}</li>
          <li>{t("mcp_step_6")}</li>
        </ul>

        <div className="bpmn-container" data-diagram="../bpmn/mcp.bpmn"></div>
      </section>
    </>
  );
}
