import { ArrowRight } from "lucide-react";

import { Button } from "@/components/Atoms/button";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({
  title,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-base font-semibold text-foreground">
        {title}
      </h2>

      <Button
        variant="ghost"
        size="sm"
        className="gap-1 text-violet-600 hover:text-violet-700"
      >
        View all

        <ArrowRight
          className="h-3.5 w-3.5"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}