"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear project request from session storage
    try {
      sessionStorage.removeItem("projectRequest");
    } catch (e) {
      console.error("Failed to clear session", e);
    }
  }, []);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "16px", 
        padding: "3rem",
        maxWidth: "600px",
        textAlign: "center",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
          ✅
        </div>
        
        <h1 style={{ 
          fontSize: "2rem", 
          fontWeight: "bold", 
          marginBottom: "1rem",
          color: "#333"
        }}>
          Zahlung erfolgreich!
        </h1>
        
        <p style={{ 
          fontSize: "1.1rem", 
          color: "#666", 
          marginBottom: "2rem",
          lineHeight: "1.6"
        }}>
          Vielen Dank für Ihr Vertrauen! Ihre Zahlung wurde erfolgreich verarbeitet.
        </p>

        <div style={{
          backgroundColor: "#f0f7ff",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          textAlign: "left"
        }}>
          <h2 style={{ 
            fontSize: "1.2rem", 
            fontWeight: "600", 
            marginBottom: "1rem",
            color: "#333"
          }}>
            Was passiert jetzt?
          </h2>
          <ul style={{ 
            margin: 0, 
            paddingLeft: "1.5rem",
            color: "#555",
            lineHeight: "1.8"
          }}>
            <li>Sie erhalten eine Bestätigungs-E-Mail mit allen Details</li>
            <li>Ich werde Ihre Anfrage innerhalb von 24 Stunden prüfen</li>
            <li>Sie bekommen einen detaillierten Projektplan per E-Mail</li>
            <li>Bei Fragen können Sie mich jederzeit kontaktieren</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: "#e8f5e9",
          padding: "1.25rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          fontSize: "0.95rem",
          color: "#2e7d32"
        }}>
          <strong>📧 Kontakt:</strong> post@camundaflow.de<br />
          <strong>⏰ Antwortzeit:</strong> Innerhalb von 24 Stunden
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link 
            href="/dashboard"
            style={{
              padding: "0.875rem 1.5rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            Zurück zum Dashboard
          </Link>
          
          <Link 
            href="/"
            style={{
              padding: "0.875rem 1.5rem",
              backgroundColor: "#f5f5f5",
              color: "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
