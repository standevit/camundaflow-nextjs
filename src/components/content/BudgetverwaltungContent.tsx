export default function BudgetverwaltungContent() {
  return (
    <>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h2 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.8rem' }}>
          Budgetverwaltung für das Land Rheinland-Pfalz
        </h2>
        <p style={{ opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          Ministerium der Finanzen Rheinland-Pfalz · Mainz · 2023-2024
        </p>
      </div>
      
      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        borderLeft: '4px solid #667eea',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#667eea' }}>Projektübersicht</h3>
        <p>
          Gesamtkonzeption und Eigenentwicklung einer hochsicheren Budgetverwaltungsanwendung für das Land Rheinland-Pfalz 
          mit strengsten Sicherheitsanforderungen.
        </p>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>⚙️</span>
          Technologie-Stack
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Backend:</strong> Java 17, Spring Boot
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Legacy-Kern:</strong> JEE
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Desktop-Client:</strong> Swing
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Web-Prototyp:</strong> Vaadin
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Datenbank:</strong> JPA/Hibernate mit Envers
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Deployment:</strong> Kubernetes (Rancher)
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>CI/CD:</strong> Jenkins, Nexus, JIB
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Monitoring:</strong> Grafana
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Qualität:</strong> SonarQube
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>🏗️</span>
          Besondere Herausforderungen
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            Vollständige Architekturverantwortung für kritische Finanzdaten
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            Risikoanalyse kritischer Budgetprozesse mit Fachabteilungen
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            Lückenlose Audit-Trails mit Hibernate Envers
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            Containerisiertes Deployment auf Kubernetes
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            Automatisierte CI/CD-Pipelines
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            Umfangreiche Dokumentation für Behördenstandards
          </li>
        </ul>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '2px solid #667eea'
      }}>
        <h3 style={{ color: '#667eea', marginTop: 0 }}>
          👨‍💻 Verantwortungsbereich
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
          <strong style={{ color: '#667eea' }}>Senior Java Developer:</strong> Vollständige technische Konzeption, Implementierung und Deployment. 
          Direkte Zusammenarbeit mit Fachabteilungen des Finanzministeriums.
        </p>
      </div>
    </>
  );
}
