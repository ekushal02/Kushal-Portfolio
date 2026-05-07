"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

type Props = {
  p: Project;
  onOpen: () => void;
};

export default function ProjectCard({ p, onOpen }: Props) {
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <button
      ref={cardRef}
      onClick={onOpen}
      data-cursor="hover"
      className="project-card group relative text-left rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 hover:border-white/20 transition-all duration-500 p-7 min-h-[300px] flex flex-col"
      aria-label={`Open case study for ${p.title}`}
    >
      {/* hover spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(214,255,61,0.07), transparent 60%)`,
        }}
      />
      {/* corner glow */}
      <div
        className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-radial ${p.accent} opacity-50 blur-3xl pointer-events-none`}
      />

      <div className="relative flex items-center justify-between mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent/70">
          {p.tag}
        </span>
        <span className="font-mono text-[11px] text-white/30">{p.year}</span>
      </div>

      <h3 className="relative font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight text-white mb-3 group-hover:text-accent transition-colors">
        {p.title}
      </h3>
      <p className="relative text-[14px] text-white/55 leading-relaxed mb-6 flex-1">
        {p.blurb}
      </p>

      <div className="relative flex flex-wrap gap-1.5 mb-5">
        {p.stack.slice(0, 5).map((s) => (
          <span
            key={s}
            className="font-mono text-[10px] px-2 py-0.5 rounded text-white/50 border border-white/10 bg-white/[0.02]"
          >
            {s}
          </span>
        ))}
        {p.stack.length > 5 && (
          <span className="font-mono text-[10px] px-2 py-0.5 text-white/40">
            +{p.stack.length - 5}
          </span>
        )}
      </div>

      <div className="relative flex items-center gap-1.5 text-[13px] text-white/70 group-hover:text-accent transition-colors">
        <span>Read case study</span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </button>
  );
}
