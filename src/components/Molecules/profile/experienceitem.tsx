import { Briefcase, Calendar, MapPin, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Atoms/button";

interface ExperienceItemProps {
  position: string;
  company: string;
  location: string;
  duration: string;
  description: string;
}

export default function ExperienceItem({
  position,
  company,
  location,
  duration,
  description,
}: ExperienceItemProps) {
  return (
    <div className="rounded-lg border p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-violet-600" />
            <h3 className="font-semibold">{position}</h3>
          </div>

          <p className="text-sm font-medium text-muted-foreground">
            {company}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {duration}
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          </div>

          <p className="pt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="icon" variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>

          <Button size="icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}