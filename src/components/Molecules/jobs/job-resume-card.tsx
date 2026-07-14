"use client";

import { useState } from "react";
import { Sparkles, FileText, RotateCcw, Download, Loader2 } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";
import { generateResumeForJob } from "@/lib/jobs-api";
import { downloadResumePdf } from "@/lib/resume-api";
import { getApiErrorMessage } from "@/lib/api";
import { toast } from "sonner";

export type ResumeCardProps = ComponentProps<"div"> & {
  jobTitle?: string;
  jobId?: string;
  matchPercentage?: number;
};

type GeneratedResume = {
  id: number;
  fullName?: string;
  professionalTitle?: string;
  professionalSummary?: string;
  atsScore?: number;
  matchedKeywords?: string[];
};

export function ResumeCard({ jobTitle, jobId, matchPercentage, className }: ResumeCardProps) {
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleGenerate = async () => {
    if (!jobId) {
      toast.error("Select a job before generating a resume.");
      return;
    }

    setStatus("generating");
    setErrorMessage("");
    setGeneratedResume(null);

    try {
      const resume = await generateResumeForJob(jobId);
      setGeneratedResume(resume as GeneratedResume);
      setStatus("done");
      toast.success("Resume generated — ready to download");
    } catch (error) {
      const message = getApiErrorMessage(error, "Couldn't generate the resume right now.");
      setErrorMessage(message);
      setStatus("error");
      toast.error(message);
    }
  };

  const handleDownload = async () => {
    if (!generatedResume?.id) {
      toast.error("Generate a resume first.");
      return;
    }

    setDownloading(true);
    try {
      // Use the saved resume id — no extra AI call needed
      const blob = await downloadResumePdf(generatedResume.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(generatedResume.fullName || jobTitle || "resume").replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Couldn't download the PDF right now."));
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setGeneratedResume(null);
    setErrorMessage("");
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">AI Resume</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Tailored to the job requirements and optimised for ATS.
            </p>
          </div>
          {matchPercentage ? (
            <Badge variant="secondary" className="shrink-0 bg-success/10 text-success text-xs">
              {matchPercentage}% match
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="pb-4 space-y-4">

        {/* ── Idle: what AI will do ── */}
        {(status === "idle" || status === "error") && (
          <ul className="space-y-2">
            {[
              "Reads the full job description and requirements",
              "Highlights your skills that match the role",
              "Rewrites experience bullets with ATS keywords",
              "Formats to a clean, single-page layout",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-muted-foreground">
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
                Analysing job &amp; building your resume…
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Groq is reading the job description and your profile
              </p>
            </div>
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
            </div>
          </div>
        )}

        {/* ── Done: show result ── */}
        {status === "done" && generatedResume && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {generatedResume.professionalTitle || `Resume for ${jobTitle || "this role"}`}
                </p>
                {generatedResume.atsScore ? (
                  <p className="text-xs text-muted-foreground">
                    ATS score:{" "}
                    <span className="font-semibold text-foreground">
                      {generatedResume.atsScore}/100
                    </span>
                  </p>
                ) : null}
                {generatedResume.professionalSummary && (
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {generatedResume.professionalSummary}
                  </p>
                )}
              </div>
            </div>

            {/* Matched ATS keywords */}
            {Array.isArray(generatedResume.matchedKeywords) &&
              generatedResume.matchedKeywords.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                    Matched keywords
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedResume.matchedKeywords.slice(0, 8).map((kw) => (
                      <Badge key={kw} variant="secondary" className="text-[11px]">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {(status === "idle" || status === "error") && (
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleGenerate}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Resume
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
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {downloading ? "Downloading…" : "Download PDF"}
            </Button>
            <Button variant="outline" className="shrink-0" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
