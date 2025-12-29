"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectRequest {
  projectName: string;
  projectType: string;
  description: string;
  requirements: string;
  deadline: string;
  userName?: string;
  userEmail?: string;
  timestamp?: string;
}

const SUGGESTED_PRICES = [
  { amount: 299, label: "Starter", description: "Kleine Projekte & Beratung" },
  { amount: 999, label: "Professional", description: "Mittlere Projekte & Architecture" },
  { amount: 2499, label: "Enterprise", description: "Große Projekte & Full Implementation" },
];

export default function PaymentPage() {
  const router = useRouter();
  const [projectRequest, setProjectRequest] = useState<ProjectRequest | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load project request from sessionStorage
    try {
      const saved = sessionStorage.getItem("projectRequest");
      if (saved) {
        setProjectRequest(JSON.parse(saved));
      } else {
        // No request found, redirect back to dashboard
        router.push("/dashboard");
      }
    } catch (e) {
      console.error("Failed to load request", e);
      router.push("/dashboard");
    }
  }, [router]);

  const handlePayment = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    
    if (!amount || amount < 50) {
      alert("Bitte wählen Sie einen Betrag von mindestens 50 EUR");
      return;
    }

    setLoading(true);

    try {
      // Create Coinbase Commerce charge
      const response = await fetch("/api/payment/create-charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          projectRequest,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment");
      }

      const data = await response.json();
      
      // Redirect to Coinbase Commerce hosted page
      if (data.hostedUrl) {
        window.location.href = data.hostedUrl;
      } else {
        throw new Error("No hosted URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Fehler beim Erstellen der Zahlung. Bitte versuchen Sie es erneut.");
      setLoading(false);
    }
  };

  if (!projectRequest) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Laden...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "16px", 
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#333" }}>
            💳 Zahlung für Ihr Projekt
          </h1>
          
          <div style={{ 
            backgroundColor: "#f8f9fa", 
            padding: "1.5rem", 
            borderRadius: "12px",
            marginBottom: "2rem"
          }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1rem", color: "#333" }}>
              Projekt-Details:
            </h2>
            <div style={{ display: "grid", gap: "0.75rem", fontSize: "0.95rem" }}>
              <div>
                <strong>Projektname:</strong> {projectRequest.projectName}
              </div>
              <div>
                <strong>Typ:</strong> {projectRequest.projectType.replace(/_/g, " ").toUpperCase()}
              </div>
              <div>
                <strong>Beschreibung:</strong>
                <p style={{ marginTop: "0.5rem", color: "#555", whiteSpace: "pre-wrap" }}>
                  {projectRequest.description}
                </p>
              </div>
              {projectRequest.requirements && (
                <div>
                  <strong>Anforderungen:</strong>
                  <p style={{ marginTop: "0.5rem", color: "#555", whiteSpace: "pre-wrap" }}>
                    {projectRequest.requirements}
                  </p>
                </div>
              )}
              {projectRequest.deadline && (
                <div>
                  <strong>Gewünschter Termin:</strong> {projectRequest.deadline}
                </div>
              )}
            </div>
          </div>

          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem", color: "#333" }}>
            Wählen Sie den Betrag
          </h2>

          {/* Suggested Prices */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem"
          }}>
            {SUGGESTED_PRICES.map((price) => (
              <button
                key={price.amount}
                onClick={() => {
                  setSelectedAmount(price.amount);
                  setCustomAmount("");
                }}
                style={{
                  padding: "1.5rem",
                  border: selectedAmount === price.amount ? "3px solid #667eea" : "2px solid #e0e0e0",
                  borderRadius: "12px",
                  backgroundColor: selectedAmount === price.amount ? "#f0f4ff" : "white",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: "0.85rem", color: "#667eea", fontWeight: "600", marginBottom: "0.5rem" }}>
                  {price.label}
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#333", marginBottom: "0.5rem" }}>
                  €{price.amount}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  {price.description}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ 
              display: "block", 
              fontWeight: "600", 
              marginBottom: "0.75rem",
              color: "#333",
              fontSize: "1.1rem"
            }}>
              Oder geben Sie Ihren eigenen Betrag ein:
            </label>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{ 
                  position: "absolute", 
                  left: "1rem", 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  fontSize: "1.2rem",
                  color: "#666",
                  fontWeight: "600"
                }}>
                  €
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="z.B. 500"
                  min="50"
                  style={{
                    width: "100%",
                    padding: "1rem 1rem 1rem 2.5rem",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
            <p style={{ 
              fontSize: "0.85rem", 
              color: "#666", 
              marginTop: "0.5rem",
              fontStyle: "italic"
            }}>
              Mindestbetrag: €50
            </p>
          </div>

          {/* Payment Info */}
          <div style={{
            backgroundColor: "#fff9e6",
            border: "2px solid #ffd700",
            padding: "1.25rem",
            borderRadius: "12px",
            marginBottom: "2rem",
          }}>
            <div style={{ fontSize: "1rem", color: "#856404", marginBottom: "0.75rem" }}>
              <strong>🔒 Sichere Krypto-Zahlung via CoinGate</strong>
            </div>
            <ul style={{ 
              margin: "0.5rem 0 0 1.5rem", 
              color: "#856404",
              fontSize: "0.9rem",
              lineHeight: "1.6"
            }}>
              <li>Akzeptierte Coins: Bitcoin, Ethereum, Litecoin, USDT, USDC und 50+ weitere</li>
              <li>Sie werden zu CoinGate Payment Gateway weitergeleitet</li>
              <li>Nach erfolgreicher Zahlung erhalten Sie eine Bestätigung per E-Mail</li>
              <li>Ich beginne mit der Arbeit innerhalb von 24 Stunden</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => router.push("/dashboard")}
              disabled={loading}
              style={{
                flex: 1,
                padding: "1rem",
                backgroundColor: "#f5f5f5",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              ← Zurück
            </button>
            <button
              onClick={handlePayment}
              disabled={loading || (!selectedAmount && !customAmount)}
              style={{
                flex: 2,
                padding: "1rem",
                background: loading || (!selectedAmount && !customAmount) 
                  ? "#ccc" 
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: loading || (!selectedAmount && !customAmount) ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              {loading ? "Erstelle Zahlung..." : "Mit Krypto bezahlen →"}
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div style={{ 
          textAlign: "center", 
          color: "white",
          fontSize: "0.9rem",
          opacity: 0.9
        }}>
          <p>💡 Bei Fragen zur Zahlung: <a href="mailto:post@camundaflow.de" style={{ color: "white", textDecoration: "underline" }}>post@camundaflow.de</a></p>
        </div>
      </div>
    </div>
  );
}
