"use client";
import { motion } from "framer-motion";

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / (total - 1)) * 100);
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-[#E8E0D5]/50">
      <motion.div
        className="h-full bg-[#D4A373]"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
}