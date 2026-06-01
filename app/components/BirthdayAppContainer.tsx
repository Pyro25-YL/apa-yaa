"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import ProgressBar from "./ProgressBar";
import Stage0 from "./Stage0"; // Pembuka
import Stage1 from "./Stage1"; // Pemutar Lagu (Vinyl)
import Stage2 from "./Stage2"; // Tiup Lilin (🎂🕯️) - sesuaikan path jika berbeda
import Stage3 from "./Stage3"; // Buka Kado (🎁 dengan efek ramai)
import Stage4Memory from "./Stage4Memory"; // Memory Game (Kartu Bergambar)
import Stage5Quiz from "./Stage5Quiz"; // Kuis Interaktif (Pilihan Ganda)
import Stage6 from "./Stage6"; // Polaroid Kata-kata (Hadiah Utama)
import StageDots from "./StageDots";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

const TOTAL_STAGES = 7;

export default function BirthdayAppContainer() {
  const [stage, setStage] = useState(0);
  const next = () => setStage((s) => Math.min(s + 1, TOTAL_STAGES - 1));
  
  const STAGE_COMPONENTS = [Stage0, Stage1, Stage2, Stage3, Stage4Memory, Stage5Quiz, Stage6];
  const CurrentStage = STAGE_COMPONENTS[stage];

  return (
    <main
      className="relative min-h-screen overflow-hidden text-[#4A3B32] transition-colors duration-1000"
      style={{
        background: "linear-gradient(-45deg, #FFD1C1, #FFB7B2, #E2D1C3, #FDFBF7)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
      }}
    >
      <ParticleCanvas />

      {/* Indikator titik di atas */}
      <StageDots current={stage} total={TOTAL_STAGES} />

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center"
        >
          <CurrentStage onNext={next} />
        </motion.div>
      </AnimatePresence>

      <ProgressBar current={stage} total={TOTAL_STAGES} />
    </main>
  );
}