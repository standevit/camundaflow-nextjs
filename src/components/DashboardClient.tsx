"use client";

import { useTranslation } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";

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

  return (
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
            📊 Ihre Projekte
          </h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Verwalten Sie Ihre Camunda-Projekte und Workflows.
          </p>
          <button style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}>
            Projekte anzeigen
          </button>
        </div>

        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "12px", 
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
            🔧 Ressourcen
          </h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Zugriff auf Dokumentation und Tools.
          </p>
          <button style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}>
            Ressourcen öffnen
          </button>
        </div>

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
      </div>
    </div>
  );
}
