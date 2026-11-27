import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function severityColor(severity: string) {
  switch (severity) {
    case "critical":
    case "high":
      return "security";
    case "medium":
      return "amber";
    default:
      return "neutral";
  }
}
