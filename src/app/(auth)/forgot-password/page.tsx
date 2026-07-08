"use client";

import Link from "next/link";
import { useState } from "react";
import { MailIcon, ArrowLeftIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { AuthFormHeader } from "@/components/Molecules/auth/auth-form-header";
import { AuthSecurityNote } from "@/components/Molecules/auth/auth-security-note";
import { AuthInputField } from "@/components/Atoms/auth/auth-input-field";
import { AuthErrorMessage } from "@/components/Atoms/auth/auth-error-message";
import { AuthServerError } from "@/components/Atoms/auth/auth-server-error";
import { Button } from "@/components/Atoms/button";
import { validateEmail } from "@/lib/auth-validation";
import { forgotPassword, getApiErrorMessage } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const { mutate, isPending, isSuccess, error: mutationError } = useMutation({
    mutationFn: () => forgotPassword(email),
  });

  const serverError = mutationError ? getApiErrorMessage(mutationError, "Failed to send reset link. Please try again.") : null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (touched) setFieldError(validateEmail(e.target.value));
  }

  function handleBlur() {
    setTouched(true);
    setFieldError(validateEmail(email));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateEmail(email);
    setFieldError(err);
    setTouched(true);
    if (err) return;
    mutate();
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end px-8 py-6">
          <Link
            href="/sign-in"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to sign in
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-[420px] flex flex-col gap-6">
            {isSuccess ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <MailIcon className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Check your email</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We&apos;ve sent a password reset link to{" "}
                    <span className="font-medium text-foreground">{email}</span>.
                    Check your inbox and follow the instructions.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Didn&apos;t receive the email?{" "}
                  <Button type="button" variant="link" className="h-auto p-0 font-semibold"
                    onClick={() => mutate()}>
                    Resend
                  </Button>
                </p>
                <Button asChild className="h-11 w-full text-sm font-semibold mt-2">
                  <Link href="/sign-in">Return to sign in</Link>
                </Button>
              </div>
            ) : (
              <>
                <AuthFormHeader
                  title="Forgot your password?"
                  subtitle="Enter your email and we'll send you a reset link."
                />

                <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email address
                    </label>
                    <AuthInputField
                      id="email" name="email" type="email"
                      value={email} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Enter your email" autoComplete="email"
                      error={fieldError} errorId="email-error"
                      leftIcon={<MailIcon className="h-4 w-4" />}
                    />
                    <AuthErrorMessage id="email-error" message={fieldError} />
                  </div>

                  {serverError && <AuthServerError message={serverError} />}

                  <Button type="submit" className="h-11 w-full text-sm font-semibold" disabled={isPending}>
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Sending…
                      </span>
                    ) : "Send reset link"}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link href="/sign-in" className="font-semibold text-primary hover:underline">Sign in</Link>
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
