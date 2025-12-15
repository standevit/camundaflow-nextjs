"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"" | "loading" | "success" | "error">("");
  const [topic, setTopic] = useState<string>("BPMN-Entwicklung");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      message: (formData.get("message") as string) || "",
      phone: (formData.get("phone") as string) || "",
      company: (formData.get("company") as string) || "",
      topic: (formData.get("topic") as string) || "",
      otherDescription: (formData.get("otherDescription") as string) || "",
    };

    // client-side validation (extra): ensure required fields
    if (!data.name || !data.email || !data.message || !data.company || !data.topic) {
      setStatus("error");
      return;
    }

    if (data.topic === "Ostalo" && !data.otherDescription) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
      setTopic("BPMN razvoj");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-group">
          <label className="contact-label">Name *</label>
          <input name="name" required className="contact-input" />
        </div>

        <div className="contact-group">
          <label className="contact-label">E-Mail *</label>
          <input name="email" type="email" required className="contact-input" />
        </div>

        <div className="contact-group">
          <label className="contact-label">Telefon</label>
          <input name="phone" type="tel" placeholder="Optional" className="contact-input" />
        </div>

        <div className="contact-group">
          <label className="contact-label">Firmenname *</label>
          <input name="company" required className="contact-input" />
        </div>

        <div className="contact-group">
          <label className="contact-label">Thema / Leistung *</label>
          <select
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="contact-input"
          >
            <option>BPMN-Entwicklung</option>
            <option>Camunda-Implementierung</option>
            <option>Microservices-Architektur</option>
            <option>Prozessautomatisierung</option>
            <option>Sonstiges</option>
          </select>
        </div>

        {topic === "Sonstiges" && (
          <div className="contact-group">
            <label className="contact-label">Beschreibung (Sonstiges) *</label>
            <textarea name="otherDescription" rows={4} required className="contact-textarea" />
          </div>
        )}

        <div className="contact-group">
          <label className="contact-label">Nachricht *</label>
          <textarea name="message" rows={6} required className="contact-textarea" />
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">* Pflichtfelder</p>
        </div>

        <button type="submit" className="btn-primary contact-button mt-4">
          {status === "loading" ? "Sende…" : "Nachricht senden"}
        </button>
      </form>

      {status === "success" && (
        <p className="text-center mt-6 font-semibold text-green-600">
          Vielen Dank! Ich melde mich bald.
        </p>
      )}

      {status === "error" && (
        <p className="text-center mt-6 font-semibold text-red-600">
          Fehler – bitte direkt an post@camundaflow.de
        </p>
      )}
    </>
  );
}

