import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { LandingBadge } from "./landing-badge";

type LandingSectionHeadingProps = {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

/** Reusable section heading: optional badge + title + subtitle */
export function LandingSectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: LandingSectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {badge && <LandingBadge>{badge}</LandingBadge>}
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-base text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
