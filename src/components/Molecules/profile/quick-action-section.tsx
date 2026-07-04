import {
  Award,
  Briefcase,
  FolderOpen,
  Languages,
  Sparkles,
} from "lucide-react";

import QuickActionItem from "@/components/Molecules/profile/quickaction";

interface QuickActionsSectionProps {
  onTabChange?: (tab: string) => void;
}

export default function QuickActionsSection({ onTabChange }: QuickActionsSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Quick Actions
      </h2>

      <QuickActionItem
        title="Add Experience"
        description="Add another work experience."
        icon={Briefcase}
        onClick={() => onTabChange?.("experience")}
      />

      <QuickActionItem
        title="Add Project"
        description="Showcase a project."
        icon={FolderOpen}
        onClick={() => onTabChange?.("projects")}
      />

      <QuickActionItem
        title="Add Certificate"
        description="Upload certifications."
        icon={Award}
        onClick={() => onTabChange?.("certificates")}
      />

      <QuickActionItem
        title="Add Language"
        description="Display languages you speak."
        icon={Languages}
        onClick={() => onTabChange?.("languages")}
      />

      <QuickActionItem
        title="Improve Profile"
        description="Complete your missing information."
        icon={Sparkles}
        onClick={() => onTabChange?.("skills")}
      />
    </div>
  );
}