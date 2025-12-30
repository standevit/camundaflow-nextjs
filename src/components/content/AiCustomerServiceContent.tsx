"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function AiCustomerServiceContent() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const projectPrice = 950;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        position: 'relative'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          {t("ai_customer_service_intro_heading")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0',
          paddingRight: '160px'
        }}>
          {t("ai_customer_service_intro_desc")}
        </p>
        
        {/* Projekt anfragen Button */}
        <button
          onClick={() => setShowForm(true)}
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          📝 Projekt anfragen
        </button>
      </div>

      {/* Project Request Form */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          marginBottom: '2rem',
          border: '2px solid #667eea',
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#333' }}>
            AI Customer Service - Projekt anfragen
          </h3>

          {/* Price Info */}
          <div style={{
            backgroundColor: "#f0f7ff",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            fontSize: "0.95rem",
            color: "#0066cc",
          }}>
            💰 <strong>Projektpreis:</strong> €{projectPrice}
          </div>

          {/* Project Description */}
          <div style={{
            backgroundColor: "#fff4e5",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#d97706", marginBottom: "1rem" }}>
              📋 Was Sie erhalten
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem", color: "#333" }}>
              <div>
                <strong>🤖 AI-powered Chatbot</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Intelligenter Kundenservice-Bot mit OpenAI GPT-4, LangChain und RAG-System.
                </p>
              </div>
              <div>
                <strong>🔗 Camunda Integration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Prozess-Orchestrierung für komplexe Anfragen, Eskalation und Human-in-the-Loop.
                </p>
              </div>
              <div>
                <strong>📚 Wissensdatenbank</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Vector Database (Pinecone/Weaviate) mit Ihren FAQs, Dokumentationen und Produktinfos.
                </p>
              </div>
              <div>
                <strong>💬 Multi-Channel</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Integration in Website, WhatsApp, Telegram, Slack und weitere Kanäle.
                </p>
              </div>
              <div>
                <strong>📊 Analytics Dashboard</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Monitoring, Reporting und kontinuierliche Verbesserung durch ML-Insights.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                Name *
              </label>
              <input
                type="text"
                value={formData.name || userName}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ihr Name"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                E-Mail *
              </label>
              <input
                type="email"
                value={formData.email || userEmail}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ihre@email.de"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                Firma
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Firmenname (optional)"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+49 (optional)"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                Projektbeschreibung & Anforderungen
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Beschreiben Sie Ihre Kundenservice-Anforderungen, Anzahl der Anfragen, gewünschte Integrationen..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                }}
              >
                Abbrechen
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/api/payment/create-charge', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        priceAmount: projectPrice,
                        priceCurrency: 'EUR',
                        title: 'AI Customer Service Implementation',
                        description: `AI Customer Service - ${formData.company || formData.name}`,
                        successUrl: `${window.location.origin}/payment/success`,
                        cancelUrl: window.location.href,
                        metadata: {
                          type: 'ai-customer-service',
                          name: formData.name || userName,
                          email: formData.email || userEmail,
                          company: formData.company,
                          phone: formData.phone,
                          message: formData.message,
                        }
                      }),
                    });
                    
                    if (response.ok) {
                      const data = await response.json();
                      window.location.href = data.checkoutUrl;
                    } else {
                      const error = await response.json();
                      alert(`Fehler: ${error.error || 'Bitte versuchen Sie es erneut.'}`);
                    }
                  } catch (error) {
                    console.error('Payment error:', error);
                    alert('Fehler beim Erstellen der Zahlung. Bitte versuchen Sie es erneut.');
                  }
                }}
                disabled={!formData.name && !userName || !formData.email && !userEmail}
                style={{
                  flex: 2,
                  padding: '0.875rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  opacity: (!formData.name && !userName || !formData.email && !userEmail) ? 0.5 : 1,
                }}
              >
                Projekt anfragen (€{projectPrice})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Capabilities Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#0f172a'
        }}>
          {t("ai_customer_service_intro_capabilities_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_1")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_2")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_3")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_4")}
            </p>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>
            {t("ai_customer_service_intro_result")}
          </p>
        </div>
      </div>

      {/* BPMN Diagram Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            📊
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
          }}>
            {t("ai_customer_service_intro_process_heading")}
          </h3>
        </div>

        <div 
          className="bpmn-container" 
          data-diagram="/bpmn/ai-customer-service.bpmn"
          style={{
            height: '500px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '2rem',
            overflow: 'hidden'
          }}
        ></div>

        {/* Process Flow Description */}
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                fontWeight: '700',
                flexShrink: 0
              }}>
                {step}
              </div>
              <p style={{
                margin: 0,
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#475569'
              }}>
                {t(`ai_customer_service_intro_process_step_${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
