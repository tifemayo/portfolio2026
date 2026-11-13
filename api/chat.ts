import { SYSTEM_PROMPT } from "./_profile";

/**
 * Chat endpoint for the portfolio assistant. Runs on Vercel.
 * The OpenAI key lives in the OPENAI_API_KEY environment variable and never reaches the browser.
 */
export const config = { runtime: "edge" };

const MODEL = "gpt-4o-mini";
const MAX_MESSAGES = 12;
const MAX_CHARS = 600;

// Best-effort limit per visitor. It resets when the function instance recycles,
// so also set a monthly spend cap on the OpenAI account.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, { count: number; start: number }>();

function limited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const key = process.env.OPENAI_API_KEY;
  if (!key) return json({ error: "not_configured" }, 503);

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return json({ error: "rate_limited" }, 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Bad request" }, 400);
  }

  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return json({ error: "Bad request" }, 400);

  const messages = raw
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return json({ error: "Bad request" }, 400);
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        max_tokens: 350,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });
    if (!res.ok) return json({ error: "upstream" }, 502);
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return json({ error: "upstream" }, 502);
    return json({ reply });
  } catch {
    return json({ error: "upstream" }, 502);
  }
}
