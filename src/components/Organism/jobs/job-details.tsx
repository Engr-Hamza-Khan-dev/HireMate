"use client";

import { Bookmark } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/Atoms/button";
import { JobTabs } from "@/components/Molecules/jobs/job-tabs";
import { ResumeCard } from "@/components/Molecules/jobs/job-resume-card";
import { CoverLetterCard } from "@/components/Molecules/jobs/job-cover-letter-card";
import { MatchAnalysisCard } from "@/components/Molecules/match-analysis-card";
import type { Job } from "@/lib/data/jobs";

export type JobDetailsProps = ComponentProps<"section"> & {
  job: Job;
  activeTab?: string;
  onTabChange?: (value: string) => void;
};

const TABS = [
  { value: "details", label: "Job Details" },
  { value: "resume", label: "Resume" },
  { value: "cover-letter", label: "Cover Letter" },
  { value: "analysis", label: "Match Analysis" },
];

export function JobDetails({
  job,
  activeTab = "details",
  onTabChange,
  className,
}: JobDetailsProps) {
  return (
    <section className={cn("flex flex-col", className)}>
      <div className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted sm:h-14 sm:w-14">
              <span className="text-base font-semibold text-foreground sm:text-lg">
                {job.company[0]}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">{job.title}</h2>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                <span>{job.company}</span>
                <span className="text-xs">✓</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:shrink-0">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button className="h-9 flex-1 bg-primary text-xs hover:bg-primary/90 sm:flex-none sm:text-sm">
              Apply on Company Site
            </Button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1 text-xs text-muted-foreground sm:text-sm">
          <span>{job.location}</span>
          <span>•</span>
          <span>{job.type}</span>
          <span>•</span>
          <span>{job.experience} experience</span>
          <span>•</span>
          <span>{job.salary}</span>
          <span>•</span>
          <span>{job.postedAt}</span>
        </div>
        <div className="mt-3">
          <Badge variant="secondary" className="bg-success/10 text-success">
            {job.matchPercentage}% Match
          </Badge>
        </div>
      </div>

      <JobTabs
        tabs={TABS}
        value={activeTab}
        onTabChange={onTabChange}
        className="mb-4"
      />

      <div className="">
        {activeTab === "details" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                About the role
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job.description} We're looking for someone who can take ownership of
                features from start to finish, working closely with our design and
                product teams to ship high-quality experiences.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#"
              className="inline-block text-sm font-medium text-primary hover:underline"
            >
              Show More
            </a>
          </div>
        )}

        {activeTab === "resume" && (
          <div>
            <ResumeCard
              jobTitle={job.title}
              matchPercentage={job.matchPercentage}
            />
          </div>
        )}

        {activeTab === "cover-letter" && (
          <div>
            <CoverLetterCard
              jobTitle={job.title}
              company={job.company}
              matchPercentage={job.matchPercentage}
            />
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="pr-2 -mr-2">
            <MatchAnalysisCard />
          </div>
        )}
      </div>

      {activeTab === "details" && (
        <div className="mt-4 rounded-xl bg-brand-50 p-4">
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="Tip">
              ✨
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground">Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your profile is {job.matchPercentage}% matched with this job. Apply now
                to increase your chances!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}