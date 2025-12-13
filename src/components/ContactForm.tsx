"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"" | "loading" | "success" | "error">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
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
          <label className="contact-label">Nachricht *</label>
          <textarea name="message" rows={6} required className="contact-textarea" />
        </div>

        <button type="submit" className="btn-primary contact-button">
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

