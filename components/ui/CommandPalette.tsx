"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Command, ChevronRight } from "lucide-react";
import { PROFILE } from "@/lib/data";

type Item = { label: string; action: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      { label: "Go to About", action: () => (location.hash = "#about") },
      { label: "Go to Work", action: () => (location.hash = "#work") },
      { label: "Go to Projects", action: () => (location.hash = "#projects") },
      { label: "Go to Skills", action: () => (location.hash = "#skills") },
      { label: "Go to Certifications", action: () => (location.hash = "#certs") },
      { label: "Open AI Playground", action: () => (location.hash = "#playground") },
      { label: "Contact Kushal", action: () => (location.hash = "#contact") },
      {
        label: "Email Kushal",
        action: () => {
          window.location.href = `mailto:${PROFILE.email}`;
        },
      },
      {
        label: "Open GitHub",
        action: () =>
          window.open(`https://github.com/${PROFILE.github}`, "_blank"),
      },
      {
        label: "Open LinkedIn",
        action: () =>
          window.open(`https://linkedin.com/in/${PROFILE.linkedin}`, "_blank"),
      },
      { label: "Download Resume", action: () => window.open(PROFILE.resumeHref, "_blank") },
      {
        label: "Try Konami code (↑↑↓↓←→←→BA)",
        action: () => {},
      },
    ],
    []
  );

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(q.toLowerCase())
  );

  // ⌘K / Ctrl+K toggles palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Listen for external open requests (from Nav button)
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("cmdk:open", onOpen);
    return () => window.removeEventListener("cmdk:open", onOpen);
  }, []);

  // Auto-focus on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQ("");
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center pt-[16vh] px-4 bg-black/70 backdrop-blur-md"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
          <Command className="w-4 h-4 text-white/50" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent outline-none text-[15px] text-white placeholder-white/30"
          />
          <kbd className="font-mono text-[10px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2 thin-scrollbar">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-white/40">
              No results.
            </div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  item.action();
                  setOpen(false);
                }}
                className="w-full text-left flex items-center justify-between px-4 py-2.5 hover:bg-white/5 group"
              >
                <span className="text-[14px] text-white/80 group-hover:text-white">
                  {item.label}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-accent" />
              </button>
            ))
          )}
        </div>
        <div className="border-t border-white/8 px-4 py-2 text-[11px] font-mono text-white/30 flex justify-between">
          <span>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          <span>↑↓ navigate · ↵ select</span>
        </div>
      </div>
    </div>
  );
}
