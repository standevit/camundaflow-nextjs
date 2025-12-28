"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function OrderProcessContent() {
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
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          {t("order_process_hero_heading")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0'
        }}>
          {t("order_process_hero_desc")}
        </p>
      </div>

      {/* Challenges Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          {t("order_process_challenges_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} style={{
              background: 'white',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid #e74c3c',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#475569' }}>
                ❌ {t(`order_process_challenge_${num}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          {t("order_process_solution_heading")}
        </h3>
        <p style={{
          fontSize: '1.05rem',
          lineHeight: '1.8',
          color: '#475569',
          marginBottom: '1.5rem'
        }}>
          {t("order_process_solution_desc")}
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>
            {t("order_process_solution_result")}
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
            {t("order_process_bpmn_heading")}
          </h3>
        </div>

        <div 
          className="bpmn-container" 
          data-diagram="/bpmn/Bestellung_verarbeiten.bpmn"
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
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
                {t(`order_process_flow_step_${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          {t("order_process_best_practices_heading")}
        </h3>
        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {[1, 2, 3, 4].map((num) => (
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
                color: '#667eea',
                fontSize: '1.5rem',
                fontWeight: '700',
                flexShrink: 0
              }}>
                🔧
              </div>
              <p style={{ margin: 0, color: '#334155', lineHeight: '1.6' }}>
                {t(`order_process_best_practice_${num}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a',
          paddingBottom: '1rem',
          borderBottom: '2px solid #667eea'
        }}>
          {t("order_process_architecture_heading")}
        </h3>
        
        {/* Central Component */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>
            🎯 {t("order_process_arch_central")}
          </div>
          <div style={{ fontSize: '0.95rem', opacity: '0.9', color: 'white' }}>
            Camunda Platform / Camunda 8
          </div>
        </div>

        {/* Microservices */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {['Order Service', 'Inventory Service', 'Payment Service', 'Billing Service', 'Shipping Service', 'Notification Service'].map((service, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚙️</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>
                {service}
              </div>
            </div>
          ))}
        </div>

        {/* Communication */}
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '10px'
        }}>
          <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
            {t("order_process_arch_communication")}
          </div>
          <div style={{ color: '#475569', lineHeight: '1.7' }}>
            {t("order_process_arch_communication_desc")}
          </div>
        </div>
      </div>

      {/* Architecture Principle */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '2rem',
          marginBottom: '1rem'
        }}>
          🔁
        </div>
        <p style={{
     
          fontSize: '1.2rem',
          lineHeight: '1.7',
          color: 'white',
          fontWeight: '600'
        }}>
          {t("order_process_principle")}
        </p>
        <p style={{
          
          fontSize: '1rem',
          lineHeight: '1.6',
          color: 'white',
          opacity: '0.9'
        }}>
          {t("order_process_principle_desc")}
        </p>
      </div>
    </div>
  );
}
