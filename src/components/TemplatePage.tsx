"use client";

import { useEffect } from "react";

type Item = {
  label: string;
  template: string;
};

export default function TemplatePage({
  items,
  initial,
}: {
  items: Item[];
  initial: string;
}) {
  const loadPage = async (file: string) => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    const html = await fetch(file).then((r) => r.text());
    canvas.innerHTML = html;

    const BpmnJS = (await import(
      "bpmn-js/dist/bpmn-navigated-viewer.development.js"
    )).default;

    const blocks = canvas.querySelectorAll("[data-diagram]");
    blocks.forEach(async (block) => {
      const diagram = block.getAttribute("data-diagram");
      if (!diagram) return;

      const viewer = new BpmnJS({ container: block });
      const xml = await fetch(diagram).then((r) => r.text());
      await viewer.importXML(xml);
      //viewer.get("canvas").zoom("fit-viewport", { padding: 40 });
    const canvas = viewer.get("canvas");

    const tryZoom = () => {
      const viewbox = canvas.viewbox();

      if (
        viewbox.inner &&
        viewbox.outer &&
        viewbox.outer.width > 0 &&
        viewbox.outer.height > 0
      ) {
        canvas.zoom("fit-viewport", { padding: 30 });
      } else {
        requestAnimationFrame(tryZoom);
      }
    };

    tryZoom();



    });
  };

  useEffect(() => {
    loadPage("/" + initial);

    document.querySelectorAll(".example-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        document
          .querySelectorAll(".example-link")
          .forEach((l) => l.classList.remove("active"));

        link.classList.add("active");

        const file = link.getAttribute("data-template");
        if (file) loadPage("/" + file);
      });
    });
  }, []);

  return (
    <div className="container">
      <aside className="sidebar">
        <h3>Beispiele auswählen</h3>
        <ul>
          {items.map((i, idx) => (
            <li key={i.template}>
              <a
                className={`example-link ${idx === 0 ? "active" : ""}`}
                data-template={i.template}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <div className="card">
          <div id="canvas" />
        </div>
      </main>
    </div>
  );
}

