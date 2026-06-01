"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StageProps {
  onNext: () => void;
}

// ─── Sparkle star ─────────────────────────────────────────────────────────────
function Sparkle({ delay, left, top, size = 11, color = "#D4856A" }: {
  delay: number; left: string; top: string; size?: number; color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.1, 0], rotate: [0, 120] }}
      transition={{ duration: 2.2 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute pointer-events-none z-10"
      style={{ left, top, width: size, height: size }}
    >
      <svg viewBox="0 0 10 10">
        <path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
}

// ─── Dust mote ────────────────────────────────────────────────────────────────
function DustMote({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.6, 0], y: -65, scale: [0.5, 1.4, 0.5] }}
      transition={{ duration: 4.5 + Math.random() * 3, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute w-2 h-2 rounded-full blur-[1px] pointer-events-none z-0"
      style={{ left, top, background: "radial-gradient(circle, #FFB7B2, #D4856A)" }}
    />
  );
}

// ─── Falling star shower ──────────────────────────────────────────────────────
function FallingStar({ delay, left, duration }: { delay: number; left: string; duration: number }) {
  return (
    <motion.div
      initial={{ y: "-10vh", opacity: 0, scale: 0.5 }}
      animate={{ y: "110vh", opacity: [0, 0.45, 0.45, 0], scale: [0.5, 1, 1, 0.3], rotate: 360 }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
      className="fixed text-sm pointer-events-none z-0 select-none"
      style={{ left, color: "rgba(212,133,106,0.45)" }}
    >✦</motion.div>
  );
}

// ─── Floating petal ───────────────────────────────────────────────────────────
function FloatingPetal({ delay, left, emoji }: { delay: number; left: string; emoji: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100vh", x: 0, rotate: 0 }}
      animate={{ opacity: [0, 0.55, 0.4, 0], y: "-10vh", x: [0, 22, -16, 8, 0], rotate: [0, 35, -25, 50] }}
      transition={{ duration: 11 + Math.random() * 4, repeat: Infinity, delay, ease: "linear" }}
      className="fixed pointer-events-none z-0 text-base select-none"
      style={{ left, bottom: 0 }}
    >{emoji}</motion.div>
  );
}

// ─── Drifting blob ────────────────────────────────────────────────────────────
function DriftBlob({ delay, left, top, size, color }: {
  delay: number; left: string; top: string; size: number; color: string;
}) {
  return (
    <motion.div
      animate={{ x: [0, 28, -18, 10, 0], y: [0, -22, 16, -8, 0], scale: [1, 1.1, 0.94, 1.06, 1] }}
      transition={{ duration: 9 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay }}
      className="fixed pointer-events-none z-0"
      style={{ left, top, width: size, height: size, borderRadius: "50%",
        background: color, filter: `blur(${size * 0.44}px)`, transform: "translate(-50%,-50%)" }}
    />
  );
}

// ─── Floating ring ────────────────────────────────────────────────────────────
function FloatingRing({ delay, left, top, size, reverse }: {
  delay: number; left: string; top: string; size: number; reverse?: boolean;
}) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: 22 + Math.random() * 12, repeat: Infinity, ease: "linear" }}
      className="fixed pointer-events-none z-0"
      style={{ left, top, width: size, height: size,
        border: "1px dashed rgba(212,133,106,0.18)", borderRadius: "50%", transform: "translate(-50%,-50%)" }}
    >
      <div className="absolute w-2 h-2 rounded-full"
        style={{ top: -4, left: "50%", marginLeft: -4,
          background: "#D4856A", opacity: 0.5, boxShadow: "0 0 6px #D4856A" }} />
    </motion.div>
  );
}

// ─── Diagonal stripe tile ─────────────────────────────────────────────────────
function DiagStripe({ className }: { className: string }) {
  return (
    <div className={`fixed pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ width: 140, height: 140, opacity: 0.045 }}>
      <div style={{ width: "200%", height: "200%",
        backgroundImage: "repeating-linear-gradient(45deg, #D4856A 0px, #D4856A 1px, transparent 1px, transparent 12px)" }} />
    </div>
  );
}

// ─── Corner flourish ─────────────────────────────────────────────────────────
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={`fixed w-36 h-36 opacity-[0.12] pointer-events-none z-0 ${className}`} viewBox="0 0 100 100">
      <path d="M0 0 Q50 0 50 50 Q50 100 100 100" stroke="#D4856A" strokeWidth="1" fill="none" />
      <path d="M15 0 Q60 10 60 60 Q60 100 100 85" stroke="#D4856A" strokeWidth="0.6" fill="none" />
      <path d="M30 0 Q72 18 72 70 Q72 100 100 70" stroke="#D4856A" strokeWidth="0.35" fill="none" strokeDasharray="3 6" />
      <circle cx="0" cy="0" r="4" fill="#D4856A" opacity="0.9" />
      <circle cx="100" cy="100" r="4" fill="#D4856A" opacity="0.9" />
      <circle cx="50" cy="50" r="2.5" fill="#FFB7B2" opacity="0.7" />
    </svg>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="flex items-center gap-4 w-full justify-center my-2">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(212,133,106,0.35))" }} />
      <motion.span animate={{ rotate: [0, 45, -45, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="text-[#D4856A]/60 text-xs">✦</motion.span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(212,133,106,0.35))" }} />
    </div>
  );
}

// ─── Card hover particle sparks ───────────────────────────────────────────────
function CardHoverParticles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <>
      {[0,1,2,3,4,5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <motion.div key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 0.9, 0], x: Math.cos(angle) * 32, y: Math.sin(angle) * 22, scale: [0, 1.1, 0] }}
            transition={{ duration: 0.85, delay: i * 0.07, ease: "easeOut" }}
            className="absolute pointer-events-none z-20 text-xs select-none"
            style={{ left: "50%", top: "50%", marginLeft: -8, marginTop: -8 }}
          >✦</motion.div>
        );
      })}
    </>
  );
}

const CARD_ACCENTS = [
  { from: "#FFD1C1", to: "#D4856A", glow: "rgba(212,133,106,0.25)" },
  { from: "#FFB7B2", to: "#C06B55", glow: "rgba(192,107,85,0.22)" },
  { from: "#FFD1C1", to: "#E89070", glow: "rgba(232,144,112,0.25)" },
  { from: "#FFCFC9", to: "#D4856A", glow: "rgba(212,133,106,0.2)"  },
];

export default function Stage4Memory({ onNext }: StageProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const starterPacks = [
    {
      id: "01", emoji: "🌱",
      title: "Kurang percaya pada kemampuan diri sendiri",
      desc: "Padahal sebenarnya pintar dan rajin, tapi sering meragukan kemampuan sendiri. Sering merasa belum cukup atau takut hasilnya kurang baik, padahal berkali-kali sudah membuktikan kalau dirinya mampu. Kadang yang paling sulit diyakinkan bukan orang lain, melainkan dirinya sendiri.",
      tag: "growth",
    },
    {
      id: "02", emoji: "🤍",
      title: "Selalu mengutamakan perasaan orang lain",
      desc: "Salah satu hal yang paling aku kagumi dari Shendy adalah kepeduliannya terhadap orang lain. Sering kali lebih memikirkan kenyamanan dan perasaan orang di sekitarnya daripada dirinya sendiri. Meskipun begitu, jangan lupa sesekali memberi ruang untuk diri sendiri juga, karena perasaanmu juga penting.",
      tag: "kindness",
    },
    {
      id: "03", emoji: "🧸",
      title: "Anak kecil yang berusaha dewasa xixixixi",
      desc: "Di balik kesan kuat dan dewasa yang sering ditunjukkan, sebenarnya masih ada sisi anak kecil yang menyenangkan. Kamu sering berusaha terlihat kuat dan dewasa, tapi jujur, aku juga suka melihat sisi dirimu yang bisa tertawa lepas, bercanda tanpa beban. Sesekali, nggak apa-apa untuk berhenti menjadi orang yang selalu kuat.",
      tag: "genuine",
    },
    {
      id: "04", emoji: "🍃",
      title: "Berteman baik dengan takdir",
      desc: "Shendy adalah tipe orang yang tidak selalu memaksa segala sesuatu berjalan sesuai rencana. Ketika ada hal yang tidak bisa dikendalikan, dia memilih menerima dan menjalaninya sebaik mungkin. Ada kalanya kita hanya bisa berusaha, lalu membiarkan waktu dan takdir menentukan sisanya.",
      tag: "peace",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.22 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 55, damping: 13 } },
  }as const;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-14 pb-16 px-4 w-full relative bg-[#FDFBF7] overflow-y-auto select-none">

      {/* ══════════ RICH BACKGROUND ══════════ */}
      {/* 1. Fine grid */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: `linear-gradient(rgba(74,59,50,0.055) 1px, transparent 1px), linear-gradient(to right, rgba(74,59,50,0.055) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
      {/* 2. Offset dot halftone */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(circle, rgba(212,133,106,0.11) 1.2px, transparent 1.2px)", backgroundSize: "18px 18px", backgroundPosition: "9px 9px" }} />
      {/* 3. Diagonal stripes */}
      <DiagStripe className="top-0 left-0" />
      <DiagStripe className="bottom-0 right-0" />
      <DiagStripe className="top-0 right-0" />
      <DiagStripe className="bottom-0 left-0" />
      {/* 4. Aurora blobs */}
      <DriftBlob delay={0}   left="-8%"  top="12%"  size={400} color="rgba(255,183,178,0.28)" />
      <DriftBlob delay={2}   left="108%" top="78%"  size={440} color="rgba(212,133,106,0.2)"  />
      <DriftBlob delay={1}   left="55%"  top="-5%"  size={300} color="rgba(255,209,193,0.22)" />
      <DriftBlob delay={3}   left="20%"  top="105%" size={320} color="rgba(255,183,178,0.18)" />
      <DriftBlob delay={1.5} left="88%"  top="32%"  size={220} color="rgba(255,209,193,0.18)" />
      <DriftBlob delay={0.8} left="14%"  top="52%"  size={130} color="rgba(255,183,178,0.14)" />
      <DriftBlob delay={2.5} left="82%"  top="58%"  size={150} color="rgba(212,133,106,0.11)" />
      {/* 5. Orbital rings */}
      <FloatingRing delay={0}   left="9%"  top="18%"  size={85} />
      <FloatingRing delay={1}   left="91%" top="15%"  size={65} reverse />
      <FloatingRing delay={0.5} left="89%" top="78%"  size={95} />
      <FloatingRing delay={2}   left="11%" top="82%"  size={75} reverse />
      <FloatingRing delay={1.5} left="50%" top="7%"   size={55} />
      <FloatingRing delay={3}   left="50%" top="93%"  size={70} reverse />
      <FloatingRing delay={2.5} left="28%" top="40%"  size={45} />
      <FloatingRing delay={3.5} left="74%" top="60%"  size={50} reverse />
      {/* 6. Falling stars */}
      {[
        { left:"8%",  delay:0,   duration:7  }, { left:"22%", delay:2.5, duration:9  },
        { left:"40%", delay:1,   duration:8  }, { left:"58%", delay:4,   duration:11 },
        { left:"72%", delay:1.8, duration:7  }, { left:"88%", delay:3,   duration:9  },
        { left:"95%", delay:5,   duration:6  },
      ].map((s,i) => <FallingStar key={i} {...s} />)}
      {/* 7. Floating petals */}
      {[
        { left:"6%",  emoji:"🌸", delay:0   }, { left:"18%", emoji:"✨", delay:2   },
        { left:"35%", emoji:"🌼", delay:4   }, { left:"52%", emoji:"🌸", delay:1   },
        { left:"66%", emoji:"✨", delay:3   }, { left:"80%", emoji:"🌸", delay:1.5 },
        { left:"46%", emoji:"💛", delay:5.5 }, { left:"90%", emoji:"🌼", delay:2.8 },
      ].map((p,i) => <FloatingPetal key={i} {...p} />)}
      {/* 8. Sparkles */}
      {[
        {left:"4%", top:"10%"},{left:"93%",top:"8%" },{left:"7%", top:"35%"},{left:"91%",top:"32%"},
        {left:"9%", top:"62%"},{left:"89%",top:"60%"},{left:"5%", top:"86%"},{left:"92%",top:"88%"},
        {left:"28%",top:"4%" },{left:"70%",top:"3%" },{left:"27%",top:"96%"},{left:"67%",top:"97%"},
        {left:"19%",top:"48%"},{left:"79%",top:"45%"},{left:"48%",top:"2%" },{left:"52%",top:"97%"},
        {left:"1%", top:"52%"},{left:"97%",top:"55%"},{left:"38%",top:"22%"},{left:"62%",top:"78%"},
      ].map((p,i) => (
        <Sparkle key={i} delay={i*0.26} {...p}
          size={i%3===0?13:i%3===1?8:10}
          color={i%2===0?"#D4856A":"#FFB7B2"}
        />
      ))}
      {/* 9. Dust motes */}
      {[
        {left:"11%",top:"20%"},{left:"84%",top:"16%"},{left:"17%",top:"68%"},{left:"78%",top:"72%"},
        {left:"3%", top:"53%"},{left:"95%",top:"48%"},{left:"36%",top:"7%" },{left:"63%",top:"92%"},
        {left:"23%",top:"33%"},{left:"73%",top:"28%"},{left:"29%",top:"82%"},{left:"66%",top:"76%"},
        {left:"42%",top:"90%"},{left:"57%",top:"12%"},
      ].map((p,i) => <DustMote key={i} delay={i*0.42} {...p} />)}
      {/* 10. Corner flourishes */}
      <CornerFlourish className="top-0 left-0" />
      <CornerFlourish className="bottom-0 right-0 rotate-180" />
      <CornerFlourish className="top-0 right-0 scale-x-[-1]" />
      <CornerFlourish className="bottom-0 left-0 scale-y-[-1]" />
      {/* 11. Centre glow */}
      <div className="fixed pointer-events-none z-0"
        style={{ top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700,
          borderRadius:"50%", filter:"blur(110px)",
          background:"radial-gradient(circle, rgba(255,209,193,0.16) 0%, transparent 65%)" }} />
      {/* ═══════════════════════════════ */}

      {/* ── HEADER ── */}
      <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
        className="text-center mb-8 z-10 max-w-sm w-full">
        <div className="flex items-center gap-3 justify-center mb-2">
          <motion.div animate={{ scaleX: [0.4, 1, 0.4] }} transition={{ duration: 3.5, repeat: Infinity }}
            className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4856A]/70" />
          <span className="text-[9px] tracking-[0.5em] uppercase text-[#8C6B5D] font-bold">Chapter Keempat</span>
          <motion.div animate={{ scaleX: [0.4, 1, 0.4] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4856A]/70" />
        </div>
        <h2 className="text-2xl font-serif text-[#4A3B32] tracking-wide mb-1">The Appreciation Wall</h2>
        <p className="text-[#8C6B5D]/70 text-[11px] font-serif italic">
          Beberapa hal yang 'Shendy Banget' menurut pengamatanku...
        </p>
        <SectionDivider />
      </motion.div>

      {/* ── CARDS ── */}
      <motion.div variants={containerVariants} initial="hidden" animate="show"
        className="w-full max-w-md flex flex-col gap-6 z-10 mb-10">
        {starterPacks.map((item, index) => {
          const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
          const isHovered = hoveredCard === index;
          return (
            <motion.div key={item.id} variants={itemVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -7 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative overflow-hidden rounded-[26px] bg-white flex flex-col cursor-default"
              style={{
                border: `1px solid ${isHovered ? "rgba(212,133,106,0.38)" : "rgba(212,133,106,0.13)"}`,
                boxShadow: isHovered
                  ? `0 28px 55px ${accent.glow}, 0 8px 22px rgba(140,107,93,0.07)`
                  : "0 8px 28px rgba(140,107,93,0.05)",
                transition: "box-shadow 0.35s ease, border-color 0.35s ease",
              }}
            >
              {/* Top accent bar — animates on hover */}
              <motion.div className="h-[4px] w-full origin-left"
                animate={{ scaleX: isHovered ? 1 : 0.92, opacity: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
                style={{ background: `linear-gradient(to right, ${accent.from}, ${accent.to}, ${accent.from})` }}
              />

              {/* Top-right corner glow */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div key="glow"
                    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none z-0"
                    style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`, filter: "blur(22px)" }}
                  />
                )}
              </AnimatePresence>

              {/* Bottom-left secondary glow */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div key="glow2"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none z-0"
                    style={{ background: `radial-gradient(circle, ${accent.from}60, transparent)`, filter: "blur(18px)" }}
                  />
                )}
              </AnimatePresence>

              {/* Spark particles on hover enter */}
              <CardHoverParticles active={isHovered} />

              {/* Dot bg pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, #D4856A 1px, transparent 1px)", backgroundSize: "14px 14px" }} />

              {/* Card body */}
              <div className="flex gap-4 items-start p-5 relative z-10">
                {/* Emoji box */}
                <div className="flex-shrink-0 relative">
                  <motion.div
                    animate={isHovered
                      ? { scale: 1.1, rotate: [0, -8, 8, 0] }
                      : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${accent.from}38, ${accent.to}28)`,
                      border: `1px solid ${isHovered ? "rgba(212,133,106,0.3)" : "rgba(212,133,106,0.14)"}`,
                      boxShadow: isHovered
                        ? `0 10px 24px ${accent.glow}, inset 0 1px 2px rgba(255,255,255,0.9)`
                        : "inset 0 1px 2px rgba(255,255,255,0.9)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <span className="text-[8px] font-mono text-[#D4856A] font-bold leading-none mb-1">{item.id}</span>
                    <motion.span
                      animate={isHovered
                        ? { scale: [1, 1.3, 1.18], rotate: [0, 14, -10, 0] }
                        : { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                      transition={{ duration: isHovered ? 0.5 : 3.5, repeat: isHovered ? 0 : Infinity, ease: "easeInOut", delay: index * 0.4 }}
                      className="text-2xl leading-none select-none"
                    >{item.emoji}</motion.span>
                  </motion.div>
                  {/* Glow ring */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0.45, scale: isHovered ? 1.25 : 1 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${accent.from}55, transparent)`, filter: "blur(10px)", zIndex: -1 }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  {/* Tag pill — slides + brightens on hover */}
                  <motion.span
                    animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.85 }}
                    transition={{ duration: 0.28 }}
                    className="inline-block text-[8px] font-mono tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full mb-2"
                    style={{
                      background: isHovered ? `${accent.from}68` : `${accent.from}40`,
                      color: "#7A5A4E",
                      border: `1px solid ${isHovered ? accent.to + "65" : accent.to + "35"}`,
                      transition: "all 0.28s ease",
                    }}
                  >{item.tag}</motion.span>

                  {/* Title */}
                  <motion.h3
                    animate={{ color: isHovered ? "#C06B55" : "#4A3B32" }}
                    transition={{ duration: 0.28 }}
                    className="font-serif font-bold text-[13.5px] mb-2 leading-snug tracking-wide"
                  >{item.title}</motion.h3>

                  <p className="text-[11.5px] text-[#6B5A4E] leading-relaxed font-serif text-justify">{item.desc}</p>
                </div>
              </div>

              {/* Bottom watermark row */}
              <div className="flex items-end justify-between px-5 pb-3 relative z-10">
                <motion.span
                  animate={{ opacity: isHovered ? 0.2 : 0.06, scale: isHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl font-serif font-bold leading-none select-none"
                  style={{ color: accent.to }}
                >{item.id}</motion.span>
                <motion.span
                  animate={{ opacity: isHovered ? 0.22 : 0.08, scale: isHovered ? 1.12 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-[38px] font-serif leading-none select-none"
                  style={{ color: accent.to }}
                >"</motion.span>
              </div>

              {/* Bottom grow line */}
              <motion.div className="h-[2px] mx-5 mb-3 rounded-full origin-left"
                animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 0.55 : 0 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                style={{ background: `linear-gradient(to right, ${accent.from}, ${accent.to}, transparent)` }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── CLOSING QUOTE ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
        className="w-full max-w-md z-10 mb-10">
        <div className="rounded-[24px] px-6 py-5 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,209,193,0.42) 0%, rgba(255,183,178,0.28) 100%)",
            border: "1px solid rgba(212,133,106,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 30px rgba(140,107,93,0.06)",
            backdropFilter: "blur(8px)",
          }}>
          <div className="absolute -top-2 left-4 text-6xl font-serif pointer-events-none select-none"
            style={{ color: "rgba(212,133,106,0.13)", lineHeight: 1 }}>"</div>
          <div className="absolute -bottom-4 right-4 text-6xl font-serif pointer-events-none rotate-180 select-none"
            style={{ color: "rgba(212,133,106,0.13)", lineHeight: 1 }}>"</div>
          <p className="text-[12px] font-serif italic text-[#6B5A4E] leading-relaxed relative z-10">
            Semua hal di atas bukan kekurangan — itu bagian dari dirimu yang membuat kamu jadi{" "}
            <span className="font-bold text-[#D4856A] not-italic">Shendy</span>.
          </p>
          <div className="flex justify-center mt-3.5 gap-2">
            {["🌱","🤍","🧸","🍃"].map((e,i) => (
              <motion.span key={i} animate={{ y:[0,-5,0], scale:[1,1.12,1] }}
                transition={{ duration:2.2, repeat:Infinity, delay:i*0.3, ease:"easeInOut" }}
                className="text-base select-none">{e}</motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── NAV ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }}
        className="w-full max-w-md flex justify-center z-10 pt-6"
        style={{ borderTop: "1px solid rgba(212,133,106,0.14)" }}>
        <motion.button onClick={onNext}
          whileHover={{ scale: 1.03, boxShadow: "0 20px 48px rgba(212,133,106,0.48)" }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden text-white text-[11.5px] font-bold tracking-[0.22em] uppercase flex items-center justify-center gap-2.5 w-full py-4 rounded-full"
          style={{
            background: "linear-gradient(135deg, #D4856A 0%, #C06B55 100%)",
            boxShadow: "0 12px 35px rgba(212,133,106,0.35), inset 0 1px 1px rgba(255,255,255,0.25)",
          }}>
          <motion.span className="absolute inset-0 pointer-events-none"
            animate={{ x:["-100%","250%"] }}
            transition={{ duration:2.8, repeat:Infinity, repeatDelay:1.8, ease:"easeInOut" }}
            style={{ background:"linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)", transform:"skewX(-25deg)" }}
          />
          <span className="relative z-10">Lanjut Kuis Seru!</span>
          <motion.span animate={{ x:[0,5,0] }} transition={{ duration:1.2, repeat:Infinity }}
            className="relative z-10 text-xs">→</motion.span>
        </motion.button>
      </motion.div>

    </div>
  );
}