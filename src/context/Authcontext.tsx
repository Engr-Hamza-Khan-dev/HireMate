"use client";

import {
  createContext,
  useContext,
} from "react";
import { usePathname } from "next/navigation";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { clearAccessTokenCookie } from "@/lib/auth-cookie";
import {
  fetchCurrentUser,
  apiClient,
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
  const queryClient =
    useQueryClient();

  const pathname = usePathname();

  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify",
    "/forgot-password",
    "/reset-password",
  ];

  const shouldFetchUser =
    typeof window !== "undefined" &&
    !!localStorage.getItem(
      "accessToken"
    ) &&
    !publicRoutes.includes(
      pathname
    );

  const {
    data: user,
    isLoading,
  } = useQuery<User | null>({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchCurrentUser,
    enabled: shouldFetchUser,
    retry: 1,
    initialData: () =>
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

  const refetchUser =
    async () => {
      await queryClient.invalidateQueries(
        {
          queryKey:
            USER_QUERY_KEY,
        }
      );
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