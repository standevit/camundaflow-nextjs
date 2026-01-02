"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
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
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
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
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantContent },
        ]);
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
          disabled={isLoading || !input.trim()}
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
