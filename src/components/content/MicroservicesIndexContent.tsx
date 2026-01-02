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
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '2px solid #667eea',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem'
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
            🧩
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
          }}>
            {t("ms_index_what_heading")}
          </h3>
        </div>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.9', 
          color: '#334155', 
          marginBottom: '1.25rem',
          paddingLeft: '1rem',
          borderLeft: '1px solid #babfd8ff',
          borderRadius: '12px',
        }}>
          {t("ms_index_what_p1")}
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.9', 
          color: '#334155',
          paddingLeft: '1rem',
          borderLeft: '1px solid #babfd8ff',
          borderRadius: '12px',
        }}>
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
        background: 'linear-gradient(to bottom right, #ffffff 0%, #f8fafc 100%)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.15)',
        border: '2px solid #e0e7ff',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
            ✅
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
          }}>
            {t("ms_index_when_heading")}
          </h3>
        </div>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: '#334155', 
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          {t("ms_index_when_intro")}
        </p>
        <ul style={{ 
          fontSize: '1.05rem', 
          lineHeight: '2.2', 
          color: '#475569', 
          paddingLeft: '0',
          listStyle: 'none'
        }}>
          <li style={{
            padding: '0.75rem 1rem',
            marginBottom: '0.75rem',
            background: 'white',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>🎯 {t("ms_index_when_item1")}</li>
          <li style={{
            padding: '0.75rem 1rem',
            marginBottom: '0.75rem',
            background: 'white',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>🎯 {t("ms_index_when_item2")}</li>
          <li style={{
            padding: '0.75rem 1rem',
            marginBottom: '0.75rem',
            background: 'white',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>🎯 {t("ms_index_when_item3")}</li>
          <li style={{
            padding: '0.75rem 1rem',
            marginBottom: '0.75rem',
            background: 'white',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>🎯 {t("ms_index_when_item4")}</li>
          <li style={{
            padding: '0.75rem 1rem',
            marginBottom: '0.75rem',
            background: 'white',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>🎯 {t("ms_index_when_item5")}</li>
          <li style={{
            padding: '0.75rem 1rem',
            background: 'white',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>🎯 {t("ms_index_when_item6")}</li>
        </ul>
      </div>

      {/* Our Expertise */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2.5rem',
        borderRadius: '12px',
        border: '2px solid #5a67d8',
        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '700',
            backdropFilter: 'blur(10px)'
          }}>
            🚀
          </div>
          <h3 style={{
            fontSize: '1.6rem',
            fontWeight: '700',
            color: 'white',
            margin: 0
          }}>
            {t("ms_index_expertise_heading")}
          </h3>
        </div>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: 'white', 
          marginBottom: '1.5rem',
          opacity: '0.95',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          {t("ms_index_expertise_intro")}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚙️</div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{t("ms_index_expertise_item1")}</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔄</div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{t("ms_index_expertise_item2")}</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📡</div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{t("ms_index_expertise_item3")}</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐</div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{t("ms_index_expertise_item4")}</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔐</div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{t("ms_index_expertise_item5")}</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{t("ms_index_expertise_item6")}</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>☁️</div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{t("ms_index_expertise_item7")}</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧪</div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{t("ms_index_expertise_item8")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
