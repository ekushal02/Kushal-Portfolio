"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!ringRef.current) return;
      if (t.closest("a, button, [data-cursor='hover']")) {
        ringRef.current.classList.add("cursor-hover");
      } else {
        ringRef.current.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf: number;
    const tick = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.18;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.rx}px, ${pos.current.ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[100]"
        style={{ marginLeft: -3, marginTop: -3 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[99] transition-[width,height,border-color,opacity] duration-200"
        style={{ marginLeft: -16, marginTop: -16 }}
        aria-hidden="true"
      />
    </>
  );
}
