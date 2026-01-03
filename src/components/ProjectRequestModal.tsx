"use client";

import { useState, useEffect } from "react";

interface ProjectProposal {
  project_name: string;
  description_summary: string;
  core_features: string[];
  cost_breakdown: {
    base_price_eur: number;
  };
}

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string | null;
  userEmail?: string | null;
  requestType?: "project" | "schulung" | "ai-agents";
  proposal?: ProjectProposal | null;
  onProjectCreated?: () => void;
}

export default function ProjectRequestModal({ 
  isOpen, 
  onClose, 
  userName, 
  userEmail,
  requestType = "project",
  proposal = null,
  onProjectCreated
}: ProjectRequestModalProps) {
  const [projectRequest, setProjectRequest] = useState({
    projectName: "",
    projectType: requestType === "schulung" ? "crypto_schulung" : "camunda_workflow",
    description: "",
    requirements: "",
    deadline: "",
    estimatedPrice: 0,
  });
  const [testnetConfirmed, setTestnetConfirmed] = useState(false);

  // Popuni formu sa proposal podacima kada se modal otvori
  useEffect(() => {
    if (isOpen && proposal) {
      setProjectRequest((prev) => ({
        ...prev,
        projectName: proposal.project_name,
        description: proposal.description_summary,
        requirements: proposal.core_features.join(", "),
        estimatedPrice: proposal.cost_breakdown.base_price_eur * 0.25, // Sa 75% popustom
      }));
    } else if (!isOpen) {
      // Resetuj formu kada se modal zatvori
      setProjectRequest({
        projectName: "",
        projectType: requestType === "schulung" ? "crypto_schulung" : "camunda_workflow",
        description: "",
        requirements: "",
        deadline: "",
        estimatedPrice: 0,
      });
      setTestnetConfirmed(false);
    }
  }, [isOpen, proposal, requestType]);

  const handleRequestSubmit = async () => {
    try {
      // Prvo, spremi projekt u bazu
      const projectResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: projectRequest.projectName,
          projectType: projectRequest.projectType,
          description: projectRequest.description,
          requirements: projectRequest.requirements,
          deadline: projectRequest.deadline || null,
          estimatedPrice: projectRequest.estimatedPrice,
          userName: userName,
          userEmail: userEmail,
        }),
      });

      if (!projectResponse.ok) {
        const error = await projectResponse.json();
        console.error('Greška pri čuvanju projekta:', error);
        alert(`Greška: ${error.error || 'Nije moguće spremiti projekt'}`);
        return;
      }

      const savedProject = await projectResponse.json();
      console.log('✅ Projekt je sprema u bazu:', savedProject);
      
      // Pokazuj success poruku
      alert('✅ Projekt je uspješno sprema u bazu! Prebacujem na plaćanje...');

      // Obavijesti parent komponentu da je projekt sprema
      if (onProjectCreated) {
        onProjectCreated();
      }

      // Sada idi na plaćanje
      const response = await fetch('/api/payment/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceAmount: projectRequest.estimatedPrice,
          priceCurrency: 'EUR',
          title: projectRequest.projectName,
          description: `Project Request - ${projectRequest.projectName}`,
          successUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
          cancelUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
          metadata: {
            type: 'cost-configurator-project',
            name: projectRequest.projectName,
            email: projectRequest.description,
            company: userName || "",
            phone: userEmail || "",
            message: projectRequest.requirements,
            projectType: projectRequest.projectType,
            projectId: savedProject.data.id,
          }
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (typeof window !== 'undefined') {
          window.location.href = data.checkoutUrl;
        }
      } else {
        const error = await response.json();
        alert(`Fehler: ${error.error || 'Bitte versuchen Sie es erneut.'}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Fehler beim Erstellen der Zahlung. Bitte versuchen Sie es erneut.');
    }
  };

  if (!isOpen) return null;

  const projectTypeOptions = requestType === "schulung" 
    ? [
        { value: "crypto_schulung_basic", label: "Crypto Basics (Kauf, Wallet, Sicherheit)" },
        { value: "crypto_schulung_trading", label: "Trading & Investment Strategien" },
        { value: "crypto_schulung_security", label: "Security & Best Practices" },
        { value: "crypto_schulung_payment", label: "Crypto Payment Integration" },
        { value: "crypto_schulung_custom", label: "Individuelles Schulungsprogramm" },
      ]
    : requestType === "ai-agents"
    ? [
        { value: "ai_customer_service", label: "AI Customer Service Bot" },
        { value: "ai_agents_integration", label: "AI Agents mit Camunda" },
        { value: "rag_system", label: "RAG System & Wissensdatenbank" },
        { value: "llm_orchestration", label: "LLM Orchestration" },
        { value: "ai_consulting", label: "AI Strategy Consulting" },
        { value: "ai_custom", label: "Custom AI Solution" },
      ]
    : [
        { value: "camunda_workflow", label: "Camunda Workflow Design" },
        { value: "microservices", label: "Microservices Architecture" },
        { value: "ai_agents", label: "AI Agents Integration" },
        { value: "full_stack", label: "Full-Stack Solution" },
        { value: "migration", label: "Migration/Refactoring" },
        { value: "consulting", label: "Architecture Consulting" },
        { value: "other", label: "Sonstiges" },
      ];

  const title = requestType === "schulung" 
    ? "🎓 Neue Schulung anfragen"
    : requestType === "ai-agents"
    ? "🤖 AI Agents Projekt anfragen"
    : "🚀 Neues Projekt anfragen";

  const nameLabel = requestType === "schulung"
    ? "Schulungsthema *"
    : requestType === "ai-agents"
    ? "Projektname *"
    : "Projektname *";

  const namePlaceholder = requestType === "schulung"
    ? "z.B. Bitcoin für Einsteiger"
    : requestType === "ai-agents"
    ? "z.B. AI Customer Service Bot"
    : "z.B. E-Commerce Workflow System";

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem",
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        maxWidth: "600px",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto",
        padding: "2rem",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
              {nameLabel}
            </label>
            <input
              type="text"
              value={projectRequest.projectName}
              onChange={(e) => setProjectRequest({ ...projectRequest, projectName: e.target.value })}
              placeholder={namePlaceholder}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
              {requestType === "schulung" ? "Schulungsart *" : "Projekt-Typ *"}
            </label>
            <select
              value={projectRequest.projectType}
              onChange={(e) => setProjectRequest({ ...projectRequest, projectType: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            >
              {projectTypeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
              Detaillierte Beschreibung *
            </label>
            <textarea
              value={projectRequest.description}
              onChange={(e) => setProjectRequest({ ...projectRequest, description: e.target.value })}
              placeholder={requestType === "schulung" 
                ? "Beschreiben Sie Ihre Schulungsanforderungen... Welche Themen möchten Sie behandeln? Für wie viele Personen? Online oder vor Ort?"
                : "Beschreiben Sie Ihr Projekt im Detail... Was möchten Sie erreichen? Welche Probleme sollen gelöst werden?"
              }
              rows={5}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
              {requestType === "schulung" 
                ? "Spezifische Anforderungen (Sprache, Teilnehmerzahl, Format...)"
                : "Spezifische Anforderungen & Technologie-Stack"
              }
            </label>
            <textarea
              value={projectRequest.requirements}
              onChange={(e) => setProjectRequest({ ...projectRequest, requirements: e.target.value })}
              placeholder={requestType === "schulung"
                ? "z.B. Deutsch, 5 Teilnehmer, Online via Zoom, 3 Sessions à 2 Stunden..."
                : "z.B. Camunda 8, Spring Boot, React, PostgreSQL, Docker, Kubernetes..."
              }
              rows={3}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
              Gewünschter Termin
            </label>
            <input
              type="date"
              value={projectRequest.deadline}
              onChange={(e) => setProjectRequest({ ...projectRequest, deadline: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{
            backgroundColor: "#fff3cd",
            border: "2px solid #ffc107",
            padding: "1.25rem",
            borderRadius: "8px",
            fontSize: "0.95rem",
            color: "#856404",
          }}>
            <div style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
              <div style={{ fontSize: "1.5rem", flexShrink: 0 }}>⚠️</div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                  WICHTIG: Dies ist ein TESTNET!
                </div>
                <div style={{ marginBottom: "0.75rem", lineHeight: "1.6" }}>
                  Die Zahlung erfolgt auf einer <strong>Test-Blockchain</strong>. Verwenden Sie 
                  <strong> KEINE echten Kryptowährungen</strong>! Sie müssen <strong>Testnet-Tokens</strong> verwenden, 
                  die keinen realen Wert haben.
                </div>
                <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                  💡 Dies ist eine Demo-Umgebung zum Testen der Zahlungsfunktionalität.
                </div>
              </div>
            </div>
          </div>

          <div style={{
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
          }}>
            <label style={{
              display: "flex",
              alignItems: "start",
              gap: "0.75rem",
              cursor: "pointer",
              userSelect: "none"
            }}>
              <input
                type="checkbox"
                checked={testnetConfirmed}
                onChange={(e) => setTestnetConfirmed(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  marginTop: "0.15rem",
                  flexShrink: 0
                }}
              />
              <span style={{ fontSize: "0.95rem", lineHeight: "1.5", color: "#333" }}>
                <strong>Ich bestätige,</strong> dass ich verstehe, dass dies ein <strong>Testnet</strong> ist 
                und ich ausschließlich <strong>Test-Kryptowährungen</strong> verwenden werde. 
                Ich werde keine echten Kryptowährungen senden. *
              </span>
            </label>
          </div>

          <div style={{
            backgroundColor: "#f0f7ff",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            color: "#0066cc",
          }}>
            💡 <strong>Hinweis:</strong> Nach dem Absenden können Sie den Betrag wählen, den Sie für angemessen halten, und per Test-Kryptowährung bezahlen.
          </div>

          {/* Price Summary from Proposal */}
          {projectRequest.estimatedPrice > 0 && (
            <div style={{
              backgroundColor: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "8px",
              marginTop: "1rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1rem", fontWeight: "600" }}>Geschätzter Preis:</span>
                <span style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                  €{projectRequest.estimatedPrice.toLocaleString('de-DE', { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>
                (Inklusive 75% Online-Rabatt)
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "0.875rem",
                backgroundColor: "#f5f5f5",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              Abbrechen
            </button>
            <button
              onClick={handleRequestSubmit}
              disabled={!projectRequest.projectName || !projectRequest.description || !testnetConfirmed}
              style={{
                flex: 2,
                padding: "0.875rem",
                background: (!projectRequest.projectName || !projectRequest.description || !testnetConfirmed) 
                  ? "#cccccc" 
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: (!projectRequest.projectName || !projectRequest.description || !testnetConfirmed) 
                  ? "not-allowed" 
                  : "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                opacity: (!projectRequest.projectName || !projectRequest.description || !testnetConfirmed) ? 0.6 : 1,
              }}
              title={!testnetConfirmed ? "Bitte bestätigen Sie, dass Sie das Testnet verstehen" : ""}
            >
              💳 Sofort zur Zahlung →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
