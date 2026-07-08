import axios from "axios";
import { User } from "@/context/Authcontext";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// Attach accessToken from localStorage on every request (OAuth flow)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error responses — extract the backend message and throw a plain Error
// so every useMutation gets a clean, readable error instead of axios internals
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error?.response?.data;

    let message: string | undefined;

    if (typeof data === "string" && data.includes("<")) {
      // Backend returned an HTML error page — extract text from <pre> or <body>
      const pre = data.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
      const body = data.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const raw = (pre?.[1] ?? body?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
      message = raw || undefined;
    } else if (typeof data === "object" && data !== null) {
      message =
        data?.message
        ?? data?.error
        ?? data?.msg
        ?? data?.detail
        ?? (Array.isArray(data?.errors)
          ? (data.errors[0]?.message ?? data.errors[0]?.msg)
          : undefined)
        ?? data?.data?.message;
    }

    return Promise.reject(new Error(message ?? "Something went wrong. Please try again."));
  }
);

/* ─── Query functions ────────────────────────────────────────────── */

export async function fetchCurrentUser(): Promise<User> {
  const res = await apiClient.get("/api/v1/user/me");
  return res.data.data ?? res.data;
}

/* ─── Mutation functions ─────────────────────────────────────────── */

export interface SignInPayload {
  email: string;
  password: string;
}
export interface SignInResult {
  accessToken?: string;
}
export async function signIn(payload: SignInPayload): Promise<SignInResult> {
  const res = await apiClient.post("/api/v1/user/login", payload);
  return res.data?.data ?? res.data;
}

export interface SignUpPayload {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export async function signUp(payload: SignUpPayload): Promise<void> {
  await apiClient.post("/api/v1/user/register", payload);
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}
export interface VerifyEmailResult {
  accessToken: string;
  safeUser: User;
}
export async function verifyEmail(payload: VerifyEmailPayload): Promise<VerifyEmailResult> {
  const res = await apiClient.post("/api/v1/user/verify-email", payload);
  return res.data.data;
}

export async function resendOtp(email: string): Promise<void> {
  await apiClient.post("/api/v1/user/resend-otp", { email });
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post("/api/v1/user/forgot-password", { email });
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmpassword: string;
}
export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await apiClient.post("/api/v1/user/reset-password", payload);
}

/* ─── Error helper ───────────────────────────────────────────────── */
// Errors from apiClient are already normalized by the response interceptor above.
// This helper is a safe fallback for any edge case.
export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (!error) return fallback;
  const message = (error as Error)?.message;
  // Ignore axios's generic transport-level message
  if (!message || message.startsWith("Request failed with status")) return fallback;
  return message;
}
