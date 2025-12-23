"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function AgentsCamundaContent() {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          {t("agents_camunda_heading")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0'
        }}>
          {t("agents_camunda_intro")}
        </p>
      </div>

      {/* Why Section */}
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          {t("agents_camunda_why_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '10px',
              borderLeft: '4px solid #667eea',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                {num}
              </div>
              <p style={{ margin: 0, color: '#334155', lineHeight: '1.6' }}>
                {t(`agents_camunda_reason_${num}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div style={{
        background: '#f8f9fa',
        padding: '2.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#0f172a'
        }}>
          {t("agents_camunda_use_cases_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} style={{
              background: 'white',
              padding: '1.5rem 2rem',
              borderRadius: '10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.1rem',
                flexShrink: 0
              }}>
                {num}
              </div>
              <p style={{ 
                margin: 0, 
                color: '#334155', 
                lineHeight: '1.7',
                fontSize: '1.05rem'
              }}>
                {t(`agents_camunda_use_case_${num}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.7',
          marginBottom: '1.5rem'
        }}>
          {t("agents_camunda_cta")}
        </p>
        <a 
          href="mailto:info@camundaflow.de" 
          style={{
            display: 'inline-block',
            background: 'white',
            color: '#667eea',
            padding: '0.875rem 2rem',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1.1rem',
            textDecoration: 'none',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {t("agents_camunda_cta_button")}
        </a>
      </div>
    </div>
  );
}
