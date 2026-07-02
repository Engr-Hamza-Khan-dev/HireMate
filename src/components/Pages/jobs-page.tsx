"use client";

import { useState, useMemo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { JobsHeader } from "@/components/Organism/jobs/jobs-header";
import { JobsList } from "@/components/Organism/jobs/jobs-list";
import { JobDetails } from "@/components/Organism/jobs/job-details";
import { Button } from "@/components/Atoms/button";
import { JOBS } from "@/lib/data/jobs";
import type { Job } from "@/lib/data/jobs";

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<Job>(JOBS[0]);
  const [activeTab, setActiveTab] = useState<string>("details");
  // Controls mobile detail view visibility
  const [showDetailsMobile, setShowDetailsMobile] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    jobType: "all",
    experience: "any",
    sort: "best",
  });

  const filteredJobs = useMemo(() => {
    let jobs = JOBS.filter((job) => {
      const matchesSearch =
        !filters.search ||
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());

      // Location: match by isRemote flag or partial city name
      const matchesLocation =
        filters.location === "all" ||
        (filters.location === "remote" && job.isRemote) ||
        (filters.location === "onsite" && !job.isRemote) ||
        (filters.location === "hybrid" &&
          job.location.toLowerCase().includes("hybrid"));

      // Job type: normalise both sides (strip hyphens/spaces, lowercase)
      const normalise = (s: string) => s.toLowerCase().replace(/[-\s]/g, "");
      const matchesType =
        filters.jobType === "all" ||
        normalise(job.type) === normalise(filters.jobType);

      // Experience: map option values to keywords in the experience string
      const matchesExperience =
        filters.experience === "any" ||
        (filters.experience === "entry" &&
          (job.experience.includes("0") ||
            job.experience.includes("1") ||
            job.experience.includes("2"))) ||
        (filters.experience === "mid" &&
          (job.experience.includes("2") ||
            job.experience.includes("3") ||
            job.experience.includes("4"))) ||
        (filters.experience === "senior" &&
          (job.experience.includes("4") ||
            job.experience.includes("5") ||
            job.experience.includes("6")));

      return (
        matchesSearch && matchesLocation && matchesType && matchesExperience
      );
    });

    // Sort
    if (filters.sort === "newest") {
      // Jobs already have relative times; sort by matchPercentage as proxy
      // In real data you'd sort by date — here we reverse insertion order
      jobs = [...jobs].reverse();
    } else if (filters.sort === "best") {
      jobs = [...jobs].sort((a, b) => b.matchPercentage - a.matchPercentage);
    }
    // "salary" sort would need parsed salary — skip for now

    return jobs;
  }, [filters]);

  useEffect(() => {
    if (selectedJob && !filteredJobs.some((j) => j.id === selectedJob.id)) {
      setSelectedJob(filteredJobs[0] || JOBS[0]);
    }
  }, [filteredJobs, selectedJob]);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setActiveTab("details");
    setShowDetailsMobile(true);
  };

  return (
    <div className="flex min-h-full mt-9 md:mt-0 flex-col">
      <JobsHeader
        searchValue={filters.search}
        onSearchChange={(v) => setFilters((f) => ({ ...f, search: v }))}
        locationValue={filters.location}
        onLocationChange={(v) => setFilters((f) => ({ ...f, location: v }))}
        jobTypeValue={filters.jobType}
        onJobTypeChange={(v) => setFilters((f) => ({ ...f, jobType: v }))}
        experienceValue={filters.experience}
        onExperienceChange={(v) => setFilters((f) => ({ ...f, experience: v }))}
        sortValue={filters.sort}
        onSortChange={(v) => setFilters((f) => ({ ...f, sort: v }))}
      />

      {/* ── Desktop (lg+): side-by-side, both columns grow with content ── */}
      <div className="hidden lg:grid lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
        {/* Left: job list — full natural height, no inner scroll */}
        <div className="p-6">
          <JobsList
            jobs={filteredJobs}
            selectedJobId={selectedJob?.id}
            onSelectJob={handleSelectJob}
          />
        </div>
        {/* Right: job details — full natural height, no inner scroll */}
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

      {/* ── Tablet (md–lg): stacked, both sections grow naturally ── */}
      <div className="hidden md:flex lg:hidden flex-col">
        <div className="border-b px-4 py-4">
          <JobsList
            jobs={filteredJobs}
            selectedJobId={selectedJob?.id}
            onSelectJob={handleSelectJob}
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

      {/* ── Mobile (<md): list view / detail view (one at a time) ── */}
      <div className="flex md:hidden flex-col">
        {!showDetailsMobile ? (
          /* List view — natural height, page scrolls */
          <div className="px-3 pb-6">
            <JobsList
              jobs={filteredJobs}
              selectedJobId={selectedJob?.id}
              onSelectJob={handleSelectJob}
            />
          </div>
        ) : (
          /* Detail view — natural height, page scrolls */
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
