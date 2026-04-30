import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function hasMailConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_TO_EMAIL
  );
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 120).toLowerCase();
  const subject = clean(payload.subject, 140);
  const message = clean(payload.message, 3000);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: "Please complete every field." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Please use a valid email address." }, { status: 400 });
  }

  if (!hasMailConfig()) {
    return NextResponse.json(
      {
        message:
          "The contact email server is not configured yet. Add SMTP settings to .env.local.",
      },
      { status: 503 }
    );
  }

  const secure = process.env.SMTP_SECURE === "true";
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 16px;color:#0f172a">New portfolio message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <div style="margin-top:18px;padding:16px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc">
        ${escapeHtml(message).replace(/\n/g, "<br />")}
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html,
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact email failed:", error);
    return NextResponse.json(
      { message: "Message could not be sent right now. Please try again later." },
      { status: 500 }
    );
  }
}
