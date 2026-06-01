"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stage3Props { onNext: () => void; }

const EMOJIS = ["✨", "🌟", "💫", "🎉", "🎊", "🌸", "🌼", "⭐", "💝", "❤️", "🎈", "🌈", "🎁", "🥳"];
const WORDS = ["Seru!", "Asik!", "Lagi!", "Buka!", "Mantap!", "Yay!", "Wow!"];

interface Particle {
  id: number;
  startX: number; startY: number;
  endX: number; endY: number;
  scale: number; rotation: number;
  emoji: string; duration: number;
}

interface FloatingWord {
  id: number;
  text: string;
  x: number; y: number;
}

// ─── Sparkle star ─────────────────────────────────────────────────────────────
function Sparkle({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0], rotate: [0, 180] }}
      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute pointer-events-none z-10"
      style={{ left, top, width: 12, height: 12 }}
    >
      <svg viewBox="0 0 10 10"><path d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2Z" fill="#D4856A" opacity="0.7" /></svg>
    </motion.div>
  );
}

// ─── Dust mote ────────────────────────────────────────────────────────────────
function DustMote({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.6, 0], y: -80, x: [0, 15, -15, 0], scale: [0.5, 1.5, 0.5] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute w-2 h-2 rounded-full blur-[1px] pointer-events-none z-0"
      style={{ left, top, background: "radial-gradient(circle, #FFB7B2, #D4856A)" }}
    />
  );
}

// ─── Corner flourish ─────────────────────────────────────────────────────────
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={`absolute w-32 h-32 opacity-[0.15] pointer-events-none z-0 ${className}`} viewBox="0 0 100 100">
      <path d="M0 0 Q50 0 50 50 Q50 100 100 100" stroke="#D4856A" strokeWidth="0.8" fill="none" />
      <path d="M15 0 Q60 10 60 60 Q60 100 100 85" stroke="#D4856A" strokeWidth="0.5" fill="none" />
      <circle cx="0" cy="0" r="3.5" fill="#D4856A" opacity="0.8" />
      <circle cx="100" cy="100" r="3.5" fill="#D4856A" opacity="0.8" />
      <circle cx="50" cy="50" r="2" fill="#FFB7B2" opacity="0.6" />
    </svg>
  );
}

// ─── Progress ring (Fix Total Anti-Lompat dengan Rotasi CSS) ──────────────────
function ProgressRing({ progress }: { progress: number }) {
  const r = 135; 
  const circ = 2 * Math.PI * r;
  const dash = circ * progress;
  
  // Karena SVG sudah diputar -90 derajat oleh CSS, 
  // kita gunakan rumus sudut standar (dimulai dari 0) agar selaras sempurna.
  const angle = progress * 2 * Math.PI;
  const dotX = 160 + r * Math.cos(angle);
  const dotY = 160 + r * Math.sin(angle);

  return (
    // -rotate-90 memutar seluruh SVG agar posisi awal lingkaran & titik berada di Jam 12
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-5 -rotate-90" viewBox="0 0 320 320">
      {/* Lingkaran Background */}
      <circle cx="160" cy="160" r={r} fill="none" stroke="rgba(212,133,106,0.08)" strokeWidth="2" />
      
      {/* Lingkaran Progress Utama */}
      <motion.circle
        cx="160" cy="160" r={r} fill="none"
        stroke="url(#ringGrad)" strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={`${circ} ${circ}`}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB7B2" />
          <stop offset="50%" stopColor="#D4856A" />
          <stop offset="100%" stopColor="#C06B55" />
        </linearGradient>
      </defs>

      {/* Titik Indikator - Mengikuti ujung progres dengan mulus tanpa lonjakan dari ketukan awal */}
      {progress > 0 && progress < 1 && (
        <motion.circle
          cx={dotX}
          cy={dotY}
          r="6" 
          fill="#D4856A"
          animate={{ filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

// ─── Gift box ───────────────────────────────────────────────────────────────────
function GiftBox({ clicks, maxClicks, isComplete }: { clicks: number; maxClicks: number; isComplete: boolean }) {
  const wobbleAmt = Math.min(clicks * 3.5, 22);
  const scaleGrow = 1 + clicks * 0.02;
  const lidLift = isComplete ? -65 : -Math.min(clicks * 5, 25);
  const lidTilt = isComplete ? -18 : (clicks % 2 === 0 ? -clicks * 2 : clicks * 2);

  return (
    <div className="relative flex flex-col items-center" style={{ width: 160, userSelect: "none" }}>
      {/* Lid */}
      <motion.div
        animate={{ y: lidLift, rotate: lidTilt, opacity: isComplete ? 0.4 : 1 }}
        transition={isComplete
          ? { duration: 0.5, ease: "easeOut" }
          : { type: "spring", stiffness: 250, damping: 12 }}
        className="relative z-20 flex flex-col items-center"
        style={{ width: 160 }}
      >
        {/* Ribbon bow */}
        <div className="relative flex items-center justify-center" style={{ height: 32, marginBottom: -4 }}>
          <div className="absolute" style={{ width: 36, height: 24, left: 52, top: 4,
            background: "linear-gradient(135deg, #D4856A, #C06B55)",
            borderRadius: "50% 50% 0 50%", transform: "rotate(-20deg)",
            boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.2)" }} />
          <div className="absolute" style={{ width: 36, height: 24, right: 52, top: 4,
            background: "linear-gradient(135deg, #E89070, #D4856A)",
            borderRadius: "50% 50% 50% 0", transform: "rotate(20deg)",
            boxShadow: "inset -2px 2px 4px rgba(255,255,255,0.2)" }} />
          <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "radial-gradient(circle at 40% 35%, #E89070, #C06B55)",
              boxShadow: "0 2px 8px rgba(192,107,85,0.5)" }}>
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>
          <div className="absolute bottom-0 left-[70px] w-[5px] h-[10px] rounded-b-sm"
            style={{ background: "#C06B55", transform: "rotate(-10deg)" }} />
          <div className="absolute bottom-0 right-[70px] w-[5px] h-[10px] rounded-b-sm"
            style={{ background: "#D4856A", transform: "rotate(10deg)" }} />
        </div>

        {/* Lid body */}
        <div className="relative overflow-hidden" style={{ width: 160, height: 28, borderRadius: "6px 6px 0 0",
          background: "linear-gradient(135deg, #FFB7B2 0%, #F5A09A 50%, #E89090 100%)",
          boxShadow: "0 -2px 12px rgba(212,133,106,0.3)" }}>
          <div className="absolute inset-y-0" style={{ left: "50%", transform: "translateX(-50%)", width: 18,
            background: "linear-gradient(to right, #D4856A, #E89070, #D4856A)", opacity: 0.8 }} />
          <div className="absolute inset-x-0 top-0 h-3 opacity-30"
            style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        </div>
      </motion.div>

      {/* Box body */}
      <motion.div
        animate={{ rotate: isComplete ? 0 : clicks % 2 === 0 ? -wobbleAmt * 0.5 : wobbleAmt * 0.5, scale: isComplete ? 1.05 : scaleGrow }}
        transition={{ type: "spring", stiffness: 350, damping: 10 }}
        className="relative overflow-hidden z-10"
        style={{ width: 160, height: 110, borderRadius: "0 0 10px 10px",
          background: "linear-gradient(135deg, #FFD1C1 0%, #FFB7B2 40%, #F5A49A 100%)",
          boxShadow: "0 12px 40px rgba(212,133,106,0.35), inset 0 1px 2px rgba(255,255,255,0.4)" }}
      >
        <div className="absolute inset-y-0" style={{ left: "50%", transform: "translateX(-50%)", width: 18,
          background: "linear-gradient(to right, #D4856A, #E89070, #D4856A)", opacity: 0.75 }} />
        
        {/* Polka dots */}
        {[[28,30],[90,45],[50,75],[115,25],[135,80],[20,80],[110,70]].map(([x, y], i) => (
          <motion.div key={i} 
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full w-2 h-2"
            style={{ left: x, top: y, background: "rgba(255,255,255,0.6)" }} />
        ))}
        <div className="absolute inset-y-0 left-2 w-6 rounded-full opacity-20"
          style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute bottom-0 inset-x-0 h-3 opacity-25"
          style={{ background: "linear-gradient(to top, rgba(74,59,50,0.3), transparent)" }} />
      </motion.div>

      {/* Plate base */}
      <div style={{ width: 172, height: 10, marginTop: -1, borderRadius: "0 0 8px 8px",
        background: "linear-gradient(to right, #C06B55, #D4856A, #C06B55)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }} />
    </div>
  );
}

// ─── Explosion burst ─────────────────────────────────────────────────────────
function BurstRay({ angle, delay }: { angle: number; delay: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: [0, 1.4, 0], opacity: [1, 0.4, 0] }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="absolute pointer-events-none origin-left"
      style={{
        width: 140, height: 3,
        left: "50%", top: "50%",
        transformOrigin: "left center",
        transform: `rotate(${angle}deg)`,
        background: "linear-gradient(to right, #FFB7B2, #D4856A, transparent)",
        borderRadius: 4,
      }}
    />
  );
}

// ─── Main Stage3 ──────────────────────────────────────────────────────────────
export default function Stage3({ onNext }: Stage3Props) {
  const [clicks, setClicks] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [words, setWords] = useState<FloatingWord[]>([]);
  const [showBurst, setShowBurst] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const maxClicks = 6;
  const isComplete = clicks >= maxClicks;
  const progress = Math.min(clicks / maxClicks, 1);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isComplete) return;
    
    const next = clicks + 1;
    setClicks(next);
    
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 150);

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left - 160;
    const clickY = e.clientY - rect.top - 160;

    // Tambah text efek floating popup ketukan
    const newWord: FloatingWord = {
      id: Date.now() + Math.random(),
      text: WORDS[Math.floor(Math.random() * WORDS.length)],
      x: clickX + (Math.random() * 40 - 20),
      y: clickY - 20
    };
    setWords((prev) => [...prev, newWord]);

    // Jika ketukan baru saja penuh (Mencapai batas maksimal)
    if (next >= maxClicks) {
      setShowBurst(true);
      // Semburan partikel ledakan utama yang masif
      const burstParticles: Particle[] = Array.from({ length: 24 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 200;
        return {
          id: Date.now() + i + Math.random(),
          startX: 0,
          startY: -20,
          endX: Math.cos(angle) * distance,
          endY: Math.sin(angle) * distance - 80,
          scale: 0.8 + Math.random() * 1.2,
          rotation: Math.random() * 360 - 180,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          duration: 0.8 + Math.random() * 0.6,
        };
      });
      setParticles((prev) => [...prev, ...burstParticles]);
      return;
    }

    // Partikel percikan normal per ketukan
    const newParticles: Particle[] = Array.from({ length: 6 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      return {
        id: Date.now() + i + Math.random(),
        startX: clickX,
        startY: clickY,
        endX: clickX + Math.cos(angle) * distance,
        endY: clickY + Math.sin(angle) * distance - 20,
        scale: 0.6 + Math.random() * 0.6,
        rotation: Math.random() * 180 - 90,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        duration: 0.5 + Math.random() * 0.4,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full relative overflow-hidden select-none bg-[#FDFBF7]">
      
      {/* ── BACKGROUND W/ SHAKE ANIMATION ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        animate={isShaking ? { x: [-3, 3, -2, 2, 0], y: [2, -2, 1, -1, 0] } : {}}
        transition={{ duration: 0.12 }}
      >
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(#4A3B32 1px, transparent 1px), linear-gradient(to right, #4A3B32 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #D4856A 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        <motion.div animate={{ x: [0, 40, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-20 w-96 h-96 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(255,183,178,0.35) 0%, transparent 70%)" }} />
        <motion.div animate={{ x: [0, -50, 30, 0], y: [0, 40, -40, 0], scale: [1, 0.9, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 -right-20 w-[420px] h-[420px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(212,133,106,0.25) 0%, transparent 70%)" }} />
      </motion.div>

      <div className="absolute pointer-events-none z-0"
        style={{ top: "42%", left: "50%", transform: "translate(-50%, -50%)", width: 360, height: 360,
          borderRadius: "50%", filter: "blur(65px)",
          background: `radial-gradient(circle, rgba(255,183,178,${0.2 + progress * 0.6}) 0%, transparent 70%)`,
          transition: "background 0.3s ease" }} />

      {[...Array(14)].map((_, i) => (
        <Sparkle key={`sp-${i}`} delay={i * 0.3} left={`${(i * 7.7) % 94 + 3}%`} top={`${(i * 13) % 85 + 5}%`} />
      ))}
      {[...Array(10)].map((_, i) => (
        <DustMote key={`dm-${i}`} delay={i * 0.5} left={`${(i * 11) % 90 + 5}%`} top={`${(i * 9) % 80 + 10}%`} />
      ))}

      <CornerFlourish className="top-0 left-0" />
      <CornerFlourish className="bottom-0 right-0 rotate-180" />
      <CornerFlourish className="top-0 right-0 scale-x-[-1]" />
      <CornerFlourish className="bottom-0 left-0 scale-y-[-1]" />

      {/* ── HEADER ── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="absolute top-14 text-center z-20 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <motion.div animate={{ scaleX: [0.4, 1.2, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4856A]/70" />
          <p className="text-[#8C6B5D] text-[10px] tracking-[0.5em] uppercase font-bold opacity-90">Chapter Ketiga</p>
          <motion.div animate={{ scaleX: [0.4, 1.2, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4856A]/70" />
        </div>

        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.h2 key="open"
              initial={{ opacity: 0, scale: 0.8, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="text-2xl font-serif font-extrabold text-[#4A3B32] flex items-center gap-2 justify-center drop-shadow-sm">
              <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.4 }}>🎉</motion.span>
              Kadonya Terbuka!
              <motion.span animate={{ rotate: [0, -20, 20, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.4, delay: 0.1 }}>🎉</motion.span>
            </motion.h2>
          ) : (
            <motion.h2 key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xl font-serif text-[#4A3B32] tracking-wide font-medium">
              {clicks === 0 ? "Ketuk kado untuk membuka kadonya..." : `Terus ketuk! (${clicks}/${maxClicks})`}
            </motion.h2>
          )}
        </AnimatePresence>

        {!isComplete && (
          <div className="flex gap-2.5 mt-2">
            {Array.from({ length: maxClicks }).map((_, i) => (
              <motion.div key={i}
                animate={i < clicks ? { scale: [1, 1.5, 1], opacity: 1 } : { opacity: 0.3 }}
                transition={{ duration: 0.2 }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: i < clicks ? "linear-gradient(135deg, #E89070, #FFB7B2)" : "#D4856A",
                  boxShadow: i < clicks ? "0 0 8px rgba(212,133,106,0.8)" : "none" }} />
            ))}
          </div>
        )}
      </motion.div>

      {/* ── GIFT STAGE ── */}
      <div className="relative flex items-center justify-center cursor-pointer mt-12 z-10"
        style={{ width: 320, height: 320 }} onClick={handleTap}>

        {/* ── BUNDARAN PROGRESS RING (Hanya muncul jika BELUM complete) ── */}
        <AnimatePresence>
          {!isComplete && (
            <motion.div 
              key="progress-ring-container"
              className="absolute inset-0 w-full h-full"
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <ProgressRing progress={progress} />
            </motion.div>
          )}
        </AnimatePresence>

        {showBurst && Array.from({ length: 16 }).map((_, i) => (
          <BurstRay key={i} angle={i * 22.5} delay={i * 0.02} />
        ))}

        {/* Floating Combo Words */}
        <AnimatePresence>
          {words.map((w) => (
            <motion.span
              key={w.id}
              initial={{ opacity: 0, scale: 0.6, y: w.y, x: w.x }}
              animate={{ opacity: [0, 1, 1, 0], y: w.y - 65, x: w.x + (Math.random() * 20 - 10), scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute font-sans font-black text-xs text-[#D4856A] bg-white/95 px-2.5 py-0.5 rounded-full border border-[#FFB7B2]/40 shadow-sm pointer-events-none z-40"
            >
              {w.text}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Tap Emoji particles */}
        {particles.map((p) => (
          <motion.div key={p.id}
            initial={{ opacity: 0, x: p.startX, y: p.startY, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              x: p.endX, 
              y: [p.startY, p.endY - 20, p.endY], 
              scale: p.scale, 
              rotate: p.rotation 
            }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            className="absolute text-2xl z-30 pointer-events-none drop-shadow-md"
          >{p.emoji}</motion.div>
        ))}

        {/* ── SEMBURAN EMOTICON BERKALA SAAT KADO TERBUKA ── */}
        {isComplete && Array.from({ length: 18 }).map((_, i) => (
          <motion.span key={`loop-${i}`}
            initial={{ opacity: 0, y: 10, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: -120 - (i % 4) * 25, 
              x: (i - 8) * 20 + (Math.random() * 16 - 8), 
              scale: [0, 1.3, 1, 0],
              rotate: [0, Math.random() * 180 - 90]
            }}
            transition={{ duration: 2.0, delay: i * 0.12, repeat: Infinity, repeatDelay: 0.2 }}
            className="absolute text-xl pointer-events-none z-30"
            style={{ left: "50%", top: "42%", marginLeft: -10 }}
          >
            {EMOJIS[i % EMOJIS.length]}
          </motion.span>
        ))}

        {/* Box Container */}
        <div className="z-20 relative">
          <motion.div
            whileTap={!isComplete ? { scale: 0.88 } : {}}
            animate={!isComplete && clicks > 0 ? {
              rotate: clicks % 2 === 0 ? [-10, 10, 0] : [10, -10, 0],
            } : isComplete ? { scale: 1.05 } : { y: [0, -10, 0] }}
            transition={!isComplete && clicks > 0
              ? { duration: 0.22, ease: "easeInOut" }
              : isComplete ? { duration: 0.3 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <GiftBox clicks={clicks} maxClicks={maxClicks} isComplete={isComplete} />
          </motion.div>
        </div>
      </div>

      {/* ── CTA BUTTON ── */}
      <AnimatePresence>
        {isComplete && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute bottom-12 flex items-center gap-3 text-white text-xs tracking-[0.25em] uppercase font-black z-50"
            style={{ padding: "16px 36px", borderRadius: 999,
              background: "linear-gradient(135deg, #E89070 0%, #C06B55 100%)",
              boxShadow: "0 14px 44px rgba(212,133,106,0.5), inset 0 1px 1px rgba(255,255,255,0.3)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 1, repeat: Infinity }}>✉️</motion.span>
            Lihat Isi Kado
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>→</motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}