import { GraduationCap, Calendar, BookOpen, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/Atoms/button";

interface EducationItemProps {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function EducationItem({
  institution, degree, fieldOfStudy, startDate, endDate, currentlyStudying, description,
  onEdit, onDelete, isDeleting = false,
}: EducationItemProps) {
  const dateRange = startDate
    ? `${formatDate(startDate)} – ${currentlyStudying ? "Present" : formatDate(endDate)}`
    : "";

  return (
    <div className="rounded-lg border border-border p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
            <h3 className="font-semibold text-foreground">{degree}</h3>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{institution}</p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            {fieldOfStudy && <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{fieldOfStudy}</span>}
            {dateRange    && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{dateRange}</span>}
          </div>
          {description && <p className="pt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex shrink-0 gap-1">
          <Button size="icon" variant="ghost" onClick={onEdit} aria-label="Edit">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete} disabled={isDeleting}
            aria-label="Delete" className="hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
