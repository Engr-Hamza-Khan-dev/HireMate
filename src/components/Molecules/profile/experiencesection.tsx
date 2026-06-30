import { Plus } from "lucide-react";

import { Button } from "@/components/Atoms/button";
import ExperienceItem from "@/components/Molecules/profile/experienceitem";

export default function ExperienceSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Experience
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage your professional experience.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <ExperienceItem
        position="Senior Software Engineer"
        company="Google"
        location="California, USA"
        duration="2022 - Present"
        description="Building scalable web applications using React, Next.js and cloud technologies."
      />

      <ExperienceItem
        position="Frontend Developer"
        company="Microsoft"
        location="Remote"
        duration="2020 - 2022"
        description="Developed enterprise dashboards and reusable UI components."
      />
    </div>
  );
}