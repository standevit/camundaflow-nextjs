"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function BpmnContent() {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '12px',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: 'white'
        }}>
          BPMN
        </h3>
        <p style={{ 
          fontSize: '1.2rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <strong>Business Process Model and Notation (BPMN 2.0)</strong> {t("bpmn_desc")}
        </p>
      </div>

      {/* What is BPMN Section */}
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
          {t("bpmn_elements")}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { title: 'Events', desc: t("bpmn_events"), icon: '⚡' },
            { title: 'Tasks', desc: t("bpmn_tasks"), icon: '📋' },
            { title: 'Gateways', desc: t("bpmn_gateways"), icon: '🔀' },
            { title: 'Swimlanes', desc: t("bpmn_swimlanes"), icon: '🏊' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '10px',
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                {item.title}
              </div>
              <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '2.5rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0f172a'
        }}>
          {t("bpmn_benefits_title")}
        </h3>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#334155',
          margin: 0
        }}>
          {t("bpmn_benefits")}
        </p>
      </div>

      {/* Pizza Process */}
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            🍕 Pizza Bestellung Prozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("pizza_process_desc")}
          </p>
        </div>
        <div 
          className="bpmn-container" 
          data-diagram="/bpmn/pizza.bpmn"
          style={{
            height: '500px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            overflow: 'hidden'
          }}
        ></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0, marginBottom: '1rem' }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569', lineHeight: '1.8' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("pizza_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Bestellung entgegennehmen:</strong> {t("pizza_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Pizza zubereiten:</strong> {t("pizza_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Gateway:</strong> {t("pizza_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Pizza ausliefern:</strong> {t("pizza_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("pizza_step6")}</li>
          </ol>
        </div>
      </div>

      {/* Order Approval Process */}
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            ✅ Order Approval Prozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("order_approval_desc")}
          </p>
        </div>
        <div 
          className="bpmn-container" 
          data-diagram="/bpmn/order-approval-process.bpmn"
          style={{
            height: '500px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            overflow: 'hidden'
          }}
        ></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0, marginBottom: '1rem' }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569', lineHeight: '1.8' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("order_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Bestellung prüfen:</strong> {t("order_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Gateway:</strong> {t("order_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Manager Approval (User Task):</strong> {t("order_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Bestellung bearbeiten:</strong> {t("order_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("order_step6")}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
