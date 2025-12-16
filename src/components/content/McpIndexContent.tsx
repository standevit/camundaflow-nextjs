"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function McpIndexContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("mcp_index_heading")}</h2>
      <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3rem" }}>
        {t("mcp_index_intro")}
      </p>

      <section>
        <h3>{t("mcp_index_what_heading")}</h3>
        <ul>
          <li><strong>{t("mcp_index_discovers_label")}</strong> {t("mcp_index_discovers")}</li>
          <li><strong>{t("mcp_index_understands_label")}</strong> {t("mcp_index_understands")}</li>
          <li><strong>{t("mcp_index_calls_label")}</strong> {t("mcp_index_calls")}</li>
          <li><strong>{t("mcp_index_works_label")}</strong> {t("mcp_index_works")}</li>
          <li><strong>{t("mcp_index_supports_label")}</strong> {t("mcp_index_supports")}</li>
          <li><strong>{t("mcp_index_enables_label")}</strong> {t("mcp_index_enables")}</li>
        </ul>

        <h3>{t("mcp_index_tools_heading")}</h3>
        <ul>
          <li>{t("mcp_index_tool_1")}</li>
          <li>{t("mcp_index_tool_2")}</li>
          <li>{t("mcp_index_tool_3")}</li>
          <li>{t("mcp_index_tool_4")}</li>
          <li>{t("mcp_index_tool_5")}</li>
          <li>{t("mcp_index_tool_6")}</li>
          <li>{t("mcp_index_tool_7")}</li>
        </ul>

        <h3>{t("mcp_index_why_camunda_heading")}</h3>
        <ul>
          <li><strong>{t("mcp_index_benefit_1_label")}</strong> {t("mcp_index_benefit_1")}</li>
          <li><strong>{t("mcp_index_benefit_2_label")}</strong> {t("mcp_index_benefit_2")}</li>
          <li><strong>{t("mcp_index_benefit_3_label")}</strong> {t("mcp_index_benefit_3")}</li>
          <li><strong>{t("mcp_index_benefit_4_label")}</strong> {t("mcp_index_benefit_4")}</li>
          <li><strong>{t("mcp_index_benefit_5_label")}</strong> {t("mcp_index_benefit_5")}</li>
          <li><strong>{t("mcp_index_benefit_6_label")}</strong> {t("mcp_index_benefit_6")}</li>
        </ul>

        <p><strong>{t("mcp_index_conclusion_label")}</strong> {t("mcp_index_conclusion")}</p>
      </section>
    </>
  );
}
