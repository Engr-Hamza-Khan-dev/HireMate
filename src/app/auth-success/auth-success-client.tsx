"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthLeftPanel } from "@/components/Molecules/auth/auth-left-panel";
import { AuthSuccessCard } from "@/components/Atoms/auth/auth-success-card";
import { AuthRedirectCountdown } from "@/components/Atoms/auth/auth-redirect-countdown";
import { useAuth } from "@/context/Authcontext";
import { setAccessTokenCookie } from "@/lib/auth-cookie";

const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
};

const REDIRECT_SECONDS = 3;

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export function AuthSuccessClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser, refetchUser } = useAuth();

  // Read everything from the URL — the backend sends this on redirect, no extra API call needed
  const token    = params.get("accessToken") ?? "";
  const provider = params.get("provider")    ?? "google";
  const fullname = params.get("name")        ?? "";
  const email    = params.get("email")       ?? "";
  const avatar   = params.get("avatar")      ?? "";

  useEffect(() => {
    if (!token) {
      router.replace("/sign-in");
      return;
    }

    // 1. Persist token for middleware and API calls
    setAccessTokenCookie(token);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("isAuthenticated", "true");

    // 2. Seed a minimal user from URL params for instant UI (no flicker)
    //    The real user object is fetched below — this is just a placeholder
    const partialUser = {
      _id: "",
      fullname,
      email,
      avatar: avatar || undefined,
    };
    setUser(partialUser);
    localStorage.setItem("user", JSON.stringify(partialUser));

    // 3. Fetch the canonical user from the backend so _id and all fields are correct
    //    This also ensures the sidebar and any other consumers get the real data
    refetchUser();

    // 4. Redirect after countdown
    const t = setTimeout(() => router.replace("/dashboard"), REDIRECT_SECONDS * 1000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel />

      <div className="flex flex-1 flex-col">
        <div className="h-16" aria-hidden="true" />

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-[420px] flex flex-col gap-6">

            <AuthSuccessCard
              title={fullname ? `Welcome, ${fullname.split(" ")[0]}!` : "Welcome!"}
              subtitle={`Signed in with ${PROVIDER_LABELS[provider] ?? provider} successfully.`}
            >
              <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={fullname}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-background"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {fullname ? fullname.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {fullname || "—"}
                  </p>
                  {email && (
                    <p className="truncate text-xs text-muted-foreground">{email}</p>
                  )}
                </div>
                <div className="ml-auto shrink-0">
                  {provider === "google" && <GoogleIcon />}
                </div>
              </div>
            </AuthSuccessCard>

            <AuthRedirectCountdown
              seconds={REDIRECT_SECONDS}
              label="Taking you to your dashboard"
            />

          </div>
        </div>
      </div>
    </div>
  );
}
