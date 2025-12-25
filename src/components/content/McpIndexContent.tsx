"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function McpIndexContent() {
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
          {t("mcp_index_heading")}
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          {t("mcp_index_intro")}
        </p>
      </div>

      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#667eea', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔌</span>
          {t("mcp_index_what_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_discovers_label")}</strong> {t("mcp_index_discovers")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_understands_label")}</strong> {t("mcp_index_understands")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_calls_label")}</strong> {t("mcp_index_calls")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_works_label")}</strong> {t("mcp_index_works")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_supports_label")}</strong> {t("mcp_index_supports")}
          </div>
          <div style={{ padding: '0.75rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_enables_label")}</strong> {t("mcp_index_enables")}
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
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>🛠️</span>
          {t("mcp_index_tools_heading")}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_1")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_2")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_3")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_4")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_5")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_6")}
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
            ✓ {t("mcp_index_tool_7")}
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
        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <span style={{ color: '#667eea', fontSize: '1.5rem' }}>💡</span>
          {t("mcp_index_why_camunda_heading")}
        </h3>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_1_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_1")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_2_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_2")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_3_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_3")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_4_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_4")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_5_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_5")}</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
            <strong style={{ color: '#667eea' }}>{t("mcp_index_benefit_6_label")}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{t("mcp_index_benefit_6")}</p>
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
        <p style={{ fontSize: '1.05rem', marginBottom: 0 }}>
          <strong style={{ color: '#667eea' }}>{t("mcp_index_conclusion_label")}</strong> {t("mcp_index_conclusion")}
        </p>
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
            🤖 MCP Beispiel: Automatische Kundenanfrage
          </h3>
          <p style={{ color: 'white', opacity: 0.95, marginBottom: 0 }}>
            {t("mcp_example_desc")}
          </p>
        </div>
        <div className="bpmn-container" data-diagram="/bpmn/mcp.bpmn"></div>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginTop: 0 }}>Prozess Ablauf:</h4>
          <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Start:</strong> {t("mcp_example_step1")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>AI Analyse:</strong> {t("mcp_example_step2")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>MCP Server Call:</strong> {t("mcp_example_step3")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Daten abrufen:</strong> {t("mcp_example_step4")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Prozess triggern:</strong> {t("mcp_example_step5")}</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>End Event:</strong> {t("mcp_example_step6")}</li>
          </ol>
        </div>
      </section>
    </>
  );
}
