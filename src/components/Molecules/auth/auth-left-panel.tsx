"use client";

import { BriefcaseIcon, FileTextIcon, SearchIcon, ArrowUpDownIcon } from "lucide-react";

export function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-1/2 min-h-screen bg-[#EFF6FF] px-10 py-10 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
          <BriefcaseIcon className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-semibold text-foreground">
          HireMate <span className="text-[#2563EB]">AI</span>
        </span>
      </div>

      {/* Hero Text */}
      <div className="flex-1 flex flex-col justify-center gap-8 py-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground leading-snug">
            AI-Powered{" "}
            <span className="text-[#2563EB]">Career Success</span>{" "}
            Starts Here
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Discover the best jobs, create tailored resumes, and land your dream
            job faster with AI.
          </p>
        </div>

        {/* Feature list */}
        <ul className="flex flex-col gap-5">
          <li className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
              <FileTextIcon className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AI Resume Builder</p>
              <p className="text-xs text-muted-foreground">
                Create ATS-friendly resumes tailored to each job.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
              <SearchIcon className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Smart Job Matching</p>
              <p className="text-xs text-muted-foreground">
                Find jobs that match your skills and experience.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
              <ArrowUpDownIcon className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Application Tracking</p>
              <p className="text-xs text-muted-foreground">
                Track your applications and never miss an update.
              </p>
            </div>
          </li>
        </ul>

        {/* Decorative dashboard mockup */}
        <div className="relative mt-4">
          <div className="rounded-xl border border-border bg-white shadow-sm p-4 text-[10px] text-muted-foreground space-y-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="h-2 w-3/4 rounded bg-[#DBEAFE]" />
            <div className="h-2 w-1/2 rounded bg-[#BFDBFE]" />
            <div className="h-12 w-full rounded bg-[#EFF6FF] mt-1" />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground">
        © 2026 HireMate AI. All rights reserved.
      </p>
    </div>
  );
}
