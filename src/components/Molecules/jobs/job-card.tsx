"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "@/components/Atoms/jobs/job-company-logo";
import { JobMeta } from "@/components/Atoms/jobs/job-meta";
import { MatchBadge } from "@/components/Atoms/match-badge";
import type { Job } from "@/lib/jobs-api";

export type JobCardProps = ComponentProps<"button"> & {
  job: Job;
  isSelected?: boolean;
  onSelect?: () => void;
};

export function JobCard({ job, isSelected = false, onSelect, className }: JobCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-3 transition-all",
        "hover:shadow-sm",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:bg-muted/30",
        className
      )}
    >
      <CompanyLogo
        src={job.companyLogo || ""}
        alt={job.company}
        size="sm"
        className="shrink-0"
      />
      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-medium text-foreground">{job.title}</p>
        <p className="truncate text-xs text-muted-foreground">{job.company}</p>
        <JobMeta items={[job.location, job.type, job.salary].filter(Boolean) as string[]} className="mt-1" />
      </div>
      {job.matchPercentage > 0 && (
        <MatchBadge percentage={job.matchPercentage} variant="success" showLabel={false} />
      )}
    </button>
  );
}