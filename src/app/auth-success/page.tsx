import { Suspense } from "react";
import { AuthTokenValidating } from "@/components/Atoms/auth/auth-token-validating";
import { AuthSuccessClient } from "@/app/auth-success/auth-success-client";

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <AuthTokenValidating />
        </div>
      }
    >
      <AuthSuccessClient />
    </Suspense>
  );
}
