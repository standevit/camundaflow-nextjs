import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, phone, company, topic, otherDescription } = await req.json();

    if (!name || !email || !message || !company || !topic) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // STARTTLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Kontakt" <${process.env.MAIL_USER}>`,
      to: "post@camundaflow.de",
      replyTo: email,
      subject: "Neue Kontaktanfrage – camundaflow.de",
      html: `
        <p><b>Name:</b> ${company} — ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefon:</b> ${phone || "-"}</p>
        <p><b>Thema:</b> ${topic}</p>
        ${otherDescription ? `<p><b>Weitere Beschreibung:</b> ${otherDescription.replace(/\n/g, "<br/>")}</p>` : ""}
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Mail failed" }, { status: 500 });
  }
}

