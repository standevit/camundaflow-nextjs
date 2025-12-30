"use client";

import { useTranslation } from "@/components/LanguageProvider";

interface AiCustomerServiceContentProps {
  onRequestProject?: () => void;
}

export default function AiCustomerServiceContent({ onRequestProject }: AiCustomerServiceContentProps) {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        position: 'relative'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          {t("ai_customer_service_intro_heading")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0',
          paddingRight: onRequestProject ? '160px' : '0'
        }}>
          {t("ai_customer_service_intro_desc")}
        </p>
        
        {/* Projekt anfragen Button */}
        {onRequestProject && (
          <button
            onClick={onRequestProject}
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            📝 Projekt anfragen
          </button>
        )}
      </div>

      {/* Capabilities Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#0f172a'
        }}>
          {t("ai_customer_service_intro_capabilities_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_1")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_2")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_3")}
            </p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              {t("ai_customer_service_intro_capability_4")}
            </p>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>
            {t("ai_customer_service_intro_result")}
          </p>
        </div>
      </div>

      {/* BPMN Diagram Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            📊
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
          }}>
            {t("ai_customer_service_intro_process_heading")}
          </h3>
        </div>

        <div 
          className="bpmn-container" 
          data-diagram="/bpmn/ai-customer-service.bpmn"
          style={{
            height: '500px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '2rem',
            overflow: 'hidden'
          }}
        ></div>

        {/* Process Flow Description */}
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                fontWeight: '700',
                flexShrink: 0
              }}>
                {step}
              </div>
              <p style={{
                margin: 0,
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#475569'
              }}>
                {t(`ai_customer_service_intro_process_step_${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
