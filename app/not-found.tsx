import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent/80 mb-6">
        / 404
      </div>
      <h1 className="font-display text-[clamp(3rem,10vw,7rem)] leading-none">
        Lost in the <span className="italic text-accent">void</span>.
      </h1>
      <p className="mt-6 text-white/55 max-w-md">
        That page doesn't exist — or possibly never did. Let's get you back on
        track.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 bg-accent hover:bg-accent-200 text-black font-medium text-sm rounded-full pl-5 pr-2 py-2 transition-all"
      >
        Back home
        <span className="bg-black text-accent rounded-full p-1.5">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </div>
  );
}
