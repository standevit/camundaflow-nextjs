import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: "post@camundaflow.de",
      replyTo: email,
      subject: `Website-Anfrage von ${name}`,
      html: `
        <h3>Neue Anfrage</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>E-Mail:</b> ${email}</p>
        <p><b>Nachricht:</b></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Mail nicht gesendet" }, { status: 500 });
  }
}

