"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { useReveal } from "@/lib/hooks";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/data";
import type { Project, ProjectCategory } from "@/types";

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [active, setActive] = useState<Project | null>(null);
  const [ref, shown] = useReveal<HTMLElement>();

  const items =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={ref}
      className={`relative py-28 px-5 reveal ${shown ? "is-shown" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          idx="03"
          kicker="Selected work"
          title={
            <>
              Things I've <span className="italic text-accent/90">built</span>.
            </>
          }
          sub="Production systems, research, and weekend obsessions. Click any card for the full architecture story."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              data-cursor="hover"
              className={`text-[12px] font-mono uppercase tracking-wide px-3.5 py-1.5 rounded-full border transition-all ${
                filter === f.key
                  ? "bg-accent border-accent text-black"
                  : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
              }`}
              aria-pressed={filter === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={() => setActive(p)} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16 text-white/40 font-mono text-sm">
            No projects in this category yet. Check back soon.
          </div>
        )}
      </div>

      {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
    </section>
  );
}
