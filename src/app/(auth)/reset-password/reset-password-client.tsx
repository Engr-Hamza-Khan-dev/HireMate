"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { ResetPasswordForm } from "@/components/Molecules/auth/reset-password-form";
import { AuthTokenValidating } from "@/components/Atoms/auth/auth-token-validating";
import { AuthTokenInvalid } from "@/components/Atoms/auth/auth-token-invalid";
import { AuthResetSuccess } from "@/components/Atoms/auth/auth-reset-success";
import { resetPassword, getApiErrorMessage } from "@/lib/api";

type TokenStatus = "validating" | "valid" | "invalid" | "expired";

function validateToken(token: string | null): TokenStatus {
  if (!token || token.trim().length < 10) return "invalid";
  if (token.startsWith("exp")) return "expired";
  return "valid";
}

export function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [tokenStatus, setTokenStatus] = useState<TokenStatus>("validating");

  useEffect(() => {
    const t = setTimeout(() => setTokenStatus(validateToken(token)), 800);
    return () => clearTimeout(t);
  }, [token]);

  const { mutateAsync, isPending, isSuccess, error: mutationError } = useMutation({
    mutationFn: (password: string) =>
      resetPassword({ token: token ?? "", password, confirmpassword: password }),
    onSuccess: () => {
      setTimeout(() => router.push("/sign-in"), 2000);
    },
  });

  const serverError = mutationError ? getApiErrorMessage(mutationError, "Failed to reset password. Please try again.") : null;

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end px-8 py-6">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-[420px]">
            {tokenStatus === "validating" && <AuthTokenValidating />}

            {(tokenStatus === "invalid" || tokenStatus === "expired") && (
              <AuthTokenInvalid expired={tokenStatus === "expired"} />
            )}

            {tokenStatus === "valid" && isSuccess && <AuthResetSuccess />}

            {tokenStatus === "valid" && !isSuccess && (
              <ResetPasswordForm
                onSubmit={(password) => mutateAsync(password)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
