"use client";

import { useEffect } from "react";

export default function OrderApprovalContent() {
  useEffect(() => {
    // @ts-expect-error BpmnJS is loaded via CDN
    if (typeof window !== 'undefined' && window.BpmnJS) {
      // @ts-expect-error BpmnJS is loaded via CDN
      const viewer = new window.BpmnJS.NavigatedViewer({
        container: '#order-approval-canvas',
        height: 600
      });

      fetch('/bpmn/order-approval-process.bpmn')
        .then(response => response.text())
        .then(bpmnXML => {
          viewer.importXML(bpmnXML);
        })
        .catch(err => {
          console.error('Error loading BPMN diagram:', err);
        });

      return () => {
        viewer.destroy();
      };
    }
  }, []);

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
          Order Approval Process
        </h3>
        <p style={{ color: 'white', opacity: 0.95, fontSize: '1.1rem', marginBottom: '0' }}>
          A typical business process for order approval that demonstrates how Camunda 7 handles multi-step workflows with decision gateways and user tasks.
        </p>
      </div>

      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h4 style={{ 
          color: '#667eea',
          marginBottom: '1rem',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          Process Overview
        </h4>
        <p style={{ 
          color: '#495057',
          lineHeight: '1.6',
          marginBottom: '1rem'
        }}>
          This BPMN diagram illustrates a typical order approval workflow that includes:
        </p>
        <ul style={{ 
          color: '#495057',
          lineHeight: '1.8',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Start Event:</strong> Order request is initiated</li>
          <li><strong>User Task:</strong> Order details are reviewed by an employee</li>
          <li><strong>Exclusive Gateway:</strong> Decision point based on order value or criteria</li>
          <li><strong>Approval Task:</strong> Manager or supervisor approves high-value orders</li>
          <li><strong>Service Task:</strong> Automated processing and system updates</li>
          <li><strong>End Event:</strong> Order is finalized and confirmed</li>
        </ul>
      </div>

      <div style={{ 
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        marginBottom: '2rem'
      }}>
        <h4 style={{ 
          color: '#667eea',
          marginBottom: '1rem',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          BPMN Diagram
        </h4>
        <div 
          id="order-approval-canvas"
          style={{ 
            width: '100%',
            minHeight: '600px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🔄</span>
          </div>
          <h4 style={{ color: '#212529', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
            Process Automation
          </h4>
          <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: 0 }}>
            Automate repetitive approval workflows and reduce manual intervention, improving processing time and accuracy.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📊</span>
          </div>
          <h4 style={{ color: '#212529', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
            Decision Gateways
          </h4>
          <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: 0 }}>
            Implement business rules and conditional logic to route orders based on value, priority, or other criteria.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>👥</span>
          </div>
          <h4 style={{ color: '#212529', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
            Human Tasks
          </h4>
          <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: 0 }}>
            Assign tasks to specific users or groups, ensuring the right people review and approve orders at the right time.
          </p>
        </div>
      </div>

      <div style={{ 
        background: '#e7f3ff',
        padding: '1.5rem',
        borderRadius: '8px',
        borderLeft: '4px solid #0066cc',
        marginBottom: '2rem'
      }}>
        <h4 style={{ 
          color: '#0066cc',
          marginBottom: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          Implementation Benefits
        </h4>
        <p style={{ 
          color: '#495057',
          lineHeight: '1.6',
          marginBottom: 0
        }}>
          By implementing order approval processes with Camunda 7, organizations achieve faster processing times, 
          reduced errors, improved compliance, and complete audit trails for all orders.
        </p>
      </div>
    </>
  );
}

