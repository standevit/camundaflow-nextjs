"use client";

import { useTranslation } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import ProjectRequestModal from "@/components/ProjectRequestModal";

interface ProjectRequest {
  id: string;
  projectName: string;
  projectType: string;
  description: string;
  requirements: string;
  deadline?: string | null;
  estimatedPrice: number;
  status: string;
  createdAt: string;
}

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
  const [projects, setProjects] = useState<ProjectRequest[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

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

    // Učitaj sprema projekte
    loadUserProjects();
  }, []);

  const loadUserProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await fetch(`/api/projects?email=${encodeURIComponent(userEmail || '')}`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data.data || []);
      }
    } catch (error) {
      console.error('Greška pri dohvatanju projekata:', error);
    } finally {
      setLoadingProjects(false);
    }
  };

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

  return (
    <>
      <ProjectRequestModal 
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        userName={userName}
        userEmail={userEmail}
        requestType="project"
      />

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

        {/* Moje Projekte Section */}
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
            📁 Meine Projektanfragen
          </h2>
          
          {loadingProjects ? (
            <p style={{ color: "#666", textAlign: "center", padding: "2rem" }}>
              ⏳ Wird geladen...
            </p>
          ) : projects.length === 0 ? (
            <div style={{ 
              backgroundColor: "#f5f5f5", 
              padding: "2rem", 
              borderRadius: "8px", 
              textAlign: "center",
              color: "#666"
            }}>
              <p style={{ marginBottom: "1rem" }}>
                Noch keine Projektanfragen. Klicken Sie oben auf "Projekt anfragen" um ein neues Projekt hinzuzufügen.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {projects.map((project) => (
                <div 
                  key={project.id}
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#333", marginBottom: "0.25rem" }}>
                        {project.projectName}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "#666" }}>
                        {project.projectType}
                      </p>
                    </div>
                    <div style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      backgroundColor: project.status === 'pending' ? '#fff3cd' : project.status === 'approved' ? '#d4edda' : '#f8d7da',
                      color: project.status === 'pending' ? '#856404' : project.status === 'approved' ? '#155724' : '#721c24',
                    }}>
                      {project.status === 'pending' && '⏳ Ausstehend'}
                      {project.status === 'approved' && '✓ Genehmigt'}
                      {project.status === 'rejected' && '✗ Abgelehnt'}
                      {project.status === 'completed' && '✓ Abgeschlossen'}
                    </div>
                  </div>
                  
                  <p style={{ color: "#666", fontSize: "0.95rem", marginBottom: "0.75rem", lineHeight: "1.5" }}>
                    {project.description}
                  </p>

                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "1rem",
                    fontSize: "0.9rem",
                    marginBottom: "0.75rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid #e0e0e0"
                  }}>
                    <div>
                      <span style={{ color: "#999", fontWeight: "500" }}>💰 Budget:</span>
                      <div style={{ color: "#333", fontWeight: "600" }}>
                        €{project.estimatedPrice.toLocaleString('de-DE', { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <span style={{ color: "#999", fontWeight: "500" }}>📅 Termin:</span>
                      <div style={{ color: "#333", fontWeight: "600" }}>
                        {project.deadline ? new Date(project.deadline).toLocaleDateString('de-DE') : 'Nicht angegeben'}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: "0.85rem", color: "#999" }}>
                    📝 Angefordert am {new Date(project.createdAt).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
    </>
  );
}
