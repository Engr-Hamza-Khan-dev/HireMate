import React from "react";
import { Bell } from "lucide-react";

type DashboardTopBarProps = {
  title: string;
  subtitle: string;
  userName: string;
  userAvatar: string;
  notificationCount?: number;
  onGenerateResume?: () => void;
};

export default function DashboardTopBar({
  title,
  subtitle,
  userName,
  userAvatar,
  notificationCount = 0,
  onGenerateResume,
}: DashboardTopBarProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute right-0 top-0 h-5 min-w-5 rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-5 text-white">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-2 py-1 shadow-sm">
          <img
            src={userAvatar}
            alt={userName}
            className="h-9 w-9 rounded-full object-cover"
          />
        </div>

        <button
          onClick={onGenerateResume}
          className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          + Generate Resume
        </button>
      </div>
    </div>
  );
}