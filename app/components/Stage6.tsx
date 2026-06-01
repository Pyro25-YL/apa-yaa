"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Sparkle ──────────────────────────────────────────────────────────────────
function Sparkle({ delay, left, top, size = 10 }: { delay: number; left: string; top: string; size?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 90] }}
      transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute pointer-events-none z-10"
      style={{ left, top, width: size, height: size }}
    >
      <svg viewBox="0 0 10 10">
        <path d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2Z" fill="#D4856A" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

// ─── Dust mote ────────────────────────────────────────────────────────────────
function DustMote({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.5, 0], y: -55, scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute w-1.5 h-1.5 rounded-full blur-[1px] pointer-events-none z-0"
      style={{ left, top, background: "radial-gradient(circle, #FFB7B2, #D4856A)" }}
    />
  );
}

// ─── Corner flourish ─────────────────────────────────────────────────────────
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={`absolute w-28 h-28 opacity-[0.1] pointer-events-none z-0 ${className}`} viewBox="0 0 100 100">
      <path d="M0 0 Q50 0 50 50 Q50 100 100 100" stroke="#D4856A" strokeWidth="0.8" fill="none" />
      <path d="M15 0 Q60 10 60 60 Q60 100 100 85" stroke="#D4856A" strokeWidth="0.5" fill="none" />
      <circle cx="0" cy="0" r="3.5" fill="#D4856A" opacity="0.8" />
      <circle cx="100" cy="100" r="3.5" fill="#D4856A" opacity="0.8" />
      <circle cx="50" cy="50" r="2" fill="#FFB7B2" opacity="0.6" />
    </svg>
  );
}

// ─── Floating heart ───────────────────────────────────────────────────────────
function FloatingHeart({ delay, x }: { delay: number; x: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.7, 0], y: -120, scale: [0.5, 1, 0.7], x: [0, 15, -10, 0] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay, ease: "easeOut" }}
      className="absolute pointer-events-none z-20 text-base"
      style={{ left: x, bottom: "30%" }}
    >
      {["💖", "🌸", "✨", "💝"][Math.floor(Math.random() * 4)]}
    </motion.div>
  );
}

// ─── Decorative wax seal ──────────────────────────────────────────────────────
function WaxSeal() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 48, height: 48 }}>
      <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
        <circle cx="24" cy="24" r="22" fill="url(#sealGrad)" />
        <circle cx="24" cy="24" r="19" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        <circle cx="24" cy="24" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        {/* Star pattern */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 8;
          return <line key={i} x1="24" y1="24" x2={24 + 12 * Math.cos(a)} y2={24 + 12 * Math.sin(a)}
            stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />;
        })}
        <defs>
          <radialGradient id="sealGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#E89070" />
            <stop offset="100%" stopColor="#B85A45" />
          </radialGradient>
        </defs>
      </svg>
      <span className="relative z-10 text-white text-xs font-serif font-bold" style={{ fontSize: 11 }}>S</span>
    </div>
  );
}

// ─── Decorative stamp ─────────────────────────────────────────────────────────
function PostmarkStamp() {
  return (
    <div className="relative flex flex-col items-center justify-center border-2 rounded-sm px-2 py-1"
      style={{ borderColor: "rgba(212,133,106,0.35)", width: 64 }}>
      <div className="w-full h-px mb-1" style={{ background: "rgba(212,133,106,0.3)" }} />
      <span className="text-[7px] font-mono tracking-widest text-[#D4856A]/60 uppercase">19 yrs</span>
      <div className="w-full h-px mt-1" style={{ background: "rgba(212,133,106,0.3)" }} />
    </div>
  );
}

// ─── Photo frame corner ornament ──────────────────────────────────────────────
function FrameCorner({ className }: { className: string }) {
  return (
    <svg className={`absolute w-7 h-7 pointer-events-none ${className}`} viewBox="0 0 20 20">
      <path d="M0 8 L0 0 L8 0" stroke="#D4856A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="0" r="2" fill="#D4856A" opacity="0.5" />
    </svg>
  );
}

// ─── Main Stage6 ─────────────────────────────────────────────────────────────
export default function Stage6() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    setShowScrollIndicator(scrollHeight - scrollTop - clientHeight > 15);
  };

  useEffect(() => {
    if (isFlipped) {
      setHasBeenFlipped(true);
      setTimeout(() => handleScroll(), 300);
    }
  }, [isFlipped]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full relative select-none overflow-hidden bg-[#FDFBF7]">

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: `linear-gradient(#4A3B32 1px, transparent 1px), linear-gradient(to right, #4A3B32 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(circle, #D4856A 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      {/* Aurora blobs */}
      <motion.div animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.15, 0.92, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-20 w-96 h-96 rounded-full blur-[100px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,183,178,0.3) 0%, transparent 70%)" }} />
      <motion.div animate={{ x: [0, -40, 18, 0], y: [0, 30, -30, 0], scale: [1, 0.88, 1.12, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full blur-[110px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(212,133,106,0.2) 0%, transparent 70%)" }} />

      {/* Card glow */}
      <motion.div
        animate={{ opacity: isFlipped ? [0.3, 0.5, 0.3] : [0.15, 0.25, 0.15], scale: isFlipped ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none z-0"
        style={{ width: 360, height: 480, borderRadius: 24,
          background: "radial-gradient(ellipse, rgba(255,183,178,0.5) 0%, transparent 70%)",
          filter: "blur(30px)" }}
      />

      {/* Sparkles */}
      {[
        { left: "6%", top: "18%" }, { left: "91%", top: "15%" },
        { left: "10%", top: "74%" }, { left: "86%", top: "70%" },
        { left: "43%", top: "4%" }, { left: "55%", top: "92%" },
        { left: "24%", top: "46%" }, { left: "74%", top: "42%" },
        { left: "3%", top: "55%" }, { left: "95%", top: "58%" },
        { left: "33%", top: "88%" }, { left: "68%", top: "10%" },
      ].map((p, i) => <Sparkle key={i} delay={i * 0.38} {...p} />)}

      {/* Dust motes */}
      {[
        { left: "15%", top: "28%" }, { left: "80%", top: "22%" },
        { left: "20%", top: "78%" }, { left: "75%", top: "72%" },
        { left: "50%", top: "9%" }, { left: "5%", top: "60%" },
        { left: "92%", top: "45%" },
      ].map((p, i) => <DustMote key={i} delay={i * 0.65} {...p} />)}

      {/* Floating hearts — visible when flipped */}
      {hasBeenFlipped && ["20%", "35%", "50%", "65%", "78%"].map((x, i) => (
        <FloatingHeart key={i} delay={i * 0.8} x={x} />
      ))}

      {/* Corner flourishes */}
      <CornerFlourish className="top-0 left-0" />
      <CornerFlourish className="bottom-0 right-0 rotate-180" />
      <CornerFlourish className="top-0 right-0 scale-x-[-1]" />
      <CornerFlourish className="bottom-0 left-0 scale-y-[-1]" />

      {/* ── HEADER ── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
        className="absolute top-14 text-center z-20 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <motion.div animate={{ scaleX: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
            className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4856A]/60" />
          <p className="text-[#8C6B5D] text-[10px] tracking-[0.5em] uppercase font-bold opacity-80">Chapter Akhir</p>
          <motion.div animate={{ scaleX: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4856A]/60" />
        </div>

        <AnimatePresence mode="wait">
          {isFlipped ? (
            <motion.p key="flipped" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[11px] font-serif text-[#8C6B5D] italic tracking-wide">
              ✉️ Sebuah pesan untukmu, Shendyyy
            </motion.p>
          ) : (
            <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[11px] font-serif text-[#8C6B5D] italic tracking-wide">
              Ketuk kartu untuk membuka pesan ✉️
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── FLIP CARD ── */}
      <div
        className="relative mt-6 cursor-pointer"
        style={{ width: 300, height: 430, perspective: "1200px" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Subtle tilt shadow */}
        <motion.div
          animate={isFlipped
            ? { rotate: -2, scale: 0.97, opacity: 0.4 }
            : { rotate: 1.5, scale: 0.95, opacity: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: "#D4856A", filter: "blur(18px)", zIndex: -1, transform: "translateY(12px)" }}
        />

        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 130, damping: 22 }}
          style={{ transformStyle: "preserve-3d" }}
        >

          {/* ══ FRONT: Polaroid photo ══ */}
          <div className="absolute inset-0 rounded-xl overflow-hidden flex flex-col"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              background: "#FFFFFF",
              boxShadow: "0 20px 60px rgba(74,59,50,0.18), 0 4px 16px rgba(74,59,50,0.1), inset 0 1px 0 rgba(255,255,255,0.9)" }}>

            {/* Top postal bar */}
            <div className="flex items-center justify-between px-4 py-2.5 shrink-0"
              style={{ borderBottom: "1px solid rgba(212,133,106,0.12)" }}>
              <div className="flex items-center gap-1.5">
                {/* Tiny envelope icon */}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <rect x="0.5" y="0.5" width="13" height="9" rx="1.5" stroke="#D4856A" strokeWidth="0.8" fill="none" />
                  <path d="M0.5 1.5L7 6L13.5 1.5" stroke="#D4856A" strokeWidth="0.8" fill="none" />
                </svg>
                <span className="text-[9px] font-mono text-[#D4856A]/60 tracking-widest uppercase">for shendyy</span>
              </div>
              <PostmarkStamp />
            </div>

            {/* Photo area */}
            <div className="relative mx-4 mt-3 mb-2 flex-1 rounded-md overflow-hidden"
              style={{ background: "#f0ebe6", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08)" }}>
              <Image src="/photo.jpg" alt="Shendy" fill className="object-cover" sizes="300px" priority />
              {/* Photo vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(74,59,50,0.15) 100%)" }} />
              {/* Frame corners */}
              <FrameCorner className="top-2 left-2" />
              <FrameCorner className="top-2 right-2 scale-x-[-1]" />
              <FrameCorner className="bottom-2 left-2 scale-y-[-1]" />
              <FrameCorner className="bottom-2 right-2 scale-[-1]" />
            </div>

            {/* Caption bar */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0">
              <WaxSeal />
              <p className="font-serif text-[11px] text-[#6B5A4E] italic tracking-wide text-center flex-1">
                Ketuk untuk membaca ✉️
              </p>
              {/* Stamp decoration */}
              <div className="w-9 h-9 rounded-sm flex items-center justify-center"
                style={{ border: "1.5px dashed rgba(212,133,106,0.35)" }}>
                <span style={{ fontSize: 16 }}>🌸</span>
              </div>
            </div>
          </div>

          {/* ══ BACK: Letter ══ */}
          <div className="absolute inset-0 rounded-xl overflow-hidden flex flex-col"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#FFFDF9",
              boxShadow: "0 20px 60px rgba(74,59,50,0.18), 0 4px 16px rgba(74,59,50,0.1)" }}>

            {/* Letterhead */}
            <div className="flex flex-col items-center pt-4 pb-2 px-5 shrink-0"
              style={{ borderBottom: "1px solid rgba(212,133,106,0.15)",
                background: "linear-gradient(to bottom, rgba(255,209,193,0.2), transparent)" }}>
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(212,133,106,0.4))" }} />
                <WaxSeal />
                <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(212,133,106,0.4))" }} />
              </div>
              <p className="text-[9px] font-mono tracking-[0.3em] text-[#D4856A]/50 uppercase mt-1.5">
                Happy Birthday
              </p>
            </div>

            {/* Scrollable message */}
            <div className="relative flex-1 overflow-hidden">
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="w-full h-full overflow-y-auto px-5 py-4 pb-10"
                style={{ scrollbarWidth: "none" }}
              >
                {/* Ruled lines decoration */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(212,133,106,0.06) 27px, rgba(212,133,106,0.06) 28px)",
                  backgroundPosition: "0 40px"
                }} />

                <p className="mb-4 font-semibold text-center text-sm text-[#4A3B32] relative z-10">
                  Selamat ulang tahun, Shen! 🎉
                </p>
                {[
                  "Cieee shendok alias shendy hari ini udh 19 tahun ya hihihi... selamat yahhh aku mau ngucapin sesuatu dibawah ini baca sampai habis yahhh",
                  "Hari ini bertambah satu tahun lagi perjalananmu, dan aku cuma ingin mengucapkan semoga hal-hal baik semakin banyak menghampirimu.",
                  "Terima kasih karena sudah menjadi dirimu sendiri. Terima kasih untuk semua kerja keras, kebaikan, tawa, cerita, dan semangat yang mungkin sering tidak disadari orang lain. Kamu mungkin tidak selalu melihatnya, tapi banyak hal baik yang kamu bawa ke orang-orang di sekitarmu.",
                  "Semoga di usia yang baru ini kamu diberikan kesehatan, kebahagiaan, ketenangan, dan kekuatan untuk menghadapi semua hal yang sedang maupun akan kamu lalui. Semoga semua usaha yang sedang kamu perjuangkan menemukan jalannya, dan semoga impian-impian yang kamu simpan perlahan menjadi kenyataan.",
                  "Kalau suatu hari dunia terasa berat, jangan lupa bahwa kamu tidak harus sempurna untuk menjadi seseorang yang berharga. Kamu sudah cukup, dan kamu sudah melakukan yang terbaik sejauh ini.",
                  "Nikmati harimu, makan yang enak, istirahat yang cukup, dan jangan lupa bahagia.",
                ].map((text, i) => (
                  <p key={i} className="mb-4 text-[12px] leading-relaxed text-[#4A3B32] font-serif text-justify relative z-10">
                    {text}
                  </p>
                ))}

                <p className="mb-3 font-semibold text-center text-[13px] text-[#4A3B32] font-serif relative z-10">
                  Happy Birthday, Shendyy! 🎂✨
                </p>
                <p className="text-center italic text-[11px] text-[#8C6B5D] font-serif relative z-10">
                  Semoga tahun ini menjadi salah satu tahun terbaik dalam hidupmu.
                </p>

                {/* Signature area */}
                <div className="mt-6 flex flex-col items-center gap-2 relative z-10">
                  <div className="flex gap-1.5">
                    {["💖", "🌸", "✨"].map((e, i) => (
                      <motion.span key={i} animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        className="text-base">{e}</motion.span>
                    ))}
                  </div>
                  <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #D4856A, transparent)" }} />
                </div>
              </div>

              {/* Scroll fade + indicator */}
              <AnimatePresence>
                {showScrollIndicator && isFlipped && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute bottom-0 inset-x-0 flex flex-col items-center justify-end pointer-events-none pb-2 pt-10"
                    style={{ background: "linear-gradient(to top, #FFFDF9 40%, transparent)" }}
                  >
                    <motion.span
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                      className="text-[10px] font-mono tracking-widest text-[#D4856A]/70 flex items-center gap-1"
                    >
                      gulir ke bawah ↓
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 py-2.5 shrink-0"
              style={{ borderTop: "1px solid rgba(212,133,106,0.12)" }}>
              <div className="h-px w-8" style={{ background: "linear-gradient(to right, transparent, #D4856A)" }} />
              <p className="text-[9px] tracking-[0.3em] font-mono text-[#8C6B5D]/50 uppercase">Selesai</p>
              <div className="h-px w-8" style={{ background: "linear-gradient(to left, transparent, #D4856A)" }} />
            </div>
          </div>

        </motion.div>
      </div>

      {/* ── FLIP HINT ── */}
      <AnimatePresence>
        {!isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2 z-20"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl">👆</motion.div>
            <p className="text-[10px] font-mono tracking-widest text-[#8C6B5D]/50 uppercase">ketuk kartunya</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}