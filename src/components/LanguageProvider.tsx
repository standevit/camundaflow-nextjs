"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Messages = Record<string, string | string[]>;

const translations: Record<string, Messages> = {
  de: {
    contact_title: "Kontakt",
    contact_desc: "Haben Sie Fragen zu Camunda 8, Prozessautomatisierung oder AI Agents? Schreiben Sie mir – ich melde mich schnellstmöglich zurück.",
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
  },
  en: {
    contact_title: "Contact",
    contact_desc: "Do you have questions about Camunda 8, process automation, or AI agents? Write to me – I will get back to you as soon as possible.",
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
