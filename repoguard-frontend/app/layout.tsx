import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepoGuard — AI Security & Code Health Reviewer",
  description:
    "Find security risks and wasted code in your GitHub repositories. Plain-language explanations and verified fixes as pull requests.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50">{children}</body>
    </html>
  );
}
