import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | HireMate",
    default: "HireMate",
  },
  description: "AI-Powered Career Success Starts Here.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
