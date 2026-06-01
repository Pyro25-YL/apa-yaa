"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StageProps {
  onNext: () => void;// Tetap dipertahankan di interface agar tidak merusak type-system parent component
}

// ─── Sparkle star ─────────────────────────────────────────────────────────────
function Sparkle({ delay, left, top, size = 10, color = "#D4856A" }: { delay: number; left: string; top: string; size?: number; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute pointer-events-none z-10"
      style={{ left, top, width: size, height: size }}
    >
      <svg viewBox="0 0 10 10">
        <path d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2Z" fill={color} opacity="0.75" />
      </svg>
    </motion.div>
  );
}

// ─── Dust mote ────────────────────────────────────────────────────────────────
function DustMote({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.65, 0], y: -80, scale: [0.4, 1.4, 0.4] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute w-1.5 h-1.5 rounded-full blur-[0.5px] pointer-events-none z-0"
      style={{ left, top, background: "radial-gradient(circle, #FFB7B2, #D4856A)" }}
    />
  );
}

// ─── Corner flourish ─────────────────────────────────────────────────────────
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={`absolute w-36 h-36 opacity-[0.15] pointer-events-none z-0 ${className}`} viewBox="0 0 100 100">
      <path d="M0 0 Q50 0 50 50 Q50 100 100 100" stroke="#D4856A" strokeWidth="0.8" fill="none" />
      <path d="M15 0 Q60 10 60 60 Q60 100 100 85" stroke="#D4856A" strokeWidth="0.5" fill="none" />
      <path d="M30 0 Q70 20 70 70 Q70 100 100 70" stroke="#D4856A" strokeWidth="0.3" fill="none" strokeDasharray="3 5" />
      <circle cx="0" cy="0" r="4" fill="#D4856A" opacity="0.7" />
      <circle cx="100" cy="100" r="4" fill="#D4856A" opacity="0.7" />
      <circle cx="50" cy="50" r="2.5" fill="#FFB7B2" opacity="0.6" />
    </svg>
  );
}

// ─── Floating ring ────────────────────────────────────────────────────────────
function FloatingRing({ delay, left, top, size, reverse }: { delay: number; left: string; top: string; size: number; reverse?: boolean }) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360, scale: [1, 1.08, 1] }}
      transition={{ rotate: { duration: 18 + Math.random() * 12, repeat: Infinity, ease: "linear" }, scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
      className="absolute pointer-events-none z-0"
      style={{ left, top, width: size, height: size, border: "1px dashed rgba(212,133,106,0.25)", borderRadius: "50%", transform: "translate(-50%,-50%)" }}
    >
      <div className="absolute w-2 h-2 rounded-full"
        style={{ top: -4, left: "50%", marginLeft: -4, background: "#D4856A", opacity: 0.6, boxShadow: "0 0 8px #D4856A" }} />
    </motion.div>
  );
}

// ─── Drifting blob ────────────────────────────────────────────────────────────
function DriftBlob({ delay, left, top, size, color }: { delay: number; left: string; top: string; size: number; color: string }) {
  return (
    <motion.div
      animate={{ x: [0, 30, -22, 12, 0], y: [0, -25, 18, -10, 0], scale: [1, 1.1, 0.93, 1.07, 1] }}
      transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay }}
      className="absolute pointer-events-none z-0"
      style={{ left, top, width: size, height: size, borderRadius: "50%", background: color, filter: `blur(${size * 0.45}px)`, transform: "translate(-50%,-50%)" }}
    />
  );
}

// ─── Floating emoji petal ─────────────────────────────────────────────────────
function FloatingPetal({ delay, left, emoji }: { delay: number; left: string; emoji: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100vh", x: 0, rotate: 0 }}
      animate={{ opacity: [0, 0.7, 0.5, 0], y: "-10vh", x: [0, 25, -20, 12, 0], rotate: [0, 45, -30, 60] }}
      transition={{ duration: 11 + Math.random() * 4, repeat: Infinity, delay, ease: "linear" }}
      className="absolute pointer-events-none z-5 text-base"
      style={{ left, bottom: 0 }}
    >{emoji}</motion.div>
  );
}

// ─── Diagonal stripe accent ───────────────────────────────────────────────────
function DiagStripe({ className }: { className: string }) {
  return (
    <div className={`absolute pointer-events-none z-0 overflow-hidden ${className}`} style={{ width: 140, height: 140, opacity: 0.05 }}>
      <div style={{
        width: "200%", height: "200%",
        backgroundImage: "repeating-linear-gradient(45deg, #D4856A 0px, #D4856A 1px, transparent 1px, transparent 12px)",
        transform: "rotate(0deg)"
      }} />
    </div>
  );
}

// ─── Confetti burst (on correct answer) ──────────────────────────────────────
function ConfettiBurst() {
  const items = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const dist = 70 + Math.random() * 75;
    const emojis = ["✨", "🌟", "💛", "🌸", "⭐", "🎉", "🧁"];
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 20, emoji: emojis[i % emojis.length], delay: i * 0.04 };
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {items.map((p, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: p.x, y: p.y, scale: [0, 1.4, 0.9, 0] }}
          transition={{ duration: 1.4, delay: p.delay, ease: "easeOut" }}
          className="absolute text-xl">{p.emoji}</motion.span>
      ))}
    </div>
  );
}

// ─── Option button ────────────────────────────────────────────────────────────
function OptionButton({
  opt, isSelected, isCorrectAnswer, onSelect,
}: {
  opt: { id: number; text: string; isCorrect: boolean; joke: string };
  isSelected: boolean;
  isCorrectAnswer: boolean;
  onSelect: () => void;
}) {
  const isCorrectSelected = isSelected && opt.isCorrect;
  const isWrongSelected = isSelected && !opt.isCorrect;

  let bg = "rgba(255,255,255,0.85)";
  let border = "rgba(212,133,106,0.15)";
  let shadow = "0 4px 16px rgba(140,107,93,0.05)";
  let textColor = "#4A3B32";

  if (isCorrectSelected) {
    bg = "linear-gradient(135deg, rgba(220,242,210,0.9), rgba(195,230,180,0.85))";
    border = "rgba(100,180,80,0.4)";
    shadow = "0 8px 28px rgba(100,180,80,0.2)";
    textColor = "#2d6a1f";
  } else if (isWrongSelected) {
    bg = "linear-gradient(135deg, rgba(255,230,220,0.9), rgba(250,210,200,0.85))";
    border = "rgba(220,80,60,0.3)";
    shadow = "0 8px 24px rgba(220,80,60,0.15)";
    textColor = "#9b2e1a";
  }

  return (
    <motion.button
      onClick={onSelect}
      animate={isWrongSelected ? { x: [-7, 7, -5, 5, -3, 3, 0] } : {}}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(140,107,93,0.1)" }}
      className="w-full text-left rounded-2xl relative overflow-hidden"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: shadow,
        cursor: "pointer",
        transition: "box-shadow 0.3s, border-color 0.3s, background 0.3s",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <motion.div className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)", transform: "skewX(-15deg)" }}
      />

      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
          style={{
            background: isCorrectSelected ? "rgba(100,180,80,0.2)" : isWrongSelected ? "rgba(220,80,60,0.15)" : "rgba(212,133,106,0.12)",
            color: isCorrectSelected ? "#2d6a1f" : isWrongSelected ? "#9b2e1a" : "#D4856A",
            border: `1px solid ${isCorrectSelected ? "rgba(100,180,80,0.3)" : isWrongSelected ? "rgba(220,80,60,0.25)" : "rgba(212,133,106,0.2)"}`,
          }}>
          {["A", "B", "C"][opt.id - 1]}
        </div>

        <span className="flex-1 font-serif text-[12.5px] leading-relaxed" style={{ color: textColor }}>
          {opt.text}
        </span>

        <AnimatePresence mode="wait">
          {isSelected && (
            <motion.span key="icon"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              className="flex-shrink-0 text-lg"
            >{opt.isCorrect ? "✅" : "❌"}</motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

// ─── Main Stage5Quiz ──────────────────────────────────────────────────────────
export default function Stage5Quiz({ onNext }: StageProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [status, setStatus] = useState<"neutral" | "wrong" | "correct">("neutral");
  const [showBurst, setShowBurst] = useState(false);

  const question = "Menurut pengamatanku, mana yang paling 'Shendy Banget'?";

  const options = [
    {
      id: 1,
      text: "Merasa belum cukup padahal sebenarnya sudah hebat 🌱",
      isCorrect: true,
      joke: "Yup! Kadang yang paling sulit diyakinkan bukan orang lain, tapi Shendy sendiri 😭💛",
    },
    {
      id: 2,
      text: "Tidur 8 jam sehari dan hidup tanpa deadline 😴",
      isCorrect: false,
      joke: "Hmm... rasanya kita berdua tahu itu bukan Shendy deh WKWKWK 😭",
    },
    {
      id: 3,
      text: "Selalu memikirkan diri sendiri lebih dulu 👀",
      isCorrect: false,
      joke: "Salah~ Justru seringnya kamu lebih memikirkan orang lain daripada dirimu sendiri 💛",
    },
  ];

  const handleAnswer = (id: number, isCorrect: boolean) => {
    setSelectedId(id);
    if (isCorrect) {
      setStatus("correct");
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 1400);
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 w-full relative bg-[#FDFBF7] select-none overflow-hidden">

      {/* ══════════ RICH BACKGROUND LAYER ══════════ */}

      {/* 1. Fine grid */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: `linear-gradient(rgba(74,59,50,0.055) 1px, transparent 1px), linear-gradient(to right, rgba(74,59,50,0.055) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />

      {/* 2. Dot halftone offset layer */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(circle, rgba(212,133,106,0.12) 1.2px, transparent 1.2px)", backgroundSize: "18px 18px", backgroundPosition: "9px 9px" }} />

      {/* 3. Diagonal stripe accents in corners */}
      <DiagStripe className="top-0 left-0" />
      <DiagStripe className="bottom-0 right-0" />
      <DiagStripe className="top-0 right-0" />
      <DiagStripe className="bottom-0 left-0" />

      {/* 4. Large aurora blobs */}
      <DriftBlob delay={0}   left="-8%" top="10%"  size={380} color="rgba(255,183,178,0.28)" />
      <DriftBlob delay={2}   left="108%" top="80%"  size={420} color="rgba(212,133,106,0.2)" />
      <DriftBlob delay={1}   left="55%"  top="-5%"  size={280} color="rgba(255,209,193,0.22)" />
      <DriftBlob delay={3}   left="20%"  top="100%" size={300} color="rgba(255,183,178,0.18)" />
      <DriftBlob delay={1.5} left="85%"  top="30%"  size={200} color="rgba(255,209,193,0.18)" />

      {/* 5. Medium mid-screen blobs */}
      <DriftBlob delay={0.8} left="15%"  top="50%"  size={120} color="rgba(255,183,178,0.15)" />
      <DriftBlob delay={2.5} left="80%"  top="55%"  size={140} color="rgba(212,133,106,0.12)" />
      <DriftBlob delay={4.0} left="50%"  top="40%"  size={160} color="rgba(255,209,193,0.14)" />

      {/* 6. Floating orbital rings */}
      <FloatingRing delay={0}   left="10%"  top="20%"  size={80} />
      <FloatingRing delay={1}   left="90%"  top="18%"  size={60}  reverse />
      <FloatingRing delay={0.5} left="88%"  top="75%"  size={90} />
      <FloatingRing delay={2}   left="12%"  top="78%"  size={70}  reverse />
      <FloatingRing delay={1.5} left="50%"  top="8%"   size={50} />
      <FloatingRing delay={3}   left="50%"  top="92%"  size={65}  reverse />

      {/* 7. Sparkles — denser coverage */}
      {[
        { left: "5%",  top: "12%" }, { left: "92%", top: "10%" },
        { left: "8%",  top: "38%" }, { left: "90%", top: "35%" },
        { left: "10%", top: "65%" }, { left: "88%", top: "62%" },
        { left: "6%",  top: "88%" }, { left: "93%", top: "85%" },
        { left: "30%", top: "5%"  }, { left: "70%", top: "4%"  },
        { left: "28%", top: "94%" }, { left: "68%", top: "95%" },
        { left: "20%", top: "50%" }, { left: "78%", top: "48%" },
        { left: "50%", top: "3%"  }, { left: "50%", top: "96%" },
        { left: "2%",  top: "52%" }, { left: "97%", top: "55%" },
        { left: "40%", top: "25%" }, { left: "60%", top: "70%" },
      ].map((p, i) => (
        <Sparkle key={i} delay={i * 0.24} {...p}
          size={i % 3 === 0 ? 13 : i % 3 === 1 ? 8 : 11}
          color={i % 2 === 0 ? "#D4856A" : "#FFB7B2"}
        />
      ))}

      {/* 8. Dust motes — more and varied */}
      {[
        { left: "12%", top: "22%" }, { left: "83%", top: "18%" },
        { left: "18%", top: "72%" }, { left: "77%", top: "68%" },
        { left: "4%",  top: "55%" }, { left: "94%", top: "50%" },
        { left: "38%", top: "8%"  }, { left: "62%", top: "90%" },
        { left: "25%", top: "35%" }, { left: "72%", top: "30%" },
        { left: "30%", top: "80%" }, { left: "65%", top: "75%" },
        { left: "45%", top: "20%" }, { left: "55%", top: "60%" },
      ].map((p, i) => <DustMote key={i} delay={i * 0.4} {...p} />)}

      {/* 9. Floating petals rising from bottom */}
      {[
        { left: "7%",  emoji: "🌸", delay: 0   },
        { left: "20%", emoji: "✨", delay: 2   },
        { left: "38%", emoji: "🌼", delay: 4   },
        { left: "55%", emoji: "🌸", delay: 1   },
        { left: "70%", emoji: "✨", delay: 3   },
        { left: "85%", emoji: "🌸", delay: 1.5 },
        { left: "48%", emoji: "💛", delay: 5   },
        { left: "92%", emoji: "🌼", delay: 2.8 },
      ].map((p, i) => <FloatingPetal key={i} {...p} />)}

      {/* 10. Corner flourishes — all four */}
      <CornerFlourish className="top-0 left-0" />
      <CornerFlourish className="bottom-0 right-0 rotate-180" />
      <CornerFlourish className="top-0 right-0 scale-x-[-1]" />
      <CornerFlourish className="bottom-0 left-0 scale-y-[-1]" />

      {/* 11. Center ambient glow (subtle) */}
      <div className="absolute pointer-events-none z-0"
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 620, height: 620,
          borderRadius: "50%", filter: "blur(100px)",
          background: "radial-gradient(circle, rgba(255,209,193,0.2) 0%, transparent 65%)" }} />

      {/* 12. Reactive glow on correct */}
      <AnimatePresence>
        {status === "correct" && (
          <motion.div key="correctglow"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.75, 0.45], scale: [0.7, 1.35, 1.2] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute pointer-events-none z-0"
            style={{ width: 650, height: 650, top: "50%", left: "50%",
              transform: "translate(-50%,-50%)", borderRadius: "50%", filter: "blur(85px)",
              background: "radial-gradient(circle, rgba(120,220,80,0.38) 0%, transparent 70%)" }}
          />
        )}
      </AnimatePresence>
      {/* ══════════════════════════════════════════ */}



      {/* ── CONTENT ── */}
      <div className="max-w-sm w-full z-10 flex flex-col gap-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-center">
          <div className="flex items-center gap-3 justify-center mb-3">
            <motion.div animate={{ scaleX: [0.4, 1, 0.4] }} transition={{ duration: 3.5, repeat: Infinity }}
              className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4856A]/60" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#8C6B5D] font-bold">Chapter kelima</span>
            <motion.div animate={{ scaleX: [0.4, 1, 0.4] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4856A]/60" />
          </div>
          <h2 className="text-3xl font-serif text-[#4A3B32] tracking-wide mb-1">The Pop Quiz!</h2>
          <p className="text-[#8C6B5D]/65 text-[11px] font-serif italic">Uji konsentrasi dulu, tebak dengan benar ya!</p>
        </motion.div>

        {/* Question card */}
        <div className="relative">
          {/* Subtle backpulse decorative ring behind card */}
          <motion.div 
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FFB7B2]/30 to-[#D4856A]/30 blur-md pointer-events-none" 
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="relative overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,209,193,0.55) 0%, rgba(255,183,178,0.4) 100%)",
              border: "1px solid rgba(212,133,106,0.25)",
              boxShadow: "0 10px 35px rgba(212,133,106,0.14), inset 0 1px 0 rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
            }}>
            <div className="absolute -top-1 left-3 text-5xl font-serif pointer-events-none leading-none"
              style={{ color: "rgba(212,133,106,0.18)" }}>"</div>

            <div className="px-5 py-5 flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg mt-0.5"
                style={{ background: "rgba(212,133,106,0.18)", border: "1px solid rgba(212,133,106,0.25)" }}
              >🤔</motion.div>
              <p className="text-[13px] font-serif text-[#4A3B32] leading-relaxed font-semibold flex-1 text-justify pt-1">
                {question}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Options */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col gap-3 relative"
        >
          {showBurst && <ConfettiBurst />}
          {options.map((opt) => (
            <OptionButton
              key={opt.id}
              opt={opt}
              isSelected={selectedId === opt.id}
              isCorrectAnswer={status === "correct"}
              onSelect={() => handleAnswer(opt.id, opt.isCorrect)}
            />
          ))}
        </motion.div>

        {/* Feedback message */}
        <div className="h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedId && (
              <motion.div key={selectedId}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5 }}
                className="w-full rounded-2xl px-4 py-3 text-center relative overflow-hidden"
                style={{
                  background: options.find((o) => o.id === selectedId)?.isCorrect
                    ? "linear-gradient(135deg, rgba(220,242,210,0.85), rgba(195,230,180,0.75))"
                    : "linear-gradient(135deg, rgba(255,230,220,0.85), rgba(250,210,200,0.75))",
                  border: `1px solid ${options.find((o) => o.id === selectedId)?.isCorrect ? "rgba(100,180,80,0.35)" : "rgba(220,80,60,0.3)"}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <p className="text-[11.5px] font-serif italic leading-relaxed"
                  style={{ color: options.find((o) => o.id === selectedId)?.isCorrect ? "#2d6a1f" : "#9b2e1a" }}>
                  {options.find((o) => o.id === selectedId)?.joke}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center items-center pt-4"
          style={{ borderTop: "1px solid rgba(212,133,106,0.12)" }}>

          <motion.button
            onClick={onNext}
            disabled={status !== "correct"}
            whileHover={status === "correct" ? { scale: 1.05, boxShadow: "0 16px 40px rgba(212,133,106,0.45)" } : {}}
            whileTap={status === "correct" ? { scale: 0.96 } : {}}
            className="relative overflow-hidden text-[12px] font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 w-full"
            style={{
              padding: "14px 32px", borderRadius: 999,
              background: status === "correct"
                ? "linear-gradient(135deg, #D4856A 0%, #C06B55 100%)"
                : "linear-gradient(135deg, #e3dac9, #cfc2b2)",
              color: status === "correct" ? "white" : "rgba(74,59,50,0.45)",
              boxShadow: status === "correct"
                ? "0 10px 30px rgba(212,133,106,0.35), inset 0 1px 1px rgba(255,255,255,0.25)"
                : "none",
              cursor: status === "correct" ? "pointer" : "not-allowed",
              transition: "all 0.4s ease",
            }}
          >
            {/* Shimmer (correct only) */}
            {status === "correct" && (
              <motion.span className="absolute inset-0 pointer-events-none"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)", transform: "skewX(-20deg)" }}
              />
            )}
            <motion.span animate={status === "correct" ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }} className="relative z-10 text-sm">💌</motion.span>
            <span className="relative z-10">Buka Surat</span>
            {status === "correct" && (
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}
                className="relative z-10">→</motion.span>
            )}
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}