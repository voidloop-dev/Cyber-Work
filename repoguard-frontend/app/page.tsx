import { RepoInputForm } from "@/components/connect/RepoInputForm";
import { Shield, Sparkles, GitPullRequest, Eye } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Shield className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-semibold text-neutral-900 tracking-tight">
              RepoGuard
            </span>
          </div>
          <span className="text-xs font-medium text-neutral-400 hidden sm:block">
            Google AI Agentathon 2026
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            AI reviewer for GitHub repositories
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 text-balance">
              Security & code health
              <br />
              <span className="text-primary-600">reviewed for you</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed text-balance">
              RepoGuard finds leaked secrets, missing authorization, vulnerable
              dependencies and wasted code — then explains every issue and
              opens a verified fix as a pull request.
            </p>
          </div>

          {/* Form */}
          <div className="pt-4 flex justify-center">
            <RepoInputForm />
          </div>

          {/* Features strip */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <Feature
              icon={<Eye className="h-5 w-5 text-primary-600" />}
              title="Plain-language findings"
              description="Every issue comes with evidence, severity, confidence and a clear explanation."
            />
            <Feature
              icon={<Shield className="h-5 w-5 text-security-500" />}
              title="Secrets never leave"
              description="Real values are redacted before any model sees the code. Read-only by default."
            />
            <Feature
              icon={<GitPullRequest className="h-5 w-5 text-health-600" />}
              title="Verified fixes"
              description="High-confidence patches are applied and re-checked before a PR is opened."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-400">
        Built with Google Gemini & ADK · Aamash Aziz & Muhammad Hasnain
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-white border border-neutral-200/80">
      <div className="h-10 w-10 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-neutral-900 text-sm">{title}</h3>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
