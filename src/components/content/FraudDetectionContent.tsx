"use client";

import { useTranslation } from "../LanguageProvider";

export default function FraudDetectionContent() {
  const { t } = useTranslation();

  return (
    <div id="canvas" style={{ padding: "2rem 0" }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          width: '64px',
          height: '64px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: '700',
          color: 'white',
          flexShrink: 0
        }}>
          🛡️
        </div>
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            margin: '0 0 0.5rem 0',
            color: 'white'
          }}>
            {t('fraud_detection_heading')}
          </h2>
          <p style={{
            margin: 0,
            fontSize: '1.1rem',
            opacity: 0.95,
            color: 'white'
          }}>
            {t('fraud_detection_subtitle')}
          </p>
        </div>
      </div>

      {/* Problem */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.75rem' }}>⚠️</span>
          {t('fraud_detection_problem_heading')}
        </h3>
        <div style={{
          background: '#fef2f2',
          padding: '1.5rem',
          borderRadius: '8px',
          borderLeft: '4px solid #ef4444'
        }}>
          <p style={{ margin: 0, color: '#7f1d1d', lineHeight: '1.8', fontSize: '1.05rem' }}>
            {t('fraud_detection_problem_text')}
          </p>
        </div>
      </div>

      {/* Lösung */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.75rem' }}>✅</span>
          {t('fraud_detection_solution_heading')}
        </h3>
        <div style={{
          background: '#f0fdf4',
          padding: '1.5rem',
          borderRadius: '8px',
          borderLeft: '4px solid #22c55e'
        }}>
          <p style={{ margin: 0, color: '#14532d', lineHeight: '1.8', fontSize: '1.05rem' }}>
            {t('fraud_detection_solution_text')}
          </p>
        </div>
      </div>

      {/* Implementierung */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.75rem' }}>⚙️</span>
          {t('fraud_detection_implementation_heading')}
        </h3>
        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {[
            { icon: '🤖', label: t('fraud_detection_impl_1') },
            { icon: '📋', label: t('fraud_detection_impl_2') },
            { icon: '🔄', label: t('fraud_detection_impl_3') }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1.25rem',
              borderRadius: '8px',
              borderLeft: '4px solid #667eea',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
              <div style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.7' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vorteile & Skalierbarkeit */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.75rem' }}>🚀</span>
          {t('fraud_detection_benefits_heading')}
        </h3>
        
        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {[
            { metric: '80%', label: t('fraud_detection_benefit_speed'), icon: '⚡' },
            { metric: '99.9%', label: t('fraud_detection_benefit_accuracy'), icon: '🎯' },
            { metric: '24/7', label: t('fraud_detection_benefit_availability'), icon: '🌍' },
            { metric: '100%', label: t('fraud_detection_benefit_audit'), icon: '📊' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              border: '2px solid #e2e8f0',
              padding: '1.5rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                {item.icon}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#667eea', marginBottom: '0.5rem' }}>
                {item.metric}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.4' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scalability Text */}
        <div style={{
          padding: '1.75rem',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          border: '2px solid #93c5fd',
          borderRadius: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '2rem' }}>📈</div>
            <h4 style={{
              margin: 0,
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#1e3a8a'
            }}>
              {t('fraud_detection_scalability_heading')}
            </h4>
          </div>
          <p style={{
            margin: 0,
            color: '#1e3a8a',
            lineHeight: '1.8',
            fontSize: '1.05rem'
          }}>
            {t('fraud_detection_scalability_text')}
          </p>
        </div>
      </div>

      {/* Timeline & Costs */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #667eea',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.75rem' }}>💰</span>
          {t('fraud_detection_timeline_heading')}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem', color: 'white' }}>
              {t('fraud_detection_timeline_duration')}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>
              {t('fraud_detection_timeline_duration_value')}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, color: 'white' }}>
              {t('fraud_detection_timeline_duration_subtitle')}
            </div>
          </div>
          <div style={{
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #667eea',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#667eea', marginBottom: '0.5rem', fontWeight: '600' }}>
              {t('fraud_detection_timeline_onetime')}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              {t('fraud_detection_timeline_onetime_value')}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#475569' }}>
              {t('fraud_detection_timeline_onetime_subtitle')}
            </div>
          </div>
          <div style={{
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #667eea',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#667eea', marginBottom: '0.5rem', fontWeight: '600' }}>
              {t('fraud_detection_timeline_monthly')}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              {t('fraud_detection_timeline_monthly_value')}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#475569' }}>
              {t('fraud_detection_timeline_monthly_subtitle')}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: '0 0 1rem 0',
          color: 'white'
        }}>
          {t('fraud_detection_cta_heading')}
        </h3>
        <p style={{
          margin: '0 0 1.5rem 0',
          fontSize: '1.1rem',
          opacity: 0.95,
          color: 'white'
        }}>
          {t('fraud_detection_cta_text')}
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => window.location.href = '/contact'}
            style={{
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🗓️ {t('fraud_detection_cta_button_consultation')}
          </button>
          <button
            onClick={() => window.location.href = '/contact'}
            style={{
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #eb7222ff 0%, #f17610ff 100%)',
              color: 'white',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(235, 114, 34, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            📋 {t('fraud_detection_cta_button_request')}
          </button>
        </div>
      </div>
    </div>
  );
}
