"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthTokenValidating } from "@/components/Atoms/auth/auth-token-validating";

/**
 * /auth/google
 *
 * In a real app this page would never render — the server would
 * immediately redirect to Google's OAuth consent screen.
 *
 * For demo purposes we simulate a 1.5 s "OAuth handshake" then
 * redirect to /auth-success with mock user data in the query string.
 *
 * When wiring up a real provider (Clerk / NextAuth / custom):
 *   - Replace this page with your provider's redirect handler.
 *   - Make sure the callback ultimately lands on /auth-success
 *     with ?provider=google&name=…&email=…
 */
export default function GoogleOAuthPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      // Simulate a successful Google OAuth response
      const params = new URLSearchParams({
        provider: "google",
        name: "John Doe",
        email: "john.doe@gmail.com",
        avatar: "https://i.pravatar.cc/80?img=12",
      });
      router.replace(`/auth-success?${params.toString()}`);
    }, 1500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Google brand colours spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-border border-t-[#4285F4]" />
          <svg className="h-7 w-7" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Connecting with Google…</p>
          <p className="mt-1 text-xs text-muted-foreground">Verifying your account</p>
        </div>
        <AuthTokenValidating />
      </div>
    </div>
  );
}
