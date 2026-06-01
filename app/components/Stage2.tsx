"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stage2Props { onNext: () => void; }

interface Confetti {
  x: number; y: number;
  sizeX: number; sizeY: number;
  color: string;
  speedX: number; speedY: number;
  rotation: number; rotationSpeed: number;
  wobble: number; wobbleSpeed: number;
  shape: "rect" | "circle" | "star";
  opacity: number;
}

// ─── Ambient Sparkle dot ─────────────────────────────────────────────────────
function Sparkle({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: [0, 120] }}
      transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute pointer-events-none z-10"
      style={{ left, top, width: 12, height: 12 }}
    >
      <svg viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="#D4856A" opacity="0.75" /></svg>
    </motion.div>
  );
}

// ─── Floating dust mote ───────────────────────────────────────────────────────
function DustMote({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.6, 0], y: -70, scale: [0.4, 1.2, 0.4] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute w-2 h-2 rounded-full blur-[0.5px] pointer-events-none z-0"
      style={{ left, top, background: "radial-gradient(circle, #FFB7B2, #D4856A)" }}
    />
  );
}

// ─── Corner flourish SVG ──────────────────────────────────────────────────────
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={`absolute w-36 h-36 opacity-[0.12] pointer-events-none z-0 ${className}`} viewBox="0 0 100 100">
      <path d="M0 0 Q50 0 50 50 Q50 100 100 100" stroke="#D4856A" strokeWidth="0.8" fill="none" />
      <path d="M15 0 Q60 10 60 60 Q60 100 100 85" stroke="#D4856A" strokeWidth="0.5" fill="none" />
      <circle cx="0" cy="0" r="3.5" fill="#D4856A" opacity="0.8" />
      <circle cx="100" cy="100" r="3.5" fill="#D4856A" opacity="0.8" />
      <circle cx="50" cy="50" r="2" fill="#FFB7B2" opacity="0.6" />
    </svg>
  );
}

// ─── Wish star (post-blow decoration) ─────────────────────────────────────────
function WishStar({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: [0, 1, 0.8, 0], scale: [0, 1.5, 1.1, 0.5], y: [20, -70, -110], rotate: [0, 45, 90] }}
      transition={{ duration: 3.5, delay, ease: "easeOut" }}
      className="absolute pointer-events-none z-30 text-xl"
      style={{ left: x, top: y }}
    >✨</motion.div>
  );
}

// ─── Active Flame Sparkler (Live Sparks Before Blow) ─────────────────────────
function FlameSpark({ delay }: { delay: number }) {
  const randomX = (Math.random() - 0.5) * 30;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0], x: randomX, y: -40 - Math.random() * 20 }}
      transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay, ease: "easeOut" }}
      className="absolute w-1 h-1 bg-[#FFAA00] rounded-full pointer-events-none z-30 blur-[0.5px]"
      style={{ bottom: 15, left: "50%" }}
    />
  );
}

// ─── Candle flame component (layered) ─────────────────────────────────────────
function Flame() {
  return (
    <div className="relative flex items-end justify-center" style={{ width: 44, height: 56 }}>
      {/* Sparkles radiating from the candle flame */}
      <FlameSpark delay={0} />
      <FlameSpark delay={0.25} />
      <FlameSpark delay={0.5} />

      {/* Outer glow */}
      <motion.div
        animate={{ scale: [1, 1.25, 0.9, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
        className="absolute rounded-full blur-xl pointer-events-none"
        style={{ width: 50, height: 50, bottom: 0, background: "radial-gradient(circle, rgba(255,140,0,0.6), transparent)" }}
      />
      {/* Mid flame */}
      <motion.div
        animate={{ scaleX: [0.85, 1.15, 0.8, 1.1, 0.85], scaleY: [1, 1.1, 0.93, 1.06, 1], rotate: [-5, 5, -3, 4, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        className="absolute origin-bottom"
        style={{ width: 24, height: 42, bottom: 4 }}
      >
        <div className="w-full h-full rounded-[50%_50%_35%_35%/60%_60%_40%_40%]"
          style={{ background: "linear-gradient(to top, #ff6b00 0%, #ff9500 40%, #ffdd00 80%, #fff7cc 100%)" }}
        />
      </motion.div>
      {/* Inner bright core */}
      <motion.div
        animate={{ scaleY: [0.8, 1.15, 0.88, 1.08, 0.8], scaleX: [1, 0.9, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.05 }}
        className="absolute origin-bottom"
        style={{ width: 12, height: 24, bottom: 6 }}
      >
        <div className="w-full h-full rounded-[50%_50%_30%_30%/60%_60%_40%_40%]"
          style={{ background: "linear-gradient(to top, #fff 0%, #fffbcc 60%, transparent 100%)", opacity: 0.9 }}
        />
      </motion.div>
      {/* Glow halo */}
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.35, 1] }}
        transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
        className="absolute rounded-full blur-2xl pointer-events-none"
        style={{ width: 66, height: 66, bottom: -5, left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(255,160,50,0.4) 0%, transparent 70%)" }}
      />
    </div>
  );
}

// ─── Smoke puff ───────────────────────────────────────────────────────────────
function SmokePuff({ delay }: { delay: number }) {
  const rx = (Math.random() - 0.5) * 60;
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: 0, scale: 0.3 }}
      animate={{ opacity: [0, 0.4, 0], y: -100, x: rx, scale: [0.3, 1.8, 3] }}
      transition={{ duration: 2.8, delay, ease: "easeOut" }}
      className="absolute rounded-full blur-md pointer-events-none"
      style={{ width: 32, height: 32, background: "rgba(160,145,135,0.25)", top: 0, left: "50%", marginLeft: -16 }}
    />
  );
}

// ─── Candle stick visual ───────────────────────────────────────────────────────
function CandleStick() {
  return (
    <div className="relative flex flex-col items-center" style={{ width: 28 }}>
      {/* Drip */}
      <div className="absolute -top-1 left-[9px] w-2.5 h-4 rounded-b-full opacity-70"
        style={{ background: "linear-gradient(to bottom, #FFB7B2, #F0A09A)" }} />
      {/* Body */}
      <div className="w-full rounded-t-sm rounded-b-sm relative overflow-hidden"
        style={{ height: 64, background: "linear-gradient(to right, #FFD1C1, #FFB7B2, #F5A89A, #FFB7B2, #FFD1C1)" }}>
        {/* Sheen */}
        <div className="absolute inset-y-0 left-1 w-1.5 rounded-full opacity-40"
          style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        {/* Stripes */}
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute w-full h-px opacity-20"
            style={{ top: 18 + i * 16, background: "#D4856A" }} />
        ))}
      </div>
      {/* Base */}
      <div className="w-8 h-2 rounded-sm -mt-px"
        style={{ background: "linear-gradient(to right, #D4856A, #E89070, #D4856A)" }} />
    </div>
  );
}

// ─── Cake visual (layered) ────────────────────────────────────────────────────
function Cake({ isBlown }: { isBlown: boolean }) {
  return (
    <motion.div
      animate={isBlown ? { scale: [1, 0.9, 1.05, 0.98, 1], y: [0, 5, -3, 1, 0] } : {}}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative flex flex-col items-center"
    >
      {/* Top tier */}
      <div className="relative" style={{ width: 110 }}>
        <div className="rounded-t-2xl relative overflow-hidden" style={{ height: 48,
          background: "linear-gradient(135deg, #FFD1C1 0%, #FFB7B2 50%, #F5A89A 100%)",
          boxShadow: "0 4px 16px rgba(212,133,106,0.3)" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 10px)" }} />
          {/* Frosting drips */}
          {[12, 28, 50, 72, 88].map((l, i) => (
            <div key={i} className="absolute top-0 rounded-b-full"
              style={{ left: l, width: 10 + i % 3 * 4, height: 14 + i % 2 * 6,
                background: "rgba(255,255,255,0.55)", filter: "blur(0.5px)" }} />
          ))}
          <div className="absolute inset-x-0 top-0 h-3 opacity-40"
            style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        </div>
        {/* Top tier base */}
        <div style={{ height: 8, background: "#E89070", borderRadius: "0 0 4px 4px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.12)" }} />
      </div>

      {/* Bottom tier */}
      <div className="relative -mt-1" style={{ width: 160 }}>
        <div className="rounded-t-xl relative overflow-hidden" style={{ height: 62,
          background: "linear-gradient(135deg, #FFD1C1 0%, #FFBCB7 40%, #F5A49A 100%)",
          boxShadow: "0 6px 20px rgba(212,133,106,0.3)" }}>
          <div className="absolute inset-0 opacity-15"
            style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.25) 10px, rgba(255,255,255,0.25) 12px)" }} />
          {/* Frosting drips */}
          {[10, 28, 46, 68, 90, 112, 130, 148].map((l, i) => (
            <div key={i} className="absolute top-0 rounded-b-full"
              style={{ left: l, width: 10 + i % 3 * 3, height: 12 + i % 2 * 8,
                background: "rgba(255,255,255,0.5)", filter: "blur(0.5px)" }} />
          ))}
          {/* Dot decoration */}
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div key={i}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="absolute rounded-full"
              style={{ width: 8, height: 8, bottom: 14, left: 18 + i * 26,
                background: "radial-gradient(circle, #D4856A, #C06B55)",
                boxShadow: "0 0 6px rgba(212,133,106,0.5)" }} />
          ))}
          <div className="absolute inset-x-0 top-0 h-4 opacity-40"
            style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        </div>
        {/* Plate */}
        <div style={{ height: 12, background: "linear-gradient(to right, #D4856A, #E89070, #C97B65, #E89070, #D4856A)",
          borderRadius: "0 0 8px 8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
      </div>
    </motion.div>
  );
}

// ─── Main Stage2 ──────────────────────────────────────────────────────────────
export default function Stage2({ onNext }: Stage2Props) {
  const [isBlown, setIsBlown] = useState(false);
  const [wishStars, setWishStars] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettis = useRef<Confetti[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const triggerConfetti = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Warna pastel premium bercampur warna metalik cerah pesta
    const colors = ["#FFD1C1", "#FFB7B2", "#D4856A", "#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#ff6b6b", "#ffd93d", "#ff9ff3", "#feca57"];
    const count = 320; // Ditingkatkan drastis agar super ramai & penuh di layar
    const startX = canvas.width / 2;
    const startY = canvas.height * 0.42;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Tingkatkan kecepatan awal agar hamburan meluas ke seluruh sisi layar
      const velocity = 6 + Math.random() * 16;
      confettis.current.push({
        x: startX, y: startY,
        sizeX: 6 + Math.random() * 8,
        sizeY: 11 + Math.random() * 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity - 6, // Semburan dorongan ke atas diperkuat
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.45,
        wobble: Math.random() * Math.PI,
        wobbleSpeed: 0.06 + Math.random() * 0.14,
        // Alokasikan persentase bentuk agar lebih kaya variasi visual
        shape: (["rect", "rect", "circle", "star"] as const)[Math.floor(Math.random() * 4)],
        opacity: 1,
      });
    }

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const ai = ((i * 4 + 2) * Math.PI) / 5 - Math.PI / 2;
        ctx[i === 0 ? "moveTo" : "lineTo"](cx + r * Math.cos(a), cy + r * Math.sin(a));
        ctx.lineTo(cx + (r / 2) * Math.cos(ai), cy + (r / 2) * Math.sin(ai));
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettis.current.forEach((p, index) => {
        p.speedY += 0.24; // Sedikit lebih berat agar melengkung ke bawah alami
        p.speedX *= 0.98;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;
        // Pudar perlahan setelah berada di udara agak lama
        p.opacity = Math.max(0, p.opacity - 0.0025);

        const scaleX = Math.sin(p.wobble);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(scaleX, 1);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.sizeX / 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "star") {
          drawStar(ctx, 0, 0, p.sizeX / 1.3);
          ctx.fill();
        } else {
          ctx.fillRect(-p.sizeX / 2, -p.sizeY / 2, p.sizeX, p.sizeY);
        }
        ctx.restore();

        if (p.y > canvas.height || p.opacity <= 0) confettis.current.splice(index, 1);
      });
      if (confettis.current.length > 0) animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, []);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);
    setTimeout(() => { triggerConfetti(); setWishStars(true); }, 60);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 w-full relative select-none overflow-hidden bg-[#FDFBF7]">

      {/* Canvas for confetti */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-40" />

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: `linear-gradient(#4A3B32 1px, transparent 1px), linear-gradient(to right, #4A3B32 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(circle, #D4856A 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      {/* Aurora blobs */}
      <motion.div animate={{ x: [0, 35, -20, 0], y: [0, -40, 25, 0], scale: [1, 1.15, 0.92, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-20 w-96 h-96 rounded-full blur-[100px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,183,178,0.32) 0%, transparent 70%)" }} />
      <motion.div animate={{ x: [0, -40, 18, 0], y: [0, 30, -30, 0], scale: [1, 0.88, 1.12, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full blur-[110px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(212,133,106,0.22) 0%, transparent 70%)" }} />

      {/* Warm glow under cake — pulses when NOT blown */}
      <div className="absolute pointer-events-none z-0"
        style={{ bottom: "20%", left: "50%", transform: "translateX(-50%)", width: 320, height: 320,
          borderRadius: "50%", filter: "blur(60px)",
          background: "radial-gradient(circle, rgba(255,183,178,0.5) 0%, transparent 70%)",
          opacity: isBlown ? 0 : 0.55, transition: "opacity 1.2s ease" }} />

      {/* Sparkles */}
      {[
        { left: "8%", top: "22%" }, { left: "88%", top: "18%" },
        { left: "14%", top: "70%" }, { left: "82%", top: "65%" },
        { left: "45%", top: "6%" }, { left: "55%", top: "88%" },
        { left: "28%", top: "42%" }, { left: "72%", top: "38%" },
        { left: "4%", top: "52%" }, { left: "93%", top: "55%" },
      ].map((p, i) => <Sparkle key={i} delay={i * 0.4} {...p} />)}

      {/* Dust motes */}
      {[
        { left: "15%", top: "30%" }, { left: "80%", top: "25%" },
        { left: "20%", top: "75%" }, { left: "75%", top: "70%" },
        { left: "50%", top: "10%" }, { left: "5%", top: "60%" },
        { left: "90%", top: "48%" },
      ].map((p, i) => <DustMote key={i} delay={i * 0.7} {...p} />)}

      {/* Corner flourishes */}
      <CornerFlourish className="top-0 left-0" />
      <CornerFlourish className="bottom-0 right-0 rotate-180" />
      <CornerFlourish className="top-0 right-0 scale-x-[-1]" />
      <CornerFlourish className="bottom-0 left-0 scale-y-[-1]" />

      {/* Wish stars (post-blow) */}
      {wishStars && [
        { x: "20%", y: "30%" }, { x: "75%", y: "25%" }, { x: "40%", y: "20%" },
        { x: "60%", y: "35%" }, { x: "15%", y: "55%" }, { x: "82%", y: "48%" },
        { x: "50%", y: "15%" }, { x: "30%", y: "60%" }, { x: "68%", y: "65%" }
      ].map((p, i) => <WishStar key={i} delay={0.1 + i * 0.15} x={p.x} y={p.y} />)}

      {/* ── HEADER ── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
        className="absolute top-16 text-center z-20 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <motion.div animate={{ scaleX: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
            className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4856A]/60" />
          <p className="text-[#8C6B5D] text-[10px] tracking-[0.5em] uppercase font-bold opacity-80">Chapter Kedua</p>
          <motion.div animate={{ scaleX: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4856A]/60" />
        </div>

        <AnimatePresence mode="wait">
          {isBlown ? (
            <motion.h2 key="blown"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="text-xl font-serif text-[#4A3B32] px-6 max-w-sm tracking-wide leading-relaxed flex items-center gap-2 justify-center">
              <motion.span animate={{ rotate: [0, 15, -10, 15, 0], scale: [1, 1.4, 1] }}
                transition={{ duration: 1, repeat: 3 }}>✨</motion.span>
              Make a wish...
              <motion.span animate={{ rotate: [0, -15, 10, -15, 0], scale: [1, 1.4, 1] }}
                transition={{ duration: 1, repeat: 3, delay: 0.2 }}>✨</motion.span>
            </motion.h2>
          ) : (
            <motion.h2 key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-xl font-serif text-[#4A3B32] px-6 max-w-sm tracking-wide leading-relaxed">
              Ketuk lentera api untuk meniup lilinnya
            </motion.h2>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isBlown && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 mt-1">
              <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="text-[#D4856A]/60 text-xs">💨</motion.div>
              <span className="text-[10px] tracking-widest text-[#8C6B5D]/50 uppercase font-mono">tap to blow</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── MAIN CAKE SCENE ── */}
      <div className="relative flex flex-col items-center cursor-pointer group z-10 mt-10" onClick={handleBlow}>

        {/* Flame light cone */}
        <AnimatePresence>
          {!isBlown && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.25, 0.6, 0.25] }} exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute pointer-events-none"
              style={{ width: 70, height: 130, top: -10, left: "50%", transform: "translateX(-50%)",
                background: "linear-gradient(to bottom, rgba(255,150,50,0.2), transparent)",
                borderRadius: "50% 50% 80% 80% / 20% 20% 80% 80%", filter: "blur(5px)", zIndex: 5 }} />
          )}
        </AnimatePresence>

        {/* Candle + flame assembly */}
        <div className="relative flex flex-col items-center z-20" style={{ marginBottom: -6 }}>
          <div className="relative flex items-end justify-center" style={{ height: 72 }}>
            <AnimatePresence>
              {!isBlown ? (
                <motion.div key="flame"
                  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.2, y: -15 }}
                  transition={{ duration: 0.25 }} className="absolute bottom-0">
                  <Flame />
                </motion.div>
              ) : (
                <motion.div key="smoke" className="absolute bottom-0 w-full flex justify-center">
                  <SmokePuff delay={0} />
                  <SmokePuff delay={0.1} />
                  <SmokePuff delay={0.2} />
                  <SmokePuff delay={0.35} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <CandleStick />
        </div>

        {/* Cake body */}
        <Cake isBlown={isBlown} />

        {/* Plate shadow */}
        <div className="mt-2 rounded-full pointer-events-none"
          style={{ width: 180, height: 14, background: "radial-gradient(ellipse, rgba(74,59,50,0.18), transparent)",
            filter: "blur(4px)" }} />
      </div>

      {/* ── CTA BUTTON ── */}
      <AnimatePresence>
        {isBlown && (
          <motion.button
            initial={{ opacity: 0, y: 35, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.9, duration: 0.6, type: "spring", stiffness: 120 }}
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute bottom-10 flex items-center gap-3 text-white text-xs tracking-[0.22em] uppercase font-bold z-50"
            style={{ padding: "14px 32px", borderRadius: 999,
              background: "linear-gradient(135deg, #D4856A 0%, #C06B55 100%)",
              boxShadow: "0 12px 40px rgba(212,133,106,0.4), 0 4px 12px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.2)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 18px 50px rgba(212,133,106,0.55)" }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.span animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}>🎁</motion.span>
            Buka Kado
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}