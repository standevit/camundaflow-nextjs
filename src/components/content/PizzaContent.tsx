"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function PizzaContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("pizza_title")}</h2>
      <p>{t("pizza_intro")}</p>
      <ul>
        <li>{t("pizza_step1")}</li>
        <li>{t("pizza_step2")}</li>
        <li>{t("pizza_step3")}</li>
        <li>{t("pizza_step4")}</li>
      </ul>
      <div className="bpmn-container" data-diagram="../bpmn/pizza.bpmn"></div>
    </>
  );
}
