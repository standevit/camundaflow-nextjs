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
          Microservices architecture is a modern approach to software development where applications are structured as a collection of loosely coupled, independently deployable services. Each service is responsible for a specific business capability and communicates with others through well-defined APIs.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569' }}>
          Unlike monolithic architectures where all components are tightly integrated, microservices allow teams to develop, deploy, and scale services independently, enabling greater flexibility and faster innovation.
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
              🚀 Autonomous Services
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              Each microservice can be developed, deployed, and scaled independently without affecting other services
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              🔧 Technology Diversity
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              Teams can use different programming languages, databases, and tools best suited for each service
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              💪 Resilience
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              Failures in one service do not bring down the entire system, ensuring better fault isolation
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              ⚡ Faster Time to Market
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              Smaller, focused teams can deliver features more quickly with parallel development
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              📈 Scalability
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#64748b' }}>
              Scale only the services that need it, optimizing resource usage and cost efficiency
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
          Microservices are ideal for:
        </p>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>Large, complex applications requiring high scalability</li>
          <li>Organizations with multiple development teams</li>
          <li>Applications with diverse technology requirements</li>
          <li>Cloud-native and DevOps environments</li>
          <li>Systems requiring continuous delivery and deployment</li>
          <li>Applications with varying scalability needs per component</li>
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
          We help organizations design, implement, and operate robust microservices architectures:
        </p>
        <ul style={{ fontSize: '1.05rem', lineHeight: '1.9', color: '#475569', paddingLeft: '1.5rem' }}>
          <li>Microservices strategy and architecture consulting</li>
          <li>API design and management with REST, GraphQL, and gRPC</li>
          <li>Service mesh implementation (Istio, Linkerd)</li>
          <li>DevOps and CI/CD pipeline setup</li>
          <li>Containerization with Docker & Kubernetes orchestration</li>
          <li>Event-driven architectures with message brokers</li>
          <li>Monitoring, logging, and distributed tracing</li>
          <li>Migration from monolith to microservices</li>
        </ul>
      </div>
    </div>
  );
}
