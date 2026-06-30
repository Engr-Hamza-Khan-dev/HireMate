import { Plus } from "lucide-react";

import { Button } from "@/components/Atoms/button";
import EducationItem from "@/components/Molecules/profile/educationitem";

export default function EducationSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Education
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage your educational background.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      <EducationItem
        degree="Bachelor of Computer Science"
        institution="Stanford University"
        location="California, USA"
        duration="2016 - 2020"
        description="Specialized in Software Engineering and Artificial Intelligence."
      />

      <EducationItem
        degree="Higher Secondary School"
        institution="ABC College"
        location="New York"
        duration="2014 - 2016"
        description="Major in Computer Science."
      />
    </div>
  );
}