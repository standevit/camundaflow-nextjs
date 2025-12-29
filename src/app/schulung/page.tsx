"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/components/LanguageProvider";
import ProjectRequestModal from "@/components/ProjectRequestModal";

export default function SchulungPage() {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [includeTrezor, setIncludeTrezor] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";

  const basePrice = 250;
  const trezorPrice = 50;
  const totalPrice = basePrice + (includeTrezor ? trezorPrice : 0);

  const topics = [
    {
      id: "buy-crypto",
      icon: "🛒",
      title: t("schulung.topics.buyCrypto.title"),
      description: t("schulung.topics.buyCrypto.description"),
    },
    {
      id: "create-wallet",
      icon: "💼",
      title: t("schulung.topics.createWallet.title"),
      description: t("schulung.topics.createWallet.description"),
    },
    {
      id: "secure-wallet",
      icon: "🔒",
      title: t("schulung.topics.secureWallet.title"),
      description: t("schulung.topics.secureWallet.description"),
    },
    {
      id: "blockchain-basics",
      icon: "⛓️",
      title: t("schulung.topics.blockchainBasics.title"),
      description: t("schulung.topics.blockchainBasics.description"),
    },
    {
      id: "trading-basics",
      icon: "📈",
      title: t("schulung.topics.tradingBasics.title"),
      description: t("schulung.topics.tradingBasics.description"),
    },
    {
      id: "defi",
      icon: "🏦",
      title: t("schulung.topics.defi.title"),
      description: t("schulung.topics.defi.description"),
    },
  ];

  const topicContent: Record<string, { title: string; content: string[] }> = {
    "buy-crypto": {
      title: t("schulung.content.buyCrypto.title") as string,
      content: [
        t("schulung.content.buyCrypto.intro") as string,
        t("schulung.content.buyCrypto.step1") as string,
        t("schulung.content.buyCrypto.step2") as string,
        t("schulung.content.buyCrypto.step3") as string,
        t("schulung.content.buyCrypto.step4") as string,
        t("schulung.content.buyCrypto.conclusion") as string,
      ],
    },
    "create-wallet": {
      title: t("schulung.content.createWallet.title") as string,
      content: [
        t("schulung.content.createWallet.intro") as string,
        t("schulung.content.createWallet.types") as string,
        t("schulung.content.createWallet.step1") as string,
        t("schulung.content.createWallet.step2") as string,
        t("schulung.content.createWallet.step3") as string,
        t("schulung.content.createWallet.conclusion") as string,
      ],
    },
    "secure-wallet": {
      title: t("schulung.content.secureWallet.title") as string,
      content: [
        t("schulung.content.secureWallet.intro") as string,
        t("schulung.content.secureWallet.tip1") as string,
        t("schulung.content.secureWallet.tip2") as string,
        t("schulung.content.secureWallet.tip3") as string,
        t("schulung.content.secureWallet.tip4") as string,
        t("schulung.content.secureWallet.conclusion") as string,
      ],
    },
    "blockchain-basics": {
      title: t("schulung.content.blockchainBasics.title") as string,
      content: [
        t("schulung.content.blockchainBasics.intro") as string,
        t("schulung.content.blockchainBasics.concept1") as string,
        t("schulung.content.blockchainBasics.concept2") as string,
        t("schulung.content.blockchainBasics.concept3") as string,
        t("schulung.content.blockchainBasics.conclusion") as string,
      ],
    },
    "trading-basics": {
      title: t("schulung.content.tradingBasics.title") as string,
      content: [
        t("schulung.content.tradingBasics.intro") as string,
        t("schulung.content.tradingBasics.concept1") as string,
        t("schulung.content.tradingBasics.concept2") as string,
        t("schulung.content.tradingBasics.concept3") as string,
        t("schulung.content.tradingBasics.conclusion") as string,
      ],
    },
    "defi": {
      title: t("schulung.content.defi.title") as string,
      content: [
        t("schulung.content.defi.intro") as string,
        t("schulung.content.defi.concept1") as string,
        t("schulung.content.defi.concept2") as string,
        t("schulung.content.defi.concept3") as string,
        t("schulung.content.defi.conclusion") as string,
      ],
    },
  };

  return (
    <>
      <ProjectRequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        userName={userName}
        userEmail={userEmail}
        requestType="schulung"
      />

      <div className="container">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <h3>{t("schulung.sidebar.title")}</h3>
          <ul>
            {topics.map((topic) => (
              <li key={topic.id}>
                <a
                  className={`example-link ${selectedTopic === topic.id ? "active" : ""}`}
                  onClick={() => setSelectedTopic(topic.id)}
                  style={{ cursor: "pointer" }}
                >
                  {topic.icon} {topic.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="card">
            {selectedTopic ? (
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
                  {topicContent[selectedTopic]?.title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", lineHeight: "1.8" }}>
                  {topicContent[selectedTopic]?.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎓</div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {t("schulung.header.title")}
                  </h2>
                  <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "1.5rem" }}>
                    {t("schulung.header.subtitle")}
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    style={{
                      padding: "1rem 2rem",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    📝 {t("schulung.header.requestButton")} (€{totalPrice})
                  </button>
                </div>

                {/* Kurs Anfragen Form */}
                {showForm ? (
                  <div style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "2rem",
                    marginBottom: "2rem",
                    border: "2px solid #667eea",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
                        🎓 Kurs anfragen - Krypto Basics
                      </h3>
                      <button
                        onClick={() => setShowForm(false)}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "1.5rem",
                          cursor: "pointer",
                          color: "#666",
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{
                      backgroundColor: "#f0f7ff",
                      padding: "1rem",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                      fontSize: "0.95rem",
                      color: "#0066cc",
                    }}>
                      💰 <strong>Preis:</strong> €{totalPrice} | ⏱️ <strong>Dauer:</strong> 1,5 Stunden
                    </div>

                    <div style={{
                      backgroundColor: "#fff4e5",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                    }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#d97706", marginBottom: "1rem" }}>
                        📋 Kurs-Inhalte (1,5 Stunden)
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.95rem", color: "#333" }}>
                        <div>
                          <strong>🔷 Einführung in Blockchain & Kryptowährungen (30 Min)</strong>
                          <p style={{ marginTop: "0.25rem", color: "#666" }}>
                            Was ist Blockchain? Wie funktionieren Bitcoin, Ethereum & Co.? Grundlegende Konzepte: Dezentralisierung, Mining, Konsens-Mechanismen.
                          </p>
                        </div>
                        <div>
                          <strong>🛒 Wie kaufe ich meine ersten Coins? (30 Min)</strong>
                          <p style={{ marginTop: "0.25rem", color: "#666" }}>
                            Auswahl der richtigen Exchange (Coinbase, Binance, Kraken). KYC-Prozess verstehen. Erste Einzahlung und Kauf Schritt für Schritt. Gebührenstrukturen erklärt.
                          </p>
                        </div>
                        <div>
                          <strong>💼 Wallet-Erstellung & Sicherheit (30 Min)</strong>
                          <p style={{ marginTop: "0.25rem", color: "#666" }}>
                            Hardware vs. Software Wallets. Seed Phrase sicher aufbewahren. 2-Faktor-Authentifizierung aktivieren. Phishing-Schutz und Best Practices.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Trezor Safe 3 Option */}
                    <div style={{
                      backgroundColor: "#f0fdf4",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      marginBottom: "1.5rem",
                      border: includeTrezor ? "2px solid #10b981" : "2px solid #e0e0e0",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onClick={() => setIncludeTrezor(!includeTrezor)}
                    >
                      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                        <input
                          type="checkbox"
                          checked={includeTrezor}
                          onChange={(e) => setIncludeTrezor(e.target.checked)}
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <img 
                          src="/trezor-safe-3.png" 
                          alt="Trezor Safe 3" 
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "contain",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#059669", marginBottom: "0.5rem" }}>
                            🔐 Trezor Safe 3 Hardware Wallet hinzufügen
                          </h4>
                          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
                            Sichern Sie Ihre Kryptowährungen mit dem neuesten Hardware Wallet von Trezor. Perfekt für Anfänger!
                          </p>
                          <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#059669" }}>
                            + €50
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ihr Name"
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
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
                          E-Mail *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ihre.email@beispiel.de"
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
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
                          Firma
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
                          Telefon
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+49 (optional)"
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
                        <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>
                          Kurs-Agenda & Ihre Erwartungen
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Was möchten Sie im Kurs lernen? Welche Themen interessieren Sie besonders?"
                          rows={4}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "2px solid #e0e0e0",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            resize: "vertical",
                          }}
                        />
                      </div>

                      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                        <button
                          onClick={() => setShowForm(false)}
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
                            // Create CoinGate payment order
                            try {
                              const response = await fetch('/api/payment/create-charge', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  amount: totalPrice,
                                  projectRequest: {
                                    projectName: `Krypto Basics Kurs${includeTrezor ? ' + Trezor Safe 3' : ''}`,
                                    projectType: 'Schulung',
                                    description: `Teilnehmer: ${formData.name}, Email: ${formData.email}${formData.company ? `, Firma: ${formData.company}` : ''}${formData.phone ? `, Tel: ${formData.phone}` : ''}. ${formData.message || ''}`,
                                    userEmail: formData.email,
                                  },
                                }),
                              });
                              
                              if (response.ok) {
                                const data = await response.json();
                                // Redirect to CoinGate payment page
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
                          disabled={!formData.name || !formData.email}
                          style={{
                            flex: 2,
                            padding: "0.875rem",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "1rem",
                            opacity: (!formData.name || !formData.email) ? 0.5 : 1,
                          }}
                        >
                          Kurs anfragen (€{totalPrice})
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Topic Overview Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      style={{
                        padding: "1.5rem",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                        {topic.icon}
                      </div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                        {topic.title}
                      </h3>
                      <p style={{ color: "#666", fontSize: "0.95rem" }}>
                        {topic.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>

        {/* Right Sidebar with Images */}
        <aside className="sidebar" style={{ 
          padding: '0', 
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          <img 
            src="/crypto.avif" 
            alt="Cryptocurrency" 
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
          <img 
            src="/blockchain.avif" 
            alt="Blockchain Technology" 
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </aside>
      </div>
    </>
  );
}
