"use client";

import { useState } from "react";

import ProfileHeader from "@/components/Molecules/profile/profileheader";
import { SettingsNav, type SettingsTabId } from "@/components/Molecules/settings/settings-nav";
import { AccountSection } from "@/components/Molecules/settings/account-section";
import { PasswordSection } from "@/components/Molecules/settings/password-section";
import { NotificationsSection } from "@/components/Molecules/settings/notifications-section";
import { PrivacySection } from "@/components/Molecules/settings/privacy-section";
import { AppearanceSection } from "@/components/Molecules/settings/appearance-section";
import { DangerZoneSection } from "@/components/Molecules/settings/danger-zone-section";

const TAB_META: Record<SettingsTabId, { title: string; description: string }> = {
  account:       { title: "Account",       description: "Manage your profile details and contact info." },
  password:      { title: "Password",      description: "Keep your account secure with a strong password." },
  notifications: { title: "Notifications", description: "Choose what you want to be notified about." },
  privacy:       { title: "Privacy",       description: "Control your visibility and data sharing." },
  appearance:    { title: "Appearance",    description: "Personalise how HireMate looks for you." },
  danger:        { title: "Danger Zone",   description: "Irreversible actions — proceed with caution." },
};

/**
 * Organism: full Settings page — nav sidebar + active panel.
 */
export default function SettingsOverview() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("account");
  const { title, description } = TAB_META[activeTab];

  return (
    <div className="space-y-6 p-6">
      <ProfileHeader title="Settings" description="Manage your account preferences and configuration." />

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Sidebar nav */}
        <aside className="w-full shrink-0 lg:w-52">
          <SettingsNav active={activeTab} onChange={setActiveTab} />
        </aside>

        {/* Content panel */}
        <div className="min-w-0 flex-1 space-y-1">
          {/* Per-section title on mobile (sidebar hidden) */}
          <div className="mb-4 lg:hidden">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {activeTab === "account"       && <AccountSection />}
          {activeTab === "password"      && <PasswordSection />}
          {activeTab === "notifications" && <NotificationsSection />}
          {activeTab === "privacy"       && <PrivacySection />}
          {activeTab === "appearance"    && <AppearanceSection />}
          {activeTab === "danger"        && <DangerZoneSection />}
        </div>
      </div>
    </div>
  );
}
