"use client";

import { AgentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Loader2, XCircle } from "lucide-react";

interface AgentProgressProps {
  agents: AgentStatus[];
}

export function AgentProgress({ agents }: AgentProgressProps) {
  return (
    <div className="space-y-1">
      {agents.map((agent, idx) => {
        const isLast = idx === agents.length - 1;

        return (
          <div key={agent.id} className="flex gap-3">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className="flex h-6 w-6 items-center justify-center">
                {agent.status === "done" && (
                  <CheckCircle2 className="h-5 w-5 text-health-500" />
                )}
                {agent.status === "running" && (
                  <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
                )}
                {agent.status === "pending" && (
                  <Circle className="h-5 w-5 text-neutral-300" />
                )}
                {agent.status === "error" && (
                  <XCircle className="h-5 w-5 text-security-500" />
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-px flex-1 min-h-[20px]",
                    agent.status === "done" ? "bg-health-200" : "bg-neutral-200"
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-5">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    agent.status === "running"
                      ? "text-primary-700"
                      : agent.status === "done"
                      ? "text-neutral-800"
                      : "text-neutral-400"
                  )}
                >
                  {agent.name}
                </span>
                {agent.status === "running" && (
                  <span className="text-xs text-primary-500 font-medium animate-pulse">
                    Analyzing…
                  </span>
                )}
              </div>
              {agent.findingsCount !== undefined && agent.status === "done" && (
                <p className="text-xs text-neutral-500 mt-0.5">
                  {agent.findingsCount} finding
                  {agent.findingsCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
