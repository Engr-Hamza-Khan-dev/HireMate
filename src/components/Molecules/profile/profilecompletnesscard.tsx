import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface ProfileCompletenessCardProps {
  percentage: number;
}

export default function ProfileCompletenessCard({
  percentage,
}: ProfileCompletenessCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Completeness</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">
              {percentage}% Complete
            </span>

            <Badge>{percentage}%</Badge>
          </div>

          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-violet-600 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              Profile Picture
            </span>

            <Badge variant="outline">
              Complete
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">
              Resume Uploaded
            </span>

            <Badge variant="outline">
              Complete
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">
              Skills Added
            </span>

            <Badge variant="secondary">
              Pending
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">
              Experience Added
            </span>

            <Badge variant="secondary">
              Pending
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}