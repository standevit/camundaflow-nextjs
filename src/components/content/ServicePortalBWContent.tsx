export default function ServicePortalBWContent() {
  return (
    <>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.75rem', fontWeight: '700' }}>
          Service-Portal Baden-Württemberg
        </h3>
        <p style={{ opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          Komm.ONE - Evia · Stuttgart · 2022
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
          Entwicklung und Automatisierung landesweiter Verwaltungsprozesse mit BPMN und DMN für das digitale 
          Service-Portal Baden-Württemberg.
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
            <strong style={{ color: '#667eea' }}>Backend:</strong> Java Microservices
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Prozesse:</strong> BPMN, DMN
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>API:</strong> REST/JSON
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Testing:</strong> Cypress E2E
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Build:</strong> Gradle mit Groovy-Plugin
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>CI/CD:</strong> Concourse
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>Frontend:</strong> Ajax Integration
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
          Besondere Leistungen
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong>Wiederverwendbares Gradle-Plugin:</strong> Eigenentwicklung eines Java/Gradle-Plugins zur 
            Standardisierung von Build- und Deployment-Prozessen für alle Teams (zentral über Nexus bereitgestellt)
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong>E2E-Testautomatisierung:</strong> Starke Erweiterung der Testabdeckung durch Cypress Custom 
            Commands und Page-Object-Model
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            BPMN/DMN-basierte Automatisierung komplexer Verwaltungsprozesse
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            Microservices-Architektur für landesweite Skalierung
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
          <strong style={{ color: '#667eea' }}>Senior Java Developer & BPMN-Spezialist:</strong> Entwicklung wiederverwendbarer Infrastruktur-Tools 
          für das gesamte Entwicklungsteam sowie E2E-Testautomatisierung.
        </p>
      </div>
    </>
  );
}
