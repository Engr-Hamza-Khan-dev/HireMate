"use client";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "personal", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "languages", label: "Languages" },
  { id: "preferences", label: "Preferences" },
];

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b pb-3">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-violet-600 text-white"
              : "bg-transparent text-muted-foreground hover:bg-muted"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}