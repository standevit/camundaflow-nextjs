"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function BpmnContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2>BPMN</h2>
      <section>
        <h3>{t("bpmn_what_is")}</h3>
        <p>
          <strong>Business Process Model and Notation (BPMN 2.0)</strong> {t("bpmn_desc")}
        </p>

        <h3>{t("bpmn_elements")}</h3>
        <ul>
          <li><strong>Events</strong> {t("bpmn_events")}</li>
          <li><strong>Tasks</strong> {t("bpmn_tasks")}</li>
          <li><strong>Gateways</strong> {t("bpmn_gateways")}</li>
          <li><strong>Swimlanes</strong> – {t("bpmn_swimlanes")}</li>
        </ul>

        <h3>{t("bpmn_benefits_title")}</h3>
        <p>{t("bpmn_benefits")}</p>
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
            🍕 Pizza Bestellung Prozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("pizza_process_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/pizza.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("pizza_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Bestellung entgegennehmen:</strong> {t("pizza_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Pizza zubereiten:</strong> {t("pizza_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Gateway:</strong> {t("pizza_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Pizza ausliefern:</strong> {t("pizza_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("pizza_step6")}</li>
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
            ✅ Order Approval Prozess
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("order_approval_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/order-approval-process.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Flow Beschreibung:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start Event:</strong> {t("order_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Bestellung prüfen:</strong> {t("order_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Gateway:</strong> {t("order_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Manager Approval (User Task):</strong> {t("order_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Bestellung bearbeiten:</strong> {t("order_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("order_step6")}</li>
          </ol>
        </div>
      </section>
    </>
  );
}
