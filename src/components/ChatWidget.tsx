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
    }
  }

  return (
    <div>
      {/* Floating bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        {open && (
          <div className="w-80 md:w-96 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-slate-600 text-white flex items-center justify-between">
              <div className="font-semibold">AI-Assistent</div>
              <div className="text-sm opacity-90">Streaming · Markdown</div>
            </div>

            <div ref={messagesRef} className="p-3 space-y-3 max-h-72 overflow-auto">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                  <div className={`inline-block text-sm p-2 rounded-md ${m.role === "user" ? "bg-slate-50 text-slate-800" : "bg-gray-50 text-gray-900"}`}>
                    {m.role === "assistant" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content || "…"}</ReactMarkdown>
                    ) : (
                      <span>{m.content}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-3 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Schreibe eine Frage..."
                  className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
                />
                <button type="submit" disabled={loading} className="bg-slate-600 text-white px-3 py-2 rounded-md text-sm">
                  {loading ? "Senden…" : "Senden"}
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Chat öffnen"
          className="mt-3 w-14 h-14 rounded-full bg-slate-600 shadow-lg flex items-center justify-center text-white text-xl"
        >
          💬
        </button>
      </div>
    </div>
  );
}
