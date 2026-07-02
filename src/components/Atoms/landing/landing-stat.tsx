import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type LandingStatProps = {
  icon: ReactNode;
  value: string;
  label: string;
  className?: string;
};

/** Single stat block used in the stats bar section */
export function LandingStat({ icon, value, label, className }: LandingStatProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
