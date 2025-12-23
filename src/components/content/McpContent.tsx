"use client";

import { useTranslation } from "@/components/LanguageProvider";
import dynamic from "next/dynamic";

const BpmnViewer = dynamic(() => import("@/components/BpmnViewer"), { ssr: false });

export default function McpContent() {
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
          {t('mcp_heading')}
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          {t("mcp_intro")}
        </p>
      </div>

      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        borderLeft: '4px solid #667eea',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#667eea' }}>Prozess Ablauf:</h3>
        <ol style={{ marginLeft: '1.5rem', color: '#475569' }}>
          <li style={{ marginBottom: '0.5rem' }}>{t("mcp_step_1")}</li>
          <li style={{ marginBottom: '0.5rem' }}>{t("mcp_step_2")}</li>
          <li style={{ marginBottom: '0.5rem' }}>{t("mcp_step_3")}</li>
          <li style={{ marginBottom: '0.5rem' }}>{t("mcp_step_4")}</li>
          <li style={{ marginBottom: '0.5rem' }}>{t("mcp_step_5")}</li>
          <li style={{ marginBottom: '0.5rem' }}>{t("mcp_step_6")}</li>
        </ol>
      </div>

      <BpmnViewer file="mcp.bpmn" />
    </>
  );
}
