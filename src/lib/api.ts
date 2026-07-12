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
  async (error) => {
    const originalRequest =
      error.config;

    if (
      error.response?.status ===
      401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(
        "/refresh-token"
      )
    ) {
      originalRequest._retry =
        true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        return apiClient(
          originalRequest
        );
      } catch (err) {
        localStorage.removeItem(
          "accessToken"
        );
        localStorage.removeItem(
          "user"
        );

        if (
          window.location.pathname !==
          "/sign-in"
        ) {
          window.location.href =
            "/sign-in";
        }

        return Promise.reject(
          err
        );
      }
    }

    return Promise.reject(error);
  }
);

/* ─── Query functions ────────────────────────────────────────────── */

export async function fetchCurrentUser(): Promise<User> {
  const res = await apiClient.get("/api/v1/user/me");
  const raw = res.data.data ?? res.data;
  // Backend returns `id` (not `_id`) — normalise to match the User interface
  return {
    _id: raw._id ?? raw.id ?? "",
    fullname: raw.fullname ?? "",
    email: raw.email ?? "",
    avatar: raw.avatar ?? undefined,
    isVerified: raw.isverified ?? raw.isVerified ?? false,
  };
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
