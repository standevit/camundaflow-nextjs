"use client";

import Link from "next/link";

export default function HomePage() {
  
  return (
    <div className="container">
      {/* Left Sidebar – Contact box + one image */}
      <aside className="sidebar">
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          marginBottom: '1rem'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Vereinbaren Sie jetzt einen Termin!
          </h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            Für Beratungen, ein Angebot oder eine Demo. Wir helfen Ihnen gern bei Prozessen und Automatisierung.          </p>
          <button
          onClick={() => {
            setShowAppointmentForm(true);
            // If user is logged in, skip to calendar (step 3), otherwise start at step 1
            setAppointmentStep(session?.user ? 3 : 1);
            setAppointmentData({
              name: userName || "",
              email: userEmail || "",
              company: "",
              phone: "",
            });
          }}
          style={{
            display: 'inline-block',
            padding: '0.875rem 0.875rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            textDecoration: 'none',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
          }}
        >
          📅 Termin vereinbaren
        </button>
        </div>
        <img src="/contact.avif" alt="Kontakt" style={{
          width: '100%',
          borderRadius: '12px',
          objectFit: 'cover',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
        }} />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
          {/* Hero Section */}
          <div style={{
            background: 'linear-gradient(#342ccf 0%, #b9b3ff 100%)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '16px',
            textAlign: 'center',
            marginBottom: '3rem',
            boxShadow: '0 20px 40px rgba(102,126,234,0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ 
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)', 
                padding: '0.4rem 1rem', 
                borderRadius: '20px', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                marginBottom: '1rem',
                letterSpacing: '0.5px'
              }}>
                🚀 Digitale Transformation
              </span>
              <h1 style={{ fontSize: '2.6rem', fontWeight: '800', marginBottom: '1rem', color: 'white', letterSpacing: '-0.5px' }}>
                Enterprise Workflow & AI Solutions
              </h1>
              <p style={{ fontSize: '1.15rem', opacity: '0.95', marginBottom: 0, lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                Spezialisiert auf Business Process Management, Microservices-Architekturen und KI-gestützte Automatisierung
              </p>
            </div>
          </div>

          {/* Main Services Section */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              Unsere Kernkompetenzen
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>Technologien, die Ihr Unternehmen voranbringen</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}>
            {/* AI Agents */}
            <Link href="/ai-agents" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102,126,234,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}>
                <div style={{ 
                  width: '60px', height: '60px', 
                  background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)', 
                  borderRadius: '14px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', marginBottom: '1.2rem' 
                }}>🤖</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1c2b80', marginBottom: '0.75rem' }}>
                  AI Agents
                </h3>
                <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  Intelligente KI-Agenten für Kundenservice, Dokumentenverarbeitung, Betrugserkennung und automatisierte Geschäftsprozesse
                </p>
              </div>
            </Link>

            {/* Microservices */}
            <Link href="/microservices" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102,126,234,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}>
                <div style={{ 
                  width: '60px', height: '60px', 
                  background: 'linear-gradient(135deg, #10b98120 0%, #059f6920 100%)', 
                  borderRadius: '14px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', marginBottom: '1.2rem' 
                }}>⚙️</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>
                  Microservices
                </h3>
                <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  Moderne Microservices-Architekturen mit Event-Driven Design, API Gateways, Service Mesh und Cloud-Native Patterns
                </p>
              </div>
            </Link>

            {/* Camunda BPMN */}
            <Link href="/camunda" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102,126,234,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}>
                <div style={{ 
                  width: '60px', height: '60px', 
                  background: 'linear-gradient(135deg, #f59e0b20 0%, #d9730620 100%)', 
                  borderRadius: '14px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', marginBottom: '1.2rem' 
                }}>📊</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>
                  Camunda BPMN
                </h3>
                <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  Business Process Management mit Camunda 7/8, BPMN 2.0 Modellierung, Process Automation und Workflow Orchestrierung
                </p>
              </div>
            </Link>
          </div>

          {/* Use Cases Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '0.5rem'
              }}>
                Use Cases & Implementierungen
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Praxiserprobte Lösungen für Ihre Branche</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
          {/* AI-powered Customer Service */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>💬</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              AI Customer Service
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Automatisierter Kundenservice mit ChatGPT-Integration, Sentiment-Analyse und BPMN-gesteuerten Eskalationsprozessen
            </p>
          </div>

          {/* Supply Chain Automation */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🚚</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              Supply Chain Management
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              End-to-End Lieferkettenautomatisierung mit Echtzeit-Tracking, Bestandsverwaltung und automatisierten Bestellprozessen
            </p>
          </div>

          {/* Intelligent Document Processing */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>📄</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              Document Processing
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              KI-gestützte Dokumentenverarbeitung mit OCR, automatischer Klassifizierung und Datenextraktion
            </p>
          </div>

          {/* Fraud Detection */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🛡️</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              Fraud Detection
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Echtzeit-Betrugserkennung mit Machine Learning, Anomalieerkennung und automatisierten Prüfworkflows
            </p>
          </div>

          {/* Order Management */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>📦</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              Order Processing
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Automatisierte Auftragsabwicklung von der Bestellung bis zur Auslieferung mit Zahlungsintegration und Tracking
            </p>
          </div>

          {/* Budget Management */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>💰</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              Budget Management
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Digitale Budgetverwaltung mit Genehmigungsworkflows, Kostenverfolgung und automatisierten Freigabeprozessen
            </p>
          </div>

          {/* Service Portal */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🏛️</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              Service Portal BW
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Digitales Bürgerserviceportal mit elektronischer Antragsstellung, Statusverfolgung und behördlichen Workflows
            </p>
          </div>

          {/* Human-Centric Workflows */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>👥</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              Human-Centric Workflows
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              User Task Management mit Camunda Tasklist, Formularen, Genehmigungsprozessen und SLA-Überwachung
            </p>
          </div>

          {/* Camunda 7 → 8 Migration */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🔄</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
              Camunda Migration
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Professionelle Migration von Camunda 7 zu Camunda 8 mit Modellanpassung, Code-Refactoring und Testing
            </p>
          </div>
        </div>
      </div>

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '3rem 2.5rem',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(102,126,234,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'white', marginBottom: '0.75rem' }}>
                Bereit für Ihr Projekt?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                Lassen Sie uns gemeinsam Ihre Geschäftsprozesse automatisieren und optimieren
              </p>
              <Link href="/contact">
                <button style={{
                  background: 'white',
                  color: '#667eea',
                  padding: '1rem 2.2rem',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                }}>
                  Kontakt aufnehmen →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar – single image */}
      <aside className="image-sidebar">
        <img src="/workflow2.avif" alt="Workflow 2" />
      </aside>
    </div>
  );
}
