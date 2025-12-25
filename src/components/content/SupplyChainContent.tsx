import { useTranslation } from "@/components/LanguageProvider";

export default function SupplyChainContent() {
  const { t } = useTranslation();
  
  return (
    <>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
          {t('ref_supply_title')}
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          {t("ref_supply_company")}
        </p>
      </div>
      
      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        borderLeft: '4px solid #667eea',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#667eea' }}>{t("ref_overview")}</h3>
        <p>
          {t("ref_supply_overview")}
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
          {t("ref_tech_stack")}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>{t("ref_backend")}</strong> Java 21, Spring Boot 3
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>{t("ref_frontend")}</strong> Angular
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>{t("ref_orchestration")}</strong> Camunda BPM
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>{t("ref_messaging")}</strong> RabbitMQ (Event-Driven)
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>{t("ref_api")}</strong> GraphQL, REST/OpenAPI
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>{t("ref_security")}</strong> Keycloak (Multi-Realm)
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>{t("ref_database")}</strong> PostgreSQL
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            <strong style={{ color: '#667eea' }}>{t("ref_container")}</strong> Docker Compose
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
          {t("ref_architecture")}
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            {t("ref_supply_arch1")}
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            {t("ref_supply_arch2")}
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            {t("ref_supply_arch3")}
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            {t("ref_supply_arch4")}
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            {t("ref_supply_arch5")}
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            {t("ref_supply_arch6")}
          </li>
          <li style={{ padding: '0.75rem', marginBottom: '0.5rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            {t("ref_supply_arch7")}
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
          👨‍💻 {t("ref_responsibility")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
          {t("ref_supply_resp")}
        </p>
      </div>
    </>
  );
}

