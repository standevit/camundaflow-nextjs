"use client";

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

interface TechStack {
  frontend: string;
  backend: string;
  database: string;
  hosting: string;
}

interface OptionalFeature {
  name: string;
  description: string;
  additional_weeks: number;
  additional_price_eur: number;
}

interface ProjectProposalFormProps {
  requirements: string; // JSON string from database
}

export default function ProjectProposalForm({ requirements }: ProjectProposalFormProps) {
  let coreFeatures: string[] = [];
  let costBreakdown: CostBreakdown | null = null;
  let timeline: Timeline | null = null;
  let techStack: TechStack | null = null;
  let optionalFeatures: OptionalFeature[] = [];
  let totalWithAllOptions: number | null = null;

  // Parse requirements from database
  try {
    console.log("✅ ProjectProposalForm parsing requirements...");
    console.log("📦 Raw requirements:", requirements);
    console.log("📦 Requirements type:", typeof requirements);
    
    // Provjeri je li requirements validan JSON
    if (!requirements || requirements.trim() === '') {
      console.log("⚠️ Requirements je prazan");
      return (
        <div style={{ padding: "1rem", backgroundColor: "#fee2e2", borderRadius: "6px", color: "#991b1b" }}>
          ⚠️ Keine Anforderungsdaten verfügbar
        </div>
      );
    }
    
    const parsed = JSON.parse(requirements);
    console.log("✅ ProjectProposalForm parsed full JSON:", parsed);
    
    // Parse all data from JSON
    coreFeatures = parsed.coreFeatures || [];
    costBreakdown = parsed.costBreakdown;
    timeline = parsed.timeline;
    techStack = parsed.techStack;
    optionalFeatures = parsed.optionalFeatures || [];
    totalWithAllOptions = parsed.totalWithAllOptions;
    
    console.log("✅ ProjectProposalForm data extracted:", { coreFeatures, costBreakdown, timeline, techStack, optionalFeatures, totalWithAllOptions });
  } catch (e) {
    console.error("❌ Failed to parse requirements in ProjectProposalForm:", e);
    console.error("Raw requirements:", requirements);
    return (
      <div style={{ padding: "1rem", backgroundColor: "#fee2e2", borderRadius: "6px", color: "#991b1b" }}>
        ⚠️ Formular-Daten konnten nicht geladen werden
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Core Features Section */}
      {coreFeatures.length > 0 && (
        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ color: "#1f2937", fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "600" }}>
            ✅ Obavezne Funkcionalnosti ({coreFeatures.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {coreFeatures.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ color: "#059669", fontSize: "1.2rem" }}>✓</span>
                <span style={{ color: "#374151" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cost Breakdown Section */}
      {costBreakdown && (
        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ color: "#1f2937", fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "600" }}>
            💵 Kostenaufschlüsselung
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Basispreis
              </label>
              <input
                type="text"
                value={`€${costBreakdown.base_price_eur.toLocaleString("de-DE", { minimumFractionDigits: 2 })}`}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Stundensatz
              </label>
              <input
                type="text"
                value={`€${costBreakdown.hourly_rate_eur}/Std.`}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Geschätzte Stunden
              </label>
              <input
                type="text"
                value={`${costBreakdown.estimated_hours} Stunden`}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      {timeline && (
        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ color: "#1f2937", fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "600" }}>
            ⏱️ Projektplan (Wochen)
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Design
              </label>
              <input
                type="text"
                value={`${timeline.design} Wochen`}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Frontend-Entwicklung
              </label>
              <input
                type="text"
                value={`${timeline.frontend_development} Wochen`}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Backend-Entwicklung
              </label>
              <input
                type="text"
                value={`${timeline.backend_development} Wochen`}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Testing/QA
              </label>
              <input
                type="text"
                value={`${timeline.testing_qa} Wochen`}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Deployment
              </label>
              <input
                type="text"
                value={`${timeline.deployment} Wochen`}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ backgroundColor: "#dbeafe", padding: "0.75rem", borderRadius: "4px" }}>
              <label style={{ display: "block", color: "#1e40af", fontSize: "0.9rem", marginBottom: "0.25rem", fontWeight: "600" }}>
                Gesamtdauer
              </label>
              <div style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e40af" }}>
                {timeline.total} Wochen
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tech Stack Section */}
      {techStack && (
        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ color: "#1f2937", fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "600" }}>
            🛠️ Technologie-Stack
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Frontend
              </label>
              <input
                type="text"
                value={techStack.frontend}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Backend
              </label>
              <input
                type="text"
                value={techStack.backend}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Datenbank
              </label>
              <input
                type="text"
                value={techStack.database}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Hosting
              </label>
              <input
                type="text"
                value={techStack.hosting}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Optional Features Section */}
      {optionalFeatures.length > 0 && (
        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ color: "#1f2937", fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "600" }}>
            ⭐ Opcionalne Funktionen ({optionalFeatures.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {optionalFeatures.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                }}
              >
                <div style={{ fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                  {feature.name}
                </div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {feature.description}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.85rem" }}>
                  <div>
                    <span style={{ color: "#6b7280" }}>Zusätzliche Wochen:</span>
                    <span style={{ fontWeight: "600", marginLeft: "0.5rem" }}>+{feature.additional_weeks}W</span>
                  </div>
                  <div>
                    <span style={{ color: "#6b7280" }}>Zusätzliche Kosten:</span>
                    <span style={{ fontWeight: "600", marginLeft: "0.5rem", color: "#059669" }}>
                      +€{feature.additional_price_eur.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total with All Options */}
      {totalWithAllOptions && (
        <div style={{
          backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          textAlign: "center",
          border: "1px solid #e5e7eb"
        }}>
          <div style={{ fontSize: "0.95rem", opacity: 0.9, marginBottom: "0.5rem" }}>
            💰 Gesamtpreis mit allen Optionen
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: "700" }}>
            €{totalWithAllOptions.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
          </div>
        </div>
      )}
    </div>
  );
}
