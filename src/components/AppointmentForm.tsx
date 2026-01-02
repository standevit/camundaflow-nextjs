"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
}

export default function AppointmentForm({
  isOpen,
  onClose,
  userName = "",
  userEmail = "",
}: AppointmentFormProps) {
  const { data: session } = useSession();
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

  // Initialize form when opening modal
  useEffect(() => {
    if (isOpen) {
      const isLoggedIn = !!session?.user;
      const userFullName = userName || session?.user?.name || "";
      const userFullEmail = userEmail || session?.user?.email || "";

      setAppointmentStep(isLoggedIn ? 3 : 1);
      setAppointmentData({
        name: userFullName,
        email: userFullEmail,
        company: "",
        phone: "",
      });
      setVerificationCode("");
      setSelectedDate("");
      setSelectedTime("");
    }
  }, [isOpen, session, userName, userEmail]);

  // Send verification code
  const sendVerificationCode = async () => {
    setIsCodeSending(true);
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(code);

      // In production, send email via API
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: appointmentData.name,
          email: appointmentData.email,
          message: `Ihr Verifizierungscode für Terminbuchung: ${code}`,
          subject: "Terminbuchung - Verifizierungscode",
        }),
      });

      alert(`Verifizierungscode wurde an ${appointmentData.email} gesendet!`);
      setAppointmentStep(2);
    } catch (error) {
      console.error("Error sending code:", error);
      alert("Fehler beim Senden des Codes. Bitte versuchen Sie es erneut.");
    } finally {
      setIsCodeSending(false);
    }
  };

  // Verify code and move to calendar
  const verifyCode = () => {
    if (verificationCode === sentCode) {
      setAppointmentStep(3);
    } else {
      alert("Ungültiger Code. Bitte versuchen Sie es erneut.");
    }
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
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
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    return dates;
  };

  const handleClose = () => {
    setVerificationCode("");
    setSentCode("");
    setSelectedDate("");
    setSelectedTime("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "2rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        marginBottom: "2rem",
        marginTop: "2rem",
        border: "2px solid #10b981",
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          color: "#333",
        }}
      >
        📅 Termin vereinbaren
      </h3>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        {appointmentStep === 1 && "Schritt 1 von 3: Ihre Kontaktdaten"}
        {appointmentStep === 2 && "Schritt 2 von 3: E-Mail Verifizierung"}
        {appointmentStep === 3 &&
          (session?.user
            ? "Datum und Uhrzeit wählen"
            : "Schritt 3 von 3: Datum und Uhrzeit wählen")}
      </p>

      {/* Step 1: Basic Information */}
      {appointmentStep === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              Name *
            </label>
            <input
              type="text"
              value={appointmentData.name}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  name: e.target.value,
                })
              }
              placeholder="Ihr Name"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              E-Mail *
            </label>
            <input
              type="email"
              value={appointmentData.email}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  email: e.target.value,
                })
              }
              placeholder="ihre@email.de"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              Firma
            </label>
            <input
              type="text"
              value={appointmentData.company}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  company: e.target.value,
                })
              }
              placeholder="Firmenname (optional)"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              Telefon *
            </label>
            <input
              type="tel"
              value={appointmentData.phone}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  phone: e.target.value,
                })
              }
              placeholder="+49"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                padding: "0.875rem",
                backgroundColor: "#f5f5f5",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              Abbrechen
            </button>
            <button
              onClick={sendVerificationCode}
              disabled={
                !appointmentData.name ||
                !appointmentData.email ||
                !appointmentData.phone ||
                isCodeSending
              }
              style={{
                flex: 2,
                padding: "0.875rem",
                background:
                  !appointmentData.name ||
                  !appointmentData.email ||
                  !appointmentData.phone ||
                  isCodeSending
                    ? "#cccccc"
                    : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor:
                  !appointmentData.name ||
                  !appointmentData.email ||
                  !appointmentData.phone ||
                  isCodeSending
                    ? "not-allowed"
                    : "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                opacity:
                  !appointmentData.name ||
                  !appointmentData.email ||
                  !appointmentData.phone ||
                  isCodeSending
                    ? 0.6
                    : 1,
              }}
            >
              {isCodeSending ? "Sende Code..." : "Code anfordern"}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Email Verification */}
      {appointmentStep === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div
            style={{
              backgroundColor: "#e6f7ff",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <p style={{ margin: 0, color: "#0066cc" }}>
              📧 Wir haben einen 6-stelligen Verifizierungscode an{" "}
              <strong>{appointmentData.email}</strong> gesendet. Bitte geben Sie
              den Code ein, um fortzufahren.
            </p>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              Verifizierungscode *
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1.5rem",
                letterSpacing: "0.5rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                padding: "0.875rem",
                backgroundColor: "#f5f5f5",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              Abbrechen
            </button>
            <button
              onClick={verifyCode}
              disabled={verificationCode.length !== 6}
              style={{
                flex: 2,
                padding: "0.875rem",
                background:
                  verificationCode.length !== 6
                    ? "#cccccc"
                    : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor:
                  verificationCode.length !== 6 ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "1rem",
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
              padding: "0.75rem",
              backgroundColor: "transparent",
              color: "#10b981",
              border: "1px solid #10b981",
              borderRadius: "8px",
              cursor: isCodeSending ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            {isCodeSending ? "Sende..." : "Code erneut senden"}
          </button>
        </div>
      )}

      {/* Step 3: Calendar */}
      {appointmentStep === 3 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div
            style={{
              backgroundColor: "#f0fdf4",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <p style={{ margin: 0, color: "#059669" }}>
              ✅ User erfolgreich verifiziert! Wählen Sie jetzt Ihren
              gewünschten Termin.
            </p>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              Datum auswählen *
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              <option value="">Bitte wählen Sie ein Datum</option>
              {generateAvailableDates().map((date) => {
                const dateObj = new Date(date);
                const formatted = dateObj.toLocaleDateString("de-DE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
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
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#333",
                }}
              >
                Uhrzeit auswählen *
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {generateTimeSlots().map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: "0.75rem",
                      background:
                        selectedTime === time
                          ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                          : "white",
                      color: selectedTime === time ? "white" : "#333",
                      border:
                        selectedTime === time ? "none" : "2px solid #e0e0e0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      transition: "all 0.2s",
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div
              style={{
                backgroundColor: "#e6f7ff",
                padding: "1.25rem",
                borderRadius: "8px",
                marginTop: "1rem",
              }}
            >
              <p style={{ margin: 0, fontWeight: "600", color: "#0066cc" }}>
                📅 Ihr gewählter Termin:
              </p>
              <p
                style={{
                  margin: "0.5rem 0 0 0",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {new Date(selectedDate).toLocaleDateString("de-DE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                um {selectedTime} Uhr
              </p>
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                padding: "0.875rem",
                backgroundColor: "#f5f5f5",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              Abbrechen
            </button>
            <button
              onClick={async () => {
                try {
                  await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: appointmentData.name,
                      email: appointmentData.email,
                      company: appointmentData.company,
                      phone: appointmentData.phone,
                      message: `Terminbuchung:\nDatum: ${new Date(
                        selectedDate
                      ).toLocaleDateString("de-DE", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}\nUhrzeit: ${selectedTime} Uhr`,
                      subject: "Neue Terminbuchung",
                    }),
                  });

                  alert(
                    "✅ Termin erfolgreich gebucht! Sie erhalten eine Bestätigung per E-Mail."
                  );
                  handleClose();
                } catch (error) {
                  console.error("Error booking appointment:", error);
                  alert(
                    "Fehler beim Buchen des Termins. Bitte versuchen Sie es erneut."
                  );
                }
              }}
              disabled={!selectedDate || !selectedTime}
              style={{
                flex: 2,
                padding: "0.875rem",
                background:
                  !selectedDate || !selectedTime
                    ? "#cccccc"
                    : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor:
                  !selectedDate || !selectedTime ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                opacity: !selectedDate || !selectedTime ? 0.6 : 1,
              }}
            >
              Termin bestätigen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
