"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FileText,
  Download,
  Trash2,
  Loader2,
  AlertCircle,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  fetchResumes,
  deleteResume,
  downloadResumePdf,
  RESUMES_QUERY_KEY,
  type ResumeListItem,
} from "@/lib/resume-api";
import { cn } from "@/lib/utils";

// ─── ATS score colour helper ──────────────────────────────────────

function atsColor(score: number) {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 60) return "text-amber-500 dark:text-amber-400";
  return "text-rose-500 dark:text-rose-400";
}

// ─── Single resume card ───────────────────────────────────────────

function ResumeCard({
  resume,
  onDelete,
  isDeleting,
}: {
  resume: ResumeListItem;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const createdAt = new Date(resume.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const keywords: string[] = Array.isArray(resume.matchedKeywords)
    ? (resume.matchedKeywords as string[]).slice(0, 5)
    : [];

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await downloadResumePdf(resume.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(resume.fullName || "resume").replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <CardTitle className="truncate text-sm font-semibold leading-tight">
                {resume.fullName}
              </CardTitle>
              <CardDescription className="truncate text-xs">
                {resume.professionalTitle}
              </CardDescription>
            </div>
          </div>

          {/* ATS Score */}
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <span className={cn("text-lg font-bold leading-none", atsColor(resume.atsScore))}>
              {resume.atsScore}
            </span>
            <span className="text-[10px] text-muted-foreground">ATS score</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {keywords.map((kw) => (
              <Badge key={kw} variant="secondary" className="px-1.5 py-0 text-[10px]">
                {kw}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-xs text-muted-foreground">{createdAt}</span>

          <div className="flex items-center gap-1">
            {/* Download PDF — always goes through the backend endpoint */}
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1.5 px-2 text-xs"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Download className="h-3 w-3" />
              )}
              {isDownloading ? "Downloading…" : "PDF"}
            </Button>

            {/* Delete */}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(resume.id)}
              disabled={isDeleting}
              aria-label="Delete resume"
            >
              {isDeleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Empty state ──────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <Sparkles className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">No resumes yet</p>
        <p className="mt-1 text-xs text-muted-foreground max-w-xs">
          Open any job and click &ldquo;Generate Resume&rdquo; to create a tailored,
          ATS-friendly resume in seconds.
        </p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────

export function ResumesList() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const {
    data: resumes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: RESUMES_QUERY_KEY,
    queryFn:  fetchResumes,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteResume,
    onMutate:   (id) => setDeletingId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESUMES_QUERY_KEY });
      toast.success("Resume deleted");
    },
    onError: () => toast.error("Failed to delete resume"),
    onSettled: () => setDeletingId(null),
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl border bg-muted/30 h-44" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <AlertCircle className="h-8 w-8 text-destructive/60" />
        <p className="text-sm font-medium">Failed to load resumes</p>
        <p className="text-xs text-muted-foreground">Check your connection or refresh the page.</p>
      </div>
    );
  }

  if (resumes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-2.5">
        <Target className="h-4 w-4 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{resumes.length}</span>
          {" "}tailored resume{resumes.length !== 1 ? "s" : ""} generated ·{" "}
          avg ATS score{" "}
          <span className="font-semibold text-foreground">
            {Math.round(resumes.reduce((sum, r) => sum + r.atsScore, 0) / resumes.length)}
          </span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <ResumeCard
            key={resume.id}
            resume={resume}
            onDelete={(id) => deleteMutation.mutate(id)}
            isDeleting={deletingId === resume.id}
          />
        ))}
      </div>
    </div>
  );
}
