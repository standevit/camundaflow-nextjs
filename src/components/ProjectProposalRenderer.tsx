"use client";

interface ProjectProposal {
  project_name: string;
  description_summary: string;
  core_features: string[];
  tech_stack: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
  };
  timeline_weeks: {
    design: number;
    frontend_development: number;
    backend_development: number;
    testing_qa: number;
    deployment: number;
    total: number;
  };
  cost_breakdown: {
    base_price_eur: number;
    hourly_rate_eur: number;
    estimated_hours: number;
  };
  optional_features: Array<{
    name: string;
    description: string;
    additional_weeks: number;
    additional_price_eur: number;
  }>;
  total_with_all_options_eur: number;
}

interface ProjectProposalRendererProps {
  proposal: ProjectProposal;
  selectedOptions: Record<string, boolean>;
  onOptionsChange: (options: Record<string, boolean>) => void;
}

export default function ProjectProposalRenderer({
  proposal,
  selectedOptions,
  onOptionsChange,
}: ProjectProposalRendererProps) {
  const handleOptionToggle = (featureName: string) => {
    onOptionsChange({
      ...selectedOptions,
      [featureName]: !selectedOptions[featureName],
    });
  };

  const calculateTotalCost = () => {
    let total = proposal.cost_breakdown.base_price_eur;
    proposal.optional_features.forEach((feature) => {
      if (selectedOptions[feature.name]) {
        total += feature.additional_price_eur;
      }
    });
    return total;
  };

  const calculateTotalWeeks = () => {
    let total = proposal.timeline_weeks.total;
    proposal.optional_features.forEach((feature) => {
      if (selectedOptions[feature.name]) {
        total += feature.additional_weeks;
      }
    });
    return total;
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        padding: "1.5rem",
        marginTop: "1.5rem",
      }}
    >
      {/* Project Header */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          borderLeft: "4px solid #ef4444",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 0.5rem 0",
          }}
        >
          {proposal.project_name}
        </h3>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          {proposal.description_summary}
        </p>
      </div>

      {/* Core Features */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "1rem",
            margin: "0 0 1rem 0",
          }}
        >
          🎯 Erforderliche Funktionalitäten
        </h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: "1.5rem",
            listStyleType: "disc",
          }}
        >
          {proposal.core_features.map((feature, idx) => (
            <li
              key={idx}
              style={{
                color: "#475569",
                marginBottom: "0.5rem",
                fontSize: "0.95rem",
              }}
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 1rem 0",
          }}
        >
          💻 Tech Stack
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {Object.entries(proposal.tech_stack).map(([key, value]) => (
            <div key={key}>
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#64748b",
                  margin: "0 0 0.25rem 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {key.replace("_", " ")}
              </p>
              <p
                style={{
                  color: "#0f172a",
                  fontSize: "0.95rem",
                  margin: 0,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 1rem 0",
          }}
        >
          ⏱️ Zeitplan
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {Object.entries(proposal.timeline_weeks).map(([key, value]) => (
            <div
              key={key}
              style={{
                padding: "0.75rem",
                backgroundColor: "#f1f5f9",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  color: "#64748b",
                  margin: "0 0 0.25rem 0",
                  textTransform: "capitalize",
                }}
              >
                {key.replace("_", " ")}
              </p>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {value}w
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            backgroundColor: "#fef3c7",
            borderRadius: "6px",
            color: "#92400e",
            fontSize: "0.9rem",
            margin: "1rem 0 0 0",
          }}
        >
          <strong>Gesamtpreis:</strong> {calculateTotalWeeks()} Wochen (mit ausgewählten Optionen)
        </p>
      </div>

      {/* Cost Breakdown */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 1rem 0",
          }}
        >
          💰 Kosten
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f1f5f9",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 0.5rem 0",
              }}
            >
              Grundpreis
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#0f172a",
                margin: 0,
              }}
            >
              €{proposal.cost_breakdown.base_price_eur.toLocaleString()}
            </p>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f1f5f9",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 0.5rem 0",
              }}
            >
              Stundensatz
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#0f172a",
                margin: 0,
              }}
            >
              €{proposal.cost_breakdown.hourly_rate_eur}/h
            </p>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f1f5f9",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 0.5rem 0",
              }}
            >
              Stunden
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#0f172a",
                margin: 0,
              }}
            >
              {proposal.cost_breakdown.estimated_hours}h
            </p>
          </div>
        </div>
      </div>

      {/* Optional Features */}
      {proposal.optional_features.length > 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            border: "1px solid #e2e8f0",
          }}
        >
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              color: "#0f172a",
              margin: "0 0 1.5rem 0",
            }}
          >
            ✨ Optionale Funktionalitäten
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {proposal.optional_features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                  border: selectedOptions[feature.name]
                    ? "2px solid #ef4444"
                    : "1px solid #e2e8f0",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onClick={() => handleOptionToggle(feature.name)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions[feature.name] || false}
                    onChange={() => handleOptionToggle(feature.name)}
                    style={{
                      marginTop: "0.25rem",
                      cursor: "pointer",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h5
                      style={{
                        fontSize: "1rem",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {feature.name}
                    </h5>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                        margin: "0 0 0.75rem 0",
                      }}
                    >
                      {feature.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      <span style={{ color: "#64748b" }}>
                        <strong>+{feature.additional_weeks}w</strong>
                      </span>
                      <span style={{ color: "#059669", fontWeight: "600" }}>
                        +€{feature.additional_price_eur.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Price Summary */}
      <div
        style={{
          backgroundColor: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          color: "black",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "1rem", fontWeight: "600" }}>
            Grundpreis:
          </span>
          <span style={{ fontSize: "1.1rem" }}>
            €{proposal.cost_breakdown.base_price_eur.toLocaleString()}
          </span>
        </div>
        {Object.values(selectedOptions).some((v) => v) && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1rem", fontWeight: "600" }}>
              Extra Optionen:
            </span>
            <span style={{ fontSize: "1.1rem" }}>
              €
              {proposal.optional_features
                .filter((f) => selectedOptions[f.name])
                .reduce((sum, f) => sum + f.additional_price_eur, 0)
                .toLocaleString()}
            </span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1rem", fontWeight: "600" }}>
            Online Rabatt (40%):
          </span>
          <span style={{ fontSize: "1.1rem", color: "#4ade80" }}>
            -€{(calculateTotalCost() * 0.40).toLocaleString('de-DE', { maximumFractionDigits: 2 })}
          </span>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.3)",
            paddingTop: "0.75rem",
            marginTop: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>
            Gesamtpreis:
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            €{(calculateTotalCost() * 0.60).toLocaleString('de-DE', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
