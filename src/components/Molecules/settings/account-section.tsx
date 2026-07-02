"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/Atoms/button";
import { SettingsSectionHeader } from "@/components/Atoms/settings/settings-section-header";
import InputField from "@/components/Molecules/profile/inputfield";

/**
 * Molecule: Account settings — avatar, display name, email, bio, location.
 */
export function AccountSection() {
  const [fields, setFields] = useState({
    firstName: "Hamza",
    lastName: "Khan",
    email: "hamza@example.com",
    phone: "+1 234 567 890",
    jobTitle: "Senior Software Engineer",
    location: "New York, USA",
    bio: "",
  });

  function handleChange(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <Card>
      <CardHeader>
        <SettingsSectionHeader
          title="Account Information"
          description="Update your personal details and public profile."
        />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar row */}
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
              {fields.firstName.charAt(0)}
            </div>
            <Button
              type="button"
              size="icon"
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 h-7 w-7 rounded-full"
            >
              <Camera className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Profile photo</p>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF · max 2 MB</p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="outline">Upload photo</Button>
              <Button size="sm" variant="ghost">Remove</Button>
            </div>
          </div>
        </div>

        {/* Fields grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="John"
            value={fields.firstName}
            onChange={handleChange("firstName")}
          />
          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            value={fields.lastName}
            onChange={handleChange("lastName")}
          />
          <InputField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={handleChange("email")}
          />
          <InputField
            id="phone"
            label="Phone number"
            placeholder="+1 234 567 890"
            value={fields.phone}
            onChange={handleChange("phone")}
          />
          <InputField
            id="jobTitle"
            label="Job title"
            placeholder="Senior Software Engineer"
            value={fields.jobTitle}
            onChange={handleChange("jobTitle")}
          />
          <InputField
            id="location"
            label="Location"
            placeholder="New York, USA"
            value={fields.location}
            onChange={handleChange("location")}
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium text-foreground">
            Bio
          </label>
          <Input
            id="bio"
            placeholder="Tell recruiters a little about yourself…"
            value={fields.bio}
            onChange={(e) => setFields((prev) => ({ ...prev, bio: e.target.value }))}
            className="h-20"
          />
        </div>

        <div className="flex justify-end">
          <Button className="px-6">Save changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
