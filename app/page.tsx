"use client";

import dynamic from "next/dynamic";

// Memaksa seluruh aplikasi ulang tahun dirender HANYA di browser.
// SSR dimatikan total untuk komponen ini, sehingga ekstensi browser tidak punya celah memicu mismatch.
const BirthdayAppContainer = dynamic(
  () => import("./components/BirthdayAppContainer"),
  { ssr: false }
);

export default function Page() {
  return <BirthdayAppContainer />;
}