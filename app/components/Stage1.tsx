"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stage1Props { onNext: () => void; }

// ─── Floating Musical Notes ───────────────────────────────────────────────────
function FloatingNote({ delay, symbol }: { delay: number; symbol?: string }) {
  const notes = ["𝅗𝅥", "♩", "♪", "♫", "♬", "✦", "✧", "⋆"];
  const n = symbol ?? notes[Math.floor(Math.random() * notes.length)];
  const rx = (Math.random() - 0.5) * 160;
  const ry = -(100 + Math.random() * 120);
  return (
    <motion.span
      initial={{ opacity: 0, y: 0, x: 0, scale: 0.5, rotate: 0 }}
      animate={{
        opacity: [0, 0.9, 0.6, 0],
        y: ry, x: rx,
        scale: [0.5, 1.1, 0.8, 0.4],
        rotate: (Math.random() - 0.5) * 60,
      }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay, ease: "easeOut" }}
      className="absolute text-base pointer-events-none select-none z-30 text-[#D4856A]"
      style={{ fontFamily: "serif" }}
    >{n}</motion.span>
  );
}

// ─── Sparkle Burst ────────────────────────────────────────────────────────────
function Sparkle({ delay, left, top }: { delay: number; left: string; top: string }) {
  const size = 3 + Math.random() * 5;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 90] }}
      transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute pointer-events-none z-10"
      style={{ left, top, width: size, height: size }}
    >
      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2Z" fill="#D4856A" opacity="0.7" />
      </svg>
    </motion.div>
  );
}

// ─── Ambient Dust ─────────────────────────────────────────────────────────────
function AmbientDust({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.6, 0], y: -60, scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute w-1.5 h-1.5 rounded-full blur-[1px] pointer-events-none z-0"
      style={{ left, top, background: "radial-gradient(circle, #FFB7B2 0%, #D4856A 100%)" }}
    />
  );
}

// ─── Waveform Bar (equalizer style) ───────────────────────────────────────────
function WaveBar({ delay, height }: { delay: number; height: number }) {
  return (
    <motion.div
      animate={{ scaleY: [0.15, 1, 0.3, 0.8, 0.15] }}
      transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
      className="rounded-full origin-bottom"
      style={{
        width: 3,
        height,
        background: "linear-gradient(to top, #D4856A, #FFB7B2)",
        opacity: 0.85,
      }}
    />
  );
}

// ─── Orbital Ring Dot ─────────────────────────────────────────────────────────
function OrbitalDot({ radius, speed, size, color, startAngle }: {
  radius: number; speed: number; size: number; color: string; startAngle: number;
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="absolute pointer-events-none"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: size, height: size,
          background: color,
          top: 0, left: "50%",
          transform: `translateX(-50%) rotate(${startAngle}deg)`,
          transformOrigin: `50% ${radius}px`,
          boxShadow: `0 0 ${size * 3}px ${color}`,
        }}
      />
    </motion.div>
  );
}

// ─── Decorative Corner Flourish ───────────────────────────────────────────────
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={`absolute w-28 h-28 opacity-[0.12] pointer-events-none z-0 ${className}`} viewBox="0 0 100 100">
      <path d="M0 0 Q50 0 50 50 Q50 100 100 100" stroke="#D4856A" strokeWidth="0.8" fill="none" />
      <path d="M10 0 Q55 5 55 55 Q55 100 100 90" stroke="#D4856A" strokeWidth="0.5" fill="none" />
      <circle cx="0" cy="0" r="3" fill="#D4856A" />
      <circle cx="100" cy="100" r="3" fill="#D4856A" />
    </svg>
  );
}

// ─── Vinyl Grooves SVG ────────────────────────────────────────────────────────
function VinylGrooves() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 200 200">
      {[25, 35, 45, 55, 65, 72, 78, 83, 88].map((r, i) => (
        <circle
          key={i} cx="100" cy="100" r={r}
          stroke="rgba(255,255,255,0.04)" strokeWidth="0.7" fill="none"
        />
      ))}
      {/* Iridescent shimmer arc */}
      {[30, 50, 70].map((r, i) => (
        <circle
          key={`s${i}`} cx="100" cy="100" r={r}
          stroke={`rgba(255,183,178,${0.06 - i * 0.015})`}
          strokeWidth="2" fill="none"
          strokeDasharray={`${Math.PI * r * 0.3} ${Math.PI * r * 0.7}`}
        />
      ))}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Stage1({ onNext }: Stage1Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/Monokrom.mp3");
    audioRef.current.loop = true;
    return () => {};
  }, []);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log("Audio blocked:", err));
      setIsPlaying(true);
    }
  };

  // Waveform bars config
  const waveBars = Array.from({ length: 18 }, (_, i) => ({
    delay: i * 0.08,
    height: 12 + Math.sin(i * 0.8) * 10 + Math.random() * 8,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full relative select-none overflow-hidden bg-[#FDFBF7]">

      {/* ══════════════════ BACKGROUND LAYER ══════════════════ */}

      {/* Grid garis tipis */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(#4A3B32 1px, transparent 1px), linear-gradient(to right, #4A3B32 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Halftone dot subtle */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #D4856A 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Aurora blob 1 */}
      <motion.div
        animate={{ x: [0, 40, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,183,178,0.35) 0%, transparent 70%)" }}
      />
      {/* Aurora blob 2 */}
      <motion.div
        animate={{ x: [0, -50, 20, 0], y: [0, 40, -35, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(212,133,106,0.25) 0%, transparent 70%)" }}
      />
      {/* Aurora blob 3 — top right accent */}
      <motion.div
        animate={{ x: [0, -20, 30, 0], y: [0, 30, -20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-10 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,209,193,0.3) 0%, transparent 70%)" }}
      />

      {/* Ambient dust particles */}
      {[
        { left: "8%", top: "20%" },   { left: "88%", top: "18%" },
        { left: "15%", top: "72%" },  { left: "80%", top: "65%" },
        { left: "42%", top: "8%" },   { left: "58%", top: "88%" },
        { left: "25%", top: "45%" },  { left: "70%", top: "40%" },
        { left: "5%", top: "55%" },   { left: "92%", top: "50%" },
      ].map((p, i) => <AmbientDust key={i} delay={i * 0.6} {...p} />)}

      {/* Sparkles scattered */}
      {[
        { left: "10%", top: "30%" }, { left: "90%", top: "25%" },
        { left: "20%", top: "80%" }, { left: "75%", top: "78%" },
        { left: "50%", top: "5%" },  { left: "35%", top: "92%" },
        { left: "65%", top: "15%" }, { left: "3%", top: "60%" },
        { left: "94%", top: "70%" }, { left: "48%", top: "95%" },
      ].map((p, i) => <Sparkle key={i} delay={i * 0.45} {...p} />)}

      {/* Corner flourishes */}
      <CornerFlourish className="top-0 left-0" />
      <CornerFlourish className="bottom-0 right-0 rotate-180" />
      <CornerFlourish className="top-0 right-0 scale-x-[-1]" />
      <CornerFlourish className="bottom-0 left-0 scale-y-[-1]" />

      {/* ══════════════════ HEADER ══════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-16 text-center z-10 flex flex-col items-center gap-2"
      >
        {/* Decorative line + badge */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4856A]/60"
          />
          <p className="text-[#8C6B5D] text-[10px] tracking-[0.5em] uppercase font-bold opacity-80">
            Chapter Pertama
          </p>
          <motion.div
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4856A]/60"
          />
        </div>

        <h2 className="text-lg font-serif text-[#4A3B32] px-4 max-w-xs tracking-wide leading-relaxed">
          {isPlaying ? (
            <motion.span
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 justify-center"
            >
              <span>Musik sedang mengalun</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >🎧</motion.span>
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Ketuk piringan hitam untuk memutar musik
            </motion.span>
          )}
        </h2>

        {/* Waveform visualizer — hanya saat playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex items-end gap-[3px] h-8 mt-1"
            >
              {waveBars.map((b, i) => <WaveBar key={i} delay={b.delay} height={b.height} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ══════════════════ VINYL PLAYER ══════════════════ */}
      <div
        className="relative flex items-center justify-center mt-14 cursor-pointer group z-10"
        onClick={handleToggleMusic}
      >
        {/* Outermost slow decorative orbit */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
          style={{
            border: "1px dashed rgba(212,133,106,0.15)",
            boxShadow: isPlaying ? "0 0 40px rgba(212,133,106,0.08)" : "none",
          }}
        >
          {/* Tiny gem on orbit */}
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: "0", left: "50%", transform: "translateX(-50%)",
              background: "radial-gradient(circle, #FFB7B2, #D4856A)",
              boxShadow: "0 0 8px #D4856A",
            }}
          />
        </motion.div>

        {/* Second orbit ring */}
        <motion.div
          animate={{ rotate: isPlaying ? -360 : 0 }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="absolute w-[290px] h-[290px] rounded-full pointer-events-none"
          style={{ border: "0.5px solid rgba(212,133,106,0.1)" }}
        >
          <div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              bottom: "0", left: "50%", transform: "translateX(-50%)",
              background: "#FFB7B2", opacity: 0.8,
              boxShadow: "0 0 6px #FFB7B2",
            }}
          />
        </motion.div>

        {/* Inner glow ring (playing pulse) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.06, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[250px] h-[250px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,183,178,0.2) 0%, transparent 70%)",
                boxShadow: "0 0 60px rgba(212,133,106,0.3)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Floating notes (only when playing) */}
        {isPlaying && (
          <div className="absolute flex items-center justify-center w-full h-full">
            {["♪", "♫", "♬", "✦", "𝅗𝅥", "♩", "✧", "⋆"].map((sym, i) => (
              <FloatingNote key={i} delay={i * 0.55} symbol={sym} />
            ))}
          </div>
        )}

        {/* ── THE VINYL DISC ── */}
        <div
          className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center rounded-full"
          style={{
            background: "#181818",
            border: "6px solid #222",
            boxShadow: isPlaying
              ? "0 25px 60px -10px rgba(74,59,50,0.5), 0 0 80px rgba(212,133,106,0.2), inset 0 2px 4px rgba(255,255,255,0.05)"
              : "0 20px 45px -10px rgba(74,59,50,0.35), inset 0 2px 4px rgba(255,255,255,0.04)",
            transition: "box-shadow 0.8s ease",
          }}
        >
          {/* Vinyl rotating wrapper */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { repeat: Infinity, duration: 6, ease: "linear" } : { duration: 0.8 }}
            className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
          >
            {/* Vinyl grooves SVG */}
            <VinylGrooves />

            {/* Iridescent surface sheen */}
            <motion.div
              animate={isPlaying ? { opacity: [0.1, 0.4, 0.1], rotate: [0, 180] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(255,183,178,0.12), transparent, rgba(212,133,106,0.08), transparent)",
              }}
            />

            {/* Label tengah */}
            <div
              className="w-20 h-20 rounded-full flex flex-col items-center justify-center relative z-10"
              style={{
                background: "linear-gradient(135deg, #FFB7B2 0%, #F0A09A 100%)",
                border: "4px solid #1a1a1a",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)",
              }}
            >
              {/* Lubang tengah */}
              <div
                className="w-4 h-4 rounded-full z-10"
                style={{
                  background: "#FDFBF7",
                  border: "1px solid rgba(74,59,50,0.3)",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
              {/* Label teks */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                <span className="text-[6.5px] font-mono tracking-[0.18em] text-[#4A3B32]/80 uppercase font-bold">
                  {isPlaying ? "NOW PLAY" : "READY"}
                </span>
              </div>
              {/* Decorative ring on label */}
              <div
                className="absolute inset-2 rounded-full pointer-events-none"
                style={{ border: "0.5px solid rgba(74,59,50,0.15)" }}
              />
            </div>
          </motion.div>

          {/* ── TONEARM / STYLUS ── */}
          <motion.div
            animate={isPlaying ? { rotate: 28 } : { rotate: 7 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="absolute pointer-events-none z-20"
            style={{
              top: "-8px", right: "-10px",
              width: 80, height: 110,
              transformOrigin: "top left",
              filter: "drop-shadow(3px 8px 6px rgba(0,0,0,0.4))",
            }}
          >
            {/* Pivot circle */}
            <div
              className="absolute top-0 left-8 w-4 h-4 rounded-full"
              style={{
                background: "radial-gradient(circle at 40% 35%, #e0e0e0, #888)",
                border: "1px solid rgba(0,0,0,0.3)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
            />
            {/* Arm rod */}
            <div
              className="absolute top-2 left-[38px] w-[3px] h-[75px] rounded-full"
              style={{
                background: "linear-gradient(to bottom, #d0d0d0, #999, #777)",
                transformOrigin: "top center",
              }}
            />
            {/* Head shell */}
            <div
              className="absolute top-[73px] left-[31px] w-[16px] h-[9px] rounded-sm"
              style={{
                background: "linear-gradient(135deg, #aaa, #666)",
                border: "1px solid rgba(0,0,0,0.3)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              }}
            />
            {/* Needle tip */}
            <div
              className="absolute top-[82px] left-[37px] w-1 h-3 rounded-b-full"
              style={{ background: "linear-gradient(to bottom, #888, #444)" }}
            />
          </motion.div>
        </div>

        {/* Ambient glow behind vinyl */}
        <div
          className="absolute rounded-full blur-[60px] pointer-events-none transition-all duration-1000"
          style={{
            width: 420, height: 420,
            background: "radial-gradient(circle, rgba(255,183,178,0.7) 0%, rgba(212,133,106,0.3) 40%, transparent 70%)",
            opacity: isPlaying ? 0.55 : 0.12,
            transform: isPlaying ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      {/* ══════════════════ BOTTOM SECTION ══════════════════ */}

      {/* Genre / track info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="absolute bottom-32 flex items-center gap-3 z-10"
      >
        <div
          className="px-5 py-2.5 rounded-full flex items-center gap-3"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(212,133,106,0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 24px rgba(212,133,106,0.1)",
          }}
        >
          {/* Spinning mini disc */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #181818, #333)", border: "1.5px solid #555" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB7B2]" />
          </motion.div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C6B5D] uppercase">Now Spinning</span>
            <span className="text-[12px] font-serif text-[#4A3B32] tracking-wide">Monokrom</span>
          </div>

          {/* Live dot */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="flex items-center gap-1.5 ml-1"
              >
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#D4856A]"
                  style={{ boxShadow: "0 0 6px #D4856A" }}
                />
                <span className="text-[9px] font-mono text-[#D4856A] tracking-widest uppercase">Live</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CTA Button */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ delay: 0.25, duration: 0.55, type: "spring", stiffness: 120 }}
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute bottom-10 z-50 flex items-center gap-3 text-white text-xs tracking-[0.22em] uppercase font-bold"
            style={{
              padding: "14px 32px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #D4856A 0%, #C06B55 100%)",
              boxShadow: "0 12px 40px rgba(212,133,106,0.4), 0 4px 12px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.2)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 18px 50px rgba(212,133,106,0.55), 0 6px 16px rgba(0,0,0,0.12)",
            }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >🎂</motion.span>
            Tiup Lilinnya
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: 12 }}
            >→</motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}