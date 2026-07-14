"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/Atoms/search-input";
import { Select } from "@/components/Atoms/jobs/job-select";

export type FilterBarProps = ComponentProps<"div"> & {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /** ISO 2-letter country code: "all" | "gb" | "us" | "au" … */
  countryValue?: string;
  onCountryChange?: (value: string) => void;
  /** Work-type dropdown: all | remote | onsite | hybrid */
  workTypeValue?: string;
  onWorkTypeChange?: (value: string) => void;
  jobTypeValue?: string;
  onJobTypeChange?: (value: string) => void;
  experienceValue?: string;
  onExperienceChange?: (value: string) => void;
  sortValue?: string;
  onSortChange?: (value: string) => void;
  /** When true, hides the search input (used on mobile) */
  hideSearch?: boolean;
};

export const COUNTRY_OPTIONS = [
  { value: "all", label: "🌍 All Countries" },
  { value: "au",  label: "🇦🇺 Australia" },
  { value: "be",  label: "🇧🇪 Belgium" },
  { value: "br",  label: "🇧🇷 Brazil" },
  { value: "ca",  label: "🇨🇦 Canada" },
  { value: "fr",  label: "🇫🇷 France" },
  { value: "de",  label: "🇩🇪 Germany" },
  { value: "in",  label: "🇮🇳 India" },
  { value: "it",  label: "🇮🇹 Italy" },
  { value: "mx",  label: "🇲🇽 Mexico" },
  { value: "nl",  label: "🇳🇱 Netherlands" },
  { value: "nz",  label: "🇳🇿 New Zealand" },
  { value: "pl",  label: "🇵🇱 Poland" },
  { value: "sg",  label: "🇸🇬 Singapore" },
  { value: "za",  label: "🇿🇦 South Africa" },
  { value: "es",  label: "🇪🇸 Spain" },
  { value: "gb",  label: "🇬🇧 United Kingdom" },
  { value: "us",  label: "🇺🇸 United States" },
];

const WORK_TYPE_OPTIONS = [
  { value: "all",    label: "All Work Types" },
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

const JOB_TYPE_OPTIONS = [
  { value: "all",       label: "All Job Types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract",  label: "Contract" },
];

const EXPERIENCE_OPTIONS = [
  { value: "any",    label: "Any Experience" },
  { value: "entry",  label: "Entry Level" },
  { value: "mid",    label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
];

const SORT_OPTIONS = [
  { value: "best",   label: "Best Match" },
  { value: "newest", label: "Newest" },
  { value: "salary", label: "Highest Salary" },
];

export function FilterBar({
  searchValue = "",
  onSearchChange,
  countryValue = "all",
  onCountryChange,
  workTypeValue = "all",
  onWorkTypeChange,
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
          className="w-full sm:w-64 lg:w-72"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      )}

      <div className="grid grid-cols-2 gap-2 sm:contents">
        {/* Country filter */}
        <Select
          options={COUNTRY_OPTIONS}
          placeholder="🌍 All Countries"
          className="w-full sm:w-44 lg:w-48"
          value={countryValue}
          onChange={(e) => onCountryChange?.(e.target.value)}
        />

        {/* Work type: Remote / On-site / Hybrid */}
        <Select
          options={WORK_TYPE_OPTIONS}
          placeholder="All Work Types"
          className="w-full sm:w-36 lg:w-40"
          value={workTypeValue}
          onChange={(e) => onWorkTypeChange?.(e.target.value)}
        />

        {/* Contract type */}
        <Select
          options={JOB_TYPE_OPTIONS}
          placeholder="All Job Types"
          className="w-full sm:w-36 lg:w-38"
          value={jobTypeValue}
          onChange={(e) => onJobTypeChange?.(e.target.value)}
        />

        {/* Experience level */}
        <Select
          options={EXPERIENCE_OPTIONS}
          placeholder="Any Experience"
          className="w-full sm:w-36 lg:w-38"
          value={experienceValue}
          onChange={(e) => onExperienceChange?.(e.target.value)}
        />

        {/* Sort */}
        <Select
          options={SORT_OPTIONS}
          placeholder="Best Match"
          className="w-full sm:w-32 lg:w-36"
          value={sortValue}
          onChange={(e) => onSortChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}
