"use client";

import { ChevronDown, SearchX, Loader2, AlertCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { JobCard } from "@/components/Molecules/jobs/job-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/Atoms/button";
import type { Job } from "@/lib/jobs-api";

export type JobsListProps = ComponentProps<"aside"> & {
  jobs: Job[];
  selectedJobId?: string;
  onSelectJob?: (job: Job) => void;
  isLoading?: boolean;
  isError?: boolean;
  currentPage?: number;
  totalPages?: number;
  onLoadMore?: () => void;
  /** Controls the list heading — "best" | "newest" | "salary" | "oldest" */
  sortMode?: string;
};

export function JobsList({
  jobs,
  selectedJobId,
  onSelectJob,
  isLoading,
  isError,
  currentPage = 1,
  totalPages = 1,
  onLoadMore,
  sortMode = "best",
  className,
}: JobsListProps) {
  const hasMore = currentPage < totalPages;

  const heading =
    sortMode === "newest" ? "Latest Jobs" :
    sortMode === "salary" ? "Highest Salary" :
    sortMode === "oldest" ? "Oldest First" :
    "Top Matches for You";

  const badgeLabel =
    sortMode === "newest" ? `${jobs.length} New` : `${jobs.length} Jobs`;

  return (
    <aside className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-foreground">
            {heading}
          </h2>
          {!isLoading && !isError && jobs.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {badgeLabel}
            </Badge>
          )}
        </div>
      </div>

      {isLoading ? (
        /* Loading skeleton */
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border bg-muted/30 p-4 h-28"
            />
          ))}
        </div>
      ) : isError ? (
        /* Error state */
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <AlertCircle className="h-8 w-8 text-destructive/60" />
          <p className="text-sm font-medium text-foreground">Failed to load jobs</p>
          <p className="text-xs text-muted-foreground">
            Check your connection or try refreshing.
          </p>
        </div>
      ) : jobs.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <SearchX className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm font-medium text-foreground">No jobs found</p>
          <p className="text-xs text-muted-foreground">
            Try adjusting your filters or search term
          </p>
        </div>
      ) : (
        /* Job list */
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
      )}

      {/* Load more button */}
      {!isLoading && !isError && hasMore && jobs.length > 0 && (
        <div className="pt-4">
          <Button variant="outline" className="w-full" onClick={onLoadMore}>
            Load More
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Loading more indicator */}
      {isLoading && jobs.length > 0 && (
        <div className="flex justify-center pt-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}
    </aside>
  );
}
