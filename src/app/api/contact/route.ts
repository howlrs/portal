import { NextResponse } from "next/server";

interface ContactRequest {
  from?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const maxEmailLength = 254;
const maxSubjectLength = 100;
const maxMessageLength = 3000;

const truncate = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 3)}...` : value;

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= maxEmailLength;

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { code: 500, message: "Discord Webhook URL is not configured" },
      { status: 500 },
    );
  }

  let body: ContactRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { code: 400, message: "Invalid request body" },
      { status: 400 },
    );
  }

  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const from = body.from?.trim() || "portal";

  if (!isValidEmail(email) || !subject || !message) {
    return NextResponse.json(
      { code: 400, message: "Invalid contact form values" },
      { status: 400 },
    );
  }

  if (subject.length > maxSubjectLength || message.length > maxMessageLength) {
    return NextResponse.json(
      { code: 400, message: "Contact form values are too long" },
      { status: 400 },
    );
  }

  const contactId = crypto.randomUUID();
  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "howlrs.net Contact",
      embeds: [
        {
          title: truncate(subject, 256),
          color: 0x1677ff,
          fields: [
            { name: "Contact ID", value: contactId, inline: false },
            { name: "From", value: truncate(from, 100), inline: true },
            { name: "Email", value: truncate(email, 254), inline: true },
          ],
          description: truncate(message, 4096),
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!discordResponse.ok) {
    return NextResponse.json(
      { code: 502, message: "Failed to send Discord notification" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    code: 200,
    message: { contact_id: contactId },
  });
}
