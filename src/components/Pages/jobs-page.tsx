"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JobsHeader } from "@/components/Organism/jobs/jobs-header";
import { JobsList } from "@/components/Organism/jobs/jobs-list";
import { JobDetails } from "@/components/Organism/jobs/job-details";
import { Button } from "@/components/Atoms/button";
import {
  fetchRecommendedJobs,
  searchJobs,
  triggerJobSync,
  RECOMMENDED_JOBS_QUERY_KEY,
  SEARCH_JOBS_QUERY_KEY,
  type Job,
} from "@/lib/jobs-api";

// Map frontend sort values → backend query param values
const SORT_MAP: Record<string, string> = {
  best:   "bestMatch",
  newest: "latest",
  oldest: "oldest",
  salary: "salary",
};

export default function JobsPage() {
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<string>("details");
  const [showDetailsMobile, setShowDetailsMobile] = useState(false);
  const [page, setPage] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    country: "all",
    workType: "all",
    jobType: "all",
    experience: "any",
    sort: "best",
  });

  // Debounce search input only
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    setFilters((f) => ({ ...f, search: value }));
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 400);
  }, []);

  // Derive the search params sent to the backend
  const searchParams = useMemo(() => {
    const hasActiveFilter =
      debouncedSearch ||
      filters.country !== "all" ||
      filters.workType !== "all" ||
      filters.jobType !== "all" ||
      filters.sort !== "best";

    if (!hasActiveFilter) return null; // use recommended endpoint

    return {
      keyword:      debouncedSearch || undefined,
      countryCode:  filters.country !== "all" ? filters.country : undefined,
      workType:     filters.workType !== "all" ? filters.workType : undefined,
      contractType: filters.jobType !== "all" ? filters.jobType : undefined,
      sort:         SORT_MAP[filters.sort] ?? "latest",
      page,
      limit:        20,
    };
  }, [debouncedSearch, filters.country, filters.workType, filters.jobType, filters.sort, page]);

  // Recommended jobs (no filters active)
  const {
    data: recommendedData,
    isLoading: recommendedLoading,
    isError: recommendedError,
    refetch: refetchRecommended,
  } = useQuery({
    queryKey: RECOMMENDED_JOBS_QUERY_KEY,
    queryFn: fetchRecommendedJobs,
    enabled: searchParams === null,
    staleTime: 5 * 60 * 1000, // 5 min
  });

  // Search results (filters active)
  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: SEARCH_JOBS_QUERY_KEY(searchParams ?? {}),
    queryFn: () => searchJobs(searchParams!),
    enabled: searchParams !== null,
    staleTime: 2 * 60 * 1000, // 2 min
  });

  const isLoading = searchParams ? searchLoading : recommendedLoading;
  const isError = searchParams ? searchError : recommendedError;

  const allJobs: Job[] = useMemo(() => {
    if (searchParams) {
      return searchData?.jobs ?? [];
    }
    return recommendedData ?? [];
  }, [searchParams, searchData, recommendedData]);

  // Client-side experience filter (no backend param for it)
  const filteredJobs = useMemo(() => {
    if (filters.experience === "any") return allJobs;
    return allJobs.filter((job) => {
      const exp = job.type.toLowerCase() + " " + job.title.toLowerCase();
      if (filters.experience === "entry") return exp.includes("junior") || exp.includes("entry");
      if (filters.experience === "mid") return exp.includes("mid") || exp.includes("senior") === false;
      if (filters.experience === "senior") return exp.includes("senior") || exp.includes("lead") || exp.includes("principal");
      return true;
    });
  }, [allJobs, filters.experience]);

  const totalPages = searchData?.pagination?.totalPages ?? 1;

  // Auto-select first job when the list changes
  useEffect(() => {
    if (filteredJobs.length > 0) {
      const stillSelected = selectedJob && filteredJobs.some((j) => j.id === selectedJob.id);
      if (!stillSelected) {
        setSelectedJob(filteredJobs[0]);
        setActiveTab("details");
      }
    } else {
      setSelectedJob(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredJobs]);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setActiveTab("details");
    setShowDetailsMobile(true);
  };

  // Trigger a fresh Adzuna sync, then re-fetch after a short delay
  // so the newly synced jobs are available in the DB.
  const handleRefresh = async () => {
    setIsSyncing(true);
    setPage(1);
    try {
      await triggerJobSync(); // 202 — sync is running in background on server
    } catch {
      // Non-critical — still re-fetch what's already in DB
    }
    // Give the server ~3 s head-start on the sync, then invalidate the cache
    setTimeout(async () => {
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsSyncing(false);
    }, 3000);
  };


  const handleLoadMore = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <div className="flex min-h-full mt-9 md:mt-0 flex-col">
      <JobsHeader
        searchValue={filters.search}
        onSearchChange={handleSearchChange}
        countryValue={filters.country}
        onCountryChange={(v) => { setFilters((f) => ({ ...f, country: v })); setPage(1); }}
        workTypeValue={filters.workType}
        onWorkTypeChange={(v) => { setFilters((f) => ({ ...f, workType: v })); setPage(1); }}
        jobTypeValue={filters.jobType}
        onJobTypeChange={(v) => { setFilters((f) => ({ ...f, jobType: v })); setPage(1); }}
        experienceValue={filters.experience}
        onExperienceChange={(v) => setFilters((f) => ({ ...f, experience: v }))}
        sortValue={filters.sort}
        onSortChange={(v) => { setFilters((f) => ({ ...f, sort: v })); setPage(1); }}
        onRefresh={handleRefresh}
        isSyncing={isSyncing}
      />

      {/* ── Desktop (lg+): side-by-side ── */}
      <div className="hidden lg:grid lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
        <div className="p-6">
          <JobsList
            jobs={filteredJobs}
            selectedJobId={selectedJob?.id}
            onSelectJob={handleSelectJob}
            isLoading={isLoading}
            isError={isError}
            currentPage={page}
            totalPages={totalPages}
            onLoadMore={handleLoadMore}
            sortMode={filters.sort}
          />
        </div>
        <div className="border-l p-6">
          {selectedJob && (
            <JobDetails
              job={selectedJob}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}
        </div>
      </div>

      {/* ── Tablet (md–lg): stacked ── */}
      <div className="hidden md:flex lg:hidden flex-col">
        <div className="border-b px-4 py-4">
          <JobsList
            jobs={filteredJobs}
            selectedJobId={selectedJob?.id}
            onSelectJob={handleSelectJob}
            isLoading={isLoading}
            isError={isError}
            currentPage={page}
            totalPages={totalPages}
            onLoadMore={handleLoadMore}
            sortMode={filters.sort}
          />
        </div>
        <div className="px-4 py-4">
          {selectedJob && (
            <JobDetails
              job={selectedJob}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}
        </div>
      </div>

      {/* ── Mobile (<md): list / detail one at a time ── */}
      <div className="flex md:hidden flex-col">
        {!showDetailsMobile ? (
          <div className="px-3 pb-6">
            <JobsList
              jobs={filteredJobs}
              selectedJobId={selectedJob?.id}
              onSelectJob={handleSelectJob}
              isLoading={isLoading}
              isError={isError}
              currentPage={page}
              totalPages={totalPages}
              onLoadMore={handleLoadMore}
              sortMode={filters.sort}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-3 py-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => setShowDetailsMobile(false)}
                aria-label="Back to job list"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="truncate text-sm font-medium text-foreground">
                {selectedJob?.title}
              </span>
            </div>
            <div className="px-3 py-4">
              {selectedJob && (
                <JobDetails
                  job={selectedJob}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
