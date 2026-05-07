"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, Calendar } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useReveal } from "@/lib/hooks";
import { PROFILE } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [ref, shown] = useReveal<HTMLElement>();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative py-28 px-5 reveal ${shown ? "is-shown" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          idx="07"
          kicker="Contact"
          title={
            <>
              Let's <span className="italic text-accent/90">build</span> something.
            </>
          }
          sub="Internships, full-time roles, research collaborations, or just a good technical conversation — all welcome."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {/* Email card */}
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-accent/[0.04] to-transparent p-7 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent text-black flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    / fastest reply
                  </div>
                  <div className="text-white text-[15px]">Email</div>
                </div>
              </div>
              <div className="font-mono text-[14px] md:text-[16px] text-white/90 break-all mb-5">
                {PROFILE.email}
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-200 text-black text-sm rounded-full px-4 py-2 transition"
                >
                  <Mail className="w-3.5 h-3.5" /> Send email
                </a>
                <button
                  onClick={copy}
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-sm rounded-full px-4 py-2 transition"
                  aria-label="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Channels card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 text-white/70 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  / channels
                </div>
                <div className="text-white text-[15px]">Find me elsewhere</div>
              </div>
            </div>
            <div className="space-y-2.5">
              <a
                href={`https://github.com/${PROFILE.github}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="flex items-center justify-between rounded-lg border border-white/10 hover:border-accent/30 hover:bg-white/[0.03] px-4 py-3 transition group"
              >
                <span className="flex items-center gap-3 text-white/85 text-sm">
                  <Github className="w-4 h-4" />
                  github.com/{PROFILE.github}
                </span>
                <span className="font-mono text-[10px] text-white/40 group-hover:text-accent">
                  →
                </span>
              </a>
              <a
                href={`https://linkedin.com/in/${PROFILE.linkedin}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="flex items-center justify-between rounded-lg border border-white/10 hover:border-accent/30 hover:bg-white/[0.03] px-4 py-3 transition group"
              >
                <span className="flex items-center gap-3 text-white/85 text-sm">
                  <Linkedin className="w-4 h-4" />
                  linkedin.com/in/{PROFILE.linkedin}
                </span>
                <span className="font-mono text-[10px] text-white/40 group-hover:text-accent">
                  →
                </span>
              </a>
              <div className="flex items-center justify-between rounded-lg border border-dashed border-white/10 px-4 py-3 opacity-60">
                <span className="flex items-center gap-3 text-white/45 text-sm">
                  <Calendar className="w-4 h-4" />
                  Schedule a call
                </span>
                <span className="font-mono text-[10px] text-white/30">soon</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/8">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-accent" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent/90">
                Available now
              </span>
              <span className="font-mono text-[11px] text-white/40">
                · usually responds within 24h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
