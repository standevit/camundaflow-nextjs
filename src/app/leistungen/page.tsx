export const metadata = {
  title: "Leistungen – Camunda Flow",
};

export default function LeistungenPage() {
  return (
    <div className="container">
      <main className="main-content">
        <div className="card">
          <h2>Meine Leistungen</h2>
          <p style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 3rem" }}>
            Von der Beratung bis zur produktiven Lösung – alles aus einer Hand.
          </p>

          <div className="grid">
            <div className="leistungen-card">
              <h3>Architektur-Beratung</h3>
              <p>
                Konzeption skalierbarer Camunda-8-Lösungen inkl. Integration mit
                Kafka & Microservices
              </p>
            </div>

            <div className="leistungen-card">
              <h3>Implementierung</h3>
              <p>
                BPMN-Modellierung, DMN-Regeln, Custom Connectors (Java/Node.js),
                POC bis Production
              </p>
            </div>

            <div className="leistungen-card">
              <h3>Migration Camunda 7 → 8</h3>
              <p>
                Sichere Migration mit minimaler Downtime und automatisierter Tests
              </p>
            </div>

            <div className="leistungen-card">
              <h3>Schulungen & Optimierung</h3>
              <p>
                Workshops für Entwickler & Fachabteilungen, Performance-Tuning,
                Operate/Optimize-Setup
              </p>
            </div>
          </div>

          <a href="/contact" className="btn-primary">
            Unverbindlich anfragen →
          </a>
        </div>
      </main>
    </div>
  );
}

