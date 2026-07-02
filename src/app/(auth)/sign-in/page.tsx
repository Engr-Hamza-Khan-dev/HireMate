"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { AuthFormHeader } from "@/components/Molecules/auth/auth-form-header";
import { AuthOAuthButtons } from "@/components/Molecules/auth/auth-oauth-buttons";
import { AuthSecurityNote } from "@/components/Molecules/auth/auth-security-note";
import { AuthDivider } from "@/components/Atoms/auth/auth-divider";
import { AuthInputField } from "@/components/Atoms/auth/auth-input-field";
import { AuthErrorMessage } from "@/components/Atoms/auth/auth-error-message";
import { Button } from "@/components/Atoms/button";
import { validateEmail, validatePassword } from "@/lib/auth-validation";

interface SignInErrors {
  email?: string;
  password?: string;
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<SignInErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err =
        name === "email" ? validateEmail(value) : validatePassword(value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err =
      name === "email" ? validateEmail(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: SignInErrors = {
      email: validateEmail(fields.email),
      password: validatePassword(fields.password),
    };
    setErrors(next);
    setTouched({ email: true, password: true });
    if (next.email || next.password) return;
    // TODO: call auth API
    console.log("Sign-in submitted", fields);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        {/* Top nav */}
        <header className="flex items-center justify-end px-8 py-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </header>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-[420px] flex flex-col gap-6">
            <AuthFormHeader
              title="Welcome back"
              subtitle="Sign in to your account and continue"
            />

            <AuthOAuthButtons variant="sign-in" />
            <AuthDivider />

            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <AuthInputField
                  id="email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  autoComplete="email"
                  error={errors.email}
                  errorId="email-error"
                  leftIcon={<MailIcon className="h-4 w-4" />}
                />
                <AuthErrorMessage id="email-error" message={errors.email} />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <AuthInputField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={fields.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  error={errors.password}
                  errorId="password-error"
                  leftIcon={<LockIcon className="h-4 w-4" />}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword
                        ? <EyeOffIcon className="h-4 w-4" />
                        : <EyeIcon className="h-4 w-4" />}
                    </button>
                  }
                />
                <AuthErrorMessage id="password-error" message={errors.password} />
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>

              <Button type="submit" className="h-11 w-full text-sm font-semibold">
                Sign in
              </Button>
            </form>

            <AuthSecurityNote />
          </div>
        </div>
      </div>
    </div>
  );
}
