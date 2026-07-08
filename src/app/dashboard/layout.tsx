import type { Metadata } from "next";
import { AppSidebar } from "@/components/Organism/app-sidebar";
import { Geist } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | HireMate",
    default: "HireMate",
  },
  description: "Build, manage and export professional resumes powered by AI.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Route-group layout for all /dashboard/* pages.
 * AuthProvider lives in the root layout — no need to wrap again here.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-sidebar">
        <AppSidebar />

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
    </TooltipProvider>
  );
}
