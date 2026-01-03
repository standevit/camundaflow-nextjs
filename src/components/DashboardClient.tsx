"use client";

import { useTranslation } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import ProjectRequestModal from "@/components/ProjectRequestModal";
import CostConfiguratorProjectCard from "@/components/CostConfiguratorProjectCard";

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
  console.log('🔵 DashboardClient props:', { userName, userEmail, userImage });
  
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

    // Osvježi projekte kada se prozor vrati u fokus (nakon plaćanja)
    const handleFocus = () => {
      console.log('Dashboard je opet u fokusu, osvježavam projekte...');
      loadUserProjects();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Osvježi projekte kada se modal zatvori
  useEffect(() => {
    if (!showRequestModal) {
      // Osvježi projekte nakon što se modal zatvori
      loadUserProjects();
    }
  }, [showRequestModal]);

  const loadUserProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await fetch(`/api/projects?email=${encodeURIComponent(userEmail || '')}`);
      if (response.ok) {
        const data = await response.json();
        console.log("📥 Projects loaded from API:", data.data);
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
        onProjectCreated={() => {
          // Osvježi projekte nakon što je projekt sprema
          loadUserProjects();
        }}
      />

    <div style={{ padding: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        padding: "1rem",
        color: "white",
        marginBottom: "1rem"
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
          Willkommen im Portal, {userName}! 👋
        </h1>
        <p style={{ opacity: 0.9 }}>
          Sie haben erfolgreich mit GitHub angemeldet.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "1.5rem",
        marginBottom: "1rem"
      }}>
                <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#333" }}>
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
          padding: "1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#333" }}>
            🌍 Spracheinstellungen
          </h2>
          <p style={{ color: "#666", marginBottom: "0.75rem", fontSize: "0.85rem" }}>
            Wählen Sie Ihre bevorzugte Sprache. Diese wird automatisch beim nächsten Login verwendet.
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: selectedLanguage === lang.code ? "#667eea" : "#f5f5f5",
                  color: selectedLanguage === lang.code ? "white" : "#333",
                  border: selectedLanguage === lang.code ? "2px solid #667eea" : "2px solid transparent",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: selectedLanguage === lang.code ? "600" : "500",
                  fontSize: "0.9rem",
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
                <span style={{ fontSize: "1.25rem" }}>{lang.flag}</span>
                <span>{lang.name}</span>
                {selectedLanguage === lang.code && (
                  <span style={{ marginLeft: "auto" }}>✓</span>
                )}
              </button>
            ))}
          </div>

          <div style={{ 
            marginTop: "0.75rem", 
            padding: "0.5rem", 
            backgroundColor: "#f0f7ff", 
            borderRadius: "6px",
            fontSize: "0.75rem",
            color: "#0066cc"
          }}>
            💡 <strong>Tipp:</strong> Diese Einstellung wird für Ihr Konto gespeichert und beim nächsten Login automatisch angewendet.
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "12px", 
        padding: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#333" }}>
            📁 Meine Projektanfragen
          </h2>
          
          {loadingProjects ? (
            <p style={{ color: "#666", textAlign: "center", padding: "2rem" }}>
              ⏳ Wird geladen...
            </p>
          ) : (() => {
            const costConfigProjects = projects.filter(p => p.projectType === 'cost-configurator');
            const otherProjects = projects.filter(p => p.projectType !== 'cost-configurator');
            
            return (
              <>
                {/* Cost Configurator Projects */}
                {costConfigProjects.length > 0 && (
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1rem", color: "#333", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      🔧 Generiierte Projekte ({costConfigProjects.length})
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {costConfigProjects.map((project) => (
                        <CostConfiguratorProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Projects */}
                {otherProjects.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: "1rem", color: "#333", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      📋 Weitere Anfragen ({otherProjects.length})
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {otherProjects.map((project) => (
                        <CostConfiguratorProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {costConfigProjects.length === 0 && otherProjects.length === 0 && (
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
                )}
              </>
            );
            })()}
        </div>
    </div>
    </>
  );
}
