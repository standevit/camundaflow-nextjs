// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";

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
        {/* Ovo je ključ – svi stilovi i skripte iz originalnog index.html */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bpmn-js@17.8.1/dist/bpmn-navigated-viewer.development.js" async></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
