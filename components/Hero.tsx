"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Download } from "lucide-react";
import { useMagnetic } from "@/lib/hooks";
import { PROFILE } from "@/lib/data";

// 3D scene: client-only, lazy-loaded
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
});

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
        {label}
      </span>
      <span className="text-[13px] text-white/85">{value}</span>
    </div>
  );
}

export default function Hero() {
  const [typed, setTyped] = useState("");
  const fullText = PROFILE.tagline;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(fullText);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(t);
    }, 24);
    return () => clearInterval(t);
  }, [fullText]);

  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);
  const ctaRef2 = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <HeroCanvas />

      {/* atmospheric fades */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_75%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 w-full py-24 md:py-28">
        {/* status pill */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-accent" />
          </span>
          <span className="font-mono text-[11px] tracking-wide text-accent/90 uppercase">
            {PROFILE.status}
          </span>
        </div>

        <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-white">
          <span
            className="block opacity-0 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            Kushal
          </span>
          <span
            className="block italic text-white/80 opacity-0 animate-fade-in"
            style={{ animationDelay: "450ms" }}
          >
            Erramilli<span className="text-accent">.</span>
          </span>
        </h1>

        <div
          className="mt-10 max-w-2xl opacity-0 animate-fade-in"
          style={{ animationDelay: "700ms" }}
        >
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent/80">
              / role
            </span>
            <span className="text-white/70 text-sm md:text-base">
              {PROFILE.role}
            </span>
          </div>
          <p className="font-mono text-[14px] md:text-base text-white/85 leading-relaxed">
            <span className="text-accent">{">"}</span> {typed}
            <span className="inline-block w-2 h-[1.1em] align-middle bg-accent ml-1 animate-pulse" />
          </p>
        </div>

        <div
          className="mt-12 flex flex-col sm:flex-row flex-wrap gap-3 opacity-0 animate-fade-in"
          style={{ animationDelay: "950ms" }}
        >
          <a
            ref={ctaRef}
            href="#projects"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-200 text-black font-medium text-sm rounded-full pl-5 pr-2 py-2 transition-all duration-300 will-change-transform"
          >
            Explore Work
            <span className="bg-black text-accent rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
          <a
            ref={ctaRef2}
            href="#contact"
            data-cursor="hover"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-white/40 text-white text-sm rounded-full px-5 py-2.5 transition-colors will-change-transform"
          >
            Get in touch
          </a>
          <a
            href={PROFILE.resumeHref}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm rounded-full px-4 py-2.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        <div
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl opacity-0 animate-fade-in"
          style={{ animationDelay: "1100ms" }}
        >
          <Meta label="Based in" value="Baltimore, MD" />
          <Meta label="Studying at" value="UMBC · MS Data Science" />
          <Meta label="GPA" value="3.9 / 4.0" />
          <Meta label="Last updated" value="May 2026" />
        </div>
      </div>

      {/* scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 opacity-0 animate-fade-in"
        style={{ animationDelay: "1400ms" }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
