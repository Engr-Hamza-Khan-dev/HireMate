"use client";

import { useRouter } from "next/navigation";
import { AuthOAuthButton } from "@/components/Atoms/auth/auth-oauth-button";

/* ─── Icons ──────────────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

/* ─── OAuth URLs ─────────────────────────────────────────────────── */
/**
 * In production replace these with your real OAuth provider URLs.
 * e.g. for Clerk:  /api/auth/oauth/google
 *      for NextAuth: /api/auth/signin/google
 *      for custom:  https://accounts.google.com/o/oauth2/v2/auth?...
 *
 * The callback should ultimately redirect to:
 *   /auth-success?provider=google&name=John+Doe&email=john@gmail.com
 */
const OAUTH_URLS = {
  google: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/google`,
} as const;

type AuthOAuthButtonsProps = {
  /** "sign-in" → "Continue with …"  |  "sign-up" → "Sign up with …" */
  variant?: "sign-in" | "sign-up";
};

/**
 * Molecule: Google OAuth button.
 * Clicking Google navigates to the Google OAuth flow which,
 * after verification, redirects to /auth-success.
 */
export function AuthOAuthButtons({ variant = "sign-in" }: AuthOAuthButtonsProps) {
  const router = useRouter();
  const prefix = variant === "sign-up" ? "Sign up with" : "Continue with";

  function handleGoogle() {
    // TODO: replace with real OAuth URL / Clerk / NextAuth handler
    router.push(OAUTH_URLS.google);
  }

  return (
    <div className="flex flex-col gap-3">
      <AuthOAuthButton
        icon={<GoogleIcon />}
        label={`${prefix} Google`}
        onClick={handleGoogle}
      />
    </div>
  );
}
