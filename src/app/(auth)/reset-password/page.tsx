"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { ResetPasswordForm } from "@/components/Molecules/auth/reset-password-form";
import { AuthTokenValidating } from "@/components/Atoms/auth/auth-token-validating";
import { AuthTokenInvalid } from "@/components/Atoms/auth/auth-token-invalid";
import { AuthResetSuccess } from "@/components/Atoms/auth/auth-reset-success";

type TokenStatus = "validating" | "valid" | "invalid" | "expired";

function validateToken(token: string | null): TokenStatus {
  if (!token || token.trim().length < 10) return "invalid";
  if (token.startsWith("exp")) return "expired";
  return "valid";
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [tokenStatus, setTokenStatus] = useState<TokenStatus>("validating");
  const [done, setDone] = useState(false);

  /* Verify token on mount */
  useEffect(() => {
    const t = setTimeout(() => setTokenStatus(validateToken(token)), 800);
    return () => clearTimeout(t);
  }, [token]);

  /* Redirect to dashboard 2 s after success */
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => router.push("/dashboard"), 2000);
    return () => clearTimeout(t);
  }, [done, router]);

  async function handlePasswordReset(password: string) {
    // TODO: POST /api/auth/reset-password  { token, password }
    await new Promise((res) => setTimeout(res, 1200)); // simulate network
    console.log("Password reset with token:", token, "new password:", password);
    setDone(true);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        {/* Top nav */}
        <header className="flex items-center justify-end px-8 py-6">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </header>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-[420px]">

            {tokenStatus === "validating" && (
              <AuthTokenValidating />
            )}

            {(tokenStatus === "invalid" || tokenStatus === "expired") && (
              <AuthTokenInvalid expired={tokenStatus === "expired"} />
            )}

            {tokenStatus === "valid" && done && (
              <AuthResetSuccess />
            )}

            {tokenStatus === "valid" && !done && (
              <ResetPasswordForm onSubmit={handlePasswordReset} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
