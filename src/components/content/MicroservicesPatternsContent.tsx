"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function MicroservicesPatternsContent() {
  const { t } = useTranslation();
  
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          {t("ms_patterns_hero_title")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0'
        }}>
          {t("ms_patterns_hero_subtitle")}
        </p>
      </div>

      {/* API Gateway Pattern */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#0f172a',
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          🚪 {t("ms_patterns_api_gateway")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_patterns_api_gateway_desc")}
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            {t("ms_patterns_api_gateway_benefits")}
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>{t("ms_patterns_api_gateway_b1")}</li>
            <li>{t("ms_patterns_api_gateway_b2")}</li>
            <li>{t("ms_patterns_api_gateway_b3")}</li>
            <li>{t("ms_patterns_api_gateway_b4")}</li>
          </ul>
        </div>
      </div>

      {/* Service Discovery Pattern */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#0f172a',
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          🔍 {t("ms_patterns_service_discovery")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_patterns_service_discovery_desc")}
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            {t("ms_patterns_service_discovery_options")}
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>{t("ms_patterns_service_discovery_o1")}</li>
            <li>{t("ms_patterns_service_discovery_o2")}</li>
          </ul>
        </div>
      </div>

      {/* Circuit Breaker Pattern */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#0f172a',
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          ⚡ {t("ms_patterns_circuit_breaker")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_patterns_circuit_breaker_desc")}
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            {t("ms_patterns_circuit_breaker_how")}
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>{t("ms_patterns_circuit_breaker_h1")}</li>
            <li>{t("ms_patterns_circuit_breaker_h2")}</li>
            <li>{t("ms_patterns_circuit_breaker_h3")}</li>
          </ul>
        </div>
      </div>

      {/* Event-Driven Pattern */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#0f172a',
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          📡 {t("ms_patterns_event_driven")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_patterns_event_driven_desc")}
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            {t("ms_patterns_event_driven_tech")}
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>{t("ms_patterns_event_driven_t1")}</li>
            <li>{t("ms_patterns_event_driven_t2")}</li>
            <li>{t("ms_patterns_event_driven_t3")}</li>
          </ul>
        </div>
      </div>

      {/* Saga Pattern */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#0f172a',
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          🔄 {t("ms_patterns_saga")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_patterns_saga_desc")}
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            {t("ms_patterns_saga_approaches")}
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>{t("ms_patterns_saga_a1")}</li>
            <li>{t("ms_patterns_saga_a2")}</li>
          </ul>
        </div>
      </div>

      {/* Database per Service Pattern */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#0f172a',
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          🗄️ {t("ms_patterns_database_per_service")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_patterns_database_per_service_desc")}
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            {t("ms_patterns_database_per_service_advantages")}
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>{t("ms_patterns_database_per_service_a1")}</li>
            <li>{t("ms_patterns_database_per_service_a2")}</li>
            <li>{t("ms_patterns_database_per_service_a3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
