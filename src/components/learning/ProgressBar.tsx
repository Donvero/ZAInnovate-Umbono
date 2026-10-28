import React from "react";

interface ProgressBarProps {
  progressPercent: number; // 0 to 100
  label?: string;
  showPercentText?: boolean;
  color?: "gold" | "emerald" | "blue";
  size?: "sm" | "md" | "lg";
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercent,
  label,
  showPercentText = true,
  color = "gold",
  size = "md",
}) => {
  const clamped = Math.min(100, Math.max(0, progressPercent));

  const heightClass = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  }[size];

  const colorGradient = {
    gold: "from-amber-500 to-gold-400 shadow-gold-500/20",
    emerald: "from-emerald-600 to-emerald-400 shadow-emerald-500/20",
    blue: "from-blue-600 to-cyan-400 shadow-blue-500/20",
  }[color];

  return (
    <div className="w-full">
      {(label || showPercentText) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label && <span className="font-medium text-slate-300">{label}</span>}
          {showPercentText && (
            <span className="font-mono font-semibold text-gold-400">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-navy-950 border border-navy-700/80 ${heightClass}`}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out shadow-sm ${colorGradient}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
