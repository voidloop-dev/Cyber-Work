"use client";

import { Finding } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { X, GitPullRequest, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface ApproveModalProps {
  finding: Finding;
  onClose: () => void;
  onConfirm: () => void;
}

export function ApproveModal({ finding, onClose, onConfirm }: ApproveModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    // Simulate network
    await new Promise((r) => setTimeout(r, 1200));
    onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <GitPullRequest className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">
                Approve Fix & Open Pull Request
              </h3>
              <p className="text-sm text-neutral-500">
                A human must still review and merge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="p-3 rounded-lg bg-primary-50 border border-primary-100 flex gap-3">
            <ShieldCheck className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
            <p className="text-sm text-primary-800">
              RepoGuard verified this patch by applying it and re-running the
              original check. The finding disappeared.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Diff to be applied
            </h4>
            <pre className="text-sm font-mono bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto leading-relaxed">
              {finding.fix_diff}
            </pre>
          </div>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">
              I understand this will create a new branch and open a pull request
              on the repository. No code will be merged automatically.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!confirmed || loading}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating PR…
              </>
            ) : (
              <>
                <GitPullRequest className="h-4 w-4" />
                Open Pull Request
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
