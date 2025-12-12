export default function ContactPage() {
  return (
    <main>
      <div className="card">
        <h1 className="text-3xl font-bold mb-6">Kontakt</h1>

        <p className="mb-8 text-gray-700">
          Haben Sie Fragen oder benötigen Sie Unterstützung bei Camunda oder Prozessautomatisierung? 
          Schreiben Sie mir eine Nachricht – ich melde mich schnellstmöglich zurück.
        </p>

        <form
          action="https://formspree.io/f/xgvowkjn"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nachricht</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-primary"
          >
            Senden
          </button>
        </form>
      </div>
    </main>
  );
}

