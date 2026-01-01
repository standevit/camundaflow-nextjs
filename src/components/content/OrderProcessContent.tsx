"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function OrderProcessContent() {
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
  const projectPrice = 800;
  const [includeExtras, setIncludeExtras] = useState({
    eventDriven: false,
    multiTenant: false,
    monitoring: false,
  });
  const [testnetConfirmed, setTestnetConfirmed] = useState(false);

  const extraPrices = {
    eventDriven: 200,
    multiTenant: 300,
    monitoring: 150,
  };

  const totalPrice = projectPrice + 
    (includeExtras.eventDriven ? extraPrices.eventDriven : 0) +
    (includeExtras.multiTenant ? extraPrices.multiTenant : 0) +
    (includeExtras.monitoring ? extraPrices.monitoring : 0);

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
          {t("order_process_hero_heading")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0',
          paddingRight: '160px'
        }}>
          {t("order_process_hero_desc")}
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
            Microservices Order Process - Projekt anfragen
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
            💰 <strong>Basispreis:</strong> €{projectPrice} | 💵 <strong>Gesamt:</strong> €{totalPrice}
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
                <strong>🏗️ Microservices Architektur</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Vollständige Order Processing Lösung mit Camunda 8, Spring Boot, und REST APIs.
                </p>
              </div>
              <div>
                <strong>⚙️ Orchestrierung & Workflow</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  BPMN-basierte Prozessautomatisierung mit Fehlerbehandlung und Retry-Logik.
                </p>
              </div>
              <div>
                <strong>🗄️ Datenpersistenz</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  PostgreSQL/MySQL Datenbank-Integration mit JPA/Hibernate.
                </p>
              </div>
              <div>
                <strong>📦 Deployment</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Docker & Kubernetes Setup mit CI/CD Pipeline (GitHub Actions).
                </p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#059669", marginBottom: "1rem" }}>
              ➕ Zusätzliche Features (optional)
            </h4>
            
            {/* Event-Driven Architecture */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.eventDriven ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, eventDriven: !includeExtras.eventDriven})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.eventDriven}
                  onChange={(e) => setIncludeExtras({...includeExtras, eventDriven: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    📡 Event-Driven Architecture (Kafka)
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Apache Kafka Integration für asynchrone Events, Event Sourcing und CQRS Pattern.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.eventDriven}
                  </p>
                </div>
              </div>
            </div>

            {/* Multi-Tenant */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.multiTenant ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, multiTenant: !includeExtras.multiTenant})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.multiTenant}
                  onChange={(e) => setIncludeExtras({...includeExtras, multiTenant: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    🏢 Multi-Tenant Architektur
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Mandantenfähige Lösung mit Datenisolation, Keycloak Integration und Tenant-Management.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.multiTenant}
                  </p>
                </div>
              </div>
            </div>

            {/* Monitoring & Observability */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.monitoring ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, monitoring: !includeExtras.monitoring})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.monitoring}
                  onChange={(e) => setIncludeExtras({...includeExtras, monitoring: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    📊 Monitoring & Observability
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Prometheus, Grafana, ELK Stack für Logging, Metriken und Distributed Tracing.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.monitoring}
                  </p>
                </div>
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
                Projektbeschreibung & Zusätzliche Features
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Beschreiben Sie Ihr Projekt und welche zusätzlichen Features Sie benötigen..."
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
                        priceAmount: totalPrice,
                        priceCurrency: 'EUR',
                        title: 'Microservices Order Process Implementation',
                        description: `Microservices Order Process - ${formData.company || formData.name}`,
                        successUrl: `${window.location.origin}/payment/success`,
                        cancelUrl: window.location.href,
                        metadata: {
                          type: 'microservices-implementation',
                          name: formData.name || userName,
                          email: formData.email || userEmail,
                          company: formData.company,
                          phone: formData.phone,
                          message: formData.message,
                          extras: JSON.stringify(includeExtras),
                          totalPrice: totalPrice,
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
                disabled={!formData.name && !userName || !formData.email && !userEmail || !testnetConfirmed}
                style={{
                  flex: 2,
                  padding: '0.875rem',
                  background: (!formData.name && !userName || !formData.email && !userEmail || !testnetConfirmed) 
                    ? '#cccccc' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: (!formData.name && !userName || !formData.email && !userEmail || !testnetConfirmed) 
                    ? 'not-allowed' 
                    : 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  opacity: (!formData.name && !userName || !formData.email && !userEmail || !testnetConfirmed) ? 0.6 : 1,
                }}
                title={!testnetConfirmed ? "Bitte bestätigen Sie, dass Sie das Testnet verstehen" : ""}
              >
                Projekt anfragen (€{totalPrice})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenges Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          {t("order_process_challenges_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} style={{
              background: 'white',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid #e74c3c',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#475569' }}>
                {t(`order_process_challenge_${num}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          {t("order_process_solution_heading")}
        </h3>
        <p style={{
          fontSize: '1.05rem',
          lineHeight: '1.8',
          color: '#475569',
          marginBottom: '1.5rem'
        }}>
          {t("order_process_solution_desc")}
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>
            {t("order_process_solution_result")}
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
            {t("order_process_bpmn_heading")}
          </h3>
        </div>

        <div 
          className="bpmn-container" 
          data-diagram="/bpmn/Bestellung_verarbeiten.bpmn"
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
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
                {t(`order_process_flow_step_${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          {t("order_process_best_practices_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                color: '#667eea',
                fontSize: '1.5rem',
                fontWeight: '700',
                flexShrink: 0
              }}>
                🔧
              </div>
              <p style={{ margin: 0, color: '#334155', lineHeight: '1.6' }}>
                {t(`order_process_best_practice_${num}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          {t("order_process_architecture_heading")}
        </h3>
        
        {/* Central Component */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>
            🎯 {t("order_process_arch_central")}
          </div>
          <div style={{ fontSize: '0.95rem', opacity: '0.9', color: 'white' }}>
            Camunda Platform / Camunda 8
          </div>
        </div>

        {/* Microservices */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {['Order Service', 'Inventory Service', 'Payment Service', 'Billing Service', 'Shipping Service', 'Notification Service'].map((service, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚙️</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>
                {service}
              </div>
            </div>
          ))}
        </div>

        {/* Communication */}
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '10px'
        }}>
          <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
            {t("order_process_arch_communication")}
          </div>
          <div style={{ color: '#475569', lineHeight: '1.7' }}>
            {t("order_process_arch_communication_desc")}
          </div>
        </div>
      </div>

      {/* Architecture Principle */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '2rem',
          marginBottom: '1rem'
        }}>
          🔁
        </div>
        <p style={{
     
          fontSize: '1.2rem',
          lineHeight: '1.7',
          color: 'white',
          fontWeight: '600'
        }}>
          {t("order_process_principle")}
        </p>
        <p style={{
          
          fontSize: '1rem',
          lineHeight: '1.6',
          color: 'white',
          opacity: '0.9'
        }}>
          {t("order_process_principle_desc")}
        </p>
      </div>
    </div>
  );
}
