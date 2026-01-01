"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function Camunda7Content() {
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
  const [testnetConfirmed, setTestnetConfirmed] = useState(false);

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const projectPrice = 800;

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
          Camunda 7
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0', paddingRight: '160px' }}>
          Camunda 7 (formerly Camunda BPM) is a powerful workflow and process automation platform that enables organizations to orchestrate complex business processes, automate tasks, and improve operational efficiency.
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
            Camunda 7 Implementation - Projekt anfragen
          </h3>
          <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
            Professional Camunda 7 implementation and setup for your business processes
          </p>

          {/* What's Included - Yellow Section */}
          <div style={{
            backgroundColor: "#fff4e5",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#d97706", marginBottom: "1rem" }}>
              📋 Was ist im Preis (€{projectPrice}) enthalten
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem", color: "#333" }}>
              <div>
                <strong>🚀 Camunda 7 Installation & Setup</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Complete installation on your infrastructure (Docker, Kubernetes, or bare metal)
                </p>
              </div>
              <div>
                <strong>⚙️ Engine Configuration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Database setup, thread pool optimization, and performance tuning
                </p>
              </div>
              <div>
                <strong>🔐 Authentication & Authorization</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  LDAP/Active Directory integration or custom user management setup
                </p>
              </div>
              <div>
                <strong>📊 First Process Implementation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  One business process modeled, deployed, and tested (up to 10 tasks)
                </p>
              </div>
              <div>
                <strong>📚 Documentation & Training</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Setup documentation, basic training session, and best practices guide
                </p>
              </div>
              <div>
                <strong>✅ Testing & Validation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  End-to-end testing and validation of your Camunda 7 setup
                </p>
              </div>
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
                    priceAmount: projectPrice,
                    priceCurrency: 'EUR',
                    title: 'Camunda 7 Implementation',
                    description: `Camunda 7 Implementation - ${formData.company || formData.name}`,
                    successUrl: `${window.location.origin}/payment/success`,
                    cancelUrl: window.location.href,
                    metadata: {
                      type: 'camunda7-implementation',
                      name: formData.name,
                      email: formData.email,
                      company: formData.company,
                      phone: formData.phone,
                      message: formData.message
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
                placeholder="Beschreiben Sie Ihre Camunda 7 Anforderungen..."
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
                <span style={{ fontWeight: '600', color: '#334155' }}>Gesamtpreis:</span>
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#667eea' }}>
                  €{projectPrice}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                Professional Camunda 7 setup + First process implementation + Documentation
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
        borderLeft: '4px solid #667eea',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#667eea', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📋</span>
          {t("process_basics_what_is")}
        </h3>
        <p>{t("process_basics_what_is_desc")}</p>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
            ✓ {t("process_basics_example1")}
          </li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
            ✓ {t("process_basics_example2")}
          </li>
          <li style={{ padding: '0.5rem 0' }}>
            ✓ {t("process_basics_example3")}
          </li>
        </ul>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>💡</span>
          {t("process_basics_why_model")}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("process_basics_transparency")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("process_basics_transparency_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("process_basics_optimization")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("process_basics_optimization_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("process_basics_automation")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("process_basics_automation_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("process_basics_compliance")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("process_basics_compliance_desc")}
            </p>
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
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>📊</span>
          {t("process_basics_three_levels")}
        </h3>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', marginBottom: '1rem', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea', fontSize: '1.1rem' }}>1. {t("process_basics_level1")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              {t("process_basics_level1_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', marginBottom: '1rem', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea', fontSize: '1.1rem' }}>2. {t("process_basics_level2")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              {t("process_basics_level2_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea', fontSize: '1.1rem' }}>3. {t("process_basics_level3")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              {t("process_basics_level3_desc")}
            </p>
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
        <p style={{ fontSize: '1.05rem', marginBottom: 0, color: '#475569' }}>
          💡 {t("process_basics_camunda_note")}
        </p>
      </div>

      {/* Order Approval Process Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginTop: '3rem',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
          Order Approval Process
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          A typical business process for order approval that demonstrates how Camunda 7 handles multi-step workflows with decision gateways and user tasks.
        </p>
      </div>

      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h4 style={{ 
          color: '#667eea',
          marginBottom: '1rem',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          Process Overview
        </h4>
        <p style={{ 
          color: '#495057',
          lineHeight: '1.6',
          marginBottom: '1rem'
        }}>
          This BPMN diagram illustrates a typical order approval workflow that includes:
        </p>
        <ul style={{ 
          color: '#495057',
          lineHeight: '1.8',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Start Event:</strong> Order request is initiated</li>
          <li><strong>User Task:</strong> Order details are reviewed by an employee</li>
          <li><strong>Exclusive Gateway:</strong> Decision point based on order value or criteria</li>
          <li><strong>Approval Task:</strong> Manager or supervisor approves high-value orders</li>
          <li><strong>Service Task:</strong> Automated processing and system updates</li>
          <li><strong>End Event:</strong> Order is finalized and confirmed</li>
        </ul>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        marginBottom: '2rem'
      }}>
        <h4 style={{ 
          color: '#667eea',
          marginBottom: '1rem',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          BPMN Diagram
        </h4>
        <div 
          className="bpmn-container"
          data-diagram="/bpmn/order-approval-process.bpmn"
          style={{ 
            height: '600px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🔄</span>
          </div>
          <h4 style={{ color: '#212529', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
            Process Automation
          </h4>
          <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: 0 }}>
            Automate repetitive approval workflows and reduce manual intervention, improving processing time and accuracy.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📊</span>
          </div>
          <h4 style={{ color: '#212529', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
            Decision Gateways
          </h4>
          <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: 0 }}>
            Implement business rules and conditional logic to route orders based on value, priority, or other criteria.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>👥</span>
          </div>
          <h4 style={{ color: '#212529', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
            Human Tasks
          </h4>
          <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: 0 }}>
            Assign tasks to specific users or groups, ensuring the right people review and approve orders at the right time.
          </p>
        </div>
      </div>

      <div style={{ 
        background: '#e7f3ff',
        padding: '1.5rem',
        borderRadius: '8px',
        borderLeft: '4px solid #0066cc',
        marginBottom: '2rem'
      }}>
        <h4 style={{ 
          color: '#0066cc',
          marginBottom: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          Implementation Benefits
        </h4>
        <p style={{ 
          color: '#495057',
          lineHeight: '1.6',
          marginBottom: 0
        }}>
          By implementing order approval processes with Camunda 7, organizations achieve faster processing times, 
          reduced errors, improved compliance, and complete audit trails for all orders.
        </p>
      </div>
    </>
  );
}
