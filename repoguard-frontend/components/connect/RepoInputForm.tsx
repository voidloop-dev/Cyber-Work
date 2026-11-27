"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Github, ArrowRight, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export function RepoInputForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setLoading(true);
    // Simulate creating a scan job
    await new Promise((r) => setTimeout(r, 800));
    const jobId = "demo-" + Date.now().toString(36);
    router.push(`/scan/${jobId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="repo"
          className="block text-sm font-medium text-neutral-700"
        >
          GitHub Repository
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Github className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            id="repo"
            type="url"
            required
            placeholder="https://github.com/owner/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="token"
          className="block text-sm font-medium text-neutral-700"
        >
          Personal Access Token{" "}
          <span className="text-neutral-400 font-normal">(optional for public repos)</span>
        </label>
        <input
          id="token"
          type="password"
          placeholder="ghp_························"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow font-mono text-sm"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading || !repoUrl.trim()}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Starting scan…
          </>
        ) : (
          <>
            Start Security & Health Scan
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>

      <div className="flex items-start gap-2.5 text-xs text-neutral-500 pt-1">
        <Shield className="h-4 w-4 text-health-500 shrink-0 mt-0.5" />
        <p>
          Read-only by default. Secrets are redacted before any AI processing.
          Nothing is written to GitHub until you explicitly approve a fix.
        </p>
      </div>
    </form>
  );
}
