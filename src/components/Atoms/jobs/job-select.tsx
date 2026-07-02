"use client";

import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type SelectProps = ComponentProps<"select"> & {
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function Select({ options, placeholder, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-9 w-full appearance-none rounded-xl border border-border bg-background px-2.5 pr-8 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/20",
          "sm:h-11 sm:px-3 sm:pr-10 sm:text-sm",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none sm:right-3 sm:h-4 sm:w-4"
        aria-hidden="true"
      />
    </div>
  );
}