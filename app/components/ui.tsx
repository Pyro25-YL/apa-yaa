"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`relative bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_20px_60px_rgba(140,90,79,0.13)] ${className}`}
    >
      {children}
    </div>
  );
}

interface BtnProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Btn({ children, onClick, disabled, className = "" }: BtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium text-white transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        background: "linear-gradient(135deg, var(--rose), var(--deep-rose))",
        fontFamily: "var(--font-lora)",
      }}
    >
      {children}
    </button>
  );
}
