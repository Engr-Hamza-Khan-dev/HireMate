import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { CoverLettersList } from "@/components/Organism/cover-letters/cover-letters-list";

export const metadata: Metadata = { title: "Cover Letters" };

export default function CoverLetterPage() {
  return (
    <div className="space-y-6 p-4 pt-16 sm:p-6 sm:pt-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">My Cover Letters</h1>
          <p className="text-sm text-muted-foreground">
            AI-generated cover letters personalised to each job and company
          </p>
        </div>
      </div>

      <CoverLettersList />
    </div>
  );
}
