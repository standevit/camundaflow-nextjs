"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function MigrationContent() {
  const { t, locale, getArray } = useTranslation();
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
  const [numberOfProjects, setNumberOfProjects] = useState(1);
  const pricePerProject = 600;
  const projectPrice = pricePerProject * numberOfProjects;
  
  const topics = getArray("topic_options");
  const migrationTopicUrl = topics.length > 1 ? `/contact?topic=${encodeURIComponent(topics[1])}` : "/contact";

  const content = {
    de: {
      heading: "Migration Camunda 7 → 8",
      intro: "Die Migration auf Camunda 8 (basierend auf Zeebe) ist keine direkte Drop-in-Ersetzung für Camunda 7 – es erfordert Anpassungen in Modellen, Code und Architektur.",
      steps: [
        {
          icon: "🔄",
          title: "Anpassung der BPMN-Modelle an Camunda-8-Kompatibilität",
          desc: "Ein Service Task erhält einen Task Type statt einer Java-Klasse. In Camunda 8 werden alle Service Tasks als Jobs mit einem Type (zeebe:taskDefinition type=\"...\") modelliert. Java-Klassen, Delegate Expressions oder External Task Topics aus Camunda 7 werden entfernt oder ersetzt. Tools wie der Migration Analyzer & Diagram Converter helfen bei der automatischen Anpassung."
        },
        {
          icon: "⚙️",
          title: "Ersetzung von Java Delegates und External Tasks durch Job Worker",
          desc: "Ein Java Delegate für Zahlungsprüfung wird durch einen eigenständigen Payment-Worker ersetzt. Camunda 8 unterstützt keine Java Delegates mehr (keine embedded Engine). Stattdessen externe Job Worker (in Java, Go, Node.js etc.), die Jobs eines bestimmten Types abonnieren. External Tasks aus Camunda 7 sind ähnlich, aber in Camunda 8 ist das der Standard für alle automatisierten Tasks. Option: Camunda-7-Adapter für temporäre Kompatibilität."
        },
        {
          icon: "📋",
          title: "Anpassung der bestehenden Prozesstests für Camunda 8",
          desc: "Ein Test validiert den Prozessfluss inklusive Job-Worker-Ausführung und Variablenänderung. Tests müssen angepasst werden: Nutze Camunda Process Test (CPT) für Integrationstests (mocke Job Worker, teste mit Testcontainers oder Remote-Cluster). Validiere Fluss, Variablen und Worker-Interaktionen. Alte Camunda-7-Tests (z. B. mit embedded Engine) funktionieren nicht direkt."
        },
        {
          icon: "🔐",
          title: "Berücksichtigung von Securityaspekten und Authentifizierung",
          desc: "Job Worker werden als Container mit OAuth-basierter Authentifizierung betrieben. In Camunda 8 (besonders SaaS und Self-Managed mit Identity) authentifizieren Clients/Job Worker via OAuth 2.0 (Client Credentials Flow). Zeebe Clients nutzen OAuthCredentialsProvider. In Self-Managed: Konfigurierbar via Identity/Keycloak."
        },
        {
          icon: "📊",
          title: "Umstellung der Prozessvariablen auf JSON-basierte Datenstrukturen",
          desc: "Statt eines Java-Objekts OrderEntity wird ein JSON-Objekt order mit Attributen verwendet. Variablen in Camunda 8 sind immer JSON-serialisiert (keine Java-Objekte direkt). Komplexe Daten werden als JSON-Objekte/Arrays gespeichert. Das vereinfacht Skalierbarkeit, aber erfordert Anpassung von Serialisierung und Zugriff (z. B. via FEEL-Expressions)."
        },
        {
          icon: "⚠️",
          title: "Anpassung des Fehler-, Retry- und Transaktionskonzepts",
          desc: "Technische Fehler führen zu automatischen Retries im Job Worker, fachliche Fehler zu BPMN-Error-Events. Technische Fehler: Job Worker failt den Job → automatische Retries (konfigurierbar, default 3), bei 0 Retries entsteht ein Incident. Fachliche (Business) Fehler: Throw BPMN Error (zeebe:error), gefangen mit Error Catch Events. Keine transaktionalen Java-Delegates mehr; Incidents ersetzen oft alte Fehlerbehandlung."
        },
        {
          icon: "📨",
          title: "Überarbeitung der Message- und Event-Kommunikation",
          desc: "Eine Message wird über Message Name und Correlation Key an einen wartenden Prozess zugestellt. Messages korrelieren via Message Name und Correlation Key (Expression, z. B. =orderId). Subscriptions öffnen sich bei Catch Events. Messages können gebuffert werden (TTL) und korrelieren später. Ähnlich wie in Camunda 7, aber skalierbarer."
        },
        {
          icon: "🏗️",
          title: "Infrastruktur & Deployment - SaaS vs Self-Managed",
          desc: "Camunda 8 gibt es als SaaS (fully managed) oder Self-Managed (Helm-Charts auf Kubernetes empfohlen). Self-Managed: Kubernetes (z. B. EKS, AKS), mit Elasticsearch/OpenSearch (Amazon OpenSearch supported). Docker für Dev, aber nicht Production. Skalierbar horizontal."
        },
        {
          icon: "👤",
          title: "Anpassung von User Tasks & Formularen",
          desc: "User Tasks: Neue Implementation (seit 8.6: native Zeebe User Tasks, schneller und direkter). Forms: Camunda Forms (visuell im Modeler, JSON-basiert), deployed mit Prozess. Variablen sind JSON, Input/Output-Mappings für Transformationen. Tasklist rendert Forms automatisch."
        },
        {
          icon: "✅",
          title: "Fachliche und technische Validierung der migrierten Prozesse",
          desc: "Vergleich von Prozessdurchläufen in Camunda 7 und Camunda 8 anhand identischer Testfälle. Essentiell: Parallele Runs (Side-by-Side), identische Testfälle vergleichen (z. B. via CPT oder manuell). Tools wie Data Migrator für laufende Instanzen (eingeschränkt). Validiere fachlich (Fluss, Entscheidungen) und technisch (Performance, Incidents)."
        }
      ]
    },
    en: {
      heading: "Migration Camunda 7 → 8",
      intro: "Migration to Camunda 8 (based on Zeebe) is not a direct drop-in replacement for Camunda 7 – it requires adjustments in models, code, and architecture.",
      steps: [
        {
          icon: "🔄",
          title: "Adapting BPMN Models for Camunda 8 Compatibility",
          desc: "A Service Task receives a Task Type instead of a Java class. In Camunda 8, all Service Tasks are modeled as jobs with a Type (zeebe:taskDefinition type=\"...\"). Java classes, Delegate Expressions, or External Task Topics from Camunda 7 are removed or replaced. Tools like the Migration Analyzer & Diagram Converter help with automatic adaptation."
        },
        {
          icon: "⚙️",
          title: "Replacing Java Delegates and External Tasks with Job Workers",
          desc: "A Java Delegate for payment verification is replaced by a standalone Payment Worker. Camunda 8 no longer supports Java Delegates (no embedded engine). Instead, external Job Workers (in Java, Go, Node.js, etc.) subscribe to jobs of a specific type. External Tasks from Camunda 7 are similar, but in Camunda 8 this is the standard for all automated tasks. Option: Camunda 7 Adapter for temporary compatibility."
        },
        {
          icon: "📋",
          title: "Adapting Existing Process Tests for Camunda 8",
          desc: "A test validates the process flow including Job Worker execution and variable changes. Tests must be adapted: Use Camunda Process Test (CPT) for integration tests (mock Job Workers, test with Testcontainers or remote cluster). Validate flow, variables, and worker interactions. Old Camunda 7 tests (e.g., with embedded engine) don't work directly."
        },
        {
          icon: "🔐",
          title: "Considering Security Aspects and Authentication",
          desc: "Job Workers are operated as containers with OAuth-based authentication. In Camunda 8 (especially SaaS and Self-Managed with Identity), clients/Job Workers authenticate via OAuth 2.0 (Client Credentials Flow). Zeebe Clients use OAuthCredentialsProvider. In Self-Managed: Configurable via Identity/Keycloak."
        },
        {
          icon: "📊",
          title: "Converting Process Variables to JSON-based Data Structures",
          desc: "Instead of a Java object OrderEntity, a JSON object order with attributes is used. Variables in Camunda 8 are always JSON-serialized (no Java objects directly). Complex data is stored as JSON objects/arrays. This simplifies scalability but requires adaptation of serialization and access (e.g., via FEEL expressions)."
        },
        {
          icon: "⚠️",
          title: "Adapting Error, Retry, and Transaction Concepts",
          desc: "Technical errors lead to automatic retries in the Job Worker, business errors to BPMN Error Events. Technical errors: Job Worker fails the job → automatic retries (configurable, default 3), at 0 retries an incident is created. Business errors: Throw BPMN Error (zeebe:error), caught with Error Catch Events. No transactional Java Delegates anymore; incidents often replace old error handling."
        },
        {
          icon: "📨",
          title: "Revising Message and Event Communication",
          desc: "A message is delivered to a waiting process via Message Name and Correlation Key. Messages correlate via Message Name and Correlation Key (expression, e.g., =orderId). Subscriptions open at Catch Events. Messages can be buffered (TTL) and correlate later. Similar to Camunda 7, but more scalable."
        },
        {
          icon: "🏗️",
          title: "Infrastructure & Deployment - SaaS vs Self-Managed",
          desc: "Camunda 8 is available as SaaS (fully managed) or Self-Managed (Helm Charts on Kubernetes recommended). Self-Managed: Kubernetes (e.g., EKS, AKS), with Elasticsearch/OpenSearch (Amazon OpenSearch supported). Docker for Dev, but not Production. Horizontally scalable."
        },
        {
          icon: "👤",
          title: "Adapting User Tasks & Forms",
          desc: "User Tasks: New implementation (since 8.6: native Zeebe User Tasks, faster and more direct). Forms: Camunda Forms (visual in Modeler, JSON-based), deployed with process. Variables are JSON, Input/Output mappings for transformations. Tasklist renders forms automatically."
        },
        {
          icon: "✅",
          title: "Business and Technical Validation of Migrated Processes",
          desc: "Comparison of process runs in Camunda 7 and Camunda 8 based on identical test cases. Essential: Parallel runs (side-by-side), compare identical test cases (e.g., via CPT or manually). Tools like Data Migrator for running instances (limited). Validate functionally (flow, decisions) and technically (performance, incidents)."
        }
      ]
    }
  };

  const currentContent = content[locale as 'de' | 'en'] || content.de;

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
          {currentContent.heading}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0',
          paddingRight: '160px'
        }}>
          {currentContent.intro}
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
            Camunda 7 → 8 Migration - Projekt anfragen
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
            💰 <strong>Projektpreis:</strong> €{pricePerProject} pro Prozess | 💵 <strong>Gesamt:</strong> €{projectPrice}
          </div>

          {/* Number of Projects Slider */}
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '1rem', color: '#333', fontSize: '1rem' }}>
              📊 Anzahl der zu migrierenden Prozesse: <span style={{ color: '#667eea', fontSize: '1.2rem' }}>{numberOfProjects}</span>
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={numberOfProjects}
              onChange={(e) => setNumberOfProjects(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                outline: 'none',
                background: `linear-gradient(to right, #667eea 0%, #667eea ${(numberOfProjects - 1) / 99 * 100}%, #e0e0e0 ${(numberOfProjects - 1) / 99 * 100}%, #e0e0e0 100%)`,
                WebkitAppearance: 'none',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              <span>1 Prozess</span>
              <span>100 Prozesse</span>
            </div>
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
                <strong>🔄 BPMN Model Migration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Automatische und manuelle Anpassung Ihrer Camunda 7 BPMN-Modelle für Camunda 8 Kompatibilität.
                </p>
              </div>
              <div>
                <strong>⚙️ Code Migration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Ersetzung von Java Delegates durch Job Workers, Anpassung von External Tasks und Service Tasks.
                </p>
              </div>
              <div>
                <strong>📋 Test Migration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Umstellung Ihrer bestehenden Prozesstests auf Camunda Process Test (CPT) Framework.
                </p>
              </div>
              <div>
                <strong>🏗️ Architecture Consulting</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Beratung zu SaaS vs. Self-Managed, Kubernetes Setup, Skalierung und Best Practices.
                </p>
              </div>
              <div>
                <strong>✅ Validierung & Testing</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Side-by-Side Testing, Performance-Vergleich und fachliche Validierung der migrierten Prozesse.
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
                placeholder="Beschreiben Sie Ihr aktuelles Camunda 7 Setup, Anzahl der Prozesse, spezielle Anforderungen..."
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
                        amount: projectPrice,
                        projectRequest: {
                          projectName: `Camunda 7 → 8 Migration (${numberOfProjects} ${numberOfProjects === 1 ? 'Prozess' : 'Prozesse'})`,
                          projectType: 'Migration & Consulting',
                          description: `Anzahl Prozesse: ${numberOfProjects}. Teilnehmer: ${formData.name || userName}, Email: ${formData.email || userEmail}${formData.company ? `, Firma: ${formData.company}` : ''}${formData.phone ? `, Tel: ${formData.phone}` : ''}. ${formData.message || ''}`,
                          userEmail: formData.email || userEmail,
                        },
                      }),
                    });
                    
                    if (response.ok) {
                      const data = await response.json();
                      window.location.href = data.hostedUrl;
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

      {/* Migration Steps Grid */}
      <div style={{
        display: 'grid',
        gap: '2rem'
      }}>
        {currentContent.steps.map((step, index) => (
          <div key={index} style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.5rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0
              }}>
                {step.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: '#0f172a', 
                  marginBottom: '1rem',
                  lineHeight: '1.4'
                }}>
                  {step.title}
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#475569', 
                  lineHeight: '1.8',
                  margin: 0
                }}>
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
