"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function IntelligenterRezeptionistContent() {
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

  // Appointment booking states
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentStep, setAppointmentStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isCodeSending, setIsCodeSending] = useState(false);

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const projectPrice = 8500;
  const [includeExtras, setIncludeExtras] = useState({
    voiceIntegration: false,
    multiLanguage: false,
    analytics: false,
    pvsIntegration: false,
    emailIntegration: false,
    reminderSystem: false,
  });

  const extraPrices = {
    voiceIntegration: 3000,
    multiLanguage: 1500,
    analytics: 1200,
    pvsIntegration: 2500,
    emailIntegration: 800,
    reminderSystem: 1000,
  };

  const totalPrice = projectPrice + 
    (includeExtras.voiceIntegration ? extraPrices.voiceIntegration : 0) +
    (includeExtras.multiLanguage ? extraPrices.multiLanguage : 0) +
    (includeExtras.analytics ? extraPrices.analytics : 0) +
    (includeExtras.pvsIntegration ? extraPrices.pvsIntegration : 0) +
    (includeExtras.emailIntegration ? extraPrices.emailIntegration : 0) +
    (includeExtras.reminderSystem ? extraPrices.reminderSystem : 0);

  // Send verification code
  const sendVerificationCode = async () => {
    setIsCodeSending(true);
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(code);
      
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appointmentData.name,
          email: appointmentData.email,
          message: `Ihr Verifizierungscode für Beratungstermin: ${code}`,
          subject: 'Beratungstermin - Verifizierungscode'
        }),
      });
      
      alert(`Verifizierungscode wurde an ${appointmentData.email} gesendet!`);
      setAppointmentStep(2);
    } catch (error) {
      console.error('Error sending code:', error);
      alert('Fehler beim Senden des Codes. Bitte versuchen Sie es erneut.');
    } finally {
      setIsCodeSending(false);
    }
  };

  // Verify code and move to calendar
  const verifyCode = () => {
    if (verificationCode === sentCode) {
      setAppointmentStep(3);
    } else {
      alert('Ungültiger Code. Bitte versuchen Sie es erneut.');
    }
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  // Generate next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

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
          <button
            onClick={() => {
              setShowAppointmentForm(true);
              setAppointmentStep(session?.user ? 3 : 1);
              setAppointmentData({
                name: userName || "",
                email: userEmail || "",
                company: "",
                phone: "",
              });
            }}
            style={{
              background: 'white',
              color: '#667eea',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              fontSize: '1.05rem',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            Beratungstermin vereinbaren
          </button>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: '2px solid white',
              fontWeight: '600',
              fontSize: '1.05rem',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            Projekt anfragen
          </button>
        </div>
      </div>

      {/* Appointment Booking Form */}
      {showAppointmentForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          marginTop: '2rem',
          border: '2px solid #10b981',
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
            📅 Beratungstermin vereinbaren
          </h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            {appointmentStep === 1 && "Schritt 1 von 3: Ihre Kontaktdaten"}
            {appointmentStep === 2 && "Schritt 2 von 3: E-Mail Verifizierung"}
            {appointmentStep === 3 && (session?.user ? "Datum und Uhrzeit wählen" : "Schritt 3 von 3: Datum und Uhrzeit wählen")}
          </p>

          {/* Step 1: Basic Information */}
          {appointmentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={appointmentData.name}
                  onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })}
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
                  value={appointmentData.email}
                  onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
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
                  Praxis/Klinik
                </label>
                <input
                  type="text"
                  value={appointmentData.company}
                  onChange={(e) => setAppointmentData({ ...appointmentData, company: e.target.value })}
                  placeholder="Name Ihrer Praxis (optional)"
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
                  Telefon *
                </label>
                <input
                  type="tel"
                  value={appointmentData.phone}
                  onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })}
                  placeholder="+49"
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

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => setShowAppointmentForm(false)}
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
                  onClick={sendVerificationCode}
                  disabled={!appointmentData.name || !appointmentData.email || !appointmentData.phone || isCodeSending}
                  style={{
                    flex: 2,
                    padding: '0.875rem',
                    background: (!appointmentData.name || !appointmentData.email || !appointmentData.phone || isCodeSending)
                      ? '#cccccc'
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: (!appointmentData.name || !appointmentData.email || !appointmentData.phone || isCodeSending)
                      ? 'not-allowed'
                      : 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    opacity: (!appointmentData.name || !appointmentData.email || !appointmentData.phone || isCodeSending) ? 0.6 : 1,
                  }}
                >
                  {isCodeSending ? 'Sende Code...' : 'Code anfordern'}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Email Verification */}
          {appointmentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                backgroundColor: '#e6f7ff',
                padding: '1.25rem',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}>
                <p style={{ margin: 0, color: '#0066cc' }}>
                  📧 Wir haben einen 6-stelligen Verifizierungscode an <strong>{appointmentData.email}</strong> gesendet.
                  Bitte geben Sie den Code ein, um fortzufahren.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                  Verifizierungscode *
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1.5rem',
                    letterSpacing: '0.5rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => setAppointmentStep(1)}
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
                  Zurück
                </button>
                <button
                  onClick={verifyCode}
                  disabled={verificationCode.length !== 6}
                  style={{
                    flex: 2,
                    padding: '0.875rem',
                    background: verificationCode.length !== 6
                      ? '#cccccc'
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: verificationCode.length !== 6 ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    opacity: verificationCode.length !== 6 ? 0.6 : 1,
                  }}
                >
                  Code bestätigen
                </button>
              </div>

              <button
                onClick={sendVerificationCode}
                disabled={isCodeSending}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'transparent',
                  color: '#10b981',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  cursor: isCodeSending ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >
                {isCodeSending ? 'Sende...' : 'Code erneut senden'}
              </button>
            </div>
          )}

          {/* Step 3: Calendar */}
          {appointmentStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '1.25rem',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}>
                <p style={{ margin: 0, color: '#059669' }}>
                  {session?.user 
                    ? '✅ Sie sind angemeldet! Wählen Sie jetzt Ihren gewünschten Beratungstermin.' 
                    : '✅ E-Mail erfolgreich verifiziert! Wählen Sie jetzt Ihren gewünschten Beratungstermin.'}
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                  Datum auswählen *
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Bitte wählen Sie ein Datum</option>
                  {generateAvailableDates().map((date) => {
                    const dateObj = new Date(date);
                    const formatted = dateObj.toLocaleDateString('de-DE', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    });
                    return (
                      <option key={date} value={date}>
                        {formatted}
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedDate && (
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                    Uhrzeit auswählen *
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                    gap: '0.75rem',
                  }}>
                    {generateTimeSlots().map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        style={{
                          padding: '0.75rem',
                          background: selectedTime === time
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : 'white',
                          color: selectedTime === time ? 'white' : '#333',
                          border: selectedTime === time ? 'none' : '2px solid #e0e0e0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s',
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDate && selectedTime && (
                <div style={{
                  backgroundColor: '#e6f7ff',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  marginTop: '1rem',
                }}>
                  <p style={{ margin: 0, fontWeight: '600', color: '#0066cc' }}>
                    📅 Ihr gewählter Beratungstermin:
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
                    {new Date(selectedDate).toLocaleDateString('de-DE', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} um {selectedTime} Uhr
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => session?.user ? setShowAppointmentForm(false) : setAppointmentStep(2)}
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
                  {session?.user ? 'Abbrechen' : 'Zurück'}
                </button>
                <button
                  onClick={async () => {
                    try {
                      await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: appointmentData.name || userName,
                          email: appointmentData.email || userEmail,
                          company: appointmentData.company,
                          phone: appointmentData.phone,
                          message: `Beratungstermin - Intelligenter Rezeptionist:\nDatum: ${new Date(selectedDate).toLocaleDateString('de-DE', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}\nUhrzeit: ${selectedTime} Uhr`,
                          subject: 'Neue Beratungstermin-Buchung - Intelligenter Rezeptionist'
                        }),
                      });
                      
                      alert('✅ Beratungstermin erfolgreich gebucht! Sie erhalten eine Bestätigung per E-Mail.');
                      setShowAppointmentForm(false);
                      setAppointmentStep(1);
                      setSelectedDate('');
                      setSelectedTime('');
                      setVerificationCode('');
                    } catch (error) {
                      console.error('Error booking appointment:', error);
                      alert('Fehler beim Buchen des Termins. Bitte versuchen Sie es erneut.');
                    }
                  }}
                  disabled={!selectedDate || !selectedTime}
                  style={{
                    flex: 2,
                    padding: '0.875rem',
                    background: (!selectedDate || !selectedTime)
                      ? '#cccccc'
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: (!selectedDate || !selectedTime) ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    opacity: (!selectedDate || !selectedTime) ? 0.6 : 1,
                  }}
                >
                  Termin bestätigen
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Project Request Form */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          marginTop: '2rem',
          border: '2px solid #667eea',
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#333' }}>
            Intelligenter Rezeptionist - Projekt anfragen
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
              📋 Was Sie erhalten (Basis-Paket)
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem", color: "#333" }}>
              <div>
                <strong>🤖 AI-Rezeptionist System</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  24/7 verfügbarer intelligenter Assistent für Patientenanfragen, Terminvereinbarungen und Informationen.
                </p>
              </div>
              <div>
                <strong>📅 Terminmanagement</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Automatische Terminbuchung, -änderung und -stornierung mit Kalender-Integration.
                </p>
              </div>
              <div>
                <strong>💬 Chat-Integration (Website)</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Nahtlose Integration in Ihre Website mit modernem Chat-Widget.
                </p>
              </div>
              <div>
                <strong>📚 Wissensdatenbank</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Training mit Ihren FAQs, Leistungen, Öffnungszeiten und Praxis-Informationen.
                </p>
              </div>
              <div>
                <strong>🔒 DSGVO-konform</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Datenschutz-konforme Implementierung mit deutscher Cloud-Infrastruktur.
                </p>
              </div>
              <div>
                <strong>🔧 Schulung & 3 Monate Support</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Umfassende Schulung Ihres Teams und technischer Support für 3 Monate inklusive.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#059669", marginBottom: "1rem" }}>
              ➕ Zusätzliche Features (optional)
            </h4>
            
            {/* Voice Integration */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.voiceIntegration ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, voiceIntegration: !includeExtras.voiceIntegration})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.voiceIntegration}
                  onChange={(e) => setIncludeExtras({...includeExtras, voiceIntegration: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    📞 Telefon-Integration (Voice AI)
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Voice AI für Telefonanrufe - Patienten können direkt mit dem AI-Rezeptionisten telefonieren. Inklusive Telefonnummer und Spracherkennung.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.voiceIntegration}
                  </p>
                </div>
              </div>
            </div>

            {/* PVS Integration */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.pvsIntegration ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, pvsIntegration: !includeExtras.pvsIntegration})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.pvsIntegration}
                  onChange={(e) => setIncludeExtras({...includeExtras, pvsIntegration: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    🏥 Praxisverwaltungssystem (PVS) Integration
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Direkte Anbindung an Ihr PVS (z.B. Turbomed, Medifox, CGM) für automatische Terminbuchung und Patientendaten-Synchronisation.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.pvsIntegration}
                  </p>
                </div>
              </div>
            </div>

            {/* Multi-Language */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.multiLanguage ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, multiLanguage: !includeExtras.multiLanguage})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.multiLanguage}
                  onChange={(e) => setIncludeExtras({...includeExtras, multiLanguage: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    🌍 Mehrsprachiger Support (5+ Sprachen)
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Kommunikation in Deutsch, Englisch, Türkisch, Arabisch, Polnisch und weiteren Sprachen für internationale Patienten.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.multiLanguage}
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.analytics ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, analytics: !includeExtras.analytics})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.analytics}
                  onChange={(e) => setIncludeExtras({...includeExtras, analytics: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    📊 Analytics & Reporting Dashboard
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Detaillierte Statistiken über Anfragen, Response-Zeiten, häufigste Fragen, Terminauslastung und KI-gestützte Optimierungsvorschläge.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.analytics}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Integration */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.emailIntegration ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, emailIntegration: !includeExtras.emailIntegration})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.emailIntegration}
                  onChange={(e) => setIncludeExtras({...includeExtras, emailIntegration: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    📧 E-Mail Automatisierung
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    AI-gestützte E-Mail-Beantwortung - automatische Antworten auf Patientenanfragen per E-Mail mit intelligenter Kategorisierung.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.emailIntegration}
                  </p>
                </div>
              </div>
            </div>

            {/* Reminder System */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.reminderSystem ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, reminderSystem: !includeExtras.reminderSystem})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.reminderSystem}
                  onChange={(e) => setIncludeExtras({...includeExtras, reminderSystem: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    ⏰ Automatisches Erinnerungs-System
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Automatische Terminerinnerungen per SMS/E-Mail, No-Show-Reduktion und Follow-up-Nachrichten nach Behandlungen.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.reminderSystem}
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
                Praxis/Klinik
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Name Ihrer Praxis (optional)"
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
                placeholder="Beschreiben Sie Ihre Anforderungen und spezielle Wünsche..."
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
                        title: 'Intelligenter Rezeptionist - AI Implementation',
                        description: `Intelligenter Rezeptionist - ${formData.company || formData.name}`,
                        successUrl: `${window.location.origin}/payment/success`,
                        cancelUrl: window.location.href,
                        metadata: {
                          type: 'intelligenter-rezeptionist',
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
    </div>
  );
}
