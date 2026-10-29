"use client";

import React, { useState, useEffect } from "react";
import SubjectGrid from "@/components/learning/SubjectGrid";
import LessonCard, { LessonItem } from "@/components/learning/LessonCard";
import ProgressBar from "@/components/learning/ProgressBar";
import {
  Wifi,
  WifiOff,
  Cloud,
  Download,
  Sparkles,
  Zap,
  Languages,
  BookOpenCheck,
  Send,
  HelpCircle,
} from "lucide-react";
import { registerServiceWorker } from "@/lib/offline";

const sampleLessons: LessonItem[] = [
  {
    id: "les-math-01",
    order: 1,
    title: "Quadratic Equations & Parabolic Optimization",
    subject: "Mathematics",
    durationMinutes: 25,
    progressPercent: 100,
    isCompleted: true,
    isDownloadedOffline: true,
    downloadSizeBytes: 4200000,
    primaryLanguage: "English / isiXhosa",
    availableLanguages: ["ENG", "XHO", "ZUL"],
  },
  {
    id: "les-math-02",
    order: 2,
    title: "Trigonometric Reduction Formulae (180° ± θ)",
    subject: "Mathematics",
    durationMinutes: 30,
    progressPercent: 70,
    isCompleted: false,
    isDownloadedOffline: true,
    downloadSizeBytes: 5100000,
    primaryLanguage: "isiXhosa",
    availableLanguages: ["XHO", "ENG"],
  },
  {
    id: "les-phys-01",
    order: 3,
    title: "Newton's Laws of Motion & Friction Vectors",
    subject: "Physical Sciences",
    durationMinutes: 35,
    progressPercent: 45,
    isCompleted: false,
    isDownloadedOffline: true,
    downloadSizeBytes: 6800000,
    primaryLanguage: "English",
    availableLanguages: ["ENG", "AFR", "ZUL"],
  },
  {
    id: "les-code-01",
    order: 4,
    title: "Control Flow, Loops & Conditionals in Python",
    subject: "Coding & Robotics",
    durationMinutes: 40,
    progressPercent: 15,
    isCompleted: false,
    isDownloadedOffline: false,
    downloadSizeBytes: 8200000,
    primaryLanguage: "English / isiXhosa",
    availableLanguages: ["ENG", "XHO"],
  },
];

export default function UmbonoDashboard() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [selectedSubject, setSelectedSubject] = useState<string>("math");
  const [tutorQuery, setTutorQuery] = useState<string>("");
  const [tutorReply, setTutorReply] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);

  useEffect(() => {
    registerServiceWorker();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleAskTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuery.trim()) return;

    setIsAnswering(true);
    setTimeout(() => {
      setIsAnswering(false);
      setTutorReply(
        `Molweni! In South African CAPS Grade 11 Mathematics, when solving sin(180° - θ), remember that in the 2nd Quadrant, sine is positive! Ngoko ke, sin(180° - θ) = +sin(θ). Ubuncinci unokusebenzisa i-CAST diagram ukukhumbula ukuba yeyiphi i-ratio elungileyo kwi-quadrant nganye.`
      );
    }, 600);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Network Status & Hero Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${
                isOnline
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="h-3.5 w-3.5" />
                  Online • Cache Synced
                </>
              ) : (
                <>
                  <WifiOff className="h-3.5 w-3.5" />
                  Offline Mode Active (Zero Cellular Data)
                </>
              )}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Grade 11 STEM Curriculum
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
            Umbono AI Education Engine
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Sovereign offline-first tutoring platform. Download entire curriculum packs at school or community Wi-Fi spots and study at home completely free of data charges.
          </p>
        </div>

        {/* Offline Manager Stats Pill */}
        <div className="flex items-center gap-3 rounded-xl border border-navy-700 bg-gradient-to-r from-navy-800 to-navy-900 p-3 shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
            <Zap className="h-5 w-5" />
          </div>
          <div className="text-xs">
            <div className="font-semibold text-white">Cellular Data Saved</div>
            <div className="font-mono text-gold-400 font-bold">1.42 GB this month</div>
            <div className="text-[10px] text-slate-400">Zero-rated local cache</div>
          </div>
        </div>
      </div>

      {/* DBE CAPS Subject Selector */}
      <div id="subjects" className="mb-10">
        <SubjectGrid
          selectedSubjectId={selectedSubject}
          onSelect={(id) => setSelectedSubject(id)}
        />
      </div>

      {/* Today's Lessons & Offline Packs */}
      <div className="mb-10" id="offline-manager">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              Downloaded & Recommended Lessons
            </h2>
            <p className="text-xs text-slate-400">
              Cached locally in IndexedDB storage. Accessible with zero internet connection.
            </p>
          </div>
          <span className="text-xs font-semibold text-gold-400">
            4 Lessons Available
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
          {sampleLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onLaunch={(id) => console.log("Launching lesson", id)}
            />
          ))}
        </div>
      </div>

      {/* Multilingual Sovereign AI Tutor */}
      <div
        id="tutor"
        className="rounded-xl border border-gold-500/30 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-navy-950 font-bold">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Umbono Multilingual Sovereign Tutor
              </h3>
              <p className="text-xs text-slate-400">
                Ask in isiXhosa, Zulu, Afrikaans, or English. Works with on-device quantized model when offline.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex rounded-full bg-navy-950 px-2.5 py-1 text-xs font-mono text-gold-400 border border-navy-700">
            Edge SLM Engine
          </span>
        </div>

        {/* AI Tutor Chat Form */}
        <form onSubmit={handleAskTutor} className="mt-5">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="e.g. Ndicela undicacisele nge-Newton's Third Law okanye Trigonometry..."
              value={tutorQuery}
              onChange={(e) => setTutorQuery(e.target.value)}
              className="flex-1 rounded-lg border border-navy-700 bg-navy-950 px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-gold-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isAnswering}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gold-500 px-5 py-2.5 text-xs font-bold text-navy-950 hover:bg-gold-400 transition-colors shadow-md disabled:opacity-50"
            >
              {isAnswering ? "Ukucinga..." : "Buzani / Ask"}
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>

        {tutorReply && (
          <div className="mt-4 rounded-lg border border-navy-700 bg-navy-950/80 p-4 text-xs leading-relaxed text-slate-200">
            <div className="mb-1.5 flex items-center gap-1.5 font-bold text-gold-400">
              <BookOpenCheck className="h-4 w-4" />
              <span>Umbono AI Response:</span>
            </div>
            <p>{tutorReply}</p>
          </div>
        )}
      </div>
    </div>
  );
}