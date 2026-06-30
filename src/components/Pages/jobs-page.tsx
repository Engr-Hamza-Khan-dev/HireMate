"use client";

import { useState, useMemo, useEffect } from "react";
import { JobsHeader } from "@/components/Organism/jobs-header";
import { JobsList } from "@/components/Organism/jobs-list";
import { JobDetails } from "@/components/Organism/job-details";
import { JOBS } from "@/lib/data/jobs";
import type { Job } from "@/lib/data/jobs";

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<Job>(JOBS[0]);
  const [activeTab, setActiveTab] = useState<string>("details");
  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    jobType: "all",
    experience: "any",
    sort: "best",
  });

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesSearch =
        !filters.search ||
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLocation =
        filters.location === "all" || job.location === filters.location;
      const matchesType =
        filters.jobType === "all" || job.type.toLowerCase() === filters.jobType;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [filters]);

  useEffect(() => {
    if (selectedJob && !filteredJobs.some((j) => j.id === selectedJob.id)) {
      setSelectedJob(filteredJobs[0] || JOBS[0]);
    }
  }, [filteredJobs, selectedJob]);

  return (
    <div className="flex h-full flex-col">
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
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[420px_1fr] lg:gap-px overflow-hidden">
        <div className="h-[50vh] overflow-y-auto p-4 lg:h-full lg:p-6">
          <JobsList
            jobs={filteredJobs}
            selectedJobId={selectedJob?.id}
            onSelectJob={setSelectedJob}
          />
        </div>
        <div className="flex-1 overflow-y-auto border-t lg:border-t-0 lg:border-l p-4 lg:p-6">
          {selectedJob && (
            <JobDetails
              job={selectedJob}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}
        </div>
      </div>
    </div>
  );
}