"use client";

import { useState } from "react";
import type { RadarPoint } from "@/types";

type Props = {
  data: RadarPoint[];
};

export default function RadarChart({ data }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const R = 100;

  const angle = (i: number) => (Math.PI * 2 * i) / data.length - Math.PI / 2;
  const point = (i: number, v: number): [number, number] => {
    const r = (v / 100) * R;
    return [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];
  };

  const polyPoints = data.map((d, i) => point(i, d.v).join(",")).join(" ");
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm mx-auto">
        {/* concentric polygons */}
        {rings.map((r, i) => (
          <polygon
            key={i}
            points={data
              .map((_, j) => {
                const x = cx + Math.cos(angle(j)) * R * r;
                const y = cy + Math.sin(angle(j)) * R * r;
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}
        {/* axes */}
        {data.map((_, i) => {
          const [x, y] = point(i, 100);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}
        {/* data polygon */}
        <polygon
          points={polyPoints}
          fill="rgba(214,255,61,0.12)"
          stroke="#d6ff3d"
          strokeWidth="1.5"
          className="radar-poly"
        />
        {/* data points */}
        {data.map((d, i) => {
          const [x, y] = point(i, d.v);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={hovered === i ? 5 : 3}
              fill="#d6ff3d"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all"
            />
          );
        })}
        {/* axis labels */}
        {data.map((d, i) => {
          const [x, y] = point(i, 116);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`transition-colors ${
                hovered === i ? "fill-accent" : "fill-white/70"
              }`}
              style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
            >
              {d.area}
            </text>
          );
        })}
      </svg>

      {hovered !== null && (
        <div className="absolute top-2 right-2 font-mono text-[11px] text-accent/90 border border-accent/20 bg-black/60 backdrop-blur rounded-md px-2 py-1">
          {data[hovered].area}: <span className="text-white">{data[hovered].v}</span>
        </div>
      )}
    </div>
  );
}
