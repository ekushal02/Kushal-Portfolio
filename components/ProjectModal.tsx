"use client";

import { useEffect } from "react";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "@/types";

function PSI({
  label,
  body,
  highlight,
}: {
  label: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border ${
        highlight
          ? "border-accent/25 bg-accent/[0.03]"
          : "border-white/10 bg-white/[0.02]"
      } p-5`}
    >
      <div
        className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-3 ${
          highlight ? "text-accent/90" : "text-white/40"
        }`}
      >
        {label}
      </div>
      <p className="text-[13px] text-white/75 leading-relaxed">{body}</p>
    </div>
  );
}

type Props = {
  p: Project;
  onClose: () => void;
};

export default function ProjectModal({ p, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${p.id}`}
    >
      <div
        className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-7 md:p-10 border-b border-white/10 overflow-hidden">
          <div
            className={`absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-radial ${p.accent} blur-3xl opacity-60`}
          />
          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent/80">
                  {p.tag} · {p.year}
                </span>
                <h3
                  id={`modal-title-${p.id}`}
                  className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight text-white mt-2"
                >
                  {p.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
                data-cursor="hover"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/65 text-[15px] leading-relaxed max-w-2xl">
              {p.blurb}
            </p>
          </div>
        </div>

        <div className="p-7 md:p-10 space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {p.metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] leading-none text-accent">
                  {m.value}
                </div>
                <div className="text-[11px] text-white/45 mt-2 leading-snug">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <PSI label="Problem" body={p.problem} />
            <PSI label="Solution" body={p.solution} />
            <PSI label="Impact" body={p.impact} highlight />
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              / stack
            </div>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[12px] px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10 text-white/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-sm rounded-full px-4 py-2 transition"
              >
                <Github className="w-3.5 h-3.5" /> View on GitHub
              </a>
            )}
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-sm rounded-full px-4 py-2 transition"
              >
                <ArrowUpRight className="w-3.5 h-3.5" /> Live demo
              </a>
            )}
            <a
              href="#contact"
              onClick={onClose}
              data-cursor="hover"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-200 text-black text-sm rounded-full px-4 py-2 transition"
            >
              Discuss this project <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
