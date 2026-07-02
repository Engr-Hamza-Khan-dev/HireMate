"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { SettingsSectionHeader } from "@/components/Atoms/settings/settings-section-header";
import { SettingsToggle } from "@/components/Atoms/settings/settings-toggle";

type PrivacyState = {
  publicProfile: boolean;
  showEmail: boolean;
  showPhone: boolean;
  openToWork: boolean;
  allowMessaging: boolean;
  dataAnalytics: boolean;
};

const INITIAL: PrivacyState = {
  publicProfile: true,
  showEmail: false,
  showPhone: false,
  openToWork: true,
  allowMessaging: true,
  dataAnalytics: true,
};

type Key = keyof PrivacyState;

const VISIBILITY_TOGGLES: { key: Key; label: string; description: string }[] = [
  { key: "publicProfile", label: "Public profile",    description: "Anyone can find and view your profile." },
  { key: "showEmail",     label: "Show email",         description: "Display your email address on your profile." },
  { key: "showPhone",     label: "Show phone number",  description: "Display your phone number on your profile." },
  { key: "openToWork",    label: "Open to work badge", description: "Show recruiters you're looking for opportunities." },
];

const CONTACT_TOGGLES: { key: Key; label: string; description: string }[] = [
  { key: "allowMessaging", label: "Allow messaging",   description: "Let recruiters and connections message you." },
  { key: "dataAnalytics",  label: "Data & analytics",  description: "Help improve HireMate by sharing anonymous usage data." },
];

/**
 * Molecule: Privacy settings — profile visibility, contact, data.
 */
export function PrivacySection() {
  const [state, setState] = useState<PrivacyState>(INITIAL);

  function toggle(key: Key) {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Profile Visibility"
            description="Control who can see your information."
          />
        </CardHeader>
        <CardContent>
          {VISIBILITY_TOGGLES.map(({ key, label, description }) => (
            <SettingsToggle
              key={key}
              id={`privacy-${key}`}
              label={label}
              description={description}
              checked={state[key]}
              onChange={() => toggle(key)}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Contact & Data"
            description="Manage how others interact with you."
          />
        </CardHeader>
        <CardContent>
          {CONTACT_TOGGLES.map(({ key, label, description }) => (
            <SettingsToggle
              key={key}
              id={`privacy-${key}`}
              label={label}
              description={description}
              checked={state[key]}
              onChange={() => toggle(key)}
            />
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="px-6">Save privacy settings</Button>
      </div>
    </div>
  );
}
