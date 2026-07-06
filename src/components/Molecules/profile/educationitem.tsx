import { GraduationCap, Calendar, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/Atoms/button";

interface EducationItemProps {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  description: string;
}

export default function EducationItem({ degree, institution, location, duration, description }: EducationItemProps) {
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
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />{duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />{location}
            </span>
          </div>
          <p className="pt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
          <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
