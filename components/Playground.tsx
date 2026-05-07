"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useReveal } from "@/lib/hooks";
import {
  PLAYGROUND_GREETING,
  PLAYGROUND_SUGGESTIONS,
} from "@/lib/data";
import type { ChatMessage } from "@/types";

export default function Playground() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: PLAYGROUND_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ref, shown] = useReveal<HTMLElement>();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg =
          data?.error ||
          "Hmm — something went wrong. Try again or email Kushal directly.";
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: msg,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Connection issue — try again in a moment, or email Kushal directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="playground"
      ref={ref}
      className={`relative py-28 px-5 reveal ${shown ? "is-shown" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          idx="06"
          kicker="Live demo"
          title={
            <>
              Talk to <span className="italic text-accent/90">KUSHAL.AI</span>.
            </>
          }
          sub="A real LLM, primed on Kushal's resume and project notes. Ask hard questions — it's allowed to say it doesn't know."
        />

        <div className="rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden">
          {/* terminal header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-black/40">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
            </div>
            <div className="flex-1 text-center font-mono text-[11px] text-white/40 tracking-wide">
              kushal.ai — groq · llama-3.3-70b
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[10px] text-accent/80 uppercase tracking-wider">
                live
              </span>
            </div>
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            className="h-[440px] overflow-y-auto thin-scrollbar p-5 space-y-4 font-mono text-[13px] leading-relaxed"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  m.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[11px] ${
                    m.role === "user"
                      ? "bg-white/10 text-white/70"
                      : "bg-accent text-black"
                  }`}
                >
                  {m.role === "user" ? "you" : "ai"}
                </div>
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-white/5 text-white/85"
                      : "bg-accent/[0.04] border border-accent/15 text-white/85"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-md bg-accent text-black flex items-center justify-center text-[11px]">
                  ai
                </div>
                <div className="bg-accent/[0.04] border border-accent/15 rounded-xl px-4 py-3">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-accent/70 rounded-full animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 bg-accent/70 rounded-full animate-bounce"
                      style={{ animationDelay: "120ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-accent/70 rounded-full animate-bounce"
                      style={{ animationDelay: "240ms" }}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* suggestions */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-5 pb-3">
              {PLAYGROUND_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  data-cursor="hover"
                  className="text-[12px] font-mono text-white/55 hover:text-accent border border-white/10 hover:border-accent/40 rounded-full px-3 py-1 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* input */}
          <div className="border-t border-white/10 p-3 flex items-center gap-2">
            <span className="font-mono text-[12px] text-accent pl-2">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask anything…"
              className="flex-1 bg-transparent outline-none font-mono text-[13px] text-white placeholder-white/30 px-1 py-2"
              maxLength={500}
              aria-label="Message KUSHAL.AI"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              data-cursor="hover"
              className="bg-accent disabled:bg-white/10 disabled:text-white/30 text-black rounded-md px-3 py-1.5 text-[12px] font-mono inline-flex items-center gap-1.5 hover:bg-accent-200 transition"
              aria-label="Send message"
            >
              <Send className="w-3 h-3" /> send
            </button>
          </div>
        </div>

        <div className="mt-4 text-[11px] font-mono text-white/35 text-center">
          powered by groq · llama-3.3-70b · system prompt kept transparent ·
          rate-limited to keep costs predictable
        </div>
      </div>
    </section>
  );
}
