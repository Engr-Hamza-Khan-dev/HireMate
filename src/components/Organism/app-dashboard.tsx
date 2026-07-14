"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Bell, BriefcaseBusiness, FileText, FileCheck2,
  UserRound, CheckCircle2, Sparkles, Mail, PenSquare,
} from "lucide-react";

import WelcomeHeader from "@/components/Molecules/dashboard/welcome-header";
import StatCard from "@/components/Molecules/dashboard/statcard";
import SectionHeader from "@/components/Molecules/dashboard/section-header";
import JobListItem from "@/components/Molecules/dashboard/job-list-item";
import ActivityItem from "@/components/Molecules/dashboard/activity-item";
import ResumeCTA from "@/components/Molecules/dashboard/resume-ctx";
import { ResumesList } from "@/components/Organism/resumes/resumes-list";
import { fetchResumes, RESUMES_QUERY_KEY } from "@/lib/resume-api";
import { fetchPersonalInfo, PERSONAL_QUERY_KEY } from "@/lib/profile-api";
import { fetchRecommendedJobs, RECOMMENDED_JOBS_QUERY_KEY } from "@/lib/jobs-api";

export default function Dashboard() {
  const router = useRouter();

  const { data: personalInfo, isLoading: personalLoading } = useQuery({
    queryKey: PERSONAL_QUERY_KEY,
    queryFn: fetchPersonalInfo,
    staleTime: 60_000,
  });

  const { data: resumes = [], isLoading: resumesLoading } = useQuery({
    queryKey: RESUMES_QUERY_KEY,
    queryFn: fetchResumes,
    staleTime: 60_000,
  });

  const { data: recommendedJobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: RECOMMENDED_JOBS_QUERY_KEY,
    queryFn: fetchRecommendedJobs,
    staleTime: 60_000,
  });

  const matchedJobsCount = recommendedJobs.length;
  const profileStrength = React.useMemo(() => {
    if (!personalInfo) return 0;
    const checks = [
      Boolean(personalInfo.firstName),
      Boolean(personalInfo.email),
      Boolean(personalInfo.jobTitle),
      Boolean(personalInfo.location),
      Boolean(personalInfo.phone),
      Boolean(personalInfo.avatar),
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [personalInfo]);

  const profileTrend = profileStrength >= 80 ? "Strong profile" : profileStrength >= 50 ? "Improving" : "Needs more details";
  const profileTrendColor = profileStrength >= 80 ? "text-success" : profileStrength >= 50 ? "text-warning" : "text-destructive";

  const topJobs = recommendedJobs.length > 0
    ? recommendedJobs.slice(0, 5).map((job) => ({
        logo: (
          <span className="text-lg font-bold">
            {job.company?.charAt(0) ?? job.title?.charAt(0) ?? "J"}
          </span>
        ),
        title: job.title,
        company: job.company,
        location: job.location || job.type,
        match: `${job.matchPercentage}% Match`,
      }))
    : [
        { logo: <span className="text-lg font-bold">T</span>, title: "Frontend Developer",   company: "TechNova Inc.",  location: "Remote",             match: "95% Match" },
        { logo: <span className="text-lg font-bold">C</span>, title: "Software Engineer",     company: "CodeCraft Labs", location: "Remote",             match: "92% Match" },
        { logo: <span className="text-lg font-bold">R</span>, title: "React Developer",       company: "DevWave",        location: "Lahore, Pakistan",   match: "88% Match" },
        { logo: <span className="text-lg font-bold">P</span>, title: "Full Stack Developer",  company: "Pixel Perfect",  location: "Remote",             match: "85% Match" },
        { logo: <span className="text-lg font-bold">B</span>, title: "Backend Developer",     company: "CloudScale",     location: "Karachi, Pakistan",  match: "82% Match" },
      ];

  const activities = [
    { icon: <CheckCircle2 className="h-5 w-5" />, title: "Resume generated",       description: resumes.length > 0 ? `${resumes.length} resumes created` : "No resumes generated yet", time: "Recent", iconBg: "bg-success/10 text-success" },
    { icon: <FileText className="h-5 w-5" />,      title: "Application submitted",  description: "Application tracking coming soon", time: "Coming soon", iconBg: "bg-info/10 text-info" },
    { icon: <PenSquare className="h-5 w-5" />,     title: "Profile updated",        description: personalInfo?.jobTitle ? `${personalInfo.jobTitle} set` : "Complete your job title", time: "Recent", iconBg: "bg-primary/10 text-primary" },
    { icon: <BriefcaseBusiness className="h-5 w-5" />, title: "New job matches found", description: `${matchedJobsCount} jobs match your profile`, time: "This week", iconBg: "bg-warning/10 text-warning" },
    { icon: <Mail className="h-5 w-5" />,          title: "Cover letter generated", description: "Cover letter tool available", time: "Coming soon", iconBg: "bg-destructive/10 text-destructive" },
  ];

  const welcomeName = personalInfo?.firstName || "there";
  const profileTitle = `${personalInfo?.firstName ?? ""} ${personalInfo?.lastName ?? ""}`.trim() || "Profile";
  const profileInitial = personalInfo?.firstName?.charAt(0).toUpperCase() ?? "H";
  const resumeCountLabel = resumes.length === 1 ? "Resume" : "Resumes";

  return (
    <div className="flex flex-col gap-6 p-4 pt-16 sm:p-6 sm:pt-6">
      {/* Welcome header */}
      <WelcomeHeader
        name={welcomeName}
        subtitle={personalInfo?.jobTitle ? `Your ${personalInfo.jobTitle} career dashboard.` : "Here's what's happening with your career journey."}
        rightSlot={
          <div className="flex items-center gap-2">
            {/* Bell */}
            <button
              aria-label="Notifications"
              onClick={() => alert("Notifications — coming soon!")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-accent transition"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-0 top-0 h-4 min-w-4 rounded-full bg-destructive px-1 text-[9px] font-semibold leading-4 text-destructive-foreground">
                3
              </span>
            </button>

            {/* Profile avatar — navigates to /dashboard/profile */}
            <button
              aria-label="Go to profile"
              onClick={() => router.push("/dashboard/profile")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm border border-border shadow-sm hover:ring-2 hover:ring-primary/40 transition overflow-hidden"
              title={profileTitle}
            >
              {profileInitial}
            </button>
          </div>
        }
      />

      {/* Stat cards — 1 col mobile, 2 sm, 4 lg */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<BriefcaseBusiness className="h-6 w-6" />}
          value={matchedJobsCount.toString()}
          label="Matched Jobs"
          trend={recommendedJobs.length > 0 ? `${recommendedJobs.length} recommended` : "Loading jobs..."}
        />
        <StatCard
          icon={<FileText className="h-6 w-6" />}
          value="—"
          label="Applications"
          trend="Coming soon"
          iconBg="bg-success/10 text-success"
        />
        <StatCard
          icon={<FileCheck2 className="h-6 w-6" />}
          value={resumes.length.toString()}
          label="Resumes"
          trend={resumes.length > 0 ? `${resumes.length} generated` : "Generate your first resume"}
          iconBg="bg-info/10 text-info"
        />
        <StatCard
          icon={<UserRound className="h-6 w-6" />}
          value={`${profileStrength}%`}
          label="Profile Strength"
          trend={profileTrend}
          trendColor={profileTrendColor}
          iconBg="bg-warning/10 text-warning"
        />
      </div>

      {/* Jobs + Activity — stacked mobile, side-by-side xl */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <SectionHeader title="Top Matched Jobs" actionLabel="View all" onAction={() => router.push("/dashboard/jobs")} />
          <div className="mt-3 divide-y divide-border">
            {topJobs.map((job, i) => <JobListItem key={i} {...job} />)}
          </div>
          <button
            onClick={() => router.push("/dashboard/jobs")}
            className="mt-3 w-full rounded-xl border border-border px-4 py-3 text-sm font-medium text-primary hover:bg-accent transition"
          >
            Browse all jobs
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <SectionHeader title="Recent Activity" actionLabel="View all" onAction={() => router.push("/dashboard/applications")} />
          <div className="mt-3 divide-y divide-border">
            {activities.map((a, i) => <ActivityItem key={i} {...a} />)}
          </div>
          <button
            onClick={() => router.push("/dashboard/applications")}
            className="mt-3 w-full rounded-xl border border-border px-4 py-3 text-sm font-medium text-primary hover:bg-accent transition"
          >
            View all activity
          </button>
        </div>
      </div>

      {/* Resume section */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent Resumes</h2>
            <p className="text-sm text-muted-foreground">
              Download your latest ATS-ready resumes or manage them from one place.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/resumes")}
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-primary hover:bg-accent transition"
          >
            View all resumes
          </button>
        </div>

        <ResumesList />
      </div>

      {/* Resume CTA */}
      <ResumeCTA
        title="Create a tailored resume"
        description="Generate a professional resume tailored to any job in seconds."
        buttonLabel="Generate Resume"
        icon={<Sparkles className="h-8 w-8" />}
        onClick={() => router.push("/dashboard/resumes")}
      />
    </div>
  );
}
