import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Wifi,
  WifiOff,
  BookOpen,
  GraduationCap,
  Cloud,
  Globe2,
} from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Umbono | Offline-First AI Education Engine - ZAInnovate Technologies",
  description:
    "Sovereign AI learning platform built for low-bandwidth South African environments. DBE CAPS aligned, multilingual STEM tutoring. Engineered by ZAInnovate Technologies (Pty) Ltd.",
  manifest: "/manifest.json",
  themeColor: "#0E1B2E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#08101C] font-sans text-slate-100 antialiased selection:bg-gold-500 selection:text-navy-950">
        {/* Low-Bandwidth / Zero-Data Sovereign Banner */}
        <div className="border-b border-navy-800 bg-[#060D17] px-4 py-1.5 text-[11px] text-slate-400">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-slate-200">
                Local Edge Cache: Active
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-medium">
                Zero Cellular Data Mode Enabled
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <span>DBE CAPS Aligned</span>
              <span>•</span>
              <span>isiXhosa | isiZulu | Afrikaans | English</span>
              <span>•</span>
              <span className="text-gold-400 font-semibold">
                ZAInnovate Technologies
              </span>
            </div>
          </div>
        </div>

        {/* Primary Header */}
        <header className="sticky top-0 z-50 border-b border-navy-700/80 bg-[#0E1B2E]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-amber-500 text-navy-950 font-black text-xl shadow-md">
                U
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-white">
                    Umbono
                  </span>
                  <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                    Offline First
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Sovereign AI Education Engine • ZAInnovate Technologies
                </p>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
              <a href="#" className="text-gold-400 font-semibold">
                My Learning Hub
              </a>
              <a href="#subjects" className="hover:text-gold-400 transition-colors">
                CAPS Subjects
              </a>
              <a href="#offline-manager" className="hover:text-gold-400 transition-colors">
                Offline Packs
              </a>
              <a href="#tutor" className="hover:text-gold-400 transition-colors">
                Multilingual AI Tutor
              </a>
              <a href="#progress" className="hover:text-gold-400 transition-colors">
                Matric Readiness
              </a>
            </nav>

            {/* Student Profile & Sync State */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-lg border border-navy-700 bg-navy-950/60 px-3 py-1.5 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">Sync Queue: Empty</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-navy-700 bg-navy-800/80 p-1.5 pl-2.5">
                <div className="text-right text-xs hidden sm:block">
                  <div className="font-semibold text-white">Sipho Ndlovu</div>
                  <div className="text-[10px] text-gold-400">Grade 11 • Science Stream</div>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gold-500 text-xs font-bold text-navy-950">
                  SN
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t border-navy-800 bg-[#060D17] py-8 text-xs text-slate-500">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold-500"></div>
              <span>
                Umbono Education Engine • Engineered by{" "}
                <span className="text-slate-300 font-semibold">
                  ZAInnovate Technologies (Pty) Ltd
                </span>
                , East London
              </span>
            </div>
            <div>
              <span>Sovereign Offline AI • Zero Bandwidth Equity for South African Learners</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}