"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function OrderApprovalContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("order_approval_title")}</h2>

      <p>{t("order_approval_intro")}</p>

      <ul>
        <li>{t("order_approval_step1")}</li>
        <li>{t("order_approval_step2")}</li>
        <li>{t("order_approval_step3")}</li>
        <li>{t("order_approval_step4")}</li>
      </ul>

      <div className="bpmn-container" data-diagram="../bpmn/order-approval-process.bpmn"></div>
    </>
  );
}
