import React from "react";
import SectionHeader from "@/components/Molecules/dashboard/section-header";
import JobListItem from "@/components/Molecules/dashboard/job-list-item";
import { ArrowRight } from "lucide-react";

type Job = {
  logo: React.ReactNode;
  title: string;
  company: string;
  location: string;
  match: string;
};

type TopMatchedJobsPanelProps = {
  jobs: Job[];
  onViewAll?: () => void;
  onBrowseAll?: () => void;
};

export default function TopMatchedJobsPanel({
  jobs,
  onViewAll,
  onBrowseAll,
}: TopMatchedJobsPanelProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <SectionHeader
        title="Top Matched Jobs"
        actionLabel="View all"
        onAction={onViewAll}
      />

      <div className="mt-3 divide-y divide-gray-100">
        {jobs.map((job, index) => (
          <JobListItem key={index} {...job} />
        ))}
      </div>

      <button
        onClick={onBrowseAll}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
      >
        Browse all jobs <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}