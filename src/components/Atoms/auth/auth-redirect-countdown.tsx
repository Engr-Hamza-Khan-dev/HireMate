"use client";

import { useEffect, useState } from "react";

type AuthRedirectCountdownProps = {
  seconds: number;
  label?: string;
};

/**
 * Atom: animated progress bar + live countdown text.
 * Counts down from `seconds` to 0, purely visual — the parent
 * owns the actual redirect logic.
 */
export function AuthRedirectCountdown({
  seconds,
  label = "Redirecting to your dashboard",
}: AuthRedirectCountdownProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const pct = ((seconds - remaining) / seconds) * 100;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {label} in {remaining}s…
      </p>
    </div>
  );
}
