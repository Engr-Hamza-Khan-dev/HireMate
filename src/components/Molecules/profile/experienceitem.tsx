import { Briefcase, Calendar, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/Atoms/button";

interface ExperienceItemProps {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
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

export default function ExperienceItem({
  position, company, location, startDate, endDate, currentlyWorking, description,
  onEdit, onDelete, isDeleting = false,
}: ExperienceItemProps) {
  const dateRange = startDate
    ? `${formatDate(startDate)} – ${currentlyWorking ? "Present" : formatDate(endDate)}`
    : "";

  return (
    <div className="rounded-lg border border-border p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 shrink-0 text-primary" />
            <h3 className="font-semibold text-foreground">{position}</h3>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{company}</p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            {dateRange && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{dateRange}</span>}
            {location  && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{location}</span>}
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
