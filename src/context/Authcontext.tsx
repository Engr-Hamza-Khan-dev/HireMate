"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  clearAccessTokenCookie,
  onAccessTokenChange,
} from "@/lib/auth-cookie";
import {
  apiClient,
  fetchCurrentUser,
} from "@/lib/api";

export interface User {
  _id: string;
  fullname: string;
  email: string;
  avatar?: string;
  isVerified?: boolean;
}

export const USER_QUERY_KEY = ["currentUser"] as const;

function getUserFromStorage(): User | null {
  try {
    const raw = localStorage.getItem("user");
    return raw
      ? (JSON.parse(raw) as User)
      : null;
  } catch {
    return null;
  }
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const pathname = usePathname();

  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify",
    "/forgot-password",
    "/reset-password",
  ];

  const [hasAccessToken, setHasAccessToken] = useState(
    typeof window !== "undefined" &&
      !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHasAccessToken(
      !!localStorage.getItem("accessToken")
    );
    return onAccessTokenChange(() => {
      setHasAccessToken(
        !!localStorage.getItem("accessToken")
      );
    });
  }, []);

  const shouldFetchUser =
    typeof window !== "undefined" &&
    hasAccessToken &&
    !publicRoutes.includes(pathname);

  const {
    data: user,
    isLoading,
  } = useQuery<User | null>({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchCurrentUser,
    enabled: shouldFetchUser,
    retry: 1,
    // Use placeholderData (not initialData) so React Query always treats the
    // stored value as stale and immediately fires a fresh /me fetch on mount.
    // initialData would mark the cached value as fresh for staleTime (5 min),
    // which caused the previous account's data to show after switching accounts.
    placeholderData: () =>
      typeof window !== "undefined"
        ? getUserFromStorage()
        : null,
  });

  const setUser = (
    u: User | null
  ) => {
    queryClient.setQueryData(
      USER_QUERY_KEY,
      u
    );

    if (u) {
      localStorage.setItem(
        "user",
        JSON.stringify(u)
      );
    } else {
      localStorage.removeItem(
        "user"
      );
    }
  };

  const refetchUser = async () => {
    await queryClient.invalidateQueries({
      queryKey: USER_QUERY_KEY,
    });
    await queryClient.refetchQueries({
      queryKey: USER_QUERY_KEY,
      exact: true,
    });
  };

  const logout = async () => {
    try {
      await apiClient.post(
        "/api/v1/user/logout"
      );
    } catch { }

    queryClient.setQueryData(
      USER_QUERY_KEY,
      null
    );
    queryClient.clear();

    localStorage.removeItem(
      "user"
    );
    localStorage.removeItem(
      "accessToken"
    );
    localStorage.removeItem(
      "isAuthenticated"
    );

    clearAccessTokenCookie();

    window.location.href =
      "/sign-in";
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading: isLoading,
        refetchUser,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx =useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return ctx;
}