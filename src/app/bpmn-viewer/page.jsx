'use client';

import { useState } from "react";
import BpmnViewer from "../../components/BpmnViewer";

export default function ViewerPage() {
  const [file, setFile] = useState("pizza.bpmn");

  const files = [
    "pizza.bpmn",
    "mcp.bpmn",
    "lieferung.bpmn",
    "kreditpruefung.bpmn",
    "order-approval-process.bpmn"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">BPMN Viewer</h1>

      <select
        className="border p-2 rounded mb-4"
        value={file}
        onChange={(e) => setFile(e.target.value)}
      >
        {files.map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      <BpmnViewer file={file} />
    </div>
  );
}

