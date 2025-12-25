"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function ProcessBasicsContent() {
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
          {t('process_basics_title')}
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          {t("process_basics_intro")}
        </p>
      </div>

      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        borderLeft: '4px solid #667eea',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#667eea', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📋</span>
          {t("process_basics_what_is")}
        </h3>
        <p>{t("process_basics_what_is_desc")}</p>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
            ✓ {t("process_basics_example1")}
          </li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
            ✓ {t("process_basics_example2")}
          </li>
          <li style={{ padding: '0.5rem 0' }}>
            ✓ {t("process_basics_example3")}
          </li>
        </ul>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>💡</span>
          {t("process_basics_why_model")}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("process_basics_transparency")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("process_basics_transparency_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("process_basics_optimization")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("process_basics_optimization_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("process_basics_automation")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("process_basics_automation_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("process_basics_compliance")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("process_basics_compliance_desc")}
            </p>
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
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>📊</span>
          {t("process_basics_three_levels")}
        </h3>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', marginBottom: '1rem', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea', fontSize: '1.1rem' }}>1. {t("process_basics_level1")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              {t("process_basics_level1_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', marginBottom: '1rem', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea', fontSize: '1.1rem' }}>2. {t("process_basics_level2")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              {t("process_basics_level2_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea', fontSize: '1.1rem' }}>3. {t("process_basics_level3")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              {t("process_basics_level3_desc")}
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '2px solid #667eea',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.05rem', marginBottom: 0, color: '#475569' }}>
          💡 {t("process_basics_camunda_note")}
        </p>
      </div>
    </>
  );
}
