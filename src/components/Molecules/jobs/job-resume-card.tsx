"use client";

import { useState } from "react";
import { Sparkles, FileText, Download, Eye, RotateCcw } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";

export type ResumeCardProps = ComponentProps<"div"> & {
  jobTitle?: string;
  matchPercentage?: number;
};

export function ResumeCard({ jobTitle, matchPercentage, className }: ResumeCardProps) {
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");

  const handleGenerate = () => {
    setStatus("generating");
    setTimeout(() => setStatus("done"), 2000);
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">AI Resume</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Tailored to the job requirements and optimized for ATS.
            </p>
          </div>
          {matchPercentage && (
            <Badge variant="secondary" className="shrink-0 bg-success/10 text-success text-xs">
              {matchPercentage}% match
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4 space-y-4">
        {/* What AI will do */}
        {status === "idle" && (
          <ul className="space-y-2">
            {[
              "Highlights skills matching the job description",
              "Reorders experience for maximum relevance",
              "Injects ATS-friendly keywords automatically",
              "Formats to a clean single-page layout",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-muted-foreground">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {/* Generating state */}
        {status === "generating" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20" />
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Generating your resume…</p>
              <p className="text-xs text-muted-foreground mt-0.5">This takes just a moment</p>
            </div>
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
            </div>
          </div>
        )}

        {/* Done state — show file */}
        {status === "done" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  Resume_{jobTitle?.replace(/\s+/g, "_") ?? "AI_Generated"}.pdf
                </p>
                <p className="text-xs text-muted-foreground">Generated just now</p>
              </div>
              <Download className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">
              ✅ Keywords matched &nbsp;·&nbsp; ✅ ATS optimized &nbsp;·&nbsp; ✅ 1-page layout
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {status === "idle" && (
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleGenerate}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Resume
          </Button>
        )}
        {status === "generating" && (
          <Button className="w-full" disabled>
            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
            Generating…
          </Button>
        )}
        {status === "done" && (
          <>
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => setStatus("idle")}
              aria-label="Regenerate"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
