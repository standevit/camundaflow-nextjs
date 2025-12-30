"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function CamundaIndexContent() {
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
  const projectPrice = 750;
  const [additionalServices, setAdditionalServices] = useState({
    multipleProcesses: false,
    kubernetes: false,
    monitoring: false,
    training: false,
  });

  const additionalPrices = {
    multipleProcesses: 500,
    kubernetes: 600,
    monitoring: 400,
    training: 350,
  };

  const calculateTotalPrice = () => {
    let total = projectPrice;
    if (additionalServices.multipleProcesses) total += additionalPrices.multipleProcesses;
    if (additionalServices.kubernetes) total += additionalPrices.kubernetes;
    if (additionalServices.monitoring) total += additionalPrices.monitoring;
    if (additionalServices.training) total += additionalPrices.training;
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
          {t('camunda_index_heading')}
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0', paddingRight: '160px' }}>
          {t("camunda_index_intro")}
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
            Camunda 8 Implementation - Projekt anfragen
          </h3>
          <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
            Professional Camunda 8 implementation for cloud-native business process automation
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
                <strong>☁️ Camunda 8 SaaS Setup</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Complete Camunda 8 SaaS account setup and configuration on Camunda Cloud
                </p>
              </div>
              <div>
                <strong>⚡ Zeebe Workflow Engine</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Cloud-native workflow engine with horizontal scaling capabilities
                </p>
              </div>
              <div>
                <strong>📊 Operate & Tasklist</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Process monitoring dashboard and user task management interface
                </p>
              </div>
              <div>
                <strong>🔌 Connector Integration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Setup of 2-3 standard connectors (REST, Email, etc.)
                </p>
              </div>
              <div>
                <strong>📝 First Process Deployment</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  One complete BPMN process deployed and tested (up to 10 tasks)
                </p>
              </div>
              <div>
                <strong>📚 Documentation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Setup guide, API examples, and deployment documentation
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
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.multipleProcesses ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.multipleProcesses}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, multipleProcesses: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🔄 Multiple Process Implementation (+€{additionalPrices.multipleProcesses})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Implementation of 3-5 additional business processes with testing
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.kubernetes ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.kubernetes}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, kubernetes: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🐳 Self-Managed Kubernetes (+€{additionalPrices.kubernetes})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Deploy Camunda 8 on your own Kubernetes cluster (EKS, AKS, GKE)
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.monitoring ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.monitoring}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, monitoring: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>📈 Monitoring & Optimize Setup (+€{additionalPrices.monitoring})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Prometheus/Grafana metrics, alerting, and Optimize analytics setup
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.training ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.training}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, training: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🎓 Team Training Session (+€{additionalPrices.training})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    4-hour hands-on training for your team on Camunda 8 development
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
                    title: 'Camunda 8 Implementation',
                    description: `Camunda 8 Implementation Request - ${formData.company || formData.name}`,
                    successUrl: `${window.location.origin}/payment/success`,
                    cancelUrl: window.location.href,
                    metadata: {
                      type: 'camunda8-implementation',
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
                placeholder="Beschreiben Sie Ihre Anforderungen..."
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
              {(additionalServices.multipleProcesses || additionalServices.kubernetes || additionalServices.monitoring || additionalServices.training) && (
                <>
                  {additionalServices.multipleProcesses && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Multiple Processes</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.multipleProcesses}</span>
                    </div>
                  )}
                  {additionalServices.kubernetes && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Kubernetes Deployment</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.kubernetes}</span>
                    </div>
                  )}
                  {additionalServices.monitoring && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Monitoring & Optimize</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.monitoring}</span>
                    </div>
                  )}
                  {additionalServices.training && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Team Training</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.training}</span>
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
                Professional Camunda 8 implementation and setup
                {(additionalServices.multipleProcesses || additionalServices.kubernetes || additionalServices.monitoring || additionalServices.training) && ' + selected additional services'}
              </p>
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
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                }}
              >
                Weiter zur Zahlung
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>🧩</span>
          {t("camunda_index_components_heading")}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>Zeebe</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_zeebe")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>Operate</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_operate")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>Tasklist</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_tasklist")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>Optimize</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_optimize")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>DMN Engine</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_dmn")}
            </p>
          </div>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: '1rem',
          borderRadius: '6px',
          marginTop: '1.5rem',
          border: '1px solid #667eea'
        }}>
          <p style={{ marginBottom: 0 }}>{t("camunda_index_benefits")}</p>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem' }}>
            📦 Event-Driven Lieferungsprozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("delivery_process_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/lieferung.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("delivery_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Lager prüfen:</strong> {t("delivery_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Message Event:</strong> {t("delivery_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Versand vorbereiten:</strong> {t("delivery_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Lieferung verfolgen:</strong> {t("delivery_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("delivery_step6")}</li>
          </ol>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem' }}>
            🛒 B2B Bestellprozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("b2b_process_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/b2bbestellung.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("b2b_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Kreditprüfung:</strong> {t("b2b_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Gateway:</strong> {t("b2b_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Vertrag erstellen:</strong> {t("b2b_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>SAP Integration:</strong> {t("b2b_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("b2b_step6")}</li>
          </ol>
        </div>
      </div>
    </>
  );
}
