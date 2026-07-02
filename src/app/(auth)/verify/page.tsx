"use client";

import Link from "next/link";
import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { AuthFormHeader } from "@/components/Molecules/auth/auth-form-header";
import { AuthSecurityNote } from "@/components/Molecules/auth/auth-security-note";
import { AuthErrorMessage } from "@/components/Atoms/auth/auth-error-message";
import { Button } from "@/components/Atoms/button";
import { cn } from "@/lib/utils";

const CODE_LENGTH = 6;

export default function VerifyPage() {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState<string | undefined>();
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function focusAt(index: number) {
    inputRefs.current[index]?.focus();
  }

  function handleInput(index: number, value: string) {
    // Only accept a single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError(undefined);

    if (digit && index < CODE_LENGTH - 1) {
      focusAt(index + 1);
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        focusAt(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusAt(index - 1);
    } else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      focusAt(index + 1);
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    setError(undefined);
    focusAt(Math.min(pasted.length, CODE_LENGTH - 1));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < CODE_LENGTH) {
      setError("Please enter the full 6-digit code.");
      return;
    }
    setError(undefined);
    setVerified(true);
    // TODO: call verify API with `code`
    console.log("Verifying code:", code);
  }

  function handleResend() {
    setDigits(Array(CODE_LENGTH).fill(""));
    setError(undefined);
    focusAt(0);
    // TODO: call resend OTP API
    console.log("Resend verification code");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end px-8 py-6">
          <p className="text-sm text-muted-foreground">
            Wrong account?{" "}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-[420px] flex flex-col gap-6">
            {verified ? (
              /* Success state */
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                  <svg
                    className="h-7 w-7 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Email verified!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your email has been verified successfully. You can now sign in to your account.
                  </p>
                </div>
                <Button asChild className="h-11 w-full text-sm font-semibold mt-2">
                  <Link href="/sign-in">Continue to sign in</Link>
                </Button>
              </div>
            ) : (
              /* OTP input state */
              <>
                <AuthFormHeader
                  title="Verify your email"
                  subtitle="Enter the 6-digit code we sent to your email address."
                />

                <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                  {/* OTP digit grid */}
                  <div
                    role="group"
                    aria-label="Verification code input"
                    className="flex justify-center gap-3"
                  >
                    {digits.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInput(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        aria-label={`Digit ${i + 1}`}
                        className={cn(
                          "h-12 w-12 rounded-xl border text-center text-xl font-semibold text-foreground outline-none transition",
                          "focus:border-primary focus:ring-2 focus:ring-primary/20",
                          error
                            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                            : "border-border",
                          digit && "border-primary bg-primary/5"
                        )}
                      />
                    ))}
                  </div>

                  {error && (
                    <AuthErrorMessage message={error} className="text-center" />
                  )}

                  <Button type="submit" className="h-11 w-full text-sm font-semibold">
                    Verify email
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Didn&apos;t receive a code?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 font-semibold"
                    onClick={handleResend}
                  >
                    Resend code
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
