"use client";

import Link from "next/link";
import { Suspense, useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { AuthFormHeader } from "@/components/Molecules/auth/auth-form-header";
import { AuthSecurityNote } from "@/components/Molecules/auth/auth-security-note";
import { AuthServerError } from "@/components/Atoms/auth/auth-server-error";
import { AuthRedirectCountdown } from "@/components/Atoms/auth/auth-redirect-countdown";
import { Button } from "@/components/Atoms/button";
import { cn } from "@/lib/utils";
import { setAccessTokenCookie } from "@/lib/auth-cookie";
import { verifyEmail, resendOtp, getApiErrorMessage } from "@/lib/api";
import { useAuth } from "@/context/Authcontext";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;
const REDIRECT_SECONDS = 3;

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    }>
      <VerifyPageInner />
    </Suspense>
  );
}

function VerifyPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { setUser } = useAuth();

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startCooldown();
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
  }, []);

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) { clearInterval(cooldownRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
  }

  function focusAt(index: number) { inputRefs.current[index]?.focus(); }

  function handleInput(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    verifyMutation.reset();
    if (digit && index < CODE_LENGTH - 1) focusAt(index + 1);
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) { const n = [...digits]; n[index] = ""; setDigits(n); }
      else if (index > 0) focusAt(index - 1);
    } else if (e.key === "ArrowLeft" && index > 0) focusAt(index - 1);
    else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) focusAt(index + 1);
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    verifyMutation.reset();
    focusAt(Math.min(pasted.length, CODE_LENGTH - 1));
  }

  const verifyMutation = useMutation({
    mutationFn: (otp: string) => verifyEmail({ email, otp }),
    onSuccess: (data) => {
      const { accessToken, safeUser } = data;
      setAccessTokenCookie(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);
      setVerified(true);
      setTimeout(() => router.push("/dashboard"), REDIRECT_SECONDS * 1000);
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => resendOtp(email),
    onSuccess: () => startCooldown(),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < CODE_LENGTH) return;
    verifyMutation.mutate(code);
  }

  const verifyError = verifyMutation.error
    ? getApiErrorMessage(verifyMutation.error, "Verification failed. Please try again.")
    : null;

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end px-8 py-6">
          <p className="text-sm text-muted-foreground">
            Wrong account?{" "}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-[420px] flex flex-col gap-6">
            {verified ? (
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-foreground">Email verified!</h2>
                  <p className="text-sm text-muted-foreground">You&apos;re all set. Signing you in automatically…</p>
                </div>
                <div className="w-full">
                  <AuthRedirectCountdown seconds={REDIRECT_SECONDS} label="Taking you to your dashboard" />
                </div>
                <Button className="h-11 w-full text-sm font-semibold" onClick={() => router.push("/dashboard")}>
                  Go to dashboard now
                </Button>
              </div>
            ) : (
              <>
                <AuthFormHeader
                  title="Verify your email"
                  subtitle="Enter the 6-digit code we sent to your email address."
                />

                <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                  <div role="group" aria-label="Verification code input" className="flex justify-center gap-3">
                    {digits.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text" inputMode="numeric" maxLength={1} value={digit}
                        onChange={(e) => handleInput(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        aria-label={`Digit ${i + 1}`}
                        className={cn(
                          "h-12 w-12 rounded-xl border text-center text-xl font-semibold text-foreground outline-none transition",
                          "focus:border-primary focus:ring-2 focus:ring-primary/20",
                          verifyError
                            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                            : "border-border",
                          digit && "border-primary bg-primary/5"
                        )}
                      />
                    ))}
                  </div>

                  {verifyError && <AuthServerError message={verifyError} />}

                  <Button type="submit" className="h-11 w-full text-sm font-semibold"
                    disabled={verifyMutation.isPending || digits.join("").length < CODE_LENGTH}>
                    {verifyMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Verifying…
                      </span>
                    ) : "Verify email"}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Didn&apos;t receive a code?{" "}
                  <Button type="button" variant="link"
                    className="h-auto p-0 font-semibold disabled:opacity-50"
                    onClick={() => resendMutation.mutate()}
                    disabled={cooldown > 0 || resendMutation.isPending}>
                    {cooldown > 0 ? `Resend code in ${cooldown}s` : resendMutation.isPending ? "Sending…" : "Resend code"}
                  </Button>
                </p>

                <AuthSecurityNote />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
