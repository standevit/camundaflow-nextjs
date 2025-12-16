"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function WorkflowAutomationContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("workflow_automation_heading")}</h2>

      <h2>{t("workflow_automation_traditional_heading")}</h2>
      <p>{t("workflow_automation_traditional_intro")}</p>
      <ul>
        <li>{t("workflow_automation_traditional_point1")}</li>
        <li>{t("workflow_automation_traditional_point2")}</li>
        <li>{t("workflow_automation_traditional_point3")}</li>
      </ul>

      <h2>{t("workflow_automation_engine_heading")}</h2>
      <ul>
        <li>{t("workflow_automation_engine_point1")}</li>
        <li>{t("workflow_automation_engine_point2")}</li>
        <li>{t("workflow_automation_engine_point3")}</li>
        <li>{t("workflow_automation_engine_point4")}</li>
      </ul>

      <h2>{t("workflow_automation_comparison_heading")}</h2>
      <table>
        <tr>
          <th>{t("workflow_automation_table_criterion")}</th>
          <th>{t("workflow_automation_table_traditional")}</th>
          <th>{t("workflow_automation_table_engine")}</th>
        </tr>
        <tr>
          <td>{t("workflow_automation_table_visibility")}</td>
          <td>{t("workflow_automation_table_visibility_trad")}</td>
          <td>{t("workflow_automation_table_visibility_engine")}</td>
        </tr>
        <tr>
          <td>{t("workflow_automation_table_change_duration")}</td>
          <td>{t("workflow_automation_table_change_trad")}</td>
          <td>{t("workflow_automation_table_change_engine")}</td>
        </tr>
        <tr>
          <td>{t("workflow_automation_table_long_running")}</td>
          <td>{t("workflow_automation_table_long_running_trad")}</td>
          <td>{t("workflow_automation_table_long_running_engine")}</td>
        </tr>
        <tr>
          <td>{t("workflow_automation_table_transparency")}</td>
          <td>{t("workflow_automation_table_transparency_trad")}</td>
          <td>{t("workflow_automation_table_transparency_engine")}</td>
        </tr>
      </table>
    </>
  );
}
