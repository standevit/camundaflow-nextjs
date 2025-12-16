"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function ProcessBasicsContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("process_basics_title")}</h2>
      <p>{t("process_basics_intro")}</p>

      <h2>{t("process_basics_what_is")}</h2>
      <p>{t("process_basics_what_is_desc")}</p>
      <ul>
        <li>{t("process_basics_example1")}</li>
        <li>{t("process_basics_example2")}</li>
        <li>{t("process_basics_example3")}</li>
      </ul>

      <h2>{t("process_basics_why_model")}</h2>
      <ul>
        <li><strong>{t("process_basics_transparency")}</strong> – {t("process_basics_transparency_desc")}</li>
        <li><strong>{t("process_basics_optimization")}</strong> – {t("process_basics_optimization_desc")}</li>
        <li><strong>{t("process_basics_automation")}</strong> – {t("process_basics_automation_desc")}</li>
        <li><strong>{t("process_basics_compliance")}</strong> – {t("process_basics_compliance_desc")}</li>
      </ul>

      <h2>{t("process_basics_three_levels")}</h2>
      <ol>
        <li><strong>{t("process_basics_level1")}</strong> {t("process_basics_level1_desc")}</li>
        <li><strong>{t("process_basics_level2")}</strong> {t("process_basics_level2_desc")}</li>
        <li><strong>{t("process_basics_level3")}</strong> {t("process_basics_level3_desc")}</li>
      </ol>

      <p>{t("process_basics_camunda_note")}</p>
    </>
  );
}
