"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { usePathname } from "next/navigation";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export default function ChatWidget() {
  const pathname = usePathname();
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

  // Auto-open on homepage, auto-close elsewhere
  useEffect(() => {
    setOpen(pathname === "/");
  }, [pathname]);

  // Listen for closeChatWidget event
  useEffect(() => {
    const handleCloseChatWidget = () => {
      setOpen(false);
    };
    window.addEventListener("closeChatWidget", handleCloseChatWidget);
    return () => window.removeEventListener("closeChatWidget", handleCloseChatWidget);
  }, []);

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
        body: JSON.stringify({ 
          messages: messagesToSend,
          currentPage: pathname 
        }),
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
          font-family: inherit;
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
            <div className="chat-card w-72 md:w-80 bg-white border border-gray-300 shadow-2xl rounded-3xl overflow-hidden flex flex-col">
              {/* Header with gradient */}
              <div className="px-4 py-4 bg-gray-100 text-gray-900 flex items-center justify-between border-b border-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl border-2 border-gray-300">
                    🤖
                  </div>
                  <div>
                    <div className="font-bold text-lg">AI-Assistent</div>
                    <div className="text-xs opacity-90 text-gray-500">Immer für dich da!</div>
                  </div>
                </div>
                <button 
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div ref={messagesRef} className="p-4 space-y-4 max-h-96 overflow-auto bg-white">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 font-medium">Hallo! Wie kann ich helfen?</p>
                  </div>
                )}
                
                {messages.map((m, i) => (
                  <div key={i} className={`message-enter flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                      m.role === "user" 
                        ? "bg-gradient-to-br from-gray-300 to-gray-200" 
                        : "bg-gradient-to-br from-gray-200 to-gray-100"
                    }`}>
                      {m.role === "user" ? "👤" : "🤖"}
                    </div>
                    
                    {/* Message bubble */}
                    <div className={`max-w-[75%] ${m.role === "user" ? "text-right" : "text-left"}`}>
                      <div className={`inline-block text-sm p-3 rounded-2xl shadow-md ${
                        m.role === "user" 
                          ? "bg-gray-100 text-gray-900 rounded-tr-none border border-gray-300" 
                          : "bg-white text-gray-900 rounded-tl-none border border-gray-300"
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg bg-gradient-to-br from-gray-200 to-gray-100">
                      🤖
                    </div>
                    <div className="bg-white text-gray-900 rounded-2xl rounded-tl-none border border-gray-300 p-3 shadow-md">
                      <div className="flex gap-1">
                        <div className="typing-dot w-2 h-2 bg-gray-500 rounded-full"></div>
                        <div className="typing-dot w-2 h-2 bg-gray-500 rounded-full"></div>
                        <div className="typing-dot w-2 h-2 bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input form */}
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-4 border-t border-gray-200 bg-white backdrop-blur-sm">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Schreibe eine Frage... 💭"
                    className="flex-1 border-2 border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-gray-500 transition-all bg-white text-gray-900"
                    disabled={loading}
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !input.trim()} 
                    className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? "⏳" : "🚀"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Chat bubble button */}
          {!open && (
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Chat öffnen"
              className="chat-bubble w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 shadow-2xl flex items-center justify-center text-gray-900 text-2xl border-4 border-gray-300"
            >
              {"💬"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
