"use client";

interface StageDotProps {
  total: number;
  current: number;
}

export default function StageDots({ total, current }: StageDotProps) {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 flex gap-2 z-50">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width: i === current ? "20px" : "8px",
            height: "8px",
            background:
              i < current
                ? "var(--rose)"
                : i === current
                ? "var(--gold)"
                : "var(--warm-blush)",
            boxShadow: i === current ? "0 0 8px var(--amber)" : "none",
          }}
        />
      ))}
    </div>
  );
}
