"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid #e2e8f0",
        marginBottom: "3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "2px solid #667eea",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
          🤖
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
            AI Assistent
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#64748b",
              margin: "0.25rem 0 0 0",
            }}
          >
            Fragen zu Camunda, BPMN und Workflow-Automatisierung
          </p>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          padding: "1.5rem",
          minHeight: "300px",
          maxHeight: "400px",
          overflowY: "auto",
          marginBottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#94a3b8",
              padding: "2rem 1rem",
            }}
          >
            <p style={{ fontSize: "1rem", margin: "0 0 0.5rem 0" }}>
              👋 Hallo! Ich bin der CamundaFlow AI Assistent
            </p>
            <p style={{ fontSize: "0.9rem", margin: 0 }}>
              Stelle mir Fragen zu Camunda, BPMN oder Workflow-Automatisierung
            </p>
          </div>
        )}

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
                maxWidth: "80%",
                padding: "0.875rem 1rem",
                borderRadius: "8px",
                backgroundColor:
                  msg.role === "user" ? "#667eea" : "#e8eef7",
                color: msg.role === "user" ? "white" : "#0f172a",
                wordWrap: "break-word",
              }}
            >
              {msg.content}
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
          placeholder="Stelle deine Frage..."
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
            e.currentTarget.style.borderColor = "#667eea";
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
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                "0 6px 16px rgba(102, 126, 234, 0.4)";
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
    </div>
  );
}
