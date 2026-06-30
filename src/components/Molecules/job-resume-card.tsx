import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { FileItem } from "@/components/Atoms/job-file-item";

export type ResumeCardProps = ComponentProps<"div">;

export function ResumeCard({ className }: ResumeCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">AI Suggested Resume</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Optimized for this job and its requirements.
        </p>
      </CardHeader>
      <CardContent className="pb-3">
        <FileItem
          filename="Hamza_Khan_Frontend_Developer.pdf"
          updatedAt="Updated 1 hour ago"
        />
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
          Preview Resume
        </Button>
      </CardFooter>
    </Card>
  );
}