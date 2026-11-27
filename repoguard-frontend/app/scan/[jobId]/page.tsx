"use client";

import { useState, useEffect } from "react";
import { ScoreGauges } from "@/components/progress/ScoreGauges";
import { AgentProgress } from "@/components/progress/AgentProgress";
import { FindingCard } from "@/components/findings/FindingCard";
import { FindingDetail } from "@/components/findings/FindingDetail";
import { ApproveModal } from "@/components/diff/ApproveModal";
import { MOCK_AGENTS, MOCK_FINDINGS, Finding, AgentStatus } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowLeft,
  Filter,
  Shield,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function ScanPage({ params }: { params: { jobId: string } }) {
  const [agents, setAgents] = useState<AgentStatus[]>(
    MOCK_AGENTS.map((a) => ({ ...a, status: "pending" as const }))
  );
  const [findings, setFindings] = useState<Finding[]>([]);
  const [securityScore, setSecurityScore] = useState<number | null>(null);
  const [healthScore, setHealthScore] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [prCreated, setPrCreated] = useState(false);
  const [scanning, setScanning] = useState(true);

  // Simulate progressive agent work + findings
  useEffect(() => {
    let step = 0;
    const sequence = [
      () => {
        setAgents((prev) =>
          prev.map((a, i) =>
            i === 0 ? { ...a, status: "running" } : a
          )
        );
      },
      () => {
        setAgents((prev) =>
          prev.map((a, i) =>
            i === 0
              ? { ...a, status: "done", findingsCount: 2 }
              : i === 1
              ? { ...a, status: "running" }
              : a
          )
        );
        setFindings((f) => [...f, MOCK_FINDINGS[0]]);
      },
      () => {
        setAgents((prev) =>
          prev.map((a, i) =>
            i === 1
              ? { ...a, status: "done", findingsCount: 1 }
              : i === 2
              ? { ...a, status: "running" }
              : a
          )
        );
        setFindings((f) => [...f, MOCK_FINDINGS[1]]);
      },
      () => {
        setAgents((prev) =>
          prev.map((a, i) =>
            i === 2
              ? { ...a, status: "done", findingsCount: 1 }
              : i === 3
              ? { ...a, status: "running" }
              : a
          )
        );
        setFindings((f) => [...f, MOCK_FINDINGS[2]]);
      },
      () => {
        setAgents((prev) =>
          prev.map((a, i) =>
            i === 3
              ? { ...a, status: "done", findingsCount: 2 }
              : i === 4
              ? { ...a, status: "running" }
              : a
          )
        );
        setFindings((f) => [...f, MOCK_FINDINGS[3], MOCK_FINDINGS[4]]);
      },
      () => {
        setAgents((prev) =>
          prev.map((a) =>
            a.status === "running"
              ? { ...a, status: "done", findingsCount: 0 }
              : a
          )
        );
        setSecurityScore(62);
        setHealthScore(78);
        setScanning(false);
        setSelectedId(MOCK_FINDINGS[0].id);
      },
    ];

    const timers = sequence.map((fn, i) =>
      setTimeout(fn, 900 + i * 1100)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const selected = findings.find((f) => f.id === selectedId) ?? null;

  const handleApprove = () => {
    setShowApprove(true);
  };

  const handleConfirmPR = () => {
    setShowApprove(false);
    setPrCreated(true);
    setFindings((prev) =>
      prev.map((f) =>
        f.id === selectedId ? { ...f, status: "applied" } : f
      )
    );
    // Simulate score improvement
    setSecurityScore((s) => (s !== null ? Math.min(100, s + 18) : s));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              New scan
            </Link>
            <div className="h-4 w-px bg-neutral-200" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary-600 flex items-center justify-center">
                <Shield className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-medium text-neutral-900 text-sm">
                RepoGuard
              </span>
            </div>
          </div>
          <div className="text-xs text-neutral-400 font-mono truncate max-w-[200px]">
            {params.jobId}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Scores */}
        <Card className="p-8 mb-8">
          <ScoreGauges
            securityScore={securityScore}
            healthScore={healthScore}
            loading={scanning}
          />
          {prCreated && (
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-health-700 bg-health-50 border border-health-100 rounded-lg py-2.5 px-4">
              <CheckCircle2 className="h-4 w-4" />
              Fix applied · Security score improved
              <a
                href="#"
                className="inline-flex items-center gap-1 font-medium text-primary-600 hover:underline ml-2"
              >
                View pull request
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </Card>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Agents + Findings list */}
          <div className="lg:col-span-5 space-y-6">
            {/* Agents */}
            <Card className="p-5">
              <h2 className="text-sm font-semibold text-neutral-800 mb-4">
                Agent Progress
              </h2>
              <AgentProgress agents={agents} />
            </Card>

            {/* Findings list */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-neutral-800">
                  Findings{" "}
                  <span className="text-neutral-400 font-normal">
                    ({findings.length})
                  </span>
                </h2>
                <Button variant="ghost" size="sm" className="gap-1.5 text-neutral-500">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
              </div>

              <div className="space-y-2.5">
                {findings.length === 0 && scanning && (
                  <div className="text-center py-12 text-sm text-neutral-400">
                    Waiting for findings…
                  </div>
                )}
                {findings.map((f) => (
                  <FindingCard
                    key={f.id}
                    finding={f}
                    selected={selectedId === f.id}
                    onClick={() => setSelectedId(f.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Detail */}
          <div className="lg:col-span-7">
            {selected ? (
              <FindingDetail finding={selected} onApprove={handleApprove} />
            ) : (
              <Card className="p-12 text-center">
                <p className="text-neutral-400 text-sm">
                  {scanning
                    ? "Findings will appear here as agents complete their work"
                    : "Select a finding to inspect"}
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Approve Modal */}
      {showApprove && selected && (
        <ApproveModal
          finding={selected}
          onClose={() => setShowApprove(false)}
          onConfirm={handleConfirmPR}
        />
      )}
    </div>
  );
}
