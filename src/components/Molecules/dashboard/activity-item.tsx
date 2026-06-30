import React from "react";

type ActivityItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  iconBg?: string;
};

export default function ActivityItem({
  icon,
  title,
  description,
  time,
  iconBg = "bg-green-100 text-green-600",
}: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <div className="text-sm text-gray-500">{time}</div>
    </div>
  );
}