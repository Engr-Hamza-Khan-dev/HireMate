import { cn } from "@/lib/utils";

export type AuthErrorMessageProps = {
  id?: string;
  message?: string;
  className?: string;
};

/**
 * Atom: inline field-level error message.
 * Hidden when `message` is falsy.
 */
export function AuthErrorMessage({ id, message, className }: AuthErrorMessageProps) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className={cn("text-xs text-destructive", className)}
    >
      {message}
    </p>
  );
}
