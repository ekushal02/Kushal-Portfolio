import { ReactNode } from "react";

type Props = {
  idx: string;
  kicker: string;
  title: ReactNode;
  sub?: string;
};

export default function SectionHeader({ idx, kicker, title, sub }: Props) {
  return (
    <div className="mb-12 md:mb-20 max-w-3xl">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[11px] text-accent/80 tracking-[0.2em]">
          {idx}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
          {kicker}
        </span>
      </div>
      <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight text-white">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}
