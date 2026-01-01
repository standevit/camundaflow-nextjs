"use client";

export default function IntelligenterRezeptionistContent() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          width: '64px',
          height: '64px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: '700',
          color: 'white',
          flexShrink: 0
        }}>
          1
        </div>
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            margin: '0 0 0.5rem 0',
            color: 'white'
          }}>
            Intelligenter Rezeptionist
          </h2>
          <p style={{
            margin: 0,
            fontSize: '1.1rem',
            opacity: 0.95,
            color: 'white'
          }}>
            KI-gestützte Patientenbetreuung rund um die Uhr
          </p>
        </div>
      </div>

      {/* Was können Sie erwarten */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea'
        }}>
          Was können Sie erwarten?
        </h3>
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          borderLeft: '4px solid #667eea'
        }}>
          <p style={{ margin: '0 0 1rem 0', color: '#334155', lineHeight: '1.8' }}>
            Ein intelligenter AI-Rezeptionist revolutioniert Ihre Patientenbetreuung durch 24/7-Verfügbarkeit. 
            Das System beantwortet automatisch Patientenanfragen, vereinbart Termine, bearbeitet Stornierungen 
            und gibt Auskunft über Praxisöffnungszeiten, Leistungen und Standorte.
          </p>
          <p style={{ margin: 0, color: '#334155', lineHeight: '1.8' }}>
            Der AI-Agent kann mehrere Sprachen sprechen, Versicherungsinformationen prüfen, 
            Formulare vorausfüllen und dringende Fälle priorisieren – alles in natürlicher Sprache 
            via Chat, Telefon oder E-Mail.
          </p>
        </div>
      </div>

      {/* Implementierung */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea'
        }}>
          Wie wird es implementiert?
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            {
              phase: 'Phase 1: Analyse & Design (Woche 1-2)',
              details: 'Erfassung Ihrer Praxisabläufe, Definition von Anwendungsfällen, Design der Gesprächsflüsse'
            },
            {
              phase: 'Phase 2: Integration (Woche 3-4)',
              details: 'Anbindung an Ihr Praxisverwaltungssystem, E-Mail, Telefon und Website-Integration'
            },
            {
              phase: 'Phase 3: Training (Woche 5-6)',
              details: 'Schulung des AI-Modells mit praxisspezifischen Daten, FAQs und Prozessen'
            },
            {
              phase: 'Phase 4: Testing & Go-Live (Woche 7-8)',
              details: 'Umfangreiche Tests, Mitarbeiterschulung, schrittweise Einführung mit Monitoring'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1.25rem',
              borderRadius: '8px',
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                {item.phase}
              </div>
              <div style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {item.details}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technische Anforderungen */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea'
        }}>
          Was wird benötigt?
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { title: 'Technisch', items: ['Zugang zu Ihrem PVS', 'Telefon-API (optional)', 'Website-Integration', 'Datenschutz-konforme Cloud'] },
            { title: 'Organisatorisch', items: ['Schulung: 2-3 Stunden', 'Testphase: 2 Wochen', 'Prozessdokumentation', 'Change Management'] },
            { title: 'Ressourcen', items: ['Projektleiter (10h)', 'IT-Admin (5h)', 'Praxispersonal (3h)', 'Fortlaufendes Monitoring'] }
          ].map((col, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontWeight: '700', color: '#667eea', marginBottom: '1rem', fontSize: '1.1rem' }}>
                {col.title}
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', lineHeight: '1.8' }}>
                {col.items.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Zeitrahmen & Kosten */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea'
        }}>
          Zeitrahmen & Kosten
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem', color: 'white' }}>
              Implementierungsdauer
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>
              6-8 Wochen
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, color: 'white' }}>
              Von Konzept bis Go-Live
            </div>
          </div>
          <div style={{
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #667eea',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#667eea', marginBottom: '0.5rem', fontWeight: '600' }}>
              Einmalige Kosten
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              €8.000 - €15.000
            </div>
            <div style={{ fontSize: '0.9rem', color: '#475569' }}>
              Setup, Integration, Training
            </div>
          </div>
          <div style={{
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #667eea',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#667eea', marginBottom: '0.5rem', fontWeight: '600' }}>
              Monatliche Kosten
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              €300 - €800
            </div>
            <div style={{ fontSize: '0.9rem', color: '#475569' }}>
              Hosting, AI-API, Support, Updates
            </div>
          </div>
        </div>
      </div>

      {/* Effekt auf die Praxis */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea'
        }}>
          Effekt auf Ihre Praxis
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          {[
            { metric: '80%', label: 'Weniger Telefonanrufe', icon: '📞' },
            { metric: '40%', label: 'Zeitersparnis Personal', icon: '⏱️' },
            { metric: '24/7', label: 'Verfügbarkeit', icon: '🌍' },
            { metric: '95%', label: 'Patientenzufriedenheit', icon: '😊' },
            { metric: '30%', label: 'Mehr Termine', icon: '📅' },
            { metric: '€2.000+', label: 'Monatliche Einsparung', icon: '💰' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              border: '2px solid #e2e8f0',
              padding: '1.5rem',
              borderRadius: '10px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                {item.icon}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#667eea', marginBottom: '0.5rem' }}>
                {item.metric}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.4' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* ROI Box */}
        <div style={{
          padding: '1.75rem',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          border: '2px solid #86efac',
          borderRadius: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '2rem' }}>💡</div>
            <h4 style={{
              margin: 0,
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#166534'
            }}>
              ROI-Berechnung
            </h4>
          </div>
          <p style={{
            margin: 0,
            color: '#166534',
            lineHeight: '1.8',
            fontSize: '1.05rem'
          }}>
            Bei durchschnittlichen Einsparungen von <strong>€2.000-3.000 pro Monat</strong> amortisiert sich 
            die Investition bereits nach <strong>4-6 Monaten</strong>. Danach profitieren Sie von dauerhaft 
            reduzierten Personalkosten, höherer Effizienz und verbesserter Patientenerfahrung.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: '0 0 1rem 0',
          color: 'white'
        }}>
          Bereit für Ihren intelligenten Rezeptionisten?
        </h3>
        <p style={{
          margin: '0 0 1.5rem 0',
          fontSize: '1.1rem',
          opacity: 0.95,
          color: 'white'
        }}>
          Kontaktieren Sie uns für eine kostenlose Beratung und Demo
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a href="/contact" style={{
            background: 'white',
            color: '#667eea',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.05rem',
            display: 'inline-block',
            transition: 'transform 0.2s'
          }}>
            Beratungstermin vereinbaren
          </a>
          <a href="/contact" style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.05rem',
            display: 'inline-block',
            border: '2px solid white',
            transition: 'transform 0.2s'
          }}>
            Demo anfragen
          </a>
        </div>
      </div>
    </div>
  );
}
