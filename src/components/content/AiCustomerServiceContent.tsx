"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function AiCustomerServiceContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("ai_customer_service_intro_heading")}</h2>
      <p>{t("ai_customer_service_intro_desc")}</p>

      <section>
        <h3>{t("ai_customer_service_intro_capabilities_heading")}</h3>
        <ul>
          <li>{t("ai_customer_service_intro_capability_1")}</li>
          <li>{t("ai_customer_service_intro_capability_2")}</li>
          <li>{t("ai_customer_service_intro_capability_3")}</li>
          <li>{t("ai_customer_service_intro_capability_4")}</li>
        </ul>

        <p>{t("ai_customer_service_intro_result")}</p>
      </section>

      <section>
        <h3>{t("ai_customer_service_intro_process_heading")}</h3>
        <p>{t("ai_customer_service_intro_process_step_1")}</p>
        <p>{t("ai_customer_service_intro_process_step_2")}</p>
        <p>{t("ai_customer_service_intro_process_step_3")}</p>
        <p>{t("ai_customer_service_intro_process_step_4")}</p>
        <p>{t("ai_customer_service_intro_process_step_5")}</p>
      </section>

      <div className="bpmn-container" data-diagram="../bpmn/ai-customer-service.bpmn"></div>
    </>
  );
}
