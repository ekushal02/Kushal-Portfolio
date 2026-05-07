"use client";

import { Award, ExternalLink, Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useReveal } from "@/lib/hooks";
import { CERTIFICATIONS } from "@/lib/data";
import type { Certification } from "@/types";

function StatusBadge({ status }: { status: Certification["status"] }) {
  const config = {
    active: {
      label: "Active",
      className: "bg-accent/15 text-accent border-accent/30",
      pulse: true,
    },
    "in-progress": {
      label: "In progress",
      className: "bg-blue-300/10 text-blue-300 border-blue-300/30",
      pulse: false,
    },
    expired: {
      label: "Expired",
      className: "bg-white/5 text-white/40 border-white/10",
      pulse: false,
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${config.className}`}
    >
      {config.pulse && (
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-current" />
        </span>
      )}
      {config.label}
    </span>
  );
}

function CertCard({ c }: { c: Certification }) {
  const isInProgress = c.status === "in-progress";

  return (
    <div
      className={`group relative rounded-2xl border p-6 transition-all overflow-hidden ${
        isInProgress
          ? "border-white/10 bg-white/[0.015] hover:border-blue-300/20"
          : "border-white/10 bg-white/[0.015] hover:border-accent/30"
      }`}
    >
      {/* corner glow */}
      <div
        className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-40 transition-opacity group-hover:opacity-70 ${
          isInProgress ? "bg-blue-300/10" : "bg-accent/10"
        }`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isInProgress
                ? "bg-blue-300/10 text-blue-300 group-hover:bg-blue-300 group-hover:text-black"
                : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black"
            }`}
          >
            {isInProgress ? (
              <Clock className="w-5 h-5" />
            ) : (
              <Award className="w-5 h-5" />
            )}
          </div>
          <StatusBadge status={c.status} />
        </div>

        <h3 className="text-white text-[16px] md:text-[17px] leading-tight mb-1">
          {c.name}
        </h3>
        <div className="font-mono text-[12px] text-white/45 mb-4">
          {c.issuer}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-white/8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1">
              Issued
            </div>
            <div className="text-[13px] text-white/80">{c.issuedDate}</div>
          </div>
          {c.expiresDate && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1">
                Valid through
              </div>
              <div className="text-[13px] text-white/80">{c.expiresDate}</div>
            </div>
          )}
        </div>

        {/* skills tested */}
        <div className="mb-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">
            Domains covered
          </div>
          <div className="flex flex-wrap gap-1.5">
            {c.skills.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] px-2 py-0.5 rounded text-white/60 border border-white/8 bg-black/30"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* credential id + verify */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-2">
          {c.credentialId ? (
            <span className="font-mono text-[10px] text-white/35 truncate">
              ID: {c.credentialId.slice(0, 16)}…
            </span>
          ) : (
            <span className="font-mono text-[10px] text-white/35">
              No credential yet
            </span>
          )}
          {c.verifyUrl && (
            <a
              href={c.verifyUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-accent/80 hover:text-accent transition"
            >
              Verify <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [ref, shown] = useReveal<HTMLElement>();

  return (
    <section
      id="certs"
      ref={ref}
      className={`relative py-28 px-5 reveal ${shown ? "is-shown" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          idx="05"
          kicker="Credentials"
          title={
            <>
              Verified, <span className="italic text-accent/90">in progress</span>, or queued.
            </>
          }
          sub="The shorter list. Active credentials below; what's queued next is shown explicitly."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {CERTIFICATIONS.map((c) => (
            <CertCard key={c.name} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
