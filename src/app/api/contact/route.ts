import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, phone, company, topic, otherDescription, subject } = await req.json();

    // Flexible validation - allow different field combinations
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const emailContent = `
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${company ? `<p><b>Firma:</b> ${company}</p>` : ""}
      ${phone ? `<p><b>Telefon:</b> ${phone}</p>` : ""}
      ${topic ? `<p><b>Thema:</b> ${topic}</p>` : ""}
      ${otherDescription ? `<p><b>Weitere Beschreibung:</b> ${otherDescription.replace(/\n/g, "<br/>")}</p>` : ""}
      <hr/>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;

    // Debug info
    console.log('=== EMAIL API DEBUG ===');
    console.log('MAIL_HOST:', process.env.MAIL_HOST);
    console.log('MAIL_PORT:', process.env.MAIL_PORT);
    console.log('MAIL_USER:', process.env.MAIL_USER);
    console.log('Has MAIL_PASS:', !!process.env.MAIL_PASS);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // Development mode - just log the email
    const isDevelopment = !process.env.MAIL_HOST || process.env.NODE_ENV === 'development';
    console.log('isDevelopment:', isDevelopment);
    
    if (isDevelopment) {
      console.log('=== EMAIL WOULD BE SENT (Development Mode) ===');
      console.log('To: post@camundaflow.de');
      console.log('From:', email);
      console.log('Subject:', subject || 'Neue Kontaktanfrage – camundaflow.de');
      console.log('Content:');
      console.log(emailContent);
      console.log('===========================================');
      
      return NextResponse.json({ success: true, mode: 'development' });
    }

    // Production mode - send actual email
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false, // STARTTLS
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false // Accept self-signed certificates
        }
      });

      console.log('Attempting to send email...');
      
      const info = await transporter.sendMail({
        from: `"Website Kontakt" <${process.env.MAIL_USER}>`,
        to: "post@camundaflow.de",
        replyTo: email,
        subject: subject || `Neue Kontaktanfrage – camundaflow.de${company ? ` (${company})` : ''}`,
        html: emailContent,
      });

      console.log('Email sent successfully!', info.messageId);
      return NextResponse.json({ success: true, mode: 'production', messageId: info.messageId });
    } catch (emailError: any) {
      console.error('SMTP Error:', emailError);
      console.error('Error details:', {
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode
      });
      
      // Still return success but log the error
      return NextResponse.json({ 
        success: false, 
        mode: 'production-failed',
        error: emailError.message,
        details: emailError.code 
      }, { status: 500 });
    }
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: "Mail failed" }, { status: 500 });
  }
}

