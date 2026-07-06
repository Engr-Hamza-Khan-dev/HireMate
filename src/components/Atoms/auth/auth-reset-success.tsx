import { CheckCircle2Icon } from "lucide-react";

/**
 * Atom: success state shown after a password has been reset.
 * The animated progress bar fills over 2 s while the parent
 * redirects to /dashboard.
 */
export function AuthResetSuccess() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2Icon className="h-7 w-7 text-success" aria-hidden="true" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground">Password updated!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your password has been reset successfully. You&apos;re being signed in…
        </p>
      </div>

      {/* Progress bar animates via the `progress` keyframe in globals.css */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full animate-[progress_2s_ease-in-out_forwards] rounded-full bg-primary" />
      </div>
    </div>
  );
}
