"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { SettingsSectionHeader } from "@/components/Atoms/settings/settings-section-header";
import { SettingsToggle } from "@/components/Atoms/settings/settings-toggle";

type NotifState = {
  jobAlerts: boolean;
  applicationUpdates: boolean;
  messages: boolean;
  profileViews: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
  pushNotifications: boolean;
  smsAlerts: boolean;
};

const INITIAL: NotifState = {
  jobAlerts: true,
  applicationUpdates: true,
  messages: true,
  profileViews: false,
  weeklyDigest: true,
  marketingEmails: false,
  pushNotifications: true,
  smsAlerts: false,
};

type Key = keyof NotifState;

const EMAIL_TOGGLES: { key: Key; label: string; description: string }[] = [
  { key: "jobAlerts",           label: "Job alerts",            description: "New jobs matching your preferences." },
  { key: "applicationUpdates",  label: "Application updates",   description: "Status changes on your applications." },
  { key: "messages",            label: "Messages",              description: "When a recruiter sends you a message." },
  { key: "profileViews",        label: "Profile views",         description: "When someone views your profile." },
  { key: "weeklyDigest",        label: "Weekly digest",         description: "A weekly summary of your activity." },
  { key: "marketingEmails",     label: "Marketing emails",      description: "Product news, tips and promotions." },
];

const PUSH_TOGGLES: { key: Key; label: string; description: string }[] = [
  { key: "pushNotifications", label: "Push notifications", description: "Browser or mobile push alerts." },
  { key: "smsAlerts",         label: "SMS alerts",         description: "Text messages for critical updates." },
];

/**
 * Molecule: Notification preferences with email + push groups.
 */
export function NotificationsSection() {
  const [state, setState] = useState<NotifState>(INITIAL);

  function toggle(key: Key) {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-4">
      {/* Email */}
      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Email Notifications"
            description="Choose which emails you want to receive."
          />
        </CardHeader>
        <CardContent>
          {EMAIL_TOGGLES.map(({ key, label, description }) => (
            <SettingsToggle
              key={key}
              id={`notif-${key}`}
              label={label}
              description={description}
              checked={state[key]}
              onChange={() => toggle(key)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Push / SMS */}
      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Push & SMS"
            description="Real-time alerts on your device."
          />
        </CardHeader>
        <CardContent>
          {PUSH_TOGGLES.map(({ key, label, description }) => (
            <SettingsToggle
              key={key}
              id={`notif-${key}`}
              label={label}
              description={description}
              checked={state[key]}
              onChange={() => toggle(key)}
            />
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="px-6">Save preferences</Button>
      </div>
    </div>
  );
}
