import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "security" | "health" | "primary" | "neutral" | "warning";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    security: "bg-security-100 text-security-700 border-security-200",
    health: "bg-health-100 text-health-700 border-health-200",
    primary: "bg-primary-100 text-primary-700 border-primary-200",
    neutral: "bg-neutral-100 text-neutral-600 border-neutral-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-md border",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
