import { NextResponse } from "next/server";

export const runtime = "nodejs";

const FIELDS = ["name", "email", "company", "role", "status", "workflow", "source"] as const;

function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const lead = Object.fromEntries(
    FIELDS.map((field) => [field, clean((body as Record<string, unknown>)[field])]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (!lead.name || !lead.company || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Missing name, company or a valid email" }, { status: 400 });
  }

  const payload = { ...lead, receivedAt: new Date().toISOString() };
  const webhook = process.env.DEPLOY_LEAD_WEBHOOK;

  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "Could not forward the enquiry" }, { status: 502 });
    }
  } else {
    console.info("[deploy] lead", payload);
  }

  return NextResponse.json({ ok: true });
}
