"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#playground", label: "Playground" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCmdK = () => window.dispatchEvent(new Event("cmdk:open"));

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div
          className={`flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-5 py-2.5 transition-all ${
            scrolled
              ? "shadow-[0_8px_32px_-8px_rgba(214,255,61,0.08)]"
              : ""
          }`}
        >
          <a
            href="#top"
            className="flex items-center gap-2 font-mono text-[13px] tracking-tight"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-white/90">kushal</span>
            <span className="text-white/30">/</span>
            <span className="text-white/50">portfolio</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-white/60 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={openCmdK}
            data-cursor="hover"
            className="flex items-center gap-2 text-[12px] font-mono text-white/50 hover:text-white border border-white/10 hover:border-accent/40 rounded-full pl-3 pr-2 py-1.5 transition-colors"
            aria-label="Open command palette"
          >
            <Command className="w-3 h-3" />
            <span className="hidden sm:inline">K</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
