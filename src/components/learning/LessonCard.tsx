"use client";

import React, { useState } from "react";
import {
  Download,
  CheckCircle2,
  PlayCircle,
  HardDriveDownload,
  Globe2,
  Sparkles,
  WifiOff,
  Check,
} from "lucide-react";
import ProgressBar from "./ProgressBar";

export interface LessonItem {
  id: string;
  order: number;
  title: string;
  subject: string;
  durationMinutes: number;
  progressPercent: number;
  isCompleted: boolean;
  isDownloadedOffline: boolean;
  downloadSizeBytes: number;
  primaryLanguage: string;
  availableLanguages: string[];
}

interface LessonCardProps {
  lesson: LessonItem;
  onLaunch: (id: string) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onLaunch }) => {
  const [downloaded, setDownloaded] = useState<boolean>(
    lesson.isDownloadedOffline
  );
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const toggleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloaded) {
      setDownloaded(false);
    } else {
      setIsDownloading(true);
      setTimeout(() => {
        setIsDownloading(false);
        setDownloaded(true);
      }, 700);
    }
  };

  const formatSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      onClick={() => onLaunch(lesson.id)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-navy-700/60 bg-gradient-to-b from-navy-800/80 to-navy-900/90 p-5 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-gold-500/50 hover:shadow-gold-500/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-navy-950 font-mono text-xs font-bold text-gold-400 border border-navy-700">
            {lesson.order}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {lesson.subject}
          </span>
        </div>

        {/* Offline Badge / Toggle Button */}
        <button
          onClick={toggleDownload}
          disabled={isDownloading}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
            downloaded
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : "bg-navy-950/80 text-slate-300 border border-navy-700 hover:border-gold-500 hover:text-gold-400"
          }`}
          title={downloaded ? "Cached locally for offline study" : "Download for offline use"}
        >
          {downloaded ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span>Offline Ready</span>
            </>
          ) : isDownloading ? (
            <>
              <HardDriveDownload className="h-3 w-3 animate-bounce text-gold-400" />
              <span>Caching...</span>
            </>
          ) : (
            <>
              <Download className="h-3 w-3" />
              <span>Save ({formatSize(lesson.downloadSizeBytes)})</span>
            </>
          )}
        </button>
      </div>

      {/* Lesson Title */}
      <h3 className="mt-3 text-base font-bold text-white group-hover:text-gold-300 transition-colors">
        {lesson.title}
      </h3>

      {/* Languages & Duration */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Globe2 className="h-3.5 w-3.5 text-gold-500" />
          <span className="font-medium text-slate-300">
            {lesson.primaryLanguage}
          </span>
        </div>
        <span>•</span>
        <span>{lesson.durationMinutes} mins</span>
        <span>•</span>
        <div className="flex items-center gap-1">
          {lesson.availableLanguages.map((lang) => (
            <span
              key={lang}
              className="rounded bg-navy-950 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4 pt-3 border-t border-navy-700/60">
        <ProgressBar
          progressPercent={lesson.progressPercent}
          label="Topic Mastery"
          size="sm"
          color={lesson.isCompleted ? "emerald" : "gold"}
        />
      </div>

      {/* Action footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-gold-400" />
          Offline AI Tutoring Ready
        </span>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 group-hover:underline">
          {lesson.isCompleted ? "Review" : "Start Lesson"}
          <PlayCircle className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
};

export default LessonCard;
