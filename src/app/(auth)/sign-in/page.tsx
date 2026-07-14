"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { AuthFormHeader } from "@/components/Molecules/auth/auth-form-header";
import { AuthOAuthButtons } from "@/components/Molecules/auth/auth-oauth-buttons";
import { AuthSecurityNote } from "@/components/Molecules/auth/auth-security-note";
import { AuthDivider } from "@/components/Atoms/auth/auth-divider";
import { AuthInputField } from "@/components/Atoms/auth/auth-input-field";
import { AuthErrorMessage } from "@/components/Atoms/auth/auth-error-message";
import { AuthServerError } from "@/components/Atoms/auth/auth-server-error";
import { Button } from "@/components/Atoms/button";
import { validateEmail, validatePassword } from "@/lib/auth-validation";
import { setAccessTokenCookie } from "@/lib/auth-cookie";
import { signIn, getApiErrorMessage } from "@/lib/api";
import { useAuth } from "@/context/Authcontext";

interface SignInErrors {
  email?: string;
  password?: string;
}

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fields, setFields] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<SignInErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { mutate, isPending, error: mutationError } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      const token = data?.accessToken;
      const apiUser = (data as any)?.user;

      // Always clear any previous session's data before writing the new user's
      // data — this prevents stale data from a prior account leaking into the
      // new session (e.g. when switching accounts without a full page reload).
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAuthenticated");

      if (token) {
        setAccessTokenCookie(token);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("isAuthenticated", "true");
      }

      if (apiUser) {
        const normalizedUser = {
          _id: apiUser._id ?? apiUser.id ?? "",
          fullname: apiUser.fullname ?? "",
          email: apiUser.email ?? "",
          avatar: apiUser.avatar ?? undefined,
        };
        setUser(normalizedUser);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
      } else {
        // Backend didn't return a user object in the login response.
        // Clear the query cache so initialData doesn't serve the previous
        // account's cached user — the fresh /me fetch will populate it.
        setUser(null);
      }

      router.push("/dashboard");
    },
  });

  // Extract a readable server error message
  const serverError = mutationError ? getApiErrorMessage(mutationError, "Sign in failed. Please try again.") : null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = name === "email" ? validateEmail(value) : validatePassword(value);
      setFieldErrors((prev) => ({ ...prev, [name]: err }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = name === "email" ? validateEmail(value) : validatePassword(value);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: SignInErrors = {
      email: validateEmail(fields.email),
      password: validatePassword(fields.password),
    };
    setFieldErrors(next);
    setTouched({ email: true, password: true });
    if (next.email || next.password) return;
    mutate(fields);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end px-8 py-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </header>

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
                  error={fieldErrors.email}
                  errorId="email-error"
                  leftIcon={<MailIcon className="h-4 w-4" />}
                />
                <AuthErrorMessage id="email-error" message={fieldErrors.email} />
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
                  error={fieldErrors.password}
                  errorId="password-error"
                  leftIcon={<LockIcon className="h-4 w-4" />}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  }
                />
                <AuthErrorMessage id="password-error" message={fieldErrors.password} />
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

              {/* Server error */}
              {serverError && <AuthServerError message={serverError} />}

              <Button type="submit" className="h-11 w-full text-sm font-semibold" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : "Sign in"}
              </Button>
            </form>

            <AuthSecurityNote />
          </div>
        </div>
      </div>
    </div>
  );
}
