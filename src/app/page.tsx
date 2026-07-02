import type { Metadata } from "next";
import LandingPage from "@/components/Organism/landing";

export const metadata: Metadata = {
  title: "HireMate AI — Land Your Dream Job Faster",
  description:
    "AI-powered tools to find the right jobs, create ATS-friendly resumes, and write personalised cover letters in minutes.",
};

export default function RootPage() {
  return <LandingPage />;
}
