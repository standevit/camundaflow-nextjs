"use client";

import { useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import Link from "next/link";

export default function HomePage() {
  const { t, locale } = useTranslation();

  const getLocalizedCandidate = (path: string) => {
    // For German, use base file (no suffix); for English, use -en suffix
    if (locale === "de") {
      return path.startsWith("/") ? path : "/" + path;
    }
    const withSlash = path.startsWith("/") ? path : "/" + path;
    const parts = withSlash.split("/");
    const filename = parts.pop() || "";
    const m = filename.match(/(.+)\.html$/);
    if (!m) return withSlash;
    const base = m[1];
    const suffix = locale === "en" ? "-en" : `-${locale}`;
    const localized = `${base}${suffix}.html`;
    parts.push(localized);
    return parts.join("/");
  };

  const loadPage = async (file: string) => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    const candidate = getLocalizedCandidate(file);
    let html: string;
    try {
      const res = await fetch(candidate);
      if (res.ok) html = await res.text();
      else html = await fetch(file.startsWith("/") ? file : "/" + file).then(res => res.text());
    } catch (e) {
      html = await fetch(file.startsWith("/") ? file : "/" + file).then(res => res.text());
    }

    canvas.innerHTML = html;

    // dinamički učitaj BPMN viewer
    const BpmnJS = (await import(
      "bpmn-js/dist/bpmn-navigated-viewer.development.js"
    )).default;

    // pronađi sve BPMN blokove
    const blocks = canvas.querySelectorAll("[data-diagram]");

    // Process each block sequentially
    for (const block of Array.from(blocks)) {
      const diagram = block.getAttribute("data-diagram");
      if (!diagram) continue;

      try {
        const viewer = new BpmnJS({ container: block });
        const xml = await fetch(diagram).then(r => r.text());

        await viewer.importXML(xml);
        
        const bpmnCanvas = viewer.get("canvas");

        const tryZoom = () => {
          const viewbox = bpmnCanvas.viewbox();

          if (
            viewbox.inner &&
            viewbox.outer &&
            viewbox.outer.width > 0 &&
            viewbox.outer.height > 0
          ) {
            bpmnCanvas.zoom("fit-viewport", { padding: 30 });
          } else {
            requestAnimationFrame(tryZoom);
          }
        };

        tryZoom();
      } catch (err) {
        console.error("Failed to load BPMN diagram:", err);
      }
    }
  };

  // reload initial template when locale changes
  useEffect(() => {
    loadPage("/tmp/bpmn.html");
  }, [locale]);

  // register click handlers once
  useEffect(() => {
    const handlers: Array<() => void> = [];

    document.querySelectorAll(".example-link").forEach(link => {
      const handler = (e: Event) => {
        e.preventDefault();

        document
          .querySelectorAll(".example-link")
          .forEach(l => l.classList.remove("active"));

        link.classList.add("active");

        const file = link.getAttribute("data-template");
        if (file) loadPage("/" + file);
      };
      link.addEventListener("click", handler);
      handlers.push(() => link.removeEventListener("click", handler));
    });

    return () => handlers.forEach(fn => fn());
  }, []);

  return (
    <div className="container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h3>{t("select_examples")}</h3>
        <ul>
          <li>
            <a className="example-link active" data-template="tmp/bpmn.html">
              {t("bpmn_20")}
            </a>
          </li>
          <li>
            <a className="example-link" data-template="tmp/process-basics.html">
              {t("process_modeling")}
            </a>
          </li>
          <li>
            <a className="example-link" data-template="tmp/pizza.html">
              {t("pizza_order")}
            </a>
          </li>
          <li>
            <a className="example-link" data-template="tmp/order-approval-process.html">
              {t("order_approval")}
            </a>
          </li>
          <li>
            <a className="example-link" data-template="tmp/lieferung.html">
              {t("event_driven")}
            </a>
          </li>
          <li>
            <a className="example-link" data-template="tmp/b2bbestellung.html">
              {t("webshop")}
            </a>
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        <div className="card">
          <div id="canvas" />
          <Link href="/ai-agents" className="btn-primary">
            {t("ai_agents_link")}
          </Link>
        </div>
      </main>
    </div>
  );
}


