// src/components/ContactForm.tsx
'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sende…");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (res.ok) {
      setStatus("Vielen Dank! Wir melden uns bald.");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("Fehler – bitte direkt an post@camundaflow.de");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="name" placeholder="Name *" required className="w-full p-4 border rounded-lg" />
        <input name="email" type="email" placeholder="E-Mail *" required className="w-full p-4 border rounded-lg" />
        <textarea name="message" rows={8} placeholder="Ihre Nachricht *" required className="w-full p-4 border rounded-lg" />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-xl transition">
          Nachricht senden
        </button>
      </form>
      {status && <p className="text-center text-xl font-bold mt-8">{status}</p>}
    </>
  );
}
