"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function BpmnContent() {
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
  const [additionalServices, setAdditionalServices] = useState({
    camunda7: false,
    zeebe: false,
    customExtensions: false,
    enterpriseSupport: false,
  });

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const projectPrice = 700;
  
  const additionalPrices = {
    camunda7: 400,
    zeebe: 600,
    customExtensions: 500,
    enterpriseSupport: 300,
  };

  const calculateTotalPrice = () => {
    let total = projectPrice;
    if (additionalServices.camunda7) total += additionalPrices.camunda7;
    if (additionalServices.zeebe) total += additionalPrices.zeebe;
    if (additionalServices.customExtensions) total += additionalPrices.customExtensions;
    if (additionalServices.enterpriseSupport) total += additionalPrices.enterpriseSupport;
    return total;
  };

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
          BPMN
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0',
          paddingRight: '160px'
        }}>
          <strong>Business Process Model and Notation (BPMN 2.0)</strong> {t("bpmn_desc")}
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
            BPMN Engine Implementation - Projekt anfragen
          </h3>
          <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
            Professional Flowable BPMN engine implementation for your business processes
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
                <strong>🚀 Flowable Engine Setup</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Complete Flowable BPMN engine installation and configuration (Docker or standalone)
                </p>
              </div>
              <div>
                <strong>⚙️ Database Configuration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  PostgreSQL/MySQL setup with optimized connection pooling and persistence
                </p>
              </div>
              <div>
                <strong>📊 REST API Integration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Flowable REST API setup for process deployment and management
                </p>
              </div>
              <div>
                <strong>🎨 Modeler Integration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Flowable Modeler setup for visual BPMN 2.0 process design
                </p>
              </div>
              <div>
                <strong>📝 First Process Deployment</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  One complete BPMN process implemented and deployed (up to 8 tasks)
                </p>
              </div>
              <div>
                <strong>📚 Documentation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Setup guide, API documentation, and basic usage examples
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
              ➕ Alternative/Zusätzliche Engines
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.camunda7 ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.camunda7}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, camunda7: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🔧 Camunda 7 Instead (+€{additionalPrices.camunda7})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Use Camunda 7 engine instead of Flowable - more powerful with better tooling
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.zeebe ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.zeebe}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, zeebe: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>☁️ Zeebe/Camunda 8 Cloud-Native (+€{additionalPrices.zeebe})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Modern cloud-native engine with horizontal scaling and microservices support
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.customExtensions ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.customExtensions}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, customExtensions: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🛠️ Custom Extensions (+€{additionalPrices.customExtensions})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Custom service tasks, listeners, and delegates for your specific requirements
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.enterpriseSupport ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.enterpriseSupport}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, enterpriseSupport: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>💼 Enterprise Support (6 Months) (+€{additionalPrices.enterpriseSupport})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Priority support, monitoring setup, and performance optimization
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
                    title: 'BPMN Engine Implementation',
                    description: `BPMN Engine Implementation - ${formData.company || formData.name}`,
                    successUrl: `${window.location.origin}/payment/success`,
                    cancelUrl: window.location.href,
                    metadata: {
                      type: 'bpmn-engine-implementation',
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
                placeholder="Beschreiben Sie Ihre BPMN Engine Anforderungen..."
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
                <span style={{ fontWeight: '600', color: '#334155' }}>Basispreis (Flowable):</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#475569' }}>
                  €{projectPrice}
                </span>
              </div>
              {(additionalServices.camunda7 || additionalServices.zeebe || additionalServices.customExtensions || additionalServices.enterpriseSupport) && (
                <>
                  {additionalServices.camunda7 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Camunda 7 Engine</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.camunda7}</span>
                    </div>
                  )}
                  {additionalServices.zeebe && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Zeebe/Camunda 8</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.zeebe}</span>
                    </div>
                  )}
                  {additionalServices.customExtensions && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Custom Extensions</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.customExtensions}</span>
                    </div>
                  )}
                  {additionalServices.enterpriseSupport && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Enterprise Support</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.enterpriseSupport}</span>
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
                Professional BPMN engine setup + First process + Documentation
                {(additionalServices.camunda7 || additionalServices.zeebe || additionalServices.customExtensions || additionalServices.enterpriseSupport) && ' + selected options'}
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

      {/* What is BPMN Section */}
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          {t("bpmn_elements")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { title: 'Events', desc: t("bpmn_events"), icon: '⚡' },
            { title: 'Tasks', desc: t("bpmn_tasks"), icon: '📋' },
            { title: 'Gateways', desc: t("bpmn_gateways"), icon: '🔀' },
            { title: 'Swimlanes', desc: t("bpmn_swimlanes"), icon: '🏊' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '10px',
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                {item.title}
              </div>
              <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '2.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          {t("bpmn_benefits_title")}
        </h3>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#334155',
          margin: 0
        }}>
          {t("bpmn_benefits")}
        </p>
      </div>

      {/* Pizza Process */}
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
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            🍕 Pizza Bestellung Prozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("pizza_process_desc")}
          </p>
        </div>
        <div 
          className="bpmn-container" 
          data-diagram="/bpmn/pizza.bpmn"
          style={{
            height: '500px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            overflow: 'hidden'
          }}
        ></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0, marginBottom: '1rem' }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569', lineHeight: '1.8' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("pizza_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Bestellung entgegennehmen:</strong> {t("pizza_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Pizza zubereiten:</strong> {t("pizza_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Gateway:</strong> {t("pizza_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Pizza ausliefern:</strong> {t("pizza_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("pizza_step6")}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
