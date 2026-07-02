import type { Metadata } from "next";
import SettingsOverview from "@/components/Organism/settings";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return <SettingsOverview />;
}
