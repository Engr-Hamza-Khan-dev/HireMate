import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileCompletenessCardProps {
  percentage: number;
}

export default function ProfileCompletenessCard({ percentage }: ProfileCompletenessCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Completeness</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{percentage}% Complete</span>
            <Badge>{percentage}%</Badge>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Profile Picture",  status: "Complete",  variant: "outline"    },
            { label: "Resume Uploaded",  status: "Complete",  variant: "outline"    },
            { label: "Skills Added",     status: "Pending",   variant: "secondary"  },
            { label: "Experience Added", status: "Pending",   variant: "secondary"  },
          ].map(({ label, status, variant }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{label}</span>
              <Badge variant={variant as "outline" | "secondary"}>{status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
