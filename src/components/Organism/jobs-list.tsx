"use client";

import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { JobCard } from "@/components/Molecules/job-card";
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
    <aside className={cn("flex h-full flex-col", className)}>
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
      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSelected={job.id === selectedJobId}
              onSelect={() => onSelectJob?.(job)}
            />
          ))}
        </div>
      </div>
      <div className="pt-4">
        <Button variant="outline" className="w-full">
          Load More
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}