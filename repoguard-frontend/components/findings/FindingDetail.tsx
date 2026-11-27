"use client";

import { Finding } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, FileCode2, AlertTriangle, Sparkles } from "lucide-react";

interface FindingDetailProps {
  finding: Finding;
  onApprove?: () => void;
}

export function FindingDetail({ finding, onApprove }: FindingDetailProps) {
  const isSecurity = finding.category === "security";
  const canApprove =
    finding.confidence === "high" && finding.status === "open" && finding.fix_diff;

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-100">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant={isSecurity ? "security" : "health"} size="md">
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
            size="md"
          >
            {finding.confidence} confidence
          </Badge>
          <Badge variant="neutral" size="md">
            {finding.category === "security" ? "Security" : "Code Health"}
          </Badge>
        </div>

        <h2 className="text-lg font-semibold text-neutral-900 leading-snug">
          {finding.title}
        </h2>

        <div className="flex items-center gap-1.5 mt-2 text-sm text-neutral-500">
          <FileCode2 className="h-4 w-4" />
          <span className="font-mono">
            {finding.file}:{finding.line}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-6">
        {/* Explanation */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            Explanation
          </h4>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {finding.explanation}
          </p>
        </div>

        {/* Impact */}
        <div className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-900">Impact</h4>
            <p className="text-sm text-amber-800 mt-0.5">{finding.impact}</p>
          </div>
        </div>

        {/* Evidence */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            Evidence
          </h4>
          <pre className="text-sm font-mono bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto leading-relaxed">
            {finding.evidence}
          </pre>
        </div>

        {/* Proposed Fix */}
        {finding.fix_diff && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Proposed Fix
            </h4>
            <pre className="text-sm font-mono bg-neutral-50 border border-neutral-200 p-4 rounded-lg overflow-x-auto leading-relaxed text-neutral-800">
              {finding.fix_diff}
            </pre>
          </div>
        )}
      </div>

      {/* Actions */}
      {canApprove && (
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            High-confidence fix · Will open a pull request for review
          </p>
          <Button onClick={onApprove} className="shrink-0">
            <CheckCircle2 className="h-4 w-4" />
            Approve & Create PR
          </Button>
        </div>
      )}
    </Card>
  );
}
