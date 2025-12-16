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

    // AI Agents Index
    ai_agents_index_heading: "AI Agent",
    ai_agents_index_intro: "Ein autonomer, intelligenter Software-Baustein, der eigenständig Aufgaben wahrnimmt, Entscheidungen trifft und mit Menschen sowie anderen Systemen interagiert – angetrieben durch Large Language Models (LLMs) und Camunda 8 Orchestrierung.",
    ai_agents_index_what_heading: "Was macht ein AI Agent konkret?",
    ai_agents_index_understands_label: "Versteht",
    ai_agents_index_understands: "natürliche Sprache (Kunden) Anfragen (E-Mail, Chat, Ticket, Sprache)",
    ai_agents_index_decides_label: "Entscheidet",
    ai_agents_index_decides: "selbstständig, welcher Prozess gestartet werden soll (Intent-Erkennung)",
    ai_agents_index_acts_label: "Handelt",
    ai_agents_index_acts: "aktiv: ruft Services auf, schreibt in CRM/ERP, erstellt Tickets, bucht Termine",
    ai_agents_index_asks_label: "Fragt nach",
    ai_agents_index_asks: "bei Unsicherheit oder fehlenden Daten (statt falsch zu handeln)",
    ai_agents_index_learns_label: "Lernt",
    ai_agents_index_learns: "aus Feedback und historischen Fällen (wenn gewünscht)",
    ai_agents_index_controllable_label: "Bleibt kontrollierbar",
    ai_agents_index_controllable: "– jeder Schritt ist in Camunda nachvollziehbar und auditierbar",
    ai_agents_index_use_cases_heading: "Typische Einsatzbereiche 2025/2026",
    ai_agents_index_use_case_1: "Intelligenter Kundenservice (E-Mail & Chat komplett automatisiert)",
    ai_agents_index_use_case_2: "Schadensbearbeitung in Versicherungen",
    ai_agents_index_use_case_3: "Reklamationsmanagement im E-Commerce",
    ai_agents_index_use_case_4: "Onboarding neuer Mitarbeiter oder Kunden",
    ai_agents_index_use_case_5: "IT-Service-Desk (Ticket-Klassifikation + Selbstheilung)",
    ai_agents_index_why_camunda_heading: "Warum Camunda 8 + AI Agents die perfekte Kombination ist",
    ai_agents_index_benefit_1: "100 % Transparenz – jeder Agent-Schritt ist ein BPMN-Prozess",
    ai_agents_index_benefit_2: "Zero-Hallucination-Garantie durch klare Regeln und DMN-Entscheidungen",
    ai_agents_index_benefit_3: "Einfache Integration von OpenAI, Anthropic, Mistral, Llama 3, Gemini …",
    ai_agents_index_benefit_4: "Human-in-the-Loop bei Bedarf (Tasklist-Eskalation)",
    ai_agents_index_benefit_5: "Skalierbar auf Millionen von Interaktionen pro Tag (Zeebe)",
    ai_agents_index_conclusion_label: "Fazit:",
    ai_agents_index_conclusion: "Ein AI Agent ist kein Chatbot-Marketing-Gag – sondern ein vollwertiger, orchestrationsfähiger Mitarbeiter, der rund um die Uhr arbeitet und trotzdem voll unter Ihrer Kontrolle bleibt.",

    // Agents Camunda
    agents_camunda_heading: "AI Agents mit Camunda 8",
    agents_camunda_intro: "Autonome, zustandsbehaftete und langlaufende KI-Agenten – perfekt orchestriert mit Zeebe.",
    agents_camunda_why_heading: "Warum Camunda 8 ideal für AI Agents ist",
    agents_camunda_reason_1: "Langlaufende Prozesse (Stunden bis Wochen) ohne Timeout-Probleme",
    agents_camunda_reason_2: "Persistenter Zustand – der Agent 'erinnert' sich an alles",
    agents_camunda_reason_3: "Human-in-the-Loop bei Bedarf (Tasklist-Integration)",
    agents_camunda_reason_4: "Event-Driven: Reagiert sofort auf LLM-Antworten, E-Mails, API-Events",
    agents_camunda_reason_5: "Horizontale Skalierung auf Tausende parallele Agenten",
    agents_camunda_reason_6: "Einfache Integration von OpenAI, Anthropic, Mistral, Llama 3 via Job Worker",
    agents_camunda_use_cases_heading: "Typische Anwendungsfälle, die ich bereits umgesetzt habe",
    agents_camunda_use_case_1: "Autonomer Recruiting-Agent (CV-Analyse → E-Mail → Termin → Vertrag)",
    agents_camunda_use_case_2: "KI-gestützter Kundensupport mit Gedächtnis über Monate",
    agents_camunda_use_case_3: "Automatischer Research-Agent (Web → Zusammenfassung → Bericht)",
    agents_camunda_use_case_4: "Smart Contract Execution mit LLM-Entscheidungen",
    agents_camunda_use_case_5: "Multi-Agent-Systeme mit Supervisor-Worker-Architektur",
    agents_camunda_cta: "Ich baue für Sie produktionsreife, skalierbare AI Agents – komplett in Camunda 8, mit voller Transparenz und Monitoring in Operate/Optimize.",
    agents_camunda_cta_button: "AI Agent Projekt anfragen",

    // AI Customer Service
    ai_customer_service_intro_heading: "Intelligenter Kundenservice",
    ai_customer_service_intro_desc: "KI-gestützter Kundenservice, der häufige Anfragen automatisiert und komplexe Fälle an Menschen eskaliert.",
    ai_customer_service_intro_capabilities_heading: "Fähigkeiten",
    ai_customer_service_intro_capability_1: "Automatische E-Mail-Klassifikation und Antwort",
    ai_customer_service_intro_capability_2: "Kontextbewusste Chat-Antworten mit Eskalationswegen",
    ai_customer_service_intro_capability_3: "Fallerstellung und Routing in Backend-Systeme",
    ai_customer_service_intro_capability_4: "Integration mit Wissensdatenbanken für schnelle Antworten",
    ai_customer_service_intro_result: "Ergebnis: Schnellere Antwortzeiten, weniger manuelle Schritte und konsistente Kundenerfahrung.",
    ai_customer_service_intro_process_heading: "Prozessablauf",
    ai_customer_service_intro_process_step_1: "Der Prozess beginnt, sobald eine Kundenanfrage eingeht und von einer KI analysiert wird.",
    ai_customer_service_intro_process_step_2: "Drei spezialisierte AI-Module arbeiten parallel: Antwortgenerierung, Wissenssuche (RAG) und Kompensationsvorschlag.",
    ai_customer_service_intro_process_step_3: "Alle Ergebnisse werden zu einer vollständigen Antwort kombiniert.",
    ai_customer_service_intro_process_step_4: "Eine Qualitäts-KI prüft, ob die Antwort automatisch versendet werden kann.",
    ai_customer_service_intro_process_step_5: "Wenn nicht, übernimmt ein menschlicher Agent die Nachbearbeitung.",

    // MCP page
    mcp_title: "Model Context Protocol",
    mcp_option1: "Model Context Protocol",
    mcp_example: "MCP Beispiel",

    // MCP Index
    mcp_index_heading: "Model Context Protocol (MCP)",
    mcp_index_intro: "Ein aufkommender offener Standard, der es KI-Agenten ermöglicht, externe Tools und andere Agenten sicher zu entdecken, zu verstehen und zu nutzen — das 'USB-C der Agenten-Interoperabilität', das im Multi-Agenten-Ökosystem schnell an Bedeutung gewinnt.",
    mcp_index_what_heading: "Was ermöglicht MCP konkret?",
    mcp_index_discovers_label: "Entdeckt",
    mcp_index_discovers: "verfügbare Tools automatisch (keine hart-codierten Integrationen)",
    mcp_index_understands_label: "Versteht",
    mcp_index_understands: "was jedes Tool tut, seine Parameter und erforderliche Berechtigungen",
    mcp_index_calls_label: "Ruft",
    mcp_index_calls: "jedes MCP-kompatible Tool auf (Websuche, Dateisystem, GitHub, Datenbanken, Rechner, Wikis, APIs…)",
    mcp_index_works_label: "Funktioniert framework-übergreifend",
    mcp_index_works: "— LangChain, CrewAI, Autogen, LlamaIndex, Semantic Kernel und viele andere unterstützen oder planen MCP bereits",
    mcp_index_supports_label: "Unterstützt Human-in-the-Loop",
    mcp_index_supports: "— sensible Aktionen können vor der Ausführung eine explizite Benutzerfreigabe erfordern",
    mcp_index_enables_label: "Ermöglicht Multi-Agenten-Zusammenarbeit",
    mcp_index_enables: "via A2A (Agent-to-Agent) über dasselbe Protokoll",
    mcp_index_tools_heading: "Typische Tools, die heute via MCP verfügbar sind (2025/2026)",
    mcp_index_tool_1: "Fetch URL / Web Browser Tools",
    mcp_index_tool_2: "Dateisystem-Lese-/Schreiboperationen",
    mcp_index_tool_3: "GitHub (Issues, PRs, Repo-Zugriff)",
    mcp_index_tool_4: "DeepWiki / interne Wissensdatenbank-Suche",
    mcp_index_tool_5: "Zeit- und Datumskonvertierungen, Mathematik-Rechner",
    mcp_index_tool_6: "Beliebige REST/GraphQL-Services als MCP-Tool verpackt",
    mcp_index_tool_7: "Datenbank-Query-Tools (SQL, Vektor-DBs)",
    mcp_index_why_camunda_heading: "Warum Camunda 8 + MCP die perfekte Enterprise-Kombination ist",
    mcp_index_benefit_1_label: "100% Transparenz & Nachvollziehbarkeit",
    mcp_index_benefit_1: "— jeder MCP-Tool-Aufruf ist ein regulärer BPMN-Service-Task",
    mcp_index_benefit_2_label: "Eingebaute Leitplanken",
    mcp_index_benefit_2: "— DMN-Tabellen entscheiden, welche Tool-Aufrufe eine Benutzerbestätigung benötigen",
    mcp_index_benefit_3_label: "Keine Black-Box-Agenten",
    mcp_index_benefit_3: "— vollständige Nachvollziehbarkeit, was der Agent gesehen, entschieden und ausgeführt hat",
    mcp_index_benefit_4_label: "Human-in-the-Loop jederzeit möglich",
    mcp_index_benefit_4: "— Eskalation zur Tasklist mit einem Klick",
    mcp_index_benefit_5_label: "Agenten mischen & kombinieren",
    mcp_index_benefit_5: "— Camunda-Agenten neben OpenAI, Anthropic, Mistral oder jedem anderen MCP-kompatiblen Agenten verwenden",
    mcp_index_benefit_6_label: "Skaliert auf Millionen von Tool-Aufrufen pro Tag",
    mcp_index_benefit_6: "auf der Zeebe Cloud-Native-Engine",
    mcp_index_conclusion_label: "Fazit:",
    mcp_index_conclusion: "MCP ist nicht nur ein weiteres Integrationsformat — es ist der universelle Stecker, der es Unternehmen endlich ermöglicht, KI-Agenten sicher und kontrolliert echte Power zu geben, indem sie mit Hunderten von Tools verbunden werden, während alles transparent, nachvollziehbar und unter voller Prozess-Orchestrierungs-Kontrolle mit Camunda bleibt.",

    // MCP Content
    mcp_heading: "MCP Tool-Ausführung mit Benutzerbestätigung",
    mcp_intro: "Im Folgenden wird ein sicherer, kontrollierter BPMN-Prozess in Camunda 8 beschrieben, der es einem KI-Agenten ermöglicht, MCP-Tools (Model Context Protocol) nur nach expliziten Prüfungen und, falls erforderlich, Benutzerfreigabe zu verwenden.",
    mcp_step_1: "Ein Benutzer stellt eine Anfrage, und das System entscheidet, ob ein KI-Agent eingesetzt werden soll",
    mcp_step_2: "Der KI-Agent kann verschiedene MCP-Tools verwenden (z.B. DeepWiki, Zeit-Konvertierungen, Fetch URL, GitHub, Dateisystem)",
    mcp_step_3: "Für bestimmte Aktionen wird ein eingebetteter MCP-Subprozess gestartet, der prüft, ob die geplante Tool-Ausführung eine Benutzerbestätigung erfordert",
    mcp_step_4: "Falls Bestätigung erforderlich ist, wird der Benutzer um Freigabe gebeten und die Antwort wird über eine DMN-Entscheidungstabelle validiert",
    mcp_step_5: "Wenn die Ausführung erlaubt ist, führt der KI-Agent die Aktion mit dem jeweiligen MCP-Tool aus (z.B. Dateisystem); andernfalls endet der Subprozess mit \"MCP-Ausführung nicht erlaubt\"",
    mcp_step_6: "Abschließend erhält der Benutzer Feedback oder eine vollständige Zusammenfassung der Ergebnisse",

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

    // BPMN page
    bpmn_what_is: "Was ist BPMN?",
    bpmn_desc: "ist ein international anerkannter Standard zur grafischen Darstellung von Geschäftsprozessen – für Menschen und Maschinen lesbar.",
    bpmn_elements: "Zentrale Elemente von BPMN",
    bpmn_events: "– Start, Zwischen- und End-Ereignisse.",
    bpmn_tasks: "– manuelle oder automatische Aktivitäten.",
    bpmn_gateways: "– Verzweigungen und Zusammenführungen (exklusiv, parallel, eventbasiert).",
    bpmn_swimlanes: "Verantwortlichkeiten und Rollen abbilden.",
    bpmn_benefits_title: "Warum BPMN nutzen?",
    bpmn_benefits: "BPMN schafft eine gemeinsame Sprache zwischen Business und IT, verbessert Transparenz und ist die Grundlage für Workflow-Engines wie Camunda 8.",

    // Process Basics page
    process_basics_title: "Geschäftsprozesse – Was, Warum, Wie?",
    process_basics_intro: "Ein Geschäftsprozess ist eine Abfolge strukturierter Aktivitäten, die ein definiertes Ziel erreichen – etwa einen Auftrag abwickeln, eine Kundenanfrage bearbeiten oder eine Lieferung koordinieren.",
    process_basics_what_is: "Was ist ein Geschäftsprozess?",
    process_basics_what_is_desc: "Jedes Unternehmen arbeitet mit Prozessen, bewusst oder unbewusst. Typische Beispiele:",
    process_basics_example1: "Order-to-Cash: Bestellung bis Zahlung",
    process_basics_example2: "Onboarding neuer Mitarbeiter",
    process_basics_example3: "Support-Ticketbearbeitung",
    process_basics_why_model: "Warum Prozesse modellieren?",
    process_basics_transparency: "Transparenz",
    process_basics_transparency_desc: "Alle Beteiligten wissen, was wann passiert.",
    process_basics_optimization: "Optimierung",
    process_basics_optimization_desc: "Engpässe und Ineffizienzen werden sichtbar.",
    process_basics_automation: "Automatisierung",
    process_basics_automation_desc: "Teilschritte lassen sich digital steuern.",
    process_basics_compliance: "Compliance",
    process_basics_compliance_desc: "Nachvollziehbarkeit und Audit-Trails.",
    process_basics_three_levels: "Die drei Ebenen der Prozessmodellierung",
    process_basics_level1: "Strategische Ebene:",
    process_basics_level1_desc: "Grobe Übersicht, welche Hauptprozesse existieren.",
    process_basics_level2: "Operative Ebene:",
    process_basics_level2_desc: "Detaillierte Modellierung mit BPMN – wer, was, wann.",
    process_basics_level3: "Technische Ebene:",
    process_basics_level3_desc: "Ausführbare Prozesse in Workflow-Engines wie Camunda 8.",
    process_basics_camunda_note: "Mit BPMN und Camunda 8 decken Sie alle drei Ebenen ab – von der Business-Sicht bis zur vollautomatisierten Ausführung.",

    // Pizza Order page
    pizza_title: "Pizza-Bestellung: Ein einfacher BPMN-Prozess",
    pizza_intro: "Dieser Prozess zeigt, wie eine Pizza-Bestellung in BPMN modelliert wird:",
    pizza_step1: "Kunde gibt Bestellung auf",
    pizza_step2: "Zahlung wird geprüft",
    pizza_step3: "Pizza wird zubereitet",
    pizza_step4: "Pizza wird ausgeliefert",

    // Order Approval page
    order_approval_title: "Order Approval Process",
    order_approval_intro: "Ein typischer Genehmigungsprozess mit parallelen Prüfungen und exklusiven Entscheidungen:",
    order_approval_step1: "Bestellung wird eingereicht",
    order_approval_step2: "Automatische Risikoprüfung",
    order_approval_step3: "Manuelle Genehmigung durch Manager",
    order_approval_step4: "Bestellung wird bearbeitet oder abgelehnt",

    // Delivery Process page
    delivery_title: "Lieferprozess: Event-gesteuert",
    delivery_intro: "Dieser Prozess zeigt, wie Events genutzt werden, um auf externe Ereignisse zu reagieren:",
    delivery_step1: "Versandauftrag wird erstellt",
    delivery_step2: "Lagerbestand wird geprüft",
    delivery_step3: "Paket wird versendet",
    delivery_step4: "Lieferbestätigung wird ausgelöst (Event)",

    // B2B Order page
    b2b_order_title: "B2B-Bestellung mit Kreditprüfung",
    b2b_order_intro: "Ein realitätsnaher B2B-Prozess mit Kreditprüfung, Service-Tasks und Gateway-Logik:",
    b2b_order_step1: "Bestellung geht ein",
    b2b_order_step2: "Kreditwürdigkeit wird geprüft",
    b2b_order_step3: "Bei ausreichendem Kredit: Bestellung freigeben",
    b2b_order_step4: "Bei fehlendem Kredit: Bestellung ablehnen",

    // Camunda Index page
    camunda_index_heading: "Was ist Camunda 8?",
    camunda_index_intro: "Die führende Open-Source-Plattform für Prozessautomatisierung – cloud-native, skalierbar und entwicklerfreundlich.",
    camunda_index_components_heading: "Wichtige Komponenten",
    camunda_index_zeebe: "Die extrem skalierbare Workflow-Engine",
    camunda_index_operate: "Monitoring & Prozessübersicht",
    camunda_index_tasklist: "Bearbeitung von Human Tasks",
    camunda_index_optimize: "Process Intelligence & Heatmaps",
    camunda_index_dmn: "Entscheidungstabellen mit FEEL",
    camunda_index_benefits: "Vorteile: Open Source, ISO-Standards (BPMN/DMN), Kubernetes-native, Kafka-Integration.",

    // Workflow Automation page
    workflow_automation_heading: "Workflow-Automatisierung statt klassischer Programmierung",
    workflow_automation_traditional_heading: "Traditionelle Softwareentwicklung",
    workflow_automation_traditional_intro: "Bei klassischer Entwicklung (z. B. Java Spring Boot Monolith) ist der Prozessablauf im Quellcode 'vergraben':",
    workflow_automation_traditional_point1: "if-Abfragen, Schleifen, Exception-Handling verteilt über viele Klassen",
    workflow_automation_traditional_point2: "Nur Entwickler verstehen, wie der Gesamtprozess wirklich läuft",
    workflow_automation_traditional_point3: "Änderungen erfordern neuen Code, Build, Test, Deployment",
    workflow_automation_engine_heading: "Workflow-Engine-Ansatz (Camunda)",
    workflow_automation_engine_point1: "Der Prozessablauf ist explizit als Modell (BPMN-Diagramm) vorhanden",
    workflow_automation_engine_point2: "Fachabteilung und IT sehen exakt dasselbe Diagramm",
    workflow_automation_engine_point3: "Änderungen am Ablauf → nur Diagramm anpassen → sofort aktiv (kein Neubau)",
    workflow_automation_engine_point4: "Lang laufende Prozesse (Tage, Wochen, Monate) werden zuverlässig verwaltet",
    workflow_automation_comparison_heading: "Vergleichstabelle",
    workflow_automation_table_criterion: "Kriterium",
    workflow_automation_table_traditional: "Klassische Programmierung",
    workflow_automation_table_engine: "Workflow Engine",
    workflow_automation_table_visibility: "Sichtbarkeit des Prozesses",
    workflow_automation_table_visibility_trad: "Nur im Code",
    workflow_automation_table_visibility_engine: "Explizites Diagramm",
    workflow_automation_table_change_duration: "Änderungsdauer",
    workflow_automation_table_change_trad: "Tage bis Wochen",
    workflow_automation_table_change_engine: "Minuten bis Stunden",
    workflow_automation_table_long_running: "Lang laufende Prozesse",
    workflow_automation_table_long_running_trad: "Komplex (eigene Persistenz)",
    workflow_automation_table_long_running_engine: "Out-of-the-box",
    workflow_automation_table_transparency: "Transparenz für Fachbereich",
    workflow_automation_table_transparency_trad: "Sehr gering",
    workflow_automation_table_transparency_engine: "Sehr hoch",

    // Process Orchestration page
    process_orchestration_heading: "Prozess-Orchestrierung in der Microservices-Welt",
    process_orchestration_intro: "Microservices lösen das Monolith-Problem – erzeugen aber ein neues: Wer koordiniert die ganzen kleinen Dienste?",
    process_orchestration_problem_heading: "Das Orchestrierungsproblem",
    process_orchestration_problem_example: "Beispiel 'Bestellung abschließen':",
    process_orchestration_step1: "Bestellung anlegen (Order Service)",
    process_orchestration_step2: "Zahlung einziehen (Payment Service)",
    process_orchestration_step3: "Lager reservieren (Inventory Service)",
    process_orchestration_step4: "Versand beauftragen (Shipping Service)",
    process_orchestration_step5: "Kunde benachrichtigen (Notification Service)",
    process_orchestration_problem_chaos: "Wenn jeder Service seine Logik selbst implementiert, entsteht schnell verteilter Monolith und Saga-Chaos.",
    process_orchestration_solution_heading: "Lösung: Zentrale Prozess-Engine als 'Dirigent'",
    process_orchestration_solution_point1: "Camunda führt den BPMN-Prozess aus",
    process_orchestration_solution_point2: "Jeder Microservice stellt nur seinen fachlichen Teil bereit (z. B. REST/GRPC-Endpoint)",
    process_orchestration_solution_point3: "Camunda ruft die Services in der richtigen Reihenfolge auf, wartet, behandelt Timeouts und Kompensationsaktionen",
    process_orchestration_benefits_heading: "Vorteile",
    process_orchestration_benefit1: "Ein zentrales, verständliches Ablaufmodell",
    process_orchestration_benefit2: "Automatische Kompensation bei Fehlern (Saga-Pattern out-of-the-box)",
    process_orchestration_benefit3: "End-to-end Monitoring und Transparenz",
    process_orchestration_benefit4: "Einfache Anpassung der Reihenfolge ohne Code-Änderung an den Services",

    // Human-Centric page
    human_centric_heading: "Der Mensch bleibt im Mittelpunkt",
    human_centric_intro: "Nicht jeder Schritt lässt sich automatisieren – und das ist auch gut so!",
    human_centric_user_tasks_heading: "User Tasks in BPMN",
    human_centric_user_tasks_intro: "An bestimmten Stellen im Prozess wartet die Engine auf eine menschliche Entscheidung oder Bearbeitung:",
    human_centric_example1: "Freigabe einer Bestellung über 10.000 €",
    human_centric_example2: "Prüfung eines Versicherungsschadens",
    human_centric_example3: "Genehmigung eines Urlaubsantrags",
    human_centric_tools_heading: "Camunda Tasklist & Cockpit",
    human_centric_tasklist: "einfache To-Do-Liste für Mitarbeiter (Web-App oder mobil)",
    human_centric_cockpit: "für Administratoren: laufende Prozesse überwachen, bei Bedarf eingreifen, Variablen ändern",
    human_centric_operate: "Business-Monitoring: KPIs, SLA-Überwachung, Bottleneck-Analyse",
    human_centric_hybrid_heading: "Hybrid aus Automatisierung und Mensch",
    human_centric_hybrid_desc: "Die Stärke von Camunda liegt genau hier: vollautomatisierte Schritte und menschliche Interaktion fließend im selben Prozessmodell.",

    // Scalability page
    scalability_heading: "Horizontale Skalierbarkeit mit Zeebe",
    scalability_intro: "Millionen Prozessinstanzen pro Tag – ohne Single Point of Failure.",
    scalability_why_heading: "Warum Camunda 8 so skalierbar ist",
    scalability_point1: "Zeebe speichert Zustand außerhalb der DB → keine I/O-Engpässe",
    scalability_point2: "Horizontale Skalierung durch Hinzufügen weiterer Nodes",
    scalability_point3: "Event-Streaming-Architektur (Kafka-kompatibel)",
    scalability_point4: "Kubernetes-native mit Auto-Scaling",
    scalability_point5: "99.99 % Verfügbarkeit durch verteilte Architektur",
    scalability_use_cases: "Perfekt für Kreditprüfung, Onboarding, IoT oder Microservices-Orchestrierung.",
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

    // AI Agents Index
    ai_agents_index_heading: "AI Agents",
    ai_agents_index_intro: "An autonomous, intelligent software component that performs tasks, makes decisions and interacts with people and systems — powered by large language models (LLMs) and orchestrated by Camunda 8.",
    ai_agents_index_what_heading: "What does an AI agent do?",
    ai_agents_index_understands_label: "Understands",
    ai_agents_index_understands: "natural language customer requests (email, chat, ticket, voice)",
    ai_agents_index_decides_label: "Decides",
    ai_agents_index_decides: "which process to start (intent detection)",
    ai_agents_index_acts_label: "Acts",
    ai_agents_index_acts: ": invokes services, writes to CRM/ERP, creates tickets, schedules appointments",
    ai_agents_index_asks_label: "Asks for clarification",
    ai_agents_index_asks: "when uncertain (instead of acting incorrectly)",
    ai_agents_index_learns_label: "Learns",
    ai_agents_index_learns: "from feedback and historical cases (if desired)",
    ai_agents_index_controllable_label: "Remains controllable",
    ai_agents_index_controllable: "— every step is traceable in Camunda",
    ai_agents_index_use_cases_heading: "Typical use cases (2025/2026)",
    ai_agents_index_use_case_1: "Intelligent customer service (automated email & chat)",
    ai_agents_index_use_case_2: "Claims handling in insurance",
    ai_agents_index_use_case_3: "Complaint management in e-commerce",
    ai_agents_index_use_case_4: "Employee or customer onboarding",
    ai_agents_index_use_case_5: "IT service desk (ticket classification + self-healing)",
    ai_agents_index_why_camunda_heading: "Why Camunda 8 + AI Agents?",
    ai_agents_index_benefit_1: "100% transparency — every agent step is a BPMN process",
    ai_agents_index_benefit_2: "Reduced hallucinations through clear rules and DMN decisions",
    ai_agents_index_benefit_3: "Easy integration with OpenAI, Anthropic, Mistral, Llama 3, Gemini …",
    ai_agents_index_benefit_4: "Human-in-the-loop when needed (Tasklist escalation)",
    ai_agents_index_benefit_5: "Scales to millions of interactions per day (Zeebe)",
    ai_agents_index_conclusion_label: "Summary:",
    ai_agents_index_conclusion: "An AI agent is more than a chatbot — it is an orchestration-capable, reliable worker under full process control.",

    // Agents Camunda
    agents_camunda_heading: "Agents + Camunda",
    agents_camunda_intro: "How AI agents and Camunda 8 can work together to provide reliable, auditable automation at scale.",
    agents_camunda_why_heading: "Integration patterns",
    agents_camunda_reason_1: "Agent starts a BPMN process to orchestrate long-running tasks",
    agents_camunda_reason_2: "Camunda provides visibility and approvals for sensitive actions",
    agents_camunda_reason_3: "DMN tables provide rule-based guardrails for agent decisions",
    agents_camunda_reason_4: "Event-driven architecture: Reacts to LLM responses, emails, API events",
    agents_camunda_reason_5: "Horizontal scaling to thousands of parallel agents",
    agents_camunda_reason_6: "Easy integration with OpenAI, Anthropic, Mistral, Llama 3 via job workers",
    agents_camunda_use_cases_heading: "Use cases implemented",
    agents_camunda_use_case_1: "Autonomous recruiting agent (CV analysis → Email → Meeting → Contract)",
    agents_camunda_use_case_2: "AI-powered customer support with memory over months",
    agents_camunda_use_case_3: "Automated research agent (Web → Summary → Report)",
    agents_camunda_use_case_4: "Smart contract execution with LLM decisions",
    agents_camunda_use_case_5: "Multi-agent systems with supervisor-worker architecture",
    agents_camunda_cta: "Combining agents with process automation brings the best of both worlds: intelligent decision-making plus enterprise-grade governance.",
    agents_camunda_cta_button: "Request AI Agent Project",

    // AI Customer Service
    ai_customer_service_intro_heading: "Intelligent Customer Service",
    ai_customer_service_intro_desc: "AI-powered customer service that automates common requests while escalating complex cases to humans.",
    ai_customer_service_intro_capabilities_heading: "Capabilities",
    ai_customer_service_intro_capability_1: "Automatic email classification and response",
    ai_customer_service_intro_capability_2: "Context-aware chat responses with escalation paths",
    ai_customer_service_intro_capability_3: "Case creation and routing into backend systems",
    ai_customer_service_intro_capability_4: "Integration with knowledge bases for fast answers",
    ai_customer_service_intro_result: "Result: faster response times, fewer manual steps and consistent customer experience.",
    ai_customer_service_intro_process_heading: "Process Flow",
    ai_customer_service_intro_process_step_1: "The process starts when a customer request arrives and is analyzed by AI.",
    ai_customer_service_intro_process_step_2: "Three specialized AI modules work in parallel: response generation, knowledge search (RAG), and compensation suggestions.",
    ai_customer_service_intro_process_step_3: "All results are combined into a complete response.",
    ai_customer_service_intro_process_step_4: "A quality AI checks whether the response can be sent automatically.",
    ai_customer_service_intro_process_step_5: "If not, a human agent takes over for post-processing.",

    // MCP page
    mcp_title: "Model Context Protocol",
    mcp_option1: "Model Context Protocol",
    mcp_example: "MCP Example",

    // MCP Index
    mcp_index_heading: "Model Context Protocol (MCP)",
    mcp_index_intro: "An emerging open standard that enables AI agents to securely discover, understand, and use external tools and other agents — the \"USB-C of agent interoperability\" quickly gaining traction in the multi-agent ecosystem.",
    mcp_index_what_heading: "What does MCP enable?",
    mcp_index_discovers_label: "Discovers",
    mcp_index_discovers: "available tools automatically (no hard-coded integrations)",
    mcp_index_understands_label: "Understands",
    mcp_index_understands: "what each tool does, its parameters and required permissions",
    mcp_index_calls_label: "Calls",
    mcp_index_calls: "any MCP-compatible tool (web search, filesystem, GitHub, databases, calculators, wikis, APIs…)",
    mcp_index_works_label: "Works across frameworks",
    mcp_index_works: "— LangChain, CrewAI, Autogen, LlamaIndex, Semantic Kernel and many others support or plan MCP",
    mcp_index_supports_label: "Supports human-in-the-loop",
    mcp_index_supports: "— sensitive actions can require explicit user approval before execution",
    mcp_index_enables_label: "Enables multi-agent collaboration",
    mcp_index_enables: "via A2A (Agent-to-Agent) over the same protocol",
    mcp_index_tools_heading: "Typical tools available via MCP today (2025/2026)",
    mcp_index_tool_1: "Fetch URL / Web Browser Tools",
    mcp_index_tool_2: "Filesystem read/write operations",
    mcp_index_tool_3: "GitHub (Issues, PRs, Repo access)",
    mcp_index_tool_4: "DeepWiki / internal knowledge base search",
    mcp_index_tool_5: "Time and date conversions, math calculators",
    mcp_index_tool_6: "Any REST/GraphQL services wrapped as MCP tool",
    mcp_index_tool_7: "Database query tools (SQL, Vector DBs)",
    mcp_index_why_camunda_heading: "Why Camunda 8 + MCP is the perfect enterprise combination",
    mcp_index_benefit_1_label: "100% Transparency & Traceability",
    mcp_index_benefit_1: "— every MCP tool call is a regular BPMN service task",
    mcp_index_benefit_2_label: "Built-in guardrails",
    mcp_index_benefit_2: "— DMN tables decide which tool calls require user confirmation",
    mcp_index_benefit_3_label: "No black-box agents",
    mcp_index_benefit_3: "— complete traceability of what the agent saw, decided and executed",
    mcp_index_benefit_4_label: "Human-in-the-loop anytime",
    mcp_index_benefit_4: "— escalation to Tasklist with one click",
    mcp_index_benefit_5_label: "Mix & match agents",
    mcp_index_benefit_5: "— use Camunda agents alongside OpenAI, Anthropic, Mistral or any other MCP-compatible agent",
    mcp_index_benefit_6_label: "Scales to millions of tool calls per day",
    mcp_index_benefit_6: "on the Zeebe cloud-native engine",
    mcp_index_conclusion_label: "Conclusion:",
    mcp_index_conclusion: "MCP is a universal connector that lets enterprises safely give AI agents real capabilities while keeping everything transparent and auditable under process orchestration control with Camunda.",

    // MCP Content
    mcp_heading: "MCP Tool Execution with User Confirmation",
    mcp_intro: "The following describes a secure, governed BPMN process in Camunda 8 that allows an AI agent to use MCP tools (Model Context Protocol) only after explicit checks and, if necessary, user approval.",
    mcp_step_1: "A user submits a request, and the system decides whether an AI agent should be deployed",
    mcp_step_2: "The AI agent can use various MCP tools (e.g., DeepWiki, Time Conversions, Fetch URL, GitHub, Filesystem)",
    mcp_step_3: "For certain actions, an embedded MCP sub-process is started that checks whether the planned tool execution requires user confirmation",
    mcp_step_4: "If confirmation is required, the user is asked for approval and the answer is validated via a DMN decision table",
    mcp_step_5: "If execution is allowed, the AI agent performs the action using the respective MCP tool (e.g., Filesystem); otherwise the sub-process ends with \"MCP execution not allowed\"",
    mcp_step_6: "Finally, the user receives feedback or a complete summary of the results",

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

    // BPMN page
    bpmn_what_is: "What is BPMN?",
    bpmn_desc: "is an internationally recognized standard for graphically representing business processes – readable by both humans and machines.",
    bpmn_elements: "Core Elements of BPMN",
    bpmn_events: "– Start, intermediate, and end events.",
    bpmn_tasks: "– manual or automated activities.",
    bpmn_gateways: "– Branches and merges (exclusive, parallel, event-based).",
    bpmn_swimlanes: "Represent responsibilities and roles.",
    bpmn_benefits_title: "Why Use BPMN?",
    bpmn_benefits: "BPMN creates a common language between business and IT, improves transparency, and is the foundation for workflow engines like Camunda 8.",

    // Process Basics page
    process_basics_title: "Business Processes – What, Why, How?",
    process_basics_intro: "A business process is a sequence of structured activities that achieve a defined goal – such as processing an order, handling a customer inquiry, or coordinating a delivery.",
    process_basics_what_is: "What is a Business Process?",
    process_basics_what_is_desc: "Every company works with processes, consciously or unconsciously. Typical examples:",
    process_basics_example1: "Order-to-Cash: From order to payment",
    process_basics_example2: "Onboarding new employees",
    process_basics_example3: "Support ticket processing",
    process_basics_why_model: "Why Model Processes?",
    process_basics_transparency: "Transparency",
    process_basics_transparency_desc: "All stakeholders know what happens when.",
    process_basics_optimization: "Optimization",
    process_basics_optimization_desc: "Bottlenecks and inefficiencies become visible.",
    process_basics_automation: "Automation",
    process_basics_automation_desc: "Sub-steps can be digitally controlled.",
    process_basics_compliance: "Compliance",
    process_basics_compliance_desc: "Traceability and audit trails.",
    process_basics_three_levels: "The Three Levels of Process Modeling",
    process_basics_level1: "Strategic Level:",
    process_basics_level1_desc: "High-level overview of which main processes exist.",
    process_basics_level2: "Operational Level:",
    process_basics_level2_desc: "Detailed modeling with BPMN – who, what, when.",
    process_basics_level3: "Technical Level:",
    process_basics_level3_desc: "Executable processes in workflow engines like Camunda 8.",
    process_basics_camunda_note: "With BPMN and Camunda 8, you cover all three levels – from business perspective to fully automated execution.",

    // Pizza Order page
    pizza_title: "Pizza Order: A Simple BPMN Process",
    pizza_intro: "This process shows how a pizza order is modeled in BPMN:",
    pizza_step1: "Customer places order",
    pizza_step2: "Payment is verified",
    pizza_step3: "Pizza is prepared",
    pizza_step4: "Pizza is delivered",

    // Order Approval page
    order_approval_title: "Order Approval Process",
    order_approval_intro: "A typical approval process with parallel checks and exclusive decisions:",
    order_approval_step1: "Order is submitted",
    order_approval_step2: "Automatic risk assessment",
    order_approval_step3: "Manual approval by manager",
    order_approval_step4: "Order is processed or rejected",

    // Delivery Process page
    delivery_title: "Delivery Process: Event-Driven",
    delivery_intro: "This process shows how events are used to react to external occurrences:",
    delivery_step1: "Shipping order is created",
    delivery_step2: "Inventory is checked",
    delivery_step3: "Package is shipped",
    delivery_step4: "Delivery confirmation is triggered (Event)",

    // B2B Order page
    b2b_order_title: "B2B Order with Credit Check",
    b2b_order_intro: "A realistic B2B process with credit check, service tasks, and gateway logic:",
    b2b_order_step1: "Order is received",
    b2b_order_step2: "Creditworthiness is checked",
    b2b_order_step3: "If sufficient credit: Approve order",
    b2b_order_step4: "If insufficient credit: Reject order",

    // Camunda Index page
    camunda_index_heading: "What is Camunda 8?",
    camunda_index_intro: "The leading open-source platform for process automation — cloud-native, scalable and developer-friendly.",
    camunda_index_components_heading: "Key components",
    camunda_index_zeebe: "The highly scalable workflow engine",
    camunda_index_operate: "Monitoring & process overview",
    camunda_index_tasklist: "Handling human tasks",
    camunda_index_optimize: "Process intelligence & heatmaps",
    camunda_index_dmn: "Decision tables with FEEL",
    camunda_index_benefits: "Benefits: Open Source, industry standards (BPMN/DMN), Kubernetes-native, Kafka integration.",

    // Workflow Automation page
    workflow_automation_heading: "Workflow Automation instead of Traditional Programming",
    workflow_automation_traditional_heading: "Traditional Software Development",
    workflow_automation_traditional_intro: "In traditional development (e.g., Java Spring Boot monolith), the process flow is \"buried\" in the source code:",
    workflow_automation_traditional_point1: "if-statements, loops, exception handling spread across many classes",
    workflow_automation_traditional_point2: "Only developers understand how the overall process really works",
    workflow_automation_traditional_point3: "Changes require new code, build, test, deployment",
    workflow_automation_engine_heading: "Workflow Engine Approach (Camunda)",
    workflow_automation_engine_point1: "The process flow exists explicitly as a model (BPMN diagram)",
    workflow_automation_engine_point2: "Business department and IT see exactly the same diagram",
    workflow_automation_engine_point3: "Changes to the flow → just adjust the diagram → immediately active (no rebuild)",
    workflow_automation_engine_point4: "Long-running processes (days, weeks, months) are reliably managed",
    workflow_automation_comparison_heading: "Comparison Table",
    workflow_automation_table_criterion: "Criterion",
    workflow_automation_table_traditional: "Traditional Programming",
    workflow_automation_table_engine: "Workflow Engine",
    workflow_automation_table_visibility: "Process Visibility",
    workflow_automation_table_visibility_trad: "Only in code",
    workflow_automation_table_visibility_engine: "Explicit diagram",
    workflow_automation_table_change_duration: "Change Duration",
    workflow_automation_table_change_trad: "Days to weeks",
    workflow_automation_table_change_engine: "Minutes to hours",
    workflow_automation_table_long_running: "Long-running Processes",
    workflow_automation_table_long_running_trad: "Complex (own persistence)",
    workflow_automation_table_long_running_engine: "Out-of-the-box",
    workflow_automation_table_transparency: "Transparency for Business",
    workflow_automation_table_transparency_trad: "Very low",
    workflow_automation_table_transparency_engine: "Very high",

    // Process Orchestration page
    process_orchestration_heading: "Process Orchestration in the Microservices World",
    process_orchestration_intro: "Microservices solve the monolith problem – but create a new one: Who coordinates all the small services?",
    process_orchestration_problem_heading: "The Orchestration Problem",
    process_orchestration_problem_example: "Example \"Complete Order\":",
    process_orchestration_step1: "Create order (Order Service)",
    process_orchestration_step2: "Collect payment (Payment Service)",
    process_orchestration_step3: "Reserve inventory (Inventory Service)",
    process_orchestration_step4: "Request shipping (Shipping Service)",
    process_orchestration_step5: "Notify customer (Notification Service)",
    process_orchestration_problem_chaos: "If each service implements its logic itself, distributed monolith and saga chaos quickly arise.",
    process_orchestration_solution_heading: "Solution: Central Process Engine as \"Conductor\"",
    process_orchestration_solution_point1: "Camunda executes the BPMN process",
    process_orchestration_solution_point2: "Each microservice only provides its functional part (e.g., REST/GRPC endpoint)",
    process_orchestration_solution_point3: "Camunda calls the services in the correct order, waits, handles timeouts and compensation actions",
    process_orchestration_benefits_heading: "Benefits",
    process_orchestration_benefit1: "A central, understandable flow model",
    process_orchestration_benefit2: "Automatic compensation on errors (Saga pattern out-of-the-box)",
    process_orchestration_benefit3: "End-to-end monitoring and transparency",
    process_orchestration_benefit4: "Easy adjustment of the sequence without code changes to the services",

    // Human-Centric page
    human_centric_heading: "Humans Remain at the Center",
    human_centric_intro: "Not every step can be automated – and that's a good thing!",
    human_centric_user_tasks_heading: "User Tasks in BPMN",
    human_centric_user_tasks_intro: "At certain points in the process, the engine waits for human decision or action:",
    human_centric_example1: "Approval of an order over €10,000",
    human_centric_example2: "Review of an insurance claim",
    human_centric_example3: "Approval of a vacation request",
    human_centric_tools_heading: "Camunda Tasklist & Cockpit",
    human_centric_tasklist: "simple to-do list for employees (web app or mobile)",
    human_centric_cockpit: "for administrators: monitor running processes, intervene if needed, change variables",
    human_centric_operate: "Business monitoring: KPIs, SLA monitoring, bottleneck analysis",
    human_centric_hybrid_heading: "Hybrid of Automation and Human",
    human_centric_hybrid_desc: "Camunda's strength lies exactly here: fully automated steps and human interaction seamlessly in the same process model.",

    // Scalability page
    scalability_heading: "Horizontal Scalability with Zeebe",
    scalability_intro: "Millions of process instances per day – without single point of failure.",
    scalability_why_heading: "Why Camunda 8 is so Scalable",
    scalability_point1: "Zeebe stores state outside the DB → no I/O bottlenecks",
    scalability_point2: "Horizontal scaling by adding more nodes",
    scalability_point3: "Event-streaming architecture (Kafka-compatible)",
    scalability_point4: "Kubernetes-native with auto-scaling",
    scalability_point5: "99.99% availability through distributed architecture",
    scalability_use_cases: "Perfect for credit checks, onboarding, IoT, or microservices orchestration.",
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
