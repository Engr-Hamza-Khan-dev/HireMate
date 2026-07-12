"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/Atoms/button";
import {
  PREFERENCES_QUERY_KEY, fetchPreferences, updatePreferences,
  type PreferencesPayload,
} from "@/lib/profile-api";

const PREF_KEYS: { key: keyof PreferencesPayload; label: string }[] = [
  { key: "remoteWork",         label: "Open to Remote Jobs"    },
  { key: "fullTime",           label: "Open to Full-Time Jobs" },
  { key: "internship",         label: "Open to Internships"    },
  { key: "freelance",          label: "Open to Freelance Work" },
  { key: "willingToRelocate",  label: "Willing to Relocate"    },
  { key: "emailNotifications", label: "Email Notifications"    },
];

const DEFAULT: PreferencesPayload = {
  remoteWork: false, fullTime: false, internship: false,
  freelance: false, willingToRelocate: false, emailNotifications: false,
};

export default function PreferencesSection() {
  const queryClient = useQueryClient();
  const { data: server, isLoading } = useQuery({ queryKey: PREFERENCES_QUERY_KEY, queryFn: fetchPreferences });

  const [prefs, setPrefs] = useState<PreferencesPayload>(DEFAULT);
  useEffect(() => { if (server) setPrefs(server); }, [server]);

  const { mutate: save, isPending: saving, isSuccess: saved } = useMutation({
    mutationFn: updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PREFERENCES_QUERY_KEY });
      toast.success("Preferences saved");
    },
    onError: () => toast.error("Failed to save preferences"),
  });

  const toggle = (key: keyof PreferencesPayload) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
        <p className="text-sm text-muted-foreground">Customize your job search preferences.</p>
      </div>

      <div className="space-y-0 rounded-lg border border-border">
        {PREF_KEYS.map(({ key, label }, i) => (
          <div key={key}
            className={`flex items-center justify-between px-6 py-4 ${i < PREF_KEYS.length - 1 ? "border-b border-border" : ""}`}>
            <span className="font-medium text-foreground">{label}</span>
            <button
              role="switch" aria-checked={prefs[key]} aria-label={label}
              onClick={() => toggle(key)}
              disabled={isLoading}
              className={`relative h-7 w-14 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${prefs[key] ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${prefs[key] ? "translate-x-7" : "translate-x-0"}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={() => save(prefs)} disabled={saving || isLoading}>
          {saving ? "Saving…" : "Save Preferences"}
        </Button>
        {saved && <span className="text-sm text-muted-foreground">✓ Saved</span>}
      </div>
    </div>
  );
}
