"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function BpmnContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>BPMN</h2>
      <section>
        <h3>{t("bpmn_what_is")}</h3>
        <p>
          <strong>Business Process Model and Notation (BPMN 2.0)</strong> {t("bpmn_desc")}
        </p>

        <h3>{t("bpmn_elements")}</h3>
        <ul>
          <li><strong>Events</strong> {t("bpmn_events")}</li>
          <li><strong>Tasks</strong> {t("bpmn_tasks")}</li>
          <li><strong>Gateways</strong> {t("bpmn_gateways")}</li>
          <li><strong>Swimlanes</strong> – {t("bpmn_swimlanes")}</li>
        </ul>

        <h3>{t("bpmn_benefits_title")}</h3>
        <p>{t("bpmn_benefits")}</p>
      </section>
    </>
  );
}
