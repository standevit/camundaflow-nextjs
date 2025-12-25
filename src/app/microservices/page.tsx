"use client";

import { useState, useEffect } from "react";
import MicroservicesIndexContent from "@/components/content/MicroservicesIndexContent";
import MicroservicesPatternsContent from "@/components/content/MicroservicesPatternsContent";
import MicroservicesBestPracticesContent from "@/components/content/MicroservicesBestPracticesContent";

export default function MicroservicesPage() {
  const [activeTemplate, setActiveTemplate] = useState("overview");

  useEffect(() => {
    // Update document title based on active template
    const titleMap: Record<string, string> = {
      'overview': 'Microservices Architecture Overview',
      'patterns': 'Microservices Design Patterns',
      'best-practices': 'Microservices Best Practices'
    };
    document.title = `${titleMap[activeTemplate] || 'Microservices'} | CamundaFlow`;
  }, [activeTemplate]);

  const renderContent = () => {
    switch (activeTemplate) {
      case "overview":
        return <MicroservicesIndexContent />;
      case "patterns":
        return <MicroservicesPatternsContent />;
      case "best-practices":
        return <MicroservicesBestPracticesContent />;
      default:
        return <MicroservicesIndexContent />;
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h3>Microservices</h3>
        <ul>
          <li>
            <a
              className={`example-link ${activeTemplate === "overview" ? "active" : ""}`}
              onClick={() => setActiveTemplate("overview")}
              style={{ cursor: 'pointer' }}
            >
              📖 Overview
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "patterns" ? "active" : ""}`}
              onClick={() => setActiveTemplate("patterns")}
              style={{ cursor: 'pointer' }}
            >
              🎨 Design Patterns
            </a>
          </li>
          <li>
            <a
              className={`example-link ${activeTemplate === "best-practices" ? "active" : ""}`}
              onClick={() => setActiveTemplate("best-practices")}
              style={{ cursor: 'pointer' }}
            >
              ✨ Best Practices
            </a>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <div className="card">
          <div id="canvas">{renderContent()}</div>
        </div>
      </main>
      <aside className="sidebar" style={{ 
        padding: '0', 
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <img 
          src="/service-portal.avif" 
          alt="Microservices Portal" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
        <img 
          src="/supply-chain.avif" 
          alt="Supply Chain" 
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      </aside>
    </div>
  );
}
