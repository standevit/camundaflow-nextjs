"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function MicroservicesIndexContent() {
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
          {t("ms_index_hero_title")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0'
        }}>
          {t("ms_index_hero_subtitle")}
        </p>
      </div>

      {/* What are Microservices */}
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
          borderBottom: '2px solid #667eea',
          paddingBottom: '0.5rem'
        }}>
          {t("ms_index_what_heading")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_index_what_p1")}
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569' }}>
          {t("ms_index_what_p2")}
        </p>
      </div>

      {/* Key Benefits */}
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
          borderBottom: '2px solid #667eea',
          paddingBottom: '0.5rem'
        }}>
          {t("ms_index_benefits_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              {t("ms_index_benefit1_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              {t("ms_index_benefit1_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              {t("ms_index_benefit2_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              {t("ms_index_benefit2_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              {t("ms_index_benefit3_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              {t("ms_index_benefit3_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              {t("ms_index_benefit4_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              {t("ms_index_benefit4_desc")}
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              {t("ms_index_benefit5_title")}
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              {t("ms_index_benefit5_desc")}
            </p>
          </div>
        </div>
      </div>

      {/* When to Use */}
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
          borderBottom: '2px solid #667eea',
          paddingBottom: '0.5rem'
        }}>
          {t("ms_index_when_heading")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_index_when_intro")}
        </p>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>{t("ms_index_when_item1")}</li>
          <li>{t("ms_index_when_item2")}</li>
          <li>{t("ms_index_when_item3")}</li>
          <li>{t("ms_index_when_item4")}</li>
          <li>{t("ms_index_when_item5")}</li>
          <li>{t("ms_index_when_item6")}</li>
        </ul>
      </div>

      {/* Our Expertise */}
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #cbd5e1'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#0f172a'
        }}>
          {t("ms_index_expertise_heading")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          {t("ms_index_expertise_intro")}
        </p>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>{t("ms_index_expertise_item1")}</li>
          <li>{t("ms_index_expertise_item2")}</li>
          <li>{t("ms_index_expertise_item3")}</li>
          <li>{t("ms_index_expertise_item4")}</li>
          <li>{t("ms_index_expertise_item5")}</li>
          <li>{t("ms_index_expertise_item6")}</li>
          <li>{t("ms_index_expertise_item7")}</li>
          <li>{t("ms_index_expertise_item8")}</li>
        </ul>
      </div>
    </div>
  );
}
