"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; maxOpacity: number;
  life: number; maxLife: number; type: "circle" | "sparkle";
  color: string; rotation: number; rotSpeed: number;
}

// Palet warna emas pudar dan krem (Sangat Elegan)
const PALETTES = ["#D4A373", "#E8CBB3", "#FDFBF7", "#CBAA89"];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  function createParticle(canvas: HTMLCanvasElement, scatter = false): Particle {
    const maxLife = 300 + Math.random() * 300; // Lebih lambat & awet
    return {
      x: Math.random() * canvas.width,
      y: scatter ? Math.random() * canvas.height : canvas.height + 10,
      vx: (Math.random() - 0.5) * 0.2, // Gerak horizontal sangat pelan
      vy: -(Math.random() * 0.3 + 0.1), // Naik sangat pelan
      size: Math.random() * 3 + 1, // Ukuran lebih kecil (debu emas)
      opacity: 0,
      maxOpacity: Math.random() * 0.4 + 0.1, // Transparansi halus
      life: scatter ? Math.random() * maxLife : 0,
      maxLife,
      type: Math.random() > 0.8 ? "sparkle" : "circle",
      color: PALETTES[Math.floor(Math.random() * PALETTES.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01,
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    // Hanya 25 partikel agar tidak ramai/mengganggu mata
    pRef.current = Array.from({ length: 25 }, () => createParticle(canvas, true));

    let last = 0;
    const animate = (ts: number) => {
      if (ts - last > 16) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pRef.current.forEach((p, i) => {
          p.life++;
          p.x += p.vx + Math.sin(p.life * 0.01) * 0.2;
          p.y += p.vy;
          p.rotation += p.rotSpeed;

          const progress = p.life / p.maxLife;
          if (progress < 0.2) p.opacity = (progress / 0.2) * p.maxOpacity;
          else if (progress > 0.8) p.opacity = ((1 - progress) / 0.2) * p.maxOpacity;
          else p.opacity = p.maxOpacity;

          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          if (p.type === "circle") {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.2, p.size * 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          if (p.life >= p.maxLife) pRef.current[i] = createParticle(canvas);
        });
        ctx.globalAlpha = 1;
        last = ts;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}