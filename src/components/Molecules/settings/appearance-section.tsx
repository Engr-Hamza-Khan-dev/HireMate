"use client";

import { useState, type ReactNode } from "react";
import { MonitorIcon, SunIcon, MoonIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { SettingsSectionHeader } from "@/components/Atoms/settings/settings-section-header";
import { cn } from "@/lib/utils";

type Theme = "system" | "light" | "dark";
type FontSize = "sm" | "md" | "lg";
type Density = "compact" | "default" | "comfortable";

const THEMES: { value: Theme; label: string; icon: ReactNode }[] = [
  { value: "system", label: "System",  icon: <MonitorIcon className="h-5 w-5" /> },
  { value: "light",  label: "Light",   icon: <SunIcon className="h-5 w-5" /> },
  { value: "dark",   label: "Dark",    icon: <MoonIcon className="h-5 w-5" /> },
];

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

const DENSITIES: { value: Density; label: string; description: string }[] = [
  { value: "compact",     label: "Compact",     description: "Tighter spacing, more content visible." },
  { value: "default",     label: "Default",     description: "Balanced spacing for everyday use." },
  { value: "comfortable", label: "Comfortable", description: "Extra breathing room, easier on the eyes." },
];

/**
 * Molecule: Appearance settings — theme, font size, layout density.
 */
export function AppearanceSection() {
  const [theme, setTheme] = useState<Theme>("system");
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [density, setDensity] = useState<Density>("default");

  return (
    <div className="space-y-4">
      {/* Theme */}
      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Theme"
            description="Choose how HireMate looks for you."
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {THEMES.map(({ value, label, icon }) => (
              <Button
                key={value}
                type="button"
                variant={theme === value ? "default" : "outline"}
                className="flex h-auto flex-col items-center gap-2 py-4"
                onClick={() => setTheme(value)}
                aria-pressed={theme === value}
              >
                {icon}
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font size */}
      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Font Size"
            description="Adjust text size across the application."
          />
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {FONT_SIZES.map(({ value, label }) => (
              <Button
                key={value}
                type="button"
                variant={fontSize === value ? "default" : "outline"}
                className="flex-1"
                onClick={() => setFontSize(value)}
                aria-pressed={fontSize === value}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Layout density */}
      <Card>
        <CardHeader>
          <SettingsSectionHeader
            title="Layout Density"
            description="Control how much information is shown at once."
          />
        </CardHeader>
        <CardContent className="space-y-2">
          {DENSITIES.map(({ value, label, description }) => (
            <Button
              key={value}
              type="button"
              variant={density === value ? "secondary" : "outline"}
              className="flex h-auto w-full items-center justify-between px-4 py-3 text-left"
              onClick={() => setDensity(value)}
              aria-pressed={density === value}
            >
              <div>
                <p className={cn("text-sm font-medium", density === value ? "text-foreground" : "text-muted-foreground")}>
                  {label}
                </p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <div
                className={cn(
                  "h-4 w-4 shrink-0 rounded-full border-2 transition",
                  density === value ? "border-primary bg-primary" : "border-muted-foreground"
                )}
              />
            </Button>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="px-6">Save appearance</Button>
      </div>
    </div>
  );
}
