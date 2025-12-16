"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function DeliveryContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("delivery_title")}</h2>

      <p>{t("delivery_intro")}</p>

      <ul>
        <li>{t("delivery_step1")}</li>
        <li>{t("delivery_step2")}</li>
        <li>{t("delivery_step3")}</li>
        <li>{t("delivery_step4")}</li>
      </ul>

      <div className="bpmn-container" data-diagram="../bpmn/lieferung.bpmn"></div>
    </>
  );
}
