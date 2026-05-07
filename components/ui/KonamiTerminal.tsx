"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, X } from "lucide-react";
import { PROFILE, PROJECTS } from "@/lib/data";

export default function KonamiTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([
    "[boot] kushal.os 0.2.6 · acid lime build",
    "[boot] you found the secret terminal. nice.",
    "[boot] type `help` for commands.",
  ]);
  const [val, setVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Konami listener
  useEffect(() => {
    const seq = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const expect = seq[pos];
      if (e.key.toLowerCase() === expect.toLowerCase()) {
        pos++;
        if (pos === seq.length) {
          setOpen(true);
          pos = 0;
        }
      } else {
        pos = e.key === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const fortunes = [
    "premature optimization is the root of all evil — but knowing where to optimize is the entire job.",
    "the model with the highest validation score in your slack screenshots is rarely the one that ships.",
    "embedded engineers and ML engineers are secretly the same people, separated by 30 years and one stack trace.",
    "the best feature flag is the one you remember to remove.",
    "every RAG pipeline is one bad query away from being a search bar with extra steps.",
  ];

  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    let out: string[] = [];
    if (c === "help")
      out = ["available: whoami, stack, projects, contact, fortune, clear, exit"];
    else if (c === "whoami")
      out = [`${PROFILE.name} — ${PROFILE.role} — ${PROFILE.location}`];
    else if (c === "stack")
      out = [
        "Python · C++ · TypeScript · PyTorch · LightGBM · FastAPI · Next.js · ChromaDB · AWS · Docker",
      ];
    else if (c === "projects")
      out = PROJECTS.map((p) => `• ${p.title} — ${p.tag}`);
    else if (c === "contact")
      out = [
        `mail: ${PROFILE.email}`,
        `phone: ${PROFILE.phone}`,
        `github: ${PROFILE.github}`,
      ];
    else if (c === "fortune")
      out = [fortunes[Math.floor(Math.random() * fortunes.length)]];
    else if (c === "clear") {
      setLines([]);
      setVal("");
      return;
    } else if (c === "exit") {
      setOpen(false);
      return;
    } else if (c === "") out = [];
    else out = [`zsh: command not found: ${cmd}`];

    setLines((prev) => [...prev, `$ ${cmd}`, ...out]);
    setVal("");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md p-4 md:p-10 flex items-center justify-center"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Hidden developer terminal"
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-accent/30 bg-black overflow-hidden font-mono shadow-[0_0_60px_-10px_rgba(214,255,61,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-accent/20 bg-accent/[0.03]">
          <div className="flex items-center gap-2 text-[11px] text-accent/90 uppercase tracking-wider">
            <Terminal className="w-3 h-3" /> kushal.os · konami unlocked
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/40 hover:text-white"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto thin-scrollbar p-4 text-[12px] text-accent/90 space-y-1"
        >
          {lines.map((l, i) => (
            <div key={i} className={l.startsWith("$") ? "text-white/85" : ""}>
              {l}
            </div>
          ))}
        </div>
        <div className="border-t border-accent/20 p-3 flex items-center gap-2">
          <span className="text-accent">$</span>
          <input
            ref={inputRef}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") run(val);
            }}
            className="flex-1 bg-transparent outline-none text-[13px] text-white placeholder-white/30"
            placeholder="type a command…"
            aria-label="Terminal command input"
          />
        </div>
      </div>
    </div>
  );
}
