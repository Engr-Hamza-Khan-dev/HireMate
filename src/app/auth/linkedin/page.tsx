"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthTokenValidating } from "@/components/Atoms/auth/auth-token-validating";

export default function LinkedInOAuthPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams({
        provider: "linkedin",
        name: "Jane Smith",
        email: "jane.smith@linkedin.com",
        avatar: "https://i.pravatar.cc/80?img=47",
      });
      router.replace(`/auth-success?${params.toString()}`);
    }, 1500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-border border-t-[#0A66C2]" />
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Connecting with LinkedIn…</p>
          <p className="mt-1 text-xs text-muted-foreground">Verifying your account</p>
        </div>
        <AuthTokenValidating />
      </div>
    </div>
  );
}
