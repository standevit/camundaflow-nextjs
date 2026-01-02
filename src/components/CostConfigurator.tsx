"use client";

import { useState, useRef, useEffect } from "react";
import ProjectProposalRenderer from "./ProjectProposalRenderer";

// Dinamički import html2pdf za PDF generisanje
let html2pdf: any = null;
if (typeof window !== "undefined") {
  // Učitaj html2pdf kada je dostupan
  import("html2pdf.js")
    .then((module) => {
      html2pdf = module.default;
    })
    .catch(() => {
      console.warn("html2pdf nije dostupan");
    });
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ProjectProposal {
  project_name: string;
  description_summary: string;
  core_features: string[];
  tech_stack: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
  };
  timeline_weeks: {
    design: number;
    frontend_development: number;
    backend_development: number;
    testing_qa: number;
    deployment: number;
    total: number;
  };
  cost_breakdown: {
    base_price_eur: number;
    hourly_rate_eur: number;
    estimated_hours: number;
  };
  optional_features: Array<{
    name: string;
    description: string;
    additional_weeks: number;
    additional_price_eur: number;
  }>;
  total_with_all_options_eur: number;
}

interface ConfiguratorOption {
  label: string;
  value: string;
  selected: boolean;
}

interface CostConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CostConfigurator({ isOpen, onClose }: CostConfiguratorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const [currentProposal, setCurrentProposal] = useState<ProjectProposal | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);

  const SYSTEM_PROMPT = `Ti si stručnjak za procjenu i planiranje softverskih projekata.
Na osnovu korisnikovog opisa, generiši detaljan prijedlog u TAČNO definisanom JSON formatu.

VAŽNO:
- SVE dodatne, opcionalne ili alternativne funkcionalnosti koje nisu obavezni dio osnovnog zahtjeva MORAJU biti stavljene u polje "optional_features".
- Čak i ako korisnik ne traži eksplicitno dodatne opcije, predloži 3–5 realnih i korisnih opcionih feature-a koji bi poboljšali projekat.
- Ako ne postoji nijedna smislena opciona funkcionalnost, ostavi "optional_features" kao prazan niz [].
- Nikada ne piši dodatne opcije u običnom tekstu van JSON-a.

Obavezan JSON format (ne smiješ dodavati ništa drugo osim validnog JSON-a):

\`\`\`json
{
  "project_name": "Kratak naslov projekta",
  "description_summary": "Kratak sažetak onoga što korisnik želi",
  "core_features": ["Lista obaveznih funkcionalnosti"],
  "tech_stack": {
    "frontend": "...",
    "backend": "...",
    "database": "...",
    "hosting": "..."
  },
  "timeline_weeks": {
    "design": broj,
    "frontend_development": broj,
    "backend_development": broj,
    "testing_qa": broj,
    "deployment": broj,
    "total": broj
  },
  "cost_breakdown": {
    "base_price_eur": broj,
    "hourly_rate_eur": 80,
    "estimated_hours": broj
  },
  "optional_features": [
    {
      "name": "Naziv opcione funkcionalnosti",
      "description": "Kratak opis šta donosi",
      "additional_weeks": broj,
      "additional_price_eur": broj
    }
  ],
  "total_with_all_options_eur": broj
}
\`\`\``;

  // Initialize with first message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        role: "assistant",
        content: "Beschreiben Sie mir bitte Ihr Projekt im Detail. Auf dieser Basis erstelle ich Ihnen ein Angebot mit den voraussichtlichen Kosten, der Lieferzeit sowie den notwendigen Schritten.",
      };
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  // Close ChatWidget when CostConfigurator opens
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent("closeChatWidget"));
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // PDF Download funkcija
  const downloadPDF = async () => {
    if (!proposalRef.current || !currentProposal || !html2pdf) {
      alert("PDF biblioteka nije dostupna. Instaliraj: npm install html2pdf.js");
      return;
    }

    try {
      const element = proposalRef.current;
      const opt = {
        margin: 10,
        filename: `${currentProposal.project_name.replace(/\s+/g, "_")}_proposal.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Greška pri generisanju PDF-a:", error);
      alert("Greška pri generisanju PDF-a. Pokušaj ponovo.");
    }
  };

  // Helper function to extract JSON from assistant message
  const extractJsonFromContent = (content: string): ProjectProposal | null => {
    try {
      // Try to find JSON block in markdown code fence
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[1].trim();
        const parsed = JSON.parse(jsonStr);
        return parsed as ProjectProposal;
      }

      // Try to parse the entire content as JSON
      const parsed = JSON.parse(content);
      return parsed as ProjectProposal;
    } catch (error) {
      console.log("Could not parse JSON from content");
      return null;
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Build user message with selected options if available
    let messageContent = input.trim();
    if (currentProposal && Object.values(selectedOptions).some((v) => v)) {
      const selectedFeatures = currentProposal.optional_features
        .filter((f) => selectedOptions[f.name])
        .map((f) => f.name);
      
      messageContent += `\n\n[Selektovane dodatne opcije: ${selectedFeatures.join(", ")}]`;
    }

    const userMessage: Message = { role: "user", content: messageContent };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build messages with system prompt
      const messagesToSend = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...messages,
        userMessage,
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesToSend,
          currentPage: "/",
          context: "cost-configurator",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(`API error: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const jsonStr = line.slice(6);
              if (jsonStr === "[DONE]") continue;

              const json = JSON.parse(jsonStr);
              const content = json.choices?.[0]?.delta?.content || "";
              if (content) {
                assistantContent += content;
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }
      }

      if (assistantContent) {
        // Try to extract JSON proposal from content
        const proposal = extractJsonFromContent(assistantContent);
        
        if (proposal) {
          setCurrentProposal(proposal);
          // Reset selected options when new proposal is received
          setSelectedOptions({});
          // Don't show JSON in chat, only show ProjectProposalRenderer
        } else {
          // If no JSON found, show the message in chat normally
          const newMessage = { role: "assistant" as const, content: assistantContent };
          setMessages((prev) => [...prev, newMessage]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unbekannter Fehler";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Entschuldigung, ein Fehler ist aufgetreten: ${errorMessage}. Bitte versuchen Sie es später erneut.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setInput(option);
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
        border: "2px solid #1b1919ff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "2px solid #ef4444",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            width: "48px",
            height: "48px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          🔧
        </div>
        <div>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "700",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Kosten Konfigurator
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#64748b",
              margin: "0.25rem 0 0 0",
            }}
          >
            Finden Sie die perfekte Lösung.
          </p>
        </div>
      </div>

      {/* Project Proposal Display */}
      {currentProposal && (
        <div ref={proposalRef}>
          <ProjectProposalRenderer
            proposal={currentProposal}
            selectedOptions={selectedOptions}
            onOptionsChange={setSelectedOptions}
          />
          {/* PDF Download Button */}
          <button
            onClick={downloadPDF}
            style={{
              marginTop: "1.5rem",
              padding: "0.875rem 1.5rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
            }}
          >
            📥 PDF herunterladen
          </button>
        </div>
      )}

      {/* Chat Messages Container */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          padding: "1.5rem",
          minHeight: "400px",
          maxHeight: "500px",
          overflowY: "auto",
          marginBottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: "0.875rem 1rem",
                borderRadius: "8px",
                backgroundColor:
                  msg.role === "user" ? "#ef4444" : "#e8eef7",
                color: msg.role === "user" ? "white" : "#0f172a",
                wordWrap: "break-word",
                lineHeight: "1.6",
              }}
            >
              {msg.content.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                padding: "0.875rem 1rem",
                borderRadius: "8px",
                backgroundColor: "#e8eef7",
                color: "#0f172a",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>⏳ Ich denke nach...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} style={{ display: "flex", gap: "0.75rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Deine Antwort..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "0.875rem 1rem",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s",
            backgroundColor: isLoading ? "#f5f5f5" : "white",
            cursor: isLoading ? "not-allowed" : "text",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#ef4444";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        />
        <button
          type="submit"
          disabled={
            isLoading ||
            (!input.trim() &&
              (currentProposal ? !Object.values(selectedOptions).some((v) => v) : true))
          }
          style={{
            padding: "0.875rem 1.5rem",
            background:
              isLoading || !input.trim()
                ? "#cccccc"
                : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            opacity: isLoading || !input.trim() ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isLoading && input.trim()) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(239, 68, 68, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {isLoading ? "⏳ Sende..." : "📤 Sende"}
        </button>
      </form>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          marginTop: "1.5rem",
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#f5f5f5",
          color: "#333",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.95rem",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#e5e5e5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f5f5f5";
        }}
      >
        ✕ Schließen
      </button>
    </div>
  );
}
