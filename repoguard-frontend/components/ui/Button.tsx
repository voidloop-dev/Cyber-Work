import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 shadow-sm focus-visible:ring-primary-500",
      secondary:
        "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus-visible:ring-neutral-400",
      ghost:
        "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-400",
      danger:
        "bg-security-600 text-white hover:bg-security-700 focus-visible:ring-security-500",
      outline:
        "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus-visible:ring-primary-500",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
