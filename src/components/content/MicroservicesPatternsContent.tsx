"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function MicroservicesPatternsContent() {
  const { t } = useTranslation();
  
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
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
          {t("ms_patterns_hero_title")}
        </h3>
        <p style={{ 
          color: 'white',
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          opacity: '0.95',
          marginBottom: '0'
        }}>
          {t("ms_patterns_hero_subtitle")}
        </p>
      </div>

      {/* API Gateway Pattern */}
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
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          🚪 {t("ms_patterns_api_gateway")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          A single entry point for all client requests that routes them to appropriate microservices. The API Gateway handles cross-cutting concerns like authentication, rate limiting, and request aggregation.
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            Benefits:
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>Simplified client-side code with a single endpoint</li>
            <li>Reduced round trips by aggregating multiple service calls</li>
            <li>Centralized security and monitoring</li>
            <li>Protocol translation (REST to gRPC, etc.)</li>
          </ul>
        </div>
      </div>

      {/* Service Discovery Pattern */}
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
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          🔍 {t("ms_patterns_service_discovery")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          Automatic detection of services on the network, allowing microservices to find and communicate with each other dynamically without hard-coded addresses.
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            Implementation Options:
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li><strong>Client-side discovery:</strong> Clients query a service registry (e.g., Consul, Eureka)</li>
            <li><strong>Server-side discovery:</strong> Load balancer queries registry (e.g., Kubernetes, AWS ELB)</li>
          </ul>
        </div>
      </div>

      {/* Circuit Breaker Pattern */}
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
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          ⚡ {t("ms_patterns_circuit_breaker")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          Prevents cascading failures by detecting service failures and stopping requests to failing services temporarily, giving them time to recover.
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            How it works:
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li><strong>Closed:</strong> Normal operation, requests flow through</li>
            <li><strong>Open:</strong> Failures detected, requests fail immediately</li>
            <li><strong>Half-Open:</strong> Testing if service recovered</li>
          </ul>
        </div>
      </div>

      {/* Event-Driven Pattern */}
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
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          📡 {t("ms_patterns_event_driven")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          Services communicate asynchronously through events published to message brokers, enabling loose coupling and better scalability.
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            Common Technologies:
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>Apache Kafka for high-throughput event streaming</li>
            <li>RabbitMQ for reliable message queuing</li>
            <li>AWS EventBridge or Google Cloud Pub/Sub for cloud-native solutions</li>
          </ul>
        </div>
      </div>

      {/* Saga Pattern */}
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
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          🔄 {t("ms_patterns_saga")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          Manages distributed transactions across multiple services by breaking them into a sequence of local transactions, each with a compensating action in case of failure.
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            Implementation Approaches:
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li><strong>Choreography:</strong> Services publish and listen to events</li>
            <li><strong>Orchestration:</strong> Central coordinator manages the saga</li>
          </ul>
        </div>
      </div>

      {/* Database per Service Pattern */}
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
          borderBottom: '2px solid #4ade80',
          paddingBottom: '0.5rem'
        }}>
          🗄️ {t("ms_patterns_database_per_service")}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#475569', marginBottom: '1rem' }}>
          Each microservice owns its private database to ensure loose coupling. Services can only access each other's data through APIs.
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#166534' }}>
            Advantages:
          </h4>
          <ul style={{ fontSize: '1rem', lineHeight: '1.7', color: '#15803d', paddingLeft: '1.5rem' }}>
            <li>Services can use different database technologies</li>
            <li>Changes to database schema don't affect other services</li>
            <li>Better scalability and fault isolation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
