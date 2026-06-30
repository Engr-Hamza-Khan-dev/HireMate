import type { Metadata } from "next";

import ProfileOverview from "@/components/Organism/profile";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return <ProfileOverview />;
}