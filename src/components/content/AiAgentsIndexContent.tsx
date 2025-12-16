"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function AiAgentsIndexContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("ai_agents_index_heading")}</h2>
      <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3rem" }}>
        {t("ai_agents_index_intro")}
      </p>

      <section>
        <h3>{t("ai_agents_index_what_heading")}</h3>
        <ul>
          <li><strong>{t("ai_agents_index_understands_label")}</strong> {t("ai_agents_index_understands")}</li>
          <li><strong>{t("ai_agents_index_decides_label")}</strong> {t("ai_agents_index_decides")}</li>
          <li><strong>{t("ai_agents_index_acts_label")}</strong> {t("ai_agents_index_acts")}</li>
          <li><strong>{t("ai_agents_index_asks_label")}</strong> {t("ai_agents_index_asks")}</li>
          <li><strong>{t("ai_agents_index_learns_label")}</strong> {t("ai_agents_index_learns")}</li>
          <li><strong>{t("ai_agents_index_controllable_label")}</strong> {t("ai_agents_index_controllable")}</li>
        </ul>

        <h3>{t("ai_agents_index_use_cases_heading")}</h3>
        <ul>
          <li>{t("ai_agents_index_use_case_1")}</li>
          <li>{t("ai_agents_index_use_case_2")}</li>
          <li>{t("ai_agents_index_use_case_3")}</li>
          <li>{t("ai_agents_index_use_case_4")}</li>
          <li>{t("ai_agents_index_use_case_5")}</li>
        </ul>

        <h3>{t("ai_agents_index_why_camunda_heading")}</h3>
        <ul>
          <li>{t("ai_agents_index_benefit_1")}</li>
          <li>{t("ai_agents_index_benefit_2")}</li>
          <li>{t("ai_agents_index_benefit_3")}</li>
          <li>{t("ai_agents_index_benefit_4")}</li>
          <li>{t("ai_agents_index_benefit_5")}</li>
        </ul>

        <p><strong>{t("ai_agents_index_conclusion_label")}</strong> {t("ai_agents_index_conclusion")}</p>
      </section>
    </>
  );
}
