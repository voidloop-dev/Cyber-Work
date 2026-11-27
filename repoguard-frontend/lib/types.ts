export type Severity = "critical" | "high" | "medium" | "low";
export type Confidence = "high" | "medium" | "low";
export type Category = "security" | "code_health";
export type FindingStatus = "open" | "verified" | "applied" | "suggestion";

export interface Finding {
  id: string;
  category: Category;
  type: string;
  title: string;
  severity: Severity;
  confidence: Confidence;
  file: string;
  line: number;
  evidence: string;
  explanation: string;
  impact: string;
  fix_diff?: string;
  status: FindingStatus;
}

export interface ScanJob {
  id: string;
  repoUrl: string;
  status: "pending" | "scanning" | "completed" | "failed";
  securityScore: number | null;
  healthScore: number | null;
  findings: Finding[];
  agents: AgentStatus[];
}

export interface AgentStatus {
  id: string;
  name: string;
  status: "pending" | "running" | "done" | "error";
  findingsCount?: number;
}

export const MOCK_AGENTS: AgentStatus[] = [
  { id: "secret", name: "Secret Scanner", status: "done", findingsCount: 2 },
  { id: "dependency", name: "Dependency Check", status: "done", findingsCount: 1 },
  { id: "authorization", name: "Authorization Review", status: "running" },
  { id: "code_health", name: "Code Health", status: "pending" },
  { id: "config", name: "Config & CI", status: "pending" },
];

export const MOCK_FINDINGS: Finding[] = [
  {
    id: "1",
    category: "security",
    type: "secret_leak",
    title: "Hardcoded API key exposed in source",
    severity: "high",
    confidence: "high",
    file: "src/config/api.js",
    line: 14,
    evidence: `const API_KEY = "sk_live_51H...";`,
    explanation:
      "A live API key is committed in the source. Anyone with repo access can use it. Rotate the key immediately and move it to environment variables.",
    impact: "Full account takeover of the external service",
    fix_diff: `--- a/src/config/api.js
+++ b/src/config/api.js
@@ -11,7 +11,7 @@
-const API_KEY = "sk_live_51H...";
+const API_KEY = process.env.API_KEY;`,
    status: "open",
  },
  {
    id: "2",
    category: "security",
    type: "missing_authorization",
    title: "DELETE /events/:id has no authorization check",
    severity: "high",
    confidence: "high",
    file: "routes/events.js",
    line: 42,
    evidence: `router.delete('/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});`,
    explanation:
      "Any authenticated user can delete an event belonging to another branch or organization. There is no ownership or role check.",
    impact: "Data loss across teams / branches",
    fix_diff: `--- a/routes/events.js
+++ b/routes/events.js
@@ -40,6 +40,10 @@
 router.delete('/events/:id', async (req, res) => {
+  const event = await Event.findById(req.params.id);
+  if (!event || event.branchId !== req.user.branchId) {
+    return res.status(403).json({ error: "Forbidden" });
+  }
   await Event.findByIdAndDelete(req.params.id);`,
    status: "open",
  },
  {
    id: "3",
    category: "security",
    type: "insecure_config",
    title: "Wildcard CORS enabled",
    severity: "medium",
    confidence: "high",
    file: "app.js",
    line: 28,
    evidence: `app.use(cors({ origin: '*' }));`,
    explanation:
      "The API accepts requests from any origin. This removes an important browser security boundary.",
    impact: "Increased risk of cross-site request abuse",
    status: "open",
  },
  {
    id: "4",
    category: "code_health",
    type: "unused_dependency",
    title: "Unused package: lodash",
    severity: "low",
    confidence: "high",
    file: "package.json",
    line: 19,
    evidence: `"lodash": "^4.17.21"`,
    explanation:
      "lodash is listed in dependencies but never imported anywhere in the project.",
    impact: "Larger install size and potential future vulnerability surface",
    status: "open",
  },
  {
    id: "5",
    category: "code_health",
    type: "debug_code",
    title: "Multiple console.log statements left in production code",
    severity: "low",
    confidence: "medium",
    file: "services/userService.js",
    line: 67,
    evidence: `console.log("user payload", user);`,
    explanation:
      "Debug logging remains in code that will run in production. It can leak sensitive data into logs.",
    impact: "Noise in logs and possible data exposure",
    status: "suggestion",
  },
];
