"use client";

import { Search } from "lucide-react";
import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type SearchInputProps = ComponentProps<"input"> & {
  placeholder?: string;
};

export function SearchInput({
  className,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        className={cn("pl-9 h-11 rounded-xl", className)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}