"use client";

import { RefreshCw } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Atoms/button";
import { FilterBar } from "@/components/Molecules/job-filter-bar";

export type JobsHeaderProps = ComponentProps<"header"> & {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  locationValue?: string;
  onLocationChange?: (value: string) => void;
  jobTypeValue?: string;
  onJobTypeChange?: (value: string) => void;
  experienceValue?: string;
  onExperienceChange?: (value: string) => void;
  sortValue?: string;
  onSortChange?: (value: string) => void;
};

export function JobsHeader({
  searchValue,
  onSearchChange,
  locationValue,
  onLocationChange,
  jobTypeValue,
  onJobTypeChange,
  experienceValue,
  onExperienceChange,
  sortValue,
  onSortChange,
  className,
}: JobsHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4 p-4 pb-4 lg:p-6 lg:pb-4", className)}>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jobs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI finds the best job opportunities that match your profile.
          </p>
        </div>
        <Button variant="outline" className="h-11">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refetch Latest Jobs
        </Button>
      </div>
      <FilterBar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        locationValue={locationValue}
        onLocationChange={onLocationChange}
        jobTypeValue={jobTypeValue}
        onJobTypeChange={onJobTypeChange}
        experienceValue={experienceValue}
        onExperienceChange={onExperienceChange}
        sortValue={sortValue}
        onSortChange={onSortChange}
      />
    </header>
  );
}