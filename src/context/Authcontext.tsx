"use client";

import { createContext, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clearAccessTokenCookie } from "@/lib/auth-cookie";
import { fetchCurrentUser, apiClient } from "@/lib/api";

/* ─── User type ─────────────────────────────────────────────────── */
export interface User {
  _id: string;
  fullname: string;
  email: string;
  avatar?: string;
  isVerified?: boolean;
}

/* ─── Query key ─────────────────────────────────────────────────── */
export const USER_QUERY_KEY = ["currentUser"] as const;

/* ─── Helpers ────────────────────────────────────────────────────── */
function getUserFromStorage(): User | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

/* ─── Context shape ─────────────────────────────────────────────── */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

/* ─── Context ────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextType | null>(null);

/* ─── Provider ───────────────────────────────────────────────────── */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchCurrentUser,
    // Seed from localStorage immediately so UI renders without a flash
    initialData: () => (typeof window !== "undefined" ? getUserFromStorage() : null),
    // Don't treat cached localStorage data as stale for 60 s
    initialDataUpdatedAt: () =>
      typeof window !== "undefined" && localStorage.getItem("user")
        ? Date.now() - 10_000   // 10 s old — will revalidate in background
        : 0,
    staleTime: 60_000,
    retry: 1,
  });

  // Keep localStorage in sync with whatever TanStack Query fetches
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const setUser = (u: User | null) => {
    queryClient.setQueryData(USER_QUERY_KEY, u);
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
  };

  const refetchUser = async () => {
    await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
  };

  const logout = async () => {
    try {
      await apiClient.post("/api/v1/user/logout");
    } catch {
      // ignore — clear client state regardless
    } finally {
      queryClient.setQueryData(USER_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
      clearAccessTokenCookie();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      window.location.href = "/sign-in";
    }
  };

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, loading: isLoading, refetchUser, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ─── Hook ───────────────────────────────────────────────────────── */
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
