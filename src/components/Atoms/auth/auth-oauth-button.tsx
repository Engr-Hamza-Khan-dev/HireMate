import { Button } from "@/components/Atoms/button";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export type AuthOAuthButtonProps = ComponentProps<"button"> & {
  icon: ReactNode;
  label: string;
};

/**
 * Atom: OAuth provider button (Google, LinkedIn, etc.)
 * Styled as a full-width outlined button with a left icon.
 */
export function AuthOAuthButton({
  icon,
  label,
  className,
  ...props
}: AuthOAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "h-11 w-full justify-center gap-3 rounded-lg text-sm font-medium",
        className
      )}
      {...props}
    >
      <span className="shrink-0">{icon}</span>
      {label}
    </Button>
  );
}
