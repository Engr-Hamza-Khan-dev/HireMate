import React from "react";

type ActivityItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  iconBg?: string;
};

export default function ActivityItem({ icon, title, description, time, iconBg = "bg-success/10 text-success" }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        </div>
      </div>
      <div className="ml-3 shrink-0 text-sm text-muted-foreground">{time}</div>
    </div>
  );
}
