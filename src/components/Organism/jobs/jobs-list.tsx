"use client";

import { ChevronDown, SearchX } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { JobCard } from "@/components/Molecules/jobs/job-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/Atoms/button";
import type { Job } from "@/lib/data/jobs";

export type JobsListProps = ComponentProps<"aside"> & {
  jobs: Job[];
  selectedJobId?: string;
  onSelectJob?: (job: Job) => void;
};

export function JobsList({
  jobs,
  selectedJobId,
  onSelectJob,
  className,
}: JobsListProps) {
  return (
    <aside className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-foreground">
            Latest Jobs for You
          </h2>
          <Badge variant="secondary" className="text-xs">
            125 New
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <SearchX className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">No jobs found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your filters or search term</p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSelected={job.id === selectedJobId}
              onSelect={() => onSelectJob?.(job)}
            />
          ))
        )}
      </div>
      {jobs.length > 0 && (
        <div className="pt-4">
          <Button variant="outline" className="w-full">
            Load More
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </aside>
  );
}
