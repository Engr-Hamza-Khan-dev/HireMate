"use client";

import { useState, useEffect } from "react";
import { Bookmark, ExternalLink, Loader2 } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/Atoms/button";
import { JobTabs } from "@/components/Molecules/jobs/job-tabs";
import { ResumeCard } from "@/components/Molecules/jobs/job-resume-card";
import { CoverLetterCard } from "@/components/Molecules/jobs/job-cover-letter-card";
import { MatchAnalysisCard } from "@/components/Molecules/match-analysis-card";
import { CompanyLogo } from "@/components/Atoms/jobs/job-company-logo";
import { fetchJobDescription } from "@/lib/jobs-api";
import type { Job } from "@/lib/jobs-api";

// Render structured description text (## headings, • bullets, paragraphs)
function DescriptionRenderer({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (!lines.length) return null;

        // Section heading
        if (lines[0].startsWith("## ")) {
          const heading = lines[0].replace(/^## /, "");
          const rest = lines.slice(1);
          const bullets = rest.filter((l) => /^[•·▪‣▸\-–—*]\s|^\d+\.\s/.test(l));
          const paras = rest.filter((l) => !/^[•·▪‣▸\-–—*]\s|^\d+\.\s/.test(l));

          return (
            <div key={i}>
              <h4 className="text-sm font-semibold text-foreground mb-2">{heading}</h4>
              {bullets.length > 0 && (
                <ul className="space-y-1 mb-2">
                  {bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-muted-foreground">
                        {b.replace(/^[•·▪‣▸\-–—*]\s|\d+\.\s/, "")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {paras.map((p, j) => (
                <p key={j} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          );
        }

        // Bullet list block (no heading)
        const isBullets = lines.every((l) => /^[•·▪‣▸\-–—*]\s|^\d+\.\s/.test(l));
        if (isBullets) {
          return (
            <ul key={i} className="space-y-1">
              {lines.map((b, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">
                    {b.replace(/^[•·▪‣▸\-–—*]\s|\d+\.\s/, "")}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        // Regular paragraph
        return (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            {lines.join(" ")}
          </p>
        );
      })}
    </div>
  );
}

type JobDetailsProps = {
  job: Job;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
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
  const matchDisplay = job.matchPercentage > 0 ? `${job.matchPercentage}% Match` : null;

  // Fetch full description when job changes
  const [fullDescription, setFullDescription] = useState<string | null>(null);
  const [descLoading, setDescLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFullDescription(null);
    setDescLoading(true);

    fetchJobDescription(job.id).then((desc) => {
      if (!cancelled) {
        setFullDescription(desc);
        setDescLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [job.id]);

  // Use full scraped description if available, fall back to Adzuna snippet
  const displayDescription = fullDescription || job.description;

  return (
    <section className={cn("flex flex-col", className)}>
      <div className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <CompanyLogo
              src={job.companyLogo || undefined}
              alt={job.company}
              size="lg"
              className="shrink-0"
            />
            <div>
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">{job.title}</h2>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                <span>{job.company}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:shrink-0">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bookmark className="h-4 w-4" />
            </Button>
            {job.url ? (
              <Button
                className="h-9 flex-1 bg-primary text-xs hover:bg-primary/90 sm:flex-none sm:text-sm"
                asChild
              >
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  Apply on Company Site
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
            ) : (
              <Button className="h-9 flex-1 bg-primary text-xs hover:bg-primary/90 sm:flex-none sm:text-sm" disabled>
                Apply on Company Site
              </Button>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1 text-xs text-muted-foreground sm:text-sm">
          {job.location && <><span>{job.location}</span><span>•</span></>}
          {job.type && <><span>{job.type}</span><span>•</span></>}
          {job.salary && <><span>{job.salary}</span><span>•</span></>}
          <span>{job.postedAt}</span>
        </div>

        {matchDisplay && (
          <div className="mt-3">
            <Badge variant="secondary" className="bg-success/10 text-success">
              {matchDisplay}
            </Badge>
          </div>
        )}
      </div>

      <JobTabs
        tabs={TABS}
        value={activeTab}
        onTabChange={onTabChange}
        className="mb-4"
      />

      <div>
        {activeTab === "details" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">About the role</h3>
              {descLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                  <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                  <span>Loading full description…</span>
                </div>
              ) : (
                <DescriptionRenderer text={displayDescription || "No description available."} />
              )}
            </div>

            {job.responsibilities.length > 0 && (
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
            )}

            {job.requirements.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View Full Job Posting
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}

        {activeTab === "resume" && (
          <ResumeCard
            jobTitle={job.title}
            jobId={job.id}
            matchPercentage={job.matchPercentage}
          />
        )}

        {activeTab === "cover-letter" && (
          <CoverLetterCard
            jobTitle={job.title}
            company={job.company}
            jobId={job.id}
            matchPercentage={job.matchPercentage}
          />
        )}

        {activeTab === "analysis" && (
          <div className="pr-2 -mr-2">
            <MatchAnalysisCard />
          </div>
        )}
      </div>

      {activeTab === "details" && matchDisplay && (
        <div className="mt-4 rounded-xl bg-brand-50 p-4">
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="Tip">✨</span>
            <div>
              <p className="text-xs font-semibold text-foreground">Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your profile is {job.matchPercentage}% matched with this job. Apply now to increase your chances!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
