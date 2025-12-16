"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function HumanCentricContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("human_centric_heading")}</h2>

      <p>{t("human_centric_intro")}</p>

      <h2>{t("human_centric_user_tasks_heading")}</h2>
      <p>{t("human_centric_user_tasks_intro")}</p>
      <ul>
        <li>{t("human_centric_example1")}</li>
        <li>{t("human_centric_example2")}</li>
        <li>{t("human_centric_example3")}</li>
      </ul>

      <h2>{t("human_centric_tools_heading")}</h2>
      <ul>
        <li><strong>Tasklist</strong> – {t("human_centric_tasklist")}</li>
        <li><strong>Cockpit</strong> – {t("human_centric_cockpit")}</li>
        <li><strong>Operate</strong> – {t("human_centric_operate")}</li>
      </ul>

      <h2>{t("human_centric_hybrid_heading")}</h2>
      <p>{t("human_centric_hybrid_desc")}</p>
    </>
  );
}
