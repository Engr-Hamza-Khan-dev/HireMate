/**
 * Atom: "— or —" divider used between OAuth and email/password sections.
 */
export function AuthDivider() {
  return (
    <div className="flex items-center gap-3" role="separator" aria-label="or">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground select-none">or</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
