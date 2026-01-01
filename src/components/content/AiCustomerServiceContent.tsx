"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function AiCustomerServiceContent() {
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
  const projectPrice = 4000;
  const [testnetConfirmed, setTestnetConfirmed] = useState(false);
  const [includeExtras, setIncludeExtras] = useState({
    sentimentAnalysis: false,
    voicebot: false,
    customIntegrations: false,
    advancedReporting: false,
    prioritySupport: false,
  });

  const extraPrices = {
    sentimentAnalysis: 800,
    voicebot: 1200,
    customIntegrations: 1000,
    advancedReporting: 600,
    prioritySupport: 400,
  };

  const totalPrice = projectPrice + 
    (includeExtras.sentimentAnalysis ? extraPrices.sentimentAnalysis : 0) +
    (includeExtras.voicebot ? extraPrices.voicebot : 0) +
    (includeExtras.customIntegrations ? extraPrices.customIntegrations : 0) +
    (includeExtras.advancedReporting ? extraPrices.advancedReporting : 0) +
    (includeExtras.prioritySupport ? extraPrices.prioritySupport : 0);

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
          {t("ai_customer_service_intro_heading")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0',
          paddingRight: '160px'
        }}>
          {t("ai_customer_service_intro_desc")}
        </p>
        
        
      </div>

      

      {/* Capabilities Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#0f172a'
        }}>
          {t("ai_customer_service_intro_capabilities_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_1")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_2")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_3")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_4")}
            </p>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>
            {t("ai_customer_service_intro_result")}
          </p>
        </div>
      </div>

      {/* BPMN Diagram Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            📊
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
          }}>
            {t("ai_customer_service_intro_process_heading")}
          </h3>
        </div>

        <div 
          className="bpmn-container" 
          data-diagram="/bpmn/ai-customer-service.bpmn"
          style={{
            height: '500px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '2rem',
            overflow: 'hidden'
          }}
        ></div>

        {/* Process Flow Description */}
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                fontWeight: '700',
                flexShrink: 0
              }}>
                {step}
              </div>
              <p style={{
                margin: 0,
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#475569'
              }}>
                {t(`ai_customer_service_intro_process_step_${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Purple Block */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.7',
          marginBottom: '1.5rem',
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
              display: 'inline-block',
              padding: '0.875rem 2rem',
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
          >
            📅 Beratungstermin vereinbaren
          </button>
          <button
            onClick={() => setShowForm(true)}
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, #eb7222ff 0%, #f17610ff 100%)',
              color: 'white',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(235, 114, 34, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            📝 Projekt anfragen
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
          marginBottom: '2rem',
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
                  Firma
                </label>
                <input
                  type="text"
                  value={appointmentData.company}
                  onChange={(e) => setAppointmentData({ ...appointmentData, company: e.target.value })}
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
                  ✅ E-Mail erfolgreich verifiziert! Wählen Sie jetzt Ihren gewünschten Termin.
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
                    📅 Ihr gewählter Termin:
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
                  onClick={() => {
                    if (session?.user) {
                      setShowAppointmentForm(false);
                    } else {
                      setAppointmentStep(2);
                    }
                  }}
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
                          name: appointmentData.name,
                          email: appointmentData.email,
                          company: appointmentData.company,
                          phone: appointmentData.phone,
                          message: `Beratungstermin für AI Customer Service:\nDatum: ${new Date(selectedDate).toLocaleDateString('de-DE', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}\nUhrzeit: ${selectedTime} Uhr`,
                          subject: 'Neue Terminbuchung - AI Customer Service'
                        }),
                      });
                      
                      alert('✅ Termin erfolgreich gebucht! Sie erhalten eine Bestätigung per E-Mail.');
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
          marginBottom: '2rem',
          border: '2px solid #667eea',
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#333' }}>
            AI Customer Service - Projekt anfragen
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
              📋 Was Sie erhalten
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem", color: "#333" }}>
              <div>
                <strong>🤖 AI-powered Chatbot</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Intelligenter Kundenservice-Bot mit OpenAI GPT-4, LangChain und RAG-System.
                </p>
              </div>
              <div>
                <strong>🔗 Camunda Integration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Prozess-Orchestrierung für komplexe Anfragen, Eskalation und Human-in-the-Loop.
                </p>
              </div>
              <div>
                <strong>📚 Wissensdatenbank</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Vector Database (Pinecone/Weaviate) mit Ihren FAQs, Dokumentationen und Produktinfos.
                </p>
              </div>
              <div>
                <strong>💬 Multi-Channel</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Integration in Website, WhatsApp, Telegram, Slack und weitere Kanäle.
                </p>
              </div>
              <div>
                <strong>📊 Analytics Dashboard</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Monitoring, Reporting und kontinuierliche Verbesserung durch ML-Insights.
                </p>
              </div>
              <div>
                <strong>🔐 Sicherheit & Datenschutz</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Ende-zu-Ende Verschlüsselung, GDPR-Compliance und sichere Datenspeicherung.
                </p>
              </div>
              <div>
                <strong>🎓 Training & Dokumentation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Umfassendes Team-Training, technische Dokumentation und Best Practices Guide.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#059669", marginBottom: "1rem" }}>
              ➕ Zusätzliche Features (optional)
            </h4>
            
            {/* Sentiment Analysis */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.sentimentAnalysis ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, sentimentAnalysis: !includeExtras.sentimentAnalysis})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.sentimentAnalysis}
                  onChange={(e) => setIncludeExtras({...includeExtras, sentimentAnalysis: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    😊 Sentiment Analysis & Emotion Detection
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Automatische Erkennung von Kundenstimmung und Emotionen zur proaktiven Eskalation bei negativem Feedback.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.sentimentAnalysis}
                  </p>
                </div>
              </div>
            </div>

            {/* Voicebot */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.voicebot ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, voicebot: !includeExtras.voicebot})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.voicebot}
                  onChange={(e) => setIncludeExtras({...includeExtras, voicebot: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    🎤 Voicebot Integration
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Sprach-basierte KI für Telefon-Support mit Speech-to-Text und Text-to-Speech (mehrsprachig).
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.voicebot}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Integrations */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.customIntegrations ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, customIntegrations: !includeExtras.customIntegrations})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.customIntegrations}
                  onChange={(e) => setIncludeExtras({...includeExtras, customIntegrations: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    🔌 Custom API Integrationen
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Integration mit Ihren bestehenden Systemen (CRM, ERP, Ticketing, etc.) über REST APIs.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.customIntegrations}
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Reporting */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.advancedReporting ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, advancedReporting: !includeExtras.advancedReporting})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.advancedReporting}
                  onChange={(e) => setIncludeExtras({...includeExtras, advancedReporting: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    📈 Advanced Analytics & Reporting
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    Erweiterte KPI-Dashboards, Custom Reports, Predictive Analytics und Business Intelligence.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.advancedReporting}
                  </p>
                </div>
              </div>
            </div>

            {/* Priority Support */}
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: includeExtras.prioritySupport ? "2px solid #10b981" : "2px solid #e0e0e0",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => setIncludeExtras({...includeExtras, prioritySupport: !includeExtras.prioritySupport})}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={includeExtras.prioritySupport}
                  onChange={(e) => setIncludeExtras({...includeExtras, prioritySupport: e.target.checked})}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem", marginTop: 0 }}>
                    ⚡ Priority Support & SLA
                  </h5>
                  <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 0 }}>
                    24/7 Priority Support mit garantierter Response Time, dedizierter Account Manager.
                  </p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669", marginTop: "0.5rem", marginBottom: 0 }}>
                    + €{extraPrices.prioritySupport}
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
                placeholder="Beschreiben Sie Ihre Kundenservice-Anforderungen, Anzahl der Anfragen, gewünschte Integrationen..."
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
                        title: 'AI Customer Service Implementation',
                        description: `AI Customer Service - ${formData.company || formData.name}`,
                        successUrl: `${window.location.origin}/payment/success`,
                        cancelUrl: window.location.href,
                        metadata: {
                          type: 'ai-customer-service',
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
                title={!testnetConfirmed ? "Bitte bestätigen Sie, dass Sie das Testnet verstehen" : ""}
                style={{
                  flex: 2,
                  padding: '0.875rem',
                  background: (!formData.name && !userName || !formData.email && !userEmail || !testnetConfirmed) ? '#cccccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: (!formData.name && !userName || !formData.email && !userEmail || !testnetConfirmed) ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  opacity: (!formData.name && !userName || !formData.email && !userEmail || !testnetConfirmed) ? 0.6 : 1,
                }}
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
