"use client";

import { useEffect, useMemo, useState } from "react";

export default function BootSequence() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  const seq = useMemo(
    () => [
      "init kushal.portfolio v1.0",
      "loading three.js scene…",
      "warming neural network…",
      "compiling acid-lime palette…",
      "ready.",
    ],
    []
  );

  useEffect(() => {
    let mounted = true;

    // Skip boot for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHidden(true);
      return;
    }

    // Don't replay the boot on subsequent same-session reloads
    if (sessionStorage.getItem("booted") === "1") {
      setHidden(true);
      return;
    }

    const run = async () => {
      for (let i = 0; i < seq.length; i++) {
        await new Promise((r) => setTimeout(r, 220));
        if (!mounted) return;
        setLines((prev) => [...prev, seq[i]]);
      }
      await new Promise((r) => setTimeout(r, 320));
      if (mounted) {
        setDone(true);
        sessionStorage.setItem("booted", "1");
        setTimeout(() => mounted && setHidden(true), 600);
      }
    };
    run();

    return () => {
      mounted = false;
    };
  }, [seq]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex items-center justify-center px-6 transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="font-mono text-[12px] text-accent/90 max-w-md w-full">
        <div className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          booting
        </div>
        <div className="space-y-1.5">
          {lines.map((l, i) => (
            <div key={i} className="animate-fade-up">
              <span className="text-white/40 mr-2">{`[${String(i).padStart(2, "0")}]`}</span>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
