import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday 🎂",
  description: "A warm birthday greeting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1. Tambahkan suppressHydrationWarning di sini
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* 2. Tambahkan suppressHydrationWarning di sini juga */}
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}