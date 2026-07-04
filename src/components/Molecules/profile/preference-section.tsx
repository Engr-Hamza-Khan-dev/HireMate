"use client";

import { useState } from "react";
import { Button } from "@/components/Atoms/button";

const PREF_KEYS = [
  { key: "remote",        label: "Open to Remote Jobs"    },
  { key: "fullTime",      label: "Open to Full-Time Jobs" },
  { key: "internship",    label: "Open to Internships"    },
  { key: "freelance",     label: "Open to Freelance Work" },
  { key: "relocation",    label: "Willing to Relocate"    },
  { key: "notifications", label: "Email Notifications"    },
] as const;

type PrefKey = typeof PREF_KEYS[number]["key"];

export default function PreferencesSection() {
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
    remote: true, fullTime: true, internship: false,
    freelance: false, relocation: true, notifications: true,
  });

  const toggle = (key: PrefKey) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
        <p className="text-sm text-muted-foreground">Customize your job search preferences.</p>
      </div>

      <div className="space-y-4 rounded-lg border border-border p-6">
        {PREF_KEYS.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between border-b border-border pb-4 last:border-none last:pb-0">
            <span className="font-medium text-foreground">{label}</span>

            {/* Toggle switch */}
            <button
              role="switch"
              aria-checked={prefs[key]}
              aria-label={label}
              onClick={() => toggle(key)}
              className={`relative h-7 w-14 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                prefs[key] ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  prefs[key] ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <Button>Save Preferences</Button>
    </div>
  );
}
