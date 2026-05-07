import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/8 px-5 py-10 mt-10">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="font-mono text-[12px] text-white/55">
            © {year} Kushal Erramilli — built with Next.js, Three.js, and care.
          </div>
          <div className="font-mono text-[10px] text-white/30 mt-1.5 tracking-wider">
            psst — try ↑↑↓↓←→←→BA
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://github.com/${PROFILE.github}`}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full border border-white/10 text-white/55 hover:text-accent hover:border-accent/40 flex items-center justify-center transition"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={`https://linkedin.com/in/${PROFILE.linkedin}`}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full border border-white/10 text-white/55 hover:text-accent hover:border-accent/40 flex items-center justify-center transition"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            data-cursor="hover"
            aria-label="Email"
            className="w-9 h-9 rounded-full border border-white/10 text-white/55 hover:text-accent hover:border-accent/40 flex items-center justify-center transition"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
