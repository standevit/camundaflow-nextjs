"use client";

import { useState } from "react";
import ProjectProposalForm from "@/components/ProjectProposalForm";
import ProjectDetails from "@/components/ProjectDetails";

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
  projectType: string;
  description: string;
  requirements: string;
  deadline?: string | null;
  estimatedPrice: number;
  status?: string;
  createdAt: string;
}

interface CostConfiguratorProjectProps {
  project: ProjectRequest;
}

export default function CostConfiguratorProject({ project }: CostConfiguratorProjectProps) {
  const [showDetails, setShowDetails] = useState(false);

  let coreFeatures: string[] = [];
  let costBreakdown: CostBreakdown | null = null;
  let timeline: Timeline | null = null;

  try {
    console.log("🔍 Parsing requirements for project:", project.id);
    console.log("📦 Requirements content:", project.requirements);
    console.log("📦 Requirements type:", typeof project.requirements);
    
    // Provjeri je li requirements prazan ili nije string
    if (!project.requirements || project.requirements.trim() === '') {
      console.log("⚠️ Requirements je prazan");
    } else if (typeof project.requirements === 'string' && project.requirements.startsWith('{')) {
      // JSON string
      const requirements = JSON.parse(project.requirements);
      console.log("✅ Parsed requirements:", requirements);
      coreFeatures = requirements.coreFeatures || [];
      costBreakdown = requirements.costBreakdown;
      timeline = requirements.timeline;
      console.log("✅ Parsed data:", { coreFeatures, costBreakdown, timeline });
    } else {
      // Plain tekst, ne JSON
      console.log("⚠️ Requirements nije JSON, to je obični tekst");
    }
  } catch (e) {
    console.error("❌ Failed to parse project requirements:", e);
    console.error("Raw requirements:", project.requirements);
  }

  const generatePDF = async () => {
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById(`project-pdf-${project.id}`);
      if (!element) {
        console.error("PDF element not found");
        alert("Fehler: Dokument konnte nicht generiert werden. Bitte versuchen Sie es später erneut.");
        return;
      }

      // Clone the element to avoid modifying the original
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      const opt = {
        margin: 10,
        filename: `${project.projectName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, logging: false, useCORS: true, allowTaint: true },
        jsPDF: { orientation: "portrait" as const, unit: "mm" as const, format: "a4" },
      };

      await html2pdf()
        .set(opt)
        .from(clonedElement)
        .save()
        .catch((error: unknown) => {
          console.error("PDF generation error:", error);
          alert("Fehler beim Herunterladen des PDF. Bitte versuchen Sie es später erneut.");
        });
    } catch (error) {
      console.error("Fehler bei PDF-Generierung:", error);
      alert("Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }
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
          {project.deadline && (
            <div>
              <span style={{ color: "#999", fontWeight: "500" }}>📅 Termin:</span>
              <div style={{ color: "#333", fontWeight: "600" }}>
                {new Date(project.deadline).toLocaleDateString("de-DE")}
              </div>
            </div>
          )}
          {project.status && (
            <div>
              <span style={{ color: "#999", fontWeight: "500" }}>📌 Status:</span>
              <div style={{ color: "#333", fontWeight: "600" }}>
                {project.status === 'pending' && '⏳ Ausstehend'}
                {project.status === 'approved' && '✓ Genehmigt'}
                {project.status === 'rejected' && '✗ Abgelehnt'}
                {project.status === 'completed' && '✓ Abgeschlossen'}
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
            disabled={!costBreakdown || !timeline}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: costBreakdown && timeline ? "#10b981" : "#cccccc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: costBreakdown && timeline ? "pointer" : "not-allowed",
              fontWeight: "600",
              fontSize: "0.9rem",
              transition: "all 0.2s ease",
              opacity: costBreakdown && timeline ? 1 : 0.6,
            }}
            onMouseEnter={(e) => {
              if (costBreakdown && timeline) {
                e.currentTarget.style.backgroundColor = "#059669";
              }
            }}
            onMouseLeave={(e) => {
              if (costBreakdown && timeline) {
                e.currentTarget.style.backgroundColor = "#10b981";
              }
            }}
            title={!costBreakdown || !timeline ? "PDF-Daten nicht verfügbar" : "PDF herunterladen"}
          >
            📥 PDF herunterladen
          </button>
        </div>

        {(!costBreakdown || !timeline) && (
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            backgroundColor: "#fef3c7",
            border: "1px solid #fcd34d",
            borderRadius: "6px",
            color: "#92400e",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <span>⚠️</span>
            <span>
              {!costBreakdown && !timeline 
                ? "Diese Anfrage wurde nicht durch den Cost Configurator generiert."
                : "PDF-Daten sind unvollständig und können nicht exportiert werden."}
            </span>
          </div>
        )}

        {showDetails && (
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e0e0e0" }}>
            <ProjectDetails 
              projectType={project.projectType}
              requirements={project.requirements}
              description={project.description}
            />
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
