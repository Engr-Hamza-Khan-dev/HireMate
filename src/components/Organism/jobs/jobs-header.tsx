"use client";

import { RefreshCw, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Atoms/button";
import { FilterBar } from "@/components/Molecules/jobs/job-filter-bar";
import { SearchInput } from "@/components/Atoms/search-input";

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
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <header className={cn("flex flex-col gap-3 border-b p-3 md:p-4 lg:gap-4 lg:p-6 lg:pb-4", className)}>
      {/* Title row */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-foreground lg:text-2xl">Jobs</h1>
          <p className="hidden text-sm text-muted-foreground mt-0.5 sm:block">
            AI finds the best job opportunities that match your profile.
          </p>
        </div>
        <Button variant="outline" className="h-9 shrink-0 text-xs sm:h-11 sm:text-sm">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Refetch Latest Jobs</span>
          <span className="sm:hidden">Refresh</span>
        </Button>
      </div>

      {/* ── Mobile: search + filter toggle ── */}
      <div className="flex items-center gap-2 md:hidden">
        <SearchInput
          placeholder="Search jobs..."
          className="flex-1"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 shrink-0"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-label="Toggle filters"
        >
          {filtersOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile expanded filters (search excluded, handled above) */}
      {filtersOpen && (
        <div className="flex flex-col gap-2 md:hidden">
          <FilterBar
            hideSearch
            locationValue={locationValue}
            onLocationChange={onLocationChange}
            jobTypeValue={jobTypeValue}
            onJobTypeChange={onJobTypeChange}
            experienceValue={experienceValue}
            onExperienceChange={onExperienceChange}
            sortValue={sortValue}
            onSortChange={onSortChange}
          />
        </div>
      )}

      {/* ── Tablet / Desktop: full filter bar ── */}
      <div className="hidden md:block">
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
      </div>
    </header>
  );
}