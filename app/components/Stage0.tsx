"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stage0Props { onNext: () => void; }

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
function CornerFlourish({ type }: { type: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const getStyle = () => {
    switch (type) {
      case "top-left": return { top: 0, left: 0 };
      case "top-right": return { top: 0, right: 0, transform: "scaleX(-1)" };
      case "bottom-left": return { bottom: 0, left: 0, transform: "scaleY(-1)" };
      case "bottom-right": return { bottom: 0, right: 0, transform: "rotate(180deg)" };
    }
  };

  return (
    <svg 
      className="absolute w-32 h-32 opacity-[0.1] pointer-events-none z-0" 
      viewBox="0 0 100 100"
      style={getStyle()}
    >
      <path d="M0 0 Q50 0 50 50 Q50 100 100 100" stroke="#D4856A" strokeWidth="0.8" fill="none" />
      <path d="M15 0 Q60 10 60 60 Q60 100 100 85" stroke="#D4856A" strokeWidth="0.5" fill="none" />
      <circle cx="0" cy="0" r="3.5" fill="#D4856A" opacity="0.8" />
      <circle cx="100" cy="100" r="3.5" fill="#D4856A" opacity="0.8" />
      <circle cx="50" cy="50" r="2" fill="#FFB7B2" opacity="0.6" />
    </svg>
  );
}

// ─── Orbital ring ─────────────────────────────────────────────────────────────
function OrbitalRing({ size, speed, reverse, opacity }: { size: number; speed: number; reverse?: boolean; opacity: number }) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, border: `1px dashed rgba(212,133,106,${opacity})` }}
    >
      <div className="absolute w-2 h-2 rounded-full"
        style={{ top: 0, left: "50%", transform: "translateX(-50%)",
          background: `radial-gradient(circle, #FFB7B2, #D4856A)`,
          boxShadow: "0 0 6px #D4856A", opacity: opacity * 3 }} />
    </motion.div>
  );
}

// ─── Floating petal ───────────────────────────────────────────────────────────
function FloatingPetal({ delay, startX, emoji }: { delay: number; startX: string; emoji: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 0, rotate: 0 }}
      animate={{ opacity: [0, 0.7, 0.5, 0], y: "110vh", x: [0, 30, -20, 10], rotate: [0, 45, -30, 60] }}
      transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, delay, ease: "linear" }}
      className="absolute top-0 pointer-events-none z-5 text-lg"
      style={{ left: startX }}
    >
      {emoji}
    </motion.div>
  );
}

// ─── Envelope SVG (FIXED LAYERING) ───────────────────────────────────────────
function EnvelopeSVG({ isOpening }: { isOpening: boolean }) {
  const flapVariants = {
    closed: { d: "M5 28 L70 75 L135 28" },
    opened: { d: "M5 28 L70 -15 L135 28" } 
  };

  return (
    <div className="relative" style={{ width: 140, height: 110 }}>
      <svg viewBox="0 0 140 110" className="absolute inset-0 w-full h-full drop-shadow-xl">
        <ellipse cx="70" cy="108" rx="55" ry="6" fill="rgba(74,59,50,0.15)" />
        
        {/* 1. KERTAS SURAT (Paling Belakang) */}
        <foreignObject x="25" y="10" width="90" height="70">
          {/* Pembungkus XHTML standard agar Vercel build tidak bermasalah */}
          <div style={{ width: "100%", height: "100%" }}>
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={isOpening ? { y: -25, opacity: 1, scale: 1 } : { y: 30, opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
              className="rounded-sm px-2 py-1.5 flex flex-col gap-1"
              style={{ 
                background: "#FFFDF9", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid rgba(212,133,106,0.2)" 
              }}
            >
              {[60, 80, 70, 55].map((w, i) => (
                <div key={i} className="rounded-full" style={{ height: 2, width: `${w}%`, background: "rgba(212,133,106,0.3)" }} />
              ))}
            </motion.div>
          </div>
        </foreignObject>

        {/* 2. BADAN BELAKANG AMPLOP */}
        <rect x="5" y="28" width="130" height="76" rx="6" fill="url(#envBody0)" />
        
        {/* 3. PENUTUP ATAS AMPLOP (FLAP) */}
        <motion.path
          variants={flapVariants}
          initial="closed"
          animate={isOpening ? "opened" : "closed"}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          fill="url(#envFlap0)"
        />
        
        {/* 4. LIPATAN SAMPING & BAWAH AMPLOP */}
        <path d="M5 104 L70 65 L135 104" fill="url(#envFold0)" opacity="0.6" />
        <line x1="5" y1="28" x2="70" y2="65" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        <line x1="135" y1="28" x2="70" y2="65" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

        {/* 5. KUNCI TENGAH / WAX SEAL "S" (Paling Depan / Top Layer) */}
        <motion.g
          animate={isOpening ? { opacity: 0, y: 15, scale: 0.8 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeIn" }}
        >
          <circle cx="70" cy="65" r="12" fill="url(#sealEnv0)" />
          <circle cx="70" cy="65" r="9" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
          <text x="70" y="69" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.7)" fontFamily="serif" fontWeight="bold">S</text>
        </motion.g>

        <defs>
          <linearGradient id="envBody0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD1C1" />
            <stop offset="100%" stopColor="#F5B4AA" />
          </linearGradient>
          <linearGradient id="envFlap0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A49A" />
            <stop offset="100%" stopColor="#E89090" />
          </linearGradient>
          <linearGradient id="envFold0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8A090" />
            <stop offset="100%" stopColor="#D48880" />
          </linearGradient>
          <radialGradient id="sealEnv0" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#E89070" />
            <stop offset="100%" stopColor="#B85A45" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// ─── Main Stage0 ─────────────────────────────────────────────────────────────
export default function Stage0({ onNext }: Stage0Props) {
  const [opening, setOpening] = useState(false);
  // MODIFIKASI: Diubah langsung jadi false agar bypass countdown pengunci
  const [isLocked, setIsLocked] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [countdownText, setCountdownText] = useState("");

  useEffect(() => {
    setIsHydrated(true);
    const targetTime = new Date("2026-06-01T17:00:00Z").getTime();

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setIsLocked(false);
        setCountdownText("");
      } else {
        // MODIFIKASI: Dikomen agar saat ditransfer ke Vercel statusnya tidak terkunci kembali
        // setIsLocked(true);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const pad = (n: number) => String(n).padStart(2, "0");
        
        if (days > 0) {
          setCountdownText(`${days} Hari ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
        } else {
          setCountdownText(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
        }
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    if (isLocked || opening) return;
    setOpening(true);
    setTimeout(onNext, 1600);
  };

  if (!isHydrated) {
    return <div className="min-h-screen bg-[#FDFBF7]" />;
  }

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full relative overflow-hidden select-none bg-[#FDFBF7]">
        <CornerFlourish type="top-left" />
        <CornerFlourish type="bottom-right" />
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 max-w-sm">
          <span className="text-3xl mb-4 block animate-bounce">🔒</span>
          <h2 className="text-xl font-serif text-[#4A3B32] tracking-wide mb-2">Belum Waktunya, Shendy...</h2>
          <p className="text-[#8C6B5D]/80 text-[12px] font-serif italic mb-6">
            Sabar yaa, halaman ini otomatis bisa dibuka pada <br /> 
            <span className="font-sans not-italic font-bold text-[#D4856A]">02 Juni 2026 pukul 00:00 WIB</span>
          </p>
          <div className="bg-[#FFFDF9]/60 backdrop-blur-md border border-white/80 py-3 px-6 rounded-full inline-block shadow-sm">
            <span className="font-mono text-sm tracking-widest font-bold text-[#4A3B32]">{countdownText}</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-6 px-4 w-full relative overflow-hidden select-none bg-[#FDFBF7]">

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: `linear-gradient(#4A3B32 1px, transparent 1px), linear-gradient(to right, #4A3B32 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(circle, #D4856A 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      {/* Aurora Blobs */}
      <motion.div animate={{ x: [0, 35, -20, 0], y: [0, -45, 25, 0], scale: [1, 1.18, 0.92, 1] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-24 w-[420px] h-[420px] rounded-full blur-[110px] pointer-events-none z-0" style={{ background: "radial-gradient(circle, rgba(255,183,178,0.38) 0%, transparent 70%)" }} />
      <motion.div animate={{ x: [0, -45, 20, 0], y: [0, 35, -30, 0], scale: [1, 0.86, 1.14, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -right-24 w-[440px] h-[440px] rounded-full blur-[120px] pointer-events-none z-0" style={{ background: "radial-gradient(circle, rgba(212,133,106,0.25) 0%, transparent 70%)" }} />

      {/* Decoratings */}
      {[
        { startX: "8%", emoji: "🌸", delay: 0 }, { startX: "22%", emoji: "✨", delay: 1.5 },
        { startX: "40%", emoji: "🌸", delay: 3 }, { startX: "58%", emoji: "🌼", delay: 0.8 },
        { startX: "73%", emoji: "✨", delay: 2.2 }, { startX: "88%", emoji: "🌸", delay: 4 },
      ].map((p, i) => <FloatingPetal key={i} {...p} />)}

      {[
        { left: "6%", top: "18%" }, { left: "91%", top: "15%" },
        { left: "10%", top: "74%" }, { left: "86%", top: "70%" },
      ].map((p, i) => <Sparkle key={i} delay={i * 0.38} {...p} />)}

      <CornerFlourish type="top-left" /> <CornerFlourish type="bottom-right" />
      <CornerFlourish type="top-right" /> <CornerFlourish type="bottom-left" />

      {/* ── HEADER BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={opening ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-14 flex flex-col items-center gap-2 z-10"
      >
        <div className="flex items-center gap-3">
          <motion.div animate={{ scaleX: [0.4, 1, 0.4] }} transition={{ duration: 3.5, repeat: Infinity }} className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4856A]/60" />
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#8C6B5D] font-bold">Apresiasi Kecil</p>
          <motion.div animate={{ scaleX: [0.4, 1, 0.4] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4856A]/60" />
        </div>
        <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} className="text-[11px] font-serif italic text-[#8C6B5D]/70 tracking-wide">
          untuk Shendok alias Shendy xixixi 🎉
        </motion.p>
      </motion.div>

      {/* ── AMPLOD UTAMA & ORBITAL RINGS ── */}
      <div className="relative flex items-center justify-center mb-8 z-20" style={{ width: 240, height: 240 }}>
        {/* Orbital rings */}
        <OrbitalRing size={220} speed={40} opacity={0.12} />
        <OrbitalRing size={185} speed={28} reverse opacity={0.09} />

        {/* Pulsing glow */}
        <motion.div
          animate={opening ? { scale: 2, opacity: 0 } : { scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 160, height: 160, background: "radial-gradient(circle, rgba(255,183,178,0.6) 0%, transparent 70%)", filter: "blur(20px)" }}
        />

        {/* Gerakan Mengangkat & Membesar ke Arah Layar yang Mulus */}
        <motion.div
          onClick={handleOpen}
          whileHover={!opening ? { scale: 1.04 } : {}}
          whileTap={!opening ? { scale: 0.96 } : {}}
          animate={opening ? { 
            scale: [1, 1.05, 2.6], 
            y: [0, 5, -45], 
            opacity: [1, 1, 0], 
            filter: ["blur(0px)", "blur(0px)", "blur(8px)"] 
          } : { y: [0, -12, 0] }}
          transition={opening ? {
            duration: 1.5,
            times: [0, 0.25, 1],
            ease: "easeInOut"
          } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 cursor-pointer flex items-center justify-center"
        >
          <EnvelopeSVG isOpening={opening} />
        </motion.div>

        {/* Semburan Partikel Kejutan */}
        <AnimatePresence>
          {opening && (
            <>
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 10;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], x: Math.cos(angle) * 85, y: Math.sin(angle) * 85, scale: [0, 1.2, 0] }}
                    transition={{ duration: 0.9, delay: 0.15 + (i * 0.04) }}
                    className="absolute text-lg pointer-events-none"
                  >
                    {i % 2 === 0 ? "✨" : "🌸"}
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── GLASS CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={opening ? { opacity: 0, y: 30, scale: 0.94, filter: "blur(8px)" } : { opacity: 1, y: 0 }}
        transition={{ delay: opening ? 0 : 0.5, duration: 0.8 }}
        className="max-w-sm w-full text-center relative z-10 overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.65)",
          boxShadow: "0 30px 70px rgba(140,107,93,0.12), inset 0 0 24px rgba(255,255,255,0.45)",
          borderRadius: "28px",
          padding: "2.5rem 2rem",
        }}
      >
        <div className="flex items-center gap-2 justify-center mb-5">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(212,133,106,0.4))" }} />
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <svg width="16" height="16" viewBox="0 0 10 10">
              <path d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2Z" fill="#D4856A" opacity="0.7" />
            </svg>
          </motion.div>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(212,133,106,0.4))" }} />
        </div>

        <h2 className="mb-4 text-2xl font-serif text-[#4A3B32] leading-snug tracking-wide">
          Makasih yahh udah <br />
          <span className="italic font-light text-[#6B5A4E] block mt-1">menjadi wanita yang hebat &amp; kuat</span>
        </h2>

        <p className="text-[#6B5A4E] text-[12px] leading-relaxed mb-8 px-2 text-justify font-serif">
          Sebuah ruang kecil yang dirangkai sederhana, sengaja dibuat untuk mengapresiasi
          hadirmu dan ikut merayakan bertambahnya usiamu hari ini. baca sampai habis yahh,
          aku udah siapin sesuatu yang spesial buat kamu di bagian akhir nanti hihihi...
        </p>

        {/* CTA Button */}
        <motion.button
          onClick={handleOpen}
          className="group relative overflow-hidden text-white text-[11px] tracking-[0.25em] uppercase font-bold min-w-[190px] cursor-pointer"
          style={{
            padding: "14px 36px", borderRadius: 999,
            background: "linear-gradient(135deg, #D4856A 0%, #C06B55 100%)",
            boxShadow: "0 12px 40px rgba(212,133,106,0.4), inset 0 1px 1px rgba(255,255,255,0.2)"
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 18px 50px rgba(212,133,106,0.55)" }}
          whileTap={{ scale: 0.96 }}
        >
          <motion.span
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)", transform: "skewX(-20deg)" }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💌</motion.span>
            Buka Pesan
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>{"→"}</motion.span>
          </span>
        </motion.button>

        <div className="flex items-center gap-2 justify-center mt-6">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(212,133,106,0.25))" }} />
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#8C6B5D]/40 uppercase">for shendyy</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(212,133,106,0.25))" }} />
        </div>
      </motion.div>

    </div>
  );
}