"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function B2BOrderContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("b2b_order_title")}</h2>

      <p>{t("b2b_order_intro")}</p>

      <ul>
        <li>{t("b2b_order_step1")}</li>
        <li>{t("b2b_order_step2")}</li>
        <li>{t("b2b_order_step3")}</li>
        <li>{t("b2b_order_step4")}</li>
      </ul>

      <div className="bpmn-container" data-diagram="../bpmn/b2bbestellung.bpmn"></div>
    </>
  );
}
