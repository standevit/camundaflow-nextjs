"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function ProcessOrchestrationContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("process_orchestration_heading")}</h2>

      <p>{t("process_orchestration_intro")}</p>

      <h2>{t("process_orchestration_problem_heading")}</h2>
      <p>{t("process_orchestration_problem_example")}</p>
      <ol>
        <li>{t("process_orchestration_step1")}</li>
        <li>{t("process_orchestration_step2")}</li>
        <li>{t("process_orchestration_step3")}</li>
        <li>{t("process_orchestration_step4")}</li>
        <li>{t("process_orchestration_step5")}</li>
      </ol>

      <p>{t("process_orchestration_problem_chaos")}</p>

      <h2>{t("process_orchestration_solution_heading")}</h2>
      <ul>
        <li>{t("process_orchestration_solution_point1")}</li>
        <li>{t("process_orchestration_solution_point2")}</li>
        <li>{t("process_orchestration_solution_point3")}</li>
      </ul>

      <h2>{t("process_orchestration_benefits_heading")}</h2>
      <ul>
        <li>{t("process_orchestration_benefit1")}</li>
        <li>{t("process_orchestration_benefit2")}</li>
        <li>{t("process_orchestration_benefit3")}</li>
        <li>{t("process_orchestration_benefit4")}</li>
      </ul>
    </>
  );
}
