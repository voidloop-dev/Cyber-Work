import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-neutral-200 rounded-xl shadow-card",
        hover && "transition-all hover:shadow-soft hover:border-neutral-300",
        className
      )}
    >
      {children}
    </div>
  );
}
