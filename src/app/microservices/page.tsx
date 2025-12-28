import { Suspense } from "react";
import type { Metadata } from "next";
import MicroservicesContent from "@/components/MicroservicesContent";

export const metadata: Metadata = {
  title: "Microservices Orchestration | CamundaFlow",
  description: "Order Process Orchestration mit Microservices und Camunda. Skalierbare Prozessautomatisierung, Best Practices und Enterprise Patterns.",
  keywords: "Microservices, Order Processing, Camunda, Prozessautomatisierung, BPMN, Orchestration",
  openGraph: {
    title: "Microservices Order Process Orchestration | CamundaFlow",
    description: "Entdecken Sie wie Sie mit Microservices und Camunda 8 komplexe Geschäftsprozesse orchestrieren. Order Processing, Patterns und Best Practices.",
    url: "https://camundaflow.de/microservices?tab=order-process",
    type: "website",
    images: [
      {
        url: "https://camundaflow.de/og-order-process.png",
        width: 1200,
        height: 630,
        alt: "Order Process Orchestration Diagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Microservices Order Process Orchestration | CamundaFlow",
    description: "Order Processing mit Camunda und Microservices Patterns",
    images: ["https://camundaflow.de/og-order-process.png"],
  },
};

export default function MicroservicesPage() {
  return (
    <Suspense fallback={<div className="container"><div className="main-content"><div className="card">Učitavanje...</div></div></div>}>
      <div className="container">
        <MicroservicesContent />
      </div>
    </Suspense>
  );
}
