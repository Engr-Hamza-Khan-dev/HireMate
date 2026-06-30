import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { FileItem } from "@/components/Atoms/job-file-item";

export type CoverLetterCardProps = ComponentProps<"div">;

export function CoverLetterCard({ className }: CoverLetterCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">AI Suggested Cover Letter</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Tailored to match the job description.
        </p>
      </CardHeader>
      <CardContent className="pb-3">
        <FileItem
          filename="Hamza_Khan_Cover_Letter.pdf"
          updatedAt="Updated 1 hour ago"
        />
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Preview Cover Letter
        </Button>
      </CardFooter>
    </Card>
  );
}