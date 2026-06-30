import React from "react";
import SectionHeader from "@/components/Molecules/dashboard/section-header";
import ActivityItem from "@/components/Molecules/dashboard/activity-item";
import { ArrowRight } from "lucide-react";

type Activity = {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  iconBg?: string;
};

type RecentActivityPanelProps = {
  activities: Activity[];
  onViewAll?: () => void;
  onViewActivity?: () => void;
};

export default function RecentActivityPanel({
  activities,
  onViewAll,
  onViewActivity,
}: RecentActivityPanelProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <SectionHeader
        title="Recent Activity"
        actionLabel="View all"
        onAction={onViewAll}
      />

      <div className="mt-3 divide-y divide-gray-100">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>

      <button
        onClick={onViewActivity}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
      >
        View all activity <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}