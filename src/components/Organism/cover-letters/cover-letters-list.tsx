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
  Copy,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  fetchCoverLetters,
  deleteCoverLetter,
  downloadCoverLetter,
  COVER_LETTERS_QUERY_KEY,
  type CoverLetterItem,
} from "@/lib/cover-letter-api";
import { cn } from "@/lib/utils";

// ─── Single card ──────────────────────────────────────────────────

function CoverLetterCard({
  letter,
  onDelete,
  isDeleting,
}: {
  letter: CoverLetterItem;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const createdAt = new Date(letter.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });

  // First line of the letter = "Dear Hiring Manager," usually
  const preview = letter.content.slice(0, 180).trim() +
    (letter.content.length > 180 ? "…" : "");

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await downloadCoverLetter(letter.id);
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `CoverLetter_${letter.jobId.slice(0, 12)}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Downloaded");
    } catch {
      toast.error("Failed to download. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter.content);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-sm font-semibold">
              Cover Letter
            </CardTitle>
            <CardDescription className="text-xs">
              Job ID: {letter.jobId.slice(0, 14)}… · {createdAt}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-3">
        {/* Preview / full toggle */}
        <div
          className={cn(
            "rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground leading-relaxed whitespace-pre-line cursor-pointer select-none",
            !expanded && "line-clamp-4"
          )}
          onClick={() => setExpanded((e) => !e)}
          title={expanded ? "Click to collapse" : "Click to read more"}
        >
          {expanded ? letter.content : preview}
        </div>
        {!expanded && letter.content.length > 180 && (
          <button
            className="text-[11px] text-primary hover:underline"
            onClick={() => setExpanded(true)}
          >
            Read full letter
          </button>
        )}
        {expanded && (
          <button
            className="text-[11px] text-primary hover:underline"
            onClick={() => setExpanded(false)}
          >
            Collapse
          </button>
        )}
      </CardContent>

      <CardFooter className="flex items-center gap-1.5 pt-0">
        {/* Copy */}
        <Button
          size="sm"
          variant="outline"
          className="h-7 flex-1 gap-1.5 text-xs"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </Button>

        {/* Download */}
        <Button
          size="sm"
          variant="outline"
          className="h-7 flex-1 gap-1.5 text-xs"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading
            ? <Loader2 className="h-3 w-3 animate-spin" />
            : <Download className="h-3 w-3" />}
          {isDownloading ? "…" : "Download"}
        </Button>

        {/* Delete */}
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 shrink-0 p-0 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(letter.id)}
          disabled={isDeleting}
          aria-label="Delete cover letter"
        >
          {isDeleting
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
            : <Trash2 className="h-3.5 w-3.5" />}
        </Button>
      </CardFooter>
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
        <p className="text-sm font-medium text-foreground">No cover letters yet</p>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Open any job, click the &ldquo;Cover Letter&rdquo; tab, and hit Generate to create a
          personalised letter in seconds.
        </p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────

export function CoverLettersList() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: letters = [], isLoading, isError } = useQuery({
    queryKey: COVER_LETTERS_QUERY_KEY,
    queryFn:  fetchCoverLetters,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoverLetter,
    onMutate:   (id) => setDeletingId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COVER_LETTERS_QUERY_KEY });
      toast.success("Cover letter deleted");
    },
    onError:   () => toast.error("Failed to delete"),
    onSettled: () => setDeletingId(null),
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl border bg-muted/30 h-56" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <AlertCircle className="h-8 w-8 text-destructive/60" />
        <p className="text-sm font-medium">Failed to load cover letters</p>
        <p className="text-xs text-muted-foreground">Check your connection or refresh the page.</p>
      </div>
    );
  }

  if (letters.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-2.5">
        <FileText className="h-4 w-4 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{letters.length}</span>
          {" "}cover letter{letters.length !== 1 ? "s" : ""} generated
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {letters.map((letter) => (
          <CoverLetterCard
            key={letter.id}
            letter={letter}
            onDelete={(id) => deleteMutation.mutate(id)}
            isDeleting={deletingId === letter.id}
          />
        ))}
      </div>
    </div>
  );
}
