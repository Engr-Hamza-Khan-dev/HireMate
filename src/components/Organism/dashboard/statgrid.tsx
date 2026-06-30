import React from "react";
import StatCard from "@/components/Molecules/dashboard/statcard";
import { BriefcaseBusiness, FileText, UserRound, FileCheck2 } from "lucide-react";

type StatsGridProps = {
  className?: string;
};

export default function StatsGrid({ className = "" }: StatsGridProps) {
  return (
    <div className={`grid gap-4 lg:grid-cols-4 ${className}`}>
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
  );
}