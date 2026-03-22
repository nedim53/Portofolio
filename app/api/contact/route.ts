import { Resend } from "resend";
import { NextResponse } from "next/server";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }

  if (trimmedName.length > 200) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
  if (!emailOk) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (trimmedMessage.length > 8000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const apiKey = process.env.NEXT_RESEND_API_KEY || process.env.RESEND_API_KEY;
  const to = process.env.NEXT_CONTACT_EMAIL_TO || process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured. Set NEXT_RESEND_API_KEY and NEXT_CONTACT_EMAIL_TO in .env (or RESEND_API_KEY and CONTACT_TO_EMAIL).",
      },
      { status: 503 }
    );
  }

  const from =
    process.env.NEXT_CONTACT_FROM_EMAIL?.trim() ||
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Portfolio <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const html = `
    <h2 style="font-family:system-ui,sans-serif">New portfolio message</h2>
    <p style="font-family:system-ui,sans-serif"><strong>From:</strong> ${escapeHtml(trimmedName)}</p>
    <p style="font-family:system-ui,sans-serif"><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
    <p style="font-family:system-ui,sans-serif"><strong>Message:</strong></p>
    <p style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(trimmedMessage)}</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: trimmedEmail,
    subject: `Portfolio: ${trimmedName}`,
    html,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
