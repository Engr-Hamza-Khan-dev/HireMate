import { Check } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";

export type MatchAnalysisCardProps = ComponentProps<"div"> & {
  skillsMatch?: boolean;
  experienceLevel?: boolean;
  projectsAlign?: boolean;
  keywordsMatch?: boolean;
  
};

export function MatchAnalysisCard({
  skillsMatch = true,
  experienceLevel = true,
  projectsAlign = true,
  keywordsMatch = true,
  className,
}: MatchAnalysisCardProps) {
  const items = [
    { label: "Skills match", checked: skillsMatch },
    { label: "Experience level", checked: experienceLevel },
    { label: "Projects align", checked: projectsAlign },
    { label: "Keywords match", checked: keywordsMatch },
  ];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Match Analysis</CardTitle>
        <p className="text-sm font-medium text-success mt-1">Great Match!</p>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-xs text-muted-foreground mb-3">
          You're a strong fit for this role.
        </p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm">
              {item.checked ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <span className="h-4 w-4" />
              )}
              <span className={item.checked ? "text-foreground" : "text-muted-foreground"}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-start px-0 text-primary">
          View Full Analysis
        </Button>
      </CardFooter>
    </Card>
  );
}