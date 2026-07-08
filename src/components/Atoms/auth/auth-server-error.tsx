import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";

type AuthServerErrorProps = {
  message?: string | null;
  className?: string;
};

/**
 * Atom: server-level error banner shown below the form fields.
 * Distinct from field-level errors — uses a subtle amber/warning
 * tone instead of destructive red, with an icon and rounded card.
 */
export function AuthServerError({ message, className }: AuthServerErrorProps) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3",
        "dark:border-amber-900/50 dark:bg-amber-950/30",
        className
      )}
    >
      <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" aria-hidden="true" />
      <p className="text-sm font-medium leading-snug text-amber-800 dark:text-amber-300">
        {message}
      </p>
    </div>
  );
}
