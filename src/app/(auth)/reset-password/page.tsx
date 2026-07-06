import { Suspense } from "react";
import { AuthTokenValidating } from "@/components/Atoms/auth/auth-token-validating";
import { ResetPasswordClient } from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <AuthTokenValidating />
      </div>
    }>
      <ResetPasswordClient />
    </Suspense>
  );
}
