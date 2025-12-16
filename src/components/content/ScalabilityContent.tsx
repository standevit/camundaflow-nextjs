"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function ScalabilityContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("scalability_heading")}</h2>
      <p>{t("scalability_intro")}</p>

      <section>
        <h3>{t("scalability_why_heading")}</h3>
        <ul>
          <li>{t("scalability_point1")}</li>
          <li>{t("scalability_point2")}</li>
          <li>{t("scalability_point3")}</li>
          <li>{t("scalability_point4")}</li>
          <li>{t("scalability_point5")}</li>
        </ul>
        <p>{t("scalability_use_cases")}</p>
      </section>
    </>
  );
}
