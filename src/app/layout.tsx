// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Camunda Flow – Prozessautomatisierung & BPM Experte",
  description: "Camunda 8 Experte aus Deutschland – Beratung, Implementierung und Custom-Entwicklung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="home min-h-screen flex flex-col">
        {/* MENI – OVDJE IDE, PRIJE {children} */}
        <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-xl border-b border-gray-200 py-4">
          <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <a href="/" className="logo">
              <img src="/logo.svg" alt="Camunda Flow" height={46} />
            </a>
            <div className="menu flex space-x-8 text-lg font-medium">
              <a href="/" className="hover:text-blue-600 transition">BPMN</a>
              <a href="/camunda" className="hover:text-blue-600 transition">Camunda 8</a>
              <a href="/ai-agents" className="hover:text-blue-600 transition">AI Agents</a>
              <a href="/model-context-protocol" className="hover:text-blue-600 transition">
                Model Context Protocol
              </a>
              <a href="/leistungen" className="hover:text-blue-600 transition">Leistungen</a>
              <a href="/contact" className="hover:text-blue-600 transition">Kontakt</a>
            </div>
          </nav>
        </header>

        {/* SADRŽAJ STRANICA – ovo je {children} */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER – poslije {children} */}
        <footer className="bg-gray-100 py-8 border-t border-gray-200 text-center text-gray-600">
          © 2025 Camunda Flow •{" "}
          <a href="mailto:post@camundaflow.de" className="text-blue-600 hover:underline">
            post@camundaflow.de
          </a>
        </footer>
        <ChatWidget />
      </body>
    </html>
  );
}
