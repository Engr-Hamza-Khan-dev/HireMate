import Link from "next/link";
import { XCircleIcon } from "lucide-react";
import { Button } from "@/components/Atoms/button";

type AuthTokenInvalidProps = {
  expired: boolean;
};

/**
 * Atom: error state shown when the reset token is invalid or expired.
 */
export function AuthTokenInvalid({ expired }: AuthTokenInvalidProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <XCircleIcon className="h-7 w-7 text-destructive" aria-hidden="true" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {expired ? "Link expired" : "Invalid link"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {expired
            ? "This password reset link has expired. Reset links are valid for 1 hour."
            : "This password reset link is invalid or has already been used."}
        </p>
      </div>

      <Button asChild className="h-11 w-full text-sm font-semibold">
        <Link href="/forgot-password">Request a new link</Link>
      </Button>

      <p className="text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
