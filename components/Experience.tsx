"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useReveal } from "@/lib/hooks";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  const [open, setOpen] = useState(0);
  const [ref, shown] = useReveal<HTMLElement>();

  return (
    <section
      id="work"
      ref={ref}
      className={`relative py-28 px-5 reveal ${shown ? "is-shown" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          idx="02"
          kicker="Experience"
          title={
            <>
              Where I've <span className="italic text-accent/90">shipped</span>.
            </>
          }
          sub="Embedded firmware, Python tooling, and sensor analytics — full lifecycle, in production."
        />

        <div className="space-y-3">
          {EXPERIENCE.map((e, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`group rounded-2xl border ${
                  isOpen
                    ? "border-accent/30 bg-accent/[0.02]"
                    : "border-white/10 bg-white/[0.015] hover:border-white/20"
                } transition-all duration-300`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full text-left p-6 md:p-8 flex items-start gap-6"
                  data-cursor="hover"
                  aria-expanded={isOpen}
                >
                  <div className="hidden md:flex flex-col items-center pt-1">
                    <div
                      className={`w-10 h-10 rounded-xl ${
                        isOpen
                          ? "bg-accent text-black"
                          : "bg-white/5 text-white/60"
                      } flex items-center justify-center transition-colors`}
                    >
                      <Cpu className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="text-white text-[18px] md:text-[20px]">
                        {e.role}
                      </span>
                      <span className="font-mono text-[12px] text-accent/80">
                        @ {e.company}
                      </span>
                    </div>
                    <div className="font-mono text-[12px] text-white/40 mt-1">
                      {e.period} · {e.location}
                    </div>
                    <p
                      className={`text-white/65 text-[14px] md:text-[15px] leading-relaxed mt-3 ${
                        isOpen ? "" : "line-clamp-2"
                      }`}
                    >
                      {e.summary}
                    </p>
                  </div>
                  <div
                    className={`text-white/40 text-2xl transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-8 pt-2">
                      <div className="grid grid-cols-3 gap-3 mb-7">
                        {e.impact.map((m, j) => (
                          <div
                            key={j}
                            className="rounded-xl border border-white/10 bg-black/40 p-4"
                          >
                            <div className="font-display text-[clamp(1.4rem,3vw,2rem)] leading-none text-accent">
                              {m.metric}
                            </div>
                            <div className="text-[11px] text-white/45 mt-2 leading-snug">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <ul className="space-y-3 mb-7">
                        {e.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-white/70 text-[14px] leading-relaxed"
                          >
                            <span className="text-accent/70 font-mono mt-[2px] text-[11px]">
                              {String(j + 1).padStart(2, "0")}
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {e.stack.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
