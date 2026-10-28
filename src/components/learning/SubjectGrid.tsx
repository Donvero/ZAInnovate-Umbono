"use client";

import React from "react";
import {
  Calculator,
  Atom,
  Dna,
  Code2,
  FileSpreadsheet,
  BookOpen,
  Wifi,
  HardDrive,
} from "lucide-react";

export interface SubjectItem {
  id: string;
  name: string;
  code: string;
  grade: string;
  lessonCount: number;
  totalCachedMb: number;
  isFullyCached: boolean;
  color: string;
}

const subjects: SubjectItem[] = [
  {
    id: "math",
    name: "Mathematics",
    code: "MATH-CAPS",
    grade: "Grade 11 & 12",
    lessonCount: 42,
    totalCachedMb: 38.4,
    isFullyCached: true,
    color: "from-amber-500/20 to-gold-500/10 border-gold-500/40",
  },
  {
    id: "physics",
    name: "Physical Sciences",
    code: "PHYS-CAPS",
    grade: "Grade 11 & 12",
    lessonCount: 36,
    totalCachedMb: 42.1,
    isFullyCached: true,
    color: "from-blue-500/20 to-cyan-500/10 border-blue-500/40",
  },
  {
    id: "coding",
    name: "Coding & Robotics",
    code: "CODE-CAPS",
    grade: "Grade 8 - 12",
    lessonCount: 28,
    totalCachedMb: 24.8,
    isFullyCached: false,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40",
  },
  {
    id: "bio",
    name: "Life Sciences",
    code: "LIFE-CAPS",
    grade: "Grade 11 & 12",
    lessonCount: 31,
    totalCachedMb: 35.2,
    isFullyCached: true,
    color: "from-rose-500/20 to-amber-500/10 border-rose-500/40",
  },
  {
    id: "accounting",
    name: "Accounting",
    code: "ACCT-CAPS",
    grade: "Grade 10 - 12",
    lessonCount: 24,
    totalCachedMb: 19.5,
    isFullyCached: false,
    color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40",
  },
];

interface SubjectGridProps {
  selectedSubjectId: string;
  onSelect: (id: string) => void;
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({
  selectedSubjectId,
  onSelect,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">DBE CAPS Subjects</h2>
          <p className="text-xs text-slate-400">
            Select curriculum module to browse lessons and manage zero-data offline packs.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <HardDrive className="h-3.5 w-3.5" />
          <span>160.0 MB Cached Locally</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {subjects.map((sub) => {
          const isSelected = selectedSubjectId === sub.id;

          return (
            <div
              key={sub.id}
              onClick={() => onSelect(sub.id)}
              className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 bg-gradient-to-br ${
                isSelected
                  ? "border-gold-500 bg-navy-800 shadow-lg shadow-gold-500/10 ring-1 ring-gold-500"
                  : "border-navy-700/80 bg-navy-900/60 hover:border-gold-500/40 hover:bg-navy-800/60"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-mono text-gold-400 font-semibold">
                  {sub.code}
                </span>
                {sub.isFullyCached ? (
                  <span className="flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/30">
                    Offline Ready
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded bg-navy-950 px-1.5 py-0.5 text-[10px] text-slate-400 border border-navy-700">
                    Partial Cache
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-sm font-bold text-white">{sub.name}</h3>
              <p className="text-[11px] text-slate-400">{sub.grade}</p>

              <div className="mt-3 flex items-center justify-between border-t border-navy-700/60 pt-2 text-[11px] text-slate-400">
                <span>{sub.lessonCount} Lessons</span>
                <span className="font-mono text-slate-300">{sub.totalCachedMb} MB</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectGrid;
