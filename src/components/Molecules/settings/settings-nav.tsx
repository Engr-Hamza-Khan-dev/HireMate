"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/Atoms/button";
import {
  UserIcon,
  LockIcon,
  BellIcon,
  ShieldIcon,
  PaletteIcon,
  AlertTriangleIcon,
} from "lucide-react";

export const SETTINGS_TABS = [
  { id: "account",       label: "Account",       icon: UserIcon },
  { id: "password",      label: "Password",       icon: LockIcon },
  { id: "notifications", label: "Notifications",  icon: BellIcon },
  { id: "privacy",       label: "Privacy",        icon: ShieldIcon },
  { id: "appearance",    label: "Appearance",     icon: PaletteIcon },
  { id: "danger",        label: "Danger Zone",    icon: AlertTriangleIcon },
] as const;

export type SettingsTabId = (typeof SETTINGS_TABS)[number]["id"];

type SettingsNavProps = {
  active: SettingsTabId;
  onChange: (tab: SettingsTabId) => void;
};

/**
 * Molecule: vertical settings navigation sidebar.
 */
export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <nav aria-label="Settings navigation" className="flex flex-col gap-1">
      {SETTINGS_TABS.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={active === id ? "default" : "ghost"}
          className={cn(
            "w-full justify-start gap-3",
            id === "danger" && active !== "danger" && "hover:text-destructive"
          )}
          onClick={() => onChange(id)}
          aria-current={active === id ? "page" : undefined}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {label}
        </Button>
      ))}
    </nav>
  );
}
