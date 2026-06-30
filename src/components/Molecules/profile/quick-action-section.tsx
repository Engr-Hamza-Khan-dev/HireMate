import {
  Award,
  Briefcase,
  FolderOpen,
  Languages,
  Sparkles,
} from "lucide-react";

import QuickActionItem from "@/components/Molecules/profile/quickaction";

export default function QuickActionsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Quick Actions
      </h2>

      <QuickActionItem
        title="Add Experience"
        description="Add another work experience."
        icon={Briefcase}
      />

      <QuickActionItem
        title="Add Project"
        description="Showcase a project."
        icon={FolderOpen}
      />

      <QuickActionItem
        title="Add Certificate"
        description="Upload certifications."
        icon={Award}
      />

      <QuickActionItem
        title="Add Language"
        description="Display languages you speak."
        icon={Languages}
      />

      <QuickActionItem
        title="Improve Profile"
        description="Complete your missing information."
        icon={Sparkles}
      />
    </div>
  );
}