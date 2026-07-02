import { ShieldCheckIcon } from "lucide-react";

/**
 * Molecule: "Your data is secure and encrypted" footer note.
 */
export function AuthSecurityNote() {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
      <ShieldCheckIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      Your data is secure and encrypted
    </div>
  );
}
