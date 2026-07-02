import { FileText, Download } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type FileItemProps = ComponentProps<"div"> & {
  filename: string;
  updatedAt: string;
  icon?: "pdf" | "doc" | "txt";
};

export function FileItem({
  filename,
  updatedAt,
  icon = "pdf",
  className,
}: FileItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card p-3",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{filename}</p>
        <p className="text-xs text-muted-foreground">{updatedAt}</p>
      </div>
      <Download
        className="h-4 w-4 shrink-0 text-muted-foreground hover:text-primary cursor-pointer transition-colors"
        aria-label="Download"
      />
    </div>
  );
}