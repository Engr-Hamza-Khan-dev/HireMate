"use client";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        outline: "border border-border bg-background",
        ghost: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export type MatchBadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    percentage?: number;
    showLabel?: boolean;
  };

export function MatchBadge({
  className,
  variant = "success",
  percentage,
  showLabel = true,
  children,
  ...props
}: MatchBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={cn(badgeVariants({ variant }), "font-semibold", className)}
        {...props}
      >
        {percentage ? `${percentage}%` : children}
      </span>
      {showLabel && percentage && (
        <span className="text-xs text-muted-foreground mt-0.5">Match</span>
      )}
    </div>
  );
}