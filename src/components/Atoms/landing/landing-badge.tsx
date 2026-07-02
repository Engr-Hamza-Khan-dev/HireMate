import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type LandingBadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Small pill badge used above section headings */
export function LandingBadge({ children, className }: LandingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
