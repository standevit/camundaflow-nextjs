"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([

  ]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight });
  }, [messages, open]);

  function addMessage(msg: Msg) {
    setMessages((m) => [...m, msg]);
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    addMessage({ role: "user", content: userText });
    setInput("");

    // placeholder for assistant
    addMessage({ role: "assistant", content: "" });
    setLoading(true);
    setIsTyping(true);

    try {
      // Limit chat history to last 5 messages (excluding system) to reduce token usage
      const MAX_HISTORY = 5;
      const userMessages = messages.filter((m) => m.role !== "system");
      const limitedHistory = userMessages.slice(-MAX_HISTORY);
      const messagesToSend = [...limitedHistory, { role: "user", content: userText }];

      console.log(`[Chat] Sending ${messagesToSend.length} messages, ${JSON.stringify(messagesToSend).length} chars`);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesToSend }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Fehler" }));
        // append error message
        setMessages((prev) => {
          const copy = [...prev];
          const idx = copy.findIndex((m) => m.role === "assistant" && m.content === "");
          if (idx >= 0) copy[idx] = { role: "assistant", content: `Fehler: ${err?.error || "Server"}` };
          return copy;
        });
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      if (!reader) throw new Error("Kein Stream verfügbar");

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        if (value) {
          buffer += decoder.decode(value, { stream: true });

          // Stream is in SSE "data: {json}\n\n" format. Split and parse.
          const parts = buffer.split(/\r?\n\r?\n/);
          for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i].trim();
            if (!part) continue;
            if (part.startsWith("data: ")) {
              const data = part.replace(/^data: /, "");
              if (data === "[DONE]") {
                done = true;
                break;
              }
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                if (delta) {
                  // append delta to the last assistant message
                  setMessages((prev) => {
                    const copy = [...prev];
                    const idx = copy.map((m) => m.role).lastIndexOf("assistant");
                    if (idx >= 0) copy[idx] = { ...copy[idx], content: copy[idx].content + delta };
                    return copy;
                  });
                }
              } catch (err) {
                // ignore parse errors
                console.warn(err);
              }
            }
          }

          buffer = parts[parts.length - 1];
        }

        if (doneReading) break;
      }

      // finalize any leftover
      if (buffer && buffer.includes("data: ")) {
        const remaining = buffer.split(/\r?\n\r?\n/);
        for (const part of remaining) {
          const p = part.trim();
          if (!p) continue;
          if (p.startsWith("data: ")) {
            const data = p.replace(/^data: /, "");
            if (data !== "[DONE]") {
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                if (delta) {
                  setMessages((prev) => {
                    const copy = [...prev];
                    const idx = copy.map((m) => m.role).lastIndexOf("assistant");
                    if (idx >= 0) copy[idx] = { ...copy[idx], content: copy[idx].content + delta };
                    return copy;
                  });
                }
              } catch {}
            }
          }
        }
      }

    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const copy = [...prev];
        const idx = copy.findIndex((m) => m.role === "assistant" && m.content === "");
        if (idx >= 0) copy[idx] = { role: "assistant", content: "Fehler beim Verarbeiten der Anfrage." };
        return copy;
      });
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }

  return (
    <>
      <style jsx>{`
        .chat-widget-container {
          font-family: 'Times New Roman', Times, serif;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes typing {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        
        .chat-card {
          animation: slideUp 0.3s ease-out;
        }
        
        .chat-bubble {
          transition: all 0.3s ease;
        }
        
        .chat-bubble:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 30px rgba(236, 72, 153, 0.4);
        }
        
        .typing-dot {
          animation: typing 1.4s infinite;
        }
        
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        .message-enter {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
      
      <div className="chat-widget-container">
        {/* Floating bubble */}
        <div className="fixed bottom-6 right-6 z-50">
          {open && (
            <div className="chat-card w-80 md:w-96 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col mb-4">
              {/* Header with gradient */}
              <div className="px-4 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-2xl border-2 border-white/30">
                    🤖
                  </div>
                  <div>
                    <div className="font-bold text-lg">AI-Assistent</div>
                    <div className="text-xs opacity-90">Immer für dich da!</div>
                  </div>
                </div>
                <button 
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div ref={messagesRef} className="p-4 space-y-4 max-h-96 overflow-auto bg-gradient-to-b from-transparent to-purple-50/30">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-3">👋</div>
                    <p className="text-gray-600 font-medium">Hallo! Wie kann ich helfen?</p>
                  </div>
                )}
                
                {messages.map((m, i) => (
                  <div key={i} className={`message-enter flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                      m.role === "user" 
                        ? "bg-gradient-to-br from-blue-400 to-cyan-400" 
                        : "bg-gradient-to-br from-pink-400 to-purple-400"
                    }`}>
                      {m.role === "user" ? "👤" : "🤖"}
                    </div>
                    
                    {/* Message bubble */}
                    <div className={`max-w-[75%] ${m.role === "user" ? "text-right" : "text-left"}`}>
                      <div className={`inline-block text-sm p-3 rounded-2xl shadow-md ${
                        m.role === "user" 
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-tr-none" 
                          : "bg-white text-gray-800 rounded-tl-none border border-purple-100"
                      }`}>
                        {m.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content || ""}</ReactMarkdown>
                          </div>
                        ) : (
                          <span className="font-medium">{m.content}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="message-enter flex gap-2 flex-row">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg bg-gradient-to-br from-pink-400 to-purple-400">
                      🤖
                    </div>
                    <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none border border-purple-100 p-3 shadow-md">
                      <div className="flex gap-1">
                        <div className="typing-dot w-2 h-2 bg-purple-400 rounded-full"></div>
                        <div className="typing-dot w-2 h-2 bg-purple-400 rounded-full"></div>
                        <div className="typing-dot w-2 h-2 bg-purple-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input form */}
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-4 border-t border-purple-100 bg-white/80 backdrop-blur-sm">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Schreibe eine Frage... 💭"
                    className="flex-1 border-2 border-purple-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 transition-all bg-white"
                    disabled={loading}
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !input.trim()} 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? "⏳" : "🚀"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Chat bubble button */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Chat öffnen"
            className="chat-bubble w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-2xl flex items-center justify-center text-white text-3xl border-4 border-white"
          >
            {open ? "✕" : "💬"}
          </button>
        </div>
      </div>
    </>
  );
}
