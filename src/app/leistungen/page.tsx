"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function LeistungenPage() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <main className="main-content">
        <div className="card">
          <h2>{t("leistungen_title")}</h2>
          <p style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 3rem" }}>
            {t("leistungen_desc")}
          </p>

          <div className="grid">
            <div className="leistungen-card">
              <h3>{t("architecture_consulting")}</h3>
              <p>
                {t("architecture_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("implementation")}</h3>
              <p>
                {t("implementation_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("migration")}</h3>
              <p>
                {t("migration_desc")}
              </p>
            </div>

            <div className="leistungen-card">
              <h3>{t("training")}</h3>
              <p>
                {t("training_desc")}
              </p>
            </div>
          </div>

          <a href="/contact" className="btn-primary">
            {t("request_quote")}
          </a>
        </div>
      </main>
    </div>
  );
}

