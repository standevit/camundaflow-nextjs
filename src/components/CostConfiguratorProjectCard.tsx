"use client";

import { useState } from "react";
import html2pdf from "html2pdf.js";

interface CostBreakdown {
  base_price_eur: number;
  hourly_rate_eur: number;
  estimated_hours: number;
}

interface Timeline {
  design: number;
  frontend_development: number;
  backend_development: number;
  testing_qa: number;
  deployment: number;
  total: number;
}

interface ProjectRequest {
  id: string;
  projectName: string;
  description: string;
  requirements: string;
  estimatedPrice: number;
  createdAt: string;
}

interface CostConfiguratorProjectProps {
  project: ProjectRequest;
}

export default function CostConfiguratorProject({ project }: CostConfiguratorProjectProps) {
  const [showDetails, setShowDetails] = useState(false);

  let costBreakdown: CostBreakdown | null = null;
  let timeline: Timeline | null = null;

  try {
    const requirements = JSON.parse(project.requirements);
    costBreakdown = requirements.costBreakdown;
    timeline = requirements.timeline;
  } catch (e) {
    console.error("Failed to parse project requirements:", e);
  }

  const generatePDF = () => {
    const element = document.getElementById(`project-pdf-${project.id}`);
    if (!element) return;

    const opt = {
      margin: 10,
      filename: `${project.projectName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait" as const, unit: "mm" as const, format: "a4" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#f9f9f9",
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          padding: "1.25rem",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          e.currentTarget.style.borderColor = "#667eea";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "#e0e0e0";
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            marginBottom: "0.75rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "0.25rem",
              }}
            >
              {project.projectName}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              🔧 Cost Configurator
            </p>
          </div>
          <div
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "600",
              backgroundColor: "#d4edda",
              color: "#155724",
            }}
          >
            ✓ Generiiert
          </div>
        </div>

        <p
          style={{
            color: "#666",
            fontSize: "0.95rem",
            marginBottom: "0.75rem",
            lineHeight: "1.5",
          }}
        >
          {project.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            fontSize: "0.9rem",
            marginBottom: "0.75rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <div>
            <span style={{ color: "#999", fontWeight: "500" }}>💰 Geschätzter Preis:</span>
            <div style={{ color: "#333", fontWeight: "600" }}>
              €{project.estimatedPrice.toLocaleString("de-DE", {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          {timeline && (
            <div>
              <span style={{ color: "#999", fontWeight: "500" }}>⏱️ Gesamtdauer:</span>
              <div style={{ color: "#333", fontWeight: "600" }}>
                {timeline.total} Wochen
              </div>
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.85rem", color: "#999", marginBottom: "1rem" }}>
          📝 Erstellt am{" "}
          {new Date(project.createdAt).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#5568d3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#667eea";
            }}
          >
            {showDetails ? "📖 Details verbergen" : "👁️ Details anzeigen"}
          </button>

          <button
            onClick={generatePDF}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#10b981";
            }}
          >
            📥 PDF herunterladen
          </button>
        </div>

        {showDetails && (
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e0e0e0" }}>
            {costBreakdown && (
              <div style={{ marginBottom: "1rem" }}>
                <h4 style={{ color: "#333", marginBottom: "0.5rem" }}>
                  💵 Kostenaufschlüsselung
                </h4>
                <div style={{ backgroundColor: "white", padding: "0.75rem", borderRadius: "6px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span>Basispreis:</span>
                    <strong>
                      €{costBreakdown.base_price_eur.toFixed(2)}
                    </strong>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span>Stundenhonorar:</span>
                    <strong>€{costBreakdown.hourly_rate_eur}/Std.</strong>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "0.5rem",
                      borderTop: "1px solid #e0e0e0",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span>Geschätzte Stunden:</span>
                    <strong>{costBreakdown.estimated_hours} Std.</strong>
                  </div>
                </div>
              </div>
            )}

            {timeline && (
              <div>
                <h4 style={{ color: "#333", marginBottom: "0.5rem" }}>
                  ⏱️ Zeitplan
                </h4>
                <div style={{ backgroundColor: "white", padding: "0.75rem", borderRadius: "6px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                    }}
                  >
                    <div style={{ fontSize: "0.85rem" }}>
                      <span style={{ color: "#666" }}>Design:</span>
                      <div style={{ fontWeight: "600" }}>{timeline.design} W.</div>
                    </div>
                    <div style={{ fontSize: "0.85rem" }}>
                      <span style={{ color: "#666" }}>Frontend:</span>
                      <div style={{ fontWeight: "600" }}>
                        {timeline.frontend_development} W.
                      </div>
                    </div>
                    <div style={{ fontSize: "0.85rem" }}>
                      <span style={{ color: "#666" }}>Backend:</span>
                      <div style={{ fontWeight: "600" }}>
                        {timeline.backend_development} W.
                      </div>
                    </div>
                    <div style={{ fontSize: "0.85rem" }}>
                      <span style={{ color: "#666" }}>Testing/QA:</span>
                      <div style={{ fontWeight: "600" }}>{timeline.testing_qa} W.</div>
                    </div>
                    <div style={{ fontSize: "0.85rem" }}>
                      <span style={{ color: "#666" }}>Deployment:</span>
                      <div style={{ fontWeight: "600" }}>{timeline.deployment} W.</div>
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        paddingTop: "0.5rem",
                        borderTop: "1px solid #e0e0e0",
                      }}
                    >
                      <span style={{ color: "#666", fontWeight: "600" }}>
                        Gesamt:
                      </span>
                      <div style={{ fontWeight: "700", color: "#667eea" }}>
                        {timeline.total} W.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden PDF content */}
      <div id={`project-pdf-${project.id}`} style={{ display: "none" }}>
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
          <h1 style={{ color: "#333", marginBottom: "0.5rem" }}>
            {project.projectName}
          </h1>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            Generiert am{" "}
            {new Date(project.createdAt).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h2 style={{ color: "#333", fontSize: "1.3rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            Projektübersicht
          </h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            {project.description}
          </p>

          {costBreakdown && (
            <>
              <h2 style={{ color: "#333", fontSize: "1.3rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
                Kostenaufschlüsselung
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: "1rem",
                }}
              >
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "0.75rem", fontWeight: "600" }}>
                      Basispreis
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      €{costBreakdown.base_price_eur.toFixed(2)}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "0.75rem" }}>Stundenhonorar</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      €{costBreakdown.hourly_rate_eur}/Std.
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "0.75rem" }}>Geschätzte Stunden</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      {costBreakdown.estimated_hours} Std.
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <td style={{ padding: "0.75rem", fontWeight: "700" }}>
                      Gesamtpreis
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        textAlign: "right",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                      }}
                    >
                      €
                      {(
                        costBreakdown.base_price_eur +
                        costBreakdown.hourly_rate_eur *
                          costBreakdown.estimated_hours
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {timeline && (
            <>
              <h2 style={{ color: "#333", fontSize: "1.3rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
                Projektplan
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: "1rem",
                }}
              >
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "0.75rem" }}>Design</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      {timeline.design} Wochen
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "0.75rem" }}>Frontend-Entwicklung</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      {timeline.frontend_development} Wochen
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "0.75rem" }}>Backend-Entwicklung</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      {timeline.backend_development} Wochen
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "0.75rem" }}>Testing/QA</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      {timeline.testing_qa} Wochen
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "0.75rem" }}>Deployment</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      {timeline.deployment} Wochen
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <td style={{ padding: "0.75rem", fontWeight: "700" }}>
                      Gesamtdauer
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        textAlign: "right",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                      }}
                    >
                      {timeline.total} Wochen
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
}
