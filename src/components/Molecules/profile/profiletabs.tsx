"use client";

import { Button } from "@/components/Atoms/button";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "personal",     label: "Personal Info" },
  { id: "experience",   label: "Experience" },
  { id: "education",    label: "Education" },
  { id: "skills",       label: "Skills" },
  { id: "projects",     label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "languages",    label: "Languages" },
  { id: "preferences",  label: "Preferences" },
];

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b pb-3">
      {TABS.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
