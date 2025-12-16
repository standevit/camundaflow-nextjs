"use client";

import { useState } from "react";
import { useTranslation } from "@/components/LanguageProvider";

export default function ContactForm() {
  const { t, getArray } = useTranslation();
  const [status, setStatus] = useState<"" | "loading" | "success" | "error">("");
  const topics = getArray("topic_options");
  const [topic, setTopic] = useState<string>(topics[0] || "");

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

    // check localized "Other" option by matching last option key
    const otherKey = topics[topics.length - 1] || "Other";
    if (data.topic === otherKey && !data.otherDescription) {
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
      setTopic(topics[0] || "");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-group">
          <label className="contact-label">{t("name")}</label>
          <input name="name" required className="contact-input" />
        </div>

        <div className="contact-group">
          <label className="contact-label">{t("email")}</label>
          <input name="email" type="email" required className="contact-input" />
        </div>

        <div className="contact-group">
          <label className="contact-label">{t("phone")}</label>
          <input name="phone" type="tel" placeholder={t("phone_placeholder") as string} className="contact-input" />
        </div>

        <div className="contact-group">
          <label className="contact-label">{t("company")}</label>
          <input name="company" required className="contact-input" />
        </div>

        <div className="contact-group">
          <label className="contact-label">{t("topic_label")}</label>
          <select
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="contact-input"
          >
            {topics.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {topic === (topics[topics.length - 1] || "Other") && (
          <div className="contact-group">
            <label className="contact-label">{t("other_description")}</label>
            <textarea name="otherDescription" rows={4} required className="contact-textarea" />
          </div>
        )}

        <div className="contact-group">
          <label className="contact-label">{t("message")}</label>
          <textarea name="message" rows={6} required className="contact-textarea" />
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">{t("required_note")}</p>
        </div>

        <button type="submit" className="btn-primary contact-button mt-4">
          {status === "loading" ? (t("sending") as string) : (t("send") as string)}
        </button>
      </form>

      {status === "success" && (
        <p className="text-center mt-6 font-semibold text-green-600">{t("success")}</p>
      )}

      {status === "error" && (
        <p className="text-center mt-6 font-semibold text-red-600">{t("error")}</p>
      )}
    </>
  );
}

