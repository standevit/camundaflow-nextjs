// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import ChatWidget from "@/components/ChatWidget";
import LanguageProvider from "@/components/LanguageProvider";
import AuthProvider from "@/components/AuthProvider";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

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
        <AuthProvider>
          <LanguageProvider>
            <HeaderNav />

            {/* SADRŽAJ STRANICA – ovo je {children} */}
            <main className="flex-1">
              {children}
            </main>

            <Footer />
            <ChatWidget />
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
