"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Messages = Record<string, string | string[]>;

const translations: Record<string, Messages> = {
  de: {
    // Contact page
    contact_title: "Kontakt",
    contact_desc: "Haben Sie Fragen zu Camunda 8, Prozessautomatisierung oder AI Agents? Schreiben Sie mir – ich melde mich schnellstmöglich zurück.",
    
    // Contact form
    name: "Name *",
    email: "E-Mail *",
    phone: "Telefon",
    phone_placeholder: "Optional",
    company: "Firmenname *",
    topic_label: "Thema / Leistung *",
    topic_options: [
      "BPMN-Entwicklung",
      "Camunda-Implementierung",
      "Microservices-Architektur",
      "Prozessautomatisierung",
      "Sonstiges",
    ],
    other_description: "Beschreibung (Sonstiges) *",
    message: "Nachricht *",
    required_note: "Pflichtfelder",
    sending: "Sende…",
    send: "Nachricht senden",
    success: "Vielen Dank! Ich melde mich bald.",
    error: "Fehler – bitte direkt an post@camundaflow.de",

    // Home page
    home_title: "BPMN Beispiele",
    select_examples: "Beispiele auswählen",
    bpmn_20: "BPMN 2.0",
    process_modeling: "Prozessmodellierung",
    pizza_order: "Pizza Bestellung",
    order_approval: "Order Approval",
    event_driven: "Event Driven Process",
    webshop: "Webshop Service",
    ai_agents_link: "AI Agents",

    // Camunda page
    camunda_title: "Camunda 8",
    what_is_camunda8: "Was ist Camunda 8?",
    workflow_automation: "Workflow Automation",
    process_orchestration: "Process Orchestration",
    user_tasks_cockpit: "User Tasks & Cockpit",
    scalability: "Skalierbarkeit",

    // AI Agents page
    ai_agents_title: "AI Agents",
    ai_agents_opt1: "AI Agents",
    ai_camunda: "AI & Camunda",
    intelligent_customer_service: "Intelligenter Kundenservice",

    // MCP page
    mcp_title: "Model Context Protocol",
    mcp_option1: "Model Context Protocol",
    mcp_example: "MCP Beispiel",

    // Leistungen page
    leistungen_title: "Meine Leistungen",
    leistungen_desc: "Von der Beratung bis zur produktiven Lösung – alles aus einer Hand.",
    architecture_consulting: "Architektur-Beratung",
    architecture_desc: "Konzeption skalierbarer Camunda-8-Lösungen inkl. Integration mit Kafka & Microservices",
    implementation: "Implementierung",
    implementation_desc: "BPMN-Modellierung, DMN-Regeln, Custom Connectors (Java/Node.js), POC bis Production",
    migration: "Migration Camunda 7 → 8",
    migration_desc: "Sichere Migration mit minimaler Downtime und automatisierter Tests",
    training: "Schulungen & Optimierung",
    training_desc: "Workshops für Entwickler & Fachabteilungen, Performance-Tuning, Operate/Optimize-Setup",
    request_quote: "Unverbindlich anfragen →",

    // Header & Navigation
    nav_bpmn: "BPMN",
    nav_camunda: "Camunda 8",
    nav_ai_agents: "AI Agents",
    nav_mcp: "Model Context Protocol",
    nav_leistungen: "Leistungen",
    nav_contact: "Kontakt",

    // Footer
    footer_year: "© 2025 Camunda Flow",
    footer_email: "post@camundaflow.de",
  },
  en: {
    // Contact page
    contact_title: "Contact",
    contact_desc: "Do you have questions about Camunda 8, process automation, or AI agents? Write to me – I will get back to you as soon as possible.",
    
    // Contact form
    name: "Name *",
    email: "Email *",
    phone: "Phone",
    phone_placeholder: "Optional",
    company: "Company name *",
    topic_label: "Topic / Service *",
    topic_options: [
      "BPMN Development",
      "Camunda Implementation",
      "Microservices Architecture",
      "Process Automation",
      "Other",
    ],
    other_description: "Description (Other) *",
    message: "Message *",
    required_note: "* required fields",
    sending: "Sending…",
    send: "Send message",
    success: "Thanks! I will get back to you soon.",
    error: "Error – please contact post@camundaflow.de",

    // Home page
    home_title: "BPMN Examples",
    select_examples: "Select examples",
    bpmn_20: "BPMN 2.0",
    process_modeling: "Process Modeling",
    pizza_order: "Pizza Order",
    order_approval: "Order Approval",
    event_driven: "Event Driven Process",
    webshop: "Webshop Service",
    ai_agents_link: "AI Agents",

    // Camunda page
    camunda_title: "Camunda 8",
    what_is_camunda8: "What is Camunda 8?",
    workflow_automation: "Workflow Automation",
    process_orchestration: "Process Orchestration",
    user_tasks_cockpit: "User Tasks & Cockpit",
    scalability: "Scalability",

    // AI Agents page
    ai_agents_title: "AI Agents",
    ai_agents_opt1: "AI Agents",
    ai_camunda: "AI & Camunda",
    intelligent_customer_service: "Intelligent Customer Service",

    // MCP page
    mcp_title: "Model Context Protocol",
    mcp_option1: "Model Context Protocol",
    mcp_example: "MCP Example",

    // Leistungen page
    leistungen_title: "My Services",
    leistungen_desc: "From consulting to production-ready solutions – all from one source.",
    architecture_consulting: "Architecture Consulting",
    architecture_desc: "Design of scalable Camunda 8 solutions including integration with Kafka & microservices",
    implementation: "Implementation",
    implementation_desc: "BPMN modeling, DMN rules, custom connectors (Java/Node.js), POC to production",
    migration: "Migration Camunda 7 → 8",
    migration_desc: "Safe migration with minimal downtime and automated testing",
    training: "Training & Optimization",
    training_desc: "Workshops for developers & business units, performance tuning, Operate/Optimize setup",
    request_quote: "Request quote →",

    // Header & Navigation
    nav_bpmn: "BPMN",
    nav_camunda: "Camunda 8",
    nav_ai_agents: "AI Agents",
    nav_mcp: "Model Context Protocol",
    nav_leistungen: "Services",
    nav_contact: "Contact",

    // Footer
    footer_year: "© 2025 Camunda Flow",
    footer_email: "post@camundaflow.de",
  },
};

type ContextType = {
  locale: string;
  setLocale: (l: string) => void;
  t: (key: string) => string | string[];
  getArray: (key: string) => string[];
};

const I18nContext = createContext<ContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>("de");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("locale");
      if (stored) setLocaleState(stored);
    } catch {}
  }, []);

  function setLocale(l: string) {
    setLocaleState(l);
    try {
      localStorage.setItem("locale", l);
    } catch {}
  }

  function t(key: string) {
    const msg = translations[locale]?.[key];
    if (typeof msg === "string") return msg;
    return "";
  }

  function getArray(key: string) {
    const msg = translations[locale]?.[key];
    if (Array.isArray(msg)) return msg;
    return [];
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, getArray }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}

export default LanguageProvider;
