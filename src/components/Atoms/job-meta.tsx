"use client";

import type { ComponentProps } from "react";

export type JobMetaProps = ComponentProps<"span"> & {
  items: string[];
  separator?: string;
};

export function JobMeta({ items, separator = "•", className }: JobMetaProps) {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      {items.map((item, index) => (
        <span key={index} className={className}>
          {item}
          {index < items.length - 1 && <span className="mx-1">{separator}</span>}
        </span>
      ))}
    </div>
  );
}