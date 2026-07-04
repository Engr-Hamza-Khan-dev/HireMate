"use client";

import React from "react";
import { useRouter } from "next/navigation";
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

export default function Dashboard() {
  const router = useRouter();

  const topJobs = [
    { logo: <span className="text-lg font-bold">T</span>, title: "Frontend Developer",   company: "TechNova Inc.",  location: "Remote",             match: "95% Match" },
    { logo: <span className="text-lg font-bold">C</span>, title: "Software Engineer",     company: "CodeCraft Labs", location: "Remote",             match: "92% Match" },
    { logo: <span className="text-lg font-bold">R</span>, title: "React Developer",       company: "DevWave",        location: "Lahore, Pakistan",   match: "88% Match" },
    { logo: <span className="text-lg font-bold">P</span>, title: "Full Stack Developer",  company: "Pixel Perfect",  location: "Remote",             match: "85% Match" },
    { logo: <span className="text-lg font-bold">B</span>, title: "Backend Developer",     company: "CloudScale",     location: "Karachi, Pakistan",  match: "82% Match" },
  ];

  const activities = [
    { icon: <CheckCircle2 className="h-5 w-5" />, title: "Resume generated",       description: "Frontend Developer at TechNova Inc.",    time: "2 hours ago", iconBg: "bg-success/10 text-success" },
    { icon: <FileText className="h-5 w-5" />,      title: "Application submitted",  description: "Software Engineer at CodeCraft Labs",    time: "1 day ago",   iconBg: "bg-info/10 text-info" },
    { icon: <PenSquare className="h-5 w-5" />,     title: "Profile updated",        description: "Experience section updated",             time: "2 days ago",  iconBg: "bg-primary/10 text-primary" },
    { icon: <BriefcaseBusiness className="h-5 w-5" />, title: "New job matches found", description: "18 new jobs match your profile",      time: "3 days ago",  iconBg: "bg-warning/10 text-warning" },
    { icon: <Mail className="h-5 w-5" />,          title: "Cover letter generated", description: "For Frontend Developer position",        time: "3 days ago",  iconBg: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 pt-16 sm:p-6 sm:pt-6">
      {/* Welcome header */}
      <WelcomeHeader
        name="Hamza"
        subtitle="Here's what's happening with your career journey."
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
              title="Hamza Khan"
            >
              {/* swap src for a real avatar URL once you have one */}
              H
            </button>
          </div>
        }
      />

      {/* Stat cards — 1 col mobile, 2 sm, 4 lg */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<BriefcaseBusiness className="h-6 w-6" />} value="18" label="Matched Jobs"     trend="↑ 6 this week" />
        <StatCard icon={<FileText className="h-6 w-6" />}          value="7"  label="Applications"     trend="↑ 2 this week" iconBg="bg-success/10 text-success" />
        <StatCard icon={<FileCheck2 className="h-6 w-6" />}        value="3"  label="Resumes"          trend="↑ 1 this week" iconBg="bg-info/10 text-info" />
        <StatCard icon={<UserRound className="h-6 w-6" />}         value="84%" label="Profile Strength" trend="Good" trendColor="text-success" iconBg="bg-warning/10 text-warning" />
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
