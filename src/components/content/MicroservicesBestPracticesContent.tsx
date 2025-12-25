"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function MicroservicesBestPracticesContent() {
  const { t } = useTranslation();
  
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
          {t("ms_bp_hero_title")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0'
        }}>
          {t("ms_bp_hero_subtitle")}
        </p>
      </div>

      {/* Design Principles */}
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
          borderBottom: '2px solid #f59e0b',
          paddingBottom: '0.5rem'
        }}>
          🎯 {t("ms_bp_design_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
              {t("ms_bp_design_sr_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#78350f' }}>
              {t("ms_bp_design_sr_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
              {t("ms_bp_design_lc_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#78350f' }}>
              {t("ms_bp_design_lc_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
              {t("ms_bp_design_hc_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#78350f' }}>
              {t("ms_bp_design_hc_desc")}
            </p>
          </div>
        </div>
      </div>

      {/* API Design */}
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
          borderBottom: '2px solid #f59e0b',
          paddingBottom: '0.5rem'
        }}>
          🔌 {t("ms_bp_api_heading")}
        </h3>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>{t("ms_bp_api_item1")}</li>
          <li>{t("ms_bp_api_item2")}</li>
          <li>{t("ms_bp_api_item3")}</li>
          <li>{t("ms_bp_api_item4")}</li>
          <li>{t("ms_bp_api_item5")}</li>
          <li>{t("ms_bp_api_item6")}</li>
        </ul>
      </div>

      {/* Data Management */}
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
          borderBottom: '2px solid #f59e0b',
          paddingBottom: '0.5rem'
        }}>
          🗄️ {t("ms_bp_data_heading")}
        </h3>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>{t("ms_bp_data_item1")}</li>
          <li>{t("ms_bp_data_item2")}</li>
          <li>{t("ms_bp_data_item3")}</li>
          <li>{t("ms_bp_data_item4")}</li>
          <li>{t("ms_bp_data_item5")}</li>
        </ul>
      </div>

      {/* DevOps & Deployment */}
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
          borderBottom: '2px solid #f59e0b',
          paddingBottom: '0.5rem'
        }}>
          🚀 {t("ms_bp_devops_heading")}
        </h3>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>{t("ms_bp_devops_item1")}</li>
          <li>{t("ms_bp_devops_item2")}</li>
          <li>{t("ms_bp_devops_item3")}</li>
          <li>{t("ms_bp_devops_item4")}</li>
          <li>{t("ms_bp_devops_item5")}</li>
          <li>{t("ms_bp_devops_item6")}</li>
        </ul>
      </div>

      {/* Observability */}
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
          borderBottom: '2px solid #f59e0b',
          paddingBottom: '0.5rem'
        }}>
          📊 {t("ms_bp_observability_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
              {t("ms_bp_observability_logging_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#78350f' }}>
              {t("ms_bp_observability_logging_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
              {t("ms_bp_observability_tracing_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#78350f' }}>
              {t("ms_bp_observability_tracing_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
              {t("ms_bp_observability_metrics_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#78350f' }}>
              {t("ms_bp_observability_metrics_desc")}
            </p>
          </div>
        </div>
      </div>

      {/* Security */}
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
          borderBottom: '2px solid #f59e0b',
          paddingBottom: '0.5rem'
        }}>
          🔒 {t("ms_bp_security_heading")}
        </h3>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>{t("ms_bp_security_item1")}</li>
          <li>{t("ms_bp_security_item2")}</li>
          <li>{t("ms_bp_security_item3")}</li>
          <li>{t("ms_bp_security_item4")}</li>
          <li>{t("ms_bp_security_item5")}</li>
          <li>{t("ms_bp_security_item6")}</li>
        </ul>
      </div>

      {/* Testing */}
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
          borderBottom: '2px solid #f59e0b',
          paddingBottom: '0.5rem'
        }}>
          🧪 {t("ms_bp_testing_heading")}
        </h3>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>{t("ms_bp_testing_item1")}</li>
          <li>{t("ms_bp_testing_item2")}</li>
          <li>{t("ms_bp_testing_item3")}</li>
          <li>{t("ms_bp_testing_item4")}</li>
          <li>{t("ms_bp_testing_item5")}</li>
          <li>{t("ms_bp_testing_item6")}</li>
        </ul>
      </div>
    </div>
  );
}
