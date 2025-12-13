import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main>
      <div className="card max-w-3xl mx-auto">
        <h1 className="contact-title">Kontakt</h1>

        <p className="contact-desc">
          Haben Sie Fragen zu Camunda 8, Prozessautomatisierung oder AI Agents?
          Schreiben Sie mir – ich melde mich schnellstmöglich zurück.
        </p>

        <ContactForm />
      </div>
    </main>
  );
}

