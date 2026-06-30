"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type Tab = {
  value: string;
  label: string;
};

export type JobTabsProps = ComponentProps<"div"> & {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onTabChange?: (value: string) => void;
};

export function JobTabs({
  tabs,
  defaultValue,
  value,
  onTabChange,
  className,
}: JobTabsProps) {
  const selectedValue = value || defaultValue || tabs[0]?.value;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange?.(tab.value)}
            className={cn(
              "relative pb-2.5 text-sm font-medium transition-colors",
              selectedValue === tab.value
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {selectedValue === tab.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}