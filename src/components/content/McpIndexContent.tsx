"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function McpIndexContent() {
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
  const projectPrice = 1200;
  const [testnetConfirmed, setTestnetConfirmed] = useState(false);
  const [additionalServices, setAdditionalServices] = useState({
    aiTraining: false,
    multipleProcesses: false,
    customTools: false,
    ongoingSupport: false,
  });

  const additionalPrices = {
    aiTraining: 300,
    multipleProcesses: 400,
    customTools: 500,
    ongoingSupport: 250,
  };

  const calculateTotalPrice = () => {
    let total = projectPrice;
    if (additionalServices.aiTraining) total += additionalPrices.aiTraining;
    if (additionalServices.multipleProcesses) total += additionalPrices.multipleProcesses;
    if (additionalServices.customTools) total += additionalPrices.customTools;
    if (additionalServices.ongoingSupport) total += additionalPrices.ongoingSupport;
    return total;
  };

  return (
    <>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        color: 'white',
        position: 'relative'
      }}>
        <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
          {t("mcp_index_heading")}
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0', paddingRight: '160px' }}>
          {t("mcp_index_intro")}
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
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '2px solid #667eea',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginTop: 0, color: '#667eea', fontSize: '1.5rem', marginBottom: '1rem' }}>
            MCP + Camunda Integration - Projekt anfragen
          </h3>
          <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
            Professional Model Context Protocol server development with Camunda integration for AI agents
          </p>

          {/* What's Included - Yellow Section */}
          <div style={{
            backgroundColor: "#fff4e5",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#d97706", marginBottom: "1rem" }}>
              📋 Was ist im Basispreis (€{projectPrice}) enthalten
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem", color: "#333" }}>
              <div>
                <strong>🔌 MCP Server Development</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Custom MCP server in Node.js/TypeScript with Camunda REST API integration
                </p>
              </div>
              <div>
                <strong>⚙️ Core Tools Implementation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Start process, query process instances, complete tasks, get variables
                </p>
              </div>
              <div>
                <strong>🤖 AI Agent Configuration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Setup and configuration for Claude or GPT integration with MCP
                </p>
              </div>
              <div>
                <strong>🔐 Authentication & Security</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  OAuth2/Basic Auth implementation for secure Camunda API access
                </p>
              </div>
              <div>
                <strong>📚 Documentation & Examples</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Complete setup guide, API documentation, and usage examples
                </p>
              </div>
              <div>
                <strong>✅ Testing & Validation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Unit tests, integration tests, and end-to-end workflow validation
                </p>
              </div>
            </div>
          </div>

          {/* Additional Services - Green Section */}
          <div style={{
            backgroundColor: "#e5f8e5",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#059669", marginBottom: "1rem" }}>
              ➕ Zusätzliche Optionen
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.aiTraining ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.aiTraining}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, aiTraining: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🎓 AI Agent Training (+€{additionalPrices.aiTraining})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Custom prompt engineering and training for your specific business processes
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.multipleProcesses ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.multipleProcesses}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, multipleProcesses: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🔄 Multiple Process Types (+€{additionalPrices.multipleProcesses})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    MCP tools for 5+ different process types with custom configurations
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.customTools ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.customTools}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, customTools: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🛠️ Custom MCP Tools (+€{additionalPrices.customTools})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Development of specialized tools for your unique business requirements
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.ongoingSupport ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.ongoingSupport}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, ongoingSupport: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>💬 3 Months Support (+€{additionalPrices.ongoingSupport})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Email & chat support, updates, and assistance for 3 months
                  </p>
                </div>
              </label>
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              
              try {
                const response = await fetch('/api/payment/create-charge', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    priceAmount: calculateTotalPrice(),
                    priceCurrency: 'EUR',
                    title: 'MCP + Camunda Integration',
                    description: `MCP Server Development with Camunda - ${formData.company || formData.name}`,
                    successUrl: `${window.location.origin}/payment/success`,
                    cancelUrl: window.location.href,
                    metadata: {
                      type: 'mcp-camunda-integration',
                      name: formData.name,
                      email: formData.email,
                      company: formData.company,
                      phone: formData.phone,
                      message: formData.message,
                      basePrice: projectPrice,
                      additionalServices: JSON.stringify(additionalServices),
                      totalPrice: calculateTotalPrice(),
                    }
                  }),
                });

                const data = await response.json();
                
                if (data.checkoutUrl) {
                  window.location.href = data.checkoutUrl;
                } else {
                  alert('Error creating payment. Please try again.');
                }
              } catch (error) {
                console.error('Payment error:', error);
                alert('Error processing request. Please try again.');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name || userName}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ihr Name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email || userEmail}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ihre.email@firma.de"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>
                Firma
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Firmenname"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+49 123 456789"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>
                Projektbeschreibung
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Beschreiben Sie Ihre MCP + Camunda Anforderungen..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ 
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#334155' }}>Basispreis:</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#475569' }}>
                  €{projectPrice}
                </span>
              </div>
              {(additionalServices.aiTraining || additionalServices.multipleProcesses || additionalServices.customTools || additionalServices.ongoingSupport) && (
                <>
                  {additionalServices.aiTraining && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ AI Agent Training</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.aiTraining}</span>
                    </div>
                  )}
                  {additionalServices.multipleProcesses && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Multiple Process Types</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.multipleProcesses}</span>
                    </div>
                  )}
                  {additionalServices.customTools && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Custom MCP Tools</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.customTools}</span>
                    </div>
                  )}
                  {additionalServices.ongoingSupport && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ 3 Months Support</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.ongoingSupport}</span>
                    </div>
                  )}
                  <hr style={{ border: 'none', borderTop: '1px solid #cbd5e1', margin: '0.5rem 0' }} />
                </>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ fontWeight: '700', color: '#334155', fontSize: '1.1rem' }}>Gesamtpreis:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                  €{calculateTotalPrice()}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.5rem 0 0 0' }}>
                Custom MCP server development + Camunda API integration + AI agent setup
                {(additionalServices.aiTraining || additionalServices.multipleProcesses || additionalServices.customTools || additionalServices.ongoingSupport) && ' + selected additional services'}
              </p>
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

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={!testnetConfirmed}
                title={!testnetConfirmed ? "Bitte bestätigen Sie, dass Sie das Testnet verstehen" : ""}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: !testnetConfirmed ? '#cccccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: !testnetConfirmed ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                  opacity: !testnetConfirmed ? 0.6 : 1
                }}
              >
                Weiter zur Zahlung
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#667eea', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔌</span>
          {t("mcp_index_what_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_discovers_label")}</strong> {t("mcp_index_discovers")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_understands_label")}</strong> {t("mcp_index_understands")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_calls_label")}</strong> {t("mcp_index_calls")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_works_label")}</strong> {t("mcp_index_works")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_supports_label")}</strong> {t("mcp_index_supports")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_enables_label")}</strong> {t("mcp_index_enables")}
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>🛠️</span>
          {t("mcp_index_tools_heading")}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_1")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_2")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_3")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_4")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_5")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_6")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_7")}
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>💡</span>
          {t("mcp_index_why_camunda_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_1_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_1")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_2_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_2")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_3_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_3")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_4_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_4")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_5_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_5")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_6_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_6")}</p>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '2px solid #667eea',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.05rem', marginBottom: 0 }}>
          <strong style={{ color: '#667eea' }}>{t("mcp_index_conclusion_label")}</strong> {t("mcp_index_conclusion")}
        </p>
      </div>

      <section style={{ marginTop: '3rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem' }}>
            🤖 MCP Beispiel: Automatische Kundenanfrage
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("mcp_example_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/mcp.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Prozess Ablauf:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start:</strong> {t("mcp_example_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>AI Analyse:</strong> {t("mcp_example_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>MCP Server Call:</strong> {t("mcp_example_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Daten abrufen:</strong> {t("mcp_example_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Prozess triggern:</strong> {t("mcp_example_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("mcp_example_step6")}</li>
          </ol>
        </div>
      </section>
    </>
  );
}
