import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
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
  trendColor = "text-success",
  iconBg = "bg-primary/10 text-primary",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>

        <div className="flex-1">
          <div className="text-2xl font-semibold text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className={`mt-2 text-sm font-medium ${trendColor}`}>{trend}</div>
        </div>
      </div>
    </div>
  );
}
