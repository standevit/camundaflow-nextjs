"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AppointmentForm from "@/components/AppointmentForm";
import CostConfigurator from "@/components/CostConfigurator";

export default function HomePage() {
  const { data: session } = useSession();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showCostConfigurator, setShowCostConfigurator] = useState(false);
  const costConfiguratorRef = useRef<HTMLDivElement>(null);
  
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  
  // Scroll to CostConfigurator when it opens
  const handleOpenCostConfigurator = () => {
    setShowCostConfigurator(true);
  };
  
  // Scroll effect when showCostConfigurator changes
  useEffect(() => {
    if (showCostConfigurator && costConfiguratorRef.current) {
      setTimeout(() => {
        costConfiguratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [showCostConfigurator]);
  
  return (
    <div className="home-cerulean-theme">
      <div className="container">
      {/* Left Sidebar – Contact box + one image */}
      <aside className="sidebar">
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 48, 63, 0.08)',
          border: '1px solid rgba(122, 157, 150, 0.2)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#00303F', marginBottom: '0.75rem' }}>
            Vereinbaren Sie jetzt einen Termin!
          </h3>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            Für Beratungen, ein Angebot oder eine Demo. Wir helfen Ihnen gern bei Prozessen und Automatisierung.
          </p>
          <button
            onClick={() => setShowAppointmentForm(true)}
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.25rem',
              background: 'linear-gradient(135deg, #DCAE1D 0%, #c49a18 100%)',
              color: '#00303F',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(220, 174, 29, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 174, 29, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(220, 174, 29, 0.3)';
            }}
          >
            📅 Termin vereinbaren
          </button>
        </div>
        <img src="/contact.avif" alt="Kontakt" style={{
          width: '100%',
          borderRadius: '16px',
          objectFit: 'cover',
          boxShadow: '0 8px 32px rgba(0, 48, 63, 0.1)'
        }} />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
          {/* Hero Section - Modern Glassmorphism */}
          <div style={{
            background: 'linear-gradient(135deg, #016685ff 0%, #004d5a 50%, #006670 100%)',
            color: 'white',
            padding: '1.5rem 2rem',
            borderRadius: '24px',
            textAlign: 'center',
            marginBottom: '2rem',
            boxShadow: '0 25px 50px rgba(0, 48, 63, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle gradient overlay for depth */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at top right, rgba(202, 228, 219, 0.15) 0%, transparent 60%)',
              pointerEvents: 'none'
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ 
                display: 'inline-block',
                background: 'rgba(220, 174, 29, 0.2)',
                backdropFilter: 'blur(8px)',
                padding: '0.5rem 1.25rem', 
                borderRadius: '50px', 
                fontSize: '0.85rem', 
                fontWeight: 500,
                marginBottom: '1rem',
                letterSpacing: '0.5px',
                border: '1px solid rgba(220, 174, 29, 0.3)',
                color: '#DCAE1D'
              }}>
                ✨ Digitale Transformation 2026
              </span>
              <h1 style={{ 
                fontSize: '2.25rem', 
                fontWeight: '700', 
                marginBottom: '0.75rem', 
                color: 'white', 
                letterSpacing: '-0.5px',
                lineHeight: '1.2'
              }}>
                Enterprise Workflow & AI Solutions
              </h1>
              <p style={{ 
                fontSize: '1.1rem', 
                opacity: '0.9', 
                marginBottom: 0, 
                lineHeight: '1.7', 
                maxWidth: '600px', 
                margin: '0 auto',
                color: '#4daab3ff'
              }}>
                Spezialisiert auf Business Process Management, Microservices-Architekturen und KI-gestützte Automatisierung
              </p>
            </div>
          </div>

          

          {/* Appointment Form Modal */}
          <AppointmentForm
            isOpen={showAppointmentForm}
            onClose={() => setShowAppointmentForm(false)}
            userName={userName}
            userEmail={userEmail}
          />

          <button
          onClick={handleOpenCostConfigurator}
          style={{
            display: 'block',
            margin: '0 auto 1rem auto',
            padding: '1rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #DCAE1D 0%, #c49a18 100%)',
            border: 'none',
            color: '#00303F',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '700',
            letterSpacing: '0.3px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(220, 174, 29, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(220, 174, 29, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(220, 174, 29, 0.3)';
          }}
        >
          🚀 AI Project Planner starten
        </button>
        {/* Cost Configurator Modal */}
          <div ref={costConfiguratorRef}>
            <CostConfigurator
              isOpen={showCostConfigurator}
              onClose={() => setShowCostConfigurator(false)}
            />
          </div>


          
          {/* Main Services Section */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700', 
              color: '#CAE4DB', 
              marginBottom: '0.75rem',
              letterSpacing: '-0.3px'
            }}>
              Unsere Expertise
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
              Technologien, die Ihr Unternehmen voranbringen
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            {/* AI Agents */}
            <Link href="/ai-agents" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '1.75rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 48, 63, 0.08)',
                border: '1px solid rgba(122, 157, 150, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 48, 63, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 48, 63, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
              }}>
                <div style={{ 
                  width: '52px', height: '52px', 
                  background: 'linear-gradient(135deg, rgba(0,48,63,0.08) 0%, rgba(122,157,150,0.15) 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.75rem', marginBottom: '1rem' 
                }}>🤖</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
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
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '1.75rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 48, 63, 0.08)',
                border: '1px solid rgba(122, 157, 150, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 48, 63, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 48, 63, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
              }}>
                <div style={{ 
                  width: '52px', height: '52px', 
                  background: 'linear-gradient(135deg, rgba(0,48,63,0.08) 0%, rgba(122,157,150,0.15) 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.75rem', marginBottom: '1rem' 
                }}>⚙️</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
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
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '1.75rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 48, 63, 0.08)',
                border: '1px solid rgba(122, 157, 150, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 48, 63, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 48, 63, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
              }}>
                <div style={{ 
                  width: '52px', height: '52px', 
                  background: 'linear-gradient(135deg, rgba(0,48,63,0.08) 0%, rgba(122,157,150,0.15) 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.75rem', marginBottom: '1rem' 
                }}>📊</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#00303F', marginBottom: '0.75rem' }}>
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
                color: '#DCAE1D',
                marginBottom: '0.5rem'
              }}>
                Use Cases & Implementierungen
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem' }}>Praxiserprobte Lösungen für Ihre Branche</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
          {/* AI-powered Customer Service */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>💬</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              AI Customer Service
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Automatisierter Kundenservice mit ChatGPT-Integration, Sentiment-Analyse und BPMN-gesteuerten Eskalationsprozessen
            </p>
          </div>

          {/* Supply Chain Automation */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🚚</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              Supply Chain Management
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              End-to-End Lieferkettenautomatisierung mit Echtzeit-Tracking, Bestandsverwaltung und automatisierten Bestellprozessen
            </p>
          </div>

          {/* Intelligent Document Processing */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>📄</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              Document Processing
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              KI-gestützte Dokumentenverarbeitung mit OCR, automatischer Klassifizierung und Datenextraktion
            </p>
          </div>

          {/* Fraud Detection */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🛡️</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              Fraud Detection
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Echtzeit-Betrugserkennung mit Machine Learning, Anomalieerkennung und automatisierten Prüfworkflows
            </p>
          </div>

          {/* Order Management */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>📦</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              Order Processing
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Automatisierte Auftragsabwicklung von der Bestellung bis zur Auslieferung mit Zahlungsintegration und Tracking
            </p>
          </div>

          {/* Budget Management */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>💰</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              Budget Management
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Digitale Budgetverwaltung mit Genehmigungsworkflows, Kostenverfolgung und automatisierten Freigabeprozessen
            </p>
          </div>

          {/* Service Portal */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🏛️</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              Service Portal BW
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Digitales Bürgerserviceportal mit elektronischer Antragsstellung, Statusverfolgung und behördlichen Workflows
            </p>
          </div>

          {/* Human-Centric Workflows */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>👥</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              Human-Centric Workflows
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              User Task Management mit Camunda Tasklist, Formularen, Genehmigungsprozessen und SLA-Überwachung
            </p>
          </div>

          {/* Camunda 7 → 8 Migration */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 48, 63, 0.06)',
            border: '1px solid rgba(122, 157, 150, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 48, 63, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(0, 48, 63, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 48, 63, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(122, 157, 150, 0.2)';
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🔄</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00303F', marginBottom: '0.5rem' }}>
              Camunda Migration
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Professionelle Migration von Camunda 7 zu Camunda 8 mit Modellanpassung, Code-Refactoring und Testing
            </p>
          </div>
        </div>
      </div>

          {/* CTA Section - Modern Glassmorphism */}
          <div style={{
            background: 'linear-gradient(135deg, #00303F 0%, #004d5a 100%)',
            padding: '3.5rem 2.5rem',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0, 48, 63, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at bottom left, rgba(255,255,255,0.1) 0%, transparent 60%)',
              pointerEvents: 'none'
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
                Bereit für Ihr Projekt?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 2rem' }}>
                Lassen Sie uns gemeinsam Ihre Geschäftsprozesse automatisieren und optimieren
              </p>
              
                <button
          onClick={handleOpenCostConfigurator}
          style={{
            padding: '1rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #DCAE1D 0%, #c49a18 100%)',
            border: 'none',
            color: '#00303F',
            textDecoration: 'none',
            borderRadius: '12px',  
            fontSize: '1rem',
            fontWeight: '600',
            letterSpacing: '0.3px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(220, 174, 29, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(220, 174, 29, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(220, 174, 29, 0.3)';
          }}
        >
          🚀 AI Project Planner starten
        </button>
             
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar – single image */}
      <aside className="image-sidebar">
        <img src="/workflow2.avif" alt="Workflow 2" />
        
      </aside>
    </div>
  </div>
  );
}
