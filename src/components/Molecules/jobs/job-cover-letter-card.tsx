"use client";

import { useState } from "react";
import {
  Sparkles,
  FileText,
  Download,
  RotateCcw,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";
import { generateCoverLetter, type CoverLetterItem } from "@/lib/cover-letter-api";
import { getApiErrorMessage } from "@/lib/api";
import { toast } from "sonner";

export type CoverLetterCardProps = ComponentProps<"div"> & {
  jobTitle?: string;
  company?: string;
  jobId?: string;
  matchPercentage?: number;
};

export function CoverLetterCard({
  jobTitle,
  company,
  jobId,
  matchPercentage,
  className,
}: CoverLetterCardProps) {
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [coverLetter, setCoverLetter] = useState<CoverLetterItem | null>(null);
  const [copied, setCopied] = useState(false);

  // ── Generate ────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!jobId) {
      toast.error("Select a job before generating a cover letter.");
      return;
    }

    setStatus("generating");
    setErrorMessage("");
    setCoverLetter(null);

    try {
      const result = await generateCoverLetter(jobId);
      setCoverLetter(result);
      setStatus("done");
      toast.success("Cover letter generated");
    } catch (error) {
      const message = getApiErrorMessage(error, "Couldn't generate the cover letter right now.");
      setErrorMessage(message);
      setStatus("error");
      toast.error(message);
    }
  };

  // ── Copy to clipboard ───────────────────────────────────────────
  const handleCopy = async () => {
    if (!coverLetter?.content) return;
    try {
      await navigator.clipboard.writeText(coverLetter.content);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  // ── Download as .txt ────────────────────────────────────────────
  const handleDownload = () => {
    if (!coverLetter?.content) return;
    const blob = new Blob([coverLetter.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CoverLetter_${(company || "AI_Generated").replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

  const handleReset = () => {
    setStatus("idle");
    setCoverLetter(null);
    setErrorMessage("");
  };

  // ── First ~200 chars as preview ─────────────────────────────────
  const preview = coverLetter?.content
    ? coverLetter.content.slice(0, 220).trim() + (coverLetter.content.length > 220 ? "…" : "")
    : "";

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">AI Cover Letter</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Personalised for {company ?? "this company"} and the role.
            </p>
          </div>
          {matchPercentage ? (
            <Badge
              variant="secondary"
              className="shrink-0 bg-success/10 text-success text-xs"
            >
              {matchPercentage}% match
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="pb-4 space-y-4">

        {/* ── Idle / error: feature list ── */}
        {(status === "idle" || status === "error") && (
          <ul className="space-y-2">
            {[
              `Opens with a strong hook for ${company ?? "the company"}`,
              "Connects your experience directly to the job requirements",
              "Highlights your most relevant achievements and skills",
              "Ends with a confident, professional call to action",
            ].map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {status === "error" && errorMessage && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        {/* ── Generating ── */}
        {status === "generating" && (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20" />
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Writing your cover letter…
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Groq is crafting a personalised pitch for {company ?? "this company"}
              </p>
            </div>
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
            </div>
          </div>
        )}

        {/* ── Done: preview + file row ── */}
        {status === "done" && coverLetter && (
          <div className="space-y-3">
            {/* Preview snippet */}
            <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Preview
              </p>
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">
                {preview}
              </p>
            </div>

            {/* Full letter scroll area */}
            <div className="max-h-64 overflow-y-auto rounded-lg border bg-background p-3">
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {coverLetter.content}
              </p>
            </div>

            {/* File row */}
            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  CoverLetter_{(company || "AI").replace(/\s+/g, "_")}.txt
                </p>
                <p className="text-xs text-muted-foreground">Generated just now</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 flex-wrap">
        {(status === "idle" || status === "error") && (
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleGenerate}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Cover Letter
          </Button>
        )}

        {status === "generating" && (
          <Button className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating…
          </Button>
        )}

        {status === "done" && (
          <>
            {/* Copy */}
            <Button
              variant="outline"
              className="flex-1 gap-1.5"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>

            {/* Download .txt */}
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 gap-1.5"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>

            {/* Regenerate */}
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={handleReset}
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
