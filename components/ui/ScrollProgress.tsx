"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? (sc / max) * 100 : 0;
      if (ref.current) ref.current.style.width = `${p}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-[2px] bg-transparent z-[60] pointer-events-none">
      <div
        ref={ref}
        className="h-full bg-gradient-to-r from-accent via-accent-200 to-accent-300/0 transition-[width] duration-100"
      />
    </div>
  );
}
