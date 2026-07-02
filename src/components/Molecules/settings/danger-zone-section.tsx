"use client";

import { useState } from "react";
import { AlertTriangleIcon, DownloadIcon, LogOutIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SettingsSectionHeader } from "@/components/Atoms/settings/settings-section-header";
import { SettingsDangerButton } from "@/components/Atoms/settings/settings-danger-button";
import { Button } from "@/components/Atoms/button";
import { cn } from "@/lib/utils";

type DangerAction = "deactivate" | "delete" | null;

/**
 * Molecule: Danger zone — data export, deactivation, account deletion.
 */
export function DangerZoneSection() {
  const [confirm, setConfirm] = useState<DangerAction>(null);

  return (
    <div className="space-y-4">
      {/* Data export */}
      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Export Your Data"
            description="Download a copy of everything HireMate holds about you."
          />
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="gap-2">
            <DownloadIcon className="h-4 w-4" aria-hidden="true" />
            Download my data
          </Button>
        </CardContent>
      </Card>

      {/* Sign out all devices */}
      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Sign Out Everywhere"
            description="Revoke all active sessions on other devices."
          />
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="gap-2">
            <LogOutIcon className="h-4 w-4" aria-hidden="true" />
            Sign out all devices
          </Button>
        </CardContent>
      </Card>

      {/* Deactivate */}
      <Card className={cn("border-warning/30", confirm === "deactivate" && "border-warning/60")}>
        <CardHeader>
          <SettingsSectionHeader
            title="Deactivate Account"
            description="Temporarily hide your profile and pause job matching. You can reactivate any time."
          />
        </CardHeader>
        <CardContent>
          {confirm === "deactivate" ? (
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-sm text-warning-foreground">
                <AlertTriangleIcon className="h-4 w-4 shrink-0" />
                Your profile will be hidden from recruiters until you log back in.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-warning/50 text-warning-foreground hover:bg-warning/10"
                  onClick={() => { setConfirm(null); }}
                >
                  Yes, deactivate
                </Button>
                <Button variant="outline" onClick={() => setConfirm(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="border-warning/40 text-warning-foreground hover:bg-warning/10"
              onClick={() => setConfirm("deactivate")}
            >
              Deactivate account
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Delete */}
      <Card className={cn("border-destructive/30", confirm === "delete" && "border-destructive")}>
        <CardHeader>
          <SettingsSectionHeader
            title="Delete Account"
            description="Permanently delete your account and all data. This cannot be undone."
          />
        </CardHeader>
        <CardContent>
          {confirm === "delete" ? (
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-sm text-destructive">
                <AlertTriangleIcon className="h-4 w-4 shrink-0" />
                All your data — resumes, cover letters, applications — will be permanently deleted.
              </p>
              <div className="flex gap-2">
                <SettingsDangerButton
                  label="Yes, permanently delete"
                  onClick={() => {
                    setConfirm(null);
                    console.log("Delete confirmed");
                  }}
                />
                <Button variant="outline" onClick={() => setConfirm(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <SettingsDangerButton
              label="Delete my account"
              onClick={() => setConfirm("delete")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
