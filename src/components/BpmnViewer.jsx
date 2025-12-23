'use client';

import { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js/lib/NavigatedViewer";

export default function BpmnViewer({ file }) {
  const ref = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Create viewer only once
    if (!viewerRef.current) {
      viewerRef.current = new BpmnJS({ 
        container: ref.current,
        keyboard: {
          bindTo: document
        }
      });
    }

    const viewer = viewerRef.current;

    fetch(`/bpmn/${file}`)
      .then(res => res.text())
      .then(xml => {
        viewer.importXML(xml).then(() => {
          // Auto-zoom to fit the diagram
          const canvas = viewer.get('canvas');
          canvas.zoom('fit-viewport', 'auto');
        }).catch(err => {
          console.error('Error importing BPMN:', err);
        });
      });

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [file]);

  return (
    <div className="w-full border rounded shadow p-2">
      <div ref={ref} style={{ width: '100%', height: '600px' }} />
    </div>
  );
}

