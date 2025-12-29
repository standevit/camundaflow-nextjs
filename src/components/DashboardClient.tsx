"use client";

import { useTranslation } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardClientProps {
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
}

const LANGUAGES = [
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
];

export default function DashboardClient({ userName, userEmail, userImage }: DashboardClientProps) {
  const { locale, setLocale } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(locale);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [projectRequest, setProjectRequest] = useState({
    projectName: "",
    projectType: "camunda_workflow",
    description: "",
    requirements: "",
    deadline: "",
  });
  const router = useRouter();

  useEffect(() => {
    // Load user's preferred language from localStorage when dashboard loads
    try {
      const userPreferredLang = localStorage.getItem("userPreferredLanguage");
      if (userPreferredLang && ["de", "en", "nl"].includes(userPreferredLang)) {
        setLocale(userPreferredLang);
        setSelectedLanguage(userPreferredLang);
      }
    } catch (e) {
      console.error("Failed to load language preference", e);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    setLocale(langCode);
    
    // Save as user's preferred language
    try {
      localStorage.setItem("userPreferredLanguage", langCode);
      localStorage.setItem("locale", langCode);
    } catch (e) {
      console.error("Failed to save language preference", e);
    }
  };

  const handleRequestSubmit = () => {
    // Save request to sessionStorage and redirect to payment page
    try {
      sessionStorage.setItem("projectRequest", JSON.stringify({
        ...projectRequest,
        userName,
        userEmail,
        timestamp: new Date().toISOString(),
      }));
      router.push("/payment");
    } catch (e) {
      console.error("Failed to save request", e);
      alert("Fehler beim Speichern der Anfrage. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <>
      {/* Project Request Modal */}
      {showRequestModal && (
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
                🚀 Neues Projekt anfragen
              </h2>
              <button
                onClick={() => setShowRequestModal(false)}
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
                  Projektname *
                </label>
                <input
                  type="text"
                  value={projectRequest.projectName}
                  onChange={(e) => setProjectRequest({ ...projectRequest, projectName: e.target.value })}
                  placeholder="z.B. E-Commerce Workflow System"
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
                  Projekt-Typ *
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
                  <option value="camunda_workflow">Camunda Workflow Design</option>
                  <option value="microservices">Microservices Architecture</option>
                  <option value="ai_agents">AI Agents Integration</option>
                  <option value="full_stack">Full-Stack Solution</option>
                  <option value="migration">Migration/Refactoring</option>
                  <option value="consulting">Architecture Consulting</option>
                  <option value="other">Sonstiges</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
                  Detaillierte Beschreibung *
                </label>
                <textarea
                  value={projectRequest.description}
                  onChange={(e) => setProjectRequest({ ...projectRequest, description: e.target.value })}
                  placeholder="Beschreiben Sie Ihr Projekt im Detail... Was möchten Sie erreichen? Welche Probleme sollen gelöst werden?"
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
                  Spezifische Anforderungen & Technologie-Stack
                </label>
                <textarea
                  value={projectRequest.requirements}
                  onChange={(e) => setProjectRequest({ ...projectRequest, requirements: e.target.value })}
                  placeholder="z.B. Camunda 8, Spring Boot, React, PostgreSQL, Docker, Kubernetes..."
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
                  Gewünschter Liefertermin
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
                backgroundColor: "#f0f7ff",
                padding: "1rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                color: "#0066cc",
              }}>
                💡 <strong>Hinweis:</strong> Nach dem Absenden können Sie den Betrag wählen, den Sie für angemessen halten, und per Kryptowährung bezahlen.
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => setShowRequestModal(false)}
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
                  disabled={!projectRequest.projectName || !projectRequest.description}
                  style={{
                    flex: 2,
                    padding: "0.875rem",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                    opacity: (!projectRequest.projectName || !projectRequest.description) ? 0.5 : 1,
                  }}
                >
                  Weiter zur Zahlung →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        padding: "2rem",
        color: "white",
        marginBottom: "2rem"
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Willkommen im Portal, {userName}! 👋
        </h1>
        <p style={{ opacity: 0.9 }}>
          Sie haben erfolgreich mit GitHub angemeldet.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "1.5rem" 
      }}>
                <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
            👤 Benutzerprofil
          </h2>
          <div style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Name:</strong> {userName}
          </div>
          <div style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Email:</strong> {userEmail}
          </div>
          {userImage && (
            <img 
              src={userImage} 
              alt="Profile" 
              style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                marginTop: "1rem" 
              }} 
            />
          )}
        </div>
        {/* Language Settings Card */}
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
            🌍 Spracheinstellungen
          </h2>
          <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
            Wählen Sie Ihre bevorzugte Sprache. Diese wird automatisch beim nächsten Login verwendet.
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: selectedLanguage === lang.code ? "#667eea" : "#f5f5f5",
                  color: selectedLanguage === lang.code ? "white" : "#333",
                  border: selectedLanguage === lang.code ? "2px solid #667eea" : "2px solid transparent",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: selectedLanguage === lang.code ? "600" : "500",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedLanguage !== lang.code) {
                    e.currentTarget.style.backgroundColor = "#e8e8e8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedLanguage !== lang.code) {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                  }
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{lang.flag}</span>
                <span>{lang.name}</span>
                {selectedLanguage === lang.code && (
                  <span style={{ marginLeft: "auto" }}>✓</span>
                )}
              </button>
            ))}
          </div>

          <div style={{ 
            marginTop: "1rem", 
            padding: "0.75rem", 
            backgroundColor: "#f0f7ff", 
            borderRadius: "6px",
            fontSize: "0.85rem",
            color: "#0066cc"
          }}>
            💡 <strong>Tipp:</strong> Diese Einstellung wird für Ihr Konto gespeichert und beim nächsten Login automatisch angewendet.
          </div>
        </div>

        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
            📊 Projekt anfragen
          </h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Beschreiben Sie Ihr Projekt im Detail und erhalten Sie eine maßgeschneiderte Lösung.
          </p>
          <button
            onClick={() => setShowRequestModal(true)}
            style={{
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
          }}>
            Projekt anfragen
          </button>
        </div>

      </div>
    </div>
    </>
  );
}
