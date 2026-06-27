import type { Metadata } from "next";
import { AppSidebar } from "@/components/Organism/app-sidebar";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | AI Resume Pro",
    default: "AI Resume Pro",
  },
  description: "Build, manage and export professional resumes powered by AI.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Route-group layout for all /(dashboard)/* pages.
 * Renders the persistent sidebar alongside the page content.
 * Server Component — AppSidebar handles its own "use client" boundary.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-sidebar">
      <AppSidebar />

      {/*
       * Skip-to-content anchor for keyboard / screen-reader users.
       * Target id="main-content" must exist on the <main> below.
       */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-violet-500"
      >
        Skip to content
      </a>

      <main
        id="main-content"
        className="flex flex-1 flex-col overflow-y-auto focus-visible:outline-none"
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}
