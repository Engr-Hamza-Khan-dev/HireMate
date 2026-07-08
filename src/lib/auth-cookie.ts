/**
 * Manages the client-side `accessToken` cookie.
 *
 * Why a client-set cookie instead of relying on the backend httpOnly one?
 * The backend runs on a different origin (e.g. localhost:5000) so its httpOnly
 * cookies are scoped to that origin and are never sent to Next.js middleware
 * running on localhost:3000. By writing the token into a same-origin cookie
 * here, the middleware can read it on every navigation request.
 *
 * Security note: this is NOT a replacement for the backend's httpOnly cookie —
 * that still guards your API. This cookie is only a routing signal for the
 * Next.js middleware.
 */

const COOKIE_NAME = "accessToken";
// 7 days
const MAX_AGE = 60 * 60 * 24 * 7;

export function setAccessTokenCookie(token: string) {
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function clearAccessTokenCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
