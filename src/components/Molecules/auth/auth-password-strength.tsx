"use client";

const LEVELS = ["", "Weak", "Fair", "Good", "Strong"] as const;
const COLORS = ["", "bg-destructive", "bg-warning", "bg-info", "bg-success"] as const;

export type AuthPasswordStrengthProps = {
  password: string;
};

function calcStrength(p: string): number {
  if (!p) return 0;
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
}

/**
 * Molecule: 4-segment password strength bar with label.
 * Hidden when password is empty.
 */
export function AuthPasswordStrength({ password }: AuthPasswordStrengthProps) {
  const level = calcStrength(password);
  if (!password) return null;

  return (
    <div className="flex items-center gap-2" aria-live="polite" aria-atomic="true">
      <div className="flex flex-1 gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= level ? COLORS[level] : "bg-border"
            }`}
          />
        ))}
      </div>
      <span className="w-10 text-right text-xs text-muted-foreground">
        {LEVELS[level]}
      </span>
    </div>
  );
}
