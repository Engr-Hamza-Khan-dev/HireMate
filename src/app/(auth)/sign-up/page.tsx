"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { AuthFormHeader } from "@/components/Molecules/auth/auth-form-header";
import { AuthOAuthButtons } from "@/components/Molecules/auth/auth-oauth-buttons";
import { AuthSecurityNote } from "@/components/Molecules/auth/auth-security-note";
import { AuthPasswordStrength } from "@/components/Molecules/auth/auth-password-strength";
import { AuthDivider } from "@/components/Atoms/auth/auth-divider";
import { AuthInputField } from "@/components/Atoms/auth/auth-input-field";
import { AuthErrorMessage } from "@/components/Atoms/auth/auth-error-message";
import { AuthServerError } from "@/components/Atoms/auth/auth-server-error";
import { Button } from "@/components/Atoms/button";
import {
  validateFullname,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateAgreed,
} from "@/lib/auth-validation";
import { signUp, getApiErrorMessage } from "@/lib/api";

interface SignUpErrors {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreed?: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [fields, setFields] = useState({ fullname: "", email: "", password: "", confirmPassword: "" });
  const [fieldErrors, setFieldErrors] = useState<SignUpErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { mutate, isPending, error: mutationError } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push(`/verify?email=${encodeURIComponent(fields.email)}`);
    },
  });

  // Extract server error — handles all common backend response shapes
  const serverError = mutationError ? getApiErrorMessage(mutationError, "Registration failed. Please try again.") : null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (!touched[name]) return;
    let err: string | undefined;
    if (name === "fullname") err = validateFullname(value);
    else if (name === "email") err = validateEmail(value);
    else if (name === "password") {
      err = validatePassword(value);
      if (touched.confirmPassword)
        setFieldErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(fields.confirmPassword, value) }));
    } else if (name === "confirmPassword") {
      err = validateConfirmPassword(value, fields.password);
    }
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    let err: string | undefined;
    if (name === "fullname") err = validateFullname(value);
    else if (name === "email") err = validateEmail(value);
    else if (name === "password") err = validatePassword(value);
    else if (name === "confirmPassword") err = validateConfirmPassword(value, fields.password);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: SignUpErrors = {
      fullname: validateFullname(fields.fullname),
      email: validateEmail(fields.email),
      password: validatePassword(fields.password),
      confirmPassword: validateConfirmPassword(fields.confirmPassword, fields.password),
      agreed: validateAgreed(agreed),
    };
    setFieldErrors(next);
    setTouched({ fullname: true, email: true, password: true, confirmPassword: true });
    if (Object.values(next).some(Boolean)) return;
    mutate({ fullname: fields.fullname, email: fields.email, password: fields.password, confirmpassword: fields.confirmPassword });
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end px-8 py-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-[420px] flex flex-col gap-6">
            <AuthFormHeader
              title="Create your account"
              subtitle="Start your journey to career success"
            />

            <AuthOAuthButtons variant="sign-up" />
            <AuthDivider />

            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
              {/* Full name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullname" className="text-sm font-medium text-foreground">
                  Full name
                </label>
                <AuthInputField
                  id="fullname" name="fullname" type="text"
                  value={fields.fullname} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Enter your full name" autoComplete="name"
                  error={fieldErrors.fullname} errorId="fullname-error"
                  leftIcon={<UserIcon className="h-4 w-4" />}
                />
                <AuthErrorMessage id="fullname-error" message={fieldErrors.fullname} />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <AuthInputField
                  id="email" name="email" type="email"
                  value={fields.email} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Enter your email" autoComplete="email"
                  error={fieldErrors.email} errorId="email-error"
                  leftIcon={<MailIcon className="h-4 w-4" />}
                />
                <AuthErrorMessage id="email-error" message={fieldErrors.email} />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <AuthInputField
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  value={fields.password} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Create a password" autoComplete="new-password"
                  error={fieldErrors.password} errorId="password-error"
                  leftIcon={<LockIcon className="h-4 w-4" />}
                  rightElement={
                    <button type="button" onClick={() => setShowPassword((v) => !v)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  }
                />
                <AuthPasswordStrength password={fields.password} />
                {fieldErrors.password
                  ? <AuthErrorMessage id="password-error" message={fieldErrors.password} />
                  : <p id="password-hint" className="text-xs text-muted-foreground">Min. 8 characters, one uppercase letter, one number.</p>
                }
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                  Confirm password
                </label>
                <AuthInputField
                  id="confirm-password" name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={fields.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Confirm your password" autoComplete="new-password"
                  error={fieldErrors.confirmPassword} errorId="confirm-error"
                  leftIcon={<LockIcon className="h-4 w-4" />}
                  rightElement={
                    <button type="button" onClick={() => setShowConfirm((v) => !v)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showConfirm ? "Hide password" : "Show password"}>
                      {showConfirm ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  }
                />
                <AuthErrorMessage id="confirm-error" message={fieldErrors.confirmPassword} />
              </div>

              {/* Terms */}
              <div className="flex flex-col gap-1">
                <label className="flex cursor-pointer items-start gap-2 select-none">
                  <input
                    type="checkbox" checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      setFieldErrors((prev) => ({ ...prev, agreed: e.target.checked ? undefined : validateAgreed(false) }));
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
                    aria-invalid={!!fieldErrors.agreed}
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-primary hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                <AuthErrorMessage id="agreed-error" message={fieldErrors.agreed} className="pl-6" />
              </div>

              {/* Server error */}
              {serverError && <AuthServerError message={serverError} />}

              <Button type="submit" className="h-11 w-full text-sm font-semibold" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : "Create account"}
              </Button>
            </form>

            <AuthSecurityNote />
          </div>
        </div>
      </div>
    </div>
  );
}
