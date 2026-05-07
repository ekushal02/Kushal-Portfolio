"use client";

import {
  Code2,
  Brain,
  Layers,
  Sparkles,
  Cloud,
  Database,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import RadarChart from "@/components/RadarChart";
import { useReveal } from "@/lib/hooks";
import { SKILLS, RADAR_DATA } from "@/lib/data";
import type { Skill, ProficiencyLevel } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Brain,
  Layers,
  Sparkles,
  Cloud,
  Database,
};

function ProficiencyDots({ level }: { level: ProficiencyLevel }) {
  return (
    <span
      className="inline-flex gap-0.5 ml-2"
      aria-label={`Proficiency: ${level} of 3`}
    >
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-1 h-1 rounded-full ${
            i <= level ? "bg-accent" : "bg-white/15"
          }`}
        />
      ))}
    </span>
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <span className="font-mono text-[11px] inline-flex items-center px-2 py-0.5 rounded text-white/70 border border-white/10 bg-black/30 hover:border-accent/30 hover:text-white transition-colors cursor-default">
      {skill.name}
      <ProficiencyDots level={skill.level} />
    </span>
  );
}

export default function Skills() {
  const [ref, shown] = useReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className={`relative py-28 px-5 reveal ${shown ? "is-shown" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          idx="04"
          kicker="Capabilities"
          title={
            <>
              The <span className="italic text-accent/90">stack</span>.
            </>
          }
          sub="What I reach for. Each skill is rated honestly — depth varies, the dots tell you where I actually live vs. ramp into."
        />

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Radar chart */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.015] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                / proficiency radar
              </div>
              <div className="font-mono text-[10px] text-white/30">
                self-rated
              </div>
            </div>
            <RadarChart data={RADAR_DATA} />
            <div className="mt-4 flex items-center gap-3 text-[11px] font-mono text-white/40">
              <span className="inline-flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span className="w-1 h-1 rounded-full bg-accent" />
              </span>
              <span>strong</span>
              <span className="opacity-50">·</span>
              <span className="inline-flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span className="w-1 h-1 rounded-full bg-white/15" />
              </span>
              <span>comfortable</span>
              <span className="opacity-50">·</span>
              <span className="inline-flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <span className="w-1 h-1 rounded-full bg-white/15" />
              </span>
              <span>familiar</span>
            </div>
          </div>

          {/* Skill groups */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {SKILLS.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? Code2;
              return (
                <div
                  key={cat.group}
                  className="rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-5 group"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-md bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-white text-[14px]">{cat.group}</span>
                  </div>
                  <p className="text-white/45 text-[11px] mb-3 ml-10">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <SkillChip key={s.name} skill={s} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}