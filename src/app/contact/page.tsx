// src/app/contact/page.tsx
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Kontakt – Camunda Flow",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Isti header kao u svim HTML fajlovima */}
      <header>
        <nav>
          <a href="/" className="logo">
            <img src="/logo.svg" alt="Camunda Flow" height="46" />
          </a>
          <div className="menu">
            <a href="/">BPMN</a>
            <a href="/camunda">Camunda 8</a>
            <a href="/ai-agents">AI Agents</a>
            <a href="/model-context-protocol">Model Context Protocol</a>
            <a href="/leistungen">Leistungen</a>
            <a href="/contact" className="active">Kontakt</a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="container py-12">
          <div className="card max-w-2xl mx-auto">
            <h1 className="text-mb-2 text-center">Kontakt</h1>
            <p className="text-center text-xl mb-10 text-gray-600">
              Sie haben ein Projekt oder eine Frage? Schreiben Sie mir!
            </p>
            <ContactForm />
          </div>
        </div>
      </main>

      <footer>
        <p>
          © 2025 Camunda Flow •{" "}
          <a href="mailto:post@camundaflow.de">post@camundaflow.de</a>
        </p>
      </footer>
    </div>
  );
}
