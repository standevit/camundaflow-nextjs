"use client";

import ProjectProposalForm from "@/components/ProjectProposalForm";

interface ProjectDetailsProps {
  projectType: string;
  requirements: string;
  description: string;
}

export default function ProjectDetails({ projectType, requirements, description }: ProjectDetailsProps) {
  // Provjeravanja praznih podataka
  if (!requirements || requirements.trim() === '') {
    return (
      <div style={{
        padding: "1rem",
        backgroundColor: "#fef3c7",
        border: "1px solid #fcd34d",
        borderRadius: "6px",
        color: "#92400e"
      }}>
        <p>⚠️ Keine detaillierten Informationen für dieses Projekt verfügbar.</p>
        {description && (
          <>
            <p style={{ marginTop: "0.75rem", marginBottom: 0 }}>Beschreibung:</p>
            <p style={{ marginTop: "0.25rem", color: "#4b5563", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {description}
            </p>
          </>
        )}
      </div>
    );
  }

  // Za cost-configurator, koristi strukturirani JSON format
  if (projectType === "cost-configurator") {
    return <ProjectProposalForm requirements={requirements} />;
  }

  // Za ostale tipove, prikaži requirements kao tekst sa formatiranjem
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Description Section */}
      {description && (
        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ color: "#1f2937", fontSize: "1.1rem", marginBottom: "0.75rem", fontWeight: "600" }}>
            📋 Projektbeschreibung
          </h3>
          <p style={{ color: "#4b5563", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {description}
          </p>
        </div>
      )}

      {/* Requirements Section */}
      {requirements && (
        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ color: "#1f2937", fontSize: "1.1rem", marginBottom: "0.75rem", fontWeight: "600" }}>
            ✅ Anforderungen
          </h3>
          <div style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            color: "#4b5563",
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontSize: "0.95rem"
          }}>
            {requirements}
          </div>
        </div>
      )}

      {/* Project Type Badge */}
      <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
        <h3 style={{ color: "#1f2937", fontSize: "1.1rem", marginBottom: "0.75rem", fontWeight: "600" }}>
          🏷️ Projekttyp
        </h3>
        <div style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          backgroundColor: "#dbeafe",
          color: "#1e40af",
          borderRadius: "6px",
          fontWeight: "600",
          fontSize: "0.95rem"
        }}>
          {getProjectTypeLabel(projectType)}
        </div>
      </div>
    </div>
  );
}

function getProjectTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "cost-configurator": "💰 Cost Configurator",
    "ai_agents": "🤖 AI Agents",
    "ai_customer_service": "🤖 AI Customer Service",
    "ai_agents_integration": "🤖 AI Agents Integration",
    "rag_system": "📚 RAG System",
    "llm_orchestration": "🧠 LLM Orchestration",
    "ai_consulting": "💼 AI Consulting",
    "ai_custom": "🤖 Custom AI Solution",
    "camunda_workflow": "⚙️ Camunda Workflow",
    "microservices": "🔄 Microservices",
    "full_stack": "🚀 Full-Stack Solution",
    "migration": "🔀 Migration/Refactoring",
    "consulting": "💼 Architecture Consulting",
    "crypto_schulung": "🎓 Crypto Training",
    "crypto_schulung_basic": "🎓 Crypto Basics",
    "crypto_schulung_trading": "📈 Trading & Investment",
    "crypto_schulung_security": "🔒 Security & Best Practices",
    "crypto_schulung_payment": "💳 Crypto Payment Integration",
    "crypto_schulung_custom": "🎓 Custom Training",
    "unknown": "❓ Unbekannt",
    "other": "📌 Sonstiges",
  };
  
  return labels[type] || `📌 ${type}`;
}
