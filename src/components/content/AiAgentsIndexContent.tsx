"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function AiAgentsIndexContent() {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          {t("ai_agents_index_heading")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0'
        }}>
          {t("ai_agents_index_intro")}
        </p>
      </div>

      {/* What is an AI Agent */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
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
          {t("ai_agents_index_what_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { label: t("ai_agents_index_understands_label"), text: t("ai_agents_index_understands") },
            { label: t("ai_agents_index_decides_label"), text: t("ai_agents_index_decides") },
            { label: t("ai_agents_index_acts_label"), text: t("ai_agents_index_acts") },
            { label: t("ai_agents_index_asks_label"), text: t("ai_agents_index_asks") },
            { label: t("ai_agents_index_learns_label"), text: t("ai_agents_index_learns") },
            { label: t("ai_agents_index_controllable_label"), text: t("ai_agents_index_controllable") }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '10px',
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ fontWeight: '700', color: '#667eea', marginBottom: '0.5rem' }}>
                {item.label}
              </div>
              <div style={{ color: '#475569', lineHeight: '1.6' }}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#0f172a'
        }}>
          {t("ai_agents_index_use_cases_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
                flexShrink: 0
              }}>
                {num}
              </div>
              <p style={{ margin: 0, color: '#334155', lineHeight: '1.6' }}>
                {t(`ai_agents_index_use_case_${num}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Camunda Benefits */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
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
          {t("ai_agents_index_why_camunda_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                color: '#667eea',
                fontSize: '1.5rem',
                fontWeight: '700',
                flexShrink: 0
              }}>
                ✓
              </div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.7', fontSize: '1.05rem' }}>
                {t(`ai_agents_index_benefit_${num}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{
          margin: 0,
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: 'white'
        }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'white' }}>
            {t("ai_agents_index_conclusion_label")}
          </strong>
          {t("ai_agents_index_conclusion")}
        </p>
      </div>
    </div>
  );
}
