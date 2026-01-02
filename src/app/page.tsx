"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src="/workflow.avif" 
          alt="Workflow" 
          style={{
            position: 'absolute',
            left: '-50px',
            top: '10px',
            width: '250px',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.15',
            zIndex: 0
          }}
        />
        <img 
          src="/ai-water.avif" 
          alt="AI" 
          style={{
            position: 'absolute',
            right: '-60px',
            bottom: '-30px',
            width: '280px',
            height: '280px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.15',
            zIndex: 0
          }}
        />
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'white', position: 'relative', zIndex: 1 }}>
          Enterprise Workflow & AI Solutions
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: '0.95', marginBottom: 0, lineHeight: '1.8', position: 'relative', zIndex: 1 }}>
          Spezialisiert auf Business Process Management, Microservices-Architekturen und KI-gestützte Automatisierung
        </p>
      </div>

      {/* Main Services Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
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
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea', marginBottom: '1rem' }}>
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
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea', marginBottom: '1rem' }}>
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
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea', marginBottom: '1rem' }}>
              Camunda BPMN
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
              Business Process Management mit Camunda 7/8, BPMN 2.0 Modellierung, Process Automation und Workflow Orchestrierung
            </p>
          </div>
        </Link>
      </div>

      {/* Use Cases Section */}
      <div style={{ marginBottom: '3rem', position: 'relative' }}>
        <img 
          src="/supply-chain.avif" 
          alt="Supply Chain" 
          style={{
            position: 'absolute',
            left: '-80px',
            top: '50px',
            width: '300px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.08',
            zIndex: 0
          }}
        />
        <img 
          src="/service-portal.avif" 
          alt="Service Portal" 
          style={{
            position: 'absolute',
            right: '-100px',
            top: '250px',
            width: '320px',
            height: '320px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.08',
            zIndex: 0
          }}
        />
        <img 
          src="/blockchain.avif" 
          alt="Blockchain" 
          style={{
            position: 'absolute',
            left: '50%',
            top: '500px',
            transform: 'translateX(-50%)',
            width: '280px',
            height: '280px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.08',
            zIndex: 0
          }}
        />
        <img 
          src="/budgetverwaltung.avif" 
          alt="Budget" 
          style={{
            position: 'absolute',
            left: '-60px',
            bottom: '100px',
            width: '260px',
            height: '260px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.08',
            zIndex: 0
          }}
        />
        <img 
          src="/crypto.avif" 
          alt="Crypto" 
          style={{
            position: 'absolute',
            right: '-70px',
            bottom: '50px',
            width: '290px',
            height: '290px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.08',
            zIndex: 0
          }}
        />
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          Use Cases & Implementierungen
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* AI-powered Customer Service */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💬</div>
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
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🚚</div>
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
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📄</div>
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
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🛡️</div>
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
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📦</div>
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
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💰</div>
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
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏛️</div>
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
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>👥</div>
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
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔄</div>
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
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '2.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src="/handshake.avif" 
          alt="Handshake" 
          style={{
            position: 'absolute',
            left: '-40px',
            top: '-40px',
            width: '220px',
            height: '220px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.12',
            zIndex: 0
          }}
        />
        <img 
          src="/contact.avif" 
          alt="Contact" 
          style={{
            position: 'absolute',
            right: '-50px',
            bottom: '-50px',
            width: '240px',
            height: '240px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: '0.12',
            zIndex: 0
          }}
        />
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
          Bereit für Ihr Projekt?
        </h3>
        <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
          Lassen Sie uns gemeinsam Ihre Geschäftsprozesse automatisieren und optimieren
        </p>
        <Link href="/contact">
          <button style={{
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            Kontakt aufnehmen
          </button>
        </Link>
      </div>
    </div>
  );
}
