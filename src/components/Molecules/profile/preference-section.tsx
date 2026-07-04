"use client";

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
type Preferences = Record<PrefKey, boolean>;

interface Props {
  value: Preferences;
  onChange: (value: Preferences) => void;
}

export default function PreferencesSection({ value, onChange }: Props) {
  const toggle = (key: PrefKey) => onChange({ ...value, [key]: !value[key] });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
        <p className="text-sm text-muted-foreground">Customize your job search preferences.</p>
      </div>

      <div className="space-y-0 rounded-lg border border-border">
        {PREF_KEYS.map(({ key, label }, i) => (
          <div
            key={key}
            className={`flex items-center justify-between px-6 py-4 ${i < PREF_KEYS.length - 1 ? "border-b border-border" : ""}`}
          >
            <span className="font-medium text-foreground">{label}</span>
            <button
              role="switch"
              aria-checked={value[key]}
              aria-label={label}
              onClick={() => toggle(key)}
              className={`relative h-7 w-14 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                value[key] ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
                  value[key] ? "translate-x-7" : "translate-x-0"
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
