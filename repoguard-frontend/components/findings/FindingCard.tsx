"use client";

import { Finding } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { ChevronRight, FileCode2 } from "lucide-react";

interface FindingCardProps {
  finding: Finding;
  selected?: boolean;
  onClick?: () => void;
}

export function FindingCard({ finding, selected, onClick }: FindingCardProps) {
  const isSecurity = finding.category === "security";

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all group",
        "hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        selected
          ? "border-primary-300 bg-primary-50/50 shadow-soft"
          : "border-neutral-200 bg-white hover:border-neutral-300"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Left accent bar */}
        <div
          className={cn(
            "w-1 self-stretch rounded-full shrink-0",
            isSecurity ? "bg-security-400" : "bg-health-400"
          )}
        />

        <div className="flex-1 min-w-0 space-y-2">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={isSecurity ? "security" : "health"}>
              {finding.severity}
            </Badge>
            <Badge
              variant={
                finding.confidence === "high"
                  ? "primary"
                  : finding.confidence === "medium"
                  ? "warning"
                  : "neutral"
              }
            >
              {finding.confidence} confidence
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-medium text-neutral-900 leading-snug group-hover:text-primary-700 transition-colors">
            {finding.title}
          </h3>

          {/* File location */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <FileCode2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-mono">
              {finding.file}:{finding.line}
            </span>
          </div>
        </div>

        <ChevronRight
          className={cn(
            "h-5 w-5 text-neutral-300 shrink-0 mt-1 transition-transform",
            selected && "text-primary-500 translate-x-0.5"
          )}
        />
      </div>
    </button>
  );
}
