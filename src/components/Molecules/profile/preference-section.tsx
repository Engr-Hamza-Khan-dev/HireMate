"use client";

import { useState } from "react";

import { Button } from "@/components/Atoms/button";

export default function PreferencesSection() {
  const [preferences, setPreferences] = useState({
    remote: true,
    fullTime: true,
    internship: false,
    freelance: false,
    relocation: true,
    notifications: true,
  });

  const toggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">
          Preferences
        </h2>

        <p className="text-sm text-muted-foreground">
          Customize your job search preferences.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border p-6">
        <PreferenceRow
          title="Open to Remote Jobs"
          checked={preferences.remote}
          onClick={() => toggle("remote")}
        />

        <PreferenceRow
          title="Open to Full-Time Jobs"
          checked={preferences.fullTime}
          onClick={() => toggle("fullTime")}
        />

        <PreferenceRow
          title="Open to Internships"
          checked={preferences.internship}
          onClick={() => toggle("internship")}
        />

        <PreferenceRow
          title="Open to Freelance Work"
          checked={preferences.freelance}
          onClick={() => toggle("freelance")}
        />

        <PreferenceRow
          title="Willing to Relocate"
          checked={preferences.relocation}
          onClick={() => toggle("relocation")}
        />

        <PreferenceRow
          title="Email Notifications"
          checked={preferences.notifications}
          onClick={() => toggle("notifications")}
        />
      </div>

      <Button>
        Save Preferences
      </Button>
    </div>
  );
}

interface PreferenceRowProps {
  title: string;
  checked: boolean;
  onClick: () => void;
}

function PreferenceRow({
  title,
  checked,
  onClick,
}: PreferenceRowProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-none">
      <span className="font-medium">{title}</span>

      <button
        onClick={onClick}
        className={`h-7 w-14 rounded-full transition ${
          checked ? "bg-violet-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white shadow transition ${
            checked ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}