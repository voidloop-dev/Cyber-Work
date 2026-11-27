"use client";

import { cn } from "@/lib/utils";

interface ScoreGaugesProps {
  securityScore: number | null;
  healthScore: number | null;
  loading?: boolean;
}

function ScoreRing({
  score,
  label,
  color,
  loading,
}: {
  score: number | null;
  label: string;
  color: "security" | "health";
  loading?: boolean;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const value = score ?? 0;
  const offset = circumference - (value / 100) * circumference;

  const strokeClass =
    color === "security" ? "stroke-security-500" : "stroke-health-500";
  const textClass =
    color === "security" ? "text-security-600" : "text-health-600";
  const trackClass =
    color === "security" ? "stroke-security-100" : "stroke-health-100";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="10"
            className={trackClass}
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className={cn(strokeClass, "transition-all duration-1000 ease-out")}
            strokeDasharray={circumference}
            strokeDashoffset={loading ? circumference : offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {loading ? (
            <span className="text-sm text-neutral-400 animate-pulse">···</span>
          ) : (
            <>
              <span className={cn("text-3xl font-bold tracking-tight", textClass)}>
                {score ?? "—"}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                / 100
              </span>
            </>
          )}
        </div>
      </div>
      <span className="text-sm font-medium text-neutral-600">{label}</span>
    </div>
  );
}

export function ScoreGauges({
  securityScore,
  healthScore,
  loading = false,
}: ScoreGaugesProps) {
  return (
    <div className="flex items-center justify-center gap-12 sm:gap-16">
      <ScoreRing
        score={securityScore}
        label="Security"
        color="security"
        loading={loading}
      />
      <div className="h-20 w-px bg-neutral-200 hidden sm:block" />
      <ScoreRing
        score={healthScore}
        label="Code Health"
        color="health"
        loading={loading}
      />
    </div>
  );
}
