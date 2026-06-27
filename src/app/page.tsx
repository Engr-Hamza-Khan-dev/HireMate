import { redirect } from "next/navigation";

/**
 * Root route — immediately redirects to /dashboard.
 * Keeping this as a Server Component redirect avoids a client-side flash.
 */
export default function RootPage() {
  redirect("/dashboard/");
}