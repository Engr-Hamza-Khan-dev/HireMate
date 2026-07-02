"use client";

import { Filter } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/Atoms/search-input";
import { Select } from "@/components/Atoms/job-select";
import { Button } from "@/components/Atoms/button";

export type FilterBarProps = ComponentProps<"div"> & {
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
  /** When true, hides the search input (used on mobile where search is rendered separately) */
  hideSearch?: boolean;
};

const LOCATION_OPTIONS = [
  { value: "all", label: "All Locations" },
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

const JOB_TYPE_OPTIONS = [
  { value: "all", label: "All Job Types" },
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

const EXPERIENCE_OPTIONS = [
  { value: "any", label: "Any Experience" },
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
];

const SORT_OPTIONS = [
  { value: "best", label: "Best Match" },
  { value: "newest", label: "Newest" },
  { value: "salary", label: "Highest Salary" },
];

export function FilterBar({
  searchValue = "",
  onSearchChange,
  locationValue = "all",
  onLocationChange,
  jobTypeValue = "all",
  onJobTypeChange,
  experienceValue = "any",
  onExperienceChange,
  sortValue = "best",
  onSortChange,
  hideSearch = false,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2",
        className
      )}
    >
      {!hideSearch && (
        <SearchInput
          placeholder="Search jobs, titles or companies..."
          className="w-full sm:w-72 lg:w-80"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      )}
      <div className="grid grid-cols-2 gap-2 sm:contents">
        <Select
          options={LOCATION_OPTIONS}
          placeholder="All Locations"
          className="w-full sm:w-36 lg:w-40"
          value={locationValue}
          onChange={(e) => onLocationChange?.(e.target.value)}
        />
        <Select
          options={JOB_TYPE_OPTIONS}
          placeholder="All Job Types"
          className="w-full sm:w-36 lg:w-40"
          value={jobTypeValue}
          onChange={(e) => onJobTypeChange?.(e.target.value)}
        />
        <Select
          options={EXPERIENCE_OPTIONS}
          placeholder="Any Experience"
          className="w-full sm:w-36 lg:w-40"
          value={experienceValue}
          onChange={(e) => onExperienceChange?.(e.target.value)}
        />
        <Select
          options={SORT_OPTIONS}
          placeholder="Best Match"
          className="w-full sm:w-32 lg:w-36"
          value={sortValue}
          onChange={(e) => onSortChange?.(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="hidden h-11 w-11 shrink-0 sm:flex sm:w-auto sm:px-4 sm:py-2.5"
      >
        <Filter className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Filters</span>
      </Button>
    </div>
  );
}