"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function CamundaIndexContent() {
  const { t } = useTranslation();

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
          {t('camunda_index_heading')}
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          {t("camunda_index_intro")}
        </p>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>🧩</span>
          {t("camunda_index_components_heading")}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>Zeebe</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_zeebe")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>Operate</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_operate")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>Tasklist</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_tasklist")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>Optimize</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_optimize")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>DMN Engine</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.95rem' }}>
              {t("camunda_index_dmn")}
            </p>
          </div>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: '1rem',
          borderRadius: '6px',
          marginTop: '1.5rem',
          border: '1px solid #667eea'
        }}>
          <p style={{ marginBottom: 0 }}>{t("camunda_index_benefits")}</p>
        </div>
      </div>

      <section style={{ marginTop: '3rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem' }}>
            📦 Event-Driven Lieferungsprozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("delivery_process_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/lieferung.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("delivery_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Lager prüfen:</strong> {t("delivery_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Message Event:</strong> {t("delivery_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Versand vorbereiten:</strong> {t("delivery_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Lieferung verfolgen:</strong> {t("delivery_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("delivery_step6")}</li>
          </ol>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '0.5rem' }}>
            🛒 B2B Bestellprozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("b2b_process_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/b2bbestellung.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("b2b_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Kreditprüfung:</strong> {t("b2b_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Gateway:</strong> {t("b2b_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Vertrag erstellen:</strong> {t("b2b_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>SAP Integration:</strong> {t("b2b_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("b2b_step6")}</li>
          </ol>
        </div>
      </section>
    </>
  );
}
