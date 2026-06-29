import React from "react";
import { Bell, BriefcaseBusiness, FileText, FileCheck2, UserRound, CheckCircle2, Sparkles, Mail, PenSquare } from "lucide-react";

import WelcomeHeader from "@/components/Molecules/dashboard/welcome-header";
import StatCard from "@/components/Molecules/dashboard/statcard";
import SectionHeader from "@/components/Molecules/dashboard/section-header";
import JobListItem from "@/components/Molecules/dashboard/job-list-item";
import ActivityItem from "@/components/Molecules/dashboard/activity-item";
import ResumeCTA from "@/components/Molecules/dashboard/resume-ctx";
import UserProfileMini from "@/components/Molecules/dashboard/user-profile-mini";

export default function Dashboard() {
  const topJobs = [
    {
      logo: <span className="text-lg font-bold">T</span>,
      title: "Frontend Developer",
      company: "TechNova Inc.",
      location: "Remote",
      match: "95% Match",
    },
    {
      logo: <span className="text-lg font-bold">C</span>,
      title: "Software Engineer",
      company: "CodeCraft Labs",
      location: "Remote",
      match: "92% Match",
    },
    {
      logo: <span className="text-lg font-bold">R</span>,
      title: "React Developer",
      company: "DevWave",
      location: "Lahore, Pakistan",
      match: "88% Match",
    },
    {
      logo: <span className="text-lg font-bold">P</span>,
      title: "Full Stack Developer",
      company: "Pixel Perfect",
      location: "Remote",
      match: "85% Match",
    },
    {
      logo: <span className="text-lg font-bold">B</span>,
      title: "Backend Developer",
      company: "CloudScale",
      location: "Karachi, Pakistan",
      match: "82% Match",
    },
  ];

  const activities = [
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Resume generated",
      description: "Frontend Developer at TechNova Inc.",
      time: "2 hours ago",
      iconBg: "bg-green-100 text-green-600",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Application submitted",
      description: "Software Engineer at CodeCraft Labs",
      time: "1 day ago",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      icon: <PenSquare className="h-5 w-5" />,
      title: "Profile updated",
      description: "Experience section updated",
      time: "2 days ago",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      icon: <BriefcaseBusiness className="h-5 w-5" />,
      title: "New job matches found",
      description: "18 new jobs match your profile",
      time: "3 days ago",
      iconBg: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Cover letter generated",
      description: "For Frontend Developer position",
      time: "3 days ago",
      iconBg: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <WelcomeHeader
        name="Hamza"
        subtitle="Here's what's happening with your career journey."
        rightSlot={
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50">
            <Bell className="h-5 w-5" />
            <span className="absolute right-0 top-0 h-5 min-w-5 rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-5 text-white">
              3
            </span>
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard
          icon={<BriefcaseBusiness className="h-6 w-6" />}
          value="18"
          label="Matched Jobs"
          trend="↑ 6 this week"
        />
        <StatCard
          icon={<FileText className="h-6 w-6" />}
          value="7"
          label="Applications"
          trend="↑ 2 this week"
          iconBg="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<FileCheck2 className="h-6 w-6" />}
          value="3"
          label="Resumes"
          trend="↑ 1 this week"
          iconBg="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<UserRound className="h-6 w-6" />}
          value="84%"
          label="Profile Strength"
          trend="Good"
          trendColor="text-green-600"
          iconBg="bg-orange-100 text-orange-600"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <SectionHeader title="Top Matched Jobs" actionLabel="View all" />
          <div className="mt-3 divide-y divide-gray-100">
            {topJobs.map((job, index) => (
              <JobListItem key={index} {...job} />
            ))}
          </div>

          <button className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
            Browse all jobs
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <SectionHeader title="Recent Activity" actionLabel="View all" />
          <div className="mt-3 divide-y divide-gray-100">
            {activities.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>

          <button className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
            View all activity
          </button>
        </div>
      </div>

      <ResumeCTA
        title="Create a tailored resume"
        description="Generate a professional resume tailored to any job in seconds."
        buttonLabel="Generate Resume"
        icon={<Sparkles className="h-8 w-8" />}
      />
    </div>
  );
}