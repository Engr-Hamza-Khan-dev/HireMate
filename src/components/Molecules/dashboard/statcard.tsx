import React from "react";

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend: string;
  trendColor?: string;
  iconBg?: string;
};

export default function StatCard({
  icon,
  value,
  label,
  trend,
  trendColor = "text-green-600",
  iconBg = "bg-purple-100 text-purple-600",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>

        <div className="flex-1">
          <div className="text-2xl font-semibold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className={`mt-2 text-sm font-medium ${trendColor}`}>{trend}</div>
        </div>
      </div>
    </div>
  );
}