'use client';

import { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js";

export default function BpmnViewer({ file }) {
  const ref = useRef(null);

  useEffect(() => {
    const viewer = new BpmnJS({ container: ref.current });

    fetch(`/bpmn/${file}`)
      .then(res => res.text())
      .then(xml => viewer.importXML(xml));

    return () => viewer.destroy();
  }, [file]);

  return (
    <div className="w-full border rounded shadow p-2">
      <div ref={ref} style={{ width: '100%', height: '600px' }} />
    </div>
  );
}

