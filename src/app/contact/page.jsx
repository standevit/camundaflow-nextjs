'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sende…");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
      })
    });

    if (res.ok) {
      setStatus("Vielen Dank! Wir melden uns in Kürze.");
      e.target.reset();
    } else {
      setStatus("Fehler – bitte direkt an post@camundaflow.de schreiben");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-bold mb-6">Kontakt</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Name *" required className="border p-3 rounded" />
        <input name="email" type="email" placeholder="E-Mail *" required className="border p-3 rounded" />
        <textarea name="message" rows="6" placeholder="Nachricht *" required className="border p-3 rounded"></textarea>
        <button className="bg-blue-600 text-white p-3 rounded">Nachricht senden</button>
      </form>

      {status && (
        <p className="mt-4 text-center font-semibold">{status}</p>
      )}
    </div>
  );
}

