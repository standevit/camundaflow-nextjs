"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";

export default function McpIndexContent() {
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
  const projectPrice = 3500;
  const [testnetConfirmed, setTestnetConfirmed] = useState(false);
  const [additionalServices, setAdditionalServices] = useState({
    aiTraining: false,
    multipleProcesses: false,
    customTools: false,
    ongoingSupport: false,
  });

  const additionalPrices = {
    aiTraining: 900,
    multipleProcesses: 1200,
    customTools: 1000,
    ongoingSupport: 650,
  };

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

  const calculateTotalPrice = () => {
    let total = projectPrice;
    if (additionalServices.aiTraining) total += additionalPrices.aiTraining;
    if (additionalServices.multipleProcesses) total += additionalPrices.multipleProcesses;
    if (additionalServices.customTools) total += additionalPrices.customTools;
    if (additionalServices.ongoingSupport) total += additionalPrices.ongoingSupport;
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
          {t("mcp_index_heading")}
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0', paddingRight: '160px' }}>
          {t("mcp_index_intro")}
        </p>
        

      </div>

      

      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#667eea', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔌</span>
          {t("mcp_index_what_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_discovers_label")}</strong> {t("mcp_index_discovers")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_understands_label")}</strong> {t("mcp_index_understands")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_calls_label")}</strong> {t("mcp_index_calls")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_works_label")}</strong> {t("mcp_index_works")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_supports_label")}</strong> {t("mcp_index_supports")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_enables_label")}</strong> {t("mcp_index_enables")}
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
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>🛠️</span>
          {t("mcp_index_tools_heading")}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_1")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_2")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_3")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_4")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_5")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_6")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_7")}
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
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>💡</span>
          {t("mcp_index_why_camunda_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_1_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_1")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_2_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_2")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_3_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_3")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_4_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_4")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_5_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_5")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_6_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_6")}</p>
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
        <p style={{ fontSize: '1.05rem', marginBottom: 0 }}>
          <strong style={{ color: '#667eea' }}>{t("mcp_index_conclusion_label")}</strong> {t("mcp_index_conclusion")}
        </p>
      </div>


      <section style={{ marginTop: '3rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem' }}>
            🤖 MCP Beispiel: Automatische Kundenanfrage
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("mcp_example_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/mcp.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Prozess Ablauf:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start:</strong> {t("mcp_example_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>AI Analyse:</strong> {t("mcp_example_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>MCP Server Call:</strong> {t("mcp_example_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Daten abrufen:</strong> {t("mcp_example_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Prozess triggern:</strong> {t("mcp_example_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("mcp_example_step6")}</li>
          </ol>
        </div>
      </section>



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
                          message: `Beratungstermin für MCP + Camunda:\nDatum: ${new Date(selectedDate).toLocaleDateString('de-DE', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}\nUhrzeit: ${selectedTime} Uhr`,
                          subject: 'Neue Terminbuchung - MCP + Camunda'
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
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '2px solid #667eea',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginTop: 0, color: '#667eea', fontSize: '1.5rem', marginBottom: '1rem' }}>
            MCP + Camunda Integration - Projekt anfragen
          </h3>
          <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
            Professional Model Context Protocol server development with Camunda integration for AI agents
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
                <strong>🔌 MCP Server Development</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Custom MCP server in Node.js/TypeScript with Camunda REST API integration
                </p>
              </div>
              <div>
                <strong>⚙️ Core Tools Implementation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Start process, query process instances, complete tasks, get variables
                </p>
              </div>
              <div>
                <strong>🤖 AI Agent Configuration</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Setup and configuration for Claude or GPT integration with MCP
                </p>
              </div>
              <div>
                <strong>🔐 Authentication & Security</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  OAuth2/Basic Auth implementation for secure Camunda API access
                </p>
              </div>
              <div>
                <strong>📚 Documentation & Examples</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Complete setup guide, API documentation, and usage examples
                </p>
              </div>
              <div>
                <strong>✅ Testing & Validation</strong>
                <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                  Unit tests, integration tests, and end-to-end workflow validation
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
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.aiTraining ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.aiTraining}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, aiTraining: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🎓 AI Agent Training (+€{additionalPrices.aiTraining})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Custom prompt engineering and training for your specific business processes
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.multipleProcesses ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.multipleProcesses}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, multipleProcesses: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🔄 Multiple Process Types (+€{additionalPrices.multipleProcesses})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    MCP tools for 5+ different process types with custom configurations
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.customTools ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.customTools}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, customTools: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>🛠️ Custom MCP Tools (+€{additionalPrices.customTools})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Development of specialized tools for your unique business requirements
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: additionalServices.ongoingSupport ? '#d1fae5' : 'transparent' }}>
                <input
                  type="checkbox"
                  checked={additionalServices.ongoingSupport}
                  onChange={(e) => setAdditionalServices({ ...additionalServices, ongoingSupport: e.target.checked })}
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#059669' }}>💬 3 Months Support (+€{additionalPrices.ongoingSupport})</strong>
                  <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                    Email & chat support, updates, and assistance for 3 months
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
                    title: 'MCP + Camunda Integration',
                    description: `MCP Server Development with Camunda - ${formData.company || formData.name}`,
                    successUrl: `${window.location.origin}/payment/success`,
                    cancelUrl: window.location.href,
                    metadata: {
                      type: 'mcp-camunda-integration',
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
                placeholder="Beschreiben Sie Ihre MCP + Camunda Anforderungen..."
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
              {(additionalServices.aiTraining || additionalServices.multipleProcesses || additionalServices.customTools || additionalServices.ongoingSupport) && (
                <>
                  {additionalServices.aiTraining && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ AI Agent Training</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.aiTraining}</span>
                    </div>
                  )}
                  {additionalServices.multipleProcesses && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Multiple Process Types</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.multipleProcesses}</span>
                    </div>
                  )}
                  {additionalServices.customTools && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ Custom MCP Tools</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.customTools}</span>
                    </div>
                  )}
                  {additionalServices.ongoingSupport && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#059669' }}>+ 3 Months Support</span>
                      <span style={{ color: '#059669' }}>€{additionalPrices.ongoingSupport}</span>
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
                Custom MCP server development + Camunda API integration + AI agent setup
                {(additionalServices.aiTraining || additionalServices.multipleProcesses || additionalServices.customTools || additionalServices.ongoingSupport) && ' + selected additional services'}
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

    </>
  );
}
