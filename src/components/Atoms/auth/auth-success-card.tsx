import { CheckCircle2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AuthSuccessCardProps = {
  title: string;
  subtitle: string;
  /** Optional extra content below the subtitle (e.g. user name badge) */
  children?: ReactNode;
  className?: string;
};

/**
 * Atom: branded success icon + heading + subtitle used on
 * OAuth callback and other post-auth success screens.
 */
export function AuthSuccessCard({
  title,
  subtitle,
  children,
  className,
}: AuthSuccessCardProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 ring-8 ring-success/5">
        <CheckCircle2Icon className="h-8 w-8 text-success" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
