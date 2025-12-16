"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function AgentsCamundaContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("agents_camunda_heading")}</h2>
      <p>{t("agents_camunda_intro")}</p>

      <section>
        <h3>{t("agents_camunda_why_heading")}</h3>
        <ul>
          <li>{t("agents_camunda_reason_1")}</li>
          <li>{t("agents_camunda_reason_2")}</li>
          <li>{t("agents_camunda_reason_3")}</li>
          <li>{t("agents_camunda_reason_4")}</li>
          <li>{t("agents_camunda_reason_5")}</li>
          <li>{t("agents_camunda_reason_6")}</li>
        </ul>
      </section>

      <section>
        <h3>{t("agents_camunda_use_cases_heading")}</h3>
        <ul>
          <li>{t("agents_camunda_use_case_1")}</li>
          <li>{t("agents_camunda_use_case_2")}</li>
          <li>{t("agents_camunda_use_case_3")}</li>
          <li>{t("agents_camunda_use_case_4")}</li>
          <li>{t("agents_camunda_use_case_5")}</li>
        </ul>
      </section>

      <section>
        <p>{t("agents_camunda_cta")}</p>
        <a href="mailto:info@camundaflow.de" className="btn-primary">
          {t("agents_camunda_cta_button")}
        </a>
      </section>
    </>
  );
}
