import { useEffect, useRef, useState, type FormEvent } from "react";
import { GirlHead } from "./Character";
import { EMAIL } from "../lib/site";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What has Tife shipped?",
  "What is her AI experience?",
  "How does she work with data?",
  "Why product management?",
];

const greeting: Msg = {
  role: "assistant",
  content:
    "Hi! I can answer questions about Tife's projects, experience and skills, using her CV and case studies. What would you like to know?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next: Msg[] = [...messagesRef.current, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);
    let reply: string;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // The greeting is ours, not the model's, so leave it out
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = (await res.json().catch(() => null)) as { reply?: string; error?: string } | null;
      if (res.ok && data?.reply) reply = data.reply;
      else if (res.status === 429) reply = "That's a lot of questions in a short time. Give me a few minutes, or email Tife directly at " + EMAIL + ".";
      else reply = "I can't answer right now. You can email Tife directly at " + EMAIL + ", or download her CV from the top of the page.";
    } catch {
      reply = "I can't answer right now. You can email Tife directly at " + EMAIL + ", or download her CV from the top of the page.";
    }
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setBusy(false);
  }

  // Other buttons on the page can open the chat
  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const question = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (question) void send(question);
    };
    window.addEventListener("tife:chat", onOpen);
    return () => window.removeEventListener("tife:chat", onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Ask about Tife"
          className="chat-panel w-[calc(100vw-2rem)] sm:w-[380px] h-[min(540px,calc(100dvh-7rem))] rounded-3xl bg-paper border border-border shadow-2xl shadow-ink/25 flex flex-col overflow-hidden"
        >
          <div className="flex items-center gap-3 bg-blush px-4 py-3">
            <GirlHead className="h-10 w-10 rounded-full bg-paper shrink-0" />
            <div className="flex-1 leading-tight">
              <div className="font-display font-bold">Ask about Tife</div>
              <div className="text-xs opacity-75">AI assistant, answers from her CV</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="h-8 w-8 rounded-full hover:bg-ink/10 text-xl leading-none"
            >
              ×
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-[0.94rem] leading-relaxed">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 ${
                    m.role === "user" ? "bg-ink text-background rounded-br-md" : "bg-background border border-border rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="typing flex gap-1 rounded-2xl rounded-bl-md bg-background border border-border px-4 py-3.5" aria-label="Thinking">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            {messages.length === 1 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-full border border-ink/25 px-3 py-1.5 text-sm font-medium hover:bg-ink hover:text-background transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Ask a question"
              aria-label="Your question"
              className="flex-1 rounded-full bg-background border border-border px-4 py-2.5 text-[0.94rem] outline-none focus:border-ink"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="h-10 w-10 shrink-0 rounded-full bg-ink text-background disabled:opacity-35 hover:bg-accent transition-colors"
            >
              ↑
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex items-center gap-2.5 rounded-full bg-ink text-background pl-1.5 pr-5 py-1.5 shadow-xl shadow-ink/30 hover:bg-accent transition-colors"
      >
        <GirlHead className="h-10 w-10 rounded-full bg-blush" />
        <span className="font-semibold text-sm">{open ? "Close" : "Ask about Tife"}</span>
      </button>
    </div>
  );
}
