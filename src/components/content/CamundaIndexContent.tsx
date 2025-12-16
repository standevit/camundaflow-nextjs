"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function CamundaIndexContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("camunda_index_heading")}</h2>
      <p>{t("camunda_index_intro")}</p>

      <section>
        <h3>{t("camunda_index_components_heading")}</h3>
        <ul>
          <li><strong>Zeebe</strong>: {t("camunda_index_zeebe")}</li>
          <li><strong>Operate</strong>: {t("camunda_index_operate")}</li>
          <li><strong>Tasklist</strong>: {t("camunda_index_tasklist")}</li>
          <li><strong>Optimize</strong>: {t("camunda_index_optimize")}</li>
          <li><strong>DMN Engine</strong>: {t("camunda_index_dmn")}</li>
        </ul>
        <p>{t("camunda_index_benefits")}</p>
      </section>
    </>
  );
}
