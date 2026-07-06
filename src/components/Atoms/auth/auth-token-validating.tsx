/**
 * Atom: spinner shown while a reset token is being verified.
 */
export function AuthTokenValidating() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
      <p className="text-sm text-muted-foreground">Verifying your reset link…</p>
    </div>
  );
}
