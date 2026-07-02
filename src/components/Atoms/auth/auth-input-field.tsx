"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export type AuthInputFieldProps = ComponentProps<"input"> & {
  /** Icon rendered on the left side of the input */
  leftIcon?: ReactNode;
  /** Icon/button rendered on the right side of the input */
  rightElement?: ReactNode;
  /** Error message — when set the input gets destructive styling */
  error?: string;
  errorId?: string;
};

/**
 * Atom: full-width input with optional left icon and right element.
 * Uses the project's `<Input>` primitive and applies `aria-invalid`
 * so shadcn's built-in destructive ring fires automatically.
 */
export function AuthInputField({
  leftIcon,
  rightElement,
  error,
  errorId,
  className,
  ...props
}: AuthInputFieldProps) {
  return (
    <div className="relative">
      {leftIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {leftIcon}
        </span>
      )}

      <Input
        aria-invalid={!!error || undefined}
        aria-describedby={error && errorId ? errorId : undefined}
        className={cn(
          "h-11 text-sm",
          leftIcon && "pl-9",
          rightElement && "pr-10",
          className
        )}
        {...props}
      />

      {rightElement && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightElement}
        </span>
      )}
    </div>
  );
}
