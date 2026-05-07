import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { PLAYGROUND_SYSTEM } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────
// Simple in-memory rate limiter (per-IP, per-hour)
// For production with multiple instances, swap for Upstash Redis.
// ─────────────────────────────────────────────────────────────
const RATE_LIMIT = Number(process.env.PLAYGROUND_RATE_LIMIT ?? 30);
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimitOk(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT - 1 };
  }
  if (b.count >= RATE_LIMIT) return { ok: false, remaining: 0 };
  b.count++;
  return { ok: true, remaining: RATE_LIMIT - b.count };
}

// ─────────────────────────────────────────────────────────────
// Type guards for request body
// ─────────────────────────────────────────────────────────────
type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidMessages(x: unknown): x is ChatMessage[] {
  if (!Array.isArray(x) || x.length === 0 || x.length > 30) return false;
  return x.every(
    (m) =>
      m &&
      typeof m === "object" &&
      ("role" in m) &&
      ("content" in m) &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length < 4000
  );
}

// ─────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI Playground is not configured. Set GROQ_API_KEY in .env.local. (Get a free key at https://console.groq.com/keys)",
      },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous";

  const limit = rateLimitOk(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Rate limit reached for this hour. Try again later or email me directly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!isValidMessages(messages)) {
    return NextResponse.json(
      { error: "Invalid messages format" },
      { status: 400 }
    );
  }

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: PLAYGROUND_SYSTEM },
        ...messages,
      ],
      max_tokens: 600,
      temperature: 0.6,
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry — I couldn't generate a reply. Try again?";

    return NextResponse.json(
      { reply, remaining: limit.remaining },
      {
        headers: {
          "X-RateLimit-Remaining": String(limit.remaining),
        },
      }
    );
  } catch (err) {
    console.error("[/api/chat] Groq error:", err);
    return NextResponse.json(
      { error: "AI service is temporarily unavailable. Please try again shortly." },
      { status: 502 }
    );
  }
}
