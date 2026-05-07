"use client";

import { Brain, Layers, Activity } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useReveal } from "@/lib/hooks";
import { EDUCATION } from "@/lib/data";
import type { ReactNode } from "react";

function PrincipleCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 p-5 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-7 h-7 rounded-md bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
          {icon}
        </div>
        <div className="text-white text-[14px]">{title}</div>
      </div>
      <p className="text-white/55 text-[13px] leading-relaxed">{text}</p>
    </div>
  );
}

export default function About() {
  const [ref, shown] = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={`relative py-28 px-5 reveal ${shown ? "is-shown" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          idx="01"
          kicker="About"
          title={
            <>
              A data scientist who builds{" "}
              <span className="italic text-accent/90">production systems</span>.
            </>
          }
        />

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6 text-white/75 text-[15px] md:text-[16px] leading-[1.75]">
            <p>
              I'm Kushal — a Master's student in Data Science at UMBC, focused on{" "}
              <span className="text-white">applied ML</span>,{" "}
              <span className="text-white">production systems</span>, and{" "}
              <span className="text-white">retrieval-augmented generation</span>. I write
              code that ships — from data pipelines to API services to full-stack
              applications that people actually use.
            </p>
            <p>
              What matters to me is building systems that are{" "}
              <span className="text-white">measurably good</span>. A high
              validation score in a notebook doesn't count. RAGAS evaluations, baselines,
              ablations, latency trade-offs, cost accounting — those matter. I believe
              the difference between research and production is rigor, not magic.
            </p>
            <p>
              Right now I'm finishing my Masters in Data Science & deepening my AWS Solutions Architect prep, and writing about the
              infrastructure side of LLM applications — caching, evaluation, retrieval
              routing — the parts most tutorials skip.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <PrincipleCard
              icon={<Brain className="w-4 h-4" />}
              title="Models are products"
              text="A high validation score doesn't ship. Latency, cost, and observability shape what actually works in production."
            />
            <PrincipleCard
              icon={<Layers className="w-4 h-4" />}
              title="Full-stack ownership"
              text="I own projects end-to-end: from data pipelines to APIs to frontend. Integration catches what isolation misses."
            />
            <PrincipleCard
              icon={<Activity className="w-4 h-4" />}
              title="Measure everything"
              text="Baselines, ablations, evaluations. If I claim a result, there's a notebook somewhere that proves it."
            />
          </div>
        </div>

        {/* education timeline */}
        <div className="mt-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-8">
            / education
          </div>
          <div className="space-y-6">
            {EDUCATION.map((e, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 group">
                <div className="col-span-12 md:col-span-3 font-mono text-[12px] text-white/40 pt-1">
                  {e.period}
                </div>
                <div className="col-span-12 md:col-span-9 border-l border-white/10 group-hover:border-accent/40 pl-6 pb-2 transition-colors relative">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-white/30 group-hover:border-accent group-hover:bg-accent transition-colors" />
                  <div className="text-white text-[15px] md:text-[17px]">
                    {e.school}
                  </div>
                  <div className="text-white/60 text-[14px] mt-1">{e.degree}</div>
                  <div className="text-white/40 text-[13px] mt-1">{e.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}