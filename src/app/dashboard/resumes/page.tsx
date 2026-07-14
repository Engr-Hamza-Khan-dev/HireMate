import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { ResumesList } from "@/components/Organism/resumes/resumes-list";

export const metadata: Metadata = { title: "Resumes" };

export default function ResumePage() {
  return (
    <div className="space-y-6 p-4 pt-16 sm:p-6 sm:pt-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">My Resumes</h1>
          <p className="text-sm text-muted-foreground">
            AI-generated, ATS-optimised resumes tailored to each job
          </p>
        </div>
      </div>

      <ResumesList />
    </div>
  );
}
